$(function () {
	var socket = io.connect();
	var $messageForm = $('#messageForm');
	var $message = $('#message');
	var $chat = $('#txtChat');
	var $messageArea = $('#messageArea');
	var $userFormArea = $('#userFormArea');
	var $userForm = $('#userForm');
	var $users = $('#Users');
	var $username = $('#username');
	var $logout = $('#logO');
	var $realUser = $username.val();

	$messageForm.submit(function (e) {
		e.preventDefault();
		socket.emit('send message', $message.val());
		$message.val('');
	})

	socket.on('new message', function (data) {
		$chat.append(data.user + ' : ' + data.msg + '\n')
	})

	$userForm.submit(function (e) {
		e.preventDefault();
		socket.emit('new user', $username.val(), function (data) {
			if (data) {
				$userFormArea.hide();
				$messageArea.show();
				$chat.show();
				$logout.show();
			}
		});
		$username.val('');
	})
	socket.on('get users', function (data) {
		console.log(data);
		var html = '';
		for (i = 0; i < data.length; i++) {
			html += '<li><strong>' + data[i] + '</strong></li>';
		}
		$users.html(html);
	});

	$logout.click(function (err) {
		err.preventDefault();
		socket.emit('logout', function ($realUser) {});
		location.reload(true);
	});
})