<?php

	//require_once('FirePHPCore/fb.php');
	//ob_start();
	
	/******************************************
	 Funcao que vai buscar todos as perguntas
	*******************************************/
	function getAllPerguntas(){
		$query = "SELECT * FROM Pergunta ORDER BY questao ASC";
		$result = mysql_query($query);
		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Nao existem perguntas a apresentar."));
		else
			perguntaToXML(mysql_num_fields($result) ,$result);
	}

	/**********************************
	 Funcao que adiciona uma pergunta
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	***********************************/
	function adicionaPergunta($questao){
		$query = "INSERT INTO Pergunta (questao) VALUES ('" . utf8_decode($questao) . "')";
		$result = mysql_query($query);
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na inserção da pergunta."));
		else
			mensagemToXML(mysql_insert_id());
	}

	/******************************************
	 Funcao que vai buscar uma pergunta por id
	*******************************************/
	function getPerguntaById($idPergunta, $where){
		$query = "SELECT * FROM Pergunta WHERE id = '" . $idPergunta . "'";
		$result = mysql_query($query);

		if($where == "xml")
				return $result;
			else 
				perguntaToXML(mysql_num_fields($result) ,$result);
	}
?>
