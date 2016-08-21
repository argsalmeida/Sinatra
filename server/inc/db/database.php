<?php 

/* Funcao que cria ligacao com a base de dados */
function connectBD () {
	$path = realpath(dirname(__FILE__));
	include_once $path . '/data.php';
	$con = mysql_connect($host, $user, $password);
	if (!$con) {
		die('Error: Failure to connect to mysql ' . mysql_error());
	}
  	$con = mysql_select_db($database, $con);
	if (!$con) {
		die('Error: Failure to select DB ' . $database . ' - ' . mysql_error());
	}
}

/* Funcao que fecha a ligacao */
function disconectBD () {
	$con = mysql_close();
	if (!$con) {
		die('Error: Failure to disconect. ' . mysql_error());
	}
}

?>
