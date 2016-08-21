/*************************************************************
 Funcao que encapsula o pedido para obter todos as historias 
**************************************************************/
function pedidoTodasHistoriasXML(metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "allHistorias" + "</tipoPedido>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/*************************************************************
 Funcao que encapsula o pedido para obter uma história por id 
**************************************************************/
function pedidoHistoriaIdXML(idHistoria, metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "historiaById" + "</tipoPedido>\n" +
   			"\t<idHistoria>" + idHistoria + "</idHistoria>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/*************************************************************
 Funcao que encapsula o pedido para verificar se existe uma
 historia com o nome pretendido 
**************************************************************/
function pedidoVerificaNomeHistoriaXML(nomeHistoria, metodo){
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "nomeHistoria" + "</tipoPedido>\n" +
   			"\t<nomeHistoria>" + nomeHistoria + "</nomeHistoria>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/*************************************************************
 Funcao que encapsula o pedido para adicionar uma historia
**************************************************************/
function pedidoAdicionaHistoriaXML(thumbnailHistoria, nomeHistoria, descricaoHistoria, idCenasHistoria, idEtiquetasHistoria, metodo){
console.log("pedidoAdicionaHistoriaXML");
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "adicionaHistoria" + "</tipoPedido>\n" +
			"\t<thumbnailHistoria>" + thumbnailHistoria + "</thumbnailHistoria>\n" +
			"\t<nomeHistoria>" + nomeHistoria + "</nomeHistoria>\n" +
			"\t<descricaoHistoria>" + descricaoHistoria + "</descricaoHistoria>\n" +
			"\t<idCenasHistoria>" + idCenasHistoria + "</idCenasHistoria>\n" +
			"\t<idEtiquetasHistoria>" + idEtiquetasHistoria + "</idEtiquetasHistoria>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
