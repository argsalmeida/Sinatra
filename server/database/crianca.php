<?php

//require_once('FirePHPCore/fb.php');
//ob_start();

/******************************************
	 Funcao que vai buscar todas as crianças
	 Nota: Ordena-se por nome, ordem descendente
	 porque ao inserir na tabela, as crianças
	 que não fossem inseridas na primeira página
	 não ficavam com bind de botões
	*******************************************/
function getAllCriancas($where){
    if($where == "listaCriancas")
        $query = "SELECT * FROM Crianca WHERE enable = 1 ORDER BY nome DESC";
    else
        $query = "SELECT * FROM Crianca WHERE enable = 1 ORDER BY nome ASC";
    $result = mysql_query($query);

    if(mysql_num_rows($result) <= 0)
        mensagemToXML(utf8_decode("Nao existem crianças a apresentar."));
    else
        criancaToXML(mysql_num_fields($result) ,$result);
}

/******************************************
	 Funcao que vai buscar a crianca pelo id
	*******************************************/
function getCriancaById($idCrianca, $where){
    $query = "SELECT * FROM Crianca WHERE id = " . $idCrianca;
    $result = mysql_query($query);
    if(mysql_num_rows($result) <= 0)
        mensagemToXML(utf8_decode("Nao existe criança."));
    else {
        if($where == "xml")
            return $result;
        else 
            criancaToXML(mysql_num_fields($result) ,$result);
    }
}

/**********************************
	 Funcao que adiciona uma crianca
	 Se inseriu retorna o id, senão
	 retorna uma mensagem de erro
	***********************************/
function adicionaCrianca($urlFotoCrianca, $usernameCrianca, $nomeCrianca, $dataNascimentoCrianca, $observacaoCrianca, $passwordCrianca){
    $query = "INSERT INTO Crianca (foto, username, nome, dataNascimento, observacao, password, enable) VALUES('" . utf8_decode($urlFotoCrianca) . "', '" . utf8_decode($usernameCrianca) . "', '" . utf8_decode($nomeCrianca) . "', '" . utf8_decode($dataNascimentoCrianca) . "', '" . utf8_decode($observacaoCrianca) . "', '" . utf8_decode($passwordCrianca) . "', 1)";
    $result = mysql_query($query);
    if(!$result)
        mensagemToXML(utf8_decode("Erro: Falha na inserção da crianca."));
    else
        mensagemToXML(mysql_insert_id());
}

/*********************************************
	 Funcao que vai buscar uma crianca pelo nome
	 Retorna a mensagem correspondente:
		Se existir: "Criança existente."
		Se não existir: "Criança não existente."
	*********************************************/
function getCriancaByNome($nomeCrianca){
    $query = "SELECT * FROM Crianca WHERE nome LIKE '" . utf8_decode($nomeCrianca) . "'";
    $result = mysql_query($query);
    if (mysql_num_rows($result) <= 0) {
        mensagemToXML(utf8_decode("Criança não existente."));
    } else {
        criancaToXML(mysql_num_fields($result) ,$result);
    }
}

/*********************************************
	 Funcao que vai buscar uma crianca pelo username
	 Retorna a mensagem correspondente:
		Se existir: "Criança existente."
		Se não existir: "Criança não existente."
	*********************************************/
function getCriancaByUsername($usernameCrianca){
    $query = "SELECT * FROM Crianca WHERE username LIKE '" . utf8_decode($usernameCrianca) . "'";
    $result = mysql_query($query);
    if (mysql_num_rows($result) <= 0) {
        mensagemToXML(utf8_decode("Criança não existente."));
    } else {
        criancaToXML(mysql_num_fields($result) ,$result);
    }
}
/*****************************************
	 Funcao que faz o update de uma criança
	 Se fez update retorna mensagem de sucesso, 
	 senão retorna uma mensagem de erro
	******************************************/
function updateCrianca($idCrianca, $fotoCrianca, $usernameCrianca, $nomeCrianca, $dataNascimentoCrianca, $observacaoCrianca, $passwordCrianca){
    $query = "UPDATE Crianca SET foto = '" . utf8_decode($fotoCrianca) . "', username ='" . utf8_decode($usernameCrianca)
        . "', nome ='" . utf8_decode($nomeCrianca) . "', dataNascimento ='" . utf8_decode($dataNascimentoCrianca) . "', observacao ='" . utf8_decode($observacaoCrianca) . "', password ='" . utf8_decode($passwordCrianca) . "' WHERE id =" . $idCrianca;
    
    //foto = . '" . utf8_decode($fotoCrianca) . "', username = . '" . utf8_decode($usernameCrianca) . "', nome = '" . utf8_decode($nomeCrianca) . "', dataNascimento ='" . utf8_decode($dataNascimentoCrianca) . "', observacao ='" . utf8_decode($observacaoCrianca) . "', password ='" . utf8_decode($passwordCrianca) . "'  WHERE id =" . $idCrianca . "";
    $result = mysql_query($query);
    if(!$result)
        mensagemToXML(utf8_decode("Erro: Falha na actualização da crianca."));
    else
        mensagemToXML(utf8_decode("Sucesso a actualizar a crianca."));
}
/*****************************************
	 Funcao que faz o update dos registos
	 de uma criança
	 Se fez update retorna mensagem de sucesso, 
	 senão retorna uma mensagem de erro
	******************************************/
function updateRegistosCrianca($idCrianca, $registosCriancas){
    $query = "UPDATE Crianca SET registos = '" . utf8_decode($registosCriancas) . "'  WHERE id =" . $idCrianca . "";
    $result = mysql_query($query);
    if(!$result)
        mensagemToXML(utf8_decode("Erro: Falha na actualização da crianca."));
    else
        mensagemToXML(utf8_decode("Sucesso a actualizar a crianca."));
}
/*****************************************
	 Funcao que faz a reactivação de uma crianca
	 Se fez update retorna mensagem de sucesso, 
	 senão retorna uma mensagem de erro
	******************************************/
function reactivaCrianca($idCrianca, $dataNascimentoCrianca, $observacaoCrianca, $passwordCrianca){
    $query = "UPDATE Crianca SET dataNascimento ='" . utf8_decode($dataNascimentoCrianca) . "', observacao ='" . utf8_decode($observacaoCrianca) . "', password = '" . utf8_decode($passwordCrianca) . "', enable = 1 WHERE id =" . $idCrianca . "";

    $result = mysql_query($query);
    if(!$result)
        mensagemToXML(utf8_decode("Erro: Falha na reactivação do criança."));
    else
        mensagemToXML(utf8_decode("Sucesso a reactivar o criança."));
}

/*****************************************
	 Funcao que "remove" a criança, na 
	 verdade faz disable da criança
	 Se removeu retorna mensagem de sucesso, 
	 senão retorna uma mensagem de erro
	******************************************/
function removeCrianca($idCrianca){
    $query = "UPDATE Crianca SET enable = 0 WHERE id =" . $idCrianca . "";
    $result = mysql_query($query);
    if(!$result)
        mensagemToXML(utf8_decode("Erro: Falha na remoção da criança."));
    else
        mensagemToXML(utf8_decode("Sucesso a remover a criança."));
}
?>
