<h2>💻Project Name: <strong> Chittagong Autos🚗 </strong><br>Live Comment and Thread Reply System </h2>

A dynamic comment system built for Chittagong Autos to allow customers and staff to interact through threaded comments under car listings. The system supports live comment posting, reply tagging, hierarchical thread organization, and smart reordering based on engagement.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<h3>✨Features </h3>

- ⚡**Live Comment Posting:** Post comments instantly without any page reload.
- 🏷️**Smart Reply Tagging:** Automatically tag users using the @username format when replying.
- 🧵**Nested Threaded Replies:** Replies appear neatly under the correct comment chain, keeping conversations clear.
- 🔄**Persistent Comments:** All existing comments load automatically on page refresh.
- ⏰**Automatic Time Stamps:** Each comment records the exact posting time without manual input.
- 🚫**Smart Post Button Control:** The Post button stays disabled until all required inputs are filled correctly.
- 🔌**Asynchronous Database Updates:** Comments are saved using AJAX in the background.
- 📊**Engagement-Based Thread Sorting:** Comment threads with more activity automatically move higher.
- 🚀**Real-Time Thread Reordering:** As replies increase, threads dynamically reposition to reflect engagement.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<h3>🛠️Tech Stack </h3>

- 🎨**Frontend:** HTML, CSS, JavaScript, jQuery  
- 🧠**Backend:** PHP (MySQLi)  
- 🗄️**Database:** MySQL  
- 💾**Storage:** Persistent saved comments and reply hierarchy


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<h3>⚙️Prerequisites</h3>
- 🧩PHP installed and configured on your system
- 🗄️MySQL database server
- 🖥️A local server environment (e.g., XAMPP or WAMP)
- 🌐Web browser (Chrome recommended for testing)

<h3>Steps to Install</h3>
<ol>
  <li>
  <pre><code> https://github.com/nishagithub245/ChittagongAutos.git</code></pre>
  </li>
  or download the ZIP file and extract it into your local server directory:
 <pre><code>C:\xampp\htdocs\ChittagongAutos</code></pre>
  
<li>
<pre><code>CREATE DATABASE chittagongautos;</code></pre>
</li>
  
<li>
Inside the chittagongautos database, run:
 <pre><code>
    CREATE TABLE comments (
    commentnumber INT AUTO_INCREMENT PRIMARY KEY,
    commenter VARCHAR(100) NOT NULL,
    comment TEXT NOT NULL,
    commenttime DATETIME NOT NULL,
    replyto INT DEFAULT NULL
    );
 </code></pre>
 </li>

<li>Open db_connection.php and update the credentials:


<pre><code>
$host = "localhost";
$user = "root";
$password = "";
$database = "chittagongautos";
</code></pre>
</li>
  
<li>Start Apache and MySQL from XAMPP or WAMP control panel.</li>

<li> Launch the Application
Open your browser and navigate to:</li> 
<pre><code> http://localhost/ChittagongAutos/main.php</code></pre>
</ol>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h3>⚡Live Behaviors</h3>
<ol>
  <li>📝Instant UI Update</li>
  <li>💾Asynchronous Database Save </li>
  <li>🧵Threaded Replies</li>
  <li>📈Dynamic Thread Reordering</li>
</ol>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h3>🤝Contributing</h3>
<ol>
  <li>Fork the repository.</li>
  <li>Create a new branch (git checkout -b feature-name).</li>
  <li>Commit your changes (git commit -am 'Add new feature').</li>
  <li>Push to the branch (git push origin feature-name).</li>
  <li>Create a new Pull Request.</li>
</ol>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
<h3>License</h3>
This project is implemented by <strong>Sidratul Muntaha Nisha...</strong>


