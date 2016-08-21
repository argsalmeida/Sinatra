<?php
	//require_once('../FirePHPCore/fb.php');
	//ob_start();

	$img_thumb = '';
	$temp_folder = $_REQUEST['temp_folder'];
	$folder = $_REQUEST['folder'];
	$nomeFicheiro = $_REQUEST['nomeFicheiro'];
	$url_temp = $_REQUEST['url_temp'];
	$mode = $_REQUEST['mode'];
//fb($nomeFicheiro, "nomeFicheiro");
	$filenameArray = explode('/', $url_temp);

	$filename = $filenameArray[sizeof($filenameArray)-1];

	$aux = sizeof($filename);
	$extensionAux = explode('.', $filename);
	$extension = $extensionAux[$aux];
//fb($extension, "extension");
	$src = "../files/". $temp_folder . "/" . $filename;

	$newFilename = $nomeFicheiro . "." . $extension;

	$dst = "../files/". $folder . "/" . $newFilename;

	$urlNovaImagem = "../server/files/". $folder . "/" . $newFilename;
//fb($urlNovaImagem, "urlNovaImagem");
	chmod(realpath(dirname(__FILE__) . '/..') .  '/files/' . $folder .'/' . $newFilename, 0777);
	copy($src, $dst);

	if($filename != "noImage.gif" && $mode == "gravar")
		unlink($src);

	echo $urlNovaImagem;

?>
