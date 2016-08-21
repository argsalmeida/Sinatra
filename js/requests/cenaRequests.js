/***********************************************
 Funcao que faz o pedido de todas as cenas
************************************************/
function preencheCenas(where){
	var $xml = pedidoTodasCenasXML("GET");
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
					case "bibliotecaCenas": 
						preencheBibliotecaCenas(result); 
						break;
					case "detalhesCenas":
						preencheDetalhesCenas(result);
						break;
				}
		},	
		error: ajaxError
	});
}

/***********************************************
 Funcao que faz o pedido de uma cena por id
************************************************/
function getCenaById(idCenaSeleccionada, where){
	var $xml = pedidoCenaIdXML(idCenaSeleccionada, "GET");
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
					case "adicionarCenaHistoria": 
						preencheCenasHistoria(result); 
						break;
					case "seleccionarCena": 
						preencheCenaSeleccionada(result); 
						break;
					case "seleccionarCenaDetalhes": 
						preencheDetalhesCenaDialog(result); 
						break;
					case "adicionaNovaCenaSeleccionadaHistoria": 
						preencheAdicionaNovaCenaBibliotecaCenas(result); 
						break;
				}
		},
		error: ajaxError
	});
}

/*************************************************
 Funcao que faz o pedido para adicionar 
 uma nova cena
 Retorna o id da cena se adicionar
 Retorna mensagem de erro se não adicionar
**************************************************/
function adicionaNovaCena(thumbnail, nome, descricao, tags, urlIntroducao, mimeIntroducaoCena, idActividades, nrRepeticoesActividade, tipoActividade, urlReforcoPositivo, mimeReforcoPositivo, urlReforcoPositivoThumb, urlReforcoNegativo, mimeReforcoNegativo, urlReforcoNegativoThumb, nrVezesCena, pontuacao){
	var $aux = '';
	var $xml = pedidoAdicionaCenaXML(thumbnail, nome, descricao, tags, urlIntroducao, mimeIntroducaoCena, idActividades, nrRepeticoesActividade, tipoActividade, urlReforcoPositivo, mimeReforcoPositivo, urlReforcoPositivoThumb, urlReforcoNegativo, mimeReforcoNegativo, urlReforcoNegativoThumb, nrVezesCena, pontuacao, "POST");
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
 Funcao que faz o pedido para verificar se o
 nome de uma cena existe
************************************************/
function verificaCenaByNome(nomeCena){
	var $aux = '';
	var $xml = pedidoVerificaNomeCenaXML(nomeCena, "GET");
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
/********************************************
 Função que faz o pedido para saber qual
 o tipo de actividade da cena
 *********************************************/
    function getTipoActividadeCena(idCena){
        var $aux = '';
        var $xml = pedidoTipoActividadeCenaXML(idCena, "GET");
        $.ajax({
            type: "POST",
            url: getUrl(),
            contentType: "text/xml",
            dataType: "xml",
            data: $xml,
            processData: false,
            async: false,
            success: function(result){
                $aux = $(result).find('tipoActividade').text();;
            },
            error: ajaxError
        });
        return $aux;
    }
