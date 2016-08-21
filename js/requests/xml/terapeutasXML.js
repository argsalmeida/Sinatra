/*****************************
* Ficheiro que contem os XML *
******************************/

/*************************************************************
 Funcao que encapsula o pedido para obter todos os terapeutas 
**************************************************************/
function pedidoTodosTerapeutasXML(metodo, where) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "allTerapeutas" + "</tipoPedido>\n" +
        "\t<where>" + where + "</where>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/********************************************************************************************
 Funcao que encapsula o pedido para obter o terapeuta por id 
 tipoPedido: "idTerapeuta" -> pedido para obter o terapeuta com o idTerapeuta
	     "metodo"	   -> 
**********************************************************************************************/
function pedidoInformacaoTerapeutaIdXML(idTerapeuta, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "getTerapeutaById" + "</tipoPedido>\n" +
        "\t<idTerapeuta>" + idTerapeuta + "</idTerapeuta>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/********************************************************************************************
 Funcao que encapsula o pedido para obter o terapeuta por nome 
 tipoPedido: "nomeTerapeuta" -> pedido para obter o terapeuta com o nomeTerapeuta
**********************************************************************************************/
function pedidoInformacaoTerapeutaNomeXML(nomeTerapeuta, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "getTerapeutaByNome" + "</tipoPedido>\n" +
        "\t<nomeTerapeuta>" + nomeTerapeuta + "</nomeTerapeuta>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com os dados do terapeuta para adicionar */
function pedidoAdicionaTerapeutaXML(fotoTerapeuta, nomeTerapeuta, passwordTerapeuta, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "adicionaTerapeuta" + "</tipoPedido>\n" +
        "\t<fotoTerapeuta>" + fotoTerapeuta + "</fotoTerapeuta>\n" +
        "\t<nomeTerapeuta>" + nomeTerapeuta + "</nomeTerapeuta>\n" +
        "\t<passwordTerapeuta>" + passwordTerapeuta + "</passwordTerapeuta>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com o id do terapeuta para modificar */
function pedidoModificarTerapeutaXML(idTerapeuta, fotoTerapeuta, nomeTerapeuta, passwordTerapeuta, metodo) {
    console.log("pedidoModificarTerapeutaXML");
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "modificaTerapeuta" + "</tipoPedido>\n" +
        "\t<idTerapeuta>" + idTerapeuta + "</idTerapeuta>\n" +
        "\t<fotoTerapeuta>" + fotoTerapeuta + "</fotoTerapeuta>\n" +
        "\t<nomeTerapeuta>" + nomeTerapeuta + "</nomeTerapeuta>\n" +
        "\t<passwordTerapeuta>" + passwordTerapeuta + "</passwordTerapeuta>\n" +
        "</pedido>";
    console.log("pedidoModificarTerapeutaXML");
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com o id do terapeuta para remover*/
function pedidoRemoverTerapeutaXML(idTerapeuta, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "removeTerapeuta" + "</tipoPedido>\n" +
        "\t<idTerapeuta>" + idTerapeuta + "</idTerapeuta>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com o id do terapeuta para modificar */
function pedidoReactivarTerapeutaXML(idTerapeuta, passwordTerapeuta, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "reactivaTerapeuta" + "</tipoPedido>\n" +
        "\t<idTerapeuta>" + idTerapeuta + "</idTerapeuta>\n" +
        "\t<passwordTerapeuta>" + passwordTerapeuta + "</passwordTerapeuta>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

