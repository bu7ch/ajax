<?php
header("Content-Type: application/json");
$action = $_GET['action'] ?? '';
if ($action === 'posts') {
    $posts = json_decode(file_get_contents('data/posts.json'), true); //chargement des posts
    echo json_encode($posts);//retourne les posts sous forme de json
    exit;
}
if ($action === 'stats') {
    $stats = json_decode(file_get_contents('data/stats.json'),true);
    echo json_encode($stats);
    exit;
}
http_response_code(400);
echo json_encode(['error' => 'action manquant']);//retourne une erreur si l'action est manquante