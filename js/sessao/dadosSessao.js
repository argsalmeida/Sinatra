/**********************************************************
 * Ficheiro com as funções para inicializar as funções de *
 * dadosSessao.html 					  *
/**********************************************************/

//variavel que simbolizam as tabs
var $tabs;

//variaveis para a navegacao nas tabs
var $selected = 0;
var $selectedAux = 0;
var aux = 0; //percorre os arrays
var numberTabs = 0;

//variavel para os filtros nas listas
var cloneCriancas = null;
var cloneEtiquetasHistorias = null;
var cloneEtiquetasCenas = null;
var clonePerguntasQuestionario = null;
var cloneGestos = null;
var cloneQuestionarios = null;

//novaSessao / EditarSessao
var $modoSessao = '';
//tipo de sessao - presencial / remota
var $tipoSessao = '';

//dados da sessao
var $idSessao = 0;
var $idTerapeutaSessao = 0;
var $idCriancasSessao = [];
var $nomeCriancasSessao = [];
var $dataSessao = '';
var $horaSessao = '';
var $dataInicioSessao = '';
var $dataFimSessao = '';
var $tipoExercicioSessao = '';
var $idExercicioSessao = 0;

//dados da historia
var $idHistoria = 0;
var $idHistoriaAntiga = 0;
var $nomeHistoria = '';
var $descricaoHistoria = '';
var $imagemHistoria = '';
var $idEtiquetasHistoria = [];
var $etiquetasHistoria = []; //quando se edita uma história
var $idCenasHistoria = [];
var $versaoHistoria = '';

//dados do Jogo
var $idJogo = 0;
var $nomeJogo = '';
var $nomeJogoAntigo = '';
var $idJogos = [];

//dados da cena
var $idCena = 0;
var $idCenaAntiga = 0;
var $imagemCena = '';
var $nomeCena = '';
var $descricaoCena = '';
var $idEtiquetasCena = [];
var $etiquetasCena = [];
var $urlIntroducaoCena = '';
var $mimeIntroducaoCena = '';
var $tipoActividade = '';
var $idTipoActividadeCena = [];
var $nrVezesGesto = [];
var $versaoCena = '';
var $pontuacaoCena = 0;
var $nrVezesCena = 1;
var $idCenasPontuacao = [];

//dados dos gestos
var $idGestoSessao = 0;
var $nomeGestoSessao = '';
var $nrVezesGestoSessao = 1;
//var $idGestosSessao = [];

//dados dos questionarios
var $idQuestionarioSessao = 0;
var $nomeQuestionarioSessao = '';
var $idPerguntasQuestionarioSessao = [];
//var $idQuestionariosSessao = [];

//reforços
var $urlReforcoPositivo = '';
var $urlReforcoPositivoThumb = '';
var $mimeReforcoPositivo = '';
var $urlReforcoNegativo = '';
var $urlReforcoNegativoThumb = '';
var $mimeReforcoNegativo = '';

//variaveis auxiliares para a alteracao de historias/cenas
var $contemCenas = false;
var $alterarHistoria = false;
var $modificouImagemHistoria = false;
var $alterarCena = false;
var $modificouIntroducao = false;
var $modificouReforcoPositivo = false;
var $modificouReforcoNegativo = false;
var $nomeCenaAntigo = '';
var $nomeHistoriaAntigo = '';

//variaveis para as opcoes
var opcaoHistoria = "";
var opcaoCenas = "";
var opcaoActividade = "";
var opcaoGesto = "";
var opcaoQuestionario = "";

//para o upload de imagens, barra de progresso
var $target = null;
var $targetLabel = null;


$(document).ready(function(){
//prevenir entrar sem login
//se editar sessao
	if(typeof(Storage)==="undefined"){
			alert("Lamentamos, mas o seu browser nao suporta web storage...");
	} else {
		var $idTerapeutaLogin = window.localStorage.getItem('idTerapeutaLogin');

		//verifica se houve um login feito
		if($idTerapeutaLogin != null){
			$tabs = $('#dadosSessao')
					.tabs({
					    select: function(event, ui) {
						$selected = ui.index;
					    }
					})//jQuery ui tabs
					.scrollabletab();
			
			$idTerapeutaSessao = $idTerapeutaLogin;
			//calculos para fixar o tamanho da área de conteúdos das tabs consoante o tamanho da janela do browser
			$('#dadosSessao .ui-tabs-panel').css("height", ($('#dadosSessao').height() - $('#tabUl').height() - 19) + "px");
			$('#dadosSessao .ui-tabs-panel').css("max-height", ($('#dadosSessao').height() - $('#tabUl').height() - 19) + "px");
			$(window).resize(function(){
				$('#dadosSessao .ui-tabs-panel').css("height", ($('#dadosSessao').height() - $('#tabUl').height() - 19) + "px");
				$('#dadosSessao .ui-tabs-panel').css("max-height", ($('#dadosSessao').height() - $('#tabUl').height() - 19) + "px");
			});

			$modoSessao = window.localStorage.getItem('modoSessao');

			switch($modoSessao){
				case "editarSessao":
                    $idSessao = window.localStorage.getItem('idSessao');
                    getSessaoById($idSessao, "editarSessao");
				break;
			}

			//botão logout
			$('#logoutButton').bind('click', function () {
				window.localStorage.setItem('idTerapeutaLogin', null);
				location.href='../loginSessao.html';
			});

			//progress bar
			$("#progressbar").progressbar({
				value: false
			});

			verificaBotoes(divs[aux]);
			aux++;
			numberTabs++;
		} else{
			alert("Tem de se autenticar para ter acesso a este conteúdo!");	
			location.href='../loginSessao.html';
		}
	}	
});

/*************************************************
 Função que remove as tabs até à tab seleccionada
**************************************************/
function removeTabs(){
	while($selected+1 < numberTabs){
		//$(divs[(numberTabs-1)]).hide();
		$tabs.tabs("remove", (numberTabs-1));
		numberTabs--;
	}
	numberTabs = $tabs.tabs("length");
}

/**********************************************************
 Função que remove as tabs até à tab passada por parametro
***********************************************************/
function removeTabsRepeticao($selectedAux){
	while($selectedAux+1 < numberTabs){
		//$(divs[(numberTabs-1)]).hide();
		$tabs.tabs("remove", (numberTabs-1));
		numberTabs--;
	}
	numberTabs = $tabs.tabs("length");
}
/***********************************************************
 Função que cria a nova tab se esta ainda não existir ou
 passa para a tab seguinte se esta existir.
***********************************************************/
function bindButtonSeguinte(){

console.log("aqui1: " + aux + ' -- ' + $selected + ' -- ' + numberTabs);
	//Add new tab
	if(aux < conteudo.length){ //para nao ultrapassar o limite maximo de tabs
		//no caso de haver uma tab a seguir, o seguinte nao cria uma tab, mas passa à proxima
		if($selected == numberTabs-1){
console.log("aqui2: " + aux);
			var label = labels[aux];
		 	var content = conteudo[aux]; 
			$tabs.trigger('addTab',[label,content]);
			verificaBotoes(divs[aux]);
			aux++;
			numberTabs++;
		}
		else {
console.log("aqui3: " + aux);
			$tabs.tabs( "option", "selected", $selected+1);
		}
		//casos em que  é preciso saltar indices
		if(opcaoHistoria != "" && aux == 12)
			aux = 9; //escolher cena
		if(opcaoCenas != "" && aux == 18)
			aux = 19;
	}
}

/***********************************************************
 Função que selecciona a tab anterior à seleccionada
 actualmente
***********************************************************/
function bindButtonAnterior(){
	$selected--;
	$tabs.tabs( "option", "selected", $selected);
}

/***********************************************************
 Função que consoante o id da tab criada faz bind dos 
 elementos necessários à sua funcionalidade
***********************************************************/
function verificaBotoes(idTab){
	switch(idTab){
		case "#dadosSessaoTerapeuta":
			preencheTerapeutas("listaTerapeutasSessao");
			botoesDadosSessaoTerapeuta();
			break;
		case "#dadosSessaoCriancas":
			preencheCriancas("listaCriancasSessao");
			botoesDadosSessaoCriancas();
			break;
		case "#dadosSessaoTipoSessao":
			botoesDadosSessaoTipoSessao();
			break;
		case "#dadosSessaoDataHora":
			botoesDadosSessaoDataHora();
			break;
		case "#dadosSessaoIntervaloDatas":
			botoesDadosSessaoIntervaloDatas();
			break;
		case "#dadosSessaoTipoExercicio":
			botoesDadosSessaoTipoExercicio();
			break;
		case "#dadosSessaoExercicioGateau":
			botoesDadosSessaoExercicioGateau();
			break;
		case "#dadosSessaoHistoria":
			botoesDadosSessaoHistoria();			
			break;
		case "#dadosSessaoNomeHistoria":
			botoesDadosSessaoNomeHistoria();
			break;
		case "#dadosSessaoDescricaoHistoria":
			botoesDadosSessaoDescricaoHistoria();
			break;
		case "#dadosSessaoThumbnailHistoria":
			botoesDadosSessaoThumbnailHistoria();
			break;
		case "#dadosSessaoEtiquetasHistoria":
			preencheEtiquetas("listaEtiquetasHistoria");
			botoesDadosSessaoEtiquetasHistoria();
			break;
		case "#dadosSessaoBibliotecaHistorias":
			preencheHistorias("bibliotecaHistorias");
			botoesDadosSessaoBibliotecaHistorias();
			break;
		case "#dadosSessaoCena":
			getHistoriaById($idHistoria, "cenasHistoria");
			botoesDadosSessaoCena();			
			break;
		case "#dadosSessaoNomeCena":
			botoesDadosSessaoNomeCena();
			break;
		case "#dadosSessaoDescricaoCena":
			botoesDadosSessaoDescricaoCena();
			break;
		case "#dadosSessaoEtiquetasCena":
			preencheEtiquetas("listaEtiquetasCena");
			botoesDadosSessaoEtiquetasCena();
			break;
		case "#dadosSessaoIntroducaoCena":
			botoesDadosSessaoIntroducaoCena();
			break;
		case "#dadosSessaoBibliotecaCenas":
			preencheCenas("bibliotecaCenas");
			botoesDadosSessaoBibliotecaCenas();
			break;
		case "#dadosSessaoActividade":
			botoesDadosSessaoActividade();			
			break;
		case "#dadosSessaoGesto":
			preencheGestos("listaGestos");
			botoesDadosSessaoGesto();			
			break;
		case "#dadosSessaoNomeGesto":
			botoesDadosSessaoNomeGesto();			
			break;
		case "#dadosSessaoNrVezesGesto":
			botoesDadosSessaoNrVezesGesto();			
			break;
		case "#dadosSessaoQuestionario":
			preencheQuestionarios("listaQuestionarios");
			botoesDadosSessaoQuestionario();			
			break;
		case "#dadosSessaoNomeQuestionario":
			botoesDadosSessaoNomeQuestionario();			
			break;
		case "#dadosSessaoPerguntasQuestionario":
			preenchePerguntas("listaPerguntas");
			botoesDadosSessaoPerguntasQuestionario();			
			break;
		case "#dadosSessaoReforcoPositivo":
			botoesDadosSessaoReforcoPositivo();			
			break;
		case "#dadosSessaoReforcoNegativo":
			botoesDadosSessaoReforcoNegativo();			
			break;
		case "#dadosSessaoRepeticaoCena":
			botoesDadosSessaoRepeticaoCena();			
			break;
		case "#dadosSessaoPontuacao":
			botoesDadosSessaoPontuacao();			
			break;
	}
}
