<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Simuler des données utilisateur
$users = [
    ['id' => 1, 'name' => 'Alice', 'email' => 'alice@example.com'],
    ['id' => 2, 'name' => 'Bob', 'email' => 'bob@example.com'],
    ['id' => 3, 'name' => 'Charlie', 'email' => 'charlie@example.com']
];

echo json_encode($users);
?>