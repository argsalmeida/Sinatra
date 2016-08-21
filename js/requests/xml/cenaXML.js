/*************************************************************
 Funcao que encapsula o pedido para obter todos as cenas 
**************************************************************/
function pedidoTodasCenasXML(metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "allCenas" + "</tipoPedido>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/*************************************************************
 Funcao que encapsula o pedido para obter uma cena por id 
**************************************************************/
function pedidoCenaIdXML(idCena, metodo) {
console.log("pedidoHistoriaIdXML");
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "cenaById" + "</tipoPedido>\n" +
   			"\t<idCena>" + idCena + "</idCena>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com os dados da cena para adicionar */
function pedidoAdicionaCenaXML(thumbnailCena, nomeCena, descricaoCena, tagsCena, urlIntroducaoCena, mimeIntroducaoCena, idActividadesCena, nrRepeticoesActividadeCena,tipoActividadeCena, urlReforcoPositivoCena, mimeReforcoPositivoCena, urlReforcoPositivoThumbCena, urlReforcoNegativoCena, mimeReforcoNegativoCena, urlReforcoNegativoThumbCena, nrVezesCena, pontuacaoCena, metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "adicionaCena" + "</tipoPedido>\n" +
			"\t<thumbnailCena>" + thumbnailCena + "</thumbnailCena>\n" +
			"\t<nomeCena>" + nomeCena + "</nomeCena>\n" +
			"\t<descricaoCena>" + descricaoCena + "</descricaoCena>\n" +
			"\t<tagsCena>" + tagsCena + "</tagsCena>\n" +
			"\t<urlIntroducaoCena>" + urlIntroducaoCena + "</urlIntroducaoCena>\n" +
			"\t<mimeIntroducaoCena>" + mimeIntroducaoCena + "</mimeIntroducaoCena>\n" + 
			"\t<idActividadesCena>" + idActividadesCena + "</idActividadesCena>\n" +
			"\t<nrRepeticoesActividadeCena>" + nrRepeticoesActividadeCena + "</nrRepeticoesActividadeCena>\n" +
			"\t<tipoActividadeCena>" + tipoActividadeCena + "</tipoActividadeCena>\n" +
			"\t<urlReforcoPositivoCena>" + urlReforcoPositivoCena + "</urlReforcoPositivoCena>\n" +
			"\t<mimeReforcoPositivoCena>" + mimeReforcoPositivoCena + "</mimeReforcoPositivoCena>\n" + 
			"\t<urlReforcoPositivoThumbCena>" + urlReforcoPositivoThumbCena + "</urlReforcoPositivoThumbCena>\n" +
			"\t<urlReforcoNegativoCena>" + urlReforcoNegativoCena + "</urlReforcoNegativoCena>\n" +
			"\t<mimeReforcoNegativoCena>" + mimeReforcoNegativoCena + "</mimeReforcoNegativoCena>\n" +
			"\t<urlReforcoNegativoThumbCena>" + urlReforcoNegativoThumbCena + "</urlReforcoNegativoThumbCena>\n" +
			"\t<nrVezesCena>" + nrVezesCena + "</nrVezesCena>\n" +
			"\t<pontuacaoCena>" + pontuacaoCena + "</pontuacaoCena>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/*************************************************************
 Funcao que encapsula o pedido para verificar se existe uma
 cena com o nome pretendido 
**************************************************************/
function pedidoVerificaNomeCenaXML(nomeCena, metodo){
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "nomeCena" + "</tipoPedido>\n" +
   			"\t<nomeCena>" + nomeCena + "</nomeCena>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/******************************************************
 Função que encapsula o pedido para saber qual o tipo
 de actividade da cena
*******************************************************/
function pedidoTipoActividadeCenaXML(idCena, metodo){
    var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<pedido>\n" +
        "\t<metodo>" + metodo + "</metodo>\n" +
        "\t<tipoPedido>" + "tipoActividade" + "</tipoPedido>\n" +
        "\t<idCena>" + idCena + "</idCena>\n" +
        "</pedido>";
    return $.parseXML($xml);
}