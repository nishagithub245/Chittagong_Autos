💻 Project Name: Chittagong Autos — Live Comment and Thread Reply System

A dynamic comment system built for Chittagong Autos to allow customers and staff to interact through threaded comments under car listings. The system supports live comment posting, reply tagging, hierarchical thread organization, and smart reordering based on engagement.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Features ✨

- ⚡ **Live Comment Posting:** Post comments instantly without any page reload — smooth and fast UX.
- 🏷️ **Smart Reply Tagging:** Automatically tag users using the @username format when replying.
- 🧵 **Nested Threaded Replies:** Replies appear neatly under the correct comment chain, keeping conversations clear.
- 🔄 **Persistent Comments:** All existing comments load automatically on page refresh — no data loss.
- ⏰ **Automatic Time Stamps:** Each comment records the exact posting time without manual input.
- 🚫 **Smart Post Button Control:** The Post button stays disabled until all required inputs are filled correctly.
- 🔌 **Asynchronous Database Updates:** Comments are saved using AJAX in the background — zero interruption.
- 📊 **Engagement-Based Thread Sorting:** Comment threads with more activity automatically move higher.
- 🚀 **Real-Time Thread Reordering:** As replies increase, threads dynamically reposition to reflect engagement.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Tech Stack 🛠️

- 🎨 **Frontend:** HTML, CSS, JavaScript, jQuery  
- 🧠 **Backend:** PHP (MySQLi)  
- 🗄️ **Database:** MySQL  
- 💾 **Storage:** Persistent saved comments and reply hierarchy


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Setup Instructions ⚙️

**Prerequisites:**
- 🧩 PHP installed and configured on your system
- 🗄️ MySQL database server
- 🖥️ A local server environment (e.g., XAMPP or WAMP)
- 🌐 Web browser (Chrome recommended for testing)

**Steps:**
1.Clone or Download the Project
-git clone https://github.com/yourusername/ChittagongAutos.git
-Or download the ZIP file and extract it into your local server directory:
-C:\xampp\htdocs\ChittagongAutos

2.Create the Database
-Open phpMyAdmin and run:
-CREATE DATABASE chittagongautos;

3.Create the Comments Table
-Inside the chittagongautos database, run:

-CREATE TABLE comments (
    -commentnumber INT AUTO_INCREMENT PRIMARY KEY,
    -commenter VARCHAR(100) NOT NULL,
   - comment TEXT NOT NULL,
   - commenttime DATETIME NOT NULL,
   - replyto INT DEFAULT NULL
-);


4.Configure Database Connection
-Open db_connection.php and update the credentials:

-$host = "localhost";
-$user = "root";
-$password = "";
-$database = "chittagongautos";

5.Start the Local Server
-Start Apache and MySQL from XAMPP or WAMP control panel.

6.Launch the Application
-Open your browser and navigate to:
-http://localhost/ChittagongAutos/main.php


$host = "localhost";
$user = "root";
$password = "";
$database = "chittagongautos";

