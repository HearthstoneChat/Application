
// Scan Power.log every 5 seconds
ReadPowerLog(getCookie("powerlogDir") + "\\Power.log");
function ReadPowerLog(powerlog) {
	
	// Find most current sender (you) and recipient (opponent)
	try {
		oFile = oFSO.OpenTextFile(powerlog, ForReading);
		while(!oFile.AtEndOfStream){
			line = oFile.ReadLine();
			
			// Check player with the coin to determine if they're the sender or recipient (opponent)
			if (line.indexOf('ChoiceType=MULLIGAN CountMin=0 CountMax=5') > -1) {
				coinPlayer = line.split("Player=")[1].split(" TaskList=")[0];
			}
			
			if (line.indexOf('Entities[4]=[entityName=The Coin') > -1 && line.indexOf('zone=HAND zonePos=5 cardId=GAME_005') > -1) {
				// Me
				sender = coinPlayer;
			} else if (line.indexOf('Entities[4]=[entityName=UNKNOWN ENTITY') > -1 && line.indexOf('zone=HAND zonePos=5') > -1) {
				// Opponent
				recipient = coinPlayer;
			} else if (line.indexOf('Entities[4]=[entityName=The Coin') > -1 && line.indexOf('zone=HAND zonePos=5 cardId=GAME_005') > -1) {
				// Opponent
				recipient = coinPlayer;
			}

			if (line.indexOf('ChoiceType=MULLIGAN CountMin=0 CountMax=3') > -1 && recipient == coinPlayer) {
				// Me
				sender = line.split("Player=")[1].split(" TaskList=")[0];
			} else if (line.indexOf('ChoiceType=MULLIGAN CountMin=0 CountMax=3') > -1 && sender == coinPlayer) {
				recipient = line.split("Player=")[1].split(" TaskList=")[0];
			}
			
			// Opponents (Recipients)
			var tag = /[a-zA-Z0-9]#\d{4}/g;
			if (line.indexOf('TAG_CHANGE Entity=') > -1 && tag.test(line)) {
				player = line.split("TAG_CHANGE Entity=")[1].split(" ")[0];
				if (player != sender && sender !== undefined) { recipient = player; }
			}
		}
		oFile.Close();
	} catch(error) {
		// alert(error);
	}

	// Connect to chat server
	try {
		if ((sender != '' && sender !== undefined) && (recipient != '' && recipient !== undefined)) {
		
			document.getElementById("sender").value = sender
			document.getElementById("recipient").value = recipient;
			//document.getElementById("opponentName").innerHTML = recipient.split("#")[0];
			document.getElementById("opponentName").innerHTML = recipient;
			
			url = encodeURI("https://app.hearthstone.chat/chat2.php?sender=" + sender + "&recipient=" + recipient);
			
			// Add chat.config settings to url
			url += "&appSounds=" + getCookie("appSounds");
			url += "&profanityFilter=" + getCookie("profanityFilter");
			
			// Check banned users
			if (getCookie("bannedUsers").indexOf(recipient) > -1) {
				url += "&bannedUser=" + recipient;
				document.getElementById("opponentName").classList.add("bannedUser");
				document.getElementById("opponentName").title = recipient + "'s messages are blocked.";
				BanStatus('banned');
			} else { BanStatus('unbanned'); }
			
			
			// Add time for a non-cached page
			url += "&time=" + new Date();
			
			url = url.replace(/#/g, "::");
			document.getElementById("chat-iframe").src = url;
		} else {
			
			document.getElementById("opponentName").innerHTML = "<span class='color-innkeeper'>Innkeeper</span>";
			document.getElementById("chat").innerHTML = '<div class="chat-message"><div class="chat-message-text-innkeeper">Welcome to my Inn!<br><br>I\'m waiting on data from your Power.log located in: ' + getCookie("powerlogDir") + '</div></div>';
		}
	} catch (error) {
		//alert(error);
	}
	
	// Keep focus on message textbox
	document.getElementById('message').focus();
	
	setTimeout(function() { ReadPowerLog(powerlog); }, 5000); // 5 second loop
}
