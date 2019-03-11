// Configuration Files
try {
	var wShell = new ActiveXObject("WScript.Shell");
	var oFSO = new ActiveXObject("Scripting.FileSystemObject");
	var logConfigDir = wShell.ExpandEnvironmentStrings("%LocalAppData%") + "\\Blizzard\\Hearthstone\\";
	var appConfigFile = logConfigDir + "hearthstone.chat.config";
	var logConfigFile = logConfigDir + "log.config";
	var oFile;
} catch (error) {
	alert(error);
}
try {
	// Create hearthstone.chat.config with application settings only if it doesn't exist
	if (oFSO.FileExists(appConfigFile) == false) {
		oFile = oFSO.CreateTextFile(appConfigFile, 2, true); // ForWriting
		oFile.WriteLine("applicationHeight=");
		oFile.WriteLine("applicationWidth=");
		oFile.WriteLine("applicationX=");
		oFile.WriteLine("applicationY=");
		oFile.WriteLine("applicationSound=ON");
		oFile.WriteLine("profanityFilter=OFF");
		oFile.WriteLine("theme=");
		oFile.Close();
	}
	// Get application settings
	if (oFSO.FileExists(appConfigFile)) {
		oFile = oFSO.OpenTextFile(appConfigFile, 1); // ForReading
		
		// Create application setting cookies
		while(!oFile.AtEndOfStream) {
			cookie = oFile.ReadLine();
			document.cookie = cookie + ";" + expires() + ";path=/";
		}
		oFile.Close();
		
		// Create user blocked opponent setting
		document.cookie = "blockedOpponent=OFF"+ ";" + expires() + ";path=/";
	} else {
		// If no app config file exists, auto-disable certain app features
		// Disable Sound
		document.cookie = "applicationSound=OFF" + ";" + expires() + ";path=/";
		document.getELementById("soundIcon").style.display = 'none';
	}
} catch (error) {
	alert(error);
}

try {	
	// Create log.config with Power.log settings only if it doesn't exist
	if (oFSO.FileExists(logConfigFile) == false) {
		oFile = oFSO.CreateTextFile(logConfigFile, 2, true); // ForWriting
		oFile.WriteLine("[Power]");
		oFile.WriteLine("LogLevel=1");
		oFile.WriteLine("FilePrinting=True");
		oFile.WriteLine("ConsolePrinting=False");
		oFile.WriteLine("ScreenPrinting=False");
		oFile.WriteLine("Verbose=True");
		oFile.Close();
	} else if (oFSO.FileExists(logConfigFile)) {
		oFile = oFSO.OpenTextFile(logConfigFile, 1);
		configSettings = oFile.ReadAll();
		oFile.Close();
		
		if (configSettings.indexOf("[Power]\r\nLogLevel=1\r\nFilePrinting=True\r\nConsolePrinting=False\r\nScreenPrinting=False\r\nVerbose=True") == -1 ) {
			oFile = oFSO.OpenTextFile(logConfigFile, 8, true); // ForAppending
			oFile.WriteLine("");
			oFile.WriteLine("[Power]");
			oFile.WriteLine("LogLevel=1");
			oFile.WriteLine("FilePrinting=True");
			oFile.WriteLine("ConsolePrinting=False");
			oFile.WriteLine("ScreenPrinting=False");
			oFile.WriteLine("Verbose=True");
			oFile.Close();
		}
	}
} catch (error) {
	alert(error);
}

// Read Power.log every 5 seconds
ReadLog();
function ReadLog() {
	// Find Power.log
	try {
		if (oFSO.FileExists(wShell.ExpandEnvironmentStrings("%PROGRAMFILES%") + "\\Hearthstone\\Logs\\Power.log")) {
			logFile = wShell.ExpandEnvironmentStrings("%PROGRAMFILES%") + "\\Hearthstone\\Logs\\Power.log";
		} else if (oFSO.FileExists(wShell.ExpandEnvironmentStrings("%PROGRAMFILES(x86)%") + "\\Hearthstone\\Logs\\Power.log")) {
			logFile = wShell.ExpandEnvironmentStrings("%PROGRAMFILES(x86)%") + "\\Hearthstone\\Logs\\Power.log";
		} else if(oFSO.FileExists("C:\\Program Files\\Hearthstone\\Logs\\Power.log")) {
			logFile = "C:\\Program Files\\Hearthstone\\Logs\\Power.log\\Power.log";
		} else if(oFSO.FileExists("C:\\Program Files (x86)\\Hearthstone\\Logs\\Power.log")) {
			logFile = "C:\\Program Files (x86)\\Hearthstone\\Logs\\Power.log\\Power.log";
		} else if (oFSO.FileExists("C:\\Battle.net\\Hearthstone\\Logs\\Power.log")) {
			logFile = "C:\\Battle.net\\Hearthstone\\Logs\\Power.log";
		} else if (oFSO.FileExists("D:\\Battle.net\\Hearthstone\\Logs\\Power.log")) {
			logFile = "D:\\Battle.net\\Hearthstone\\Logs\\Power.log";
		} else {
			// [WIP] Add a popup for user to navigate to the correct logs folder and submit that location to database
			alert("Unable to locate your Hearthstone log file.");
			return false;
		}
	} catch (error) {
		alert(error);
	}
	
	// Read Power.log
	try {
		var sender, recipient, coinPlayer, player;
		
		oFile = oFSO.OpenTextFile(logFile, 1); // ForReading
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
		alert(error);
	}
	
	// Send variables and URL to chat
	if ((sender != '' && sender !== undefined) && (recipient != '' && recipient !== undefined)) {
		
		name = recipient.split("#")[0];
		document.getElementById("opponentName").innerHTML = name;
		
		document.getElementById("sender").value = sender
		document.getElementById("senderMenu").value = sender
		
		// Reset user blocked opponent setting
		if (document.getElementById("recipient").value != recipient) {
			document.cookie = "blockedOpponent=OFF"+ ";" + expires() + ";path=/";
			document.getElementById("blockIcon").title = "The opponent's messages are unblocked, click to block them.";document.getElementById("blockIcon").innerHTML = '<svg version="1.1" xmlns=http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="disable"><g><path fill="#FF7373" fill-rule="evenodd" clip-rule="evenodd" d="M7.99-0.01c-4.42,0-8,3.58-8,8s3.58,8,8,8s8-3.58,8-8S12.41-0.01,7.99-0.01zM1.99,7.99c0-3.31,2.69-6,6-6c1.3,0,2.49,0.42,3.47,1.12l-8.35,8.35C2.41,10.48,1.99,9.29,1.99,7.99z M7.99,13.99c-1.3,0-2.49-0.42-3.47-1.12l8.35-8.35c0.7,0.98,1.12,2.17,1.12,3.47C13.99,11.31,11.31,13.99,7.99,13.99z"/></g></g></svg>';
			document.getElementById("opponentIcon").innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="Person"><g><path fill="#f5f8fa" d="M15.68,14.32c-0.46-1.05-2.68-1.75-4.16-2.4c-1.48-0.65-1.28-1.05-1.33-1.59c-0.01-0.07-0.01-0.15-0.01-0.23c0.51-0.45,0.92-1.07,1.19-1.78c0,0,0.01-0.04,0.02-0.05c0.06-0.15,0.11-0.32,0.15-0.48c0.34-0.07,0.54-0.44,0.61-0.78c0.08-0.14,0.23-0.48,0.2-0.87c-0.05-0.5-0.25-0.73-0.47-0.82c0-0.03,0-0.06,0-0.09c0-0.63-0.06-1.55-0.17-2.15c-0.02-0.17-0.06-0.33-0.11-0.5c-0.22-0.73-0.67-1.4-1.28-1.86C9.68,0.25,8.79-0.01,8-0.01c-0.79,0-1.68,0.25-2.31,0.73C5.08,1.19,4.63,1.85,4.41,2.58C4.36,2.75,4.32,2.91,4.3,3.08c-0.12,0.6-0.17,1.51-0.17,2.15c0,0.03,0,0.05,0,0.08C3.89,5.4,3.68,5.63,3.63,6.14C3.6,6.52,3.76,6.86,3.83,7c0.08,0.35,0.28,0.72,0.63,0.78C4.5,7.95,4.55,8.11,4.61,8.27c0,0.01,0.01,0.02,0.01,0.03l0.01,0.01c0.27,0.72,0.7,1.35,1.22,1.8c0,0.07-0.01,0.14-0.01,0.21c-0.05,0.54,0.1,0.94-1.37,1.59c-1.48,0.65-3.7,1.35-4.16,2.4c-0.46,1.05-0.27,1.67-0.27,1.67h15.92C15.95,15.99,16.14,15.37,15.68,14.32z"/></g></g></svg></div>';
			document.getElementById("opponentName").style.color = '#f5f8fa';
		}
		
		document.getElementById("recipient").value = recipient
		document.getElementById("recipientMenu").value = recipient
	
		url = encodeURI("chat.php?sender=" + sender + "&recipient=" + recipient);
		url = url.replace(/#/g, "::");
		document.getElementById("chat-iframe").src = url + "&t=" + new Date().getTime();
		
		// Refocus on Message textbox
		document.getElementById('message').focus();
	}
	
	setTimeout(ReadLog, 5000); // 5 second loop
}