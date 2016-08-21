<?php

	//require_once('FirePHPCore/fb.php');
	//ob_start();
	
	/******************************************
	 Funcao que vai buscar todos os registos
	*******************************************/
	function getAllRegistos(){
		$query = "SELECT * FROM Registo";
		$result = mysql_query($query);
		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Nao existem registos a apresentar."));
		else
			gestoToXML(mysql_num_fields($result) ,$result);
	}

	/****************************************
	 Funcao que adiciona um registo de gesto
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	*****************************************/
function adicionaRegistoGesto($idSessao, $idCena, $nrRepeticaoCena, $idCrianca, $tipoRegisto, $idGesto, $nrRepeticaoGesto, $respostaGesto, $pontuacaoGesto){
    $query = "INSERT INTO Registo (idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, idGesto, nrRepeticaoGesto, respostaGesto, pontuacaoGesto) VALUES ('" . $idSessao . "', '" . $idCena . "', '" . $nrRepeticaoCena . "', '" . $idCrianca . "', '" .  utf8_decode($tipoRegisto) . "', '" . $idGesto . "', '" . $nrRepeticaoGesto . "', '" . utf8_decode($respostaGesto) . "', '" . $pontuacaoGesto . "')";
		$result = mysql_query($query);
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na inserção do registo do gesto."));
		else
			mensagemToXML(mysql_insert_id());
	}

	/***********************************************
	 Funcao que adiciona um registo de questionário
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	************************************************/
function adicionaRegistoQuestionario($idSessao, $idCena, $nrRepeticaoCena, $idCrianca, $tipoRegisto, $idQuestionario, $idPergunta, $respostaPergunta){
    $query = "INSERT INTO Registo (idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, idQuestionario, idPergunta, respostaPergunta) VALUES ('" . $idSessao . "', '" . $idCena . "', '" . $nrRepeticaoCena . "', '" . $idCrianca . "', '" .  utf8_decode($tipoRegisto) . "', '" . $idQuestionario . "', '" . $idPergunta . "', '" . utf8_decode($respostaPergunta) . "')";
		$result = mysql_query($query);
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na inserção do registo do questionario."));
		else
			mensagemToXML(mysql_insert_id());
	}

	/***********************************************
	 Funcao que adiciona um registo de pontuação
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	************************************************/
	function adicionaRegistoPontuacao($idSessao, $idCena, $nrRepeticaoCena, $idCrianca, $tipoRegisto, $pontuacaoCena){
        $query = "INSERT INTO Registo (idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, pontuacaoCena) VALUES ('" . $idSessao . "', '" . $idCena . "', '" . $nrRepeticaoCena . "', '" . $idCrianca .  "', '" . utf8_decode($tipoRegisto) . "', '" . $pontuacaoCena . "')";
		$result = mysql_query($query);
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na inserção do registo da pontuação."));
		else
			mensagemToXML(mysql_insert_id());
	}

	/******************************************
	 Funcao que vai buscar um registo por id
	*******************************************/
	function getRegistoById($idRegisto, $where){

		$query = "SELECT * FROM Registo WHERE id = '" . $idRegisto . "'";
		$result = mysql_query($query);

		if($where == "xml")
				return $result;
			else 
				registoToXML(mysql_num_fields($result) ,$result);
	}

    /*****************************************************
	 Funcao que vai buscar os registos de uma dada sessao
	******************************************************/
    function getRegistoBySessaoId($idSessao, $where){
       $query = "SELECT * FROM Registo WHERE idSessao = '" . $idSessao . "'";
        $result = mysql_query($query);
        if($where == "xml")
            return $result;
        else 
            registoToXML(mysql_num_fields($result) ,$result);
       
    }
?>
