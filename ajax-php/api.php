<?php
header("Content-Type: application/json");
$action = $_GET['action'] ?? '';
if ($action === 'posts') {
    $posts = json_decode(file_get_contents('data/posts.json'), true);
    echo json_encode($posts);
    exit;
}
http_response_code(400);
echo json_encode(['error' => 'action manquant']);