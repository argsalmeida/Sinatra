/*******************************
* Ficheiro com os pedidos AJAX *
* referentes aos thumbnails    *
********************************/

//$nomeFicheiro - nome que queremos para o ficheiro
//$temp_folder - onde o ficheiro se encontra
//$folder - onde queremos que o ficheiro seja gravado
//$ficheiro - qual o ficheiro
function thumbnailRequest($fd, $where, $nomeFicheiro, $temp_folder, $folder, $ficheiro, $modo){
    console.log($temp_folder);
	var $url = '';
	var $aux = '';
	switch($where){
		case "uploadTempFile":
            $url = "../server/php/thumbnailCreator.php?temp_folder=" + $temp_folder;
			return $.ajax({
				url: $url,
				type: "POST",
				data: $fd,
				processData: false,  // tell jQuery not to process the data
				contentType: false,   // tell jQuery not to set contentType
				async: false,
				error: ajaxError
			});
			break; 
		case "saveFile":
			$url = "../server/php/copyFiles.php?temp_folder=" + $temp_folder + "&&folder=" + $folder + "&&nomeFicheiro=" + $nomeFicheiro + "&&url_temp=" +$ficheiro + "&&mode=" +$modo;
			$.ajax({
				url: $url,
				type: "POST",
				data: $fd,
				processData: false,  // tell jQuery not to process the data
				contentType: false,   // tell jQuery not to set contentType
				async: false,
				success: function(result){
						$aux = result;
					},
				error: ajaxError
			});
			return $aux;
			break; 		
		case "convertFile":
			$url = "../server/php/convertFiles.php?temp_folder=" + $temp_folder + "&&ficheiro=" + $ficheiro;
			$.ajax({
				url: $url,
				type: "POST",
				data: $fd,
				processData: false,  // tell jQuery not to process the data
				contentType: false,   // tell jQuery not to set contentType
				async: false,
				success: function(result){
						$aux = result;
					},
				error: ajaxError
			});
			return $aux;
		break;
	}
}
