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


/*******************************
* Ficheiro com os pedidos AJAX *
* referentes ao login          *
********************************/
function getLastLoginTerapeuta(idTerapeuta){
    var $aux = '';
    var $xml = pedidoGetLastLoginTerapeutaXML(idTerapeuta, "GET");
    $.ajax({
        type: "POST",
        url: getUrl(),
        contentType: "text/xml",
        dataType: "xml",
        data: $xml,
        processData: false,
        async: false,
        success: function(result){
            $aux = $(result).find('mensagem').text();
        },
        error: ajaxError
    });
    return $aux;
}

function setLastLoginTerapeuta(idTerapeuta, existe){
    var $aux = '';
    if(existe)
        var $xml = pedidoLastLoginTerapeutaXML(idTerapeuta, "PUT");
    else
        var $xml = pedidoLastLoginTerapeutaXML(idTerapeuta, "POST");

    $.ajax({
        type: "POST",
        url: getUrl(),
        contentType: "text/xml",
        dataType: "xml",
        data: $xml,
        processData: false,
        async: false,
        success: function(result){
            $aux = $(result).find('mensagem').text();
        },
        error: ajaxError
    });
    return $aux;
}