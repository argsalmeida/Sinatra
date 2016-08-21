/*************************************
* Ficheiro que contem as funcoes     *
* referentes a listas.html  	     *
* Este ficheiro contem o que é 	     *
* referente as sessoes a realizar    *
**************************************/
//id do terapeuta que fez o login
var $idTerapeutaLogin = 0;

var $listaTabs = null;
var $listaTabsSelected = 0;
var $tabelaSessoes = null;
var $tabelaHistorico = null;
var $tabelaTerapeutas = null;
var $tabelaCriancas = null;

//inicializacao dos elementos
$(document).ready(function(e){
	//LocalStorage
	if(typeof(Storage)==="undefined"){
		alert("Lamentamos, mas o seu browser nao suporta web storage...");
	} else {
		$idTerapeutaLogin = window.localStorage.getItem('idTerapeutaLogin');

		//verifica se houve um login feito
		if($idTerapeutaLogin != null){

			$listaTabs = $("#listaTabs").tabs();
			trataSessoes();
			trataHistorico();
			trataTerapeutas();
			trataCriancas();

			$listaTabsSelected = window.localStorage.getItem('listaTabsSelected');
			if($listaTabsSelected == null)
				$listaTabsSelected = 0;

			$("#listaTabs" ).tabs({ active: $listaTabsSelected });

		}else{
			alert("Tem de se autenticar para ter acesso a este conteúdo!");	
			location.href='../loginSessao.html';
		}
	}	
});

/*
 */
function trataSessoes(){
	$tabelaSessoes = $('#listaSessao').dataTable({
		"aoColumnDefs": [{ 
			"bSortable": false, 
			"aTargets": [ 4 ] 
		}],
		"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
			if(aData[3] == 'Presencial'){
				var date = new Date();
				var $currentDate = date.getFullYear() + "-"+ 
					(((date.getMonth()+1)<10?'0':'') + (date.getMonth()+1)) + "-" + 
					((date.getDate()<10?'0':'')+date.getDate())  + " " +
					((date.getHours()<10?'0':'')+date.getHours()) + ":" + 
					(date.getMinutes()<10?'0':'') +  date.getMinutes();
				if($currentDate > aData[1]){
					if(nRow.className == 'odd')
						 $(nRow).css('background-color', '#FFCCCC');
					else
						 $(nRow).css('background-color', '#FFDBDB');
				}
			} else {
				var $currentDate = getCurrentDate();
				var $dataFim = aData[1].split(' - ')[1];
				//se nao houver data de fim vai verificar se existe data de inicio
				if($dataFim == null){
					var $dataInicio = aData[1].split(' - ')[0];
					//se existir data de inicio verifica se é menor que a data corrente
					//se for muda a cor da linha
					if($dataInicio != null && $currentDate > $dataInicio){
						if(nRow.className == 'odd')
							 $(nRow).css('background-color', '#FFCCCC');
						else
							 $(nRow).css('background-color', '#FFDBDB');
					}
				} else if($currentDate > $dataFim){ //se a data de fim for menor que a data corrente
					if(nRow.className == 'odd')
						 $(nRow).css('background-color', '#FFCCCC');
					else
						 $(nRow).css('background-color', '#FFDBDB');
				}
			}
    		} 
	});

	//faz sort da tabela pela data / hora da sessao
	$tabelaSessoes.fnSort( [[1, 'asc']]);

	//faz o pedido para obter a lista de todas as sessões
	preencheSessoes();

	trataDialogsSessao();
	//trata dos botoes existentes
	setButtonsListaSessoes();

	$listaTabs.click('tabsselect', function (event, ui) {
		$listaTabsSelected = ($("#listaTabs").tabs('option', 'active'));
		window.localStorage.setItem('listaTabsSelected', $listaTabsSelected);
	});
}

function trataHistorico(){
	$tabelaHistorico = $("#listaHistorico").dataTable({
				"aoColumnDefs": [{ 
					"bSortable": false, 
					"aTargets": [ 4 ] 
				}] 
			});
	//faz sort da tabela pela data / hora da sessao
	$tabelaHistorico.fnSort( [[1, 'asc']]);

	//faz o pedido para obter a lista de todas as sessões
	preencheHistorico();

	trataDialogsHistorico();
}

function trataTerapeutas(){

	//cria a tabela
	$tabelaTerapeutas = $('#listaTerapeutas').dataTable({
		"aoColumnDefs": [{ 
			"bSortable": false, 
			"aTargets": [ 1 ] 
		}] 
	});

	//faz o pedido para obter a lista de todos os terapeutas enable
	preencheTerapeutas("listaTerapeutas");

	setButtonsListaTerapeutas();	
	setDialogsListaTerapeutas();

}

function trataCriancas(){

	$tabelaCriancas = $('#listaCriancas').dataTable({
		"aoColumnDefs": [{ 
			"bSortable": false, 
			"aTargets": [ 1, 6 ]
		}],
	});

	//faz o pedido para obter a lista de todos as criancas enable
	preencheCriancas("listaCriancas");

	setButtonsListaCriancas();
	setDialogsListaCriancas();

}
