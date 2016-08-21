<?php

	//require_once('FirePHPCore/fb.php');
	//ob_start();
	
	/******************************************
	 Funcao que vai buscar todas as cenas
	*******************************************/
	function getAllCenas(){
		$query = "SELECT * FROM Cena";
		$result = mysql_query($query);

		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Nao existem cenas a apresentar."));
		else
			cenaToXML(mysql_num_fields($result) ,$result);
	}

	/******************************************
	 Funcao que vai buscar uma cena por id
	*******************************************/
	function getCenaById($idCena, $where){
		$query = "SELECT * FROM Cena WHERE id = '" . $idCena . "'";
		$result = mysql_query($query);

		if($where == "xml")
				return $result;
			else 
				cenaToXML(mysql_num_fields($result) ,$result);
	}

	/**********************************
	 Funcao que adiciona uma cena
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	***********************************/
	function adicionaCena($thumbnailCena, $nomeCena, $descricaoCena, $tagsCena, $urlIntroducaoCena, $mimeIntroducaoCena, $idActividadesCena, $nrRepeticoesActividadeCena, $tipoActividadeCena, $urlReforcoPositivoCena, $mimeReforcoPositivoCena, $urlReforcoPositivoThumbCena, $urlReforcoNegativoCena, $mimeReforcoNegativoCena, $urlReforcoNegativoThumbCena, $nrVezesCena, $pontuacaoCena){
	date_default_timezone_set('UTC');

	$query = "INSERT INTO Cena (thumbnail, nome, descricao, tags, urlIntroducao, mimeTypeIntroducao, idActividades, nrRepeticaoGesto,tipoActividade, urlReforcoPositivo, mimeTypeReforcoPositivo, urlReforcoPositivoThumb, urlReforcoNegativo, mimeTypeReforcoNegativo, urlReforcoNegativoThumb, nrVezesCena, pontuacao, versao) VALUES('" . utf8_decode($thumbnailCena) . "', '" . utf8_decode($nomeCena) . "', '" . utf8_decode($descricaoCena) . "', '" . utf8_decode($tagsCena) . "', '" . utf8_decode($urlIntroducaoCena) . "', '" . utf8_decode($mimeIntroducaoCena) . "', '" . utf8_decode($idActividadesCena) .  "', '" . utf8_decode($nrRepeticoesActividadeCena) . "', '" . utf8_decode($tipoActividadeCena) . "', '" . utf8_decode($urlReforcoPositivoCena) . "', '" . utf8_decode($mimeReforcoPositivoCena) . "', '" . utf8_decode($urlReforcoPositivoThumbCena) . "', '" . utf8_decode($urlReforcoNegativoCena) . "', '" . utf8_decode($mimeReforcoNegativoCena) . "', '" . utf8_decode($urlReforcoNegativoThumbCena) . "', '" . $nrVezesCena . "', '" . $pontuacaoCena .  "', '" . date('Y-m-d H:i:s') . "')";
	$result = mysql_query($query);
	if(!$result)
		mensagemToXML(utf8_decode("Erro: Falha na inserção da cena."));
	else
		mensagemToXML(mysql_insert_id());
	}

	/*******************************************
	 Funcao que verifica se existe uma cena
	 com o nome passado por parametro
	********************************************/
	function verificaNomeCena($nomeCena){
		$query = "SELECT * FROM Cena WHERE nome LIKE '" . utf8_decode($nomeCena) . "'";
		$result = mysql_query($query);
		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Não existem cenas com este nome."));
		else
			mensagemToXML(utf8_decode("Nome da cena já existente."));
	}

    /*************************************
     Função que devolve o tipo de actividade
     da cena com o id passado por parametro
    **************************************/
function getTipoActividadeCena($idCena, $where){
        $query = "SELECT * FROM Cena WHERE id = '" . $idCena . "'";
        $result = mysql_query($query);

        if(mysql_num_rows($result) <= 0)
            mensagemToXML(utf8_decode("Nao existem cenas a apresentar."));
        else
            cenaToXML(mysql_num_fields($result) ,$result);
        }
?>
