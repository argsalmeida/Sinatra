/*****************************
* Ficheiro que contem os XML *
******************************/

/*************************************************************
 Funcao que encapsula o pedido para obter todos os questionarios 
**************************************************************/
function pedidoTodosQuestionariosXML(metodo, where) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "allQuestionarios" + "</tipoPedido>\n" +
   			"\t<where>" + where + "</where>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
/***********************************************************************
 Funcao que encapsula o pedido com os dados do questionario para adicionar 
************************************************************************/
function pedidoAdicionaQuestionarioXML(nomeQuestionario, idPerguntas, metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "adicionaQuestionario" + "</tipoPedido>\n" +
			"\t<nomeQuestionario>" + nomeQuestionario + "</nomeQuestionario>\n" +
			"\t<idPerguntas>" + idPerguntas + "</idPerguntas>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/*************************************************************
 Funcao que encapsula o pedido para obter um questionario por id 
**************************************************************/
function pedidoQuestionarioIdXML(idQuestionario, metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "questionarioById" + "</tipoPedido>\n" +
   			"\t<idQuestionario>" + idQuestionario + "</idQuestionario>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
/*************************************************************
 Funcao que encapsula o pedido para verificar se existe um
 questionario com o nome pretendido 
**************************************************************/
function pedidoVerificaNomeQuestionarioXML(nomeQuestionario, metodo){
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "nomeQuestionario" + "</tipoPedido>\n" +
   			"\t<nomeQuestionario>" + nomeQuestionario + "</nomeQuestionario>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
