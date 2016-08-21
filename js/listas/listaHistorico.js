/*************************************
* Ficheiro que contem as funcoes     *
* referentes a listas.html  	     *
* Este ficheiro contem o que é 	     *
* referente as sessoes no historico  *
**************************************/
function preencheListaHistorico($xmlResponse){
    //console.log("preencheListaHistorico");
    //console.log($xmlResponse);
	//vai ler da resposta os dados das sessoes
	$($xmlResponse).find('sessao').each(function () {
		//id da sessao
		var $idSessao = $(this).find('id').map(function () {
					return $(this).text();
				}).get(0);
		//nome do terapeuta
		var $nomeTerapeuta = $(this).find('terapeuta').find('nome').text()

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
			else 
				$dataSessao =  '--';
		}

		//nome da criança
		var $nomeCriancas = '';
		$(this).find('crianca').each(function (){
			$nomeCriancas += $(this).find('nome').text() + "<br> ";
		} );

		var $tipoExercicio = $(this).find('tipoExercicio').map(function () {
						return $(this).text();
					}).get(0);
        console.log("$tipoExercicio: " + $tipoExercicio);
        if($tipoExercicio == "História"){
                $tabelaHistorico.fnAddData([
                        $nomeTerapeuta, 
                        $dataSessao, 
                        $nomeCriancas, 
                        $tipoSessao,
                        $tipoExercicio, 
                        '<div id="botoes"> <img id="duplicarSessaoHistorico' + $idSessao + '" src="../imagens/duplicar.png" width="35px"> <img id="registosSessaoHistorico' + $idSessao + '" src="../imagens/registos.png" width="35px"> </div>'
                    ]);
        } else {
            $tabelaHistorico.fnAddData([
                $nomeTerapeuta, 
                $dataSessao, 
                $nomeCriancas, 
                $tipoSessao,
                $tipoExercicio, 
                '<div id="botoes"> <img id="duplicarSessaoHistorico' + $idSessao + '" src="../imagens/duplicar.png" width="35px"></div>'
            ]);
        }

        //botao para duplicar a sessao
        $('#duplicarSessaoHistorico' + $idSessao).prop('title', 'Duplicar Sessão');
        $('#duplicarSessaoHistorico' + $idSessao).bind('click', function (){
            $idDuplicarSessao = $(this).attr('id').split('duplicarSessaoHistorico')[1];
            getSessaoHistoricoById($idDuplicarSessao, "duplicarSessao");
            inicializaDataHoraDialogDuplicarHistorico();
            $("#dialogDuplicarHistorico").dialog("open");
        });

        if($tipoSessao == "Remota")
            $('#duplicarSessaoHistorico' + $idSessao).unbind('click');

        //botao para duplicar a sessao
        $('#registosSessaoHistorico' + $idSessao).prop('title', 'Registo da Sessao');
        $('#registosSessaoHistorico' + $idSessao).bind('click', function (){
            $idRegistosSessao = $(this).attr('id').split('registosSessaoHistorico')[1];
            location.href="../registos/registosSessao.html"
            window.localStorage.setItem('registoSessao', $idRegistosSessao);
            //alert("REGISTOCRIANCA - todo " + $idRegistoCrianca);
        });
//$('#registosSessaoHistorico' + $idSessao).unbind('click');
	});
}

function trataDialogsHistorico(){
	//bind da tecla enter para o ok dialog duplicar sessao
	$('#dialogDuplicarHistorico').bind('keypress', function(e){
		  if (e.keyCode == 13) {
		  $('#okDuplicarHistoricoButton').focus();
		  $('#okDuplicarHistoricoButton').click();
	  	}
	});

	$('#dialogDuplicarHistorico').dialog({
		autoOpen: false,
		modal : true,
		width : 400,
		resizable : false,
		closeOnEscape: true,
		buttons: [{
				//botão OK
				text: "OK",
				id: "okDuplicarHistoricoButton",
				click: function(){
					if($('#dataSessaoHistorico').val() != '' && $('#horaSessaoHistorico').val() != ''){
						//verifica validade da data e hora
						//Se hora for menor que o hora corrente entao a data tem que ser superior à corrente
						if($('#horaSessaoHistorico').val() <= getCurrentTime() && $('#dataSessaoHistorico').val() == getCurrentDate()){
							alert('A data e/ou hora da sessão não estão correctas.');
						
						} else{
                            var $dataHoraSessaoDuplicar = $('#dataSessaoHistorico').val() + ' ' + $('#horaSessaoHistorico').val();
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
}

function preencheHistoricoDuplicar($xmlResponse){
console.log("preencheSessaoDuplicar");
console.log($xmlResponse);
    $('#duplicarHistoricoDiv').empty();
    
	//id do terapeuta
	$idTerapeutaSessaoDuplicar = $($xmlResponse).find('sessao').find('terapeuta').find('id').map(function () {
					return $(this).text();
				}).get(0);

	var $nomeTerapeutaSessaoDuplicar = $($xmlResponse).find('sessao').find('terapeuta').find('nome').text();
	$('#terapeutaDuplicarSessaoHistorico').val($nomeTerapeutaSessaoDuplicar);

	//nome da criança
	$idCriancasDuplicar = '';
	var $nomeCriancas = '';
	var $countCriancas = 0;
	$($xmlResponse).find('sessao').find('crianca').each(function (){
		$idCriancasDuplicar += $(this).find('id').text() + ', ';
		$nomeCriancas += $(this).find('nome').text() + "\n";
		$countCriancas++;
	});
	$('textarea[id=criancaDuplicarSessaoHistorico]').attr('rows', $countCriancas);
	$('textarea[id=criancaDuplicarSessaoHistorico]').val($nomeCriancas);


    $tipoSessaoDuplicar =  $($xmlResponse).find('sessao').find('tipoSessao').text();
    
    if($tipoSessaoDuplicar == "Presencial"){
        //data e hora da sessao
        $('#dataSessaoHistorico').val('');
        $('#horaSessaoHistorico').val('');
        $("#sessaoPresencialHistoricoDiv").show();
        $("#sessaoRemotaHistoricoDiv").hide();
    } else { //$tipoSessaoDuplicar == "Remota"
        $('#dataInicioHistorico').val('');
        $('#dataFimHistorico').val('');
        $("#sessaoRemotaHistoricoDiv").show();
        $("#sessaoPresencialHistoricoDiv").hide();
    }
    
	$tipoExercicioDuplicar = $($xmlResponse).find('sessao').find('tipoExercicio').map(function () {
						return $(this).text();
					}).get(0);

	$('#duplicarHistoricoDiv').append('<strong>Tipo de Exercício:</strong>');
	$('#duplicarHistoricoDiv').append('<input type="text" id="tipoExercicioDuplicarSessao" value="' + $tipoExercicioDuplicar + '" readonly><br><br>');
    
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

function inicializaDataHoraDialogDuplicarHistorico(){
console.log("inicializaDataHoraDialogDuplicar");
	//Calendario para a data da sessao
    	$("#dataSessaoHistorico").datepicker({
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
	$('#dataSessaoHistorico').click(function (){
console.log('#dataSessaoHistorico');
		$('#dataSessaoHistorico').val(getCurrentDate());
	});

	//inicializa o timeSelector para escolher as horas
	$('#horaSessaoHistorico').timeselector();

	//horas da sessão
	$('#horaSessaoHistorico').click(function (){
console.log('#horaSessaoHistorico');
		$('#horaSessaoHistorico').val(getCurrentTime());
	});	
}
