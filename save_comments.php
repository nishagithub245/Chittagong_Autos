<?php
include 'db_connection.php';
date_default_timezone_set('Asia/Dhaka');

if(isset($_POST['name'], $_POST['comment'])){

    $name = $conn->real_escape_string($_POST['name']);
    $comment = $conn->real_escape_string($_POST['comment']);
    $replyto = isset($_POST['replyto']) ? intval($_POST['replyto']) : 0;
      $time = date("h:i A");
      

    $sql = "INSERT INTO comments (commenter, comment, commenttime, replyto)
            VALUES ('$name', '$comment', NOW(), $replyto)";

    if($conn->query($sql)){
        $id = $conn->insert_id;

        echo json_encode([
            "commentnumber" => $id,
            "commenter" => $name,
            "comment" => $comment,
            "commenttime" => date("h:i A"),
            "replyto" => $replyto
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Database insert failed"]);
    }
}

$conn->close();
?>
