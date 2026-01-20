<?php
include 'db_connection.php';
date_default_timezone_set('Asia/Dhaka');

// Fetch all comments
$sql = "SELECT * FROM comments ORDER BY commenttime ASC";
$result = $conn->query($sql);

$allComments = [];
while ($r = $result->fetch_assoc()) {
    $r['replyto'] = intval($r['replyto']);
    $allComments[] = $r;
}

// Build parent mapping
$commentsByParent = [];
foreach ($allComments as $c) {
    $parent = intval($c['replyto']);
    if (!isset($commentsByParent[$parent])) {
        $commentsByParent[$parent] = [];
    }
    $commentsByParent[$parent][] = $c;
}

// Count replies recursively
function countThreadSize($map, $id) {
    if (!isset($map[$id])) return 1; 
    $count = 1;
    foreach ($map[$id] as $child) {
        $count += countThreadSize($map, $child['commentnumber']);
    }
    return $count;
}

// Function to highlight @mentions in blue
function highlightMentions($text) {
   
     return preg_replace('/@([\w\s]+?)(?=[\s.,!?;:]|$)/', '<span class="mention">@$1</span>', htmlspecialchars($text, ENT_QUOTES, 'UTF-8'));
}



// Build top-level threads list sorted by size (DESC)
$threadRoots = [];
foreach ($commentsByParent[0] ?? [] as $root) {
    $id = $root['commentnumber'];
    $threadRoots[] = [
        "root" => $root,
        "size" => countThreadSize($commentsByParent, $id)
    ];
}

// Sort threads by size (largest first)
usort($threadRoots, function($a, $b){ return $b['size'] - $a['size']; });

// Recursive rendering function
function renderThread($map, $comment, $level = 0) {
    $id = intval($comment['commentnumber']);
    $parent = intval($comment['replyto']);
    $time = date("h:i A", strtotime($comment['commenttime']));
    $name = htmlspecialchars($comment['commenter'], ENT_QUOTES, 'UTF-8');
    $text = nl2br(highlightMentions($comment['comment']));

    echo "
    <tr class='comment-row' data-id='{$id}' data-parent='{$parent}'>
        <td>{$id}</td>
        <td>{$name}</td>
        <td>{$time}</td>
        <td>
            {$text}
            <button class='reply-link' data-id='{$id}' data-commenter='{$name}'>Reply</button>
        </td>
    </tr>";

    // Render children (replies)
    if (isset($map[$id])) {
        foreach ($map[$id] as $child) {
            renderThread($map, $child, $level + 1);
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Comments System</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

<div class="comments-section">

    <table class="comment-table">
        <thead>
            <tr>
                <th>No.</th>
                <th>Commenter</th>
                <th>Time</th>
                <th>Comment</th>
            </tr>
        </thead>

        <tbody id="comment-body">
            <?php 
            $threadCount = count($threadRoots);
            $currentIndex = 0;
            
            foreach ($threadRoots as $t) { 
                renderThread($commentsByParent, $t['root']); 
                $currentIndex++;
                
                // Add a separator row between threads (except after the last one)
                if ($currentIndex < $threadCount) {
                    echo '<tr class="thread-separator"><td colspan="4"></td></tr>';
                }
            } 
            ?>
        </tbody>
    </table>

    <div class="comments-inputs">
        <input type="text" id="name" placeholder="Your name">
        <input type="text" id="comment" placeholder="Your comment">
        <input type="hidden" id="replyto" value="0">
        <button id="post" disabled>Post</button>
    </div>

</div>

<script src="script.js"></script>
</body>
</html>


