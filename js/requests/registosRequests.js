/*******************************
* Ficheiro com os pedidos AJAX *
* referentes aos registos    *
********************************/

/***********************************************
 Funcao que faz o pedido de todos os registos
************************************************/
function preencheRegistos(where){
	var $xml = pedidoTodosRegistosXML("GET", where);
	$.ajax({
		type: "POST",
		url: getUrl(),
		contentType: "text/xml",
		dataType: "xml",
		data: $xml,
		processData: false,
		async: false,
		success: function(result){
				console.log("TODO");
//				$aux = $(result).find('mensagem').text();
			},
		error: ajaxError
	});
}

/*************************************************
 Funcao que faz o pedido para adicionar 
 um novo registo referente aos gestos
 Retorna o id do registo adicionado se adicionar
 Retorna mensagem de erro se não adicionar
 Parametros:
	idSessao - id da sessao
	idCena - id da cena
	tipoRegisto - tipo do registo
	idGesto - id do gesto
	respostaGesto - resposta dada
*************************************************/
function adicionaNovoRegistoGesto(idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, idGesto, nrRepeticaoGesto, respostaGesto, pontuacaoGesto){
    console.log("adicionaNovoRegistoGesto");
	var $aux = '';
    var $xml = pedidoAdicionaRegistoGestoXML(idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, idGesto, nrRepeticaoGesto, respostaGesto, pontuacaoGesto, "POST");
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

/*************************************************
 Funcao que faz o pedido para adicionar 
 um novo registo referente aos questionários
 Retorna o id do registo adicionado se adicionar
 Retorna mensagem de erro se não adicionar
 Parametros:
	idSessao - id da sessao
	idCena - id da cena
	tipoRegisto - tipo do registo
	idPergunta - id da pergunta
	respostaPergunta - resposta dada
*************************************************/
function adicionaNovoRegistoQuestionario(idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, idQuestionario, idPergunta, respostaPergunta){
    console.log("adicionaNovoRegistoQuestionario: " + idCrianca);
	var $aux = '';
    var $xml = pedidoAdicionaRegistoQuestionarioXML(idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, idQuestionario, idPergunta, respostaPergunta, "POST");
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

/*************************************************
 Funcao que faz o pedido para adicionar 
 um novo registo referente à pontuação
 Retorna o id do registo adicionado se adicionar
 Retorna mensagem de erro se não adicionar
 Parametros:
	idSessao - id da sessao
	idCena - id da cena
	tipoRegisto - tipo do registo
	pontuacaoCena - pontuacao da cena
*************************************************/
function adicionaNovoRegistoPontuacao(idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, pontuacaoCena){
    console.log("adicionaNovoRegistoPontuacao");
	var $aux = '';
    var $xml = pedidoAdicionaRegistoPontuacaoXML(idSessao, idCena, nrRepeticaoCena, idCrianca, tipoRegisto, pontuacaoCena, "POST");
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
 Funcao que faz o pedido de um registo por id
************************************************/
function getRegistoById(idRegisto, where){
	var $xml = pedidoRegistoIdXML(idRegisto, "GET");
	var $aux = '';
	$.ajax({
		type: "POST",
		url: getUrl(),
		contentType: "text/xml",
		dataType: "xml",
		data: $xml,
		processData: false,
		async: false,
		success: function(result){
			console.log("TODO");
//			$aux = $(result).find('mensagem').text();				
		},
		error: ajaxError
	});
	return $aux;
}

/***********************************************************
 Funcao que faz o pedido dos registos de determinada sessão
************************************************************/
function getRegistosBySessaoId(idSessao){
    var $xml = pedidoRegistoBySessaoIdXML(idSessao, "GET");
    $.ajax({
        type: "POST",
        url: getUrl(),
        contentType: "text/xml",
        dataType: "xml",
        data: $xml,
        processData: false,
        async: false,
        success: preencheRegistosSessao,
        error: ajaxError
    });
}
