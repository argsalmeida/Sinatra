/*****************************
* Ficheiro que contem os XML *
******************************/

/*************************************************************
 Funcao que encapsula o pedido para obter todas as perguntas
**************************************************************/
function pedidoTodasPerguntasXML(metodo, where) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "allPerguntas" + "</tipoPedido>\n" +
   			"\t<where>" + where + "</where>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
/***********************************************************************
 Funcao que encapsula o pedido com os dados da pergunta para adicionar 
************************************************************************/
function pedidoAdicionaPerguntaXML(questao, metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "adicionaPergunta" + "</tipoPedido>\n" +
			"\t<questao>" + questao + "</questao>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/*************************************************************
 Funcao que encapsula o pedido para obter uma pergunta por id 
**************************************************************/
function pedidoPerguntaIdXML(idPergunta, metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "gestoById" + "</tipoPedido>\n" +
   			"\t<idPergunta>" + idPergunta + "</idPergunta>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
