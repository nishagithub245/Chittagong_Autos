<?php
include 'db_connection.php';
date_default_timezone_set('Asia/Dhaka');

header("Content-Type: text/html; charset=UTF-8");
header("X-Content-Type-Options: nosniff");

// Fetch all comments
$sql = "SELECT * FROM comments ORDER BY commenttime ASC";
$result = $conn->query($sql);

$allComments = [];
while ($r = $result->fetch_assoc()) {
    $r['replyto'] = intval($r['replyto']);  // normalize
    $allComments[] = $r;
}

// Build map: parent_id => [comments]
$commentsByParent = [];
foreach ($allComments as $c) {
    $parent = $c['replyto'];  // 0 = top level
    if (!isset($commentsByParent[$parent])) {
        $commentsByParent[$parent] = [];
    }
    $commentsByParent[$parent][] = $c;
}

// Recursive renderer
function renderCommentsTable($commentsByParent, $parent = 0, $level = 0) {
    if (!isset($commentsByParent[$parent])) return;

    foreach ($commentsByParent[$parent] as $c) {
        $padding = 15 * $level;
        $time = date("h:i A", strtotime($c['commenttime']));
        $id = intval($c['commentnumber']);
        $name = htmlspecialchars($c['commenter'], ENT_QUOTES, 'UTF-8');
        $comment = nl2br(htmlspecialchars($c['comment'], ENT_QUOTES, 'UTF-8'));

        echo "<tr class='comment-row' data-id='{$id}' data-parent='{$parent}'>
                <td>{$id}</td>
                <td>{$name}</td>
                <td>{$time}</td>
                <td style='padding-left: {$padding}px'>{$comment}</td>
                <td>
                    <a href='#' class='reply-link' data-id='{$id}' data-commenter='{$name}'>[Reply]</a>
                </td>
              </tr>";

        // Render child replies
        renderCommentsTable($commentsByParent, $id, $level + 1);
    }
}
?>

<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Chittagong_Autos</title>
    <link rel='stylesheet' href='styles.css'>
    <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
</head>

<body>
<div class='comments-section'>
    <table class='comment-table'>
        <thead>
            <tr>
                <th>No.</th>
                <th>Commenter</th>
                <th>Time</th>
                <th>Comment</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody id='comment-body'>
            <?php renderCommentsTable($commentsByParent); ?>
        </tbody>
    </table>

    <div class='comments-inputs'>
        <input type='text' id='name' placeholder='Type your name here'>
        <input type='text' id='comment' class='comment-box' placeholder='Type your comment here'>
        <input type='hidden' id='replyto' value='0'>
        <button id='post' disabled>Post</button>
    </div>
</div>

<script src='script.js'></script>
</body>
</html>
