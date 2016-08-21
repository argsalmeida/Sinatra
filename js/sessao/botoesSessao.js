/**************************************************
 * Ficheiro com as funções associadas aos botões  *
 * de dadosSessao.html 				  *
/**************************************************/

/**********************************************
 Função referente à tab "Escolher Terapeuta"
***********************************************/
function botoesDadosSessaoTerapeuta(){
	$('#listaTerapeutasSessao').val($idTerapeutaSessao);
	$('#seguinteTerapeutaButton').attr("disabled", false);

	//botão cancelar
	$('#cancelarTerapeutaButton').click(function(){
		location.href='../listas/listas.html';
	});
	//botão seguinte
	$('#seguinteTerapeutaButton').click(function(){
		aux = 1; //força o seguinte, para não haver bugs
//aux = 24;
console.log("$idTerapeutaSessao: " + $idTerapeutaSessao);
		bindButtonSeguinte();
	});

	//lista de terapeutas
	//quando é seleccionado um terapeuta o botão seguinte fica enable
	//e guarda o id do terapeuta
	$('#listaTerapeutasSessao').change(function (){
		if($('#listaTerapeutasSessao option:selected').val() != 0){
			$('#seguinteTerapeutaButton').attr("disabled", false);
			$idTerapeutaSessao = $('#listaTerapeutasSessao option:selected').val();
		}
//DEBUG
console.log("$idTerapeutaSessao: " + $idTerapeutaSessao);
	});
}

/**********************************************
 Função referente à tab "Escolher Criancas"
***********************************************/
function botoesDadosSessaoCriancas(){
console.log("botoesDadosSessaoCriancas");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorCriancaButton').parent().parent().parent().attr('id'));
	//caso editar sessao
	if($modoSessao == "editarSessao"){
		$.each($idCriancasSessao, function(index, id){
			$('#listaCriancasSessao').append('<option value="' + id + '">' + $nomeCriancasSessao[index] + '</option>');
			$("#listaCriancasSessao").html($("#listaCriancasSessao option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			})); 
			//auxiliares para o filtro
			$("#listaCriancasExistentes option[value=" + id + "]").remove();
			$("#listaCriancasExistentesAux option[value=" + id + "]").remove();
			cloneEtiquetasHistorias = $("#listaCriancasExistentesAux").children().clone();

			$('#seguinteCriancaButton').attr("disabled", false);
		});
	}

	//botão anterior
	$('#anteriorCriancaButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteCriancaButton').click(function(){
		aux = 2; //força o seguinte, para não haver bugs
		bindButtonSeguinte();				
	});

	//filtro para procurar na lista de crianças existentes
	$('#listaCriancasExistentes').selectFilter({
		name: 'escolheCriancas'
        });

	//clone da lista de crianças auxiliar para serem mostrados todas as crianças
	//existentes, sem esta lista auxiliar, ao procurar depois não recuperava a lista de crianças
	//todas as operações que forem feitas sobre '#listaCriancasExistentes' também
	//terão de ser feitas sobre esta lista '#listaCriancasExistentesAux'
	cloneCriancas = $("#listaCriancasExistentesAux").children().clone();

	//botão que selecciona todas as crianças na lista de crianças existentes
	$('#seleccionarTudoListaCriancasExistentesButton').bind('click', function () {
		$('#listaCriancasExistentes option').prop('selected', true);
	});

	//botão que remove a selecção de todas as crianças na lista de crianças existentes
	$('#removerTudoListaCriancasExistentesButton').bind('click', function () {
		$('#listaCriancasExistentes option').prop('selected', false);
	});

	//botão que selecciona todas as crianças na lista de crianças na sessão
	$('#seleccionarTudoListaCriancasSessaoButton').bind('click', function () {
		$('#listaCriancasSessao option').prop('selected', true);
	});

	//botão que remove a selecção de todas as crianças na lista de crianças na sessão
	$('#removerTudoListaCriancaSessaoButton').bind('click', function () {
		$('#listaCriancasSessao option').prop('selected', false);
	});

	//botão que adiciona as crianças seleccionadas à lista de sessão
	$('#adicionarCriancaListaSessaoButton').bind('click', function () {
		//para cada criança seleccionada na lista de crianças existentes, é adicionada na lista de crianças da sessao
		//e apagada da lista de crianças existentes e sua auxiliar
		$("#listaCriancasExistentes option:selected").each(function () {
			$('#listaCriancasSessao').append('<option value="' + Number($(this).val()) + '">' + $(this).text() + '</option>');
			//para ordenar as crianças por nome
			$("#listaCriancasSessao").html($("#listaCriancasSessao option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			})); 
			//remove da lista de crianças existentes e sua auxiliar
			$("#listaCriancasExistentes option[value=" + Number($(this).val()) + "]").remove();
			$("#listaCriancasExistentesAux option[value=" + Number($(this).val()) + "]").remove();
			//actualiza o clone da lista de crianças
			cloneCriancas = $("#listaCriancasExistentesAux").children().clone();
		});
		
		//se houver crianças na lista de crianças da sessão, então existem condições para continuar com
		//a criação da sessão
		if($('#listaCriancasSessao option').size() != 0){
			$('#seguinteCriancaButton').attr("disabled", false);
		} else {
			$('#seguinteCriancaButton').attr("disabled", true);
		}
		//para actualizar o estado da lista de crianças da sessão
		$("#listaCriancasSessao").click();
	});
	//duplo clique numa criança para a adicionar à sessão
	$('#listaCriancasExistentes').dblclick(function(){
		$('#adicionarCriancaListaSessaoButton').click();
	});

	//botão que remove as crianças seleccionadas da lista de sessão
	$('#removerCriancaListaSessaoButton').bind('click', function () {
		//para cada criança seleccionada é removida da lista de crianças da sessão e adicionada 
		//à lista de crianças existentes e sua auxiliar
		$("#listaCriancasSessao option:selected").each(function () {
			$('#listaCriancasExistentes').append('<option value="' + Number($(this).val()) + '">' + $(this).text() + '</option>');
			//ordena as crianças pelo nome
			$("#listaCriancasExistentes").html($("#listaCriancasExistentes option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			}));
			//lista auxiliar
			$('#listaCriancasExistentesAux').append('<option value="' + Number($(this).val()) + '">' + $(this).text() + '</option>');
			$("#listaCriancasExistentesAux").html($("#listaCriancasExistentesAux option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			})); 
			//actualiza o clone
			cloneCriancas = $("#listaCriancasExistentesAux").children().clone();
 
			//remove da lista de crianças na sessão
			$("#listaCriancasSessao option[value=" + Number($(this).val()) + "]").remove();
		});

		//se houver crianças na lista de crianças da sessão, então existem condições para continuar com
		//a criação da sessão
		if($('#listaCriancasSessao option').size() != 0){
			$('#seguinteCriancaButton').attr("disabled", false);
		} else {
			$('#seguinteCriancaButton').attr("disabled", true);
		}
		$("#listaCriancasSessao").click();
	});
	
	//duplo clique numa criança para a remover da sessão
	$('#listaCriancasSessao').dblclick(function(){
		$('#removerCriancaListaSessaoButton').click();
	});

	//actualiza os dados da sessão no que diz respeito as crianças
	$("#listaCriancasSessao").click(function () {
		$idCriancasSessao = [];
		$("#listaCriancasSessao option").each(function(){
			$idCriancasSessao.push(Number($(this).val()));
		});
//DEBUG
console.log("$idCriancasSessao: " + $idCriancasSessao);
	});
}

/**********************************************
 Função referente à tab "Escolher Tipo Sessão"
***********************************************/
function botoesDadosSessaoTipoSessao(){
console.log("botoesDadosSessaoTipoSessao");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorTipoSessaoButton').parent().parent().parent().attr('id'));
	//caso editar sessao
	if($modoSessao == "editarSessao"){
		//alert("botoesDadosSessaoTipoSessao");
		if($tipoSessao == 'Presencial')	{
			$tipoSessao = 'Presencial';
			$('#seguinteTipoSessaoButton').attr("disabled", false);
			$('#sessaoRemotaButton').css('border', '2px outset buttonface');
			$('#sessaoPresencialButton').css('border', '2px outset #0191d8');
			$selected = 1;
			aux = 3; //força o seguinte, para não haver bugs
			bindButtonSeguinte();	
		} else {
			$tipoSessao = 'Remota';
			$('#seguinteTipoSessaoButton').attr("disabled", false);
			$('#sessaoPresencialButton').css('border', '2px outset buttonface');
			$('#sessaoRemotaButton').css('border', '2px outset #0191d8');
			$selected = 1;
			aux = 4; //força o seguinte, para não haver bugs
			bindButtonSeguinte();	
		}
	}
	//botão anterior
	$('#anteriorTipoSessaoButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteTipoSessaoButton').click(function(){

		if($tipoSessao == 'Presencial')		
			aux = 3; //força o seguinte, para não haver bugs
		else
			aux = 4; //força o seguinte, para não haver bugs

		bindButtonSeguinte();				
	});

	//botao sessao presencial
	$('#sessaoPresencialButton').click(function(){
		removeTabs();
		$tipoSessao = 'Presencial';
		$('#seguinteTipoSessaoButton').attr("disabled", false);
		$('#sessaoRemotaButton').css('border', '2px outset buttonface');
		$('#sessaoPresencialButton').css('border', '2px outset #0191d8');
		aux = 3;
		bindButtonSeguinte();	
console.log("$tipoSessao: " + $tipoSessao);
	});
	//botao sessao remota
	$('#sessaoRemotaButton').click(function(){
		$tipoSessao = 'Remota';
		$('#seguinteTipoSessaoButton').attr("disabled", false);
		$('#sessaoPresencialButton').css('border', '2px outset buttonface');
		$('#sessaoRemotaButton').css('border', '2px outset #0191d8');
		removeTabs();
		aux = 4;
		bindButtonSeguinte();	
console.log("$tipoSessao: " + $tipoSessao);
	});

}

/**********************************************
 Função referente à tab "Escolher Data/Hora"
***********************************************/
function botoesDadosSessaoDataHora(){
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorDataHoraButton').parent().parent().parent().attr('id'));
	//caso editar sessao
	if($modoSessao == "editarSessao"){
		$('#dataSessao').val($dataSessao);
		$('#horaSessao').val($horaSessao);
		$('#seguinteDataHoraButton').attr("disabled", false);
	}
	//botão anterior
	$('#anteriorDataHoraButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteDataHoraButton').click(function(){	
		if($horaSessao < getCurrentTime() && $dataSessao < getCurrentDate()){
			$.blockUI({ 
				message: $('#dialogDataIncorrecta'), 
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
			$('#okDialogDataIncorrecta').click(function() { 
				$("#dataSessao").focus();
				$('#okDialogDataIncorrecta').unbind();
				$.unblockUI();  
			});
		} else {
			aux = 5; //força o seguinte, para não haver bugs
			bindButtonSeguinte();	
			if($modoSessao == "editarSessao"){			
				aux = 12; //biblioteca historias
				bindButtonSeguinte();	
			}
		}
	});

	//Calendario para a data da sessao
    	$("#dataSessao").datepicker({
		changeYear: true,
		changeMonth: true,
		dateFormat: "yy-mm-dd",
		minDate: 0,
		constrainInput: true,
		firstDay: 1, //dia da semana começa à segunda
		monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dez" ],
		dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
		yearRange: "-0:+100"
	});
	//inicializa o timeSelector para escolher as horas
	$('#horaSessao').timeselector();

	//data da sessão
	$('#dataSessao').click(function (){
		$('#dataSessao').val(getCurrentDate());
        $dataSessao = $('#dataSessao').val();
		$('.timeselector').click();
	});

	$('#dataSessao').change(function (){
		//só quando houver valores na data e na hora é que estão cumpridos os requisitos para continuar
		if($('#dataSessao').val() != '' && $('#horaSessao').val() != ''){
			if($('#horaSessao').val() <= getCurrentTime()){
				if($('#dataSessao').val() == getCurrentDate()){
					$('#seguinteDataHoraButton').attr("disabled", true);
				} else {
					$('#seguinteDataHoraButton').attr("disabled", false);
				}
			} else {
				$('#seguinteDataHoraButton').attr("disabled", false);
			}
		} else {
			$('#seguinteDataHoraButton').attr("disabled", true);
		}
		$dataSessao = $('#dataSessao').val();
//DEBUG
console.log("$dataSessao: " + $dataSessao);
	});
	
	//horas da sessão
	$('#horaSessao').click(function (){
		$('#horaSessao').val(getCurrentTime());
		$('.timeselector').click();
	});
	$('.timeselector').click(function (){ 
		//só quando houver valores na data e na hora é que estão cumpridos os requisitos para continuar
		if($('#horaSessao').val() != '' && $('#dataSessao').val() != ''){
			//se a data for hoje, tem que se evitar marcar sessões para horas que já passaram
			if($('#dataSessao').val() == getCurrentDate()){
				if($('#horaSessao').val() <= getCurrentTime()){
					$('#seguinteDataHoraButton').attr("disabled", true);
				} else {
					$('#seguinteDataHoraButton').attr("disabled", false);
				}
			} else {
				$('#seguinteDataHoraButton').attr("disabled", false);
			}
		} else {
			$('#seguinteDataHoraButton').attr("disabled", true);
		}
		$horaSessao = $('#horaSessao').val();
console.log("$horaSessao: " + $horaSessao);
	});
}

/**************************************************
 Função referente à tab "Escolher Intervalo Datas"
***************************************************/
function botoesDadosSessaoIntervaloDatas(){
console.log("botoesDadosSessaoIntervaloDatas");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorIntervaloDatasButton').parent().parent().parent().attr('id'));
	//caso editar sessao
	if($modoSessao == "editarSessao"){
		//alert("botoesDadosSessaoIntervaloDatas");
		
	}
	//botão anterior
	$('#anteriorIntervaloDatasButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteIntervaloDatasButton').click(function(){
			//no caso de se inserir uma data de fim e nao uma data de inicio
			if($dataFimSessao != '' && $dataInicioSessao == ''){
				$.blockUI({ 
					message: $('#dialogDataInicioVazia'), 
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
				$('#okDialogDataInicioVazia').click(function() { 
					$("#dataInicioSessao").focus();
					$('#okDialogDataInicioVazia').unbind();
					$.unblockUI();  
				});
			} else if($dataFimSessao != '' && $dataFimSessao < $dataInicioSessao){ //no caso de se inserir uma data de fim inferior à data de início
				$.blockUI({ 
					message: $('#dialogDataFimMenor'), 
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
				$('#okDialogDataFimMenor').click(function() { 
					$("#dataFimSessao").focus();
					$('#okDialogDataFimMenor').unbind();
					$.unblockUI();  
				});
			} else if($dataInicioSessao != '' && $dataInicioSessao < getCurrentDate()){ 
				$.blockUI({ 
					message: $('#dialogDataIncorrecta'), 
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
				$('#okDialogDataIncorrecta').click(function() { 
					$("#dataInicioSessao").focus();
					$('#okDialogDataIncorrecta').unbind();
					$.unblockUI();  
				});
			} else {//if($dataFimSessao >= $dataInicioSessao){
				aux = 5;
				bindButtonSeguinte();				
			}
	});

	//Calendario para a data de inicio
    	$("#dataInicioSessao").datepicker({
		changeYear: true,
		changeMonth: true,
		dateFormat: "yy-mm-dd",
		minDate: 0,
		constrainInput: true,
		firstDay: 1, //dia da semana começa à segunda
		monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dez" ],
		dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
		yearRange: "-0:+100"
	});

	//Calendario para a data de fim
    	$("#dataFimSessao").datepicker({
		changeYear: true,
		changeMonth: true,
		dateFormat: "yy-mm-dd",
		minDate: 0,
		constrainInput: true,
		firstDay: 1, //dia da semana começa à segunda
		monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dez" ],
		dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
		yearRange: "-0:+100"
	});

	$('#dataInicioSessao').change(function (){
		$dataInicioSessao = $('#dataInicioSessao').val();
//DEBUG
console.log("$dataInicioSessao: " + $dataInicioSessao);
	});

	$('#dataFimSessao').change(function (){
		$dataFimSessao = $('#dataFimSessao').val();
//DEBUG
console.log("$dataFimSessao: " + $dataFimSessao);
	});
	
}

/*************************************************
 Função referente à tab "Tipo de Exercício"
**************************************************/
function botoesDadosSessaoTipoExercicio(){
console.log("botoesDadosSessaoTipoExercicio");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorTipoExercicioButton').parent().parent().parent().attr('id'));
	//caso editar sessao
	if($modoSessao == "editarSessao"){
		if($tipoExercicioSessao == "História"){
			removeTabs();
			$('#exercicioCoDrawButton').css('border', '2px outset buttonface');
			$('#exercicioGateauButton').css('border', '2px outset buttonface');
			$('#exercicioHistoriaButton').css('border', '2px outset #0191d8');
			$('#seguinteTipoExercicioButton').attr("disabled", false);
			$tipoExercicioSessao = 'História';
			aux = 7;
			bindButtonSeguinte();
		} else { //$tipoExercicio == "CoDraw"
			removeTabs();
			$('#exercicioHistoriaButton').css('border', '2px outset buttonface');
			$('#exercicioGateauButton').css('border', '2px outset buttonface');
			$('#exercicioCoDrawButton').css('border', '2px outset #0191d8');
			$tipoExercicioSessao = 'CoDraw';
			$('#terminarTipoExercicioButton').show();
		}
	}
	//botão anterior
	$('#anteriorTipoExercicioButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteTipoExercicioButton').click(function(){
		if($tipoExercicioSessao == 'História'){
			aux = 7;
			bindButtonSeguinte();
		} else { //$tipoExercicio = 'Gateau'
			aux = 6;
			bindButtonSeguinte();
		}
//		aux = 5;
//		bindButtonSeguinte();				
	});

	//escolher historia
	$('#exercicioHistoriaButton').click(function(){
		removeTabs();
		$('#exercicioCoDrawButton').css('border', '2px outset buttonface');
		$('#exercicioGateauButton').css('border', '2px outset buttonface');
		$('#exercicioHistoriaButton').css('border', '2px outset #0191d8');
		$('#seguinteTipoExercicioButton').attr("disabled", false);
		$tipoExercicioSessao = 'História';
		aux = 7;
		bindButtonSeguinte();
	});

	//escolher CoDraw
	$('#exercicioCoDrawButton').click(function(){
		removeTabs();
		$('#exercicioHistoriaButton').css('border', '2px outset buttonface');
		$('#exercicioGateauButton').css('border', '2px outset buttonface');
		$('#exercicioCoDrawButton').css('border', '2px outset #0191d8');
		$tipoExercicioSessao = 'CoDraw';
		$('#terminarTipoExercicioButton').show();
	});

	//escolher Gateau
	$('#exercicioGateauButton').click(function(){
		removeTabs();
		$('#exercicioCoDrawButton').css('border', '2px outset buttonface');
		$('#exercicioHistoriaButton').css('border', '2px outset buttonface');
		$('#exercicioGateauButton').css('border', '2px outset #0191d8');
		$('#seguinteTipoExercicioButton').attr("disabled", false);
		$tipoExercicioSessao = 'Gateau';
		aux = 6;
		bindButtonSeguinte();
	});

	//terminar sessão com os dados CoDraw
	$('#terminarTipoExercicioButton').click(function(){
		var $dataHoraSessao = '';
		if($tipoSessao == 'Presencial'){
			$dataHoraSessao = $dataSessao + " " + $horaSessao;
		} else {
			$dataHoraSessao = '';
		}

console.log("dataHoraSessao: " + $dataHoraSessao);
		$idSessao = adicionaNovaSessao($idTerapeutaSessao, $dataHoraSessao, $dataInicioSessao, $dataFimSessao, $idCriancasSessao, $tipoSessao, $tipoExercicioSessao , 0 , '');
		location.href='../listas/listas.html';
	});
}

/********************************
 Função referente à tab "Gateau"
*********************************/
function botoesDadosSessaoExercicioGateau(){
console.log("botoesDadosSessaoExercicioGateau");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorExercicioGateauButton').parent().parent().parent().attr('id'));
	//caso editar sessao
	if($modoSessao == "editarSessao"){
		//alert("botoesDadosSessaoExercicioGateau");
	}
	//botão anterior
	$('#anteriorExercicioGateauButton').click(function(){
		bindButtonAnterior();
	});

	//terminar sessão com os dados CoDraw
	$('#terminarExercicioGateauButton').click(function(){
		var $dataHoraSessao = '';
		if($tipoSessao == 'Presencial'){
			$dataHoraSessao = $dataSessao + " " + $horaSessao;
		} else {
			$dataHoraSessao = '';
		}

console.log("dataHoraSessao: " + $dataHoraSessao);
		$idSessao = adicionaNovaSessao($idTerapeutaSessao, $dataHoraSessao, $dataInicioSessao, $dataFimSessao, $idCriancasSessao, $tipoSessao, $tipoExercicioSessao , 0 , '');
		location.href='../listas/listas.html';
	});
}

/**********************************************
 Funções referentes à tab "Escolher História"
***********************************************/
function botoesDadosSessaoHistoria(){
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorHistoriaButton').parent().parent().parent().attr('id'));
    if($modoSessao == "editarSessao"){
        console.log("aquissss");
        removeTabs();
        aux = 8;
        bindButtonSeguinte();
    }
	//botão anterior
	$('#anteriorHistoriaButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteHistoriaButton').click(function(){
		bindButtonSeguinte();				
	});

	//no caso de se escolher nova historia
	//limpam-se as variáveis referentes à história (no caso de anteriormente se ter escolhido biblioteca
	//de histórias, estas vão ter valores associados
	//no caso de anteriormente se ter escolhido biblioteca de histórias e agora se querer uma história nova
	//apagam-se todas as tabs até à tab "Escolher História" e mostra a tab de nome da história
	//caso contrário, ou se for a primeira vez, vai apenas para a página seguinte (nome da história)
	$('#novaHistoriaButton').bind('click', function(){
		$idHistoria = 0;
		$nomeHistoria = '';
		$descricaoHistoria = '';
		$imagemHistoria = '';
		$idEtiquetasHistoria = [];
		$etiquetasHistoria = [];
		$idCenasHistoria = [];
		if(opcaoHistoria == "bibliotecaHistorias"){
			opcaoHistoria = "novaHistoria";
			removeTabs();
			aux = 8;
			bindButtonSeguinte();
		}
		else {
			opcaoHistoria = "novaHistoria";
			aux = 8;
			bindButtonSeguinte();
		}
		$alterarHistoria = false;
		$('#seguinteHistoriaButton').attr("disabled", false);
		$('#historiaBibliotecaButton').css('border', '2px outset buttonface');
		$('#novaHistoriaButton').css('border', '2px outset #0191d8');
	});

	//no caso de se escolher biblioteca de historias
	//se se tiver escolhido antes uma nova historia e se se tiver mudado de ideias,
	//apaga as tabs até esta tab e vai para a tab da biblioteca de historias
	//caso seja a primeira vez, ou se escolha de novo biblioteca de historias
	//funciona como botão seguinte
	$('#historiaBibliotecaButton').bind('click', function(){
//		$('#listaEtiquetasHistoria option').prop('selected', true);
//		$('#removerEtiquetaListaHistoriaButton').click();
		if(opcaoHistoria == "novaHistoria"){
			opcaoHistoria = "bibliotecaHistorias";
			removeTabs();
			aux = 12;
			bindButtonSeguinte();
		} else {
			opcaoHistoria = "bibliotecaHistorias";
			aux = 12;
			bindButtonSeguinte();
		}
		$('#seguinteHistoriaButton').attr("disabled", false);
		$('#novaHistoriaButton').css('border', '2px outset buttonface');
		$('#historiaBibliotecaButton').css('border', '2px outset #0191d8');
	});
}

/**********************************************
 Função referente à tab "Nome da História"
***********************************************/
function botoesDadosSessaoNomeHistoria(){
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorNomeHistoriaButton').parent().parent().parent().attr('id'));
	//preenche o nome da história
	//'' se nova história
	//nome da historia se alterar
	$('#nomeHistoria').val($nomeHistoria);
	$nomeHistoriaAntigo = $nomeHistoria;

	//se se tiver escolhido alterar uma historia o botao seguinte fica enable
	if($('#nomeHistoria').val() != '')
		$('#seguinteNomeHistoriaButton').attr("disabled", false);

	//botão anterior
	$('#anteriorNomeHistoriaButton').click(function(){
		bindButtonAnterior(); 
	});

	//botão seguinte
	$('#seguinteNomeHistoriaButton').click(function(){
		var $verificaNome = verificaHistoriaByNome($nomeHistoria);
		if($verificaNome == "Não existem histórias com este nome."){
            console.log("adkaslkdjalks  ");
            removeTabs();
			aux = 9; //força o seguinte, para não haver bugs
			bindButtonSeguinte();
		} else {
			$('#inputboxesNomeHistoria').empty();
			$('#inputboxesNomeHistoria').append('<div id="nomeHistoriaRepetido"><br><p id="mensagemAlternativa"> Já existe uma história com o nome ' + $nomeHistoria + '.<br>Por favor, escolha outro nome para a sua história.</p><br></div>');
			$.blockUI({ 
				message: $('#dialogNomeHistoriaExistente'), 
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
			$('#okDialogNomeHistoriaExistente').click(function() { 
				$('#nomeHistoria').focus();
				$('#seguinteNomeHistoriaButton').attr("disabled", true);
				$('#okDialogNomeHistoriaExistente').unbind();
				$.unblockUI();  
			});
		}
	});
	
	$("#nomeHistoria").focus();
	//qualquer modificação que haja na caixa de texto é detectada
	$("#nomeHistoria").on('input', function() {
		if($('#nomeHistoria').val() != ''){
			$('#seguinteNomeHistoriaButton').attr("disabled", false);
		} else {
			$('#seguinteNomeHistoriaButton').attr("disabled", true);
		}
		$nomeHistoria = $('#nomeHistoria').val();
//DEBUG
console.log("$nomeHistoria: " + $nomeHistoria);
	});
}

/*************************************************
 Função referente à tab "Descrição da História"
**************************************************/
function botoesDadosSessaoDescricaoHistoria(){
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorDescricaoHistoriaButton').parent().parent().parent().attr('id'));
	//preenche a caixa de texto
	//'' se nova história 
	//descrição da historia se alterar
	$('#descricaoHistoria').val($descricaoHistoria);

	//botão anterior
	$('#anteriorDescricaoHistoriaButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteDescricaoHistoriaButton').click(function(){
		aux = 10; //força o seguinte, para não haver bugs
		bindButtonSeguinte();				
	});

	$("#descricaoHistoria").focus();
	//qualquer modificação que haja na caixa de texto é detectada
	$("#descricaoHistoria").on('input', function() {
		if($('#descricaoHistoria').val() != ''){
			$('#seguinteDescricaoHistoriaButton').attr("disabled", false);
		} else {
			$('#seguinteDescricaoHistoriaButton').attr("disabled", true);
		}
		$descricaoHistoria = $('#descricaoHistoria').val();
console.log("$descricaoHistoria: " + $descricaoHistoria);
	});
}

/*************************************************
 Função referente à tab "Imagem da História"
**************************************************/
function botoesDadosSessaoThumbnailHistoria(){
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorThumbnailHistoriaButton').parent().parent().parent().attr('id'));
	//se a variavel $imagemHistoria estiver vazia, quer dizer que estamos
	//a criar uma nova história, por isso o thumbnail fica com uma imagem
	//a dizer que não existe uma imagem associada
	if($imagemHistoria == ''){
		$('#thumbnailHistoria').attr('src', "../imagens/noImage.gif");
		$alterarHistoria = false;
	}else{
		$('#thumbnailHistoria').attr('src', $imagemHistoria);
		$('#seguinteThumbnailHistoriaButton').attr("disabled", false);
	}

	//botão anterior
	$('#anteriorThumbnailHistoriaButton').click(function(){
		bindButtonAnterior();
	});

	//botão seguinte
	$('#seguinteThumbnailHistoriaButton').click(function(){	
		if($alterarHistoria && !$modificouImagemHistoria){
			//copio a imagem para as pasta temp respectiva
			var $temp = $imagemHistoria.split("/");
			var $ficheiro = $temp[$temp.length-1];
			//guarda a imagem na pasta temporária, porque vai precisar dela para a historia alterada
			$imagemHistoria = thumbnailRequest(null, 'saveFile', $nomeHistoriaAntigo, "thumbsHistoria", "tempFolderHistoria", $ficheiro, "alterar");
		}
		aux = 11; //força o seguinte, para não haver bugs
		bindButtonSeguinte();
	});

	$('#alterarThumbnailButton').click(function(){
		$('#novoThumbnailHistoria').click();
	});
	//vai mostrar a janela para escolher o ficheiro e faz o upload do ficheiro
	//só aceita imagens
	$('#newThumbnail').change(function(){
		var $fd = new FormData(document.getElementById('newThumbnail'));
        var $ajax = thumbnailRequest($fd, "uploadTempFile", "" , "tempFolderHistoria", "", "");
		//podem existir 3 casos:
		//cancelar o pedido (no chrome não detectava o botão de cancelar, o ficheiro mostrava-se como 'broken')
		//o ficheiro nao ser suportado
		//sucesso
		$ajax.success(function(realData) {
			if(realData != "empty"){
				if(realData == "file not supported"){
					//alert("O ficheiro que escolheu não é suportado. Escolha outro.");
					$.blockUI({ 
						message: $('#dialogThumbnailNaoSuportado'), 
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
					$('#okDialogThumbnailNaoSuportado').click(function() { 
						$('#seguinteThumbnailHistoriaButton').attr("disabled", true);
						$('#okDialogThumbnailNaoSuportado').unbind();
						$.unblockUI();  
					});
				} else {
					$imagemHistoria = realData;
					$('#thumbnailHistoria').attr("src", $imagemHistoria);
					$('#seguinteThumbnailHistoriaButton').attr("disabled", false);
					$modificouImagemHistoria = true;
				}
			}
		});
console.log("$imagemHistoria: " + $imagemHistoria);
	});

}

/************************************************
 Função referente à tab "Etiquetas da História"
*************************************************/
function botoesDadosSessaoEtiquetasHistoria(){
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorEtiquetasHistoriaButton').parent().parent().parent().attr('id'));
	//no caso de se estar a editar uma historia e existirem etiquetas
	if($idEtiquetasHistoria.length > 0){
        console.log("aquilolol");
		$.each($idEtiquetasHistoria, function(index, id){
			$('#listaEtiquetasHistoria').append('<option value="' + id + '">' + $etiquetasHistoria[index] + '</option>');
			$("#listaEtiquetasHistoria").html($("#listaEtiquetasHistoria option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			})); 
			//auxiliares para o filtro
			$("#listaEtiquetasHistoriasExistentes option[value=" + id + "]").remove();
			$("#listaEtiquetasHistoriasExistentesAux option[value=" + id + "]").remove();
			cloneEtiquetasHistorias = $("#listaEtiquetasHistoriasExistentesAux").children().clone();
		});
	}
	//botão anterior
	$('#anteriorEtiquetasHistoriaButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteEtiquetasHistoriaButton').click(function(){
		aux = 13; //força o seguinte, para não haver bugs
		bindButtonSeguinte();				
	});
	//filtro para procurar na lista de etiquetas existentes
	$('#listaEtiquetasHistoriasExistentes').selectFilter({
		name: 'escolheEtiquetasHistoria'
        });

	//clone da lista de etiquetas auxiliar para serem mostrados todas as etiquetas
	//existentes, sem esta lista auxiliar, ao procurar depois não recuperava a lista de etiquetas
	//todas as operações que forem feitas sobre '#listaEtiquetasHistoriasExistentes' também
	//terão de ser feitas sobre esta lista '#listaEtiquetasHistoriasExistentesAux'
	cloneEtiquetasHistorias = $("#listaEtiquetasHistoriasExistentesAux").children().clone();

	//botão que selecciona todas as etiquetas na lista de crianças existentes
	$('#seleccionarTudolistaEtiquetasExistentesHistoriaButton').bind('click', function () {
		$('#listaEtiquetasHistoriasExistentes option').prop('selected', true);
	});
	//botão que remove a selecção de todas as etiquetas na lista de crianças existentes
	$('#removerTudolistaEtiquetasExistentesHistoriaButton').bind('click', function () {
		$('#listaEtiquetasHistoriasExistentes option').prop('selected', false);
	});
	//botão que selecciona todas as etiquetas na lista de crianças na sessão
	$('#seleccionarTudoListaEtiquetasHistoriaButton').bind('click', function () {
		$('#listaEtiquetasHistoria option').prop('selected', true);
	});
	//botão que remove a selecção de todas as etiquetas na lista de crianças na sessão
	$('#removerTudoListaEtiquetasHistoriaButton').bind('click', function () {
		$('#listaEtiquetasHistoria option').prop('selected', false);
	});
	//botão que adiciona as etiquetas seleccionadas à lista de sessão
	$('#adicionarEtiquetaListaHistoriaButton').bind('click', function () {
		//para cada etiqueta seleccionada na lista de etiquetas existentes, é adicionada na lista de etiquetas da sessao
		//e apagada da lista de etiquetas existentes e sua auxiliar
		$("#listaEtiquetasHistoriasExistentes option:selected").each(function () {
			$('#listaEtiquetasHistoria').append('<option value="' + Number($(this).val()) + '">' + $(this).text() + '</option>');
			//para ordenar as etiquetas por nome
			$("#listaEtiquetasHistoria").html($("#listaEtiquetasHistoria option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			})); 
			//remove da lista de etiquetas existentes e sua auxiliar
			$("#listaEtiquetasHistoriasExistentes option[value=" + Number($(this).val()) + "]").remove();
			$("#listaEtiquetasHistoriasExistentesAux option[value=" + Number($(this).val()) + "]").remove();
			//actualiza o clone da lista de etiquetas
			cloneEtiquetasHistorias = $("#listaEtiquetasHistoriasExistentesAux").children().clone();
		});

		//para actualizar o estado da lista de etiquetas da sessão
		$("#listaEtiquetasHistoria").click();
	});

	//duplo clique numa etiqueta para a adicionar à sessão
	$('#listaEtiquetasHistoriasExistentes').dblclick(function(){
		$('#adicionarEtiquetaListaHistoriaButton').click();
	});

	//botão que remove as etiquetas seleccionadas da lista de sessão
	$('#removerEtiquetaListaHistoriaButton').bind('click', function () {
		//para cada etiqueta seleccionada é removida da lista de etiquetas da sessão e adicionada 
		//à lista de etiquetas existentes e sua auxiliar
		$("#listaEtiquetasHistoria option:selected").each(function () {
			$('#listaEtiquetasHistoriasExistentes').append('<option value="' + Number($(this).val()) + '">' + $(this).text() + '</option>');
			//ordena as etiquetas pelo nome
			$("#listaEtiquetasHistoriasExistentes").html($("#listaEtiquetasHistoriasExistentes option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			})); 
			//lista auxiliar
			$('#listaEtiquetasHistoriasExistentesAux').append('<option value="' + Number($(this).val()) + '">' + $(this).text() + '</option>');
			$("#listaEtiquetasHistoriasExistentesAux").html($("#listaEtiquetasHistoriasExistentesAux option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			})); 
			//actualiza o clone			
			cloneEtiquetasHistorias = $("#listaEtiquetasHistoriasExistentesAux").children().clone();

			//remove da lista de etiquetas na sessão
			$("#listaEtiquetasHistoria option[value=" + Number($(this).val()) + "]").remove();
		});

		$("#listaEtiquetasHistoria").click();
	});

	//duplo clique numa etiqueta para a remover da historia
	$('#listaEtiquetasHistoria').dblclick(function(){
		$('#removerEtiquetaListaHistoriaButton').click();
	});

	//actualiza os dados da sessão no que diz respeito as etiquetas da historia
	$("#listaEtiquetasHistoria").click(function () {
		$idEtiquetasHistoria = [];
		$("#listaEtiquetasHistoria option").each(function(){
			$idEtiquetasHistoria.push(Number($(this).val()));
		});
//DEBUG
console.log("$idEtiquetasHistoria: " + $idEtiquetasHistoria);
	});

	//botão que adiciona uma nova etiqueta à história
	$('#adicionarEtiquetasHistoriaButton').click(function(){
		var $existeEtiquetaHistoria = false;
		$('#listaEtiquetasHistoriasExistentes option').each(function(){
			if($(this).text() == $('#input_escolheEtiquetasHistoria').val()){
				$existeEtiquetaHistoria = true;
			}
		});

		var $existeEtiquetaHistoriaSeleccionada = false;
		$('#listaEtiquetasHistoria option').each(function(){
			if($(this).text() == $('#input_escolheEtiquetasHistoria').val()){
				$existeEtiquetaHistoriaSeleccionada = true;
			}
		});
		
		if(!$existeEtiquetaHistoria && !$existeEtiquetaHistoriaSeleccionada){
			//faz o pedido para adicionar a etiqueta
			//retorna o id se inseriu bem
			var $idNovaEtiqueta = adicionaNovaEtiqueta($('#input_escolheEtiquetasHistoria').val());
			if(Number($idNovaEtiqueta)){
				//adiciona a nova etiqueta à lista de etiquetas escolhidas
				//limpa o input
				$('#listaEtiquetasHistoria').append('<option value="' + Number($idNovaEtiqueta) + '">' + $('#input_escolheEtiquetasHistoria').val() + '</option>');
				$('#input_escolheEtiquetasHistoria').val('');
				$('#input_escolheEtiquetasHistoria').keyup();
			} else 
				alert("Não foi possível adicionar a etiqueta");
		} else if($existeEtiquetaHistoria){
			//alert("Já existe esta etiqueta!");
			$.blockUI({ 
				message: $('#dialogEtiquetaHistoriaExistente'), 
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
			$('#okDialogEtiquetaHistoriaExistente').click(function() { 
				$('#okDialogEtiquetaHistoriaExistente').unbind();
				$.unblockUI();  
			});
		} else {
			//alert("Já existe esta etiqueta!");
			$.blockUI({ 
				message: $('#dialogEtiquetaHistoriaExistenteSeleccionada'), 
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
			$('#okDialogEtiquetaHistoriaExistenteSeleccionada').click(function() { 
				$('#okDialogEtiquetaHistoriaExistenteSeleccionada').unbind();
				$.unblockUI();  
			});
		}
	});
}

/*************************************************
 Função referente à tab "Biblioteca de Histórias"
**************************************************/
function botoesDadosSessaoBibliotecaHistorias(){
console.log("botoesDadosSessaoBibliotecaHistorias");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorBibliotecaHistoriasButton').parent().parent().parent().attr('id'));
	resizeFunctionBibliotecaHistorias();
	//se estiver a editar sessao
	if($modoSessao == "editarSessao"){
		$('#historia' + $idHistoria).click();
	} else if($modoSessao == "novaSessao"){
		//escreve a mensagem que não existe nenhuma história seleccionada
		//quando se selecciona uma história esta mensagem é substituida pela
		//informação referente à história
		$('#informacaoHistoria').empty();
		$('#informacaoHistoria').append('<br><br><br><br><br><br><p align="center">Não foi seleccionada uma história. <br>Escolha uma história da biblioteca.</p>');
	}
	//botão anterior
	$('#anteriorBibliotecaHistoriasButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteBibliotecaHistoriasButton').click(function(){
		bindButtonSeguinte();				
	});
	
	//botão alterar história
	$('#alterarBibliotecaHistoriasButton').click(function(){
		$('#seguinteBibliotecaHistoriasButton').attr('disabled', false);
		$('#alterarBibliotecaHistoriasButton').attr('disabled', true);
		if($idHistoriaAntiga != $idHistoria){
			removeTabs();
		}
		$idHistoriaAntiga = $idHistoria;
		$contemCenas = true;
		$alterarHistoria = true;
		aux = 8;
		bindButtonSeguinte();				
	});

	//botão guarda a sessão
	$('#usarBibliotecaHistoriasButton').click(function(){
		//guardar dados
		//grava o thumbnail da historia
		$imagemHistoria = thumbnailRequest(null, 'saveFile', $nomeHistoria, "tempFolderHistoria", "thumbsHistoria", $imagemHistoria, "gravar");
		//gravaSessao:
		var $dataHoraSessao = $dataSessao + " " + $horaSessao;
		$idExercicioSessao = $idHistoria;
		var $stringIdCenasPontuacao = '';
		$.each($idCenasPontuacao, function (index, value){
			$stringIdCenasPontuacao += value + ", ";
		});
		if($modoSessao == "novaSessao"){
			$idSessao = adicionaNovaSessao($idTerapeutaSessao, $dataHoraSessao, $dataInicioSessao, $dataFimSessao, $idCriancasSessao, $tipoSessao, $tipoExercicioSessao, $idExercicioSessao, $stringIdCenasPontuacao);
			console.log('$idSessao', $idSessao);
		}
		else if($modoSessao == "editarSessao"){
			$mensagem = modificaSessao($idSessao, $idTerapeutaSessao, $dataHoraSessao, $idCriancasSessao, $idHistoria, $stringIdCenasPontuacao);
			console.log('$mensagem', $mensagem);
		}
		location.href='../listas/listas.html';
	});
}

/***************************************
 Função referente à tab "Escolher Cena"
****************************************/
function botoesDadosSessaoCena(){
console.log("botoesDadosSessaoCena");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorCenaButton').parent().parent().parent().attr('id'));
	resizeFunctionEscolherCenas();
   
	if($alterarHistoria)
		$('#terminarBibliotecaCenasButton').attr("disabled", false);
	//botão anterior
	$('#anteriorCenaButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteCenaButton').click(function(){
		bindButtonSeguinte();				
	});

	$("#listaCenasHistoriaSeleccionadas").sortable({
			revert: true,
			update: function(event, ui) {
				$("#listaCenasHistoriaSeleccionadas").click();				
	        	}
	    });
	
	$("#listaCenasHistoriaSeleccionadas").click(function(){
		$idCenasHistoria = [];
		$("#listaCenasHistoriaSeleccionadas").find('img').each(function(){
			$idCenasHistoria.push(Number($(this).attr('id').split('cena')[1]));
		});
		console.log($idCenasHistoria);
	});

	//botão para criar uma nova cena
	$('#novaCenaButton').bind('click', function(){
		$idCena = 0;
		$nomeCena = '';
		$descricaoCena = '';
		$imagemCena = '';
		$idEtiquetasCena = [];
		$etiquetasCena = [];
		$urlIntroducaoCena = '';
		$idTipoActividadeCena = [];
		$nrVezesGesto = [];
		$versaoCena = '';
		$pontuacaoCena = 0;
		$nrVezesCena = 1;
		$urlReforcoPositivo = '';
		$urlReforcoPositivoThumb = '';
		$urlReforcoNegativo = '';
		$urlReforcoNegativoThumb = '';
		if(opcaoCenas == "bibliotecaCenas"){
			opcaoCenas = "novaCena";
			removeTabs();
			aux = 14;
			bindButtonSeguinte();
		}
		else {
			opcaoCenas = "novaCena";
			aux = 14;
			bindButtonSeguinte();
		}
		$('#seguinteCenaButton').attr("disabled", false);
		$('#cenaBibliotecaButton').css('border', '2px outset buttonface');
		$('#novaCenaButton').css('border', '2px outset #0191d8');
		$alterarCena = false;
	});
	//botão para seleccionar uma cena da biblioteca
	$('#cenaBibliotecaButton').bind('click', function(){
//		$('#listaEtiquetasCena option').prop('selected', true);
//		$('#removerEtiquetaListaCenaButton').click();
		if(opcaoCenas == "novaCena"){
			opcaoCenas = "bibliotecaCenas";
			removeTabs();
			aux = 18;
			bindButtonSeguinte();
		} else {
			opcaoCenas = "bibliotecaCenas";
			aux = 18;
			bindButtonSeguinte();
		}
		//$('#seguinteCenaButton').attr("disabled", false);
		$('#novaCenaButton').css('border', '2px outset buttonface');
		$('#cenaBibliotecaButton').css('border', '2px outset #0191d8');
	});

	$('#terminarBibliotecaCenasButton').click(function(){
			//guardar dados
			//guarda a historia
			$imagemHistoria = thumbnailRequest(null, 'saveFile', $nomeHistoria, "tempFolderHistoria", "thumbsHistoria", $imagemHistoria, "gravar");
			var $stringIdEtiquetasHistoria = '';
			$.each($idEtiquetasHistoria, function (index, value){
				$stringIdEtiquetasHistoria += value + ", ";
			});
			var $stringIdCenasHistoria = '';
			$.each($idCenasHistoria, function (index, value){
				$stringIdCenasHistoria += value + ", ";
			});

			$idHistoria = adicionaNovaHistoria($imagemHistoria, $nomeHistoria, $descricaoHistoria, $stringIdCenasHistoria, $stringIdEtiquetasHistoria);
			var $dataHoraSessao = $dataSessao + " " + $horaSessao;
			var $stringIdCenasPontuacao = '';
			$.each($idCenasPontuacao, function (index, value){
				$stringIdCenasPontuacao += value + ", ";
			});
			if($modoSessao == "novaSessao"){
				$idSessao = adicionaNovaSessao($idTerapeutaSessao, $dataHoraSessao, $dataInicioSessao, $dataFimSessao, $idCriancasSessao, $tipoSessao, $tipoExercicioSessao, $idHistoria, $stringIdCenasPontuacao);
				console.log('$idSessao', $idSessao);
			}
			else if($modoSessao == "editarSessao"){
				$mensagem = modificaSessao($idSessao, $idTerapeutaSessao, $dataHoraSessao, $idCriancasSessao, $idHistoria, $stringIdCenasPontuacao);
				console.log('$mensagem', $mensagem);
			}
console.log('$idSessao', $idSessao);
			location.href='../listas/listas.html';
	});

}
/***************************************
 Função referente à tab "Nome da Cena"
****************************************/
function botoesDadosSessaoNomeCena(){
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorNomeCenaButton').parent().parent().parent().attr('id'));
	$('#nomeCena').val($nomeCena);
	$nomeCenaAntigo = $nomeCena;
	//botão anterior
	$('#anteriorNomeCenaButton').click(function(){
		bindButtonAnterior();
	});

	//se se tiver escolhido alterar uma historia o botao seguinte fica enable
	if($('#nomeCena').val() != '')
		$('#seguinteNomeCenaButton').attr("disabled", false);

	//botão seguinte
	$('#seguinteNomeCenaButton').click(function(){
		var $verificaNome = verificaCenaByNome($nomeCena);
		if($verificaNome == "Não existem cenas com este nome."){
			aux = 15;
			bindButtonSeguinte();
		} else {
			$('#inputboxesNomeCena').empty();
			$('#inputboxesNomeCena').append('<div id="nomeCenaRepetido"><br><p id="mensagemAlternativa"> Já existe uma cena com o nome ' + $nomeCena + '.<br>Por favor, escolha outro nome para a sua cena.</p><br></div>');
			$.blockUI({ 
				message: $('#dialogNomeCenaExistente'), 
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
			$('#okDialogNomeCenaExistente').click(function() { 
				$('#nomeCena').focus();
				$('#seguinteNomeCenaButton').attr("disabled", true);
				$('#okDialogNomeCenaExistente').unbind();
				$.unblockUI();  
			});
		}				
	});

	$("#nomeCena").focus();
	$("#nomeCena").on('input', function() {
		if($('#nomeCena').val() != ''){
			$('#seguinteNomeCenaButton').attr("disabled", false);
		} else {
			$('#seguinteNomeCenaButton').attr("disabled", true);
		}
		$nomeCena = $('#nomeCena').val();
console.log("$nomeCena: " + $nomeCena);
	});
}
/*******************************************
 Função referente à tab "Descrição da Cena"
********************************************/
function botoesDadosSessaoDescricaoCena(){
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorDescricaoCenaButton').parent().parent().parent().attr('id'));
	$('#descricaoCena').val($descricaoCena);
	//botão anterior
	$('#anteriorDescricaoCenaButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteDescricaoCenaButton').click(function(){
		aux = 16;
		bindButtonSeguinte();				
	});

	$("#descricaoCena").focus();
	$("#descricaoCena").on('input', function() {
		$descricaoCena = $('#descricaoCena').val();
//DEBUG
console.log("$descricaoCena: " + $descricaoCena);
	});
	
}
/*******************************************
 Função referente à tab "Etiquetas da Cena"
********************************************/
function botoesDadosSessaoEtiquetasCena(){
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorEtiquetasCenaButton').parent().parent().parent().attr('id'));
	//no caso de se estar a editar uma cena e existirem etiquetas
	if($idEtiquetasCena.length > 0){
		$.each($idEtiquetasCena, function(index, id){
			$('#listaEtiquetasCena').append('<option value="' + id + '">' + $etiquetasCena[index] + '</option>');
			$("#listaEtiquetasCena").html($("#listaEtiquetasCena option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			})); 
			//auxiliares para o filtro
			$("#listaEtiquetasCenasExistentes option[value=" + id + "]").remove();
			$("#listaEtiquetasCenasExistentesAux option[value=" + id + "]").remove();
			cloneEtiquetasCenas = $("#listaEtiquetasCenasExistentesAux").children().clone();
		});
	}
	//botão anterior
	$('#anteriorEtiquetasCenaButton').click(function(){
		bindButtonAnterior();
	});

	//botão seguinte
	$('#seguinteEtiquetasCenaButton').click(function(){
		aux = 17;
		bindButtonSeguinte();				
	});
	//filtro para procurar na lista de etiquetas existentes
	$('#listaEtiquetasCenasExistentes').selectFilter({
		name: 'escolheEtiquetasCena'
        });
	//clone da lista de etiquetas auxiliar para serem mostrados todas as etiquetas
	//existentes, sem esta lista auxiliar, ao procurar depois não recuperava a lista de etiquetas
	//todas as operações que forem feitas sobre '#listaEtiquetasCenasExistentes' também
	//terão de ser feitas sobre esta lista '#listaEtiquetasCenasExistentesAux'
	cloneEtiquetasCenas = $("#listaEtiquetasCenasExistentesAux").children().clone();

	//botão que selecciona todas as etiquetas na lista de etiquetas existentes
	$('#seleccionarTudolistaEtiquetasExistentesCenaButton').bind('click', function () {
		$('#listaEtiquetasCenasExistentes option').prop('selected', true);
	});

	//botão que remove a selecção de todas as etiquetas na lista de etiquetas existentes
	$('#removerTudolistaEtiquetasExistentesCenaButton').bind('click', function () {
		$('#listaEtiquetasCenasExistentes option').prop('selected', false);
	});

	//botão que selecciona todas as etiquetas na lista de etiquetas na sessão
	$('#seleccionarTudoListaEtiquetasCenaButton').bind('click', function () {
		$('#listaEtiquetasCena option').prop('selected', true);
	});
	//botão que remove a selecção de todas as etiquetas na lista de etiquetas na sessão
	$('#removerTudoListaEtiquetasCenaButton').bind('click', function () {
		$('#listaEtiquetasCena option').prop('selected', false);
	});

	//botão que adiciona as etiquetas seleccionadas à lista de sessão
	$('#adicionarEtiquetaListaCenaButton').bind('click', function () {
		//para cada etiqueta seleccionada na lista de etiquetas existentes, é adicionada na lista de etiquetas da sessao
		//e apagada da lista de etiquetas existentes e sua auxiliar
		$("#listaEtiquetasCenasExistentes option:selected").each(function () {
			$('#listaEtiquetasCena').append('<option value="' + Number($(this).val()) + '">' + $(this).text() + '</option>');
			//para ordenar as etiquetas por nome
			$("#listaEtiquetasCena").html($("#listaEtiquetasCena option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			})); 
			//remove da lista de etiquetas existentes e sua auxiliar
			$("#listaEtiquetasCenasExistentes option[value=" + Number($(this).val()) + "]").remove();
			$("#listaEtiquetasCenasExistentesAux option[value=" + Number($(this).val()) + "]").remove();
			//actualiza o clone da lista de etiquetas
			cloneEtiquetasCenas = $("#listaEtiquetasCenasExistentesAux").children().clone();
		});
		//se houver etiquetas na lista de etiquetas da sessão, então existem condições para continuar com
		//a criação da sessão
		if($('#listaEtiquetasCena option').size() != 0){
			$('#seguinteEtiquetasCenaButton').attr("disabled", false);
		} else {
			$('#seguinteEtiquetasCenaButton').attr("disabled", true);
		}
		//para actualizar o estado da lista de etiquetas da sessão
		$("#listaEtiquetasCena").click();
	});
	//duplo clique numa etiqueta para a adicionar à sessão
	$('#listaEtiquetasCenasExistentes').dblclick(function(){
		$('#adicionarEtiquetaListaCenaButton').click();
	});

	//botão que remove as etiquetas seleccionadas da lista de sessão
	$('#removerEtiquetaListaCenaButton').bind('click', function () {
		//para cada etiqueta seleccionada é removida da lista de etiquetas da sessão e adicionada 
		//à lista de etiquetas existentes e sua auxiliar
		$("#listaEtiquetasCena option:selected").each(function () {
			$('#listaEtiquetasCenasExistentes').append('<option value="' + Number($(this).val()) + '">' + $(this).text() + '</option>');
			//ordena as etiquetas pelo nome
			$("#listaEtiquetasCenasExistentes").html($("#listaEtiquetasCenasExistentes option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			})); 
			//lista auxiliar
			$('#listaEtiquetasCenasExistentesAux').append('<option value="' + Number($(this).val()) + '">' + $(this).text() + '</option>');
			$("#listaEtiquetasCenasExistentesAux").html($("#listaEtiquetasCenasExistentesAux option").sort(function (a, b) {
			    return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			})); 
			//actualiza o clone	
			cloneEtiquetasCenas = $("#listaEtiquetasCenasExistentesAux").children().clone();

			//remove da lista de etiquetas na sessão
			$("#listaEtiquetasCena option[value=" + Number($(this).val()) + "]").remove();
		});
		//se houver etiquetas na lista de etiquetas da sessão, então existem condições para continuar com
		//a criação da sessão
		if($('#listaEtiquetasCena option').size() != 0){
			$('#seguinteEtiquetasCenaButton').attr("disabled", false);
		} else {
			$('#seguinteEtiquetasCenaButton').attr("disabled", true);
		}
		$("#listaEtiquetasCena").click();
	});
	//duplo clique numa etiqueta para a remover da sessão
	$('#listaEtiquetasCena').dblclick(function(){
		$('#removerEtiquetaListaCenaButton').click();
	});
	
	//actualiza os dados da sessão no que diz respeito as etiquetas da cena
	$("#listaEtiquetasCena").click(function () {
		$idEtiquetasCena = [];
		$("#listaEtiquetasCena option").each(function(){
			$idEtiquetasCena.push(Number($(this).val()));
		});
//DEBUG
console.log("$idEtiquetasCena: " + $idEtiquetasCena);
	});

	//botão que adiciona uma nova etiqueta à cena
	$('#adicionarEtiquetasCenaButton').click(function(){
		var $existeEtiquetaCena = false;
		$('#listaEtiquetasCenasExistentes option').each(function(){
			if($(this).text() == $('#input_escolheEtiquetasCena').val()){
				$existeEtiquetaCena = true;
			}
		});

		var $existeEtiquetaCenaSeleccionada = false;
		$('#listaEtiquetasCena option').each(function(){
			if($(this).text() == $('#input_escolheEtiquetasCena').val()){
				$existeEtiquetaCenaSeleccionada = true;
			}
		});

		if(!$existeEtiquetaCena && !$existeEtiquetaCenaSeleccionada){
			//faz o pedido para adicionar a etiqueta
			//retorna o id se inseriu bem
			var $idNovaEtiqueta = adicionaNovaEtiqueta($('#input_escolheEtiquetasCena').val());
			if(Number($idNovaEtiqueta)){
				//adiciona a nova etiqueta à lista de etiquetas escolhidas
				//limpa o input
				$('#listaEtiquetasCena').append('<option value="' + Number($idNovaEtiqueta) + '">' + $('#input_escolheEtiquetasCena').val() + '</option>');
				$('#input_escolheEtiquetasCena').val('');
				$('#input_escolheEtiquetasCena').keyup();
			} else 
				alert("Não foi possível adicionar a etiqueta");
		
		} else if($existeEtiquetaCena){
			//alert("Já existe esta etiqueta!");
			$.blockUI({ 
				message: $('#dialogEtiquetaCenaExistente'), 
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
			$('#okDialogEtiquetaCenaExistente').click(function() { 
				$('#okDialogEtiquetaCenaExistente').unbind();
				$.unblockUI();  
			});
		} else {
			//alert("Já existe esta etiqueta!");
			$.blockUI({ 
				message: $('#dialogEtiquetaCenaExistenteSeleccionada'), 
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
			$('#okDialogEtiquetaCenaExistenteSeleccionada').click(function() { 
				$('#okDialogEtiquetaCenaExistenteSeleccionada').unbind();
				$.unblockUI();  
			});
		}
	});
		
}
/*******************************************
 Função referente à tab "Introdução à Cena"
********************************************/
function botoesDadosSessaoIntroducaoCena(){
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorIntroducaoCenaButton').parent().parent().parent().attr('id'));
	//se a variavel $imagemCena estiver vazia, quer dizer que estamos
	//a criar uma nova cena, por isso o thumbnail fica com uma imagem
	//a dizer que não existe uma imagem associada
	if($imagemCena == ''){
		$('#thumbnailCena').attr('src', "../imagens/noImage.gif");
		$mimeIntroducaoCena = "imagem";
		$modificouIntroducao = false;
	} else{
		$('#thumbnailCena').attr('src', $imagemCena);
		$('#seguinteIntroducaoCenaButton').attr("disabled", false);
	}

	//botão anterior
	$('#anteriorIntroducaoCenaButton').click(function(){
		bindButtonAnterior();
	});
	//botão seguinte
	$('#seguinteIntroducaoCenaButton').click(function(){
		if($alterarCena && !$modificouIntroducao){
			//copio a imagem e a introducao para as pastas temp respectiva
			//grava a introducao da cena
			//isto no caso de não se modificar a introdução
			var $temp = $imagemCena.split("/");
			var $ficheiro = $temp[$temp.length-1];
console.log("ficheiro imagem antes: " + $ficheiro);
			$imagemCena = thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "thumbsCena", "tempFolderThumbsCena", $ficheiro, "alterar");
console.log("ficheiro imagem depois imagem cena: " + $imagemCena);
console.log("$mimeIntroducaoCena$mimeIntroducaoCena: " + $mimeIntroducaoCena);
			if($mimeIntroducaoCena == 'video'){
				var $temp = $urlIntroducaoCena.split("/");
				var $ficheiro = $temp[$temp.length-1];
	console.log("ficheiro intro antes: " + $ficheiro);
				thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "introducaoActividade", "tempFolderIntroducaoActividadeFile", $ficheiro + '.mp4', "alterar");
				$urlIntroducaoCena = thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "introducaoActividade", "tempFolderIntroducaoActividadeFile", $ficheiro + '.webm', "alterar");
	console.log("RAIOS PARA ISTO: " + $urlIntroducaoCena);
				var $arrayIntro = $urlIntroducaoCena.split('.');
				var $intro = '..';
				var i = 0;
				while (i < $arrayIntro.length-1){
					if($arrayIntro[i] != '')
						$intro = $intro + $arrayIntro[i];
					i++;
				}
				$urlIntroducaoCena = $intro;	
console.log("sadasdasdasdasda: " + $urlIntroducaoCena);			
			} else {
				var $temp = $urlIntroducaoCena.split("/");
				var $ficheiro = $temp[$temp.length-1];
				$urlIntroducaoCena = thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "introducaoActividade", "tempFolderIntroducaoActividadeFile", $ficheiro, "alterar");
			}
		}
console.log("$urlIntroducaoCena: " + $urlIntroducaoCena);
console.log("$imagemCena: " + $imagemCena);
		aux = 19;
		bindButtonSeguinte();	
		//se se estiver a alterar uma cena, vai directamente para a actividade correspondente			
/*		if($alterarCena){
			switch($tipoActividade){
				case "Questionário": 
					aux = 23;
					bindButtonSeguinte();					
					break;
				case "Gesto": 
					aux = 20;
					bindButtonSeguinte();	
					break;
			}
		}*/
	});

	$('#progressoIntroducao').hide();
	$('#progressoIntroducaoUploadBar').hide();

	$('#adicionarIntroducaoButton').click(function(){
		$('#introducaoCena').click();
		$('#progressoIntroducaoUploadBar').hide();
	});
	
	$('#introducaoCena').change(function () {
		var $fd = new FormData(document.getElementById('introducao'));
		//extensao		
		var ext = this.value.match(/\.(.+)$/)[1];
		//pedido http
		var request = new XMLHttpRequest();
		$target = $('#progressoIntroducaoUploadBar');
		$targetLabel = $('#progressoIntroducao');
		request.upload.addEventListener('progress', uploadProgress, false);
 	
  		request.open("POST", "../server/php/uploadFiles.php?folderFile=tempFolderIntroducaoActividadeFile&&FolderThumb=tempFolderThumbsCena");

  		request.send($fd);
		request.onreadystatechange = function(){
			if (request.readyState==4 && request.status==200) {
		  		var rsp = request.responseText;
		  		var $cont = rsp.split('@');
				if($cont.length == 1){
					//alert("O ficheiro que escolheu não é suportado. Escolha outro.");
					$.blockUI({ 
						message: $('#dialogThumbnailNaoSuportado'), 
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
					$('#okDialogThumbnailNaoSuportado').click(function() { 
						$('#seguinteIntroducaoCenaButton').attr("disabled", true);
						$('#progressoIntroducaoUploadBar').hide();
						$('#progressoIntroducao').empty();
						$('#okDialogThumbnailNaoSuportado').unbind();
						$.unblockUI();  
					});
				} 
 				else {
			  		$urlIntroducaoCena = $.trim($cont[0]);
console.log("url " + $urlIntroducaoCena);
			  		$mimeIntroducaoCena = $.trim($cont[1]);
console.log("mime " + $mimeIntroducaoCena);
			  		$imagemCena = $.trim($cont[2]);
					$('#thumbnailCena').attr('src', $imagemCena);
					$('#seguinteIntroducaoCenaButton').attr("disabled", false);
					$modificouIntroducao = true;
				}
			}
		}
        });
}

/*********************************************
 Função referente à tab "Biblioteca de Cenas"
**********************************************/
function botoesDadosSessaoBibliotecaCenas(){
console.log("botoesDadosSessaoBibliotecaCenas");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorBibliotecaCenasButton').parent().parent().parent().attr('id'));
	resizeFunctionBibliotecaCenas();
	//escreve a mensagem que não existe nenhuma cena seleccionada
	//quando se selecciona uma história esta mensagem é substituida pela
	//informação referente à cena
	$('#informacaoCena').empty();
	$('#informacaoCena').append('<br><br><br><br><br><br><p align="center">Não foi seleccionada uma cena. <br>Escolha uma cena da biblioteca.</p>');

	//if(opcaoCenas == "bibliotecaCenas")
	//	$('#alterarBibliotecaCenasButton').attr('disabled', false);

	$('#anteriorBibliotecaCenasButton').click(function(){
		bindButtonAnterior();
	});
	$('#seguinteBibliotecaCenasButton').click(function(){
		bindButtonSeguinte();				
	});
	$('#alterarBibliotecaCenasButton').click(function(){
		$('#seguinteBibliotecaCenasButton').attr('disabled', false);
		$('#alterarBibliotecaCenasButton').attr('disabled', true);
		aux = 14;
		//preenche os dados
		if($idCenaAntiga != $idCena){
			removeTabs();
		}
		$idCenaAntiga = $idCena;
		$alterarCena = true;
		bindButtonSeguinte();				
	});
	$('#usarBibliotecaCenasButton').click(function(){
		if(opcaoHistoria == "novaHistoria") $selectedAux = 10;
		if(opcaoHistoria == "bibliotecaHistorias") $selectedAux = 11;
		$idCenasHistoria.push($idCenaSelec); //idCena seleccionada
		getCenaById($idCenaSelec, "adicionaNovaCenaSeleccionadaHistoria");
		$('#terminarBibliotecaCenasButton').attr("disabled", false);
		removeTabsRepeticao($selectedAux);
		aux = 13;
		//Se a cena tiver pontuação adiciono-a à lista de cenas com pontuação
		if($pontuacaoCena == 1)
			$idCenasPontuacao.push($idCenaSelec);
	});

}
/*********************************************
 Função referente à tab "Escolher Actividade"
**********************************************/
function botoesDadosSessaoActividade(){
console.log("botoesDadosSessaoActividade: " + $selected);
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorActividadeButton').parent().parent().parent().attr('id'));
	//se for para alterar a cena
	if($alterarCena){
		$('#seguinteActividadeButton').attr('disabled', false);	
		if($tipoActividade == "Gesto"){
console.log("gesto");
			opcaoActividade = "Gesto";
//			$selected = 15;
//			$selected++;
			$selected = setSelected() - 1;
console.log("$selected = setSelected(); " + $selected);
			//$selected++;
			aux = 20;
			bindButtonSeguinte();
		} else {
console.log("questionario");
			opcaoActividade = "Questionário";
//			$selected = 15;
//			$selected = setSelected();
//			$selected++;
			$selected = setSelected() - 1;
console.log("$selected = setSelected(); " + $selected);
			aux = 23;
			bindButtonSeguinte();
		}
	}
		
	$('#anteriorActividadeButton').click(function(){
		bindButtonAnterior();
	});

	$('#seguinteActividadeButton').click(function(){
		bindButtonSeguinte();				
	});

	$('#gestoButton').bind('click', function(){
		if(opcaoActividade == "Questionário"){
			dialogBoxAvisoMudarActividade();	
			$('#simDialogMudarTipoActividadeAviso').click(function() { 
				opcaoActividade = "Gesto";
				$idTipoActividadeCena = [];
				$selected = setSelected();
				removeTabs();
				aux = 20;
console.log("1 - opcaoActividade: " + opcaoActividade);
				bindButtonSeguinte();
				$('#simDialogMudarTipoActividadeAviso').unbind();
				$.unblockUI();
			}); 
		} else {
			opcaoActividade = "Gesto";
			aux = 20;
console.log("2 - opcaoActividade: " + opcaoActividade);
			bindButtonSeguinte();
		}
		$('#seguinteActividadeButton').attr('disabled', false);
		$('#questionarioButton').css('border', '2px outset buttonface');
		$('#gestoButton').css('border', '2px outset #0191d8');
	});

	$('#questionarioButton').bind('click', function(){
		if(opcaoActividade == "Gesto"){
			dialogBoxAvisoMudarActividade();
			$('#simDialogMudarTipoActividadeAviso').click(function() { 
				$selected = setSelected();
				removeTabs();
				aux = 23;
console.log("3 - opcaoActividade: " + opcaoActividade);
				opcaoActividade = "Questionário";
				$idTipoActividadeCena = [];
				bindButtonSeguinte();

				$('#simDialogMudarTipoActividadeAviso').unbind();
				$.unblockUI();
			});
		}
		else {
			opcaoActividade = "Questionário";
console.log("4 - opcaoActividade: " + opcaoActividade);
			aux = 23;
			bindButtonSeguinte();
		}
		$('#seguinteActividadeButton').attr('disabled', false);
		$('#gestoButton').css('border', '2px outset buttonface');
		$('#questionarioButton').css('border', '2px outset #0191d8');
	});
}

/*********************************************
 Função referente à tab "Escolher Gesto"
**********************************************/
var $countGestos = 1;
var $nrGestosEscolhidos = 1;
var $gestosNrVezes = [];
function botoesDadosSessaoGesto(){
console.log("botoesDadosSessaoGesto");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorGestoButton').parent().parent().parent().attr('id'));
	resizeFunctionSessaoGesto();
	//se for para alterar a cena preenche os gestos já seleccionados
	if($alterarCena){
		//preenche os dados
		preencheGestosExistentesNaCena();
		$('#seguinteGestoButton').attr('disabled', false);
		//para garantir que grava os gestos
		//$("#gestosSorteable").click();
	} else{
		$("#gestosSorteable").append('<p> Não existem gestos seleccionados nesta cena </p>');
	}

	$('#anteriorGestoButton').click(function(){
		bindButtonAnterior();
	});

	$('#seguinteGestoButton').click(function(){
		aux = 26;
		bindButtonSeguinte();				
	});

	$('#listaGestosExistentes').selectFilter({
		name: 'escolheGesto'
        });

	cloneGestos = $("#listaGestosExistentesAux").children().clone();

	$('#listaGestosExistentes').change(function (){
		if($('#listaGestosExistentes option:selected').val() != 0){
			$('#escolherGestoButton').attr("disabled", false);
		}
	});
	//duplo clique para adicionar um gesto à lista de gesto escolhidos
	$('#listaGestosExistentes').dblclick(function(){
		$('#escolherGestoButton').click();
	});

	 $("#gestosSorteable").sortable({
			revert: true,
			update: function(event, ui) {
				$("#gestosSorteable").click();				
	        	}
	    });
	$( "ul, li" ).disableSelection();
	
	$('#escolherGestoButton').click(function() {
		$('#inputboxes').empty();
		$('#inputboxes').append('<div id="titleDialogPedirNrGestos"><h3 id="titleNrGestos"> Número de Gestos</h3></div>');
		$('#inputboxes').append('<div id="pedirNumeroGestosDiv">');
		$('#pedirNumeroGestosDiv').append('<br><p id="mensagemAlternativa">Insira o número de vezes que deseja que o gesto seja repetido:</p>');
		$('#listaGestosExistentes option:selected').each(function(){
			var $gesto = $(this).text();
			var $id = $(this).val();
			
			$('#pedirNumeroGestosDiv').append('<div><p id="numeroGestosPedidoP">' + $gesto + ':&nbsp;&nbsp;<input id="' + $nrGestosEscolhidos + '" type="number" min="1" value="1"/></p></div>');
			$('#' + $nrGestosEscolhidos).css('width', '50px');
			$('#' + $nrGestosEscolhidos).bind('input', function(){
				for(var i = 1 ; i < $nrGestosEscolhidos ; i++){
console.log('#' + i + " - " + Number($('#' + i).val()));
					if(Number($('#' + i).val()))
						$('#okDialogPedirNrGestos').attr("disabled", false);
					else
						$('#okDialogPedirNrGestos').attr("disabled", true);
				}
			});
			$nrGestosEscolhidos++;
		});
		$('#inputboxes').append('</div>');
		$.blockUI({ 
			message: $('#dialogPedirNrGestos'), 
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

 		$('#okDialogPedirNrGestos').click(function() { 
			$gestosNrVezes = [];
	 		for(var i = 1 ; i < $nrGestosEscolhidos ; i++){
				$gestosNrVezes.push(Number($('#' + i).val()));
			}
			$nrGestosEscolhidos = 1;
			botoesDadosSessaoGestoAdicionaGesto();
			$('#okDialogPedirNrGestos').unbind();
			$.unblockUI();
		}); 

		$('#cancelarDialogPedirNrGestos').click(function() {
			$nrGestosEscolhidos = 1;
			$('#cancelarDialogPedirNrGestos').unbind('click');
			$.unblockUI(); 
		}); 
	});


	$("#gestosSorteable").bind('click', function(){
		$idTipoActividadeCena = [];
		$nrVezesGesto = [];
		$("#gestosSorteable").find('li').each(function(){
			$idTipoActividadeCena.push(Number($(this).attr('id').split('gestoEscolhido')[1]));
			$nrVezesGesto.push(Number($(this).find('.detalhesGesto').attr('name')));
		});
console.log("gestosSorteable: " + $idTipoActividadeCena);
console.log("gestosSorteable: " + $nrVezesGesto);
		if($("#gestosSorteable li").length > 0){
			$('#seguinteGestoButton').attr('disabled', false);
		} else {
			$('#seguinteGestoButton').attr('disabled', true);
		}
	});

	$("#novoGestoButton").bind('click', function(){
		var $existeGesto = false;
		$('#listaGestosExistentes option').each(function(){
			if($(this).text() == $('#input_escolheGesto').val()){
				$existeGesto = true;
			}
		});
		if(!$existeGesto){
			$opcaoGesto = "novoGesto";
			removeTabs();
			$nomeGestoSessao = $('#input_escolheGesto').val();
			aux = 21;
			bindButtonSeguinte();
		} else {
			$.blockUI({ 
				message: $('#dialogGestoExistente'), 
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
	
			$('#okDialogGestoExistente').click(function() {	
				$('#okDialogGestoExistente').unbind();
		   		 $.unblockUI();  
			});	
		}
	});
}

/************************************
 Função referente à tab "Nome Gesto"
*************************************/
function botoesDadosSessaoNomeGesto() {
console.log("botoesDadosSessaoNomeGesto");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorNomeGestoButton').parent().parent().parent().attr('id'));
	$("#nomeGesto").val($nomeGestoSessao);
	//no caso de se estar a alterar um gesto o botão seguinte fica enable
	if($('#nomeGesto').val() != ''){
		$('#seguinteNomeGestoButton').attr("disabled", false);
	}

	$('#anteriorNomeGestoButton').click(function(){
		bindButtonAnterior();
	});

	$('#seguinteNomeGestoButton').click(function(){
		var $verificaGesto = verificaGestoByNome($nomeGestoSessao);
		if($verificaGesto == "Não existem gestos com este nome."){
			aux = 22;
			bindButtonSeguinte();		
		} else {
			$.blockUI({ 
				message: $('#dialogGestoExistente'), 
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
	
			$('#okDialogGestoExistente').click(function() {	
				$('#okDialogGestoExistente').unbind();
		   		 $.unblockUI();  
			});				
		}				
	});

	$("#nomeGesto").focus();
	$("#nomeGesto").on('input', function() {
		if($('#nomeGesto').val() != ''){
			$('#seguinteNomeGestoButton').attr("disabled", false);
		} else {
			$('#seguinteNomeGestoButton').attr("disabled", true);
		}
		$nomeGestoSessao = $('#nomeGesto').val();
console.log("$nomeGestoSessao: " + $nomeGestoSessao);
	});
}

/*******************************************************
 Função referente à tab "Número de Repetições do Gesto"
********************************************************/
function botoesDadosSessaoNrVezesGesto() {
console.log("botoesDadosSessaoNrVezesGesto");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorNrVezesGestoButton').parent().parent().parent().attr('id'));
	$("#nrVezesGesto").val($nrVezesGestoSessao);
	//no caso de se estar a alterar um gesto o botão seguinte fica enable
	if($('#nrVezesGesto').val() != ''){
		$('#seguinteNrVezesGestoButton').attr("disabled", false);
	}

	$('#anteriorNrVezesGestoButton').click(function(){
		bindButtonAnterior();
	});

	$('#seguinteNrVezesGestoButton').click(function(){
		//aux = 19;
		//bindButtonSeguinte();				
		$idGestoSessao = adicionaNovoGesto($nomeGestoSessao, $nrVezesGestoSessao);
		if(Number($idGestoSessao)){
			$idTipoActividadeCena.push($idGestoSessao);
			removeTabsRepeticao($selected - 2);
			aux = 20;
			adicionaNovoGestoListaGestos();
		} else {
			alert("Não foi possível adicionar o gesto");
			removeTabsRepeticao($selected - 2);
			aux = 20;
		}
		$('#input_escolheGesto').val('');
		$('#input_escolheGesto').keyup();
	});

	$("#nrVezesGesto").focus();
	$("#nrVezesGesto").on('input change', function() {
		if($('#nrVezesGesto').val() != '' && Number($('#nrVezesGesto').val())){
			$('#seguinteNrVezesGestoButton').attr("disabled", false);
		} else {
			$('#seguinteNrVezesGestoButton').attr("disabled", true);
		}
		$nrVezesGestoSessao = $('#nrVezesGesto').val();
console.log("$nrVezesGestoSessao: " + $nrVezesGestoSessao);
	});
}

/************************************************
 Função referente à tab "Escolher Questionários"
*************************************************/
var $countQuestionarios = 1;
function botoesDadosSessaoQuestionario(){
console.log("botoesDadosSessaoQuestionario");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorQuestionarioButton').parent().parent().parent().attr('id'));
	resizeFunctionSessaoQuestionario();
	//se for para alterar a cena preenche os gestos já seleccionados
	if($alterarCena){
		//preenche os dados
		preencheQuestionariosExistentesNaCena();
		$('#seguinteQuestionarioButton').attr('disabled', false);
	} else{
		$("#questionariosSorteable").append('<p> Não existem questionários seleccionados nesta cena </p>');
	}

	$('#anteriorQuestionarioButton').click(function(){
		bindButtonAnterior();
	});

	$('#seguinteQuestionarioButton').click(function(){
		aux = 26;
		bindButtonSeguinte();				
	});

	$('#listaQuestionariosExistentes').selectFilter({
		name: 'escolheQuestionario'
        });

	cloneQuestionarios = $("#listaQuestionariosExistentesAux").children().clone();

	$('#listaQuestionariosExistentes').change(function (){
		if($('#listaQuestionariosExistentes option:selected').val() != 0){
			$('#escolherQuestionarioButton').attr("disabled", false);
		}
	});

	 $("#questionariosSorteable").sortable({
			revert: true,
			update: function(event, ui) {
				$("#questionariosSorteable").click();				
	        	}
	    	});
	$( "ul, li" ).disableSelection();

	//duplo clique para adicionar um gesto à lista de gesto escolhidos
	$('#listaQuestionariosExistentes').dblclick(function(){
		$('#escolherQuestionarioButton').click();
	});

	$("#escolherQuestionarioButton").bind('click', function() {
		if($("#questionariosSorteable li").length == 0)
			$("#questionariosSorteable").empty();
		$('#listaQuestionariosExistentes option:selected').each(function(){
			var $idQuestionario = $(this).val();
			$("#questionariosSorteable").append('<li class="ui-state-default liQuestionarios" id="' + $countQuestionarios + 'questionarioEscolhido' + $idQuestionario + '">' + '<div id="liQuestionariostexto">' + $(this).text() + '</div><div id="liQuestionariosButton"><img id="' + $countQuestionarios + 'questionarioEscolhidoButton' + $idQuestionario + '" src="../imagens/remover.png" width="35px" align="right"/><img id="' + $countQuestionarios + 'detalhesQuestionarioEscolhidoButton' + $idQuestionario + '" src="../imagens/ver.png" width="35px" align="right" style="padding-right:2px"></div></li>');
			$("#questionariosSorteable").click();
 
			$('#' + $countQuestionarios + 'questionarioEscolhidoButton' + $idQuestionario).bind('click', function() {
				var $count = $(this).attr('id').split('questionarioEscolhidoButton')[0];
				var $idQuestionarioRemover = $(this).attr('id').split('questionarioEscolhidoButton')[1];
				var $questionarioRemover = $count + 'questionarioEscolhido' + $idQuestionarioRemover;
				$('li#'+ $questionarioRemover).remove(); 
				$("#questionariosSorteable").click();
				if($idTipoActividadeCena.length == 0){
					$("#questionariosSorteable").append('<p> Não existem questionários seleccionados nesta cena </p>');		
				}
			});

			$('#' + $countQuestionarios + 'detalhesQuestionarioEscolhidoButton' + $idQuestionario).bind('click', function() {
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
						top: '20%'
					}
				});
		
				$('#okDialogPerguntasQuestionario').click(function() {	
					$('#okDialogPerguntasQuestionario').unbind();
			   		 $.unblockUI();  
				});
			});

			$countQuestionarios++;
		});
	});

	$("#questionariosSorteable").bind('click', function(){	
		$idTipoActividadeCena = [];
		$("#questionariosSorteable").find('li').each(function(){
			$idTipoActividadeCena.push(Number($(this).attr('id').split('questionarioEscolhido')[1]));
		});
		if($("#questionariosSorteable li").length > 0){
			$('#seguinteQuestionarioButton').attr('disabled', false);
		} else {
			$('#seguinteQuestionarioButton').attr('disabled', true);
		}
console.log("$idTipoActividadeCena: " + $idTipoActividadeCena);
	});

	$("#novoQuestionarioButton").bind('click', function(){
		var $existeQuestionario = false;
		$('#listaQuestionariosExistentes option').each(function(){
			if($(this).text() == $('#input_escolheQuestionario').val()){
				$existeQuestionario = true;
			}
		});
		if(!$existeQuestionario){
			$opcaoQuestionario = "novoQuestionario";
			removeTabs();
			$nomeQuestionarioSessao = $('#input_escolheQuestionario').val();
			aux = 24;
			bindButtonSeguinte();
		} else {
			$.blockUI({ 
				message: $('#dialogQuestionarioExistente'), 
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
	
			$('#okDialogQuestionarioExistente').click(function() {	
				$('#okDialogQuestionarioExistente').unbind();
		   		 $.unblockUI();  
			});
		}
	});
}
/*******************************************
 Função referente à tab "Nome Questionário"
********************************************/
function botoesDadosSessaoNomeQuestionario(){
console.log("botoesDadosSessaoNomeQuestionario");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorNomeQuestionarioButton').parent().parent().parent().attr('id'));
	$("#nomeQuestionario").val($nomeQuestionarioSessao);
	//no caso de se estar a alterar um questionario o botão seguinte fica enable
	if($('#nomeQuestionario').val() != ''){
		$('#seguinteNomeQuestionarioButton').attr("disabled", false);
	}

	$('#anteriorNomeQuestionarioButton').click(function(){
		bindButtonAnterior();
	});

	$('#seguinteNomeQuestionarioButton').click(function(){
		var $verificaQuestionario = verificaQuestionarioByNome($nomeQuestionarioSessao);
		if($verificaQuestionario == "Não existem questionários com este nome."){
			aux = 25;
			bindButtonSeguinte();			
		} else {
			$.blockUI({ 
				message: $('#dialogQuestionarioExistente'), 
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
	
			$('#okDialogQuestionarioExistente').click(function() {	
				$('#okDialogQuestionarioExistente').unbind();
		   		 $.unblockUI();  
			});				
		}
	});

	$("#nomeQuestionario").focus();
	$("#nomeQuestionario").on('input', function() {
		if($('#nomeQuestionario').val() != ''){
			$('#seguinteNomeQuestionarioButton').attr("disabled", false);
		} else {
			$('#seguinteNomeQuestionarioButton').attr("disabled", true);
		}
		$nomeQuestionarioSessao = $('#nomeQuestionario').val();
console.log("$nomeQuestionarioSessao: " + $nomeQuestionarioSessao);
	});
}

/********************************************
 Função referente à tab "Escolher Perguntas"
*********************************************/
var $countPerguntas = 1;
function botoesDadosSessaoPerguntasQuestionario(){
console.log("botoesDadosSessaoPerguntasQuestionario");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorPerguntasQuestionarioButton').parent().parent().parent().attr('id'));
	resizeFunctionSessaoPerguntasQuestionario();
	$("#perguntasSorteable").append('<p> Não existem perguntas seleccionados neste questionário </p>');
	$('#anteriorPerguntasQuestionarioButton').click(function(){
		bindButtonAnterior();
	});

	$('#seguintePerguntasQuestionarioButton').click(function(){
		var $stringIdPerguntasQuestionarioSessao = '';
		$.each($idPerguntasQuestionarioSessao, function (index, value){
			$stringIdPerguntasQuestionarioSessao += value + ", ";
		});
		$idQuestionarioSessao = adicionaNovoQuestionario($nomeQuestionarioSessao, $idPerguntasQuestionarioSessao);
		if(Number($idQuestionarioSessao)){
			$idTipoActividadeCena.push($idQuestionarioSessao);
			removeTabsRepeticao($selected - 2);
			aux = 23;
			adicionaNovoQuestionarioListaQuestionarios();
		} else {
			alert("Não foi possível adicionar o questionário");
			removeTabsRepeticao($selected - 2);
			aux = 23;
		}
		$('#input_escolheQuestionario').val('');
		$('#input_escolheQuestionario').keyup();		
	});

	$('#listaPerguntasExistentesQuestionario').selectFilter({
		name: 'escolhePerguntasQuestionario'
        });

	clonePerguntasQuestionario = $("#listaPerguntasExistentesQuestionarioAux").children().clone();

	$('#listaPerguntasExistentesQuestionario').change(function (){
		if($('#listaPerguntasExistentesQuestionario option:selected').val() != 0){
			$('#escolherPerguntaQuestionarioButton').attr("disabled", false);
		}
	});

	 $("#perguntasSorteable").sortable({
			revert: true,
			update: function(event, ui) {
				$("#perguntasSorteable").click();				
	        	}	
	    	});
	$( "ul, li" ).disableSelection();

	//duplo clique numa pergunta para a adicionar à sessão
	$('#listaPerguntasExistentesQuestionario').dblclick(function(){
		$('#escolherPerguntaQuestionarioButton').click();
	});

	$("#escolherPerguntaQuestionarioButton").bind('click', function() {
		if($("#perguntasSorteable li").length == 0)
			$("#perguntasSorteable").empty();
		$('#listaPerguntasExistentesQuestionario option:selected').each(function(){
			var $idPergunta = $(this).val();
			var $questao = $(this).text();
			$("#perguntasSorteable").append('<li class="ui-state-default liPerguntas" id="' + $countPerguntas + 'perguntaEscolhida' + $idPergunta + '">' + '<div id="liPerguntastexto">' + $questao + '</div><div id="liPerguntasButton"><img id="' + $countPerguntas + 'perguntaButton' + $idPergunta + '" src="../imagens/remover.png" width="35px" align="right"/></div></li>');

			$("#perguntasSorteable").click();

			$('#' + $countPerguntas + 'perguntaButton' + $idPergunta).bind('click', function() {
				var $count = $(this).attr('id').split('perguntaButton')[0];
				var $idPerguntaRemover = $(this).attr('id').split('perguntaButton')[1];
				var $perguntaRemover = $count + 'perguntaEscolhida' + $idPerguntaRemover;
				$('li#'+ $perguntaRemover).remove(); 
				$("#perguntasSorteable").click();
			});
			$countPerguntas++;
		});
	});

	$("#perguntasSorteable").bind('click', function(){
		$idPerguntasQuestionarioSessao = [];
		$("#perguntasSorteable").find('li').each(function(){
			$idPerguntasQuestionarioSessao.push(Number($(this).attr('id').split('perguntaEscolhida')[1]));
		});
		if($("#perguntasSorteable li").length > 0){
			$('#seguintePerguntasQuestionarioButton').attr('disabled', false);
		} else {
			$('#seguintePerguntasQuestionarioButton').attr('disabled', true);
		}
console.log($idPerguntasQuestionarioSessao);
	});

	$("#novaPerguntaQuestionarioButton").bind('click', function(){
		var $existePergunta = false;
		$('#listaPerguntasExistentesQuestionario option').each(function(){
			if($(this).text() == $('#input_escolhePerguntasQuestionario').val()){
				$existePergunta = true;
			}
		});
		if(!$existePergunta){
			if($("#perguntasSorteable li").length == 0)
				$("#perguntasSorteable").empty();
			var $idPergunta = adicionaNovaPergunta($('#input_escolhePerguntasQuestionario').val());
			if(Number($idPergunta)){
				$("#listaPerguntasExistentesQuestionario").append('<option id=' + $idPergunta + ' selected>' + $('#input_escolhePerguntasQuestionario').val() + '</option>');
				$("#listaPerguntasExistentesQuestionario").html($("#listaPerguntasExistentesQuestionario option").sort(function (a, b) {
		  			return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
				})); 
				$("#listaPerguntasExistentesQuestionarioAux").append('<option id=' + $idPergunta + ' selected>' + $('#input_escolhePerguntasQuestionario').val() + '</option>');
				$("#listaPerguntasExistentesQuestionarioAux").html($("#listaPerguntasExistentesQuestionarioAux option").sort(function (a, b) {
		    			return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
				})); 
				clonePerguntasQuestionario = $("#listaPerguntasExistentesQuestionarioAux").children().clone();
				$("#perguntasSorteable").append('<li class="ui-state-default liPerguntas" id="' + $countPerguntas + 'perguntaEscolhida' + $idPergunta + '">' + '<div id="liPerguntastexto">' + $('#input_escolhePerguntasQuestionario').val() + '</div><div id="liPerguntasButton"><img id="' + $countPerguntas + 'perguntaButton' + $idPergunta + '" src="../imagens/remover.png" width="35px" align="right"/></div></li>');
				$("#perguntasSorteable").click();
		console.log($countPerguntas + 'perguntaEscolhida' + $idPergunta);

				$('#' + $countPerguntas + 'perguntaButton' + $idPergunta).bind('click', function() {
					var $count = $(this).attr('id').split('perguntaButton')[0];
					var $idPerguntaRemover = $(this).attr('id').split('perguntaButton')[1];
					var $perguntaRemover = $count + 'perguntaEscolhida' + $idPerguntaRemover;
					$('li#'+ $perguntaRemover).remove(); 
					$("#perguntasSorteable").click();
				});
				$countPerguntas++;
				$('#input_escolhePerguntasQuestionario').val('');
				$('#input_escolhePerguntasQuestionario').keyup();
			} else {
				alert("Não foi possível adicionar a questão");
			}
		} else {
			$.blockUI({ 
				message: $('#dialogPerguntaExistente'), 
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
	
			$('#okDialogPerguntaExistente').click(function() {	
				$('#okDialogPerguntaExistente').unbind();
		   		 $.unblockUI();  
			});	
		}
	});
	
}			

/***************************************************
 Função referente à tab "Escolher Reforço Positivo"
****************************************************/
function botoesDadosSessaoReforcoPositivo(){
console.log("botoesDadosSessaoReforcoPositivo");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorReforcoPositivoButton').parent().parent().parent().attr('id'));
	//se a variavel $urlReforcoPositivoThumb estiver vazia, quer dizer que estamos
	//a criar uma nova cena, por isso o thumbnail do reforço fica com uma imagem
	//a dizer que não existe uma imagem associada
	if($urlReforcoPositivoThumb == ''){
		$('#thumbnailReforcoPositivo').attr('src', "../imagens/noImage.gif");
		$modificouReforcoPositivo = false;
	} else{
		$('#thumbnailReforcoPositivo').attr('src', $urlReforcoPositivoThumb);
		$('#seguinteReforcoPositivoButton').attr("disabled", false);
	}

	$('#anteriorReforcoPositivoButton').click(function(){
		bindButtonAnterior();
	});

	$('#seguinteReforcoPositivoButton').click(function(){
		if($alterarCena && !$modificouReforcoPositivo){
			//copio o thumbnail e o reforço para as pastas temp respectiva
			var $temp = $urlReforcoPositivoThumb.split("/");
			var $ficheiro = $temp[$temp.length-1];
			$urlReforcoPositivoThumb = thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "thumbsReforcoPositivo", "tempFolderThumbsReforcoPositivo", $ficheiro, 'alterar');
console.log("$mimeReforcoPositivo$mimeReforcoPositivo: " + $mimeReforcoPositivo);
			if($mimeReforcoPositivo == 'video'){
				var $temp = $urlReforcoPositivo.split("/");
				var $ficheiro = $temp[$temp.length-1];
				thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "reforcoPositivo", "tempFolderReforcoPositivo", $ficheiro + '.mp4', 'alterar');
				$urlReforcoPositivo = thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "reforcoPositivo", "tempFolderReforcoPositivo", $ficheiro + '.webm', 'alterar');

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
				var $temp = $urlReforcoPositivo.split("/");
				var $ficheiro = $temp[$temp.length-1];
				$urlReforcoPositivo = thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "reforcoPositivo", "tempFolderReforcoPositivo", $ficheiro, 'alterar');
			}
console.log("sadasdasdasdasdasss: " + $urlReforcoPositivo);		
		}
console.log("$urlReforcoPositivo: " + $urlReforcoPositivo);
		aux = 27;
		bindButtonSeguinte();				
	});

	$('#progressoReforcoPositivo').hide();
	$('#progressoReforcoPositivoUploadBar').hide();

	$('#adicionarReforcoPositivoButton').click(function(){
		$('#reforcoPositivo').click();
		$('#progressoReforcoPositivoUploadBar').hide();
	});
	
	$('#reforcoPositivo').change(function () {
		var $fd = new FormData(document.getElementById('retorno'));
		//extensao		
		var ext = this.value.match(/\.(.+)$/)[1];
		//pedido http
		var request = new XMLHttpRequest();
		$target = $('#progressoReforcoPositivoUploadBar');
		$targetLabel = $('#progressoReforcoPositivo');
		request.upload.addEventListener('progress', uploadProgress, false);
 	
  		//request.open("POST", "../server/php/uploadFiles.php?folder=reforcoPositivo");
  		request.open("POST", "../server/php/uploadFiles.php?folderFile=tempFolderReforcoPositivo&&FolderThumb=tempFolderThumbsReforcoPositivo");

  		request.send($fd);
		request.onreadystatechange = function(){
			if (request.readyState==4 && request.status==200) {
		  		var rsp = request.responseText;
		  		var $cont = rsp.split('@');
				if($cont.length == 1){
					//alert("O ficheiro que escolheu não é suportado. Escolha outro.");
					$.blockUI({ 
						message: $('#dialogThumbnailNaoSuportado'), 
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
					$('#okDialogThumbnailNaoSuportado').click(function() { 
						$('#seguinteReforcoPositivoButton').attr("disabled", true);
						$('#progressoReforcoPositivoUploadBar').hide();
						$('#progressoReforcoPositivo').empty();
						$('#okDialogThumbnailNaoSuportado').unbind();
						$.unblockUI();  
					});
				} 
 				else {
			  		$urlReforcoPositivo = $.trim($cont[0]);
			  		$mimeReforcoPositivo = $.trim($cont[1]);
			  		$urlReforcoPositivoThumb = $.trim($cont[2]);
					$('#seguinteReforcoPositivoButton').attr("disabled", false);
	console.log("$urlReforcoPositivoThumb: " + $urlReforcoPositivoThumb);
					$('#thumbnailReforcoPositivo').attr('src', $urlReforcoPositivoThumb);
					$modificouReforcoPositivo = true;
				}
			}
		}
        });
}
/***************************************************
 Função referente à tab "Escolher Reforço Negativo"
****************************************************/
function botoesDadosSessaoReforcoNegativo(){
console.log("botoesDadosSessaoReforcoNegativo");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorReforcoNegativoButton').parent().parent().parent().attr('id'));
	//se a variavel $urlReforcoNegativoThumb estiver vazia, quer dizer que estamos
	//a criar uma nova cena, por isso o thumbnail do reforço fica com uma imagem
	//a dizer que não existe uma imagem associada
	if($urlReforcoNegativoThumb == ''){
		$('#thumbnailReforcoNegativo').attr('src', "../server/files/tempFolderThumbsReforcoNegativo/noImage.gif");
		$urlReforcoNegativoThumb = "../server/files/tempFolderThumbsReforcoNegativo/noImage.gif";
		$modificouReforcoNegativo = false;
		$urlReforcoNegativo = '';
	} else{
		$('#thumbnailReforcoNegativo').attr('src', $urlReforcoNegativoThumb);
		$('#seguinteReforcoNegativoButton').attr("disabled", false);
	}

	$('#anteriorReforcoNegativoButton').click(function(){
		bindButtonAnterior();
	});

	$('#seguinteReforcoNegativoButton').click(function(){
console.log("$mimeReforcoNegativo$mimeReforcoNegativo: " + $mimeReforcoNegativo);
		if($alterarCena && !$modificouReforcoNegativo && $mimeReforcoNegativo != ''){
			//copio o thumbnail e o reforço para as pastas temp respectiva
			var $temp = $urlReforcoNegativoThumb.split("/");
			var $ficheiro = $temp[$temp.length-1];
			$urlReforcoNegativoThumb = thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "thumbsReforcoNegativo", "tempFolderThumbsReforcoNegativo", $ficheiro, 'alterar');
			if($mimeReforcoNegativo == 'video'){
				var $temp = $urlReforcoNegativo.split("/");
				var $ficheiro = $temp[$temp.length-1];
				thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "reforcoNegativo", "tempFolderReforcoNegativo", $ficheiro  + '.mp4', 'alterar');
				$urlReforcoNegativo = thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "reforcoNegativo", "tempFolderReforcoNegativo", $ficheiro  + '.webm', 'alterar');

				var $arrayIntro = $urlReforcoNegativo.split('.');
				var $intro = '..';
				var i = 0;
				while (i < $arrayIntro.length-1){
					if($arrayIntro[i] != '')
						$intro = $intro + $arrayIntro[i];
					i++;
				}
				$urlReforcoNegativo = $intro;
	console.log("sadasdasdasdasdassdds: " + $urlReforcoNegativo);
			} else if($mimeReforcoNegativo == 'imagem'){
				var $temp = $urlReforcoNegativo.split("/");
				var $ficheiro = $temp[$temp.length-1];
				$urlReforcoNegativo = thumbnailRequest(null, 'saveFile', $nomeCenaAntigo, "reforcoNegativo", "tempFolderReforcoNegativo", $ficheiro, 'alterar');
			}
console.log("urlReforcoNegativosçakçlaksçlka: " + $urlReforcoNegativo);
		}
console.log("$urlReforcoNegativo: " + $urlReforcoNegativo);
		aux = 28;
		bindButtonSeguinte();				
	});

	$('#progressoReforcoNegativo').hide();
	$('#progressoReforcoNegativoUploadBar').hide();

	$('#adicionarReforcoNegativoButton').click(function(){
		$('#reforcoNegativo').click();
		$('#progressoReforcoNegativoUploadBar').hide();
	});
	
	$('#reforcoNegativo').change(function () {
		var $fd = new FormData(document.getElementById('retornoN'));
		//extensao		
		var ext = this.value.match(/\.(.+)$/)[1];
		//pedido http
		var request = new XMLHttpRequest();
		$target = $('#progressoReforcoNegativoUploadBar');
		$targetLabel = $('#progressoReforcoNegativo');
		request.upload.addEventListener('progress', uploadProgress, false);
 	
  		//request.open("POST", "../server/php/uploadFiles.php?folder=reforcoNegativo");
		request.open("POST", "../server/php/uploadFiles.php?folderFile=tempFolderReforcoNegativo&&FolderThumb=tempFolderThumbsReforcoNegativo");
  		request.send($fd);
		request.onreadystatechange = function(){
			if (request.readyState==4 && request.status==200) {
		  		var rsp = request.responseText;
		  		var $cont = rsp.split('@');
				if($cont.length == 1){
					//alert("O ficheiro que escolheu não é suportado. Escolha outro.");
					$.blockUI({ 
						message: $('#dialogThumbnailNaoSuportado'), 
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
					$('#okDialogThumbnailNaoSuportado').click(function() { 
						$('#seguinteReforcoNegativoButton').attr("disabled", true);
						$('#progressoReforcoNegativoUploadBar').hide();
						$('#progressoReforcoNegativo').empty();
						$('#okDialogThumbnailNaoSuportado').unbind();
						$.unblockUI();  
					});
				} 
 				else {
			  		$urlReforcoNegativo = $.trim($cont[0]);
			  		$mimeReforcoNegativo = $.trim($cont[1]);
console.log("$mimeReforcoNegativo: " + $mimeReforcoNegativo);
			  		$urlReforcoNegativoThumb = $.trim($cont[2]);	
	console.log("$urlReforcoNegativoThumb: " + $urlReforcoNegativoThumb);
					$('#thumbnailReforcoNegativo').attr('src', $urlReforcoNegativoThumb);
					$modificouReforcoNegativo = true;
					$('#removerReforcoNegativoButton').attr("disabled", false);
					$('#progressoReforcoNegativoUploadBar').hide();
					$('#progressoReforcoNegativo').empty();
				}

		  		
			}
		}
        });

	$('#removerReforcoNegativoButton').click(function(){
		$mimeReforcoNegativo = '';
		$('#thumbnailReforcoNegativo').attr('src', "../server/files/tempFolderThumbsReforcoNegativo/noImage.gif");
		$urlReforcoNegativoThumb = "../server/files/tempFolderThumbsReforcoNegativo/noImage.gif";
		$urlReforcoNegativo = '';
		$('#removerReforcoNegativoButton').attr("disabled", true);
	});
}

/********************************************
 Função referente à tab "Repetições da Cena"
*********************************************/
function botoesDadosSessaoRepeticaoCena(){
console.log("botoesDadosSessaoRepeticaoCena");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorRepeticaoCenaButton').parent().parent().parent().attr('id'));
	$('#nrVezesCena').val($nrVezesCena);

	$('#anteriorRepeticaoCenaButton').click(function(){
		bindButtonAnterior();
	});

	$('#seguinteRepeticaoCenaButton').click(function(){
console.log("$nrVezesCena: " + $nrVezesCena);
		aux = 29;
		bindButtonSeguinte();				
	});

	//nrVezesCena
	$("#nrVezesCena").focus();
	$("#nrVezesCena").on('input change', function() {
		if($('#nrVezesCena').val() != '' && Number($('#nrVezesCena').val())){
			$('#seguinteRepeticaoCenaButton').attr("disabled", false);
		} else {
			$('#seguinteRepeticaoCenaButton').attr("disabled", true);
		}
		$nrVezesCena = $('#nrVezesCena').val();
console.log("$nrVezesCena: " + $nrVezesCena);
	});
}

/*******************************************
 Função referente à tab "Pontuação da Cena"
********************************************/
function botoesDadosSessaoPontuacao(){
console.log("botoesDadosSessaoPontuacao");
	//para calcular o tamanho da area de conteudos desta tab
	formatWindow($('#anteriorPontuacaoButton').parent().parent().parent().attr('id'));
	if($pontuacaoCena == 0){
		$('#naoPontuacao').click();		
	} else {
		$('#simPontuacao').click();
	}

	$('#anteriorPontuacaoButton').click(function(){
		bindButtonAnterior();
	});

	$('#seguintePontuacaoButton').click(function(){
        $('#cenaBibliotecaButton').css('border', '2px outset buttonface');
        $('#novaCenaButton').css('border', '2px outset buttonface');
console.log("opcaoHistoria: " + opcaoHistoria);
		if(opcaoHistoria == "novaHistoria") $selectedAux = 10;
		if(opcaoHistoria == "bibliotecaHistorias") $selectedAux = 11;
		removeTabsRepeticao($selectedAux);
		//aux = 14;

console.log("$pontuacaoCena: " + $pontuacaoCena);
		//tenho que guardar os dados da cena criada até aqui
		$contemCenas = true;
        $.blockUI({ message: "<div sytle='text-align:center'><img src='../imagens/loading.gif'></div>\n\nA guardar os dados. Aguarde, por favor.\n Devido aos ficheiros escolhidos,\n este processo poderá demorar alguns minutos"});

        setTimeout(function(){
                guardaDadosCena();	
                $.unblockUI();
        }, 2000);
	});

	$('#simPontuacao').click(function(){ 
		$pontuacaoCena = 1;
	});

	$('#naoPontuacao').click(function(){ 
		$pontuacaoCena = 0; 
	});
}
