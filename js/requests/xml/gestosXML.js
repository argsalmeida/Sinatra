/*****************************
* Ficheiro que contem os XML *
******************************/

/*************************************************************
 Funcao que encapsula o pedido para obter todos os gestos 
**************************************************************/
function pedidoTodosGestosXML(metodo, where) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "allGestos" + "</tipoPedido>\n" +
   			"\t<where>" + where + "</where>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
/***********************************************************************
 Funcao que encapsula o pedido com os dados do gesto para adicionar 
************************************************************************/
function pedidoAdicionaGestoXML(nomeGesto, metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "adicionaGesto" + "</tipoPedido>\n" +
			"\t<nomeGesto>" + nomeGesto + "</nomeGesto>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/*************************************************************
 Funcao que encapsula o pedido para obter um gesto por id 
**************************************************************/
function pedidoGestoIdXML(idGesto, metodo) {

	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "gestoById" + "</tipoPedido>\n" +
   			"\t<idGesto>" + idGesto + "</idGesto>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
/*************************************************************
 Funcao que encapsula o pedido para verificar se existe um
 gesto com o nome pretendido 
**************************************************************/
function pedidoVerificaNomeGestoXML(nomeGesto, metodo){
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "nomeGesto" + "</tipoPedido>\n" +
   			"\t<nomeGesto>" + nomeGesto + "</nomeGesto>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
