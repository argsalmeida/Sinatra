/*******************************
* Ficheiro com os pedidos AJAX *
* referentes as criancas    *
********************************/

/***********************************************
 Funcao que faz o pedido de todas as criancas
 que estao enable.
************************************************/
function preencheCriancas(where){
	var $xml = pedidoTodasCriancasXML("GET", where);
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
					case "listaCriancas": 
						preencheListaCriancas(result);
						break;
					case "listaCriancasSessao": 
						preencheListaCriancasSessao(result);
						break;
				}
			},
		error: ajaxError
	});
}

/**********************************************
 Funcao que faz o pedido por id da crianca
 Retorna a crianca referente ao id
 Parametros:
	idCrianca - o id da crianca 
	where - refere onde o pedido e feito
***********************************************/
function getCriancaById(idCrianca, where){
	var $aux = '';
	var $xml = pedidoInformacaoCriancaIdXML(idCrianca, "GET");
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
					case "listaCriancasModificar":
						preencheDialogModificarCrianca(result); 
						break;
					case "actualizarRegistos":
						$aux = result;
						break;
                    case "registoCrianca":
                        preencheDadosRegistoCrianca(result); 
                        break;
				}
		},
		error: ajaxError
	});	
	return $aux;
}	

/**********************************************
 Funcao que faz o pedido por nome de crianca
 Retorna os dados da crianca caso exista,
 senão retorna mensagem de erro
 Parametros:
	nomeCrianca - o nome da crianca 
***********************************************/
function getCriancaByNome(nomeCrianca){
	var $aux = '';
	var $xml = pedidoInformacaoCriancaNomeXML(nomeCrianca, "GET");
	$.ajax({
		type: "POST",
		url: getUrl(),
		contentType: "text/xml",
		dataType: "xml",
		data: $xml,
		processData: false,
		async: false,
		success: function(result){
				//se não existe uma crianca com este nome
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

/**********************************************
 Funcao que faz o pedido por nome de crianca
 Retorna os dados da crianca caso exista,
 senão retorna mensagem de erro
 Parametros:
	nomeCrianca - o nome da crianca 
***********************************************/
function getCriancaByUsername(usernameCrianca){
    var $aux = '';
    var $xml = pedidoInformacaoCriancaUsernameXML(usernameCrianca, "GET");
    $.ajax({
        type: "POST",
        url: getUrl(),
        contentType: "text/xml",
        dataType: "xml",
        data: $xml,
        processData: false,
        async: false,
        success: function(result){
            //se não existe uma crianca com este username
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
 uma nova crianca
 Retorna o id da crianca se adicionar
 Retorna mensagem de erro se não adicionar
 Parametros:
	nomeCrianca - o id da crianca 
	dataNascimentoCrianca - data de nascimento da crianca
	observacaoCrianca - observacao da crianca
	passwordCrianca - password da crianca
**************************************************/
function adicionaNovaCrianca(urlFotoCrianca, usernameCrianca, nomeCrianca, dataNascimentoCrianca, observacaoCrianca, passwordCrianca){
	var $aux = '';
    var $xml = pedidoAdicionaCriancaXML(urlFotoCrianca, usernameCrianca, nomeCrianca, dataNascimentoCrianca, observacaoCrianca, passwordCrianca, "POST");
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
 da crianca identificada por idCrianca
 Retorna mensagem conforme adicione ou nao
 Parametros:
	idCrianca - id da crianca
	nomeCrianca - nome da crianca
	dataNascimentoCrianca - data de nascimento da crianca
	observacaoCrianca - observacao da crianca
	passwordCrianca - password da crianca
******************************************************/
function updateCrianca(idCrianca, urlFotoCrianca, usernameCrianca, nomeCrianca, dataNascimentoCrianca, observacaoCrianca, passwordCrianca, verificarRepetido){
	var $aux = '';
    var $xml = pedidoModificarCriancaXML(idCrianca, urlFotoCrianca, usernameCrianca, nomeCrianca, dataNascimentoCrianca, observacaoCrianca, passwordCrianca, "PUT", verificarRepetido);
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
 Funcao que faz o pedido para fazer o update dos registos
 da crianca identificada por idCrianca
 Retorna mensagem conforme adicione ou nao
 Parametros:
	idCrianca - id da crianca
	registosCriancas - registos da crianca
**********************************************************/
function updateRegistosCrianca(idCrianca, registosCrianca){
	var $aux = '';
	var $xml = pedidoUpdateRegistosCriancaXML(idCrianca, registosCrianca, "PUT");
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
	$('#spinner').hide();
	return $aux;
}

/*************************************************
 Funcao que faz o pedido para remover 
 a crianca identificado por idCrianca
 Retorna mensagem de erro conforme remove ou não
 Parametros:
	idCrianca - o id da crianca 
**************************************************/
function removeCrianca(idCrianca){
	var $aux = '';
	var $xml = pedidoRemoverCriancaXML(idCrianca, "DELETE")
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
 Funcao que faz o pedido para fazer a reactivação 
 da crianca identificada por idCrianca
 Retorna mensagem conforme adicione ou nao
 Parametros:
	idCrianca - id da crianca
	nomeCrianca - nome da crianca
	dataNascimentoCrianca - data de nascimento da crianca
	observacaoCrianca - observacao da crianca
	passwordCrianca - password da crianca
******************************************************/
function reactivaCrianca(idCrianca, dataNascimentoCrianca, observacaoCrianca, passwordCrianca){
	var $aux = '';
	var $xml = pedidoReactivarCriancaXML(idCrianca, dataNascimentoCrianca, observacaoCrianca, passwordCrianca, "PUT");
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
