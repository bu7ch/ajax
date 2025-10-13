<?php
header("Content-Type: application/json");
echo json_encode([
    "message" => "Hello from PHP",
    "time"    => date("H:i:s"),
    "status"  => "ok"
]);