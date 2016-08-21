<?php

	//require_once('FirePHPCore/fb.php');
	//ob_start();
	
	/******************************************
	 Funcao que vai buscar todos os terapeutas
	 Nota: Ordena-se por nome, ordem descendente
	 porque ao inserir na tabela, os terapeutas
	 que não fossem inseridos na primeira página
	 não ficavam com bind de botões
	*******************************************/
	function getAllHistorico(){
		$query = "SELECT * FROM Historico ORDER BY dataHora DESC";
		$result = mysql_query($query);

		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Nao existem sessões a apresentar."));
		else
			sessaoToXML(mysql_num_fields($result) ,$result);
	}

	/********************************************
	 Funcao que adiciona uma sessao ao historico
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	**********************************************/
	function adicionaHistorico($idTerapeutaHistorico, $dataHoraHistorico, $dataInicioHistorico, $dataFimHistorico, $idCriancasHistorico, $tipoSessao, $tipoExercicioHistorico, $idExercicioHistorico, $logSessao, $anotacoesSessao){
		if($tipoSessao == 'Presencial')
			$query = "INSERT INTO Historico (tipoSessao, idTerapeuta, dataHora, idCriancas, tipoExercicio, idExercicio, logSessao, anotacoesSessao) VALUES('" . utf8_decode($tipoSessao) . "','" . $idTerapeutaHistorico . "', '" . $dataHoraHistorico . "', '" . utf8_decode($idCriancasHistorico) . "', '" . utf8_decode($tipoExercicioHistorico) . "', '" . $idExercicioHistorico . "', '" . utf8_decode($logSessao) . "', '" . utf8_decode($anotacoesSessao) . "')";
		else
			$query = "INSERT INTO Historico (tipoSessao, idTerapeuta, dataInicio, dataFim, idCriancas, tipoExercicio, idExercicio, logSessao, anotacoesSessao) VALUES('" . utf8_decode($tipoSessao) . "','" . $idTerapeutaHistorico . "', '" . $dataInicioHistorico . "', '" . "', '" . $dataFimHistorico . "', '" . utf8_decode($idCriancasHistorico) . "', '" . utf8_decode($tipoExercicioHistorico) . "', '" . $idExercicioHistorico . "', '" . utf8_decode($logSessao) . "', '" . utf8_decode($anotacoesSessao) . "')";
		$result = mysql_query($query);	
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na inserção da sessao."));
		else
			mensagemToXML(mysql_insert_id());
	}

	/*****************************************************
	 Funcao que vai buscar uma sessao do histórico por id
	******************************************************/
	function getSessaoHistoricoById($idSessao, $where){
		$query = "SELECT * FROM Historico WHERE id = '" . $idSessao . "'";
		$result = mysql_query($query);

        
        if(mysql_num_rows($result) <= 0){
            if($where == 'xml')
                return 'Não existem sessões';
            else
                mensagemToXML(utf8_decode("Nao existem sessões a apresentar."));
        } else {
            if($where == 'xml')
                return $result;
            else
                sessaoToXML(mysql_num_fields($result) ,$result);
        }
        
		/*if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Nao existem sessões a apresentar."));
		else
			sessaoToXML(mysql_num_fields($result) ,$result);
            */
	}

?>
