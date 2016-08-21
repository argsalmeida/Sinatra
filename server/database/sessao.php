<?php

    //require_once('FirePHPCore/fb.php');
    //ob_start();

    /******************************************
	 Funcao que vai buscar todas as sessoes
	 Nota: Ordena-se por dataHota, ordem descendente
	 porque ao inserir na tabela, as sessoes
	 que não fossem inseridos na primeira página
	 não ficavam com bind de botões
	*******************************************/
    function getAllSessoes(){
        $query = "SELECT * FROM Sessao ORDER BY dataHora DESC";
        $result = mysql_query($query);

        if(mysql_num_rows($result) <= 0)
            mensagemToXML(utf8_decode("Nao existem sessões a apresentar."));
        else
            sessaoToXML(mysql_num_fields($result) ,$result);
    }

    /******************************************
	 Funcao que vai buscar todas as sessoes CoDraw
	 Nota: Ordena-se por dataHota, ordem descendente
	 porque ao inserir na tabela, as sessoes
	 que não fossem inseridos na primeira página
	 não ficavam com bind de botões
	*******************************************/
    function getAllSessoesCoDraw(){
        $query = "SELECT * FROM Sessao WHERE tipoExercicio LIKE 'CoDraw' ORDER BY dataHora DESC";
        $result = mysql_query($query);

        if(mysql_num_rows($result) <= 0)
            mensagemToXML(utf8_decode("Nao existem sessões a apresentar."));
        else
            sessaoToXML(mysql_num_fields($result) ,$result);
    }
    /**********************************
	 Funcao que adiciona uma sessao 
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	***********************************/
    function adicionaSessao($idTerapeutaSessao, $dataHoraSessao, $dataInicioSessao, $dataFimSessao, $idCriancasSessao, $tipoSessao, $tipoExercicioSessao, $idExercicioSessao, $idCenasPontuacaoSessao){
        $query = "INSERT INTO Sessao (tipoSessao, idTerapeuta, dataHora, dataInicio, dataFim, idCriancas, tipoExercicio, idExercicio, idCenasPontuacao) VALUES('" . utf8_decode($tipoSessao) . "','" . $idTerapeutaSessao . "', '" . utf8_decode($dataHoraSessao) . "', '" . utf8_decode($dataInicioSessao) . "', '" . utf8_decode($dataFimSessao) . "', '" . utf8_decode($idCriancasSessao) . "', '" . utf8_decode($tipoExercicioSessao) . "', '" . $idExercicioSessao . "', '" . utf8_decode($idCenasPontuacaoSessao) . "')";
        $result = mysql_query($query);	
        if(!$result)
            mensagemToXML(utf8_decode("Erro: Falha na inserção da sessao."));
        else
            mensagemToXML(mysql_insert_id());
    }

    /**********************************
	 Funcao que remove uma sessao 
	 Retorna uma mensagem consoante 
	 remove ou não
	***********************************/
    function removeSessao($idSessao){
        $query = "DELETE FROM Sessao WHERE id = '" . $idSessao . "'";
        $result = mysql_query($query);	
        if(!$result)
            mensagemToXML(utf8_decode("Erro: Falha na remoção da sessão."));
        else
            mensagemToXML(utf8_decode("Sucesso a remover a sessão."));
    }

    /******************************************
	 Funcao que vai buscar uma sessao por id
	*******************************************/
    function getSessaoById($idSessao, $where){
        $query = "SELECT * FROM Sessao WHERE id = '" . $idSessao . "'";
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
    }
    /**********************************
	 Funcao que modifica uma sessao 
	 dado o id
	 retorna uma mensagem consoante
	 se fez o update ou não
	***********************************/
    function updateSessao($idSessao, $idTerapeutaSessao, $dataHoraSessao, $dataInicioSessao, $dataFimSessao, $idCriancasSessao, $tipoSessao, $tipoExercicioSessao, $idExercicioSessao, $idCenasPontuacaoSessao){
        $query = "UPDATE Sessao SET idTerapeuta = '" . $idTerapeutaSessao . "', dataHora = '" . $dataHoraSessao . "', dataInicio = '" . $dataInicioSessao . "', dataFim = '" . $dataFimSessao . "', idCriancas = '" . utf8_decode($idCriancasSessao) . "', tipoExercicio = '" . $tipoExercicioSessao . "', idExercicio = '" . $idExercicioSessao . "', idCenasPontuacao = '" . $idCenasPontuacaoSessao . "'  WHERE id =" . $idSessao;
        $result = mysql_query($query);	
        if(!$result)
            mensagemToXML(utf8_decode("Erro: Falha na actualização da sessao."));
        else
            mensagemToXML(utf8_decode("Sucesso na actualização da sessao."));
    }

    /**********************************
	 Funcao que modifica a data e hora de
     uma sessao dado o id
	 retorna uma mensagem consoante
	 se fez o update ou não
	***********************************/
    function modificaDataHora($idSessao, $dataHoraSessao, $dataInicioSessao, $dataFimSessao){
        $query = "UPDATE Sessao SET $dataHora = '" . $dataHoraSessao . "', dataInicio = '" . $dataInicioSessao . "', dataFim = '" . $dataFimSessao . "'  WHERE id =" . $idSessao;
        $result = mysql_query($query);	
        if(!$result)
            mensagemToXML(utf8_decode("Erro: Falha na actualização da sessao."));
        else
            mensagemToXML(utf8_decode("Sucesso na actualização da sessao."));
    }
?>
