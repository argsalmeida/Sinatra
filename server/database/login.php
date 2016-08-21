<?php

/*************************************************************
	 Funcao que vai verificar se o terapeuta ja tinha feito login
	*************************************************************/
 function getlastLogin($idTerapeuta){
       $query = "SELECT * FROM LastLogin WHERE id = " . $idTerapeuta;
        $result = mysql_query($query);

        if(mysql_num_rows($result) <= 0)
            mensagemToXML(utf8_decode("Nao existe login."));
        else{
            mensagemToXML(utf8_decode("Login existente."));
        }
    }

    /*************************************************************
	 Funcao que vai adicionar a data de login do terapeuta
	*************************************************************/
    function adicionarLastLoginTerapeuta($idTerapeuta){
        //date_default_timezone_set('UTC');
        date_default_timezone_set('europe/lisbon');

        $query = "INSERT INTO LastLogin (id, lastLogin) VALUES('" . $idTerapeuta . "','" . date('Y-m-d H:i:s') . "')";
        $result = mysql_query($query);
        if(!$result)
            mensagemToXML(utf8_decode("Erro: Falha na inserção da data de login."));
        else
            mensagemToXML(mysql_insert_id());

    }

/*************************************************************
	 Funcao que vai actualizar a data de login do terapeuta
	*************************************************************/
 function updateLastLoginTerapeuta($idTerapeuta){
        //date_default_timezone_set('UTC');
        date_default_timezone_set('europe/lisbon');

        $query = "UPDATE LastLogin SET lastLogin = '" . date('Y-m-d H:i:s') . "' WHERE id =" . $idTerapeuta;
        $result = mysql_query($query);
        if(!$result)
            mensagemToXML(utf8_decode("Erro: Falha na actualização da data de login."));
        else
            mensagemToXML(utf8_decode("Sucesso a actualizar a data de login."));

    }
?>