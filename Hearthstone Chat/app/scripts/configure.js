// Global Variables
var wShell = new ActiveXObject("WScript.Shell");
var oFSO = new ActiveXObject("Scripting.FileSystemObject");
var oFile, sender, recipient, coinPlayer, player;
var ForReading = 1;
var ForWriting = 2;
var ForAppending = 8;

configureApp();
function configureApp() {
	// Read app.config file and create application setting cookies
	oFile = oFSO.OpenTextFile("app/app.config", ForReading);
	while(!oFile.AtEndOfStream) { document.cookie = oFile.ReadLine() + ";" + expires() + ";path=/"; }
	oFile.Close();
	
	// Resize and position window
	var w = getCookie("appWidth");
	var h = getCookie("appHeight");
	window.resizeTo (w, h);
	if (getCookie("appX") == "" || getCookie("appY") == "") {
		if (getCookie("appPosition") == "lower-left") {
			window.moveTo (0, (screen.availHeight - h));
		} else if (getCookie("appPosition") == "lower-right") {
			window.moveTo ((screen.availWidth - w), (screen.availHeight - h));
		} else if (getCookie("appPosition") == "upper-left") {
			window.moveTo (0, 0);
		} else if (getCookie("appPosition") == "upper-right") {
			window.moveTo ((screen.availWidth - w), 0);
		} else {
			window.moveTo ((screen.availWidth - w) / 2, (screen.availHeight - h) / 2); // Centered
		}
	} else {
		window.moveTo (getCookie("appX"), getCookie("appY"));
	}
	
	// Find Power.log directory
	try {
		if (getCookie("powerlogDir") == "") {
			// Try the common directory choices first
			if (oFSO.FolderExists(wShell.ExpandEnvironmentStrings("%PROGRAMFILES%") + "\\Hearthstone\\Logs")) {
				powerlogDir = wShell.ExpandEnvironmentStrings("%PROGRAMFILES%") + "\\Hearthstone\\Logs";
			} else if (oFSO.FolderExists(wShell.ExpandEnvironmentStrings("%PROGRAMFILES(x86)%") + "\\Hearthstone\\Logs")) {
				powerlogDir = wShell.ExpandEnvironmentStrings("%PROGRAMFILES(x86)%") + "\\Hearthstone\\Logs";
			} else if(oFSO.FolderExists("C:\\Program Files\\Hearthstone\\Logs")) {
				powerlogDir = "C:\\Program Files\\Hearthstone\\Logs";
			} else if(oFSO.FolderExists("C:\\Program Files (x86)\\Hearthstone\\Logs")) {
				powerlogDir = "C:\\Program Files (x86)\\Hearthstone\\Logs";
			} else if(oFSO.FolderExists("D:\\Program Files\\Hearthstone\\Logs")) {
				powerlogDir = "D:\\Program Files\\Hearthstone\\Logs";
			} else if(oFSO.FolderExists("D:\\Program Files (x86)\\Hearthstone\\Logs")) {
				powerlogDir = "D:\\Program Files (x86)\\Hearthstone\\Logs";
			} else if(oFSO.FolderExists("E:\\Program Files\\Hearthstone\\Logs")) {
				powerlogDir = "E:\\Program Files\\Hearthstone\\Logs";
			} else if(oFSO.FolderExists("E:\\Program Files (x86)\\Hearthstone\\Logs")) {
				powerlogDir = "E:\\Program Files (x86)\\Hearthstone\\Logs";
			} else if (oFSO.FolderExists("C:\\Battle.net\\Hearthstone\\Logs")) {
				powerlogDir = "C:\\Battle.net\\Hearthstone\\Logs";
			} else if (oFSO.FolderExists("D:\\Battle.net\\Hearthstone\\Logs")) {
				powerlogDir = "D:\\Battle.net\\Hearthstone\\Logs";
			} else if (oFSO.FolderExists("E:\\Battle.net\\Hearthstone\\Logs")) {
				powerlogDir = "E:\\Battle.net\\Hearthstone\\Logs";
			} else {
				// Manual entry will go here
				return false;
			}
			UpdateAppConfigFile("powerlogDir",powerlogDir);
			document.cookie = "powerlogDir=" + powerlogDir + ";" + expires() + ";path=/";
		}
	} catch (error) {
		alert(error);
	}
}

// Update a setting in the applicatuon configuration file
function UpdateAppConfigFile(setting,value) {
	// Get application settings
	if (oFSO.FileExists("app/app.config")) {
		oFile = oFSO.OpenTextFile("app/app.config", ForReading);
		var appSetting = oFile.ReadAll()
		oFile.Close();
		
		var appSettings = appSetting.split("\r\n");
		
		// Overwrite all application settings
		oFile = oFSO.OpenTextFile("app/app.config", ForWriting, false);
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

// Cookies
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function expires() {
	var d = new Date();
  	d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
  	return "expires="+d.toUTCString();
}