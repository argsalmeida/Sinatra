  <?php
	//require_once('../FirePHPCore/fb.php');
	//ob_start();

	/* Ficheiro PHP que faz o upload de videos e/ou imagens para o servidor */  
	$img_thumb = '';
	
	if(!empty($_FILES)){
		echo upload_back();
	}
  
	function upload_back() {
		$folderFile = $_REQUEST['folderFile'];
		//Verifica se foi feito o upload
		if($_FILES['path']['name']){	
			//if no errors...
		 	 $valid_file = true;
		 	 if(!$_FILES['path']['error']){	  
			    	//now is the time to modify the future file name and validate the file
	    			$new_file_name = basename($_FILES['path']['name']); //rename file
	   			if(strpos($_FILES['path']['type'],'image') !== false) {
	   		    		//can't be larger than 100 MB
	   		 		if($_FILES['path']['size'] > (104857600)){
			     			$valid_file = false;
			      			return 'Oops!  O ficheiro é demasiado grande.';
		   			}
	 				//if the file has passed the test
					if($valid_file) {	
						$extensionAux = explode('.', $new_file_name);
						$aux = sizeof($extensionAux)-1;
						$extension = $extensionAux[$aux];
//fb($extension, "-----------------extension");
						//Check the file format before upload
						if(in_array($extension , array('jpg','jpeg', 'gif', 'png'))){
							//Se for imagem
							if(is_dir(realpath(dirname(__FILE__) . '/..') . '/files/' . $folderFile .'/')==false){
								return 'Directoria não existe!';	
							}
							//não funciona - as permissoes tem que ser dadas à mao
							chmod(realpath(dirname(__FILE__) . '/..').  '/files/' . $folderFile .'/' . $new_file_name, 0777); //É dado permissão à directoria*/
							//	return 'Erro! Falha nas permissões.';	

							if(copy($_FILES['path']['tmp_name'], realpath(dirname(__FILE__) . '/..'). '/files/' . $folderFile .'/' . $new_file_name)){ 
										return '../server/files/' . $folderFile .'/' . $new_file_name . '@' . 'imagem' . '@' . thumbnail('imagem');								
							} else 
								return 'Erro! Falha na cópia do conteúdo multimédia';
						} else {
								return 'Ficheiro não suportado';
						}
					}
	  			}
				//Se for video
				else if (strpos($_FILES['path']['type'],'video') !== false){
                    $extensionAux = explode('.', $new_file_name);
                    $aux = sizeof($extensionAux)-1;
                    $extension = $extensionAux[$aux];
//fb($extension, "-----------------extension2");
                    if($extension !== "avi"){
                        if(is_dir(realpath(dirname(__FILE__) . '/..'). '/files/' . $folderFile .'/')==false){
                            return 'Directoria não existe!';	
                        }
                        chmod(realpath(dirname(__FILE__)). '/../files/' . $folderFile .'/', 0777);
                            //return 'Erro! Falha nas permissões.'; //É dado permissão à directoria
                            if (copy($_FILES['path']['tmp_name'], realpath(dirname(__FILE__) . '/..'). '/files/' . $folderFile .'/' . $new_file_name)) {
                                    return '../server/files/' . $folderFile .'/' . $new_file_name . '@' . 'video' . '@' . thumbnail('video');
                                }else 
                                    return 'Erro! Falha na cópia do conteúdo multimédia';	
                    } else {
                        return 'Ficheiro não suportado';
                    }
						
				}
				//if there is an error...
				else {
					//set that to be the returned message
					return 'Ooops!  Erro:  '.$_FILES['path']['error'];
				}
			}
			else {
				return 'Não foi feito o upload';
			}
		} 
	}

	function thumbnail($type) {
		$folderThumb = $_REQUEST['FolderThumb'];
		//Image Storage Directory	
	/*	switch($folderThumb){
				case "tempThumbsCena":
					$img_thumbFolder ='thumbsCena';
					break;
				case "reforcoPositivo":
					$img_thumbFolder ='thumbsReforcoPositivo';
					break;
				case "reforcoNegativo":
					$img_thumbFolder ='thumbsReforcoNegativo';
					break;
			}
*/
		$img_dir ='../files/' . $folderThumb .'/';
		
		$img = explode('.', $_FILES['path']['name']);
					
		//Thumbnail file name File
		$image_filePath=$_FILES['path']['tmp_name'];
		$img_fileName=$img[0].'.'.$img[1];
		$img_thumb = $img_dir . $img_fileName;
		$extension = strtolower($img[sizeof($img)-1]);
					
		//Check the file format before upload
//		if(in_array($extension , array('jpg','jpeg', 'gif', 'png'))){
		
		if($type == 'imagem'){				
			//Find the height and width of the image
			list($gotwidth, $gotheight, $gottype, $gotattr)= getimagesize($image_filePath); 	
							
			//---------- To create thumbnail of image---------------
			if($extension=="jpg" || $extension=="jpeg" ){
				$src = imagecreatefromjpeg($_FILES['path']['tmp_name']);
			}
			else if($extension=="png"){
				$src = imagecreatefrompng($_FILES['path']['tmp_name']);
			}
			else{
				$src = imagecreatefromgif($_FILES['path']['tmp_name']);
			}
		
			list($width,$height)=getimagesize($_FILES['path']['tmp_name']);
						
					
			//Creating thumbnail
			$tmp=imagecreatetruecolor(260,200);
			imagecopyresampled($tmp,$src,0,0,0,0,260,200, $width,$height);
						
			//Create thumbnail image
			$createImageSave=imagejpeg($tmp,$img_thumb,100);
			
			if($extension=="jpg" || $extension=="jpeg" ){
				$createImageSave=imagejpeg($tmp,$img_thumb,100);				
			}
			else if($extension=="png"){
				$createImageSave=imagepng($tmp,$img_thumb);				
			}
			else if($extension=="gif"){
				$createImageSave=imagegif($tmp,$img_thumb);				
			} 
			return '../server/files/' . $folderThumb .'/' . $img[0] . '.' . $extension;
		 }
	
		//Create thumbnail for video
//		else if (in_array($extension , array('mp4', 'mov', 'avi', 'wmv', 'mkv', 'mpg', 'webm', 'ogg'))) {
		else if ($type == 'video') {
			$img_dir .= $img[0] . ".jpg";
			chmod(realpath(dirname(__FILE__) ).  $img_dir, 0777); //É dado permissão à directoria*/
			//exec("/usr/local/bin/ffmpeg -i \"{$_FILES['path']['tmp_name']}\" -deinterlace -an -ss 1 -t 00:00:01 -r 1 -y -vcodec mjpeg -f mjpeg -t 1 -r 1 -y -s '260x200' \"{$img_dir}\" 2>&1")  or die ("ffmpeg did not work");
			exec("/usr/bin/avconv -i \"{$_FILES['path']['tmp_name']}\" -deinterlace -an -ss 1 -t 00:00:01 -r 1 -y -vcodec mjpeg -f mjpeg -t 1 -r 1 -y -s '260x200' \"{$img_dir}\" 2>&1")  or die ("avconv did not work");

			return '../server/files/' . $folderThumb .'/' . $img[0] . '.jpg';
		}
	}

?>
