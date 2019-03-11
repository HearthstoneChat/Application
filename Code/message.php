<?php
session_start();

// Database variables
include("database.php");

// Get the posted message
if (isset($_POST['sender']) and $_POST['sender'] != 'UNKNOWN_HUMAN_PLAYER' and $_POST['sender'] != '' and isset($_POST['recipient']) and $_POST['recipient'] != 'UNKNOWN_HUMAN_PLAYER' and $_POST['recipient'] != 'AI_PLAYER' and $_POST['recipient'] != '') {

	$sender = $_POST['sender'];
	$senderParts = explode("#",$sender);
	$senderName = $senderParts[0];
	$recipient = $_POST['recipient'];
	$chatID = $sender . $recipient;
	$message = $_POST['message'];
	
	// Connect to the database
	$connection = mysqli_connect($hostName,$dbUser,$dbPassword,$dbName);
	if (!$connection) { die('Could not connect: ' . mysql_error()); }
	
	// Logout message!
	if (!empty($_POST['logOut'])) {
		
		$byeBye = mysqli_query($connection,"INSERT INTO chat VALUES ('" . $chatID . "','" . $sender . "','" . $recipient . "','<i>" . $senderName . " left chat.</i>','" . gmdate('Y-m-d H:i:s') . "');");
		
		mysqli_close($connection);
		// Replace # in BattleTags to avoid breaking url parameters
		$url = "chat.php?sender=" . $sender . "&recipient=" . $recipient;
		$url = str_replace("#","::",$url);

		// Redirect to chat.php to force chat room update
		header("location: " . $url);
		
		exit;
	}
	
	// Add user message to the database, it's stored in the database for 5 minutes
	if ($message != '') {
		$sendMessage = mysqli_query($connection,"INSERT INTO chat VALUES ('" . $chatID . "','" . $sender . "','" . $recipient . "','" . htmlspecialchars($message, ENT_QUOTES) . "','" . gmdate('Y-m-d H:i:s') . "');");
	}
	// Disconnect from the database
	mysqli_close($connection);
	
	// Replace # in BattleTags to avoid breaking url parameters
	$url = "chat.php?sender=" . $sender . "&recipient=" . $recipient;
	$url = str_replace("#","::",$url);

	// Redirect to chat.php to force chat room update
	header("location: " . $url);
}
?>