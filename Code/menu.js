// Menu Options

// Copy your current opponent's BattleTag
function CopyBattleTag() {
	// Copy BattleTag to your clipboard
	window.clipboardData.setData("Text", document.getElementById("recipient").value);
	
	document.getElementById("menuOption").value = "copyBattleTag";
	document.getElementById("menuValue").value = document.getElementById("recipientMenu").value;
	document.getElementById("menu-form").submit();
}

// Toggle application sound effects
function ToggleSound() {
	// Update cookies and app configuration file
	if (getCookie("applicationSound") == "ON") {
		document.cookie = "applicationSound=OFF"+ ";" + expires() + ";path=/";
		UpdateAppConfigFile('applicationSound','OFF');
	} else if (getCookie("applicationSound") == "OFF") {
		document.cookie = "applicationSound=ON"+ ";" + expires() + ";path=/";
		UpdateAppConfigFile('applicationSound','ON');
	}
	SubmitSound();
}
SubmitSound(); // Run on page load
function SubmitSound() {
	var soundSetting = getCookie("applicationSound");
	
	if (soundSetting == "ON") {
		document.getElementById("soundIcon").title = "Sound effects are ON, click to turn them OFF.";
		document.getElementById("soundIcon").innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="volume_up"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M7,1.86c-0.28,0-0.53,0.11-0.71,0.29L3.59,4.86H1c-0.55,0-1,0.45-1,1v4c0,0.55,0.45,1,1,1h2.59l2.71,2.71c0.18,0.18,0.43,0.29,0.71,0.29c0.55,0,1-0.45,1-1v-10C8,2.31,7.55,1.86,7,1.86z M13.74,0.87l-1.58,1.22C13.31,3.72,14,5.71,14,7.86c0,2.16-0.69,4.15-1.85,5.78l1.58,1.22c1.42-1.97,2.26-4.38,2.26-7C16,5.25,15.15,2.84,13.74,0.87z M8.98,4.52C9.62,5.48,10,6.63,10,7.86s-0.38,2.39-1.02,3.34l1.59,1.22C11.47,11.13,12,9.56,12,7.86c0-1.7-0.53-3.27-1.43-4.56L8.98,4.52z"/></g></g></svg>';
	} else if (soundSetting == "OFF") {
		document.getElementById("soundIcon").title = "Sound effects are OFF, click to turn them ON.";
		document.getElementById("soundIcon").innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"><g id="no_volume"><g><path d="M7,1.9C6.7,1.9,6.5,2,6.3,2.2L3.6,4.9H1c-0.5,0-1,0.5-1,1v4c0,0.5,0.5,1,1,1h2.6l2.7,2.7c0.2,0.2,0.4,0.3,0.7,0.3c0.5,0,1-0.5,1-1v-10C8,2.3,7.5,1.9,7,1.9z"/><path d="M13.4,7.7l2-2c0.1-0.1,0.2-0.3,0.2-0.4c0-0.3-0.3-0.6-0.6-0.6c-0.2,0-0.3,0.1-0.4,0.2l-2,2l-2-2c-0.1-0.1-0.3-0.2-0.4-0.2C9.8,4.7,9.6,5,9.6,5.3c0,0.2,0.1,0.3,0.2,0.4l2,2l-2,2C9.6,9.8,9.6,10,9.6,10.1c0,0.3,0.3,0.6,0.6,0.6c0.2,0,0.3-0.1,0.4-0.2l2-2l2,2c0.1,0.1,0.3,0.2,0.4,0.2c0.3,0,0.6-0.3,0.6-0.6c0-0.2-0.1-0.3-0.2-0.4L13.4,7.7z"/></g></g></svg>';
	}
	
	document.getElementById("menuOption").value = "toggleSound";
	document.getElementById("menuValue").value = soundSetting;
	document.getElementById("menu-form").submit();
}

// Block/unblock your opponent's messages
function BlockOpponent() {
	if (getCookie("blockedOpponent") == "ON") {
		document.cookie = "blockedOpponent=OFF"+ ";" + expires() + ";path=/";
		document.getElementById("blockIcon").title = "The opponent's messages are unblocked, click to block them.";document.getElementById("blockIcon").innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="disable"><g><path fill="#FF7373" fill-rule="evenodd" clip-rule="evenodd" d="M7.99-0.01c-4.42,0-8,3.58-8,8s3.58,8,8,8s8-3.58,8-8S12.41-0.01,7.99-0.01zM1.99,7.99c0-3.31,2.69-6,6-6c1.3,0,2.49,0.42,3.47,1.12l-8.35,8.35C2.41,10.48,1.99,9.29,1.99,7.99z M7.99,13.99c-1.3,0-2.49-0.42-3.47-1.12l8.35-8.35c0.7,0.98,1.12,2.17,1.12,3.47C13.99,11.31,11.31,13.99,7.99,13.99z"/></g></g></svg>';
		
		document.getElementById("opponentIcon").innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="Person"><g><path fill="#f5f8fa" d="M15.68,14.32c-0.46-1.05-2.68-1.75-4.16-2.4c-1.48-0.65-1.28-1.05-1.33-1.59c-0.01-0.07-0.01-0.15-0.01-0.23c0.51-0.45,0.92-1.07,1.19-1.78c0,0,0.01-0.04,0.02-0.05c0.06-0.15,0.11-0.32,0.15-0.48c0.34-0.07,0.54-0.44,0.61-0.78c0.08-0.14,0.23-0.48,0.2-0.87c-0.05-0.5-0.25-0.73-0.47-0.82c0-0.03,0-0.06,0-0.09c0-0.63-0.06-1.55-0.17-2.15c-0.02-0.17-0.06-0.33-0.11-0.5c-0.22-0.73-0.67-1.4-1.28-1.86C9.68,0.25,8.79-0.01,8-0.01c-0.79,0-1.68,0.25-2.31,0.73C5.08,1.19,4.63,1.85,4.41,2.58C4.36,2.75,4.32,2.91,4.3,3.08c-0.12,0.6-0.17,1.51-0.17,2.15c0,0.03,0,0.05,0,0.08C3.89,5.4,3.68,5.63,3.63,6.14C3.6,6.52,3.76,6.86,3.83,7c0.08,0.35,0.28,0.72,0.63,0.78C4.5,7.95,4.55,8.11,4.61,8.27c0,0.01,0.01,0.02,0.01,0.03l0.01,0.01c0.27,0.72,0.7,1.35,1.22,1.8c0,0.07-0.01,0.14-0.01,0.21c-0.05,0.54,0.1,0.94-1.37,1.59c-1.48,0.65-3.7,1.35-4.16,2.4c-0.46,1.05-0.27,1.67-0.27,1.67h15.92C15.95,15.99,16.14,15.37,15.68,14.32z"/></g></g></svg></div>';
		document.getElementById("opponentName").style.color = '#f5f8fa';
		
	} else if (getCookie("blockedOpponent") == "OFF") {
		document.cookie = "blockedOpponent=ON"+ ";" + expires() + ";path=/";
		document.getElementById("blockIcon").title = "The opponent's messages are blocked, click to unblock them.";document.getElementById("blockIcon").innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="disable"><g><path fill="#f5f8fa" fill-rule="evenodd" clip-rule="evenodd" d="M7.99-0.01c-4.42,0-8,3.58-8,8s3.58,8,8,8s8-3.58,8-8S12.41-0.01,7.99-0.01zM1.99,7.99c0-3.31,2.69-6,6-6c1.3,0,2.49,0.42,3.47,1.12l-8.35,8.35C2.41,10.48,1.99,9.29,1.99,7.99z M7.99,13.99c-1.3,0-2.49-0.42-3.47-1.12l8.35-8.35c0.7,0.98,1.12,2.17,1.12,3.47C13.99,11.31,11.31,13.99,7.99,13.99z"/></g></g></svg>';
		
		document.getElementById("opponentIcon").innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="blocked_person"><g><path fill="#FF7373" fill-rule="evenodd" clip-rule="evenodd" d="M9.39,12.69c-1.2-0.53-1.04-0.85-1.08-1.29C8.3,11.33,8.3,11.27,8.29,11.2c0.41-0.37,0.75-0.87,0.97-1.44c0,0,0.01-0.03,0.01-0.04C9.32,9.59,9.36,9.46,9.4,9.33C9.67,9.27,9.83,8.97,9.9,8.7c0.01-0.03,0.03-0.08,0.05-0.12C8.18,7.8,6.94,6.04,6.94,4c0-0.32,0.04-0.62,0.09-0.92C6.86,3.05,6.68,3,6.52,3C5.87,3,5.15,3.2,4.64,3.59C4.14,3.97,3.77,4.51,3.59,5.1C3.55,5.24,3.52,5.37,3.5,5.51C3.41,5.99,3.36,6.74,3.36,7.25c0,0.02,0,0.04,0,0.06C3.17,7.39,3,7.58,2.96,7.99c-0.03,0.31,0.1,0.59,0.16,0.7c0.06,0.28,0.23,0.59,0.51,0.64C3.67,9.47,3.71,9.6,3.76,9.72c0,0.01,0.01,0.02,0.01,0.02l0,0.01c0.22,0.59,0.57,1.1,0.99,1.46c0,0.06-0.01,0.12-0.01,0.17c-0.04,0.44,0.08,0.76-1.12,1.29c-1.2,0.53-3.01,1.1-3.38,1.95C-0.12,15.5,0.03,16,0.03,16h12.96c0,0,0.15-0.5-0.22-1.36C12.4,13.79,10.59,13.22,9.39,12.69z M11.97,0C9.75,0,7.94,1.79,7.94,4c0,2.21,1.8,4,4.03,4S16,6.21,16,4C16,1.79,14.2,0,11.97,0z M9.96,4c0-1.1,0.9-2,2.01-2c0.37,0,0.72,0.11,1.02,0.28l-2.75,2.73C10.07,4.71,9.96,4.37,9.96,4z M11.97,6c-0.37,0-0.72-0.11-1.02-0.28l2.75-2.73c0.18,0.3,0.28,0.64,0.28,1.01C13.99,5.1,13.08,6,11.97,6z"/></g></g></svg>';
		document.getElementById("opponentName").style.color = '#FF7373';
	}

	document.getElementById("menuOption").value = "blockOpponent";
	document.getElementById("menuValue").value = document.getElementById("recipient").value;
	document.getElementById("menu-form").submit();
}

// Filter/unfilter profanity in messages
function FilterProfanity() {
	// Update cookies and app configuration file
	if (getCookie("profanityFilter") == "ON") {
		document.cookie = "profanityFilter=OFF"+ ";" + expires() + ";path=/";
		UpdateAppConfigFile('profanityFilter','OFF');
	} else if (getCookie("profanityFilter") == "OFF") {
		document.cookie = "profanityFilter=ON"+ ";" + expires() + ";path=/";
		UpdateAppConfigFile('profanityFilter','ON');
	}
	
	SubmitProfanityFilter();
}
SubmitProfanityFilter(); // Run on page load
function SubmitProfanityFilter() {
	var profanitySetting = getCookie("profanityFilter");
	
	if (profanitySetting == "ON") {
		document.getElementById("profanityIcon").innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="keep_filter"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M15,10c-0.28,0-0.53,0.11-0.71,0.29L12,12.59l-1.29-1.29C10.53,11.11,10.28,11,10,11c-0.55,0-1,0.45-1,1c0,0.28,0.11,0.53,0.29,0.71l2,2C11.47,14.89,11.72,15,12,15s0.53-0.11,0.71-0.29l3-3C15.89,11.53,16,11.28,16,11C16,10.45,15.55,10,15,10z M12,2c0-0.55-0.45-1-1-1H1C0.45,1,0,1.45,0,2c0,0.28,0.11,0.53,0.29,0.71L4,6.41V12c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l2-2C7.89,10.53,8,10.28,8,10V6.41l3.71-3.71C11.89,2.53,12,2.28,12,2z"/></g></g></svg>';
		document.getElementById("profanityIcon").title = "The profanity filter is ON, click to turn it OFF.";
	} else if (profanitySetting == "OFF") {
		document.getElementById("profanityIcon").innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="remove_filter"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M12,2c0-0.55-0.45-1-1-1H1C0.45,1,0,1.45,0,2c0,0.28,0.11,0.53,0.29,0.71L4,6.41V12c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l2-2C7.89,10.53,8,10.28,8,10V6.41l3.71-3.71C11.89,2.53,12,2.28,12,2zM14.41,12l1.29-1.29C15.89,10.53,16,10.28,16,10c0-0.55-0.45-1-1-1c-0.28,0-0.53,0.11-0.71,0.29L13,10.59l-1.29-1.29C11.53,9.11,11.28,9,11,9c-0.55,0-1,0.45-1,1c0,0.28,0.11,0.53,0.29,0.71L11.59,12l-1.29,1.29C10.11,13.47,10,13.72,10,14c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29L13,13.41l1.29,1.29C14.47,14.89,14.72,15,15,15c0.55,0,1-0.45,1-1c0-0.28-0.11-0.53-0.29-0.71L14.41,12z"/></g></g></svg>';
		document.getElementById("profanityIcon").title = "The profanity filter is OFF, click to turn it ON.";
	}
	
	document.getElementById("menuOption").value = "filterProfanity";
	document.getElementById("menuValue").value = profanitySetting;
	document.getElementById("menu-form").submit();
}

// Update a setting in the applicatuon configuration file
function UpdateAppConfigFile(setting,value) {
	// Get application settings
	if (oFSO.FileExists(appConfigFile)) {
		oFile = oFSO.OpenTextFile(appConfigFile, 1); // ForReading
		var appSetting = oFile.ReadAll()
		oFile.Close();
		
		var appSettings = appSetting.split("\r\n");
		
		// Overwrite all application settings
		oFile = oFSO.OpenTextFile(appConfigFile, 2, false); // ForWriting
		for (var i = 0; i < appSettings.length; i++) {
			// Update corresponding setting
			if (appSettings[i].indexOf(setting) > -1) {
				appSettings[i] = setting + "=" + value;
			}
			if (appSettings[i] != '') {
				oFile.WriteLine(appSettings[i]);
			}
		}
		oFile.Close();
	}
}