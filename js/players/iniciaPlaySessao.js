var $numeroPlayersActivos = 0;
var $idSessao = 0;
var $idCenaActual = 0;
var $nrRepeticaoCena = 1;
var $idTerapeuta = 0;
var $idCriancas = [];
var $nomeCriancas = [];
var $tipoExercicio = '';

var $idGestoActual = 0;
var $currentGesto = 0;
var $nrRepeticaoGesto = 0;

var $registoGestoCrianca = [];
var $registoQuestionarioCrianca = [];
var $registoPontuacaoCrianca = [];

var $tabelaGestos = null;
var $tabelaQuestionarios = null;
var $tabelaPontuacao = null;
var $idQuestionarios = [];
var $perguntasQuestionarios = [];

var $currentSessaoPlayer = 0; //variavel que vai percorrer o array sessaoPlayer

//string que contem as anotacoes da sessao
var $anotacoesSessao = '';

//string com o log da sessao
var $logSessao = '';

//array de objectos para associar as criancas aos registos
var $criancasRegistos = [];
//dados necessários para correr a sessão
//parametros para cada posicao:
//idCena					1
//nomeCena					cena1
//mimeTypeIntroducaoCena			video
//urlIntroducaoCena				../server/files/introducao...
//tipoActividade				gesto
//						questionario
//actividade - idActividade + nomeActividade	[1, gesto1 - repeticao nº 1] , [1, gesto1 - repeticao nº 2] , [2, gesto2 - repeticao nº 1]  
//	idActividade, nomeActividade , [perguntas]	[1, questionario1, [[1, pergunta1],[2, pergunta2]]
//mimeTypeReforcoPositivo			video
//urlReforcoPositivo				../server/files/reforcoPositivo...
//mimeTypeReforcoNegativo			video
//urlReforcoNegativo	ti			../server/files/reforcoNegativo...
var historiaSessaoPlayer = [];

//dados necessarios ao historico ex:
//'cena1' - nomeCena
//'Introdução' - introducao
//'gesto1' - gesto
//'gesto2' - gesto
//'reforco/pontuacao' - reforcoPontuacao
var historicoSessao = [];

//variaveis que indicam qual a cena / componente do momento
var $currentComponenteCena = 0;
var $currentQuestionario = 0;

var mimeTypeReforcoPositivo = '';
var mimeTypeReforcoNegativo = '';

var $paneTarget = null;
$(document).ready(function(){
    resizeFunctionIniciaSessaoPlayerWindow();

    //inicializacao do dialog com a progress bar
    //Valor indeterminado
    $("#progressbar").progressbar({
        value: false
    });
    $("#progressDialog").on( "dialogopen", function( event, ui ) { 
        setTimeout(function(){
            $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Terminou a sessão.\n";
            insereRegistos(); 
            location.href="../listas/listas.html";
        }, 3000) 
    });
    $("#progressDialog").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        closeOnEscape: false,
        dialogClass: "no-close",
    });

    $("#preparaIniciarSessaoDiv").show();
    $("#dadosGeraisSessao").show();

    $idSessao = window.localStorage.getItem('playIdSessao');
    $idTerapeuta = window.localStorage.getItem('idTerapeutaLogin');
    console.log("window.localStorage.getItem('playIdSessao'): " + $idSessao);
    console.log("window.localStorage.getItem('idTerapeutaLogin'): " + $idTerapeuta);

    trataButtons();
    //vai buscar os dados da sessao
    getSessaoById($idSessao, 'iniciarPlayer');
    //Cria o websocket do lado do terapeuta
    createWebSocket($idTerapeuta, $idSessao);
});
/*****************************************
* Funcao que trata dos botões existentes *
*****************************************/
function trataButtons(){
    //botão logout
    $('#logoutButton').bind('click', function () {
        window.localStorage.setItem('idTerapeutaLogin', null);
        //window.localStorage.clear();
        location.href='../loginSessao.html';
    });

    //botao de iniciar sessao
    $('#iniciaSessaoButton').prop('disabled', true);
    $("#iniciaSessaoButton").bind('click', function(){
        $("#preparaIniciarSessaoDiv").hide();
        $("#dadosGeraisSessao").hide();
        $("#arvoreHistoricoRightDiv").hide();
        $("#anotacaoSessaoDiv").hide();
        $("#logColuna").hide();
        $("#sessaoColuna").hide();

        //sendSMS('terapeutaOn@' + $idTerapeuta + '@' + $idSessao);

        switch($tipoExercicio){
            case 'História':
                $("#anotacaoSessaoDiv").show();
                $("#logColuna").show();
                $("#sessaoColuna").show();
                //preenche os dados da historia
                $currentComponenteCena++;
                preencheArvoreHistorico($('#arvoreHistoricoSessaoLeftDiv'), 'playSessao');
                //inicializa o scroll
                $paneTarget = $('#arvoreHistoricoSessaoLeftDiv');

                $("#arvoreHistoricoLeftDiv").show();
                $('#nomeCenaHistorico' + $currentSessaoPlayer).css('color', 'red');
                $('#introducaoHistorico' + $currentSessaoPlayer).css('color', 'blue');
                window.localStorage.setItem('nrPlayers', 0);

                //preenche log
                $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Iniciou a sessão.\n"
                //preenche log - nome primeiraCena
                $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Iniciou a cena: " + historiaSessaoPlayer[0].nomeCena + '\n';
                //prepara a introducao consoante a cena em que está
                setIntroducao();
                break;

            case 'CoDraw':
                $("#coDrawRunning").show(),
                    console.log("codraw");
                console.log($idSessao);
                window.localStorage.setItem('idSessaoCodraw', $idSessao);
                window.localStorage.setItem('tipoUtilizadorCodraw', '1');
                window.localStorage.setItem('idUtilizadorCodraw', $idTerapeuta);
                window.localStorage.setItem('tipoSessaoCodraw', 'sinatra');
                sendSMS('iniciaCoDraw@' + $idSessao);
                //$aux = getSessaoById($idSessao, 'copiarSessaoToHistorico');
                //console.log($aux);
                //                window.location.href = 'http://accessible-serv.lasige.di.fc.ul.pt/~fabioaarito/desenhocolaborativo';
                //                location.href = 'http://accessible-serv.lasige.di.fc.ul.pt/~codraw/app.php';
                //				window.open('http://accessible-serv.lasige.di.fc.ul.pt/~fabioaarito/desenhocolaborativo', '_blank');
                window.open('http://accessible-serv.lasige.di.fc.ul.pt/~codraw/app.php', '_blank');

        }
    });

    //bind da tecla enter para inserir anotações
    $('#inserirAnotacaoTextArea').bind('keypress', function(e){
        if (e.keyCode == 13) {
            $('#inserirAnotacaoButton').focus();
            $('#inserirAnotacaoButton').click();
        }
    });

    //se houver texto na caixa de texto, então o botão é enabled
    //caso contrário fica disabled
    $("#inserirAnotacaoTextArea").on('input', function(){
        if($("#inserirAnotacaoTextArea").val() != ''){
            $('#inserirAnotacaoButton').prop('disabled', false);
        } else {
            $('#inserirAnotacaoButton').prop('disabled', true);
        }
    });
    //botao para inserir anotacoes	
    $("#inserirAnotacaoButton").bind('click', function(){
        var $textoAinserir = getCurrentDate() + ' - ' + getCurrentTime() + ": " + $("#inserirAnotacaoTextArea").val() + '\n';
        $('textarea[id=anotacaoSessaoTextArea]').append($textoAinserir);
        $anotacoesSessao += $textoAinserir;
        $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Inseriu uma anotação: " + $("#inserirAnotacaoTextArea").val() + "\n";
        $("#inserirAnotacaoTextArea").val('');
        $("#inserirAnotacaoTextArea").focus();
    });

    var $tipoActividadeActual = '';
    //botao seguinte
    $('#seguinteButton').prop('disabled', false);
    $('#seguinteButton').bind('click', function(){
        if($currentComponenteCena == historicoSessao[$currentSessaoPlayer].length - 1){
            if($currentSessaoPlayer == historicoSessao.length - 1){
                /*console.log("aqui");
for(var i = 0; i < $registoGestoCrianca.length ; i ++){
console.log($registoGestoCrianca[i]);
}*/
                //insereRegistos();
                $("#progressDialog").dialog('open');
            } else {
                //trata das cores do historico
                $('#nomeCenaHistorico' + $currentSessaoPlayer).css('color', 'black');
                $('#' + historicoSessao[$currentSessaoPlayer][$currentComponenteCena]).css('color', 'black');
                $currentSessaoPlayer++;
                $currentComponenteCena = 1;
                $('#nomeCenaHistorico' + $currentSessaoPlayer).css('color', 'red');
                $('#' + historicoSessao[$currentSessaoPlayer][$currentComponenteCena]).css('color', 'blue');
                var $idCenaAntiga = $idCenaActual;
                $idCenaActual = historiaSessaoPlayer[$currentSessaoPlayer].idCena;
                if($idCenaAntiga == $idCenaActual)
                    $nrRepeticaoCena++;
                else 
                    $nrRepeticaoCena = 1;
                //para os videos anteriores
                if(mimeTypeReforcoPositivo == 'video')
                    $('#reforcoPositivo')[0].pause();
                if(mimeTypeReforcoNegativo == 'video')
                    $('#reforcoNegativo')[0].pause();
                //inicia uma nova sessao, logo vai fazer o set introducao
                setIntroducao();
            }
        } else {
            //trata das cores do historico
            $('#' + historicoSessao[$currentSessaoPlayer][$currentComponenteCena]).css('color', 'black');
            $currentComponenteCena++;
            if($('#' + historicoSessao[$currentSessaoPlayer][$currentComponenteCena]).attr('class') == "tipoActividadeHistorico"){
                //guarda a actividade actual
                $tipoActividadeActual = $('#' + historicoSessao[$currentSessaoPlayer][$currentComponenteCena]).text();
                $currentComponenteCena++;
            }
            
            $('#' + historicoSessao[$currentSessaoPlayer][$currentComponenteCena]).css('color', 'blue');
            var $target = $paneTarget.find('#' + historicoSessao[$currentSessaoPlayer][$currentComponenteCena]);
            $paneTarget.stop().scrollTo( $target , 2000 );

            //vai verificar qual a actividade e trata consoante a mesma
            var $componente = $('#' + historicoSessao[$currentSessaoPlayer][$currentComponenteCena]).attr('class');
            console.log($componente);
            switch($componente){
                case "actividadeGestoHistorico":
                    var $nomeGesto = $('#' + historicoSessao[$currentSessaoPlayer][$currentComponenteCena]).text().split('\u25B8')[1];
                    $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Iniciou a actividade Gesto: " + $nomeGesto + "\n";
                    $idGestoActual = historiaSessaoPlayer[$currentSessaoPlayer].actividade[$currentGesto].idGesto;
                    $nrRepeticaoGesto = Number(historiaSessaoPlayer[$currentSessaoPlayer].actividade[$currentGesto].repeticaoGesto.split('nº')[1]);
                    $("#tituloTabelaGestos").empty();
                    $("#tituloTabelaGestos").append($nomeGesto);
                    preparaTabelaGestos();
                    $currentGesto++;
                    break;
                case "actividadeQuestionarioHistorico":
                    console.log("actividadeQuestionarioHistorico");
                    var $nomeQuestionario = $('#' + historicoSessao[$currentSessaoPlayer][$currentComponenteCena]).text().split('\u25B8')[1];
                    $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Iniciou a actividade Questionário: " + $nomeQuestionario + "\n";
                    $idQuestionarioActual = historiaSessaoPlayer[$currentSessaoPlayer].actividade[$currentQuestionario].idQuestionario;
                    $("#tituloTabelaQuestionarios").empty();
                    $("#tituloTabelaQuestionarios").append($nomeQuestionario);
                    preparaTabelaQuestionarios();
                    $currentQuestionario++;
                    break;
                case "reforcoPontuacaoHistorico":
                    $('#introducaoSessaoDiv').hide(); 
                    $('#introducaoImagemSessaoDiv').hide();
                    $("#tabelaGestosDiv").hide();
                    $("#tabelaQuestionariosDiv").hide();
                    setReforcoPontuacao();
                    if($('#' + historicoSessao[$currentSessaoPlayer][$currentComponenteCena]).text().indexOf("Pontuação") >= 0 ){
                        preparaTabelaPontuacao();
                        $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Iniciou o reforço e a pontuação\n";
                        //						console.log($logSessao);
                    } else {
                        preparaTabelaPontuacaoFingida(); //para os registos correrem bem
                        $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Iniciou o reforço\n";
                        //						console.log($logSessao);
                    }
                    $currentQuestionario = 0;
                    $currentGesto = 0;
                    break;
            }
        }
    });
}
/***************************************************
* Funcao que actualiza o valor dos players activos *
***************************************************/
function actualizaPlayersActivos($playersActivos){
    if($playersActivos >= 1){
        $('#iniciaSessaoButton').css("background-color", "#00FF00");
        $('#iniciaSessaoButton').prop('disabled', false);
    } else {
        $('#iniciaSessaoButton').css("background-color", "red");
        $('#iniciaSessaoButton').prop('disabled', true);
    }
    $numeroPlayersActivos = $playersActivos;
    $("#numeroPlayersActivos").val($numeroPlayersActivos);
}

/******************************************************************
* Funcao que vai buscar os dados necessários para correr a sessao *
*******************************************************************/
function dadosIniciarPlayer($xmlResponse){
    console.log("dadosIniciarPlayer");
    console.log($xmlResponse);
    //trata os dados gerais da sessao
    $($xmlResponse).find('sessao').each(function(){
        //nome do terapeuta
        var $nomeTerapeuta = $(this).find('terapeuta').find('nome').text();
        $('#nomeTerapeutaSessao').val($nomeTerapeuta);

        //nomes da crianças
        $idCriancas = [];
        $nomeCriancas = [];
        var $nomeCriancasTextArea = '';
        var $countCriancas = 0;
        $(this).find('crianca').each(function (){
            $idCriancas.push($(this).find('id').text());
            $nomeCriancas.push($(this).find('nome').text());
            $nomeCriancasTextArea += $(this).find('nome').text() + "\n";
            $countCriancas++;
        });
        $('textarea[id=nomeCriancasSessao]').attr('rows', $countCriancas);
        $('textarea[id=nomeCriancasSessao]').val($nomeCriancasTextArea);

        //tipo de Exercicio
        $tipoExercicio = $(this).find('tipoExercicio').text();
        $('#tipoExercicioSessao').val($tipoExercicio);
        console.log("$tipoExercicio: " + $tipoExercicio);
        switch($tipoExercicio){
            case 'História':
                //nome da historia
                var $nomeHistoria = $(this).find('historia').find('nome').map(function () {
                    return $(this).text();
                }).get(0);
                $("#dadosGeraisSessao").append(
                    '<p> Nome do História: ' +
                    '<input type="text" id="nomeHistoriaSessao" readonly/>' +
                    '</p>'
                );
                $('#nomeHistoriaSessao').val($nomeHistoria);
                //tipo Actividade
                var $actividade = $(this).find('tipoActividade').text();

                var $tipoActividade = '';
                var $temActividadeAux = false;
                if ($actividade.indexOf("Gesto") >= 0){
                    $tipoActividade += "Gesto";
                    $temActividadeAux = true;
                }
                if ($actividade.indexOf("Questionário") >= 0){
                    if($temActividadeAux) 
                        $tipoActividade += " / ";
                    $tipoActividade += "Questionário";
                }
                $("#dadosGeraisSessao").append(
                    '<p> Tipo de Actividade: ' +
                    '<input type="text" id="tipoActividadeSessao" readonly/>' +
                    '</p>'
                );
                $('#tipoActividadeSessao').val($tipoActividade);

                //chama a função para tratar dos detalhes da historia
                preencheDadosIniciarPlayerHistoria($xmlResponse);

                break;
        }
        //preenche os dados da historia
        preencheArvoreHistorico($('#arvoreHistoricoSessaoRightDiv'), '');
        $("#arvoreHistoricoRightDiv").show();
    });
}

/**********************************************************
* Funcao que vai preencher os dados necessários ao player *
***********************************************************/
function preencheDadosIniciarPlayerHistoria($xmlResponse){
    console.log("preencheDadosIniciarPlayerHistoria");
    console.log($xmlResponse);
    $($xmlResponse).find('sessao').find('historia').find('cena').each(function () {
        //numero de repeticoes da cena
        var $nrVezesCena = $(this).find('nrVezesCena').map(function () {
            return $(this).text();
        }).get(0);

        for(var i = 0; i < $nrVezesCena ; i++){
            var dadosCena = {idCena: 0, 
                             nomeCena: '',
                             urlIntroducaoCena: '',
                             mimeTypeIntroducaoCena: '',
                             tipoActividade: '',
                             actividade: [],
                             mimeTypeReforcoPositivo: '',
                             urlReforcoPositivo: '',
                             mimeTypeReforcoNegativo: '',
                             urlReforcoNegativo: '',
                            };

            //id da cena
            dadosCena.idCena = $(this).find('id').map(function () {
                return $(this).text();
            }).get(0);

            //nome da cena
            dadosCena.nomeCena = $(this).find('nome').map(function () {
                return $(this).text();
            }).get(0);

            console.log($(this).find('urlIntroducao').map(function () {
                return $(this).text();
            }).get(0));
            //introducao da cena
            dadosCena.urlIntroducaoCena = $(this).find('urlIntroducao').map(function () {
                return $(this).text();
            }).get(0);
            console.log("dadosCena.urlIntroducaoCena: " + dadosCena.urlIntroducaoCena);

            //formato da introducao
            dadosCena.mimeTypeIntroducaoCena = $(this).find('mimeTypeIntroducao').map(function () {
                return $(this).text();
            }).get(0);

            //tipo da actividade
            var $tipoActividade = $(this).find('tipoActividade').map(function () {
                return $(this).text();
            }).get(0);
            dadosCena.tipoActividade = $tipoActividade;

            //preenche os dados da actividade
            if($tipoActividade == 'Gesto'){
                $(this).find('gesto').each(function () {
                    var $nrVezesRepeticaoGesto = $(this).find('nrRepeticaoGestos').map(function () {
                        return $(this).text();
                    }).get(0);
                    for(var j = 1; j <= $nrVezesRepeticaoGesto ; j++){
                        var $dadosGesto = { idGesto: 0, nomeGesto: '' , repeticaoGesto: ''}
                        $dadosGesto.idGesto = $(this).find('id').map(function () {
                            return $(this).text();
                        }).get(0);
                        $dadosGesto.nomeGesto = $(this).find('nomeGesto').map(function () {
                            return $(this).text();
                        }).get(0);
                        $dadosGesto.repeticaoGesto = 'Repetição nº ' + j;
                        dadosCena.actividade.push($dadosGesto);
                    }

                });
            } else { //questionario
                $(this).find('questionario').each(function () {
                    var $dadosQuestionario = { idQuestionario: 0 , nomeQuestionario: '' , perguntas: []};

                    $dadosQuestionario.idQuestionario = $(this).find('id').map(function () {
                        return $(this).text();
                    }).get(0);
                    $dadosQuestionario.nomeQuestionario = $(this).find('nomeQuestionario').map(function () {
                        return $(this).text();
                    }).get(0);

                    $(this).find('pergunta').each(function () {
                        console.log("aqui");
                        var $perguntasQuestionario = {idPergunta: 0, questao: ''};
                        $perguntasQuestionario.idPergunta = $(this).find('id').map(function () {
                            return $(this).text();
                        }).get(0);
                        $perguntasQuestionario.questao = $(this).find('questao').map(function () {
                            return $(this).text();
                        }).get(0);
                        $dadosQuestionario.perguntas.push($perguntasQuestionario);
                    });
                    console.log("*******************");
                    console.log($dadosQuestionario);

                    dadosCena.actividade.push($dadosQuestionario);
                });
            }

            //reforço positivo
            dadosCena.urlReforcoPositivo = $(this).find('urlReforcoPositivo').map(function () {
                return $(this).text();
            }).get(0);
            console.log('dadosCena.urlReforcoPositivo: ' + dadosCena.urlReforcoPositivo);
            //formato do reforço positivo
            dadosCena.mimeTypeReforcoPositivo = $(this).find('mimeTypeReforcoPositivo').map(function () {
                return $(this).text();
            }).get(0);

            //reforço negativo
            dadosCena.urlReforcoNegativo = $(this).find('urlReforcoNegativo').map(function () {
                return $(this).text();
            }).get(0);

            //formato do reforço negativo
            dadosCena.mimeTypeReforcoNegativo = $(this).find('mimeTypeReforcoNegativo').map(function () {
                return $(this).text();
            }).get(0);
            if(dadosCena.mimeTypeReforcoNegativo == '')
                $("#reforcoNegativoButton").attr('disabled', true);
            else
                $("#reforcoNegativoButton").attr('disabled', false);
            var $pontuacaoCena = 'não';
            if($(this).find('pontuacao').map(function () {
                return $(this).text();
            }).get(0) == 1)
                $pontuacaoCena = 'sim';
            dadosCena.pontuacao = $pontuacaoCena;

            historiaSessaoPlayer.push(dadosCena);
        }

    });
    //preenche id da cena actual para registo
    $idCenaActual = historiaSessaoPlayer[0].idCena;
    console.log("historiaSessaoPlayer");
    for(var i = 0 ; i < historiaSessaoPlayer.length; i++){
console.log(historiaSessaoPlayer[i]);
}
}

/*********************************************************
 Função que preenche a árvore com os detalhes da história
**********************************************************/
function preencheArvoreHistorico($elementDiv, $where){

    switch($tipoExercicio){
        case 'História':
            historicoSessao = [];
            for(var i = 0 ; i < historiaSessaoPlayer.length ; i++){
                var historicoAux = [];
                //nome da cena
                $elementDiv.append('<p class="nomeCenaHistorico" id="nomeCenaHistorico' + i + '">\u25B8 ' + historiaSessaoPlayer[i].nomeCena + '</p>');
                historicoAux.push('nomeCenaHistorico' + i);
                //introducao
                $elementDiv.append('<p class="introducaoHistorico" id="introducaoHistorico' + i + '">\u25B8 ' + 'Introdução' + '</p>');
                historicoAux.push('introducaoHistorico' + i);
                //tipo da actividade
                var $tipoActividade = historiaSessaoPlayer[i].tipoActividade;
                $elementDiv.append('<p class="tipoActividadeHistorico" id="tipoActividadeHistorico' + i + '">\u25B8 ' + $tipoActividade + '</p>');				
                historicoAux.push('tipoActividadeHistorico' + i);
                //dados da actividade
                if($tipoActividade == 'Gesto'){
                    if(historiaSessaoPlayer[i].actividade.length == 1){
                        $elementDiv.append('<p class="actividadeGestoHistorico" id="actividadeGestoHistorico' + i + '">\u25B8 ' + historiaSessaoPlayer[i].actividade[0].nomeGesto + '</p>');
                        historicoAux.push('actividadeGestoHistorico' + i);
                    } else {
                        //percorre as actividades Gesto
                        for(var j = 0; j < historiaSessaoPlayer[i].actividade.length ; j++){
                            $elementDiv.append('<p class="actividadeGestoHistorico" id="actividadeGestoHistorico' + i + '' + j + '">\u25B8 ' + historiaSessaoPlayer[i].actividade[j].nomeGesto + ' - ' + historiaSessaoPlayer[i].actividade[j].repeticaoGesto + '</p>');
                            historicoAux.push('actividadeGestoHistorico' + i + '' + j);
                        }
                    }
                } else { //questionario
                    //percorre as actividades Questionário
                    for(var j = 0; j < historiaSessaoPlayer[i].actividade.length ; j++){
                        $elementDiv.append('<p class="actividadeQuestionarioHistorico" id="actividadeQuestionarioHistorico' + i + '' + j + '">\u25B8 ' + historiaSessaoPlayer[i].actividade[j].nomeQuestionario + '</p>');
                        historicoAux.push('actividadeQuestionarioHistorico' + i + '' + j);	
                    }
                }
                //reforco ou reforco/pontuacao
                var $pontuacao = historiaSessaoPlayer[i].pontuacao;
                if($pontuacao == 'não')
                    $elementDiv.append('<p class="reforcoPontuacaoHistorico" id="reforcoPontuacaoHistorico' + i + '">\u25B8 ' + 'Reforço' + '</p>');		
                else
                    $elementDiv.append('<p class="reforcoPontuacaoHistorico" id="reforcoPontuacaoHistorico' + i + '">\u25B8 ' + 'Reforço/Pontuação' + '</p>');		
                historicoAux.push('reforcoPontuacaoHistorico' + i);

                historicoSessao.push(historicoAux);
            }
            break;
        case 'CoDraw':
            $elementDiv.append('<p id="mensagemArvoreHistoricoSessao"> Não existem detalhes a apresentar.</p>');
            break;
    }
    /*console.log("imprime historico " + historicoSessao.length);
for(var i = 0 ; i < historicoSessao.length; i++){
console.log(historicoSessao[i]);
}*/
}

/****************************************************************
 Funcao que prepara a introducao consoante a cena em que estamos
****************************************************************/
function setIntroducao(){
    //esconde os outros divs
    $("#tabelaGestosDiv").hide();
    $("#tabelaQuestionariosDiv").hide();
    $("#reforcoPositivoSessaoDiv").hide();
    $("#reforcoNegativoSessaoDiv").hide();
    $("#reforcoPositivoImagemSessaoDiv").hide();
    $("#reforcoNegativoImagemSessaoDiv").hide();
    $("#reforcoButtons").hide();
    $("#tabelaPontuacaoDiv").hide();
    //mostra o botão seguinte
    $("#seguinteButtonDiv").css('margin-top', '0px');
    $("#seguinteButtonDiv").show();
    //preenche log
    $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Iniciou a introducao\n";

    var mimeTypeIntroducaoCena = historiaSessaoPlayer[$currentSessaoPlayer].mimeTypeIntroducaoCena;
    var introducaoCena = historiaSessaoPlayer[$currentSessaoPlayer].urlIntroducaoCena;
    //Se for video
    if(mimeTypeIntroducaoCena == "video"){
        $('#introducaoSessaoDiv').empty();
        $('#introducao').empty();
        //Cria o elemento de video		
        $('#introducaoSessaoDiv').append('<video id="introducao" preload="auto"></video>');

        $('#introducao').prop('autoplay', false);

        //Não aparecer os controlos
        $('#introducao').prop('controls', true);

        var type = '';
        if ($('#introducao')[0].canPlayType('video/mp4; codecs="amp4v.20.8, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="amp4v.20.8, mp4a.40.2"';
        }

        else if ($('#introducao')[0].canPlayType('video/mp4; codecs="avc1.58A01E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.58A01E, mp4a.40.2"';
        }

        else if ($('#introducao')[0].canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        }

        else if ($('#introducao')[0].canPlayType('video/mp4; codecs="avc1.64001E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.64001E, mp4a.40.2"';
        }

        else if ($('#introducao')[0].canPlayType('video/mp4; codecs="avc1.4D401E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"';
        }

        else if ($('#introducao')[0].canPlayType('video/mp4; codecs="mp4v.20.8, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="mp4v.20.240, mp4a.40.2"';
        }

        var introMp4 = introducaoCena + '.mp4?random=1000';
        var introWebm = introducaoCena + '.webm';

        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if(isAndroid) {
            $('#introducao').append('<source src="' + introMp4 + '">');
            $('#introducao').append('<source src="' + introWebm + '">');
            $('#introducao').append('<p>Your browser does not support HTML5 video.</p>');
        } else {
            $('#introducao').append('<source src="' + introMp4 + '" type="' + type + '">');
            $('#introducao').append('<source src="' + introWebm + '" type="video/webm; codecs="vp8, vorbis">');
            $('#introducao').append('<p>Your browser does not support HTML5 video.</p>');
        }

        /*		 $('#scrmp4').attr('src', introMp4);   
         $('#scrwebm').attr('src', introWebm);
         $('#introducao').get(0).load();
*/
        $('#introducaoSessaoDiv').show(); 

        sendSMS('iniciaIntroducao@' + $idSessao + '@' + mimeTypeIntroducaoCena + '@' + introducaoCena);
        //se play	
        $('#introducao').on('play', function(){
            var $currentTime = convertTime(this.currentTime);
            $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Iniciou o vídeo (tempo: " + $currentTime +").\n";
            //			console.log($logSessao);		
            sendSMS('controlaSessaoIntroducao@' + $idSessao + '@play');
        });
        //se pause
        $('#introducao').on('pause', function(){
            var $currentTime = convertTime(this.currentTime);
            $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Parou o vídeo (tempo: " + $currentTime +").\n";
            //			console.log($logSessao);		
            sendSMS('controlaSessaoIntroducao@' + $idSessao + '@pause');		
        });
        //se mudar a posicao  do video
        $('#introducao').on('seeking', function(){
            sendSMS('controlaSessaoIntroducao@' + $idSessao + '@seeking' + '@' + this.currentTime);
        });

        //se alterar o volume do video
        $('#introducao').on('volumechange', function(){
            sendSMS('controlaSessaoIntroducao@' + $idSessao + '@volume' + '@' + this.volume);
        });
        //se acabou
        $('#introducao').on('ended', function(){
            var $currentTime = convertTime(this.duration);
            $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": O vídeo chegou ao fim (duração: " + $currentTime +").\n";
            //			console.log($logSessao);	
        });

    } else { //mimeTypeIntroducaoCena == "imagem"
        $('#introducaoImagem').attr("src", historiaSessaoPlayer[$currentSessaoPlayer].urlIntroducaoCena);
        $('#introducaoImagemSessaoDiv').show(); 
        sendSMS('iniciaIntroducao@' + $idSessao + '@' + mimeTypeIntroducaoCena + '@' + introducaoCena);
    }


}

/****************************************************************
 Funcao que prepara a introducao consoante a cena em que estamos
****************************************************************/
function setReforcoPontuacao(){
    console.log("setReforcoPontuacao");
    //esconde os outros divs
    $("#tabelaGestosDiv").hide();

    //mostra os botões dos reforços
    $("#reforcoButtons").show();

    mimeTypeReforcoPositivo = historiaSessaoPlayer[$currentSessaoPlayer].mimeTypeReforcoPositivo;
    console.log("----" + historiaSessaoPlayer[$currentSessaoPlayer].urlReforcoPositivo);
    var reforcoPositivo = historiaSessaoPlayer[$currentSessaoPlayer].urlReforcoPositivo;
    mimeTypeReforcoNegativo = historiaSessaoPlayer[$currentSessaoPlayer].mimeTypeReforcoNegativo;
    var reforcoNegativo = historiaSessaoPlayer[$currentSessaoPlayer].urlReforcoNegativo;

    if(mimeTypeReforcoPositivo == 'video'){
        $("#seguinteButtonDiv").css('margin-top', ($("#reforcoPositivo").height() - $("#reforcoButtons").height()) + 'px');
        $("#tabelaPontuacaoDiv").css('margin-top', ($("#reforcoPositivo").height()) + 'px');
    } else {
        $("#seguinteButtonDiv").css('margin-top', ($("#reforcoPositivoImagem").height() - $("#reforcoButtons").height()) + 'px');
        $("#tabelaPontuacaoDiv").css('margin-top', ($("#reforcoPositivoImagem").height()) + 'px');
    }

    /*************************** Reforço Positivo ***************************/
    if(mimeTypeReforcoPositivo == "video"){
        $('#reforcoPositivoSessaoDiv').empty();
        $('#reforcoPositivo').empty();
        //Cria o elemento de video		
        $('#reforcoPositivoSessaoDiv').append('<video id="reforcoPositivo" preload="auto"></video>');

        $('#reforcoPositivo').prop('autoplay', false);

        //Não aparecer os controlos
        $('#reforcoPositivo').prop('controls', true);

        var type = '';
        if ($('#reforcoPositivo')[0].canPlayType('video/mp4; codecs="amp4v.20.8, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="amp4v.20.8, mp4a.40.2"';
        }

        else if ($('#reforcoPositivo')[0].canPlayType('video/mp4; codecs="avc1.58A01E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.58A01E, mp4a.40.2"';
        }

        else if ($('#reforcoPositivo')[0].canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        }

        else if ($('#reforcoPositivo')[0].canPlayType('video/mp4; codecs="avc1.64001E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.64001E, mp4a.40.2"';
        }

        else if ($('#reforcoPositivo')[0].canPlayType('video/mp4; codecs="avc1.4D401E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"';
        }

        else if ($('#reforcoPositivo')[0].canPlayType('video/mp4; codecs="mp4v.20.8, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="mp4v.20.240, mp4a.40.2"';
        }

        var reforcoPositivoMp4 = reforcoPositivo + '.mp4?random=1000';
        var reforcoPositivoWebm = reforcoPositivo + '.webm';

        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if(isAndroid) {
            $('#reforcoPositivo').append('<source src="' + reforcoPositivoMp4 + '">');
            $('#reforcoPositivo').append('<source src="' + reforcoPositivoWebm + '">');
            $('#reforcoPositivo').append('<p>Your browser does not support HTML5 video.</p>');
        } else {
            $('#reforcoPositivo').append('<source src="' + reforcoPositivoMp4 + '" type="' + type + '">');
            $('#reforcoPositivo').append('<source src="' + reforcoPositivoWebm + '" type="video/webm"; codecs="vp8, vorbis">');
            $('#reforcoPositivo').append('<p>Your browser does not support HTML5 video.</p>');
        }

        /*		var reforcoPositivoMp4 = reforcoPositivo + '.mp4';
        var reforcoPositivoWebm = reforcoPositivo + '.webm';

         $('#scrRPmp4').attr('src', reforcoPositivoMp4);   
         $('#scrRPwebm').attr('src', reforcoPositivoWebm);
         $('#reforcoPositivo').get(0).load();
*/
        //se play	
        $('#reforcoPositivo').on('play', function(){
            var $currentTime = convertTime(this.currentTime);
            $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Iniciou o vídeo (tempo: " + $currentTime +").\n";
            //			console.log($logSessao);		
            sendSMS('controlaSessaoReforcoPositivo@' + $idSessao + '@play');
        });
        //se pause
        $('#reforcoPositivo').on('pause', function(){
            var $currentTime = convertTime(this.currentTime);
            $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Parou o vídeo (tempo: " + $currentTime +").\n";
            //			console.log($logSessao);		
            sendSMS('controlaSessaoReforcoPositivo@' + $idSessao + '@pause');		
        });
        //se mudar a posicao  do video
        $('#reforcoPositivo').on('seeking', function(){
            sendSMS('controlaSessaoReforcoPositivo@' + $idSessao + '@seeking' + '@' + this.currentTime);
        });

        //se tirou o volume do video
        $('#reforcoPositivo').on('volumechange', function(){
            sendSMS('controlaSessaoReforcoPositivo@' + $idSessao + '@volume' + '@' + this.volume);
        });
        //se acabou
        $('#reforcoPositivo').on('ended', function(){
            var $currentTime = convertTime(this.duration);
            $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": O vídeo chegou ao fim (duração: " + $currentTime +").\n";
            //			console.log($logSessao);
        });
    } else { //mimeTypeReforcoPositivo == "imagem"
        $('#reforcoPositivoImagem').attr("src", reforcoPositivo);
    }
    $("#reforcoPositivoButton").unbind( "click" );
    $("#reforcoPositivoButton").on('click', function(){
        $("#seguinteButtonDiv").css('margin-top', '0px');
        $("#tabelaPontuacaoDiv").css('margin-top', '3%');
        if(mimeTypeReforcoNegativo == 'video')
            $('#reforcoNegativo')[0].pause();
        $('#reforcoNegativoSessaoDiv').hide();
        $('#reforcoNegativoImagemSessaoDiv').hide();
        if(mimeTypeReforcoPositivo == "video")
            $('#reforcoPositivoSessaoDiv').show();
        else
            $('#reforcoPositivoImagemSessaoDiv').show();
        console.log("aqui")
        sendSMS('iniciaReforcoPositivo@' + $idSessao + '@' + mimeTypeReforcoPositivo + '@' + reforcoPositivo);
        $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Escolheu o reforço positivo\n";
    });



    /*************************** Reforço Negativo ***************************/
    if(mimeTypeReforcoNegativo == "video"){
        $('#reforcoNegativoSessaoDiv').empty();
        $('#reforcoNegativo').empty();
        //Cria o elemento de video		
        $('#reforcoNegativoSessaoDiv').append('<video id="reforcoNegativo" preload="auto"></video>');


        $('#reforcoNegativo').prop('autoplay', false);

        //Não aparecer os controlos
        $('#reforcoNegativo').prop('controls', true);

        var type = '';
        if ($('#reforcoNegativo')[0].canPlayType('video/mp4; codecs="amp4v.20.8, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="amp4v.20.8, mp4a.40.2"';
        }

        else if ($('#reforcoNegativo')[0].canPlayType('video/mp4; codecs="avc1.58A01E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.58A01E, mp4a.40.2"';
        }

        else if ($('#reforcoNegativo')[0].canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        }

        else if ($('#reforcoNegativo')[0].canPlayType('video/mp4; codecs="avc1.64001E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.64001E, mp4a.40.2"';
        }

        else if ($('#reforcoNegativo')[0].canPlayType('video/mp4; codecs="avc1.4D401E, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"';
        }

        else if ($('#reforcoNegativo')[0].canPlayType('video/mp4; codecs="mp4v.20.8, mp4a.40.2"') != ''){
            type = 'video/mp4; codecs="mp4v.20.240, mp4a.40.2"';
        }

        var reforcoNegativoMp4 = reforcoNegativo + '.mp4?random=1000';
        var reforcoNegativoWebm = reforcoNegativo + '.webm';

        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if(isAndroid) {
            $('#reforcoNegativo').append('<source src="' + reforcoNegativoMp4 + '">');
            $('#reforcoNegativo').append('<source src="' + reforcoNegativoWebm + '">');
            $('#reforcoNegativo').append('<p>Your browser does not support HTML5 video.</p>');
        } else {
            $('#reforcoNegativo').append('<source src="' + reforcoNegativoMp4 + '" type="' + type + '">');
            $('#reforcoNegativo').append('<source src="' + reforcoNegativoWebm + '" type="video/webm; codecs="vp8, vorbis">');
            $('#reforcoNegativo').append('<p>Your browser does not support HTML5 video.</p>');
        }

        /*		var reforcoNegativoMp4 = reforcoNegativo + '.mp4';
        var reforcoNegativoWebm = reforcoNegativo + '.webm';

        $('#scrRNmp4').attr('src', reforcoNegativoMp4);   
        $('#scrRNwebm').attr('src', reforcoNegativoWebm);
        $('#reforcoNegativo').get(0).load();
*/
        //se play	
        $('#reforcoNegativo').on('play', function(){
            var $currentTime = convertTime(this.currentTime);
            $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Iniciou o vídeo (tempo: " + $currentTime +").\n";
            //			console.log($logSessao);
            sendSMS('controlaSessaoReforcoNegativo@' + $idSessao + '@play');
        });
        //se pause
        $('#reforcoNegativo').on('pause', function(){
            var $currentTime = convertTime(this.currentTime);
            $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Parou o vídeo (tempo: " + $currentTime +").\n";
            //			console.log($logSessao);		
            sendSMS('controlaSessaoReforcoNegativo@' + $idSessao + '@pause');		
        });
        //se mudar a posicao  do video
        $('#reforcoNegativo').on('seeking', function(){
            sendSMS('controlaSessaoReforcoNegativo@' + $idSessao + '@seeking' + '@' + this.currentTime);
        });
        //se tirou o volume do video
        $('#reforcoNegativo').on('mute', function(){
            sendSMS('controlaSessaoReforcoNegativo@' + $idSessao + '@mute');
        });
        //se tirou o volume do video
        $('#reforcoNegativo').on('volumechange', function(){
            sendSMS('controlaSessaoReforcoNegativo@' + $idSessao + '@volume' + '@' + this.volume);
        });
        //se acabou
        $('#reforcoNegativo').on('ended', function(){
            var $currentTime = convertTime(this.duration);
            $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": O vídeo chegou ao fim (duração: " + $currentTime +").\n";
            //			console.log($logSessao);
        });
    } else { //mimeTypeReforcoNegativo == "imagem"
        $('#reforcoNegativoImagem').attr("src", reforcoNegativo);
    }
    $("#reforcoNegativoButton").unbind( "click" );
    $("#reforcoNegativoButton").on('click', function(){
        $("#seguinteButtonDiv").css('margin-top', '0px');
        $("#tabelaPontuacaoDiv").css('margin-top', '3%');
        if(mimeTypeReforcoPositivo == 'video')
            $('#reforcoPositivo')[0].pause();
        $('#reforcoPositivoSessaoDiv').hide();
        $('#reforcoPositivoImagemSessaoDiv').hide();
        if(mimeTypeReforcoNegativo == "video")
            $('#reforcoNegativoSessaoDiv').show();
        else
            $('#reforcoNegativoImagemSessaoDiv').show();
        sendSMS('iniciaReforcoNegativo@' + $idSessao + '@' + mimeTypeReforcoNegativo + '@' + reforcoNegativo);
        $logSessao += getCurrentDate() + ' - ' + getCurrentTime() + ": Escolheu o reforço negativo\n";
    });


}

/**************************************
 Funcao que prepara a tabela de gestos
**************************************/
function preparaTabelaGestos(){
    $("#tabelaGestos").dataTable().fnDestroy();
    $tabelaGestos = $('#tabelaGestos').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": [ 1, 2, 3 ] 
        }],
    });
    $("#tabelaGestos").dataTable().fnClearTable();
    $("#tabelaGestos_length").hide();
    $("#tabelaGestos_paginate").hide();
    $("#tabelaGestos_info").hide();
    for(var i = 0; i < $idCriancas.length ; i++){
        //objecto com os dados de cada crianca
        var $gestosCriancas = {idSessao: $idSessao, 
                               idCena: $idCenaActual,
                               nrRepeticaoCena: $nrRepeticaoCena,
                               idCrianca: $idCriancas[i], 
                               tipoRegisto: "Gesto",
                               nrActividade: $nrRepeticaoGesto,
                               idGesto: $idGestoActual,
                               respostaGesto: 'Não',
                               pontuacaoGesto: 1
                              };

        var $pontuacaoGestoCode = '<input type="radio" name="pontuacaoGesto' + $idCriancas[i] + '" id="radioPontuacao1' + $idCriancas[i] + '"/>' +
            '<label for="radioPontuacao1' + $idCriancas[i] + '">1</label>' + 
            '<input type="radio" name="pontuacaoGesto' + $idCriancas[i] + '" id="radioPontuacao2' + $idCriancas[i] + '"/>' + 
            '<label for="radioPontuacao2' + $idCriancas[i] + '">2</label>' + 
            '<input type="radio" name="pontuacaoGesto' + $idCriancas[i] + '" id="radioPontuacao3' + $idCriancas[i] + '"/>' + 
            '<label for="radioPontuacao3' + $idCriancas[i] + '">3</label>' + 
            '<input type="radio" name="pontuacaoGesto' + $idCriancas[i] + '" id="radioPontuacao4' + $idCriancas[i] + '"/>' + 
            '<label for="radioPontuacao4' + $idCriancas[i] + '">4</label>' + 
            '<input type="radio" name="pontuacaoGesto' + $idCriancas[i] + '" id="radioPontuacao5' + $idCriancas[i] + '"/>' +
            '<label for="radioPontuacao5' + $idCriancas[i] + '">5</label>';
        $tabelaGestos.fnAddData([
            $nomeCriancas[i], 
            '<input type="radio" name="gesto' + $idCriancas[i] + '" id="radioSim' + $idCriancas[i] + '"/>',
            '<input type="radio" name="gesto' + $idCriancas[i] + '" id="radioDestaVezPassa' + $idCriancas[i] + '"/>',
            '<input type="radio" name="gesto' + $idCriancas[i] + '" id="radioNao' + $idCriancas[i] + '"/>',
            $pontuacaoGestoCode
        ]);
        $registoGestoCrianca.push($gestosCriancas);
        //botão sim
        $('#radioSim' + $idCriancas[i]).click(function(){
            var $idCrianca = $(this).attr('id').split('radioSim')[1];
            for(var i = 0; i < $registoGestoCrianca.length ; i++){
                if($registoGestoCrianca[i].idCrianca == $idCrianca &&
                   $registoGestoCrianca[i].idCena == $idCenaActual &&
                   $registoGestoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena &&
                   $registoGestoCrianca[i].tipoRegisto == "Gesto" &&
                   $registoGestoCrianca[i].nrActividade == $nrRepeticaoGesto &&
                   $registoGestoCrianca[i].idGesto == $idGestoActual){
                    $registoGestoCrianca[i].respostaGesto = "Sim";
                }
            }
        });
        //botão desta vez passa
        $('#radioDestaVezPassa' + $idCriancas[i]).click(function(){
            var $idCrianca = $(this).attr('id').split('radioDestaVezPassa')[1];
            for(var i = 0; i < $registoGestoCrianca.length ; i++){
                if($registoGestoCrianca[i].idCrianca == $idCrianca &&
                   $registoGestoCrianca[i].idCena == $idCenaActual &&
                   $registoGestoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena &&
                   $registoGestoCrianca[i].tipoRegisto == "Gesto" &&
                   $registoGestoCrianca[i].nrActividade == $nrRepeticaoGesto &&
                   $registoGestoCrianca[i].idGesto == $idGestoActual){
                    $registoGestoCrianca[i].respostaGesto = "Desta vez passa";
                }
            }
        });
        //botão não
        $('#radioNao' + $idCriancas[i]).attr('checked', 'checked');
        $('#radioNao' + $idCriancas[i]).click(function(){
            var $idCrianca = $(this).attr('id').split('radioNao')[1];
            for(var i = 0; i < $registoGestoCrianca.length ; i++){
                if($registoGestoCrianca[i].idCrianca == $idCrianca &&
                   $registoGestoCrianca[i].idCena == $idCenaActual &&
                   $registoGestoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena &&
                   $registoGestoCrianca[i].tipoRegisto == "Gesto" &&
                   $registoGestoCrianca[i].nrActividade == $nrRepeticaoGesto &&
                   $registoGestoCrianca[i].idGesto == $idGestoActual){
                    $registoGestoCrianca[i].respostaGesto = "Não";
                }
            }
        });

        //botao pontuacao 1
        $('#radioPontuacao1' + $idCriancas[i]).attr('checked', 'checked');
        $('#radioPontuacao1' + $idCriancas[i]).click(function(){
            console.log('1');
            var $idCrianca = $(this).attr('id').split('radioPontuacao1')[1];
            console.log("idCrianca: " + $idCrianca);
            for(var i = 0; i < $registoGestoCrianca.length ; i++){
                if($registoGestoCrianca[i].idCrianca == $idCrianca &&
                   $registoGestoCrianca[i].idCena == $idCenaActual &&
                   $registoGestoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena &&
                   $registoGestoCrianca[i].tipoRegisto == "Gesto" &&
                   $registoGestoCrianca[i].nrActividade == $nrRepeticaoGesto &&
                   $registoGestoCrianca[i].idGesto == $idGestoActual){
                    $registoGestoCrianca[i].pontuacaoGesto = 1;
                }
            }
        });
        //botao pontuacao 2
        $('#radioPontuacao2' + $idCriancas[i]).click(function(){
            console.log('2');
            var $idCrianca = $(this).attr('id').split('radioPontuacao2')[1];
            console.log("idCrianca: " + $idCrianca);
            for(var i = 0; i < $registoGestoCrianca.length ; i++){
                if($registoGestoCrianca[i].idCrianca == $idCrianca &&
                   $registoGestoCrianca[i].idCena == $idCenaActual &&
                   $registoGestoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena &&
                   $registoGestoCrianca[i].tipoRegisto == "Gesto" &&
                   $registoGestoCrianca[i].nrActividade == $nrRepeticaoGesto &&
                   $registoGestoCrianca[i].idGesto == $idGestoActual){
                    $registoGestoCrianca[i].pontuacaoGesto = 2;
                }
            }
        });
        //botao pontuacao 3
        $('#radioPontuacao3' + $idCriancas[i]).click(function(){
            console.log('3');
            var $idCrianca = $(this).attr('id').split('radioPontuacao3')[1];
            console.log("idCrianca: " + $idCrianca);
            for(var i = 0; i < $registoGestoCrianca.length ; i++){
                if($registoGestoCrianca[i].idCrianca == $idCrianca &&
                   $registoGestoCrianca[i].idCena == $idCenaActual &&
                   $registoGestoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena &&
                   $registoGestoCrianca[i].tipoRegisto == "Gesto" &&
                   $registoGestoCrianca[i].nrActividade == $nrRepeticaoGesto &&
                   $registoGestoCrianca[i].idGesto == $idGestoActual){
                    $registoGestoCrianca[i].pontuacaoGesto = 3;
                }
            }
        });
        //botao pontuacao 4
        $('#radioPontuacao4' + $idCriancas[i]).click(function(){
            console.log('4');
            var $idCrianca = $(this).attr('id').split('radioPontuacao4')[1];
            console.log("idCrianca: " + $idCrianca);
            for(var i = 0; i < $registoGestoCrianca.length ; i++){
                if($registoGestoCrianca[i].idCrianca == $idCrianca &&
                   $registoGestoCrianca[i].idCena == $idCenaActual &&
                   $registoGestoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena &&
                   $registoGestoCrianca[i].tipoRegisto == "Gesto" &&
                   $registoGestoCrianca[i].nrActividade == $nrRepeticaoGesto &&
                   $registoGestoCrianca[i].idGesto == $idGestoActual){
                    $registoGestoCrianca[i].pontuacaoGesto = 4;
                }
            }
        });
        //botao pontuacao 5
        $('#radioPontuacao5' + $idCriancas[i]).click(function(){
            console.log('5');
            var $idCrianca = $(this).attr('id').split('radioPontuacao5')[1];
            console.log("idCrianca: " + $idCrianca);
            for(var i = 0; i < $registoGestoCrianca.length ; i++){
                if($registoGestoCrianca[i].idCrianca == $idCrianca &&
                   $registoGestoCrianca[i].idCena == $idCenaActual &&
                   $registoGestoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena &&
                   $registoGestoCrianca[i].tipoRegisto == "Gesto" &&
                   $registoGestoCrianca[i].nrActividade == $nrRepeticaoGesto &&
                   $registoGestoCrianca[i].idGesto == $idGestoActual){
                    $registoGestoCrianca[i].pontuacaoGesto = 5;
                }
            }
        });
    }
    $("#tabelaGestosDiv").show();
}

/*********************************************
 Funcao que prepara a tabela de questionários
**********************************************/
function preparaTabelaQuestionarios(){
    console.log("preparaTabelaQuestionarios");
    $("#rowHead").empty();
    $("#rowHead").append('<td></td>');

    var $auxColumns = [];
    for(var i = 0 ; i < $nomeCriancas.length ; i++){
        $("#rowHead").append('<td>' + $nomeCriancas[i] + '</td>');
        $auxColumns.push(i + 1);
    }
    //registoQuestionarioCrianca
    $("#tabelaQuestionarios").dataTable().fnDestroy();
    $tabelaQuestionarios = $('#tabelaQuestionarios').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": $auxColumns
        }],
    });
    $("#tabelaQuestionarios").dataTable().fnClearTable();
    $("#tabelaQuestionarios_length").hide();
    $("#tabelaQuestionarios_paginate").hide();
    $("#tabelaQuestionarios_info").hide();

    for(var i = 0 ; i < historiaSessaoPlayer[$currentSessaoPlayer].actividade[$currentQuestionario].perguntas.length ; i++){
        var $rowAux=[];
        $rowAux.push(historiaSessaoPlayer[$currentSessaoPlayer].actividade[$currentQuestionario].perguntas[i].questao);
        for(var j = 0 ; j < $nomeCriancas.length ; j++){
            var $idPergunta = historiaSessaoPlayer[$currentSessaoPlayer].actividade[$currentQuestionario].perguntas[i].idPergunta;
            var $idQuestionario = historiaSessaoPlayer[$currentSessaoPlayer].actividade[$currentQuestionario].idQuestionario;
            var $idCrianca = $idCriancas[j];
            //objecto com os dados de cada crianca
            var $questionariosCriancas = {idSessao: $idSessao, 
                                          idCena: $idCenaActual,
                                          nrRepeticaoCena: $nrRepeticaoCena,
                                          idCrianca: $idCrianca, 
                                          tipoRegisto: "Questionario",
                                          idQuestionario: $idQuestionario,
                                          idPergunta: $idPergunta,
                                          respostaPergunta: 'Não'
                                         };
            $registoQuestionarioCrianca.push($questionariosCriancas);
            var $checkId = 'check' + $idPergunta + 'check' +  $idCrianca + 'check' + $idQuestionario + 'check' + $idCenaActual + 'check' + $nrRepeticaoCena;
            console.log("checkid: " + $checkId);
            var $botoes = '<input type="checkbox" name="checkboxGroup[]" id="' + $checkId + '">';	
            $rowAux.push($botoes);
        }
        $tabelaQuestionarios.fnAddData($rowAux);
    }
    $("#tabelaQuestionariosDiv").show();

    //captura os eventos cliques na tabela para conseguir ver qual as checkboxes seleccionadas
    $("#tabelaQuestionarios").click(function(){
        $.each($("input[name='checkboxGroup[]']"), function() {
            var $idPergunta = $(this).attr('id').split('check')[1];
            var $idCrianca = $(this).attr('id').split('check')[2];
            var $idQuestionario = $(this).attr('id').split('check')[3];
            var $idCena = $(this).attr('id').split('check')[4];
            var $nrRepeticaoCena = $(this).attr('id').split('check')[5];
            console.log($idPergunta + " - " + $idCrianca + " - " + $idQuestionario + " - " + $idCenaActual + " - " + $nrRepeticaoCena);
            if($(this).is(':checked')){
                for(var i = 0; i < $registoQuestionarioCrianca.length ; i++){
                    if($registoQuestionarioCrianca[i].idCrianca == $idCrianca && 
                       $registoQuestionarioCrianca[i].idPergunta == $idPergunta &&
                       $registoQuestionarioCrianca[i].idCena == $idCenaActual &&
                       $registoQuestionarioCrianca[i].idQuestionario == $idQuestionario &&
                       $registoQuestionarioCrianca[i].nrRepeticaoCena == $nrRepeticaoCena){
                            $registoQuestionarioCrianca[i].respostaPergunta = "Sim";
                    }
                }
            } else {
                for(var i = 0; i < $registoQuestionarioCrianca.length ; i++){
                    if($registoQuestionarioCrianca[i].idCrianca == $idCrianca && 
                       $registoQuestionarioCrianca[i].idPergunta == $idPergunta &&
                       $registoQuestionarioCrianca[i].idCena == $idCena &&
                       $registoQuestionarioCrianca[i].idQuestionario == $idQuestionario &&
                       $registoQuestionarioCrianca[i].nrRepeticaoCena == $nrRepeticaoCena){
                            $registoQuestionarioCrianca[i].respostaPergunta = "Não";
                    }
                }
            }
        });
    });
}
/*****************************************
 Funcao que prepara a tabela de pontuação
******************************************/
function preparaTabelaPontuacao(){
    $("#tabelaPontuacao").dataTable().fnDestroy();
    $tabelaPontuacao = $('#tabelaPontuacao').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": true, 
            "aTargets": [ 0, 1, 2, 3, 4 ]
        }],
    });
    $("#tabelaPontuacao").dataTable().fnClearTable();
    $("#tabelaPontuacao_length").hide();
    $("#tabelaPontuacao_paginate").hide();
    $("#tabelaPontuacao_info").hide();
    for(var i = 0; i < $idCriancas.length ; i++){
        var $pontuacaoCriancas = {idSessao: $idSessao, 
                                  idCena: $idCenaActual,
                                  nrRepeticaoCena: $nrRepeticaoCena,
                                  idCrianca: $idCriancas[i], 
                                  tipoRegisto: "Pontuacao",
                                  pontuacaoCena: 1
                                 };
        $tabelaPontuacao.fnAddData([
            $nomeCriancas[i], 
            '<input type="radio" name="star' + $idCriancas[i] + '" id="star1' + $idCriancas[i] + '"/>',
            '<input type="radio" name="star' + $idCriancas[i] + '" id="star2' + $idCriancas[i] + '"/>',
            '<input type="radio" name="star' + $idCriancas[i] + '" id="star3' + $idCriancas[i] + '"/>',
            '<input type="radio" name="star' + $idCriancas[i] + '" id="star4' + $idCriancas[i] + '"/>',
            '<input type="radio" name="star' + $idCriancas[i] + '" id="star5' + $idCriancas[i] + '"/>'
        ]);

        $registoPontuacaoCrianca.push($pontuacaoCriancas);
        //1 estrela 
        $('#star1' + $idCriancas[i]).attr('checked', 'checked');
        $('#star1' + $idCriancas[i]).click(function(){
            var $idCrianca = $(this).attr('id').split('star1')[1];
            for(var i = 0; i < $registoPontuacaoCrianca.length ; i++){
                if($registoPontuacaoCrianca[i].idCrianca == $idCrianca &&
                   $registoPontuacaoCrianca[i].idCena == $idCenaActual &&
                   $registoPontuacaoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena){
                    $registoPontuacaoCrianca[i].pontuacaoCena = 1;
                }
            }
        });
        //2 estrelas
        $('#star2' + $idCriancas[i]).click(function(){
            var $idCrianca = $(this).attr('id').split('star2')[1];
            for(var i = 0; i < $registoPontuacaoCrianca.length ; i++){
                if($registoPontuacaoCrianca[i].idCrianca == $idCrianca &&
                   $registoPontuacaoCrianca[i].idCena == $idCenaActual &&
                   $registoPontuacaoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena){
                    $registoPontuacaoCrianca[i].pontuacaoCena = 2;
                }
            }
        });
        //3 estrelas 
        $('#star3' + $idCriancas[i]).click(function(){
            var $idCrianca = $(this).attr('id').split('star3')[1];
            for(var i = 0; i < $registoPontuacaoCrianca.length ; i++){
                if($registoPontuacaoCrianca[i].idCrianca == $idCrianca &&
                   $registoPontuacaoCrianca[i].idCena == $idCenaActual &&
                   $registoPontuacaoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena){
                    $registoPontuacaoCrianca[i].pontuacaoCena = 3;
                }
            }
        });
        //4 estrelas
        $('#star4' + $idCriancas[i]).click(function(){
            var $idCrianca = $(this).attr('id').split('star4')[1];
            for(var i = 0; i < $registoPontuacaoCrianca.length ; i++){
                if($registoPontuacaoCrianca[i].idCrianca == $idCrianca &&
                   $registoPontuacaoCrianca[i].idCena == $idCenaActual &&
                   $registoPontuacaoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena){
                    $registoPontuacaoCrianca[i].pontuacaoCena = 4;
                }
            }
        });
        //5 estrelas 
        $('#star5' + $idCriancas[i]).click(function(){
            var $idCrianca = $(this).attr('id').split('star5')[1];
            for(var i = 0; i < $registoPontuacaoCrianca.length ; i++){
                if($registoPontuacaoCrianca[i].idCrianca == $idCrianca &&
                   $registoPontuacaoCrianca[i].idCena == $idCenaActual &&
                   $registoPontuacaoCrianca[i].nrRepeticaoCena == $nrRepeticaoCena){
                    $registoPontuacaoCrianca[i].pontuacaoCena = 5;
                }
            }
        });
    }
    $("#tabelaPontuacaoDiv").show();
}

function preparaTabelaPontuacaoFingida(){
    for(var i = 0; i < $idCriancas.length ; i++){
        var $pontuacaoCriancas = {idSessao: $idSessao, 
                                  idCena: $idCenaActual,
                                  nrRepeticaoCena: $nrRepeticaoCena,
                                  idCrianca: $idCriancas[i], 
                                  tipoRegisto: "Pontuacao",
                                  pontuacaoCena: 0
                                 };
        $registoPontuacaoCrianca.push($pontuacaoCriancas);
    }

}

/*************************************************
 Funcao que converte o tempo do video em hh:mm_ss
**************************************************/
function convertTime($currentTime){
    var $hours = Math.floor($currentTime / 3600);   
    var $minutes = Math.floor($currentTime / 60);   
    var $seconds = Math.floor($currentTime); 

    return ($hours<10 ? '0' : '') + $hours + ':' +
        ($minutes<10 ? '0' : '') + $minutes + ':' +
        ($seconds<10 ? '0' : '') + $seconds;

}

/*************************************************
 Funcao que insere os registos na base de dados
 e associa as criancas aos registos
**************************************************/
function insereRegistos(){
    //copia a sessao para o historico
    var $xmlResponse = getSessaoById($idSessao, "copiarSessaoToHistorico");
    var idSessaoHistorico = 0;
    var $idTerapeutaSessao = 0;
    var $tipoSessao = '';
    var $dataHoraSessao = '';
    var $dataInicioSessao = '';
    var $dataFimSessao = '';
    var $idCriancasSessao = '';
    var $tipoExercicioSessao = '';
    var $idExercicioSessao = 0;
    $($xmlResponse).find('sessao').each(function(){
        console.log($xmlResponse);
        $idTerapeutaSessao = $(this).find('terapeuta').find('id').map(function () {
            return $(this).text();
        }).get(0);
        console.log("$idTerapeutaSessao: " + $idTerapeutaSessao);
        $tipoSessao = $(this).find('tipoSessao').map(function () {
            return $(this).text();
        }).get(0);
        console.log($tipoSessao);
        if($tipoSessao == 'Presencial'){
            $dataHoraSessao = $(this).find('dataHora').map(function () {
                return $(this).text();
            }).get(0);
            console.log("$dataHoraSessao: " + $dataHoraSessao);
        } else {
            $dataInicioSessao = $(this).find('dataInicio').map(function () {
                return $(this).text();
            }).get(0);
            $dataFimSessao = $(this).find('dataFim').map(function () {
                return $(this).text();
            }).get(0);
        }

        $($xmlResponse).find('crianca').each(function(){
            $idCriancasSessao += $(this).find('id').map(function () {
                return $(this).text();
            }).get(0) + ', ';
        });
        console.log("$idCriancasSessao: " + $idCriancasSessao);
        $tipoExercicioSessao = $(this).find('tipoExercicio').map(function () {
            return $(this).text();
        }).get(0);
        console.log("$tipoExercicioSessao: " + $tipoExercicioSessao);
        if($tipoExercicioSessao == 'História'){
            $idExercicioSessao = $(this).find('historia').find('id').map(function () {
                return $(this).text();
            }).get(0);
        }
        console.log("$idExercicioSessao: " + $idExercicioSessao);


        if($tipoSessao == 'Presencial')
            idSessaoHistorico = adicionaNovaSessaoHistorico($idTerapeutaSessao, $dataHoraSessao, '', '', $idCriancasSessao, $tipoSessao, $tipoExercicioSessao, $idExercicioSessao, $logSessao, $anotacoesSessao);
        else
            idSessaoHistorico = adicionaNovaSessaoHistorico($idTerapeutaSessao, '', $dataInicioSessao, $dataFimSessao, $idCriancasSessao, $tipoSessao, $tipoExercicioSessao, $idExercicioSessao, $logSessao, $anotacoesSessao);
        console.log("adicionaHistorico" + idSessaoHistorico);
        removerSessao($idSessao);
    });

    //Cria um array com as criancas na sessao
    for(var i = 0; i < $idCriancas.length ; i++){
        $criancasRegistos.push({ idCrianca: $idCriancas[i], idRegistos: [] });
    }

    //insere os registos dos gestos
    for(var i = 0; i < $registoGestoCrianca.length ; i ++){
        $registoGestoCrianca[i].idSessao = idSessaoHistorico;
        var $nrRepeticaoGesto = $registoGestoCrianca[i].nrActividade;
        var $idRegistoGesto = adicionaNovoRegistoGesto($registoGestoCrianca[i].idSessao, $registoGestoCrianca[i].idCena, $registoGestoCrianca[i].nrRepeticaoCena, $registoGestoCrianca[i].idCrianca, $registoGestoCrianca[i].tipoRegisto, $registoGestoCrianca[i].idGesto, $nrRepeticaoGesto, $registoGestoCrianca[i].respostaGesto, $registoGestoCrianca[i].pontuacaoGesto);
        //actualiza os registos das criancas
        for(var j = 0; j < $criancasRegistos.length; j++){
            if($criancasRegistos[j].idCrianca == $registoGestoCrianca[i].idCrianca)
                $criancasRegistos[j].idRegistos.push($idRegistoGesto);
        }
    }
    //insere os registos dos questionarios
    console.log("asdasdasdas: " + $registoQuestionarioCrianca.length);
    for(var i = 0; i < $registoQuestionarioCrianca.length ; i++){
        console.log($registoQuestionarioCrianca[i])
    }
    for(var i = 0; i < $registoQuestionarioCrianca.length ; i ++){
        $registoQuestionarioCrianca[i].idSessao = idSessaoHistorico;
        console.log($registoQuestionarioCrianca[i].idCrianca + "-" + $registoQuestionarioCrianca[i].respostaPergunta);
        var $idRegistoQuestionario = adicionaNovoRegistoQuestionario($registoQuestionarioCrianca[i].idSessao, $registoQuestionarioCrianca[i].idCena, $registoQuestionarioCrianca[i].nrRepeticaoCena, $registoQuestionarioCrianca[i].idCrianca, $registoQuestionarioCrianca[i].tipoRegisto, $registoQuestionarioCrianca[i].idQuestionario, $registoQuestionarioCrianca[i].idPergunta, $registoQuestionarioCrianca[i].respostaPergunta);
        //actualiza os registos das criancas
        for(var j = 0; j < $criancasRegistos.length; j++){
            if($criancasRegistos[j].idCrianca == $registoQuestionarioCrianca[i].idCrianca)
                $criancasRegistos[j].idRegistos.push($idRegistoQuestionario);
        }
    }
    
    //insere os registos das pontuacoes
    for(var i = 0; i < $registoPontuacaoCrianca.length ; i++){
        $registoPontuacaoCrianca[i].idSessao = idSessaoHistorico;
        var $idRegistoPontuacao = adicionaNovoRegistoPontuacao($registoPontuacaoCrianca[i].idSessao, $registoPontuacaoCrianca[i].idCena, $registoPontuacaoCrianca[i].nrRepeticaoCena, $registoPontuacaoCrianca[i].idCrianca, $registoPontuacaoCrianca[i].tipoRegisto, $registoPontuacaoCrianca[i].pontuacaoCena);
        //actualiza os registos das criancas
              for(var j = 0; j < $criancasRegistos.length; j++){
                    if($criancasRegistos[j].idCrianca == $registoPontuacaoCrianca[i].idCrianca)
                        $criancasRegistos[j].idRegistos.push($idRegistoPontuacao);
              }
    }  

    //vou actualizar os registos de todas as criancas
    //para isso preciso de percorrer o array de criancas e registos
    for(var c = 0; c < $criancasRegistos.length; c++){
        //e ir buscar os dados da crianca pelo seu id, no caso de ja ter mais registos poder adicionar os novos
        $xmlResponse = getCriancaById($criancasRegistos[c].idCrianca, "actualizarRegistos");	
        $($xmlResponse).find('crianca').each(function(){
            var $idCrianca = $(this).find('id').map(function () {
                return $(this).text();
            }).get(0);
            var $registos = '';
            $(this).find('registo').each(function(){
                $registos += $(this).find('id').map(function () {
                    return $(this).text();
                }).get(0) + ', ';
            });
            for(var i = 0 ; i < $criancasRegistos[c].idRegistos.length ; i++){
                $registos += $criancasRegistos[c].idRegistos[i] + ', ';
            }
            updateRegistosCrianca($idCrianca, $registos);
        });
    }
}

/******************************************************
 Função que formata o conteudo dos elementos do player
 consoante o tamanho da janela
*******************************************************/
function resizeFunctionIniciaSessaoPlayerWindow(){
    var $contentSize = $("#content").height();
    $("#content").css('min-height' , '515px');
    $("#content").css('min-width' , '1024px');
    //elementos coluna esquerda
    $("#logColuna").css('height', ($contentSize * 0.96) + 'px');
    $("#dadosGeraisSessao").css('height', ($("#logColuna").height() - $("#preparaIniciarSessaoDiv").height() - $("#logColuna").css('margin-top').split('px')[0] - $("#dadosGeraisSessao").css('margin-top').split('px')[0] - $("#dadosGeraisSessao").css('margin-bottom').split('px')[0] - 30) + 'px');
    $("#arvoreHistoricoSessaoLeftDiv").css('height', $("#logColuna").height() * 0.45 + 'px');
    //elementos coluna direita
    $("#sessaoColuna").css('height', ($contentSize * 0.96) + 'px');
    $("#arvoreHistoricoRightDiv").css('height', $("#sessaoColuna").height() * 0.96 + 'px');
    $("#anotacaoSessaoDiv").css('height', $("#logColuna").height() * 0.54 + 'px');
    $("#anotacaoSessaoTextArea").css('height', $("#anotacaoSessaoDiv").height() * 0.84 + 'px');
    $("#tabelaGestosDiv").css('height', ($("#sessaoColuna").height() -  $("#introducaoImagemSessaoDiv").height() - $("#tabelaGestosDiv").css('margin-top').split('%')[0]) + 'px');

    $("#demo").css('margin', '0px');
    //$("#demo").css('height', ($("#sessaoColuna").height() -  $("#introducaoImagemSessaoDiv").height() - $("#tabelaGestosDiv").css('margin-top').split('%')[0] - 10) + 'px');

    //redimensionamento da janela
    $(window).resize(function(){
        $contentSize = $("#content").height();
        $("#logColuna").css('height', ($contentSize * 0.96) + 'px');
        $("#dadosGeraisSessao").css('height', ($("#logColuna").height() - $("#preparaIniciarSessaoDiv").height() - $("#logColuna").css('margin-top').split('px')[0] - $("#dadosGeraisSessao").css('margin-top').split('px')[0] - $("#dadosGeraisSessao").css('margin-bottom').split('px')[0] - 30) + 'px');
        $("#arvoreHistoricoSessaoLeftDiv").css('height', $("#logColuna").height() * 0.45 + 'px');

        $("#sessaoColuna").css('height', ($contentSize * 0.96) + 'px');
        $("#arvoreHistoricoRightDiv").css('height', $("#sessaoColuna").height() * 0.96 + 'px');
        $("#anotacaoSessaoDiv").css('height', $("#logColuna").height() * 0.54 + 'px');
        $("#anotacaoSessaoTextArea").css('height', $("#anotacaoSessaoDiv").height() * 0.84 + 'px');
        $("#tabelaGestosDiv").css('height', ($("#sessaoColuna").height() -  $("#introducaoImagemSessaoDiv").height() - $("#tabelaGestosDiv").css('margin-top').split('%')[0]) + 'px');
        //$("#demo").css('height', ($("#sessaoColuna").height() -  $("#introducaoImagemSessaoDiv").height() - $("#tabelaGestosDiv").css('margin-top').split('px')[0] - 10) + 'px');
    });
}

