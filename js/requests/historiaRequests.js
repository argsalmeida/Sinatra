/***********************************************
 Funcao que faz o pedido de todas as historias
************************************************/
function preencheHistorias(where){
	var $xml = pedidoTodasHistoriasXML("GET");
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
					case "bibliotecaHistorias": 
						preencheBibliotecaHistorias(result); 
						break;
					case "detalhesHistorias":
						preencheDetalhesHistorias(result);
						break;
				}
		},	
		error: ajaxError
	});
}

/***********************************************
 Funcao que faz o pedido de uma historia por id
************************************************/
function getHistoriaById(idHistoriaSeleccionada, where){
	var $xml = pedidoHistoriaIdXML(idHistoriaSeleccionada, "GET");
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
					case "seleccionarHistoria": 
						preencheHistoriaSeleccionada(result); 
						break;
					case "cenasHistoria":
						preencheCenasHistoria(result);
						break;
					case "detalhesHistoria":
						preencheDetalhesHistoria(result);
						break;
					case "preencheDadosHistoria":
						preencheDadosHistoria(result);
						break;
				}
		},
		error: ajaxError
	});
}

/***********************************************
 Funcao que faz o pedido para verificar se o
 nome de uma historia existe
************************************************/
function verificaHistoriaByNome(nomeHistoria){
	var $aux = '';
	var $xml = pedidoVerificaNomeHistoriaXML(nomeHistoria, "GET");
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
 Funcao que faz o pedido para adicionar uma
 historia
************************************************/
function adicionaNovaHistoria(thumbnail, nome, descricao, idCenas, idEtiquetas){
console.log("aqui");
	var $aux = '';
	var $xml = pedidoAdicionaHistoriaXML(thumbnail, nome, descricao, idCenas, idEtiquetas, "POST");
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
