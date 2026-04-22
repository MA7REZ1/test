<?php
require_once '../includes/db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $pdo->prepare("DELETE FROM scholarships WHERE id = ?");
    $stmt->execute([$id]);
}

header("Location: index.php");
exit;
?>
