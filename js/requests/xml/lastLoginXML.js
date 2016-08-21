/*****************************
* Ficheiro que contem os XML *
******************************/

function pedidoGetLastLoginTerapeutaXML(idTerapeuta, metodo){
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "lastLoginTerapeuta" + "</tipoPedido>\n" +
        "\t<idTerapeuta>" + idTerapeuta + "</idTerapeuta>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

function pedidoLastLoginTerapeutaXML(idTerapeuta, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "lastLoginTerapeuta" + "</tipoPedido>\n" +
        "\t<idTerapeuta>" + idTerapeuta + "</idTerapeuta>\n" +
        "</pedido>";
    return $.parseXML($xml);
}