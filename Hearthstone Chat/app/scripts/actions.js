// Ban/unban your opponent
function BanOpponent() {
	if (recipient != '' && getCookie("bannedUsers").indexOf(recipient) > -1) {
		var banned = getCookie("bannedUsers").replace(recipient,"");
		document.cookie = "bannedUsers="+ banned + ";" + expires() + ";path=/";
		BanStatus('unbanned');
		
	} else if (recipient != '' && getCookie("bannedUsers").indexOf(recipient) == -1) {
		var banned = getCookie("bannedUsers") + recipient;
		document.cookie = "bannedUsers="+ banned + ";" + expires() + ";path=/";
		BanStatus('banned');
	}
	UpdateAppConfigFile("bannedUsers",banned);
}

function BanStatus(s) {
	if (s == 'unbanned') {
		document.getElementById("banIcon").title = "Click to ban " + recipient + ".";
		document.getElementById("banIcon").innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="disable"><g><path fill="#FF7373" fill-rule="evenodd" clip-rule="evenodd" d="M7.99-0.01c-4.42,0-8,3.58-8,8s3.58,8,8,8s8-3.58,8-8S12.41-0.01,7.99-0.01zM1.99,7.99c0-3.31,2.69-6,6-6c1.3,0,2.49,0.42,3.47,1.12l-8.35,8.35C2.41,10.48,1.99,9.29,1.99,7.99z M7.99,13.99c-1.3,0-2.49-0.42-3.47-1.12l8.35-8.35c0.7,0.98,1.12,2.17,1.12,3.47C13.99,11.31,11.31,13.99,7.99,13.99z"/></g></g></svg>';
		document.getElementById("opponentName").classList.remove("bannedUser");
	} else if (s == 'banned') {
		document.getElementById("banIcon").title = "Click to unban " + recipient + ".";
		document.getElementById("banIcon").innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"><g id="endorsed"><g><path fill="#f5f8fa" fill-rule="evenodd" clip-rule="evenodd" d="M15.86,7.5l-0.81-1.42V4.5c0-0.36-0.19-0.68-0.49-0.87l-1.37-0.8l-0.81-1.41c-0.19-0.31-0.51-0.49-0.86-0.49H9.89L8.5,0.14c-0.3-0.19-0.69-0.19-1,0l-1.39,0.8H4.52c-0.36,0-0.68,0.19-0.86,0.49L2.86,2.8L1.42,3.63C1.12,3.82,0.93,4.14,0.93,4.5v1.65l-0.8,1.37C0.05,7.67,0,7.84,0,8.01S0.05,8.35,0.14,8.5l0.8,1.37v1.65c0,0.36,0.19,0.68,0.49,0.87l1.42,0.81l0.8,1.37c0.19,0.31,0.51,0.49,0.86,0.49H6.1l1.39,0.8C7.64,15.95,7.81,16,7.97,16s0.34-0.05,0.49-0.14l1.39-0.8h1.63c0.36,0,0.68-0.19,0.86-0.49l0.81-1.41l1.37-0.8c0.3-0.19,0.49-0.51,0.49-0.87V9.93l0.81-1.42C16.05,8.2,16.05,7.82,15.86,7.5z M11.74,6.68l-4.01,4.01c-0.18,0.18-0.43,0.29-0.71,0.29s-0.53-0.11-0.71-0.29L4.31,8.69C4.13,8.5,4.01,8.25,4.01,7.98c0-0.55,0.45-1,1-1c0.28,0,0.53,0.11,0.71,0.29l1.3,1.3l3.3-3.3c0.18-0.18,0.43-0.29,0.71-0.29c0.55,0,1,0.45,1,1C12.04,6.25,11.92,6.5,11.74,6.68z"/></g></g></svg>';
		document.getElementById("opponentName").classList.add("bannedUser");
	}
}