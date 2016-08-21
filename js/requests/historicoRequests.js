/*********************************************************
 Funcao que faz o pedido de todas as sessoes do historico
**********************************************************/
function preencheHistorico(){
	var $xml = pedidoTodasSessoesHistoricoXML("GET");
	$.ajax({
		type: "POST",
		url: getUrl(),
		contentType: "text/xml",
		dataType: "xml",
		data: $xml,
		processData: false,
		async: false,
		success: preencheListaHistorico,
			
		error: ajaxError
	});
}

/*******************************************************
 Funcao que faz o pedido para adicionar 
 uma nova sessao ao historico
 Retorna o id do historico se adicionar
 Retorna mensagem de erro se não adicionar
 Parametros:
	idTerapeutaSessao - o id do terapeuta 
	dataHoraSessao - data e hora da sessao
	idCriancasSessao - string com ids das criancas
	tipoExercicioSessao - string com o tipo de exercicio
	idExercicioSessao - id do exercicio
	logSessao - log da sessao
	anotacoesSessao - anotacoes da sessao
********************************************************/
function adicionaNovaSessaoHistorico(idTerapeutaSessao, dataHoraSessao, dataInicioSessao, dataFimSessao, idCriancasSessao, tipoSessao, tipoExercicio, idExercicioSessao, logSessao, anotacoesSessao){
console.log("adicionaNovaSessaoHistorico");
	var $aux = '';
	var $xml = pedidoAdicionaSessaoHistoricoXML(idTerapeutaSessao, dataHoraSessao, dataInicioSessao, dataFimSessao, idCriancasSessao, tipoSessao, tipoExercicio, idExercicioSessao, logSessao, anotacoesSessao, "POST");
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

/*********************************************************
 Funcao que faz o pedido de uma sessão no historio por id
**********************************************************/
function getSessaoHistoricoById(idSessaoEditar, where){
	var $xml = pedidoSessaoHistoricoIdXML(idSessaoEditar, "GET");
	$.ajax({
		type: "POST",
		url: getUrl(),
		contentType: "text/xml",
		dataType: "xml",
		data: $xml,
		processData: false,
		async: false,
        success:  function(result){
            switch(where){
                case "duplicarSessao":
                    preencheHistoricoDuplicar(result);
                    break;
                case 'registoSessao':
                    preencheDadosSessaoRegistos(result);
                    break;
            }
        },
		error: ajaxError
	});
}