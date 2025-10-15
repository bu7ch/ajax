<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

require_once 'config.php';
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$input  = json_decode(file_get_contents('php://input'), true);

switch ($action) {
    case 'users':
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM users ORDER BY id DESC");
            echo json_encode($stmt->fetchAll());
        }
        break;

    case 'add':
        if ($method === 'POST') {
            $name  = trim($input['name']  ?? '');
            $email = trim($input['email'] ?? '');
            if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(['error' => 'Nom ou email invalide']);
                exit;
            }
            try {
                $stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (:n, :e)");
                $stmt->execute([':n' => $name, ':e' => $email]);
                $id = $pdo->lastInsertId();
                echo json_encode(['id' => $id, 'name' => $name, 'email' => $email]);
                http_response_code(201);
            } catch (PDOException $e) {
                if ($e->getCode() == '23000') {
                    http_response_code(409);
                    echo json_encode(['error' => 'Email déjà utilisé']);
                } else {
                    throw $e;
                }
            }
        }
        break;

    case 'edit':
        if ($method === 'PUT') {
            $id    = (int)($_GET['id'] ?? 0);
            $name  = trim($input['name']  ?? '');
            $email = trim($input['email'] ?? '');
            if ($id === 0 || $name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(['error' => 'Données invalides']);
                exit;
            }
            try {
                $stmt = $pdo->prepare("UPDATE users SET name = :n, email = :e WHERE id = :id");
                $stmt->execute([':n' => $name, ':e' => $email, ':id' => $id]);
                echo json_encode(['id' => $id, 'name' => $name, 'email' => $email]);
            } catch (PDOException $e) {
                if ($e->getCode() == '23000') {
                    http_response_code(409);
                    echo json_encode(['error' => 'Email déjà utilisé']);
                } else {
                    throw $e;
                }
            }
        }
        break;

    case 'delete':
        if ($method === 'DELETE') {
            $id = (int)($_GET['id'] ?? 0);
            if ($id === 0) {
                http_response_code(400);
                echo json_encode(['error' => 'ID manquant']);
                exit;
            }
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['ok' => true]);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Action inconnue']);
}