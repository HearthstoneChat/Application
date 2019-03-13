function SendMessage() {
	if (document.getElementById('message').value != '' && document.getElementById('sender').value != '' && 	document.getElementById('recipient').value != '') {
		document.getElementById('message-form').submit();
		document.getElementById('message').value='';
		document.getElementById('message').focus();
	}
	return false; // So form doesn't submit twice
}

function Logout() {
	if (document.getElementById('sender').value != '' && document.getElementById('recipient').value != '') {
		document.getElementById('logOut').value = 'bye';
		document.getElementById('message-form').submit();
	}
	return false;
}

function getTime() {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}