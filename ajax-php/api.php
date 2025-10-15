<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$input  = json_decode(file_get_contents('php://input'), true);

function read($file){
    return json_decode(file_get_contents($file), true);
}
function write($file, $data){
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

switch ($action) {
    /* --------- GET  (liste) --------- */
    case 'posts':
        if ($method === 'GET') {
            echo json_encode(read('data/posts.json'));
        }
        break;

    /* --------- POST (ajout) --------- */
    case 'add':
        if ($method === 'POST') {
            $posts = read('data/posts.json');
            $newId = empty($posts) ? 1 : max(array_column($posts, 'id')) + 1;
            $new   = [
                'id'    => $newId,
                'title' => trim($input['title'] ?? ''),
                'body'  => trim($input['body']  ?? '')
            ];
            if ($new['title'] === '') {
                http_response_code(400);
                echo json_encode(['error' => 'Titre requis']);
                exit;
            }
            $posts[] = $new; // charger les datas dans le tableau des datas
            write('data/posts.json', $posts); // ecrire le JSON avec les valeurs de $posts
            echo json_encode($new); // redonner le JSON au JS de la valeur new
        }
        break;
          /* --------- DELETE --------------- */
    case 'delete':
        if ($method === 'DELETE') {
            $id = (int)($_GET['id'] ?? 0);
            $posts = read('data/posts.json');
            $posts = array_values(array_filter($posts, fn($p) => $p['id'] != $id));
            write('data/posts.json', $posts);
            echo json_encode(['ok' => true]);
        }
        break;


    /* --------- STATS (jour 1) ------- */
    case 'stats':
        echo json_encode(read('data/stats.json'));
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Action invalide']);
}