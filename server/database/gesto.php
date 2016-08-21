<?php

	//require_once('FirePHPCore/fb.php');
	//ob_start();
	
	/******************************************
	 Funcao que vai buscar todos os gestos
	*******************************************/
	function getAllGestos(){
		$query = "SELECT * FROM Gesto ORDER BY nomeGesto ASC";
		$result = mysql_query($query);
		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Nao existem gestos a apresentar."));
		else
			gestoToXML(mysql_num_fields($result) ,$result);
	}

	/**********************************
	 Funcao que adiciona um gesto
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	***********************************/
	function adicionaGesto($nomeGesto){
		$query = "INSERT INTO Gesto (nomeGesto) VALUES ('" . utf8_decode($nomeGesto) . "')";
		$result = mysql_query($query);
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na inserção do gesto."));
		else
			mensagemToXML(mysql_insert_id());
	}

	/******************************************
	 Funcao que vai buscar um gesto por id
	*******************************************/
	function getGestoById($idGesto, $where){

		$query = "SELECT * FROM Gesto WHERE id = '" . $idGesto . "'";
		$result = mysql_query($query);

		if($where == "xml")
				return $result;
			else 
				gestoToXML(mysql_num_fields($result) ,$result);
	}


	/**********************************************
	 Funcao que verifica se existe um gesto
	 com o nome passado por parametro
	***********************************************/
	function verificaNomeGesto($nomeGesto){
		$query = "SELECT * FROM Gesto WHERE nomeGesto LIKE '" . utf8_decode($nomeGesto) . "'";
		$result = mysql_query($query);

		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Não existem gestos com este nome."));
		else
			mensagemToXML(utf8_decode("Nome do gesto já existente."));
	}
?>
