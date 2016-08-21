/*****************************
* Ficheiro que contem os XML *
******************************/

/*************************************************************
 Funcao que encapsula o pedido para obter todos as sessões 
**************************************************************/
function pedidoTodasSessoesXML(metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "allSessoes" + "</tipoPedido>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com os dados da sessao para adicionar */
function pedidoAdicionaSessaoXML(idTerapeutaSessao, dataHoraSessao, dataInicioSessao, dataFimSessao, idCriancasSessao, tipoSessao, tipoExercicioSessao, idExercicioSessao, idCenasPontuacaoSessao, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "adicionaSessao" + "</tipoPedido>\n" +
        "\t<idTerapeutaSessao>" + idTerapeutaSessao + "</idTerapeutaSessao>\n" +
        "\t<dataHoraSessao>" + dataHoraSessao + "</dataHoraSessao>\n" +
        "\t<dataInicioSessao>" + dataInicioSessao + "</dataInicioSessao>\n" +
        "\t<dataFimSessao>" + dataFimSessao + "</dataFimSessao>\n" +
        "\t<idCriancasSessao>" + idCriancasSessao + "</idCriancasSessao>\n" +
        "\t<tipoSessao>" + tipoSessao + "</tipoSessao>\n" +
        "\t<tipoExercicioSessao>" + tipoExercicioSessao + "</tipoExercicioSessao>\n" +
        "\t<idExercicioSessao>" + idExercicioSessao + "</idExercicioSessao>\n" +
        "\t<idCenasPontuacaoSessao>" + idCenasPontuacaoSessao + "</idCenasPontuacaoSessao>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com os dados da sessao para adicionar */
function pedidoRemoveSessaoXML(idSessao, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "removeSessao" + "</tipoPedido>\n" +
        "\t<idSessao>" + idSessao + "</idSessao>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/*************************************************************
 Funcao que encapsula o pedido para obter uma sessão por id 
**************************************************************/
function pedidoSessaoIdXML(idSessao, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "sessaoById" + "</tipoPedido>\n" +
        "\t<idSessao>" + idSessao + "</idSessao>\n" +
        "</pedido>";
    return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com os dados da sessao a modificar */
function pedidoModificaSessaoXML(idSessaoEditar, idTerapeutaSessao, dataHoraSessao, dataInicioSessao, dataFimSessao, idCriancasSessao, tipoSessao, tipoExercicioSessao, idExercicioSessao, idCenasPontuacaoSessao, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "modificaSessao" + "</tipoPedido>\n" +
        "\t<idSessaoEditar>" + idSessaoEditar + "</idSessaoEditar>\n" +
        "\t<idTerapeutaSessao>" + idTerapeutaSessao + "</idTerapeutaSessao>\n" +
        "\t<dataHoraSessao>" + dataHoraSessao + "</dataHoraSessao>\n" +
        "\t<dataInicioSessao>" + dataInicioSessao + "</dataInicioSessao>\n" +
        "\t<dataFimSessao>" + dataFimSessao + "</dataFimSessao>\n" +
        "\t<idCriancasSessao>" + idCriancasSessao + "</idCriancasSessao>\n" +
        "\t<tipoExercicioSessao>" + tipoExercicioSessao + "</tipoExercicioSessao>\n" +
        "\t<idExercicioSessao>" + idExercicioSessao + "</idExercicioSessao>\n" +
        "\t<idCenasPontuacaoSessao>" + idCenasPontuacaoSessao + "</idCenasPontuacaoSessao>\n" +
        "</pedido>";
    return $.parseXML($xml);
}
/* Funcao que encapsula o pedido com os dados da sessao a remover */
function pedidoRemoveSessaoXML(idSessao, metodo){
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "removeSessao" + "</tipoPedido>\n" +
        "\t<idSessao>" + idSessao + "</idSessao>\n" +
        "</pedido>";
    return $.parseXML($xml);
}
