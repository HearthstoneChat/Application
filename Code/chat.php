<?php
session_start();

// Database variables
include("database.php");

// Get url parameters
if (isset($_GET['sender']) and $_GET['sender'] != 'UNKNOWN_HUMAN_PLAYER' and $_GET['sender'] != '' and isset($_GET['recipient']) and $_GET['recipient'] != 'UNKNOWN_HUMAN_PLAYER' and $_GET['recipient'] != 'AI_PLAYER' and $_GET['recipient'] != '') {
	
	$sender = str_replace("::","#",$_GET['sender']);
	$senderParts = explode("#",$sender);
	$senderName = $senderParts[0];
	$recipient = str_replace("::","#",$_GET['recipient']);
	$chatID = $sender . $recipient;
	
	// Sender = Me
	if (!isset($_SESSION['me']) or $_SESSION['me'] != $sender) { $_SESSION['me'] = $sender; }
	
	// Connect to the database
	$connection = mysqli_connect($hostName,$dbUser,$dbPassword,$dbName); 
	if (!$connection) { die('Could not connect: ' . mysql_error()); }
	
	// Delete (5 minute old) user messages and (30 sec old) status messages
	$deleteMessages = mysqli_query($connection,"DELETE FROM chat WHERE chatID LIKE '%" . $sender . "%' AND ((timestamp < DATE_SUB(UTC_TIMESTAMP, INTERVAL 5 MINUTE) AND sender != recipient) OR (timestamp < DATE_SUB(UTC_TIMESTAMP, INTERVAL 30 SECOND) AND sender = recipient));");
	
	// If chatID is different than before, enter new chatroom
	if (!isset($_SESSION['chatRoom']) or $_SESSION['chatRoom'] != $chatID) {
		// Add a message that you've entered the chat room
		$newChat = mysqli_query($connection,"INSERT INTO chat VALUES ('" . $chatID . "','" . $sender . "','" . $recipient . "','<i>" . $senderName . " entered chat.</i>','" . gmdate('Y-m-d H:i:s') . "');");
		
		// Turns off 'block Opponent' setting for new opponent
		if (isset($_SESSION['blockOpponent']) and strpos($chatID,$_SESSION['blockOpponent']) == false) {
			unset($_SESSION['blockOpponent']);
		}
		
		$_SESSION['chatRoom'] = $chatID;
	}
	
	// Get all current chat room messages
	$results = mysqli_query($connection,"SELECT * FROM chat WHERE chatID LIKE '%" . $sender . "%' AND chatID LIKE '%" . $recipient . "%' ORDER BY timestamp;");
	
	// Only scroll to bottom if there are new messages
	$msgCount = mysqli_num_rows($results);
	if ($_SESSION['messageCount'] !== $msgCount) {
		$scroll = "parent.document.getElementById('chat').scrollTop = parent.document.getElementById('chat').scrollHeight;";
		$_SESSION['messageCount'] = $msgCount;
	} else {
		$scroll = "";
	}
	
	// Display messages
	while ($line = mysqli_fetch_assoc($results)) {
		$senderParts = explode("#",$line['sender']);
		$senderName = $senderParts[0];
		$message = $line['message'];
		
		// Profanity Filter
		if ($_SESSION['filterMessages'] == "ON") {
			include("filter.php");
		}
		
		// Opponent's Messages
		if ($_SESSION['me'] != $line['sender'] and $line['sender'] != $line['recipient'] and $_SESSION['blockOpponent'] != $line['sender']) {
			$chat .= "<div title='Sent by " . $senderName . " on " . date('d M y @ H:i:s',strtotime($line['timestamp'])) . " GMT' class='flex-start'>";
			$chat .= "	<div class='icon icon-size-1616 icon-opp'>";
			$chat .= "		<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'><g id='follower'><g><path d='M9.37,12.69c-1.2-0.53-1.04-0.85-1.08-1.29c-0.01-0.06-0.01-0.12-0.01-0.19c0.41-0.37,0.75-0.87,0.97-1.44c0,0,0.01-0.03,0.01-0.04c0.05-0.13,0.09-0.26,0.12-0.39c0.28-0.06,0.44-0.36,0.5-0.63c0.06-0.11,0.19-0.39,0.16-0.7c-0.04-0.4-0.2-0.59-0.38-0.67c0-0.02,0-0.05,0-0.07c0-0.52-0.05-1.26-0.14-1.74C9.5,5.37,9.47,5.24,9.43,5.1c-0.18-0.6-0.55-1.13-1.04-1.51C7.87,3.2,7.15,3,6.5,3C5.86,3,5.14,3.2,4.63,3.59C4.13,3.97,3.76,4.51,3.58,5.1c-0.04,0.13-0.07,0.27-0.09,0.4C3.4,5.99,3.35,6.74,3.35,7.25c0,0.02,0,0.04,0,0.06c-0.19,0.07-0.36,0.26-0.4,0.68c-0.03,0.31,0.1,0.59,0.16,0.7c0.06,0.28,0.23,0.59,0.51,0.64C3.66,9.47,3.7,9.6,3.75,9.72c0,0.01,0.01,0.02,0.01,0.02l0,0.01c0.22,0.59,0.57,1.1,0.99,1.46c0,0.06-0.01,0.12-0.01,0.17c-0.04,0.44,0.08,0.76-1.12,1.29c-1.2,0.53-3.01,1.1-3.38,1.95C-0.13,15.5,0.02,16,0.02,16h12.96c0,0,0.15-0.5-0.22-1.36C12.38,13.79,10.57,13.22,9.37,12.69z M15.7,2.29l-2-2C13.52,0.11,13.27,0,12.99,0c-0.55,0-1,0.45-1,1c0,0.28,0.11,0.53,0.29,0.71L12.58,2H9.99c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h2.58l-0.29,0.29C12.1,4.47,11.99,4.72,11.99,5c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l2-2c0.18-0.18,0.29-0.43,0.29-0.71C15.99,2.72,15.88,2.47,15.7,2.29z'/></g></g></svg>";
			$chat .= "	</div>";
			$chat .= "	<div class='message-opp'>" . $message . "</div>";
			$chat .= "</div>";
			
			$lastOppMsg = $line['chatID'] . $line['message'] . $line['timestamp'];
			
		// My Messages	
		} else if ($_SESSION['me'] == $line['sender'] and $line['sender'] != $line['recipient']) {
			$chat .= "<div title='Sent by " . $senderName . " on " . date('d M y @ H:i:s',strtotime($line['timestamp'])) . " GMT' class='flex-start'>";
			$chat .= "	<div class='icon icon-size-1616 icon-me'>";
			$chat .= "		<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'><g id='following'><g><path fill='#d3b378' d='M9.37,12.69c-1.2-0.53-1.04-0.85-1.08-1.29c-0.01-0.06-0.01-0.12-0.01-0.19c0.41-0.37,0.75-0.87,0.97-1.44c0,0,0.01-0.03,0.01-0.04c0.05-0.13,0.09-0.26,0.12-0.39c0.28-0.06,0.44-0.36,0.5-0.63c0.06-0.11,0.19-0.39,0.16-0.7c-0.04-0.4-0.2-0.59-0.38-0.67c0-0.02,0-0.05,0-0.07c0-0.52-0.05-1.26-0.14-1.74C9.5,5.37,9.47,5.24,9.43,5.1c-0.18-0.6-0.55-1.13-1.04-1.51C7.87,3.2,7.15,3,6.5,3C5.86,3,5.14,3.2,4.63,3.59C4.13,3.97,3.76,4.51,3.58,5.1c-0.04,0.13-0.07,0.27-0.09,0.4C3.4,5.99,3.35,6.74,3.35,7.25c0,0.02,0,0.04,0,0.06c-0.19,0.07-0.36,0.26-0.4,0.68c-0.03,0.31,0.1,0.59,0.16,0.7c0.06,0.28,0.23,0.59,0.51,0.64C3.66,9.47,3.7,9.6,3.75,9.72c0,0.01,0.01,0.02,0.01,0.02l0,0.01c0.22,0.59,0.57,1.1,0.99,1.46c0,0.06-0.01,0.12-0.01,0.17c-0.04,0.44,0.08,0.76-1.12,1.29c-1.2,0.53-3.01,1.1-3.38,1.95C-0.13,15.5,0.02,16,0.02,16h12.96c0,0,0.15-0.5-0.22-1.36C12.38,13.79,10.57,13.22,9.37,12.69z M14.99,2h-2.58l0.29-0.29c0.18-0.18,0.29-0.43,0.29-0.71c0-0.55-0.45-1-1-1c-0.28,0-0.53,0.11-0.71,0.29l-2,2C9.11,2.47,8.99,2.72,8.99,3c0,0.28,0.11,0.53,0.29,0.71l2,2C11.47,5.89,11.72,6,11.99,6c0.55,0,1-0.45,1-1c0-0.28-0.11-0.53-0.29-0.71L12.41,4h2.58c0.55,0,1-0.45,1-1C15.99,2.45,15.54,2,14.99,2z'/></g></g></svg>";
			$chat .= "	</div>";
			$chat .= "	<div class='message-me'>" . $message . "</div>";
			$chat .= "</div>";
		
		// Application Messages	
		} else if ($_SESSION['me'] == $line['sender'] and $line['sender'] == $line['recipient']) {
			$chat .= "<div title='Generated on " . date('d M y @ H:i:s',strtotime($line['timestamp'])) . " GMT' class='flex-start'>";
			$chat .= "	<div class='icon icon-size-1616 icon-app'>";
			$chat .= "		<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 93 100' style='enable-background:new 0 0 93 100;' xml:space='preserve'><g><path d='M46.4,7c21.8,0,39.5,17.8,39.5,39.6S68.1,86.2,46.3,86.2c-4.1,0-8.2-0.7-12.1-1.9l-2.8-0.9l-2.6,1.4l-6.9,3.6l0.2-7l0.1-3.2l-2.4-2.2C3.7,61.2,2.4,36.2,17.1,20C24.6,11.7,35.2,7,46.4,7 M46.4,0C20.7,0-0.1,20.9-0.1,46.6c0,13.1,5.5,25.7,15.2,34.5L14.6,100L32,90.9c24.4,8,50.7-5.4,58.6-29.9S85.2,10.3,60.8,2.3C56.1,0.8,51.3,0,46.4,0L46.4,0z'/></g><g><path d='M41.6,39.3c0,0,9.4-0.8,9.7,8.1c0.2,8.8-8.5,10.1-13.8,9.8c-5.4-0.2-16.8-7.7-15.9-19.6l0.7-4.2l1.9-2.2c0,0,4.4-8.8,14.3-11.5c0,0,0.9-1.4,1.9-1.4c1,0,1.9,1.1,3.4,1.3c1.5,0.2,2.1-1.4,3.5-1.3c1.4,0.1,1.5,1.1,3,1.4s8.9,1.1,14.9,9.3c0,0,0.3,2.1,1.1,2.5c0.9,0.4,2.8,1.2,3.1,1.9c0.3,0.7,2.3,7.8,2.1,10.8c-0.2,3-1,17.2-10.4,21.5l-0.2,2.6c0,0-7,6.3-17.7,5.5c-10.7-0.8-13.6-1.9-16.1-5.3c-0.3-0.5-0.9-2.2-0.9-2.2l-0.9-2c0,0-0.9-1.4,0.9-1.1c1.8,0.3,8.3,2.8,11.9,2.9c3.6,0.1,5.5-1.8,6.2-2c0.7-0.2,4.5-1.7,5.7-1.9c1.1-0.2,8.1-4.5,9.2-14.8S50.9,31,45.6,30.9c0,0-3.3-0.1-4.1,0.4s-5.7,2.7-7.9,3c0,0-1.8,1.7-1.5,3.8c0.3,2.1,0.3,9.3,7.9,9.3C40,47.3,41.8,46.4,41.6,39.3z'/></g></svg>";
			$chat .= "	</div>";
			$chat .= "	<div class='message-app'>" . $message . "</div>";
			$chat .= "</div>";
		}
	}

	// If there's a new message, play the new message sound
	if ($_SESSION['lastMessage'] != $lastOppMsg and $lastString != '' and $_SESSION['sound'] == 'ON' and !isset($_SESSION['blockOpponent']))  {
		echo "<bgsound>";
		echo '<script language="javascript">document.getElementsByTagName("bgsound")[0].src = "newmessage.mp3";</script>';
		$_SESSION['lastMessage'] = $lastOppMsg;
	}
	mysqli_close($connection);
} else {
	$chat = "";
}
?>
<html>
<head>
</head>
<body>
<script>
// Display chat messages in the chat room
parent.document.getElementById('chat').innerHTML = "<?php echo $chat; ?>";

// Scroll to the bottom of the chat room
<?php echo $scroll; ?>
</script>
</body>
</html>