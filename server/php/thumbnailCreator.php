<?php

    //require_once('../FirePHPCore/fb.php');
    //ob_start();

	$img_thumb = '';
//    fb($_FILES['path']['name'], "coisas");

	if(!empty($_FILES['path']['name'])){
        $folderFile = $_REQUEST['temp_folder'];
        
		//Image Storage Directory
        $img_dir="../files/" . $folderFile . "/";
//fb($img_dir, "img_dir");
		$img = explode('.', $_FILES['path']['name']);
//fb($img, "img");
		file_put_contents('/tmp/log1.txt', var_export($_FILES, true));
	
		//Thumbnail file name File
		$image_filePath=$_FILES['path']['tmp_name'];
		file_put_contents('/tmp/log2.txt', var_export(array($_REQUEST, $image_filePath), true));
		$img_fileName=$img[0].'.'.$img[1];
		file_put_contents('/tmp/log3.txt', var_export(array($_REQUEST, $img_fileName), true));
		$img_thumb = $img_dir . $img_fileName;
		end($img);
		$last_id=key($img);
		$extension = strtolower($img[$last_id]);

			//Check the file format before upload
			if(in_array($extension , array('jpg','jpeg', 'gif', 'png'))){
		
				//Find the height and width of the image
				list($gotwidth, $gotheight, $gottype, $gotattr)= getimagesize($image_filePath); 	

				//---------- To create thumbnail of image---------------
				/*if($extension=="jpg" || $extension=="jpeg" ){
					$src = imagecreatefromjpeg($_FILES['path']['tmp_name']);
				}
				else if($extension=="png"){
					$src = imagecreatefrompng($_FILES['path']['tmp_name']);
				}
				else if($extension=="gif"){
					$src = imagecreatefromgif($_FILES['path']['tmp_name']);
				} if($extension=="bmp"){
					$src = imagecreatefrombmp($_FILES['path']['tmp_name']);
				}*/
				$src = @imagecreatefromstring(file_get_contents($image_filePath));    
            
				if ($src === false) {
				    throw new Exception ('Image is corrupted');
					//fb("sou mm falso");
				}
				list($width,$height)=getimagesize($_FILES['path']['tmp_name']);
            
				//Creating thumbnail
				$tmp=imagecreatetruecolor(260,200);
				imagecopyresampled($tmp,$src,0,0,0,0,260,200, $width,$height);
		
				//Create thumbnail image
				if($extension=="jpg" || $extension=="jpeg" ){
					$createImageSave=imagejpeg($tmp,$img_thumb,100);				
				}
				else if($extension=="png"){
					$createImageSave=imagepng($tmp,$img_thumb);				
				}
				else if($extension=="gif"){
					$createImageSave=imagegif($tmp,$img_thumb);				
				} 

                echo '../server/files/' . $folderFile . '/' . basename($_FILES['path']['name']);
			}
			else {
				echo 'file not supported';
			}
	} else {
		echo 'empty';
		} 

?>
