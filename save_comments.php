<?php
date_default_timezone_set('Asia/Dhaka');
include 'db_connection.php';

if (isset($_POST['name']) && isset($_POST['comment'])) {

    $name = $conn->real_escape_string($_POST['name']);
    $comment = $conn->real_escape_string($_POST['comment']);
    $replyto = !empty($_POST['replyto']) ? intval($_POST['replyto']) : "NULL";

    $time = date("Y-m-d H:i:s");

    $sql = "INSERT INTO comments (commenter, comment, commenttime, replyto)
            VALUES ('$name', '$comment', '$time', $replyto)";

    if ($conn->query($sql)) {
        $id = $conn->insert_id;

        $result = $conn->query("SELECT * FROM comments WHERE commentnumber = $id");
        $row = $result->fetch_assoc();
        $row['commenttime'] = date("h:i A", strtotime($row['commenttime']));

        echo json_encode($row);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Insert failed"]);
    }
}

$conn->close();
?>
