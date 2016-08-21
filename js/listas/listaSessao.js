var $idSessaoSelected = 0;

//variaveis auxiliares para a duplicação de sessões
var $idTerapeutaSessaoDuplicar = 0;
var $idCriancasDuplicar = '';
var $tipoSessaoDuplicar = '';
var $tipoExercicioDuplicar = '';
var $idExercicioDuplicar = '';
var $pontuacaoDuplicar = '';
var $idCenasPontuacaoSessaoDuplicar = '';

function preencheListaSessao($xmlResponse){
	//terapeuta que fez login
	var $idTerapeutaLogin = window.localStorage.getItem('idTerapeutaLogin');

	//vai ler da resposta os dados das sessoes
	$($xmlResponse).find('sessao').each(function () {
		//id da sessao
		var $idSessao = $(this).find('id').map(function () {
					return $(this).text();
				}).get(0);
		//nome e id do terapeuta
		var $nomeTerapeuta = $(this).find('terapeuta').find('nome').text();
		var $idTerapeutaSessao = $(this).find('terapeuta').find('id').map(function () {
						return $(this).text();
					}).get(0);
		//tipo de Sessao
		var $tipoSessao = $(this).find('tipoSessao').map(function () {
						return $(this).text();
					}).get(0);

		//data da sessão
		var dataSessao = '';
		if($tipoSessao == 'Presencial'){
			$dataSessao = $(this).find('dataHora').text();
		} else {
			var $dataInicio = $(this).find('dataInicio').text();
			var $dataFim = $(this).find('dataFim').text();
			if($dataInicio != '' && $dataFim != '')
				$dataSessao =  $dataInicio + ' - ' + $dataFim;
			else if($dataInicio != '' && $dataFim == '')
				$dataSessao =  $dataInicio;
			else {
				//data corrente
				$dataSessao = getCurrentDate();
			}
		}
//console.log("$dataSessao: " + $dataSessao);

		//nome da criança
		var $nomeCriancas = '';
		$(this).find('crianca').each(function (){
			$nomeCriancas += $(this).find('nome').text() + "<br> ";
		} );

		var $tipoExercicio = $(this).find('tipoExercicio').map(function () {
						return $(this).text();
					}).get(0);

		if($idTerapeutaSessao == $idTerapeutaLogin){
			$tabelaSessoes.fnAddData([
					$nomeTerapeuta, 
					$dataSessao, 
					$nomeCriancas, 
					$tipoSessao,
					$tipoExercicio, 
					'<div id="botoes"> <img id="playSessao' + $idSessao + '" src="../imagens/play.png" width="35px"> <img id="editarSessao' + $idSessao + '" src="../imagens/editar.png" width="35px"> <img id="removerSessao' + $idSessao + '"  src="../imagens/remover.png" width="35px"> <img id="duplicarSessao' + $idSessao + '" src="../imagens/duplicar.png" width="35px"> </div>'
			 	]);

				//botão para fazer play da sessao
				$('#playSessao' + $idSessao).prop('title', 'Play');
				$('#playSessao' + $idSessao).bind('click', function (){
					$idSessaoSelected = $(this).attr('id').split('playSessao')[1];
					window.localStorage.setItem('playIdSessao', $idSessaoSelected);
					location.href = "../players/iniciaPlaySessao.html";
				});
			
				//botão para editar a sessao
				$('#editarSessao' + $idSessao).prop('title', 'Modificar');
				$('#editarSessao' + $idSessao).bind('click', function (){
					$idSessaoSelected = $(this).attr('id').split('editarSessao')[1];
					window.localStorage.setItem('modoSessao', "editarSessao");
					window.localStorage.setItem('idSessao', $idSessaoSelected);
					location.href="../sessao/dadosSessao.html";
				});
//$('#editarSessao' + $idSessao).unbind('click');
				//botao para remover a sessao
				$('#removerSessao' + $idSessao).prop('title', 'Remover Sessão');
				$('#removerSessao' + $idSessao).bind('click', function (){
					$idSessaoSelected = $(this).attr('id').split('removerSessao')[1];
					$("#dialogRemoverSessao").dialog("open");
				});

				//botao para duplicar a sessao
				$('#duplicarSessao' + $idSessao).prop('title', 'Duplicar Sessão');
				$('#duplicarSessao' + $idSessao).bind('click', function (){
					console.log("duplicarSessao");
					$idSessaoSelected = $(this).attr('id').split('duplicarSessao')[1];
                    console.log("idSessaoSelected: " + $idSessaoSelected);
					getSessaoById($idSessaoSelected, "duplicarSessao");
					inicializaDataHoraDialogDuplicar();
					$("#dialogDuplicarSessao").dialog("open");
					//alert("REGISTOCRIANCA - todo " + $idRegistoCrianca);
				});
                if($tipoSessao == "Remota")
                    $('#duplicarSessao' + $idSessao).unbind('click');
		} else {
			$tabelaSessoes.fnAddData([
					$nomeTerapeuta, 
					$dataSessao, 
					$nomeCriancas, 
					$tipoSessao,
					$tipoExercicio, 
					'<div id="botoes"> <img id="duplicarSessao' + $idSessao + '" src="../imagens/duplicar.png" width="35px"> </div>'
			 	]);
				//botao para duplicar a sessao
				$('#duplicarSessao' + $idSessao).prop('title', 'Duplicar Sessão');
				$('#duplicarSessao' + $idSessao).bind('click', function (){
					$idSessaoSelected = $(this).attr('id').split('duplicarSessao')[1];
					getSessaoById($idSessaoSelected, "duplicarSessao");
					inicializaDataHoraDialogDuplicar();
					$("#dialogDuplicarSessao").dialog("open");
				});
            if($tipoSessao == "Remota")
                $('#duplicarSessao' + $idSessao).unbind('click');
		}
	});

}

/************************************************
 Funcao que trata das funcionalidades dos botoes
*************************************************/
function setButtonsListaSessoes(){
	//botão logout
	$('#logoutButton').bind('click', function () {
		window.localStorage.setItem('idTerapeutaLogin', null);
		location.href='../loginSessao.html';
	});

	//botão criar nova sessão
	$('#adicionarSessaoButton').bind('click', function () {
		window.localStorage.setItem('modoSessao', 'novaSessao');
		location.href='../sessao/dadosSessao.html';
	});
}

function trataDialogsSessao(){
	//bind da tecla enter para o ok dialog duplicar sessao
	$('#dialogDuplicarSessao').bind('keypress', function(e){
		  if (e.keyCode == 13) {
		  $('#okDuplicarSessaoButton').focus();
		  $('#okDuplicarSessaoButton').click();
	  	}
	});

	$('#dialogDuplicarSessao').dialog({
		autoOpen: false,
		modal : true,
		width : 400,
		resizable : false,
		closeOnEscape: true,
		buttons: [{
				//botão OK
				text: "OK",
				id: "okDuplicarSessaoButton",
				click: function(){
					if($('#dataSessao').val() != '' && $('#horaSessao').val() != ''){
						//verifica validade da data e hora
						//Se hora for menor que o hora corrente entao a data tem que ser superior à corrente
						if($('#horaSessao').val() <= getCurrentTime() && $('#dataSessao').val() == getCurrentDate()){
							alert('A data e/ou hora da sessão não estão correctas.');
						
						} else{
							var $dataHoraSessaoDuplicar = $('#dataSessao').val() + ' ' + $('#horaSessao').val();
                            switch($tipoExercicioDuplicar){
                                case "História":
                                    if($tipoSessaoDuplicar == "Presencial"){
                                        var $idNovaSessao = adicionaNovaSessao($idTerapeutaSessaoDuplicar, $dataHoraSessaoDuplicar, '', '', $idCriancasDuplicar, $tipoSessaoDuplicar, $tipoExercicioDuplicar, $idExercicioDuplicar, $idCenasPontuacaoSessaoDuplicar);
                                    }
                                    break;
                                case "CoDraw":
                                    if($tipoSessaoDuplicar == "Presencial"){
                                        var $idNovaSessao = adicionaNovaSessao($idTerapeutaSessaoDuplicar, $dataHoraSessaoDuplicar, '', '', $idCriancasDuplicar, $tipoSessaoDuplicar, $tipoExercicioDuplicar, 0, '');
                                    }
                                        break;
                            }
                            //se inseriu retorna o id, 
							//se não inseriu, retorna mensagem de erro
							if(Number($idNovaSessao)){
								$(this).dialog("close");
								location.href='../listas/listas.html';
								window.localStorage.setItem('listaTabsSelected', 0);
							} else {
								alert('Não foi possível criar a sessao.');
							}
						}
					} else {
						alert('Tem que inserir a data e a hora.');
					}
				}
			},
				//botão Cancelar
			{
				text: "Cancelar",
				click: function() { 
					$(this).dialog("close");
				}
		}]
	});

	//bind da tecla enter para o ok dialog duplicar sessao
	$('#dialogRemoverSessao').bind('keypress', function(e){
		  if (e.keyCode == 13) {
		  $('#okRemoverSessaoButton').focus();
		  $('#okRemoverSessaoButton').click();
	  	}
	});
	
	$('#dialogRemoverSessao').dialog({
		autoOpen: false,
		modal : true,
		width : 600,
		resizable : true,
		closeOnEscape: true,
		buttons: [{
				//botão OK
				text: "OK",
				id: "okRemoverSessaoButton",
				click: function(){
					var $removeu = removeSessao($idSessaoSelected);
					$(this).dialog("close");
					alert($removeu);
					location.reload();
				}
			},
				//botão Cancelar
			{
				text: "Cancelar",
				click: function() { 
					$(this).dialog("close");
				}
		}]
	});
}

function preencheSessaoDuplicar($xmlResponse){
console.log("preencheSessaoDuplicar");
console.log($xmlResponse);
	$('#duplicarSessaoDiv').empty();
	//id do terapeuta
	$idTerapeutaSessaoDuplicar = $($xmlResponse).find('sessao').find('terapeuta').find('id').map(function () {
					return $(this).text();
				}).get(0);

	var $nomeTerapeutaSessaoDuplicar = $($xmlResponse).find('sessao').find('terapeuta').find('nome').text();
	$('#terapeutaDuplicarSessao').val($nomeTerapeutaSessaoDuplicar);

	//nomes das crianças
	$idCriancasDuplicar = '';
	var $nomeCriancas = '';
	var $countCriancas = 0;
	$($xmlResponse).find('sessao').find('crianca').each(function (){
		$idCriancasDuplicar += $(this).find('id').text() + ', ';
		$nomeCriancas += $(this).find('nome').text() + "\n";
		$countCriancas++;
	});
	$('textarea[id=criancaDuplicarSessao]').attr('rows', $countCriancas);
	$('textarea[id=criancaDuplicarSessao]').val($nomeCriancas);

    $tipoSessaoDuplicar =  $($xmlResponse).find('sessao').find('tipoSessao').text();
    
    if($tipoSessaoDuplicar == "Presencial"){
        //data e hora da sessao
        $('#dataSessao').val('');
        $('#horaSessao').val('');
        $("#sessaoPresencialDiv").show();
        $("#sessaoRemotaDiv").hide();
    } else { //$tipoSessaoDuplicar == "Remota"
        $('#dataInicio').val('');
        $('#dataFim').val('');
        $("#sessaoRemotaDiv").show();
        $("#sessaoPresencialDiv").hide();
    }

	$tipoExercicioDuplicar = $($xmlResponse).find('sessao').find('tipoExercicio').map(function () {
						return $(this).text();
					}).get(0);

	$('#duplicarSessaoDiv').append('<strong>Tipo de Exercício:</strong>');
	$('#duplicarSessaoDiv').append('<input type="text" id="tipoExercicioDuplicarSessao" value="' + $tipoExercicioDuplicar + '" readonly><br><br>');
	
	switch($tipoExercicioDuplicar){
		case 'História':
            $idCenasPontuacaoSessaoDuplicar = $($xmlResponse).find('sessao').find('idCenasPontuacao').text();
            
			//id da história
			$idExercicioDuplicar = $($xmlResponse).find('sessao').find('historia').find('id').map(function () {
							return $(this).text();
						}).get(0);
			var $nomeHistoriaDuplicar = $($xmlResponse).find('sessao').find('historia').find('nome').map(function () {
							return $(this).text();
						}).get(0);
			$('#duplicarSessaoDiv').append('<strong>Nome da História:</strong>');
			$('#duplicarSessaoDiv').append('<input type="text" id="exercicioDuplicarSessao" value="' + $nomeHistoriaDuplicar + '" readonly>');
		break;
	}
}

function inicializaDataHoraDialogDuplicar(){
console.log("inicializaDataHoraDialogDuplicar");
	//Calendario para a data da sessao - case Presencial
    $("#dataSessao").datepicker({
		changeYear: true,
		changeMonth: true,
		dateFormat: "yy-mm-dd",
		minDate: 0,
		constrainInput: true,
		firstDay: 1, //dia da semana começa à segunda
		monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dez" ],
		dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
		yearRange: "-0:+100"
	});
	//data da sessão
	$('#dataSessao').click(function (){
console.log('#dataSessao');
		$('#dataSessao').val(getCurrentDate());
	});

	//inicializa o timeSelector para escolher as horas
	$('#horaSessao').timeselector();

	//horas da sessão - case Presencial
	$('#horaSessao').click(function (){
console.log('#horaSessao');
		$('#horaSessao').val(getCurrentTime());
	});	
    
    //Calendario para a data de inicio - case Remota
    $("#dataInicio").datepicker({
        changeYear: true,
        changeMonth: true,
        dateFormat: "yy-mm-dd",
        minDate: 0,
        constrainInput: true,
        firstDay: 1, //dia da semana começa à segunda
        monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dez" ],
        dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        yearRange: "-0:+100"
    });
    //data de inicio
    $('#dataInicio').click(function (){
        console.log('#dataInicio');
        $('#dataInicio').val(getCurrentDate());
    });
    
    //Calendario para a data de fim - case Remota
    $("#dataFim").datepicker({
        changeYear: true,
        changeMonth: true,
        dateFormat: "yy-mm-dd",
        minDate: 0,
        constrainInput: true,
        firstDay: 1, //dia da semana começa à segunda
        monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dez" ],
        dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        yearRange: "-0:+100"
    });
    //data de fim
    $('#dataFim').click(function (){
        console.log('#dataFim');
        $('#dataFim').val(getCurrentDate());
    });
}
