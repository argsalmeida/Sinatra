<?php

	//require_once('FirePHPCore/fb.php');
	//ob_start();
	
	/******************************************
	 Funcao que vai buscar todas as historias
	*******************************************/
	function getAllHistorias(){
		$query = "SELECT * FROM Historia";
		$result = mysql_query($query);

		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Nao existem histórias a apresentar."));
		else
			historiaToXML(mysql_num_fields($result) ,$result);
	}

	/******************************************
	 Funcao que vai buscar uma historia por id
	*******************************************/
	function getHistoriaById($idHistoria, $where){
		$query = "SELECT * FROM Historia WHERE id = '" . $idHistoria . "'";
		$result = mysql_query($query);

		if($where == "xml")
			return $result;
		else 
			historiaToXML(mysql_num_fields($result) ,$result);
	}

	/*******************************************
	 Funcao que verifica se existe uma historia
	 com o nome passado por parametro
	********************************************/
	function verificaNomeHistoria($nomeHistoria){
		$query = "SELECT * FROM Historia WHERE nome LIKE '" . utf8_decode($nomeHistoria) . "'";
		$result = mysql_query($query);

		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Não existem histórias com este nome."));
		else
			mensagemToXML(utf8_decode("Nome da história já existente."));
	}

	/**********************************
	 Funcao que adiciona uma historia
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	***********************************/
	function adicionaHistoria($thumbnailHistoria, $nomeHistoria, $descricaoHistoria, $idCenasHistoria, $idEtiquetasHistoria){
	//date_default_timezone_set('UTC');
    date_default_timezone_set('europe/lisbon');
	$query = "INSERT INTO Historia (thumbnail, nome, descricao, idCenas, tags, versao) VALUES('" . utf8_decode($thumbnailHistoria) . "', '" . utf8_decode($nomeHistoria) . "', '" . utf8_decode($descricaoHistoria) . "', '" . utf8_decode($idCenasHistoria) . "', '" . utf8_decode($idEtiquetasHistoria) .  "', '" . date('Y-m-d H:i:s') . "')";
	$result = mysql_query($query);
	if(!$result)
		mensagemToXML(utf8_decode("Erro: Falha na inserção da historia."));
	else
		mensagemToXML(mysql_insert_id());
	}
?>
