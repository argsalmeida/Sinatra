/*******************************
* Ficheiro com os pedidos AJAX *
* referentes às etiquetas    *
********************************/

/***********************************************
 Funcao que faz o pedido de todas as etiquetas
************************************************/
function preencheEtiquetas(where){
	var $xml = pedidoTodasEtiquetasXML("GET", where);
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
					case "listaEtiquetasHistoria": 
						preencheListaEtiquetasHistoria(result);
						break;
					case "listaEtiquetasCena": 
						preencheListaEtiquetasCena(result);
						break;
				}
			},
		error: ajaxError
	});
}

/*************************************************
 Funcao que faz o pedido para adicionar 
 uma nova etiqueta
 Retorna o id da etiqueta se adicionar
 Retorna mensagem de erro se não adicionar
 Parametros:
	nomeEtiqueta - a etiqueta a adicionar
*************************************************/
function adicionaNovaEtiqueta(nomeEtiqueta){
	var $aux = '';
	var $xml = pedidoAdicionaEtiquetaXML(nomeEtiqueta, "POST");
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
