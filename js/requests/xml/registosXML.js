/*****************************
* Ficheiro que contem os XML *
******************************/

/*************************************************************
 Funcao que encapsula o pedido para obter todos os gestos 
**************************************************************/
function pedidoTodosRegistosXML(metodo, where) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "allRegistos" + "</tipoPedido>\n" +
   			"\t<where>" + where + "</where>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
/********************************************************************************
 Funcao que encapsula o pedido com os dados do registo dos gestos para adicionar 
*********************************************************************************/
function pedidoAdicionaRegistoGestoXML(idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, idGesto, nrRepeticaoGesto, respostaGesto, pontuacaoGesto, metodo) {
    console.log("pedidoAdicionaRegistoGestoXML: " + idSessao);
    console.log("pedidoAdicionaRegistoGestoXML: " + idCena);
    console.log("pedidoAdicionaRegistoGestoXML: " + nrRepeticaoCena);
    console.log("pedidoAdicionaRegistoGestoXML: " + idCrianca);
    console.log("pedidoAdicionaRegistoGestoXML: " + tipoRegisto);
    console.log("pedidoAdicionaRegistoGestoXML: " + idGesto);
    console.log("pedidoAdicionaRegistoGestoXML: " + nrRepeticaoGesto);
    console.log("pedidoAdicionaRegistoGestoXML: " + pontuacaoGesto);
    console.log("pedidoAdicionaRegistoGestoXML: " + metodo);
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "adicionaRegistoGesto" + "</tipoPedido>\n" +
			"\t<idSessao>" + idSessao + "</idSessao>\n" +
			"\t<idCena>" + idCena + "</idCena>\n" +
            "\t<nrRepeticaoCena>" + nrRepeticaoCena + "</nrRepeticaoCena>\n" +
			"\t<idCrianca>" + idCrianca + "</idCrianca>\n" +
			"\t<tipoRegisto>" + tipoRegisto + "</tipoRegisto>\n" +
			"\t<idGesto>" + idGesto + "</idGesto>\n" +
			"\t<nrRepeticaoGesto>" + nrRepeticaoGesto + "</nrRepeticaoGesto>\n" +
			"\t<respostaGesto>" + respostaGesto + "</respostaGesto>\n" +
        "\t<pontuacaoGesto>" + pontuacaoGesto + "</pontuacaoGesto>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/***************************************************************************************
 Funcao que encapsula o pedido com os dados do registo dos questionarios para adicionar 
****************************************************************************************/
function pedidoAdicionaRegistoQuestionarioXML(idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, idQuestionario, idPergunta, respostaPergunta, metodo) {
    console.log("pedidoAdicionaRegistoQuestionarioXML: " + metodo);
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "adicionaRegistoQuestionario" + "</tipoPedido>\n" +
			"\t<idSessao>" + idSessao + "</idSessao>\n" +
			"\t<idCena>" + idCena + "</idCena>\n" +
            "\t<nrRepeticaoCena>" + nrRepeticaoCena + "</nrRepeticaoCena>\n" +
			"\t<idCrianca>" + idCrianca + "</idCrianca>\n" +
			"\t<tipoRegisto>" + tipoRegisto + "</tipoRegisto>\n" +
            "\t<idQuestionario>" + idQuestionario + "</idQuestionario>\n" +
			"\t<idPergunta>" + idPergunta + "</idPergunta>\n" +
			"\t<respostaPergunta>" + respostaPergunta + "</respostaPergunta>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/***********************************************************************************
 Funcao que encapsula o pedido com os dados do registo da pontuacao para adicionar 
************************************************************************************/
function pedidoAdicionaRegistoPontuacaoXML(idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, pontuacaoCena, metodo) {
    console.log("pedidoAdicionaRegistoPontuacaoXML: " + metodo);
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "adicionaRegistoPontuacao" + "</tipoPedido>\n" +
			"\t<idSessao>" + idSessao + "</idSessao>\n" +
			"\t<idCena>" + idCena + "</idCena>\n" +
            "\t<nrRepeticaoCena>" + nrRepeticaoCena + "</nrRepeticaoCena>\n" +
			"\t<idCrianca>" + idCrianca + "</idCrianca>\n" +
			"\t<tipoRegisto>" + tipoRegisto + "</tipoRegisto>\n" +
			"\t<pontuacaoCena>" + pontuacaoCena + "</pontuacaoCena>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/*************************************************************
 Funcao que encapsula o pedido para obter um registo por id 
**************************************************************/
function pedidoRegistoIdXML(idRegisto, metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "registoById" + "</tipoPedido>\n" +
   			"\t<idRegisto>" + idRegisto + "</idRegisto>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/*************************************************************
 Funcao que encapsula o pedido para obter um registo por id 
**************************************************************/
function pedidoRegistoBySessaoIdXML(idSessao, metodo) {
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "registoBySessaoId" + "</tipoPedido>\n" +
        "\t<idSessao>" + idSessao + "</idSessao>\n" +
        "</pedido>";
    return $.parseXML($xml);
}