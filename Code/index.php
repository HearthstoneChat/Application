<?php
session_start();
$_SESSION['version'] = '1.0.0';
?>
<!DOCTYPE html>
<html lang="en-US">
<head>
	<title>Hearthstone Chat v<?php echo $_SESSION['version']; ?></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=11,chrome=1">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body onunload="javascript:return Logout();">
<div id="header">
	<div id="header-opponent" title="Click to copy your opponent's BattleTag" onclick="javascript:CopyBattleTag();">
		<div id="opponentIcon" class="icon icon-size-1818"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="Person"><g><path fill="#f5f8fa" d="M15.68,14.32c-0.46-1.05-2.68-1.75-4.16-2.4c-1.48-0.65-1.28-1.05-1.33-1.59c-0.01-0.07-0.01-0.15-0.01-0.23c0.51-0.45,0.92-1.07,1.19-1.78c0,0,0.01-0.04,0.02-0.05c0.06-0.15,0.11-0.32,0.15-0.48c0.34-0.07,0.54-0.44,0.61-0.78c0.08-0.14,0.23-0.48,0.2-0.87c-0.05-0.5-0.25-0.73-0.47-0.82c0-0.03,0-0.06,0-0.09c0-0.63-0.06-1.55-0.17-2.15c-0.02-0.17-0.06-0.33-0.11-0.5c-0.22-0.73-0.67-1.4-1.28-1.86C9.68,0.25,8.79-0.01,8-0.01c-0.79,0-1.68,0.25-2.31,0.73C5.08,1.19,4.63,1.85,4.41,2.58C4.36,2.75,4.32,2.91,4.3,3.08c-0.12,0.6-0.17,1.51-0.17,2.15c0,0.03,0,0.05,0,0.08C3.89,5.4,3.68,5.63,3.63,6.14C3.6,6.52,3.76,6.86,3.83,7c0.08,0.35,0.28,0.72,0.63,0.78C4.5,7.95,4.55,8.11,4.61,8.27c0,0.01,0.01,0.02,0.01,0.03l0.01,0.01c0.27,0.72,0.7,1.35,1.22,1.8c0,0.07-0.01,0.14-0.01,0.21c-0.05,0.54,0.1,0.94-1.37,1.59c-1.48,0.65-3.7,1.35-4.16,2.4c-0.46,1.05-0.27,1.67-0.27,1.67h15.92C15.95,15.99,16.14,15.37,15.68,14.32z"/></g></g></svg></div><div id="opponentName"></div>
	</div>
	<div id="blockIcon" class="icon icon-size-1212" onclick="javascript:BlockOpponent();"></div>
</div>

<!-- Menu Bar -->
<div id="menu">
	<div title="" id="profanityIcon" onclick="javascript:FilterProfanity();"></div>
	<div title="" id="soundIcon" onclick="javascript:ToggleSound();"></div>
</div>

<form id="menu-form" method="post" action="menu.php" target="menu-message-iframe" style="display:hidden;">
	<input type="hidden" id="senderMenu" name="senderMenu" tabindex="-1">
	<input type="hidden" id="recipientMenu" name="recipientMenu" tabindex="-1">
	<input type="hidden" id="menuOption" name="menuOption" tabindex="-1">
	<input type="hidden" id="menuValue" name="menuValue" tabindex="-1">
</form>

<!-- Chat Room -->
<div class="chat-spacer-top"></div>
<div id="chat"></div>
<div class="chat-spacer-bottom"></div>

<!-- Message Texbox -->
<form id="message-form" method="post" action="message.php" target="menu-message-iframe" onsubmit="javascript:return SendMessage();">
	<input type="hidden" id="sender" name="sender" tabindex="-1">
	<input type="hidden" id="recipient" name="recipient" tabindex="-1">
	<input type="text" id="message" name="message" tabindex="1">
	<input type="hidden" id="logOut" name="logOut" tabindex="-1">
	<input type="submit" style="display:none" tabindex="-1">
</form>

<!-- Hidden <iframes> for Client-enabled PHP Functions -->
<iframe id="chat-iframe" name="chat-iframe" application="yes" style="display:none"></iframe>
<iframe id="menu-message-iframe" name="menu-message-iframe" application="yes" style="display:none"></iframe>

<!-- Javascript: Cookie Function -->
<script language="javascript" src="cookies.js"></script>

<!-- Javascript: Menu option functions -->
<script language="javascript" src="menu.js"></script>

<!-- Javascript: Validate message before sending it to the database -->
<script language="javascript" src="message.js"></script>

<!-- Javascript: Create list of autocomplete words/phrases for messages -->
<!--<script language="javascript" src="autocomplete.js"></script>-->

<!-- Javascript: Read the local config and Power.log files -->
<script language="javascript" src="logs.js"></script>
</body>
</html>