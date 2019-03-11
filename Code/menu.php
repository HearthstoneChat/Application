<?php
session_start();

// Database variables
include("database.php");

// Apply menu option
if (isset($_POST['senderMenu']) and $_POST['senderMenu'] != 'UNKNOWN_HUMAN_PLAYER' and $_POST['senderMenu'] != '' and isset($_POST['recipientMenu']) and isset($_POST['menuOption'])) {
	
	// Connect to the database
	$connection = mysqli_connect($hostName,$dbUser,$dbPassword,$dbName);
	if (!$connection) { die('Could not connect: ' . mysql_error()); }
	
	$sender = $_POST['senderMenu'];
	$recipient = $_POST['recipientMenu'];
	$recipientArr = explode("#",$recipient);
	$recipientName = $recipientArr[0];
	$chatID = $sender . $recipient;

	// Copied Opponent's BattleTag
	if ($_POST['menuOption'] == 'copyBattleTag') {
		//$message = $_POST['recipientMenu'] . "'s BattleTag copied to clipboard.";
		$message = $recipientName . "'s BattleTag copied to clipboard.";
	} else if ($_POST['menuOption'] == 'toggleSound') {
		// Application Sound Effects setting
		$_SESSION['sound'] = $_POST['menuValue'];
		$message = "Sound effects are " . $_SESSION['sound'] . ".";
	} else if ($_POST['menuOption'] == 'filterProfanity') {
		// Filter/Unfilter Profanity Words
		$_SESSION['filterMessages'] = $_POST['menuValue'];
		$message = "The profanity filter is " . $_SESSION['filterMessages'] . ".";
	} else if ($_POST['menuOption'] == 'blockOpponent') {
		// Block/Unblock Opponent's Messages
		if (isset($_POST['menuValue']) and !isset($_SESSION['blockOpponent'])) {
			$_SESSION['blockOpponent'] = $_POST['menuValue'];
			$message = $recipientName . "'s messages are blocked.";
		} else if (isset($_POST['menuValue']) and $_SESSION['blockOpponent'] == $_POST['menuValue']) {
			unset($_SESSION['blockOpponent']);
			$message = $recipientName . "'s messages are unblocked.";
		}
	}
	
	// Add a system message to the database - these are marked by having the same sender and recipient, it's stored in the database for only 1 minute
	mysqli_query($connection,"INSERT INTO chat VALUES ('" . $chatID . "','" . $sender . "','" . $sender . "','" . htmlspecialchars($message, ENT_QUOTES) . "','" . gmdate('Y-m-d H:i:s') . "');");
	
	// Disconnect from the database
	mysqli_close($connection);
	
	// Replace # in BattleTags to avoid breaking url parameters
	$url = "chat.php?sender=" . $sender . "&recipient=" . $recipient;
	$url = str_replace("#","::",$url);

	// Redirect to chat.php to force chat room update
	header("location: " . $url);
}
?>