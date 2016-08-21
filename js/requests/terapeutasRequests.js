/*******************************
* Ficheiro com os pedidos AJAX *
* referentes aos terapeutas    *
********************************/

/***********************************************
 Funcao que faz o pedido de todos os terapeutas
 que estao enable.
************************************************/
function preencheTerapeutas(where){
	var $xml = pedidoTodosTerapeutasXML("GET", where);
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
					case "login": 
						preencheTerapeutasLogin(result);
						break;
					case "listaTerapeutas": 
						preencheListaTerapeutas(result);
						break;
					case "listaTerapeutasSessao": 
						preencheListaTerapeutasSessao(result);
						break;
					case "loginPlayer": 
						preencheListaTerapeutasPlayer(result);
						break;
				}
			},
		error: ajaxError
	});
}

/**********************************************
 Funcao que faz o pedido por id do terapeuta
 Retorna o terapeuta referente ao id
 Parametros:
	idTerapeuta - o id do terapeuta 
	where - refere onde o pedido e feito
	tipoPedido - o que se quer
***********************************************/
function getTerapeutaById(idTerapeuta, where){
	var $xml = pedidoInformacaoTerapeutaIdXML(idTerapeuta, "GET");
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
					case "login": 
						validaTerapeuta(result); 
						break;
					case "listaTerapeutasModificar":
						preencheDialogModificarTerapeuta(result); 
						break;
					case "loginPlayer": 
						validaTerapeutaPlayer(result);
						break;
				}
		},
		error: ajaxError
	});	
}

/**********************************************
 Funcao que faz o pedido por nome de terapeuta
 Retorna os dados do terapeuta caso exista,
 senão retorna mensagem de erro
 Parametros:
	nomeTerapeuta - o nome do terapeuta 
	where - refere onde o pedido e feito
	tipoPedido - o que se quer
***********************************************/
function getTerapeutaByNome(nomeTerapeuta){
	var $aux = '';
	var $xml = pedidoInformacaoTerapeutaNomeXML(nomeTerapeuta, "GET");
	$.ajax({
		type: "POST",
		url: getUrl(),
		contentType: "text/xml",
		dataType: "xml",
		data: $xml,
		processData: false,
		async: false,
		success: function(result){
				//se não existe um terapeuta com este nome
				if($(result).find('mensagem').text()){
					$aux = $(result).find('mensagem').text();	
				} else {
					$aux = result;
				}
		},
		error: ajaxError
	});

	return $aux;
}

/*************************************************
 Funcao que faz o pedido para adicionar 
 um novo terapeuta
 Retorna o id do terapeuta se adicionar
 Retorna mensagem de erro se não adicionar
 Parametros:
	nomeTerapeuta - o id do terapeuta 
	passwordTerapeuta - password do terapeuta
**************************************************/
function adicionaNovoTerapeuta(fotoTerapeuta, nomeTerapeuta, passwordTerapeuta){
	var $aux = '';
    var $xml = pedidoAdicionaTerapeutaXML(fotoTerapeuta, nomeTerapeuta, passwordTerapeuta, "POST");
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

/*****************************************************
 Funcao que faz o pedido para fazer o update 
 do terapeuta identificado por idTerapeuta
 Retorna mensagem conforme adicione ou nao
 Parametros:
	idTerapeuta - id do terapeuta
	nomeTerapeuta - nome do terapeuta 
	passwordTerapeuta - password do terapeuta
	verificarRepetido - se queremos que verifique
			se o nome já existe (YES/NO)
******************************************************/
function updateTerapeuta(idTerapeuta, fotoTerapeuta, nomeTerapeuta, passwordTerapeuta){
	var $aux = '';
    var $xml = pedidoModificarTerapeutaXML(idTerapeuta, fotoTerapeuta, nomeTerapeuta, passwordTerapeuta, "PUT");
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
 Funcao que faz o pedido para remover 
 o terapeuta identificado por idTerapeuta
 Retorna mensagem de erro conforme remove ou não
 Parametros:
	idTerapeuta - o id do terapeuta 
**************************************************/
function removeTerapeuta(idTerapeuta){
	var $aux = '';
	var $xml = pedidoRemoverTerapeutaXML(idTerapeuta, "DELETE")
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

/*****************************************************
 Funcao que faz o pedido para fazer o update 
 do terapeuta identificado por idTerapeuta
 Retorna mensagem conforme adicione ou nao
 Parametros:
	idTerapeuta - id do terapeuta
	nomeTerapeuta - nome do terapeuta 
	passwordTerapeuta - password do terapeuta
	verificarRepetido - se queremos que verifique
			se o nome já existe (YES/NO)
******************************************************/
function reactivaTerapeuta(idTerapeuta, passwordTerapeuta){
	var $aux = '';
	var $xml = pedidoReactivarTerapeutaXML(idTerapeuta, passwordTerapeuta, "PUT");
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
