/*****************************************
p * Ficheiro com as funções auxiliares de *
 * de dadosSessao.html 			 *
/*****************************************/

/*****************************************************************************
 Função que formata o conteudo das tabs de forma a ser resizable com a janela
******************************************************************************/
function formatWindow($tabDivId){
	$("#" + $tabDivId).css("height", ($('#dadosSessao .ui-tabs-panel').height())+ "px");
}

/*************************************************************************
 Função que faz o upload do thumbnail da história para a pasta temporária
**************************************************************************/
function uploadHistoriaThumbnail(){
console.log("uploadHistoriaThumbnail");
	if($imagemHistoria == ''){
		$imagemHistoria = "../server/files/tempFolderHistoria/noImage.gif";
	}
	var $ajax = thumbnailRequest(null, "saveFile", $nomeHistoria, "tempFolderHistoria");      

	$ajax.success(function(realData) {
		$imagemHistoria = realData;
		$('#thumbnailHistoria').attr("src", $imagemHistoria);

	});
console.log("$imagemHistoria: " + $imagemHistoria);
}

/*************************************************************************
 Função que formata o conteudo dos elementos da biblioteca de histórias
 consoante o tamanho da janela
**************************************************************************/
function resizeFunctionBibliotecaHistorias(){
	var $tabId = $('#anteriorBibliotecaHistoriasButton').parent().parent().parent().attr('id');
	$('#bibliotecaHistoriasColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
	$('#bibliotecaHistoriasColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
	$('#bibliotecaHistoriasDiv').css("height", ($('#bibliotecaHistoriasColuna').height() - $('#bibliotecaHistoriaTitle').height() - 40) + "px");
	$('#bibliotecaHistoriasDiv').css("max-height", ($('#bibliotecaHistoriasColuna').height() - $('#bibliotecaHistoriaTitle').height() - 40) + "px");
	
	$('#historiaSeleccionadaColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#dadosSessaoBibliotecaButtons').height()-  35) + "px");
	$('#historiaSeleccionadaColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#dadosSessaoBibliotecaButtons').height()-  35) + "px");
	$('#informacaoHistoria').css("height", ($('#historiaSeleccionadaColuna').height() - $('#historiaSeleccionadaDiv').height() - 40) + "px");
	$('#informacaoHistoria').css("max-height", ($('#historiaSeleccionadaColuna').height() - $('#historiaSeleccionadaDiv').height() - 40) + "px");


	$(window).resize(function(){
		$('#bibliotecaHistoriasColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
		$('#bibliotecaHistoriasColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
		$('#bibliotecaHistoriasDiv').css("height", ($('#bibliotecaHistoriasColuna').height() - $('#bibliotecaHistoriaTitle').height() - 40) + "px");
		$('#bibliotecaHistoriasDiv').css("max-height", ($('#bibliotecaHistoriasColuna').height() - $('#bibliotecaHistoriaTitle').height() - 40) + "px");
		
		$('#historiaSeleccionadaColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#dadosSessaoBibliotecaButtons').height()-  35) + "px");
		$('#historiaSeleccionadaColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#dadosSessaoBibliotecaButtons').height()-  35) + "px");
		$('#informacaoHistoria').css("height", ($('#historiaSeleccionadaColuna').height() - $('#bibliotecaDivHistoriaSeleccionada').height() - 40) + "px");
		$('#informacaoHistoria').css("max-height", ($('#historiaSeleccionadaColuna').height() - $('#bibliotecaDivHistoriaSeleccionada').height() - 40) + "px");
	});
}

/*************************************************************************
 Função que formata o conteudo dos elementos das cenas seleccionadas
 consoante o tamanho da janela
**************************************************************************/
function resizeFunctionEscolherCenas(){
	var $tabId = $('#anteriorCenaButton').parent().parent().parent().attr('id');
	$('#escolherCenaColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
	$('#escolherCenaColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
	
	$('#cenasHistoriaColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 35) + "px");
	$('#cenasHistoriaColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 35) + "px");
	$('#cenasHistoriasDiv').css("height", ($('#cenasHistoriaColuna').height() - $('#cenasHistoriaDivTitle').height() - 40) + "px");
	$('#cenasHistoriasDiv').css("max-height", ($('#cenasHistoriaColuna').height() - $('#cenasHistoriaDivTitle').height() - 40) + "px");


	$(window).resize(function(){
		$('#escolherCenaColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
		$('#escolherCenaColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
		
		$('#cenasHistoriaColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 35) + "px");
		$('#cenasHistoriaColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 35) + "px");
		$('#cenasHistoriasDiv').css("height", ($('#cenasHistoriaColuna').height() - $('#cenasHistoriaDivTitle').height() - 40) + "px");
		$('#cenasHistoriasDiv').css("max-height", ($('#cenasHistoriaColuna').height() - $('#cenasHistoriaDivTitle').height() - 40) + "px");
	});
}

/*************************************************************************
 Função que formata o conteudo dos elementos da biblioteca de cenas
 consoante o tamanho da janela
**************************************************************************/
function resizeFunctionBibliotecaCenas(){
	var $tabId = $('#anteriorBibliotecaCenasButton').parent().parent().parent().attr('id');
	$('#bibliotecaCenasColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
	$('#bibliotecaCenasColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
	$('#bibliotecaCenasDiv').css("height", ($('#bibliotecaCenasColuna').height() - $('#bibliotecaCenasTitle').height() - 40) + "px");
	$('#bibliotecaCenasDiv').css("max-height", ($('#bibliotecaCenasColuna').height() - $('#bibliotecaCenasTitle').height() - 40) + "px");
	
	$('#cenaSeleccionadaColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#dadosSessaoBibliotecaCenaButtons').height()-  35) + "px");
	$('#cenaSeleccionadaColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#dadosSessaoBibliotecaCenaButtons').height()-  35) + "px");
	$('#informacaoCena').css("height", ($('#cenaSeleccionadaColuna').height() - $('#cenaSeleccionadaDiv').height() - 40) + "px");
	$('#informacaoCena').css("max-height", ($('#cenaSeleccionadaColuna').height() - $('#cenaSeleccionadaDiv').height() - 40) + "px");


	$(window).resize(function(){
		$('#bibliotecaCenasColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
		$('#bibliotecaCenasColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - 30) + "px");
		$('#bibliotecaCenasDiv').css("height", ($('#bibliotecaCenasColuna').height() - $('#bibliotecaCenasTitle').height() - 40) + "px");
		$('#bibliotecaCenasDiv').css("max-height", ($('#bibliotecaCenasColuna').height() - $('#bibliotecaCenasTitle').height() - 40) + "px");
		
		$('#cenaSeleccionadaColuna').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#dadosSessaoBibliotecaCenaButtons').height()-  35) + "px");
		$('#cenaSeleccionadaColuna').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#dadosSessaoBibliotecaCenaButtons').height()-  35) + "px");
		$('#informacaoCena').css("height", ($('#cenaSeleccionadaColuna').height() - $('#cenaSeleccionadaDiv').height() - 40) + "px");
		$('#informacaoCena').css("max-height", ($('#cenaSeleccionadaColuna').height() - $('#cenaSeleccionadaDiv').height() - 40) + "px");
	});
}

/*************************************************************************
 Função que formata o conteudo dos elementos dos gestos escolhidos
 consoante o tamanho da janela
**************************************************************************/
function resizeFunctionSessaoGesto(){
	var $tabId = $('#anteriorGestoButton').parent().parent().parent().attr('id');
	$('#listaGestosEscolhidos').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#gestoTitle').height() - 42) + "px");
	$('#listaGestosEscolhidos').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#gestoTitle').height() - 42) + "px");

	$('#gestosEscolhidosDiv').css("height", ($('#listaGestosEscolhidos').height() - $('#listaGestosEscolhidosDivTitleButtons').height() - 35) + "px");
	$('#gestosEscolhidosDiv').css("max-height", ($('#listaGestosEscolhidos').height() - $('#listaGestosEscolhidosDivTitleButtons').height() - 35) + "px");

	$(window).resize(function(){
		$('#listaGestosEscolhidos').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#gestoTitle').height() - 42) + "px");
		$('#listaGestosEscolhidos').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#gestoTitle').height() - 42) + "px");

		$('#gestosEscolhidosDiv').css("height", ($('#listaGestosEscolhidos').height() - $('#listaGestosEscolhidosDivTitleButtons').height() - 35) + "px");
		$('#gestosEscolhidosDiv').css("max-height", ($('#listaGestosEscolhidos').height() - $('#listaGestosEscolhidosDivTitleButtons').height() - 35) + "px");
	});
}

/*************************************************************************
 Função que formata o conteudo dos elementos dos questionarios escolhidos
 consoante o tamanho da janela
**************************************************************************/
function resizeFunctionSessaoQuestionario(){
	var $tabId = $('#anteriorQuestionarioButton').parent().parent().parent().attr('id');
	$('#listaQuestionariosEscolhidos').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#questionarioTitle').height() - 42) + "px");
	$('#listaQuestionariosEscolhidos').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#questionarioTitle').height() - 42) + "px");

	$('#questionariosEscolhidosDiv').css("height", ($('#listaQuestionariosEscolhidos').height() - $('#listaQuestionariosEscolhidosTitle').height() - 35) + "px");
	$('#questionariosEscolhidosDiv').css("max-height", ($('#listaQuestionariosEscolhidos').height() - $('#listaQuestionariosEscolhidosTitle').height() - 35) + "px");

	$(window).resize(function(){
		$('#listaQuestionariosEscolhidos').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#questionarioTitle').height() - 42) + "px");
		$('#listaQuestionariosEscolhidos').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#questionarioTitle').height() - 42) + "px");

		$('#questionariosEscolhidosDiv').css("height", ($('#listaQuestionariosEscolhidos').height() - $('#listaQuestionariosEscolhidosTitle').height() - 35) + "px");
		$('#questionariosEscolhidosDiv').css("max-height", ($('#listaQuestionariosEscolhidos').height() - $('#listaQuestionariosEscolhidosTitle').height() - 35) + "px");
	});
}

/*************************************************************************
 Função que formata o conteudo dos elementos dos questionarios escolhidos
 consoante o tamanho da janela
**************************************************************************/
function resizeFunctionSessaoPerguntasQuestionario(){
	var $tabId = $('#anteriorPerguntasQuestionarioButton').parent().parent().parent().attr('id');
	$('#listaPerguntasEscolhidasQuestionario').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#perguntasQuestionarioTitle').height() - 42) + "px");
	$('#listaPerguntasEscolhidasQuestionario').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#perguntasQuestionarioTitle').height() - 42) + "px");

	$('#perguntasEscolhidasQuestionarioDiv').css("height", ($('#listaPerguntasEscolhidasQuestionario').height() - $('#listaPerguntasEscolhidasQuestionarioDivTitleButtons').height() - 35) + "px");
	$('#perguntasEscolhidasQuestionarioDiv').css("max-height", ($('#listaPerguntasEscolhidasQuestionario').height() - $('#listaPerguntasEscolhidasQuestionarioDivTitleButtons').height() - 35) + "px");

	$(window).resize(function(){
		$('#listaPerguntasEscolhidasQuestionario').css("height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#perguntasQuestionarioTitle').height() - 42) + "px");
		$('#listaPerguntasEscolhidasQuestionario').css("max-height", ($('#' + $tabId).height() - $('#anteriorSeguinteButtonsDiv').height() - $('#perguntasQuestionarioTitle').height() - 42) + "px");

		$('#perguntasEscolhidasQuestionarioDiv').css("height", ($('#listaPerguntasEscolhidasQuestionario').height() - $('#listaPerguntasEscolhidasQuestionarioDivTitleButtons').height() - 35) + "px");
		$('#perguntasEscolhidasQuestionarioDiv').css("max-height", ($('#listaPerguntasEscolhidasQuestionario').height() - $('#listaPerguntasEscolhidasQuestionarioDivTitleButtons').height() - 35) + "px");
	});
}

/********************************************************
 Função para a barra de progresso do upload de ficheiros
*********************************************************/
function uploadProgress(event) {
	if (event.lengthComputable) {  
		$target.show();
		$target.attr('max', 100);

		var percent = Math.round(event.loaded * 100 / event.total); //cálculo simples de porcentagem.
		$target.val(percent);  

		if (percent == 100){
			$targetLabel.empty();
			$targetLabel.show();
			$targetLabel.append('100% - Carregamento completo');
			$('#seguinteIntroducaoCenaButton').attr("disabled", false);
			$('#seguinteReforcoPositivoButton').attr("disabled", false);
			$('#seguinteEscolherReforcoNegativoButton').attr("disabled", false);
		}
	} else {
		$targetLabel.empty();
		$targetLabel.append('Ups...Houve um erro! Tente de novo.');
	}
}

/*******************************************************************************
 Função que adiciono um gesto novo à lista de gestos existentes e seleccionados 
 na tab "Escolher Gesto"
********************************************************************************/
function adicionaNovoGestoListaGestos(){
console.log("adicionaNovoGestoListaGestos");
	$('#listaGestosExistentes').append('<option value="' + $idGestoSessao + '">' + $nomeGestoSessao + '</option>');
	$("#listaGestosExistentes").html($("#listaGestosExistentes option").sort(function (a, b) {
	    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
	})); 
	$('#listaGestosExistentesAux').append('<option value="' + $idGestoSessao + '">' + $nomeGestoSessao + '</option>');
	$("#listaGestosExistentesAux").html($("#listaGestosExistentesAux option").sort(function (a, b) {
	    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
	})); 
	cloneGestos = $("#listaGestosExistentesAux").children().clone();

	if($("#gestosSorteable li").length == 0)
		$("#gestosSorteable").empty();
		var $repeticoesText = '';
		if($nrVezesGestoSessao == 1)
			$repeticoesText = '1 repetição';
		else
			$repeticoesText = $nrVezesGestoSessao + ' repetições';
		$("#gestosSorteable").append('<li class="ui-state-default liGestos" id="' + $countGestos + 'gestoEscolhido' + $idGestoSessao + '">' + '<div id="liGestostexto">' + $nomeGestoSessao + ' - ' + $repeticoesText + '</div><div id="liGestosButton"><img class="detalhesGesto" name="' + $nrVezesGestoSessao + '" id="' + $countGestos + 'gestoEscolhidoButton' + $idGestoSessao + '" src="../imagens/remover.png" width="35px" align="right"/></div></li>');
//<img class="detalhesGesto" name="' + $nrVezesGestoSessao + '" id="' + $countGestos + 'detalhesGestoEscolhidoButton' + $idGestoSessao + '" src="../imagens/ver.png" width="35px" align="right" style="padding-right:2px">
	$("#gestosSorteable").click();

	$('#' + $countGestos + 'gestoEscolhidoButton' + $idGestoSessao).bind('click', function() {
		var $count = $(this).attr('id').split('gestoEscolhidoButton')[0];
		var $idGestoRemover = $(this).attr('id').split('gestoEscolhidoButton')[1];
		var $gestoRemover = $count + 'gestoEscolhido' + $idGestoRemover;
		$('li#'+ $gestoRemover).remove(); 
		$("#gestosSorteable").click();
		if($idTipoActividadeCena.length == 0){
			$("#gestosSorteable").append('<p> Não existem gestos seleccionados nesta cena </p>');		
		}
	});

	$('#' + $countGestos + 'detalhesGestoEscolhidoButton' + $idGestoSessao).bind('click', function() {
			var $nrVezes = $(this).attr('name');
			var $count = $(this).attr('id').split('detalhesGestoEscolhidoButton')[0];
			var $idGesto = $(this).attr('id').split('detalhesGestoEscolhidoButton')[1];

			$('#inputboxesNrRepeticoes').empty();
			var $gestoSeleccionadoGestosSorteable = $("#gestosSorteable li[id='" + $count + "gestoEscolhido" + $idGesto + "']").text();
$('#inputboxesNrRepeticoes').append('<div id="titleDialogNrRepeticoes"><h3 id="titleNrRepeticoes">' + $gestoSeleccionadoGestosSorteable + '</h3></div>');
			$('#inputboxesNrRepeticoes').append('<div id="numeroRepeticoesGesto"><br><p id="mensagem">Número de repetições: ' +
							'&nbsp;&nbsp;<input type="number" id="nrRepeticoesGestoDetalhes" min="1" value="' + $nrVezes +'" readonly></p><br></div>');
			$.blockUI({ 
				message: $('#dialogNrRepeticoes'), 
				css: { 
					border: '3px solid #aed0ea', 
					padding: '5px', 
					backgroundColor: '#CCE0FF', 
					'-webkit-border-radius': '10px', 
					'-moz-border-radius': '10px', 
					color: '#000', 
					position: 'absolute',
					top: '10%'
				}
			});
			
			$('#okDialogNrRepeticoes').click(function() {
				$('#okDialogNrRepeticoes').unbind();	
	           		 $.unblockUI();  
      			});

		});

	$countGestos++;

}

/******************************************************************
 Função que adiciona um gesto à lista de gestos seleccionados
*******************************************************************/
function botoesDadosSessaoGestoAdicionaGesto(){
console.log("botoesDadosSessaoGestoAdicionaGesto");
	if($("#gestosSorteable li").length == 0)
		$("#gestosSorteable").empty();
	var i = 0;
	$('#listaGestosExistentes option:selected').each(function(){
		if(Number($gestosNrVezes[i])){
			var $idGesto = $(this).val();
			var $repeticoesText = '';
			if($gestosNrVezes[i] == 1)
				$repeticoesText = '1 repetição';
			else
				$repeticoesText = $gestosNrVezes[i] + ' repetições';
				
			$("#gestosSorteable").append('<li class="ui-state-default liGestos" id="' + $countGestos + 'gestoEscolhido' + $idGesto + '">' + '<div id="liGestostexto">' + $(this).text() + ' - ' + $repeticoesText + '</div><div id="liGestosButton"><img class="detalhesGesto" name="' + $gestosNrVezes[i] + '" id="' + $countGestos + 'gestoEscolhidoButton' + $idGesto + '" src="../imagens/remover.png" width="35px" align="right"/></div></li>');
//<img class="detalhesGesto" name="' + $gestosNrVezes[i] + '" id="' + $countGestos + 'detalhesGestoEscolhidoButton' + $idGesto + '" src="../imagens/ver.png" width="35px" align="right" style="padding-right:2px">
			$("#gestosSorteable").click();

			$('#' + $countGestos + 'gestoEscolhidoButton' + $idGesto).bind('click', function() {
				var $count = $(this).attr('id').split('gestoEscolhidoButton')[0];
				var $idGestoRemover = $(this).attr('id').split('gestoEscolhidoButton')[1];
				var $gestoRemover = $count + 'gestoEscolhido' + $idGestoRemover;
				$('li#'+ $gestoRemover).remove(); 
				$("#gestosSorteable").click();
				if($idTipoActividadeCena.length == 0){
					$("#gestosSorteable").append('<p> Não existem gestos seleccionados nesta cena </p>');		
				}
			});

			$('#' + $countGestos + 'detalhesGestoEscolhidoButton' + $idGesto).bind('click', function() {
				var $nrVezes = $(this).attr('name');
				var $count = $(this).attr('id').split('detalhesGestoEscolhidoButton')[0];
				var $idGesto = $(this).attr('id').split('detalhesGestoEscolhidoButton')[1];

				$('#inputboxesNrRepeticoes').empty();
			var $gestoSeleccionadoGestosSorteable = $("#gestosSorteable li[id='" + $count + "gestoEscolhido" + $idGesto + "']").text();
			$('#inputboxesNrRepeticoes').append('<div id="titleDialogNrRepeticoes"><h3 id="titleNrRepeticoes">' + $gestoSeleccionadoGestosSorteable + '</h3></div>');
			$('#inputboxesNrRepeticoes').append('<div id="numeroRepeticoesGesto"><br><p id="mensagem">Número de repetições: ' +
							'&nbsp;&nbsp;<input type="number" id="nrRepeticoesGestoDetalhes" min="1" value="' + $nrVezes +'" readonly></p><br></div>');

				$.blockUI({ 
					message: $('#dialogNrRepeticoes'), 
					css: { 
						border: '3px solid #aed0ea', 
						padding: '5px', 
						backgroundColor: '#CCE0FF', 
						'-webkit-border-radius': '10px', 
						'-moz-border-radius': '10px', 
						color: '#000', 
						position: 'absolute',
						top: '10%'
					}
				});
	
				$('#okDialogNrRepeticoes').click(function() {	
					$('#okDialogNrRepeticoes').unbind();
			   		 $.unblockUI();  
				});
			});
			$countGestos++;
			i++;
		}
	});
}
/*************************************************
 Função para seleccionar a tab certa para navegar
**************************************************/
function setSelected(){
console.log("setSelected");
console.log("TODO - verificar opcoes 2 3 4");
	if(opcaoHistoria == 'novaHistoria' && opcaoCenas == 'novaCena'){
		return 15;
	}else if(opcaoHistoria == 'novaHistoria' && opcaoCenas == 'bibliotecaCenas'){
		return 16;
	} else if(opcaoHistoria == 'bibliotecaHistorias' && opcaoCenas == 'novaCena'){
		return 16;
	} else if(opcaoHistoria == 'bibliotecaHistorias' && opcaoCenas == 'bibliotecaCenas') {
		return 17;
	}
}
/*************************************************************
 Função que adiciona um gesto à lista de gestos seleccionados
**************************************************************/
function adicionaNovoQuestionarioListaQuestionarios(){
	$('#listaQuestionariosExistentes').append('<option value="' + $idQuestionarioSessao + '">' + $nomeQuestionarioSessao + '</option>');
	$("#listaQuestionariosExistentes").html($("#listaQuestionariosExistentes option").sort(function (a, b) {
	    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
	})); 
	$('#listaQuestionariosExistentesAux').append('<option value="' + $idQuestionarioSessao + '">' + $nomeQuestionarioSessao + '</option>');
	$("#listaQuestionariosExistentesAux").html($("#listaQuestionariosExistentesAux option").sort(function (a, b) {
	    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
	})); 
	cloneQuestionarios = $("#listaQuestionariosExistentesAux").children().clone();

	if($("#questionariosSorteable li").length == 0)
		$("#questionariosSorteable").empty();

		$("#questionariosSorteable").append('<li class="ui-state-default liQuestionarios" id="' + $countQuestionarios + 'questionarioEscolhido' + $idQuestionarioSessao + '">' + '<div id="liQuestionariostexto">' + $nomeQuestionarioSessao + '</div><div id="liQuestionariosButton"><img id="' + $countQuestionarios + 'questionarioEscolhidoButton' + $idQuestionarioSessao + '" src="../imagens/remover.png" width="35px" align="right"/><img id="' + $countQuestionarios + 'detalhesQuestionarioEscolhidoButton' + $idQuestionarioSessao + '" src="../imagens/ver.png" width="35px" align="right" style="padding-right:2px"></div></li>');

	$("#questionariosSorteable").click();

	$('#' + $countQuestionarios + 'questionarioEscolhidoButton' + $idQuestionarioSessao).bind('click', function() {
		var $count = $(this).attr('id').split('questionarioEscolhidoButton')[0];
		var $idQuestionarioRemover = $(this).attr('id').split('questionarioEscolhidoButton')[1];
		var $questionarioRemover = $count + 'questionarioEscolhido' + $idQuestionarioRemover;
		$('li#'+ $questionarioRemover).remove(); 
		$("#questionariosSorteable").click();
		if($idTipoActividadeCena.length == 0){
			$("#questionariosSorteable").append('<p> Não existem questionários seleccionados nesta cena </p>');		
		}
	});
	$('#' + $countQuestionarios + 'detalhesQuestionarioEscolhidoButton' + $idQuestionarioSessao).bind('click', function() {
		var $count = $(this).attr('id').split('detalhesQuestionarioEscolhidoButton')[0];
		var $idQuestionario = $(this).attr('id').split('detalhesQuestionarioEscolhidoButton')[1];

		getQuestionarioById($idQuestionario, "detalhesQuestionario");			
		$.blockUI({ 
			message: $('#dialogPerguntasQuestionario'), 
			css: { 
				border: '3px solid #aed0ea', 
				padding: '5px', 
				backgroundColor: '#CCE0FF', 
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px', 
				color: '#000', 
				position: 'absolute',
				top: '10%'
			}
		});

		$('#okDialogPerguntasQuestionario').click(function() {	
			$('#okDialogPerguntasQuestionario').unbind();
	   		 $.unblockUI();  
		});
	});
	$countQuestionarios++;

	$('#novoQuestionarioButton').attr("disabled", true);
}


/************************************
 Funcao que guarda os dados da cena
*************************************/
function guardaDadosCena(){
console.log("guardaDadosCena");
	var $stringIdEtiquetasCena = '';
	$.each($idEtiquetasCena, function (index, value){
		$stringIdEtiquetasCena += value + ", ";
	});

	var $stringIdTipoActividadeCena = '';
	var $stringNumeroRepeticaoGestos = '';

	if(opcaoActividade == "Gesto"){
		$.each($idTipoActividadeCena, function (index, value){
			$stringIdTipoActividadeCena += value + ", ";
		});
		$.each($nrVezesGesto, function (index, value){
			$stringNumeroRepeticaoGestos += value + ", ";
		});
	}else{
		$.each($idTipoActividadeCena, function (index, value){
			$stringIdTipoActividadeCena += value + ", ";
			$stringNumeroRepeticaoGestos += '0, ';
		});
	}
	//converte os ficheiros para mp4 e webm
	if($mimeIntroducaoCena == "video"){
		thumbnailRequest(null, 'convertFile', null, "tempFolderIntroducaoActividadeFile", null, $urlIntroducaoCena, null);
		if(!$alterarCena || $modificouIntroducao){
			//grava a introducao da cena	
			var $arrayIntro = $urlIntroducaoCena.split('.');
			var $intro = '..';
			var i = 0;
			while (i < $arrayIntro.length-1){
				if($arrayIntro[i] != '')
					$intro = $intro + $arrayIntro[i];
				i++;
			}
			$urlIntroducaoCena = $intro;
		}
		thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderIntroducaoActividadeFile", "introducaoActividade", $urlIntroducaoCena + '.mp4', 'gravar');
		$urlIntroducaoCena = thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderIntroducaoActividadeFile", "introducaoActividade", $urlIntroducaoCena + '.webm', 'gravar');
		var $arrayIntro = $urlIntroducaoCena.split('.');
		var $intro = '..';
		var i = 0;
		while (i < $arrayIntro.length-1){
			if($arrayIntro[i] != '')
				$intro = $intro + $arrayIntro[i];
			i++;
		}
		$urlIntroducaoCena = $intro;
	} else {
		//grava a introducao da cena	
		$urlIntroducaoCena = thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderIntroducaoActividadeFile", "introducaoActividade", $urlIntroducaoCena, 'gravar');
	}
	//grava o thumbnail da cena
	$imagemCena = thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderThumbsCena", "thumbsCena", $imagemCena, 'gravar');


	//converte os ficheiros para mp4 e webm
	if($mimeReforcoPositivo == "video"){
		thumbnailRequest(null, 'convertFile', null, "tempFolderReforcoPositivo", null, $urlReforcoPositivo, null);
		//grava o reforço positivo
		if(!$alterarCena || $modificouReforcoPositivo){
			var $arrayIntro = $urlReforcoPositivo.split('.');
			var $intro = '..';
			var i = 0;
			while (i < $arrayIntro.length-1){
				if($arrayIntro[i] != '')
					$intro = $intro + $arrayIntro[i];
				i++;
			}
			$urlReforcoPositivo = $intro;
		}
		thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderReforcoPositivo", "reforcoPositivo", $urlReforcoPositivo + '.mp4', 'gravar');
		$urlReforcoPositivo = thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderReforcoPositivo", "reforcoPositivo", $urlReforcoPositivo + '.webm', 'gravar');
		
		var $arrayIntro = $urlReforcoPositivo.split('.');
		var $intro = '..';
		var i = 0;
		while (i < $arrayIntro.length-1){
			if($arrayIntro[i] != '')
				$intro = $intro + $arrayIntro[i];
			i++;
		}
		$urlReforcoPositivo = $intro;
	} else {
		//grava o reforço positivo
		$urlReforcoPositivo = thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderReforcoPositivo", "reforcoPositivo", $urlReforcoPositivo, 'gravar');
	}
	//grava o thumbnail do reforço positivo
	$urlReforcoPositivoThumb = thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderThumbsReforcoPositivo", "thumbsReforcoPositivo", $urlReforcoPositivoThumb, 'gravar');

	if($urlReforcoNegativo != ''){
		//converte os ficheiros para mp4 e webm
		if($mimeReforcoNegativo == "video"){
			thumbnailRequest(null, 'convertFile', null, "tempFolderReforcoNegativo", null, $urlReforcoNegativo, null);
			//grava o reforço negativo
			if(!$alterarCena || $modificouReforcoNegativo){
				var $arrayIntro = $urlReforcoNegativo.split('.');
				var $intro = '..';
				var i = 0;
				while (i < $arrayIntro.length-1){
					if($arrayIntro[i] != '')
						$intro = $intro + $arrayIntro[i];
					i++;
				}
				$urlReforcoNegativo = $intro;
			}
			thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderReforcoNegativo", "reforcoNegativo", $urlReforcoNegativo + '.mp4', 'gravar');
			//grava o reforço negativo
			$urlReforcoNegativo = thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderReforcoNegativo", "reforcoNegativo", $urlReforcoNegativo + '.webm', 'gravar');

			var $arrayIntro = $urlReforcoNegativo.split('.');
			var $intro = '..';
			var i = 0;
			while (i < $arrayIntro.length-1){
				if($arrayIntro[i] != '')
					$intro = $intro + $arrayIntro[i];
				i++;
			}
			$urlReforcoNegativo = $intro;
		} else {
			//grava o reforço negativo
			$urlReforcoNegativo = thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderReforcoNegativo", "reforcoNegativo", $urlReforcoNegativo, 'gravar');
		}
	} 
	//grava o thumbnail do reforço negativo
console.log("$urlReforcoNegativoThumb antes: " + $urlReforcoNegativoThumb);
	$urlReforcoNegativoThumb = thumbnailRequest(null, 'saveFile', $nomeCena, "tempFolderThumbsReforcoNegativo", "thumbsReforcoNegativo", $urlReforcoNegativoThumb, 'gravar');
console.log("$urlReforcoNegativoThumb depois: " + $urlReforcoNegativoThumb);


	//adiciona a cena
console.log("urlIntroducaoCenaurlIntroducaoCenaurlIntroducaoCena: " + $urlIntroducaoCena);
console.log("urlReforcoPositivourlReforcoPositivourlReforcoPositivo: " + $urlReforcoPositivo);
console.log("urlReforcoNegativourlReforcoNegativourlReforcoNegativo: " + $urlReforcoNegativo);
	$idCena = adicionaNovaCena($imagemCena, $nomeCena, $descricaoCena, $stringIdEtiquetasCena, $urlIntroducaoCena, $mimeIntroducaoCena, $stringIdTipoActividadeCena, $stringNumeroRepeticaoGestos, opcaoActividade, $urlReforcoPositivo, $mimeReforcoPositivo, $urlReforcoPositivoThumb, $urlReforcoNegativo, $mimeReforcoNegativo, $urlReforcoNegativoThumb, $nrVezesCena, $pontuacaoCena);

	if(Number($idCena)){
		//adiciona Cena à historia
		console.log("$idCena: " + $idCena);

		$idCenasHistoria.push($idCena);
		if($pontuacaoCena == 1)
			$idCenasPontuacao.push($idCena);
		$('#terminarBibliotecaCenasButton').attr("disabled", false);
		getCenaById($idCena, "adicionaNovaCenaSeleccionadaHistoria");
		$('#seguinteCenaButton').attr('disabled', 'true');
	} else {
		alert("Não foi possível adicionar a cena");
	}
}

/**********************************************************
 Função para mostrar um popup quando se escolheu uma
 actividade antes e se pretende mudar o tipo da actividade
***********************************************************/
function dialogBoxAvisoMudarActividade(){
console.log("dialogBoxAvisoMudarActividade");
	$('#inputBoxMudarTipoActividadeAviso').empty();
	$('#inputBoxMudarTipoActividadeAviso').append('<div id="avisoTipoActividaded"><br><p id="mensagemAlternativa">Se escolher esta opção, todos os dados referentes à actividade ' + opcaoActividade + ' serão perdidos. Tem a certeza que deseja continuar? <p></div> ');

	$.blockUI({ 
		message: $('#dialogMudarTipoActividadeAviso'), 
		css: { 
			border: '3px solid #aed0ea', 
			padding: '5px', 
			backgroundColor: '#CCE0FF', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			color: '#000',
			position: 'absolute',
			top: '20%'
		}
	});
 
	$('#naoDialogMudarTipoActividadeAviso').click(function() {
		$('#naoDialogMudarTipoActividadeAviso').unbind();
		$.unblockUI();  
	}); 
}
