/*****************************
* Ficheiro que contem os XML *
******************************/

/*************************************************************
 Funcao que encapsula o pedido para obter todos as sessões 
**************************************************************/
function pedidoTodasSessoesHistoricoXML(metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "allHistorico" + "</tipoPedido>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/* Funcao que encapsula o pedido com os dados da sessao para adicionar ao historico */
function pedidoAdicionaSessaoHistoricoXML(idTerapeutaHistorico, dataHoraHistorico, dataInicioHistorico, dataFimHistorico, idCriancasHistorico, tipoSessao, tipoExercicioHistorico, idExercicioHistorico, logSessao, anotacoesSessao, metodo) {
console.log("pedidoAdicionaSessaoHistoricoXML");
console.log("idTerapeutaHistorico: " + idTerapeutaHistorico);
console.log("dataHoraHistorico: " + dataHoraHistorico);
console.log("dataInicioHistorico: " + dataInicioHistorico);
console.log("dataFimHistorico: " + dataFimHistorico);
console.log("idCriancasHistorico: " + idCriancasHistorico);
console.log("tipoSessao: " + tipoSessao);
console.log("tipoExercicioHistorico: " + tipoExercicioHistorico);
console.log("idExercicioHistorico: " + idExercicioHistorico);
console.log("logSessao: " + logSessao);
console.log("anotacoesSessao: " + anotacoesSessao);
console.log("metodo: " + metodo);
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "adicionaHistorico" + "</tipoPedido>\n" +
			"\t<idTerapeutaHistorico>" + idTerapeutaHistorico + "</idTerapeutaHistorico>\n" +
			"\t<dataHoraHistorico>" + dataHoraHistorico + "</dataHoraHistorico>\n" +
			"\t<dataInicioHistorico>" + dataInicioHistorico + "</dataInicioHistorico>\n" +
			"\t<dataFimHistorico>" + dataFimHistorico + "</dataFimHistorico>\n" +
			"\t<idCriancasHistorico>" + idCriancasHistorico + "</idCriancasHistorico>\n" +
			"\t<tipoSessao>" + tipoSessao + "</tipoSessao>\n" +
			"\t<tipoExercicioHistorico>" + tipoExercicioHistorico + "</tipoExercicioHistorico>\n" +
			"\t<idExercicioHistorico>" + idExercicioHistorico + "</idExercicioHistorico>\n" +
			"\t<logSessao>" + logSessao + "</logSessao>\n" +
			"\t<anotacoesSessao>" + anotacoesSessao + "</anotacoesSessao>\n" +
			"</pedido>";
	return $.parseXML($xml);
}

/************************************************************************
 Funcao que encapsula o pedido para obter uma sessão do histórico por id 
*************************************************************************/
function pedidoSessaoHistoricoIdXML(idSessao, metodo) {
	var $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
   			"<pedido>\n" +
   			"\t<metodo>" + metodo + "</metodo>\n" +
   			"\t<tipoPedido>" + "sessaoHistoricoById" + "</tipoPedido>\n" +
   			"\t<idSessao>" + idSessao + "</idSessao>\n" +
			"</pedido>";
	return $.parseXML($xml);
}
