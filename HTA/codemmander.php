<?php
header('Access-Control-Allow-Methods: GET');

if (isset($_GET) && !empty($_GET['request'])) {
	if (file_exists($_GET['request'])) {
		
		// log file access request here!
		if (empty($_GET['appName'])) {
			$_GET['appName'] = 'Unknown Application';
		}
		if (empty($_GET['appVersion'])) {
			$_GET['appVersion'] = 'Unknown Version';
		}
		if (empty($_GET['appAuthor'])) {
			$_GET['appAuthor'] = 'Unknown Author';
		}
		
		file_put_contents(
			"request.log",
			$_GET['request'] . '|' . $_GET['appName'] . '|' . $_GET['appVersion'] . '|' . $_GET['appAuthor'] . '|' . gmdate("Y-m-d\TH:i:s\Z") . PHP_EOL,
			FILE_APPEND | LOCK_EX
		);
		
		// return requested file's contents
		echo file_get_contents($_GET['request']);
	}
}
?>
