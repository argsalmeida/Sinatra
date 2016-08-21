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
	function getAllTerapeutas($where){
		if($where == "listaTerapeutas") 
			$query = "SELECT * FROM Terapeuta WHERE enable = 1 ORDER BY nome DESC";
		else
			$query = "SELECT * FROM Terapeuta WHERE enable = 1 ORDER BY nome ASC";
		$result = mysql_query($query);

		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Nao existem Terapeutas a apresentar."));
		else
			terapeutaToXML(mysql_num_fields($result) ,$result);
	}

	/******************************************
	 Funcao que vai buscar o terapeuta pelo id
	*******************************************/
	function getTerapeutaById($idTerapeuta, $where){
		$query = "SELECT * FROM Terapeuta WHERE id = " . $idTerapeuta;
		$result = mysql_query($query);
		if(mysql_num_rows($result) <= 0)
			mensagemToXML(utf8_decode("Nao existe terapeuta."));
		else{
			if($where == "xml")
				return $result;
			else 
				terapeutaToXML(mysql_num_fields($result) ,$result);
		}
	}

	/**********************************
	 Funcao que adiciona um terapeuta
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	***********************************/
	function adicionaTerapeuta($fotoTerapeuta, $nomeTerapeuta, $passwordTerapeuta){
        $query = "INSERT INTO Terapeuta (foto, nome, password, enable) VALUES('" . utf8_decode($fotoTerapeuta) . "','" . utf8_decode($nomeTerapeuta) . "', '" . utf8_decode($passwordTerapeuta) . "', 1)";
		$result = mysql_query($query);
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na inserção do terapeuta."));
		else
			mensagemToXML(mysql_insert_id());
	}

	/*********************************************
	 Funcao que vai buscar um terapeuta pelo nome
	 Retorna a mensagem correspondente:
		Se existir: "Terapeuta existente."
		Se não existir: "Terapeuta não existente."
	*********************************************/
	function getTerapeutaByNome($nomeTerapeuta){
		$query = "SELECT * FROM Terapeuta WHERE nome LIKE '" . utf8_decode($nomeTerapeuta) . "'";
		$result = mysql_query($query);
		if (mysql_num_rows($result) <= 0) {
			mensagemToXML(utf8_decode("Terapeuta não existente."));
		} else {
			terapeutaToXML(mysql_num_fields($result) ,$result);
		}
	}

	/*****************************************
	 Funcao que faz o update de um terapeuta
	 Se fez update retorna mensagem de sucesso, 
	 senão retorna uma mensagem de erro
	******************************************/
	function updateTerapeuta($idTerapeuta, $fotoTerapeuta, $nomeTerapeuta, $passwordTerapeuta){
        $query = "UPDATE Terapeuta SET foto = '" . utf8_decode($fotoTerapeuta) . "', nome ='" . utf8_decode($nomeTerapeuta) . "', password ='" . utf8_decode($passwordTerapeuta) . "'  WHERE id =" . $idTerapeuta;
		$result = mysql_query($query);
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na actualização do terapeuta."));
		else
			mensagemToXML(utf8_decode("Sucesso a actualizar terapeuta."));
	}

	/*****************************************
	 Funcao que faz a reactivação de um terapeuta
	 Se fez update retorna mensagem de sucesso, 
	 senão retorna uma mensagem de erro
	******************************************/
	function reactivaTerapeuta($idTerapeuta, $passwordTerapeuta){
		$query = "UPDATE Terapeuta SET password = '" . utf8_decode($passwordTerapeuta) . "', enable = 1 WHERE id =" . $idTerapeuta . "";

		$result = mysql_query($query);
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na reactivação do terapeuta."));
		else
			mensagemToXML(utf8_decode("Sucesso a reactivar o terapeuta."));
	}

	/*****************************************
	 Funcao que "remove" o terapeuta, na 
	 verdade faz disable do terapeuta
	 Se removeu retorna mensagem de sucesso, 
	 senão retorna uma mensagem de erro
	******************************************/
	function removeTerapeuta($idTerapeuta){
		$query = "UPDATE Terapeuta SET enable = 0 WHERE id =" . $idTerapeuta . "";
		$result = mysql_query($query);
		if(!$result)
			mensagemToXML(utf8_decode("Erro: Falha na remoção do terapeuta."));
		else
			mensagemToXML(utf8_decode("Sucesso a remover o terapeuta."));
	}
?>
