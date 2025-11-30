<?php
include 'db_connection.php';
date_default_timezone_set('Asia/Dhaka');

header("Content-Type: text/html; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chittagong_Autos</title>
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
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="comment-body">
        <tr>
          <td>1</td>
          <td>alam</td>
          <td>10:34 AM</td>
          <td>How much do you sell leather seat-covers?</td>
          <td><a href="#" class="reply-link" data-commenter="alam" data-no="1">[Reply]</a></td>
        </tr>

        <tr>
          <td>2</td>
          <td>biplob</td>
          <td>10:35 AM</td>
          <td>What is the price of the Honda Civic?</td>
          <td><a href="#" class="reply-link" data-commenter="biplob" data-no="2">[Reply]</a></td>
        </tr>

        <?php
        $sql = "SELECT * FROM comments ORDER BY commentnumber ASC";
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $time = date("h:i A", strtotime($row['commenttime']));
            echo "
            <tr>
                <td>{$row['commentnumber']}</td>
                <td>{$row['commenter']}</td>
                <td>{$time}</td>
                <td>{$row['comment']}</td>
                <td><a href='#' class='reply-link' data-commenter='{$row['commenter']}' data-no='{$row['commentnumber']}'>[Reply]</a></td>
            </tr>";
        }
        ?>
      </tbody>
    </table>

    <div class="comments-inputs">
      <input type="text" id="name" placeholder="Type your name here">
      <input type="text" id="comment" class="comment-box" placeholder="Type your comment here">
      <input type="hidden" id="replyto">
      <button id="post" disabled>Post</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
