/*******************************
* Ficheiro com os pedidos AJAX *
* referentes às etiquetas    *
********************************/

/***********************************************
 Funcao que faz o pedido de todos os questionarios
************************************************/
function preencheQuestionarios(where){
	var $xml = pedidoTodosQuestionariosXML("GET", where);
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
					case "listaQuestionarios": 
						preencheListaQuestionarios(result);
						break;
				}
			},
		error: ajaxError
	});
}

/*************************************************
 Funcao que faz o pedido para adicionar 
 um novo questionario
 Retorna o id do questionario se adicionar
 Retorna mensagem de erro se não adicionar
 Parametros:
	nomeQuestionario - o questionario a adicionar
	idPerguntas - as perguntas no questionario
*************************************************/
function adicionaNovoQuestionario(nomeQuestionario, idPerguntas){
	var $aux = '';
	var $xml = pedidoAdicionaQuestionarioXML(nomeQuestionario, idPerguntas, "POST");
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
 Funcao que faz o pedido de um questionario por id
************************************************/
function getQuestionarioById(idQuestionario, where){
	var $xml = pedidoQuestionarioIdXML(idQuestionario, "GET");
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
				switch(where){
					case "preenchePerguntasQuestionario": 
						preencheListaPerguntasQuestionarios(result);
						break;
					case "detalhesQuestionario": 
						preencheDetalhesPerguntasQuestionariosDialog(result);
						break;
					case "nomeQuestionario": 
						$aux = $(result).find('nomeQuestionario').text();
						break;
				}
			},
		error: ajaxError
	});
	return $aux;
}
/***********************************************
 Funcao que faz o pedido para verificar se o
 nome de um questionario existe
************************************************/
function verificaQuestionarioByNome(nomeQuestionario){
	var $aux = '';
	var $xml = pedidoVerificaNomeQuestionarioXML(nomeQuestionario, "GET");
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
