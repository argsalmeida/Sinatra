/*******************************
* Ficheiro com os pedidos AJAX *
* referentes às etiquetas    *
********************************/

/***********************************************
 Funcao que faz o pedido de todos os gestos
************************************************/
function preencheGestos(where){
	var $xml = pedidoTodosGestosXML("GET", where);
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
					case "listaGestos": 
						preencheListaGestos(result);
						break;
				}
			},
		error: ajaxError
	});
}

/*************************************************
 Funcao que faz o pedido para adicionar 
 um novo gesto
 Retorna o id da etiqueta se adicionar
 Retorna mensagem de erro se não adicionar
 Parametros:
	nomeGesto - o gesto a adicionar
	nrVezesGesto - numero de vezes a repetir
*************************************************/
function adicionaNovoGesto(nomeGesto){
console.log(nrVezesGesto);
	var $aux = '';
	var $xml = pedidoAdicionaGestoXML(nomeGesto, "POST");
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

/***********************************************
 Funcao que faz o pedido de um gesto por id
************************************************/
function getGestoById(idGesto, where){
	var $xml = pedidoGestoIdXML(idGesto, "GET");
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
					case "nrVezes": 
						$aux = $(result).find('nrVezesGesto').text();
						break;
					case "alterarGesto":
						preencheGestoSeleccionado(result);
						break;
					case "nomeGesto": 
						$aux = $(result).find('nomeGesto').text();
console.log("$aux: " +$aux);
						break;
				}
		},
		error: ajaxError
	});
	return $aux;
}

/***********************************************
 Funcao que faz o pedido para verificar se o
 nome de um gesto existe
************************************************/
function verificaGestoByNome(nomeGesto){
	var $aux = '';
	var $xml = pedidoVerificaNomeGestoXML(nomeGesto, "GET");
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
