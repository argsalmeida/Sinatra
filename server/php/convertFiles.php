 <?php
	//require_once('../FirePHPCore/fb.php');
	//ob_start();

	$folder = $_REQUEST['temp_folder'];
	$fileURL = $_REQUEST['ficheiro'];
//fb($fileURL, "fileurl");
//fb($folder, "folder");
//fb($fileURL, "fileURL");

	//explode do url por /
	$filenameAux = explode('/', $fileURL);
	//quero a ultima posicao, para obter o nome + extensão do ficheiro
	$aux = sizeof($filenameAux)-1;
	$filename = $filenameAux[$aux];
//fb($filename, 'filename');

	$url = $filenameAux[0];
	for ($x=1; $x<sizeof($filenameAux)-1; $x++) {
		$url = $url . '/' . $filenameAux[$x];
	} 

//fb($url, 'url');

	$extensionAux = explode('.', $filename);
	$aux = sizeof($extensionAux)-1;
	$extension = $extensionAux[$aux];

	//vai buscar o filename sem extensao
	$filenameAux = explode('.', $filename);
	$name = $filenameAux[0];
	for ($x=1; $x<sizeof($filenameAux)-1; $x++) {
		$name = $name	 . '.' . $filenameAux[$x];
	} 
	//fb($filename , 'filename');
	$url = "../files/" . $folder . "/";
	$fileURL = $url . $filename;
	$newNameMp4 = "../files/" . $folder . "/" . $name . '.mp4';
	$newNameWebM = "../files/" . $folder . "/" . $name . '.webm';
	//fb($newNameMp4, 'newNameMp4');
	//fb($newNameWebM, 'newNameWebM');
	//fb($fileURL, "fileURL");
	chmod($url .'/', 0777);
		//convert file
//fb($extension, "extensao");
		switch($extension){
			case 'mp4':
            //fb("mp4");
                exec("avconv -i $fileURL -c:v libx264 $newNameMp4");
            //				exec("ffmpeg -i $fileURL -vcodec libx264 -acodec libvo_aacenc -s 640x360 -vb 872000 $newNameMp4");
            //				exec("ffmpeg -i $fileURL -vcodec libx264 -acodec libfdk_aac -s 640x360 -vb 872000 $newNameMp4");
            //libfdk_aac


        //fb("sou mp4");		
			break;
			case 'webm':
                //fb("webm");
				//converte para webm
                exec("avconv -i $fileURL -y $newNameWebM");
                //				exec("ffmpeg -i $fileURL -threads 8 -f webm -s 640x360 -vcodec libvpx -deinterlace -g 120 -level 216 -profile 0 -qmax 42 -qmin 10 -rc_buf_aggressivity 0.95 -vb 872000 -acodec libvorbis -aq 90 -ac 2 $newNameWebM");
                //ffmpeg -i cena2.webm -vcodec libx264  -acodec libvo_aacenc -s 640x360 -vb 872000 cena2.mp4
                //avconc -i cena2.webm -vcodec libx264  -acodec libvo_aacenc -s 640x360 -vb 872000 cena2.mp4
                //avconv -i cena3.mp4 -threads 8 -f webm -s 640x360 -vcodec libvpx -deinterlace -g 120 -level 216 -profile 0 -qmax 42 -qmin 10 -rc_buf_aggressivity 0.95 -vb 872000 -acodec libvorbis -aq 90 -ac 2 cena3.webm
                //ffmpeg -i cena3.mp4 -threads 8 -f webm -s 640x360 -vcodec libvpx -deinterlace -g 120 -level 216 -profile 0 -qmax 42 -qmin 10 -rc_buf_aggressivity 0.95 -vb 872000 -acodec libvorbis -aq 90 -ac 2 cena3.webm
				//fb("sou webM");
			break;
			default:
				//fb("sou tudo o resto");
				//converte para WebM
                exec("avconv -i $fileURL -y $newNameWebM");
//				exec("ffmpeg -i $fileURL -threads 8 -f webm -s 640x360 -vcodec libvpx -deinterlace -g 120 -level 216 -profile 0 -qmax 42 -qmin 10 -rc_buf_aggressivity 0.95 -vb 872000 -acodec libvorbis -aq 90 -ac 2 $newNameWebM");
				//converte para mp4
                exec("avconv -i $fileURL -c:v libx264 $newNameMp4");
//				exec("ffmpeg -i $fileURL -vcodec libx264 -acodec libfdk_aac -s 640x360 -vb 872000 $newNameMp4");
				unlink($fileURL);
			break;
		}
?>
