<?php

	//require_once('FirePHPCore/fb.php');
	//ob_start();
	
	/******************************************
	 Funcao que vai buscar todos os questionarios
	*******************************************/
	function getAllQuestionarios(){
		$query = "SELECT * FROM Questionario ORDER BY nomeQuestionario ASC";
		$result = mysql_query($query);
		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Nao existem questionários a apresentar."));
		else
			questionarioToXML(mysql_num_fields($result) ,$result);
	}

	/**********************************
	 Funcao que adiciona um questionario
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	***********************************/
	function adicionaQuestionario($nomeQuestionario, $idPerguntas){
		$query = "INSERT INTO Questionario (nomeQuestionario, idPerguntas) VALUES ('" . utf8_decode($nomeQuestionario) . "', '" . utf8_decode($idPerguntas) . "')";
		$result = mysql_query($query);
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na inserção do questionário."));
		else
			mensagemToXML(mysql_insert_id());
	}

	/******************************************
	 Funcao que vai buscar um questionario por id
	*******************************************/
	function getQuestionarioById($idQuestionario, $where){
		$query = "SELECT * FROM Questionario WHERE id = '" . $idQuestionario . "'";
		$result = mysql_query($query);

		if($where == "xml")
				return $result;
			else 
				questionarioToXML(mysql_num_fields($result) ,$result);
	}

	/**********************************************
	 Funcao que verifica se existe um questionario
	 com o nome passado por parametro
	***********************************************/
	function verificaNomeQuestionario($nomeQuestionario){
		$query = "SELECT * FROM Questionario WHERE nomeQuestionario LIKE '" . utf8_decode($nomeQuestionario) . "'";
		$result = mysql_query($query);

		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Não existem questionários com este nome."));
		else
			mensagemToXML(utf8_decode("Nome do questionário já existente."));
	}
?>
