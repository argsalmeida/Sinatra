/*******************************
* Ficheiro com os pedidos AJAX *
* referentes às etiquetas    *
********************************/

/***********************************************
 Funcao que faz o pedido de todos as perguntas
************************************************/
function preenchePerguntas(where){
	var $xml = pedidoTodasPerguntasXML("GET", where);
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
					case "listaPerguntas": 
						preencheListaPerguntas(result);
						break;
				}
			},
		error: ajaxError
	});
}

/*************************************************
 Funcao que faz o pedido para adicionar 
 uma nova pergunta
 Retorna o id da etiqueta se adicionar
 Retorna mensagem de erro se não adicionar
 Parametros:
	pergunta - a pergunta a adicionar
*************************************************/
function adicionaNovaPergunta(questao){
	var $aux = '';
	var $xml = pedidoAdicionaPerguntaXML(questao, "POST");
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
 Funcao que faz o pedido de uma pergunta por id
************************************************/
function getPerguntaById(idPergunta, where){
	var $xml = pedidoPerguntaIdXML(idPergunta, "GET");
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
