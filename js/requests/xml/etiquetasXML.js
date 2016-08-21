/*****************************
* Ficheiro que contem os XML *
******************************/

/*************************************************************
 Funcao que encapsula o pedido para obter todos as etiquetas 
**************************************************************/
function pedidoTodasEtiquetasXML(metodo, where) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "allEtiquetas" + "</tipoPedido>\n" +
   			"\t<where>" + where + "</where>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
/***********************************************************************
 Funcao que encapsula o pedido com os dados da etiqueta para adicionar 
************************************************************************/
function pedidoAdicionaEtiquetaXML(nomeEtiqueta, metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "adicionaEtiqueta" + "</tipoPedido>\n" +
			"\t<nomeEtiqueta>" + nomeEtiqueta + "</nomeEtiqueta>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
