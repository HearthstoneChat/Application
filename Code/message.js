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