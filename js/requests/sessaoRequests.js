/***********************************************
 Funcao que faz o pedido de todas as sessoes
************************************************/
function preencheSessoes(){
	var $xml = pedidoTodasSessoesXML("GET");
	$.ajax({
		type: "POST",
		url: getUrl(),
		contentType: "text/xml",
		dataType: "xml",
		data: $xml,
		processData: false,
		async: false,
		success: preencheListaSessao,	
		error: ajaxError
	});
}

/*******************************************************
 Funcao que faz o pedido para adicionar 
 uma nova sessao
 Retorna o id da nova sessão se adicionar
 Retorna mensagem de erro se não adicionar
 Parametros:
	idTerapeutaSessao - o id do terapeuta 
	dataHoraSessao - data e hora da sessao
	idCriancasSessao - string com ids das criancas
	tipoExercicioSessao - string com o tipo de sessao
	idExercicioSessao - id da historia
	pontuacaoSessao - se a sessao tem pontuacao
********************************************************/
function adicionaNovaSessao(idTerapeutaSessao, dataHoraSessao, dataInicioSessao, dataFimSessao, idCriancasSessao, tipoSessao, tipoExercicioSessao, idExercicioSessao, idCenasPontuacaoSessao){
	var $aux = '';
	var $xml = pedidoAdicionaSessaoXML(idTerapeutaSessao, dataHoraSessao, dataInicioSessao, dataFimSessao, idCriancasSessao, tipoSessao, tipoExercicioSessao, idExercicioSessao, idCenasPontuacaoSessao, "POST");
console.log($xml);
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

/*******************************************************
 Funcao que faz o pedido para remover uma sessão 
 Retorna mensagem se removeu ou não
********************************************************/
function removeSessao(idSessao){
	var $aux = '';
	var $xml = pedidoRemoveSessaoXML(idSessao, "DELETE");
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

/***********************************************
 Funcao que faz o pedido de uma sessão por id
************************************************/
function getSessaoById(idSessao, where){
	var $aux = '';
	var $xml = pedidoSessaoIdXML(idSessao, "GET");
	$.ajax({
		type: "POST",
		url: getUrl(),
		contentType: "text/xml",
		dataType: "xml",
		data: $xml,
		processData: false,
		async: false,
		success: function(result){
				switch(where){
					case "editarSessao": 
						preencheSessaoModificar(result); 
						break;
					case "duplicarSessao":
						preencheSessaoDuplicar(result);
						break;
					case "iniciarPlayer":
						dadosIniciarPlayer(result);
					break;
					case 'copiarSessaoToHistorico':
						$aux = result;
					break;
				}
		},
		error: ajaxError
	});
	return $aux;
}

/***********************************************
 Funcao que faz o pedido para fazer o update
 de uma sessao
 Parametros:
	idTerapeutaSessao - o id do terapeuta 
	dataHoraSessao - data e hora da sessao
	idCriancasSessao - string com ids das criancas
	tipoExercicioSessao - string com o tipo de sessao
	idExercicioSessao - id da historia
************************************************/
function modificaSessao(idSessaoEditar, idTerapeutaSessao, dataHoraSessao, dataInicioSessao, dataFimSessao, idCriancasSessao, tipoSessao, tipoExercicioSessao, idExercicioSessao, idCenasPontuacaoSessao){
	var $aux = '';
    var $xml = pedidoModificaSessaoXML(idSessaoEditar, idTerapeutaSessao, dataHoraSessao, dataInicioSessao, dataFimSessao, idCriancasSessao, tipoSessao, tipoExercicioSessao, idExercicioSessao, idCenasPontuacaoSessao, "PUT");
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

/*********************************************
 Função que faz o pedido para remover uma
 sessao por id
 Parametros:
	idSessao - o id da sessao
**********************************************/
function removerSessao(idSessao){
	var $aux = '';
	var $xml = pedidoRemoveSessaoXML(idSessao, "DELETE");
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
