<?php

	//require_once('FirePHPCore/fb.php');
	//ob_start();
	
	/******************************************
	 Funcao que vai buscar todas as etiquetas
	*******************************************/
	function getAllEtiquetas(){
		$query = "SELECT * FROM Etiqueta ORDER BY nomeEtiqueta ASC";
		$result = mysql_query($query);
		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Nao existem etiquetas a apresentar."));
		else
			etiquetaToXML(mysql_num_fields($result) ,$result);
	}

	/**********************************
	 Funcao que adiciona uma etiqueta
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	***********************************/
	function adicionaEtiqueta($nomeEtiqueta){
		$query = "INSERT INTO Etiqueta (nomeEtiqueta) VALUES ('" . utf8_decode($nomeEtiqueta) . "')";
		$result = mysql_query($query);
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na inserção da etiqueta."));
		else
			mensagemToXML(mysql_insert_id());
	}

	/******************************************
	 Funcao que vai buscar uma etiqueta por id
	*******************************************/
	function getEtiquetaById($idEtiqueta, $where){
		$query = "SELECT * FROM Etiqueta WHERE id = '" . $idEtiqueta . "'";
		$result = mysql_query($query);

		if($where == "xml")
				return $result;
			else 
				etiquetaToXML(mysql_num_fields($result) ,$result);
	}
?>
