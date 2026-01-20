<?php
include 'db_connection.php';
date_default_timezone_set('Asia/Dhaka');


// Check if it's a POST request
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if required fields are set
    if(isset($_POST['name']) && isset($_POST['comment'])) {
        
        $name = $conn->real_escape_string(trim($_POST['name']));
        $comment = $conn->real_escape_string(trim($_POST['comment']));
        $replyto = isset($_POST['replyto']) ? intval($_POST['replyto']) : 0;
        
        // Validate inputs
        if(empty($name) || empty($comment)) {
            http_response_code(400);
            echo json_encode(["error" => "Name and comment are required"]);
            exit();
        }
        
        
        $current_time = date('Y-m-d H:i:s');
        
        // Insert into database
        $sql = "INSERT INTO comments (commenter, comment, commenttime, replyto)
                VALUES ('$name', '$comment', '$current_time', $replyto)";
        
        if($conn->query($sql)){
            $id = $conn->insert_id;
            
            // Format time for display
            $display_time = date("h:i A", strtotime($current_time));
            
            // success response
            echo json_encode([
                "commentnumber" => $id,
                "commenter" => $name,
                "comment" => $comment,
                "commenttime" => $display_time,
                "replyto" => $replyto
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database insertion failed: " . $conn->error]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}

$conn->close();
?>