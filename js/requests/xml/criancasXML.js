/*****************************
* Ficheiro que contem os XML *
******************************/

/*************************************************************
 Funcao que encapsula o pedido para obter todos as criancas 
**************************************************************/
function pedidoTodasCriancasXML(metodo, where) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "allCriancas" + "</tipoPedido>\n" +
        "\t<where>" + where + "</where>\n" +
        "</pedido>";
    return $.parseXML($xml);
}
/********************************************************************************************
 Funcao que encapsula o pedido para obter a crianca por id 
**********************************************************************************************/
function pedidoInformacaoCriancaIdXML(idCrianca, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "getCrianca" + "</tipoPedido>\n" +
        "\t<idCrianca>" + idCrianca + "</idCrianca>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/********************************************************************************************
 Funcao que encapsula o pedido para obter a crianca por nome 
 tipoPedido: "nomeCrianca" -> pedido para obter a crianca com o nome pretendido
**********************************************************************************************/
function pedidoInformacaoCriancaNomeXML(nomeCrianca, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "getCriancaByNome" + "</tipoPedido>\n" +
        "\t<nomeCrianca>" + nomeCrianca + "</nomeCrianca>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/********************************************************************************************
 Funcao que encapsula o pedido para obter a crianca por username
 tipoPedido: "usernameCrianca" -> pedido para obter a crianca com o username pretendido
**********************************************************************************************/
function pedidoInformacaoCriancaUsernameXML(usernameCrianca, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "getCriancaByUsername" + "</tipoPedido>\n" +
        "\t<usernameCrianca>" + usernameCrianca + "</usernameCrianca>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com os dados da crianca para adicionar */
function pedidoAdicionaCriancaXML(urlFotoCrianca, usernameCrianca, nomeCrianca, dataNascimentoCrianca, observacaoCrianca, passwordCrianca, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "adicionaCrianca" + "</tipoPedido>\n" +
        "\t<urlFotoCrianca>" + urlFotoCrianca + "</urlFotoCrianca>\n" +
        "\t<usernameCrianca>" + usernameCrianca + "</usernameCrianca>\n" +
        "\t<nomeCrianca>" + nomeCrianca + "</nomeCrianca>\n" +
        "\t<dataNascimentoCrianca>" + dataNascimentoCrianca + "</dataNascimentoCrianca>\n" +
        "\t<observacaoCrianca>" + observacaoCrianca + "</observacaoCrianca>\n" +
        "\t<passwordCrianca>" + passwordCrianca + "</passwordCrianca>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com o id da crianca para modificar */
function pedidoModificarCriancaXML(idCrianca, urlFotoCrianca, usernameCrianca, nomeCrianca, dataNascimentoCrianca, observacaoCrianca, passwordCrianca, metodo, verificarRepetido) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "modificaCrianca" + "</tipoPedido>\n" +
        "\t<idCrianca>" + idCrianca + "</idCrianca>\n" +
        "\t<nomeCrianca>" + nomeCrianca + "</nomeCrianca>\n" +
        "\t<urlFotoCrianca>" + urlFotoCrianca + "</urlFotoCrianca>\n" +
        "\t<usernameCrianca>" + usernameCrianca + "</usernameCrianca>\n" +
        "\t<dataNascimentoCrianca>" + dataNascimentoCrianca + "</dataNascimentoCrianca>\n" +
        "\t<observacaoCrianca>" + observacaoCrianca + "</observacaoCrianca>\n" +
        "\t<passwordCrianca>" + passwordCrianca + "</passwordCrianca>\n" +
        "\t<verificarRepetido>" + verificarRepetido + "</verificarRepetido>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com o id da crianca para actualizar os registos */
function pedidoUpdateRegistosCriancaXML(idCrianca, registosCriancas, metodo) {
    console.log("pedidoUpdateRegistosCriancaXML: " + registosCriancas);
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "updateRegistosCrianca" + "</tipoPedido>\n" +
        "\t<idCrianca>" + idCrianca + "</idCrianca>\n" +
        "\t<registosCriancas>" + registosCriancas + "</registosCriancas>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com o id da crianca para remover*/
function pedidoRemoverCriancaXML(idCrianca, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "removeCrianca" + "</tipoPedido>\n" +
        "\t<idCrianca>" + idCrianca + "</idCrianca>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com o id da crianca para reactivar */
function pedidoReactivarCriancaXML(idCrianca, dataNascimentoCrianca, observacaoCrianca, passwordCrianca, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "reactivaCrianca" + "</tipoPedido>\n" +
        "\t<idCrianca>" + idCrianca + "</idCrianca>\n" +
        "\t<dataNascimentoCrianca>" + dataNascimentoCrianca + "</dataNascimentoCrianca>\n" +
        "\t<observacaoCrianca>" + observacaoCrianca + "</observacaoCrianca>\n" +
        "\t<passwordCrianca>" + passwordCrianca + "</passwordCrianca>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

