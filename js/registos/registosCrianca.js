//lista de sessoes que a crianca participou com media de pontuacoes
var listaSessoesCrianca = [];
//lista de cenas em que participou
var listaCenasCrianca = [];
//lista de gestos em que participou
var listaGestosCrianca = [];
//lista de questionarios em que participou
var listaQuestionariosCrianca = [];
//lista de perguntas em que participou
var listaPerguntasCrianca = [];

var jsonData = '';

var $tabelaSessoes = null;
var $tabelaCenas = null;
var $tabelaGestos = null;
var $tabelaQuestionarios = null;
var $tabelaPerguntas = null;

var $tabelaSessoesDrillDownCenas = null;
var $tabelaSessoesDrillDownGestos = null;
var $tabelaSessoesDrillDownQuestionarios = null;
var $tabelaSessoesDrillDownPerguntas = null;

var $tabelaCenasDrillDownGestos = null;
var $tabelaCenasDrillDownQuestionarios = null;
var $tabelaCenasDrillDownPerguntas = null;

var $tabelaQuestionariosDrillDownPerguntas = null;

var $temRegistosSessoes = false;
var $temRegistosCenas = false;
var $temRegistosGestos = false;
var $temRegistosQuestionarios = false;
var $temRegistosPerguntas = false;

$(document).ready(function(){    
    //LocalStorage
    if(typeof(Storage)==="undefined"){
        alert("Lamentamos, mas o seu browser nao suporta web storage...");
    } else {
        var $idTerapeutaLogin = window.localStorage.getItem('idTerapeutaLogin');

        //verifica se houve um login feito
        if($idTerapeutaLogin != null){
            //vai buscar o id da crianca cujos registos se quer mostrar
            var $idCrianca = window.localStorage.getItem('registoCrianca');
            
            //vai buscar os dados da criança
            getCriancaById($idCrianca,'registoCrianca');
            //vai buscar os dados da sessão
            //getRegistosCriancas($idCrianca, "registoCrianca");
            
            //trata dos botoes da pagina
            setButtonsRegistosCriancas();
            //prepara as tabelas para mostrar
            criaTabelaSessoes();
            criaTabelaCenas();
            criaTabelaGestos();
            criaTabelaQuestionarios();
            criaTabelaPerguntas();
            
        }else{
            alert("Tem de se autenticar para ter acesso a este conteúdo!");	
            location.href='../loginSessao.html';
        }
    }	    

});

function preencheDadosRegistoCrianca($xmlResponse){
    console.log('preencheDadosRegistoCrianca');
    console.log($xmlResponse);
    
    $("#nomeCrianca").append($($xmlResponse).find('crianca').find('nome').text());
    
    criaListaSessoes($xmlResponse);
    criaListaCenas($xmlResponse);
    criaListaGestos($xmlResponse);
    criaListaQuestionarios($xmlResponse);
    criaListaPerguntas($xmlResponse);
    
    listaSessoesCrianca.sort(sortByDate);
    listaCenasCrianca.sort(sortByDate);
    listaGestosCrianca.sort(sortByDate);
    listaQuestionariosCrianca.sort(sortByDate);

}

/******************************************
 Função que "faz o sort" do array por data
 ******************************************/
function sortByDate(a, b){
    var dataA = a.dataHora.toLowerCase();
    var  dataB = b.dataHora.toLowerCase(); 
    return ((dataA < dataB) ? -1 : ((dataA > dataB) ? 1 : 0));
}

/****************************************
 Funcao que cria a lista de sessoes em 
 que a crianca participou
 ***************************************/
function criaListaSessoes($xmlResponse){
    console.log("criaListaSessoes");
    if($($xmlResponse).find('registo').text() == ''){
        //alert("Não foram encontrados registos");
        //$(".semRegistosDiv").show();
        $temRegistosSessoes = false;
    } else {
        $($xmlResponse).find('registo').each(function(){
            $temRegistosSessoes = true;
            //o tipo de registo tem que ser pontuacao
            if($(this).find('tipoRegisto').text() == "Pontuacao"){
                var $idSessao = $(this).find('idSessao').map(function () {
                    return $(this).text();
                }).get(0);
                var $encontrei = false;
                var $indice = 0;
                for(var i = 0 ; i < listaSessoesCrianca.length; i++){
                    if(listaSessoesCrianca[i].idSessao == $idSessao){
                        $encontrei = true;
                        $indice = i;
                        break;
                    }
                } 
                if($encontrei){
                    //vou modificar a mediaPontuacao se for o caso
                    var $cenaTemPontuacao = $(this).find('temPontuacao').map(function () {
                        return $(this).text();
                    }).get(0);
                    if($cenaTemPontuacao == 1){
                        //vou buscar o numero de cenas com pontuacao ja existente e incrementar
                        listaSessoesCrianca[$indice].nrCenasPontuacao++;
                        //vou buscar a pontuacao ja existente e actualiza la com a pontuacao nova
                        var $pontuacaoCena = $(this).find('pontuacaoCena').map(function () {
                            return $(this).text();
                        }).get(0);
                        listaSessoesCrianca[$indice].pontuacaoTotal += Number($pontuacaoCena);
                
                        //calculo a nova media
                        if(listaSessoesCrianca[$indice].nrCenasPontuacao != 0)
                            listaSessoesCrianca[$indice].mediaPontuacao = listaSessoesCrianca[$indice].pontuacaoTotal / listaSessoesCrianca[$indice].nrCenasPontuacao;
                    }
                } else {
                    var $dataHora = $(this).find('dataHora').map(function () {
                        return $(this).text();
                    }).get(0);
                    var $cenaTemPontuacao = $(this).find('temPontuacao').map(function () {
                        return $(this).text();
                    }).get(0);
                    var $nrCenasPontuacao = 0;
                    var $pontuacaoCena = 0;
                    if($cenaTemPontuacao == 1){
                        $nrCenasPontuacao = 1;
                        $pontuacaoCena = Number($(this).find('pontuacaoCena').map(function () {
                            return $(this).text();
                        }).get(0));
                    }
                    if($nrCenasPontuacao != 0)
                        var $mediaPontuacao = $pontuacaoCena / $nrCenasPontuacao;
                    else   
                        $mediaPontuacao = 0;
                    
                    sessoesCrianca = {
                        idSessao: $idSessao,
                        dataHora: $dataHora,
                        nrCenasPontuacao: $nrCenasPontuacao,
                        pontuacaoTotal: $pontuacaoCena,
                        mediaPontuacao: $mediaPontuacao
                    }

                    listaSessoesCrianca.push(sessoesCrianca);

                }
            }
        });
    }
    
    /********************************************************/
    console.log("listaSessoesCrianca");
    for(var i = 0 ; i < listaSessoesCrianca.length; i++){
        console.log(listaSessoesCrianca[i]);
    }
    /********************************************************/
}

/****************************************
 Funcao que cria a lista de cenas em 
 que a crianca participou
 ***************************************/
function criaListaCenas($xmlResponse){
    console.log("criaListaCenas");
    if($($xmlResponse).find('registo').text() == ''){
        //alert("Não foram encontrados registos");
        //$(".semRegistosDiv").show();
        $temRegistosCenas = false;
    } else {
        $($xmlResponse).find('registo').each(function(){
            $temRegistosCenas = true;
            //o tipo de registo tem que ser pontuacao
            if($(this).find('tipoRegisto').text() == "Pontuacao"){
                var $idSessao = $(this).find('idSessao').map(function () {
                    return $(this).text();
                }).get(0);
                var $idCena = $(this).find('idCena').map(function () {
                    return $(this).text();
                }).get(0);
                var $nrRepeticaoCena = $(this).find('nrRepeticaoCena').map(function () {
                    return $(this).text();
                }).get(0);
                
                var $dataHora = $(this).find('dataHora').map(function () {
                    return $(this).text();
                }).get(0);
console.log('dataHora: ' + $dataHora);
                var $nomeCena = $(this).find('nomeCena').map(function () {
                    return $(this).text();
                }).get(0);
console.log('nomeCena: ' + $nomeCena);
                var $cenaTemPontuacao = $(this).find('temPontuacao').map(function () {
                    return $(this).text();
                }).get(0);
                var $tipoActividade = $(this).find('tipoActividade').map(function () {
                    return $(this).text();
                }).get(0);
console.log('cenaTemPontuacao: ' + $cenaTemPontuacao);
                var $pontuacaoCena = 0;
                if($cenaTemPontuacao == 1){
                    $pontuacaoCena = Number($(this).find('pontuacaoCena').map(function () {
                        return $(this).text();
                    }).get(0));
                }

                var cenasCrianca = {
                    idSessao: $idSessao,
                    idCena: $idCena,
                    dataHora: $dataHora,
                    nomeCena: $nomeCena,
                    tipoActividadeCena: $tipoActividade,
                    nrRepeticaoCena: $nrRepeticaoCena,
                    pontuacao: $pontuacaoCena,
                }

                listaCenasCrianca.push(cenasCrianca);
            }
                
        });
    }
    
    /********************************************************/
    console.log("listaCenasCrianca");
    for(var i = 0 ; i < listaCenasCrianca.length; i++){
        console.log(listaCenasCrianca[i]);
    }
    /********************************************************/
}

/****************************************
 Funcao que cria a lista de gestos em 
 que a crianca participou
 ***************************************/
function criaListaGestos($xmlResponse){
    console.log("criaListaGestos");
    if($($xmlResponse).find('registo').text() == ''){
        //alert("Não foram encontrados registos");
        //$(".semRegistosDiv").show();
        $temRegistosGestos = false;
    } else {
        $($xmlResponse).find('registo').each(function(){
            $temRegistosGestos = true;
            //o tipo de registo tem que ser pontuacao
            if($(this).find('tipoRegisto').text() == "Gesto"){
                var $idSessao = $(this).find('idSessao').map(function () {
                    return $(this).text();
                }).get(0);
                var $idCena = $(this).find('idCena').map(function () {
                    return $(this).text();
                }).get(0);
                var $nrRepeticaoCena = $(this).find('nrRepeticaoCena').map(function () {
                    return $(this).text();
                }).get(0);
                var $idGesto = $(this).find('idGesto').map(function () {
                    return $(this).text();
                }).get(0);
                var $nomeGesto = $(this).find('nomeGesto').map(function () {
                    return $(this).text();
                }).get(0);
                var $nrRepeticaoGesto = $(this).find('nrRepeticaoGesto').map(function () {
                    return $(this).text();
                }).get(0);
                var $respostaGesto = $(this).find('respostaGesto').map(function () {
                    return $(this).text();
                }).get(0);
                var $pontuacaoGesto = $(this).find('pontuacaoGesto').map(function () {
                    return $(this).text();
                }).get(0);
                var $dataHora = $(this).find('dataHora').map(function () {
                    return $(this).text();
                }).get(0);

                var gestosCrianca = {
                    idSessao: $idSessao,
                    idCena: $idCena,
                    nrRepeticaoCena: $nrRepeticaoCena,
                    tipoRegisto: "Gesto",
                    dataHora: $dataHora,
                    idGesto: $idGesto,
                    nomeGesto: $nomeGesto,
                    nrRepeticaoGesto: $nrRepeticaoGesto,
                    respostaGesto: $respostaGesto,
                    pontuacaoGesto: $pontuacaoGesto
                }

                listaGestosCrianca.push(gestosCrianca);

            }

        });
    }
    
    /********************************************************/
    console.log("listaGestosCrianca");
    for(var i = 0 ; i < listaGestosCrianca.length; i++){
        console.log(listaGestosCrianca[i]);
    }
    /********************************************************/
    
}

/****************************************
 Funcao que cria a lista de questionarios em 
 que a crianca participou
 ***************************************/
function criaListaQuestionarios($xmlResponse){
    console.log("criaListaQuestionarios");
    if($($xmlResponse).find('registo').text() == ''){
        //alert("Não foram encontrados registos");
        //$(".semRegistosDiv").show();
        $temRegistosQuestionarios = false;
    } else {
        $($xmlResponse).find('registo').each(function(){
            $temRegistosQuestionarios = true;
            //o tipo de registo tem que ser pontuacao
            if($(this).find('tipoRegisto').text() == "Questionario"){
                var $idSessao = $(this).find('idSessao').map(function () {
                    return $(this).text();
                }).get(0);
                var $idCena = $(this).find('idCena').map(function () {
                    return $(this).text();
                }).get(0);
                var $nrRepeticaoCena = $(this).find('nrRepeticaoCena').map(function () {
                    return $(this).text();
                }).get(0);
                var $idQuestionario = $(this).find('idQuestionario').map(function () {
                    return $(this).text();
                }).get(0);
                var $encontrei = false;
                var $indice1 = 0;
                var $indice2 = 0;
                for(var i = 0 ; i < listaQuestionariosCrianca.length; i++){
                    if(listaQuestionariosCrianca[i].idSessao == $idSessao &&
                       listaQuestionariosCrianca[i].idCena == $idCena &&
                       listaQuestionariosCrianca[i].nrRepeticaoCena == $nrRepeticaoCena &&
                       listaQuestionariosCrianca[i].idQuestionario == $idQuestionario
                      ){
                        $encontrei = true;
                        $indice1 = i;
                        break;
                    }
                }
                if(!$encontrei){
                    var $nomeQuestionario = $(this).find('nomeQuestionario').map(function () {
                        return $(this).text();
                    }).get(0);
                    var $nrTotalPerguntas = $(this).find('nrTotalPerguntas').map(function () {
                        return $(this).text();
                    }).get(0);
                    var $dataHora = $(this).find('dataHora').map(function () {
                        return $(this).text();
                    }).get(0);
                    var questionariosCrianca = {
                        idSessao: $idSessao,
                        idCena: $idCena,
                        nrRepeticaoCena: $nrRepeticaoCena,
                        tipoRegisto: "Questionario",
                        dataHora: $dataHora,
                        idQuestionario: $idQuestionario,
                        nomeQuestionario: $nomeQuestionario,
                        nrTotalPerguntas: $nrTotalPerguntas,
                        perguntasCorrectas: 0
                    }

                    listaQuestionariosCrianca.push(questionariosCrianca);
                
                }
            }

        });
        contaNumeroPerguntasCorrectas($xmlResponse);
    }

    /********************************************************/
    console.log("listaQuestionariosCrianca");
    for(var i = 0 ; i < listaQuestionariosCrianca.length; i++){
        console.log(listaQuestionariosCrianca[i]);
    }
    /********************************************************/
}

/****************************************
 Funcao que cria a lista de perguntas em 
 que a crianca participou
 ***************************************/
function criaListaPerguntas($xmlResponse){
    console.log("criaListaGestos");
    if($($xmlResponse).find('registo').text() == ''){
        //alert("Não foram encontrados registos");
        //$(".semRegistosDiv").show();
        $temRegistosPerguntas = false;
    } else {
        $($xmlResponse).find('registo').each(function(){
            $temRegistosPerguntas = true;
            //o tipo de registo tem que ser pontuacao
            if($(this).find('tipoRegisto').text() == "Questionario"){
                var $idSessao = $(this).find('idSessao').map(function () {
                    return $(this).text();
                }).get(0);
                var $idCena = $(this).find('idCena').map(function () {
                    return $(this).text();
                }).get(0);
                var $nrRepeticaoCena = $(this).find('nrRepeticaoCena').map(function () {
                    return $(this).text();
                }).get(0);
                var $dataHora = $(this).find('dataHora').map(function () {
                    return $(this).text();
                }).get(0);
                var $idQuestionario = $(this).find('idQuestionario').map(function () {
                    return $(this).text();
                }).get(0);
                var $idPergunta = $(this).find('idPergunta').map(function () {
                    return $(this).text();
                }).get(0);
                var $questao = $(this).find('questao').map(function () {
                    return $(this).text();
                }).get(0);
                var $respostaPergunta = $(this).find('respostaPergunta').map(function () {
                    return $(this).text();
                }).get(0);
                
                var perguntasCrianca = {
                    idSessao: $idSessao,
                    idCena: $idCena,
                    nrRepeticaoCena: $nrRepeticaoCena,
                    dataHora: $dataHora,
                    idQuestionario: $idQuestionario,
                    idPergunta: $idPergunta,
                    questao: $questao,
                    respostaPergunta: $respostaPergunta
                }

                listaPerguntasCrianca.push(perguntasCrianca);
            }

        });
    }

    /********************************************************/
    console.log("listaPerguntasCrianca");
    for(var i = 0 ; i < listaPerguntasCrianca.length; i++){
        console.log(listaPerguntasCrianca[i]);
    }
    /********************************************************/

}

/**************************************************
 Função que conta o número de perguntas correctas
 no questionário e actualiza-o
***************************************************/
function contaNumeroPerguntasCorrectas($xmlResponse){
    $($xmlResponse).find('registo').each(function(){
        //o tipo de registo tem que ser pontuacao
        if($(this).find('tipoRegisto').text() == "Questionario"){
            var $idSessao = $(this).find('idSessao').map(function () {
                return $(this).text();
            }).get(0);
            var $idCena = $(this).find('idCena').map(function () {
                return $(this).text();
            }).get(0);
            var $nrRepeticaoCena = $(this).find('nrRepeticaoCena').map(function () {
                return $(this).text();
            }).get(0);
            var $idQuestionario = $(this).find('idQuestionario').map(function () {
                return $(this).text();
            }).get(0);
            for(var i = 0 ; i < listaQuestionariosCrianca.length ; i++){
                if(listaQuestionariosCrianca[i].idSessao == $idSessao &&
                   listaQuestionariosCrianca[i].idCena == $idCena &&
                   listaQuestionariosCrianca[i].nrRepeticaoCena == $nrRepeticaoCena &&
                   listaQuestionariosCrianca[i].idQuestionario == $idQuestionario){
                    var $respostaPergunta = $(this).find('respostaPergunta').map(function () {
                        return $(this).text();
                    }).get(0);

                    if($respostaPergunta == "Sim"){
                        listaQuestionariosCrianca[i].perguntasCorrectas++;
                    }
                }
            
            }
        }
    });
}

/******************************************
 Função que trata dos botões dos registos
 ******************************************/
function setButtonsRegistosCriancas(){
    //botão logout
    $('#logoutButton').bind('click', function () {
        window.localStorage.setItem('idTerapeutaLogin', null);
        location.href='../loginSessao.html';
    });

    $("#listaSessoesButton").click(function(){
        console.log("listaSessoesButton");
        restartDivsButtons();
        $("#listaSessoesDiv").show();
        $('#listaSessoesButton').css('border', '2px outset #0191d8');
        
        /*$("#listaCenasDiv").hide();
        $("#listaGestosDiv").hide();
        $("#listaQuestionariosDiv").hide();
        $("#listaPerguntasDiv").hide();
        $("#listaSessoesDiv").show();
        $('#listaSessoesButton').css('border', '2px outset #0191d8');
        $('#listaCenasButton').css('border', '2px outset buttonface');
        $('#listaGestosButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosButton').css('border', '2px outset buttonface');
        $('#listaPerguntasButton').css('border', '2px outset buttonface');
        */
/*        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();
        */
        
    });
    $("#listaCenasButton").click(function(){
        console.log("listaCenasButton");
        restartDivsButtons();
        $("#listaCenasDiv").show();
        $('#listaCenasButton').css('border', '2px outset #0191d8');
        /*$("#listaSessoesDiv").hide();
        $("#listaGestosDiv").hide();
        $("#listaQuestionariosDiv").hide();
        $("#listaPerguntasDiv").hide();
        $("#listaCenasDiv").show();
        $('#listaCenasButton').css('border', '2px outset #0191d8');
        $('#listaSessoesButton').css('border', '2px outset buttonface');
        $('#listaGestosButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosButton').css('border', '2px outset buttonface');
        $('#listaPerguntasButton').css('border', '2px outset buttonface');
        
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();*/
    });
    $("#listaGestosButton").click(function(){
        console.log("listaGestosButton");
        restartDivsButtons();
        $("#listaGestosDiv").show();
        $('#listaGestosButton').css('border', '2px outset #0191d8');
        /*$("#listaSessoesDiv").hide();
        $("#listaCenasDiv").hide();
        $("#listaQuestionariosDiv").hide();
        $("#listaPerguntasDiv").hide();
        $("#listaGestosDiv").show();
        $('#listaGestosButton').css('border', '2px outset #0191d8');
        $('#listaSessoesButton').css('border', '2px outset buttonface');
        $('#listaCenasButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosButton').css('border', '2px outset buttonface');
        $('#listaPerguntasButton').css('border', '2px outset buttonface');
        
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();*/
    });
    $("#listaQuestionariosButton").click(function(){
        console.log("listaQuestionariosButton");
        restartDivsButtons();
        $("#listaQuestionariosDiv").show();
        $('#listaQuestionariosButton').css('border', '2px outset #0191d8');
        /*$("#listaSessoesDiv").hide();
        $("#listaCenasDiv").hide();
        $("#listaGestosDiv").hide();
        $("#listaPerguntasDiv").hide();
        $("#listaQuestionariosDiv").show();
        $('#listaQuestionariosButton').css('border', '2px outset #0191d8');
        $('#listaSessoesButton').css('border', '2px outset buttonface');
        $('#listaCenasButton').css('border', '2px outset buttonface');
        $('#listaGestosButton').css('border', '2px outset buttonface');
        $('#listaPerguntasButton').css('border', '2px outset buttonface');
        
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();*/
    });
    $("#listaPerguntasButton").click(function(){
        console.log("listaPerguntasButton");
        restartDivsButtons();
        $("#listaPerguntasDiv").show();
        $('#listaPerguntasButton').css('border', '2px outset #0191d8');
        /*$("#listaSessoesDiv").hide();
        $("#listaCenasDiv").hide();
        $("#listaGestosDiv").hide();
        $("#listaQuestionariosDiv").hide();
        $("#listaPerguntasDiv").show();
        $('#listaPerguntasButton').css('border', '2px outset #0191d8');
        $('#listaQuestionariosButton').css('border', '2px outset buttonface');
        $('#listaSessoesButton').css('border', '2px outset buttonface');
        $('#listaCenasButton').css('border', '2px outset buttonface');
        $('#listaGestosButton').css('border', '2px outset buttonface');
        
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();*/
    });
    
    $("#listaSessoesTabelaButton").click(function(){
        console.log("listaSessoesTabelaButton");
        $('#listaSessoesTabelaButton').css('border', '2px outset #0191d8');
        $('#listaSessoesGraficoButton').css('border', '2px outset buttonface');
        $('#listaCenasTabelaButton').css('border', '2px outset buttonface');
        $('#listaCenasGraficoButton').css('border', '2px outset buttonface');
        $('#listaGestosTabelaButton').css('border', '2px outset buttonface');
        $('#listaGestosGraficoButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosTabelaButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosGraficoButton').css('border', '2px outset buttonface');
        $('#listaPerguntasTabelaButton').css('border', '2px outset buttonface');
        $('#listaPerguntasGraficoButton').css('border', '2px outset buttonface');
                
        $("#sessoesDrillDownCenasTabelaDiv").hide();
        $("#sessoesDrillDownGestosTabelaDiv").hide();
        $("#sessoesDrillDownQuestionariosTabelaDiv").hide();
        $("#sessoesDrillDownPerguntasTabelaDiv").hide();

        $("#labelSessaoTabelaSessao").prop('disabled', true);
        $("#labelCenaTabelaSessao").hide();
        $("#labelCenaTabelaSessao").prop('disabled', true);
        $("#labelGestoTabelaSessao").hide();
        $("#labelGestoTabelaSessao").prop('disabled', true);
        $("#labelQuestionarioTabelaSessao").hide();
        $("#labelQuestionarioTabelaSessao").prop('disabled', true);
        $("#labelPerguntaTabelaSessao").hide();
        $("#labelPerguntaTabelaSessao").prop('disabled', true);

        $("#sessoesCenaNext").hide();
        $("#cenasGestosQuestionarioNext").hide();
        $("#questionariosPeguntasNext").hide();
        
        $("#sessoesGraphDiv").hide();
        $("#sessoesTabelaDiv").show();
        $("#labelSessaoTabelaSessao").show();

        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();
    });
    $("#listaSessoesGraficoButton").click(function(){
        console.log("listaSessoesGraficoButton");
        $('#listaSessoesGraficoButton').css('border', '2px outset #0191d8');
        $('#listaSessoesTabelaButton').css('border', '2px outset buttonface');
        $('#listaCenasTabelaButton').css('border', '2px outset buttonface');
        $('#listaCenasGraficoButton').css('border', '2px outset buttonface');
        $('#listaGestosTabelaButton').css('border', '2px outset buttonface');
        $('#listaGestosGraficoButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosTabelaButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosGraficoButton').css('border', '2px outset buttonface');
        $('#listaPerguntasTabelaButton').css('border', '2px outset buttonface');
        $('#listaPerguntasGraficoButton').css('border', '2px outset buttonface');
        $("#sessoesTabelaDiv").hide();
        if($temRegistosSessoes){
            jsonData = createJSONDataSessoes();
            criaGrafico($("#chart_div_static_sessoes"));
            $("#sessoesGraphDiv").show();
        } else {
            $("#semRegistosSessoesDiv").show();
        }
            
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();

    });
    $("#listaCenasTabelaButton").click(function(){
        console.log("listaCenasTabelaButton");
        $('#listaCenasTabelaButton').css('border', '2px outset #0191d8');
        $('#listaSessoesTabelaButton').css('border', '2px outset buttonface');
        $('#listaSessoesGraficoButton').css('border', '2px outset buttonface');
        $('#listaCenasGraficoButton').css('border', '2px outset buttonface');
        $('#listaGestosTabelaButton').css('border', '2px outset buttonface');
        $('#listaGestosGraficoButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosTabelaButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosGraficoButton').css('border', '2px outset buttonface');
        $('#listaPerguntasTabelaButton').css('border', '2px outset buttonface');
        $('#listaPerguntasGraficoButton').css('border', '2px outset buttonface');
                
        $("#labelSessaoTabelaSessao").prop('disabled', true);
        $("#labelCenaTabelaSessao").hide();
        $("#labelCenaTabelaSessao").prop('disabled', true);
        $("#labelGestoTabelaSessao").hide();
        $("#labelGestoTabelaSessao").prop('disabled', true);
        $("#labelQuestionarioTabelaSessao").hide();
        $("#labelQuestionarioTabelaSessao").prop('disabled', true);
        $("#labelPerguntaTabelaSessao").hide();
        $("#labelPerguntaTabelaSessao").prop('disabled', true);
        $("#sessoesCenaNext").hide();
        $("#cenasGestosQuestionarioNext").hide();
        $("#questionariosPeguntasNext").hide();
        
        $("#labelCenaTabelaCena").prop('disabled', true);
        $("#labelGestoTabelaCena").hide();
        $("#labelGestoTabelaCena").prop('disabled', true);
        $("#labelQuestionarioTabelaCena").hide();
        $("#labelQuestionarioTabelaCena").prop('disabled', true);
        $("#labelPerguntaTabelaCena").hide();
        $("#labelPerguntaTabelaCena").prop('disabled', true);
        $("#cenasGestosQuestionarioNextCena").hide();
        $("#questionariosPeguntasNextCena").hide();
        
        $("#cenasGraphDiv").hide();
        $("#cenasTabelaDiv").show();
        $("#labelCenaTabelaCena").show();
        
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();
    });
    $("#listaCenasGraficoButton").click(function(){
        console.log("listaCenasGraficoButton");
        $('#listaCenasGraficoButton').css('border', '2px outset #0191d8');
        $('#listaSessoesTabelaButton').css('border', '2px outset buttonface');
        $('#listaSessoesGraficoButton').css('border', '2px outset buttonface');
        $('#listaCenasTabelaButton').css('border', '2px outset buttonface');
        $('#listaGestosTabelaButton').css('border', '2px outset buttonface');
        $('#listaGestosGraficoButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosTabelaButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosGraficoButton').css('border', '2px outset buttonface');
        $('#listaPerguntasTabelaButton').css('border', '2px outset buttonface');
        $('#listaPerguntasGraficoButton').css('border', '2px outset buttonface');
        $("#cenasTabelaDiv").hide();
        if($temRegistosCenas){
            jsonData = createJSONDataCenas();
            criaGrafico($("#chart_div_static_cenas"));
            $("#cenasGraphDiv").show();
        } else {
            $("#semRegistosCenasDiv").show();
        }
        
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();
    });
    $("#listaGestosTabelaButton").click(function(){
        console.log("listaGestosTabelaButton");
        $('#listaGestosTabelaButton').css('border', '2px outset #0191d8');
        $('#listaSessoesTabelaButton').css('border', '2px outset buttonface');
        $('#listaSessoesGraficoButton').css('border', '2px outset buttonface');
        $('#listaCenasTabelaButton').css('border', '2px outset buttonface');
        $('#listaCenasGraficoButton').css('border', '2px outset buttonface');
        $('#listaGestosGraficoButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosTabelaButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosGraficoButton').css('border', '2px outset buttonface');
        $('#listaPerguntasTabelaButton').css('border', '2px outset buttonface');
        $('#listaPerguntasGraficoButton').css('border', '2px outset buttonface');
        $("#gestosGraphDiv").hide();
        $("#gestosTabelaDiv").show();
        
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();
    });
    $("#listaGestosGraficoButton").click(function(){
        console.log("listaGestosGraficoButton");
        $('#listaGestosGraficoButton').css('border', '2px outset #0191d8');
        $('#listaSessoesTabelaButton').css('border', '2px outset buttonface');
        $('#listaSessoesGraficoButton').css('border', '2px outset buttonface');
        $('#listaCenasTabelaButton').css('border', '2px outset buttonface');
        $('#listaCenasGraficoButton').css('border', '2px outset buttonface');
        $('#listaGestosTabelaButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosTabelaButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosGraficoButton').css('border', '2px outset buttonface');
        $('#listaPerguntasTabelaButton').css('border', '2px outset buttonface');
        $('#listaPerguntasGraficoButton').css('border', '2px outset buttonface');
        $("#gestosTabelaDiv").hide();
        if($temRegistosGestos){
            jsonData = createJSONDataGestos();
            criaGrafico($("#chart_div_static_gestos"));
            $("#gestosGraphDiv").show();
        } else {
            $("#semRegistosGestosDiv").show();
        }
        
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();
    });
    $("#listaQuestionariosTabelaButton").click(function(){
        console.log("listaQuestionariosTabelaButton");
        $('#listaQuestionariosTabelaButton').css('border', '2px outset #0191d8');
        $('#listaSessoesTabelaButton').css('border', '2px outset buttonface');
        $('#listaSessoesGraficoButton').css('border', '2px outset buttonface');
        $('#listaCenasTabelaButton').css('border', '2px outset buttonface');
        $('#listaCenasGraficoButton').css('border', '2px outset buttonface');
        $('#listaGestosTabelaButton').css('border', '2px outset buttonface');
        $('#listaGestosGraficoButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosGraficoButton').css('border', '2px outset buttonface');
        $('#listaPerguntasTabelaButton').css('border', '2px outset buttonface');
        $('#listaPerguntasGraficoButton').css('border', '2px outset buttonface');
        
        $("#labelSessaoTabelaSessao").prop('disabled', true);
        $("#labelCenaTabelaSessao").hide();
        $("#labelCenaTabelaSessao").prop('disabled', true);
        $("#labelGestoTabelaSessao").hide();
        $("#labelGestoTabelaSessao").prop('disabled', true);
        $("#labelQuestionarioTabelaSessao").hide();
        $("#labelQuestionarioTabelaSessao").prop('disabled', true);
        $("#labelPerguntaTabelaSessao").hide();
        $("#labelPerguntaTabelaSessao").prop('disabled', true);
        $("#sessoesCenaNext").hide();
        $("#cenasGestosQuestionarioNext").hide();
        $("#questionariosPeguntasNext").hide();

        $("#labelCenaTabelaCena").prop('disabled', true);
        $("#labelGestoTabelaCena").hide();
        $("#labelGestoTabelaCena").prop('disabled', true);
        $("#labelQuestionarioTabelaCena").hide();
        $("#labelQuestionarioTabelaCena").prop('disabled', true);
        $("#labelPerguntaTabelaCena").hide();
        $("#labelPerguntaTabelaCena").prop('disabled', true);
        $("#cenasGestosQuestionarioNextCena").hide();
        $("#questionariosPeguntasNextCena").hide();
        
        $("#labelQuestionarioTabelaQuestionario").hide();
        $("#labelQuestionarioTabelaQuestionario").prop('disabled', true);
        $("#labelPerguntaTabelaQuestionario").hide();
        $("#labelPerguntaTabelaQuestionario").prop('disabled', true);
        $("#cenasGestosQuestionarioNextQuestionario").hide();
        $("#questionariosPeguntasNextQuestionario").hide();
        
        $("#questionariosGraphDiv").hide();
        $("#questionariosTabelaDiv").show();
        $("#labelQuestionarioTabelaQuestionario").show();
        
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();
    });
    $("#listaQuestionariosGraficoButton").click(function(){
        console.log("listaQuestionariosGraficoButton");
        $('#listaQuestionariosGraficoButton').css('border', '2px outset #0191d8');
        $('#listaSessoesTabelaButton').css('border', '2px outset buttonface');
        $('#listaSessoesGraficoButton').css('border', '2px outset buttonface');
        $('#listaCenasTabelaButton').css('border', '2px outset buttonface');
        $('#listaCenasGraficoButton').css('border', '2px outset buttonface');
        $('#listaGestosTabelaButton').css('border', '2px outset buttonface');
        $('#listaGestosGraficoButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosTabelaButton').css('border', '2px outset buttonface');
        $('#listaPerguntasTabelaButton').css('border', '2px outset buttonface');
        $('#listaPerguntasGraficoButton').css('border', '2px outset buttonface');
        $("#questionariosTabelaDiv").hide();
        if($temRegistosQuestionarios){
            jsonData = createJSONDataQuestionarios();
            criaGrafico($("#chart_div_static_questionarios"));
            $("#questionariosGraphDiv").show();
        } else {
            $("#semRegistosQuestionariosDiv").show();
        }
        
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();
    });
    $("#listaPerguntasTabelaButton").click(function(){
        console.log("listaPerguntasTabelaButton");
        $('#listaPerguntasTabelaButton').css('border', '2px outset #0191d8');
        $('#listaSessoesTabelaButton').css('border', '2px outset buttonface');
        $('#listaSessoesGraficoButton').css('border', '2px outset buttonface');
        $('#listaCenasTabelaButton').css('border', '2px outset buttonface');
        $('#listaCenasGraficoButton').css('border', '2px outset buttonface');
        $('#listaGestosTabelaButton').css('border', '2px outset buttonface');
        $('#listaGestosGraficoButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosTabelaButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosGraficoButton').css('border', '2px outset buttonface');
        $('#listaPerguntasGraficoButton').css('border', '2px outset buttonface');
        $("#perguntasGraphDiv").hide();
        $("#perguntasTabelaDiv").show();
        
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        $("#semRegistosPerguntasDiv").hide();
    });
    $("#listaPerguntasGraficoButton").click(function(){
        console.log("listaPerguntasGraficoButton");
        $('#listaPerguntasGraficoButton').css('border', '2px outset #0191d8');
        $('#listaSessoesTabelaButton').css('border', '2px outset buttonface');
        $('#listaSessoesGraficoButton').css('border', '2px outset buttonface');
        $('#listaCenasTabelaButton').css('border', '2px outset buttonface');
        $('#listaCenasGraficoButton').css('border', '2px outset buttonface');
        $('#listaGestosTabelaButton').css('border', '2px outset buttonface');
        $('#listaGestosGraficoButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosTabelaButton').css('border', '2px outset buttonface');
        $('#listaQuestionariosGraficoButton').css('border', '2px outset buttonface');
        $('#listaPerguntasTabelaButton').css('border', '2px outset buttonface');
        $("#perguntasTabelaDiv").hide();
        if($temRegistosPerguntas){
            jsonData = createJSONDataPerguntas();
            criaGrafico($("#chart_div_static_perguntas"));
            $("#perguntasGraphDiv").show();
        }
        else {
            $("#semRegistosPerguntasDiv").show();
        }
        $("#semRegistosSessoesDiv").hide();
        $("#semRegistosCenasDiv").hide();
        $("#semRegistosGestosDiv").hide();
        $("#semRegistosQuestionariosDiv").hide();
        
    });
    
    $("#labelSessaoTabelaSessao").click(function(){
        $("#sessoesDrillDownCenasTabelaDiv").hide();
        $("#sessoesDrillDownGestosTabelaDiv").hide();
        $("#sessoesDrillDownQuestionariosTabelaDiv").hide();
        $("#sessoesDrillDownPerguntasTabelaDiv").hide();
        
        $("#labelSessaoTabelaSessao").prop('disabled', true);
        $("#labelCenaTabelaSessao").hide();
        $("#labelCenaTabelaSessao").prop('disabled', true);
        $("#labelGestoTabelaSessao").hide();
        $("#labelGestoTabelaSessao").prop('disabled', true);
        $("#labelQuestionarioTabelaSessao").hide();
        $("#labelQuestionarioTabelaSessao").prop('disabled', true);
        $("#labelPerguntaTabelaSessao").hide();
        $("#labelPerguntaTabelaSessao").prop('disabled', true);
        
        $("#sessoesCenaNext").hide();
        $("#cenasGestosQuestionarioNext").hide();
        $("#questionariosPeguntasNext").hide();
        
        $("#sessoesTabelaDiv").show();
        }
    );
    
    $("#labelCenaTabelaSessao").click(function(){
        
        $("#sessoesDrillDownGestosTabelaDiv").hide();
        $("#sessoesDrillDownQuestionariosTabelaDiv").hide();
        $("#sessoesDrillDownPerguntasTabelaDiv").hide();

        $("#labelCenaTabelaSessao").prop('disabled', true);
        $("#labelGestoTabelaSessao").hide();
        $("#labelGestoTabelaSessao").prop('disabled', true);
        $("#labelQuestionarioTabelaSessao").hide();
        $("#labelQuestionarioTabelaSessao").prop('disabled', true);
        $("#labelPerguntaTabelaSessao").hide();
        $("#labelPerguntaTabelaSessao").prop('disabled', true);

        
        $("#cenasGestosQuestionarioNext").hide();
        $("#questionariosPeguntasNext").hide();

        $("#sessoesDrillDownCenasTabelaDiv").show();
    });
    
    $("#labelQuestionarioTabelaSessao").click(function(){
        $("#sessoesDrillDownPerguntasTabelaDiv").hide();
        $("#labelQuestionarioTabelaSessao").prop('disabled', true);
        $("#labelPerguntaTabelaSessao").hide();
        $("#labelPerguntaTabelaSessao").prop('disabled', true);
        $("#questionariosPeguntasNext").hide();
        
        $("#sessoesDrillDownQuestionariosTabelaDiv").show();
    });
 
    $("#labelCenaTabelaCena").click(function(){

        $("#cenasDrillDownGestosTabelaDiv").hide();
        $("#cenasDrillDownQuestionariosTabelaDiv").hide();
        $("#cenasDrillDownPerguntasTabelaDiv").hide();

        $("#labelGestoTabelaCena").hide();
        $("#labelGestoTabelaCena").prop('disabled', true);
        $("#labelQuestionarioTabelaCena").hide();
        $("#labelQuestionarioTabelaCena").prop('disabled', true);
        $("#labelPerguntaTabelaCena").hide();
        $("#labelPerguntaTabelaCena").prop('disabled', true);

        $("#cenasGestosQuestionarioNextCena").hide();
        $("#questionariosPeguntasNextCena").hide();

        $("#cenasTabelaDiv").show();
    });
    
    $("#labelQuestionarioTabelaCena").click(function(){
        $("#cenasDrillDownPerguntasTabelaDiv").hide();
        $("#labelQuestionarioTabelaCena").prop('disabled', true);
        $("#labelPerguntaTabelaCena").hide();
        $("#labelPerguntaTabelaCena").prop('disabled', true);
        $("#questionariosPeguntasNextCena").hide();
        
        $("#cenasDrillDownQuestionariosTabelaDiv").show();
    });
    
    $("#labelQuestionarioTabelaQuestionario").click(function(){
        $("#questionariosDrillDownPerguntasTabelaDiv").hide();
        $("#labelQuestionarioTabelaQuestionario").prop('disabled', true);
        $("#labelPerguntaTabelaQuestionario").hide();
        $("#labelPerguntaTabelaQuestionario").prop('disabled', true);
        $("#questionariosPeguntasNextQuestionario").hide();

        $("#questionariosTabelaDiv").show();
    });
}

function restartDivsButtons(){
    $("#listaSessoesDiv").hide();
    $("#listaCenasDiv").hide();
    $("#listaGestosDiv").hide();
    $("#listaQuestionariosDiv").hide();
    $("#listaPerguntasDiv").hide();
    $('#listaSessoesButton').css('border', '2px outset buttonface');
    $('#listaCenasButton').css('border', '2px outset buttonface');
    $('#listaGestosButton').css('border', '2px outset buttonface');
    $('#listaQuestionariosButton').css('border', '2px outset buttonface');
    $('#listaPerguntasButton').css('border', '2px outset buttonface');

    $('#listaPerguntasGraficoButton').css('border', '2px outset buttonface');
    $('#listaSessoesTabelaButton').css('border', '2px outset buttonface');
    $('#listaSessoesGraficoButton').css('border', '2px outset buttonface');
    $('#listaCenasTabelaButton').css('border', '2px outset buttonface');
    $('#listaCenasGraficoButton').css('border', '2px outset buttonface');
    $('#listaGestosTabelaButton').css('border', '2px outset buttonface');
    $('#listaGestosGraficoButton').css('border', '2px outset buttonface');
    $('#listaQuestionariosTabelaButton').css('border', '2px outset buttonface');
    $('#listaQuestionariosGraficoButton').css('border', '2px outset buttonface');
    $('#listaPerguntasTabelaButton').css('border', '2px outset buttonface');
    
    $("#sessoesGraphDiv").hide();
    $("#sessoesTabelaDiv    ").hide();
    $("#sessoesDrillDownCenasTabelaDiv").hide();
    $("#sessoesDrillDownGestosTabelaDiv").hide();
    $("#sessoesDrillDownQuestionariosTabelaDiv").hide();
    $("#sessoesDrillDownPerguntasTabelaDiv").hide();

    $("#cenasGraphDiv").hide();
    $("#cenasTabelaDiv").hide();
    $("#cenasDrillDownGestosTabelaDiv").hide();
    $("#cenasDrillDownQuestionariosTabelaDiv").hide();
    $("#cenasDrillDownPerguntasTabelaDiv").hide();
    
    $("#gestosGraphDiv").hide();
    $("#gestosTabelaDiv").hide();
    
    $("#questionariosGraphDiv").hide();
    $("#questionariosTabelaDiv").hide();    
    $("#questionariosDrillDownPerguntasTabelaDiv").hide();
    
    $("#perguntasGraphDiv").hide();
    $("#perguntasTabelaDiv").hide();
    
    $("#labelSessaoTabelaSessao").hide();
    $("#labelSessaoTabelaSessao").prop('disabled', true);
    $("#labelCenaTabelaSessao").hide();
    $("#labelCenaTabelaSessao").prop('disabled', true);
    $("#labelGestoTabelaSessao").hide();
    $("#labelGestoTabelaSessao").prop('disabled', true);
    $("#labelQuestionarioTabelaSessao").hide();
    $("#labelQuestionarioTabelaSessao").prop('disabled', true);
    $("#labelPerguntaTabelaSessao").hide();
    $("#labelPerguntaTabelaSessao").prop('disabled', true);
    
    $("#labelCenaTabelaCena").hide();
    $("#labelCenaTabelaCena").prop('disabled', true);
    $("#labelGestoTabelaCena").hide();
    $("#labelGestoTabelaCena").prop('disabled', true);
    $("#labelQuestionarioTabelaCena").hide();
    $("#labelQuestionarioTabelaCena").prop('disabled', true);
    $("#labelPerguntaTabelaCena").hide();
    $("#labelPerguntaTabelaCena").prop('disabled', true);

    $("#labelQuestionarioTabelaQuestionario").hide();
    $("#labelQuestionarioTabelaQuestionario").prop('disabled', true);
    $("#labelPerguntaTabelaQuestionario").hide();
    $("#labelPerguntaTabelaQuestionario").prop('disabled', true);
    
    $("#semRegistosSessoesDiv").hide();
    $("#semRegistosCenasDiv").hide();
    $("#semRegistosGestosDiv").hide();
    $("#semRegistosQuestionariosDiv").hide();
    $("#semRegistosPerguntasDiv").hide();
}

/*************************************
 Função que cria a tabela das sessoes
 *************************************/
function criaTabelaSessoes(){
    //cria a tabela
    if($tabelaSessoes != null)
        $tabelaSessoes.fnClearTable();
    $tabelaSessoes = $('#listaSessoes').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": [ 1 ] 
        }],
        "bDestroy": true
    });

    for(var s = 0; s < listaSessoesCrianca.length ; s++){
        var $mediaPontuacao = listaSessoesCrianca[s].mediaPontuacao;
        if($mediaPontuacao == 0)
            $mediaPontuacao = '--';
        var addId = $tabelaSessoes.fnAddData([
            listaSessoesCrianca[s].dataHora, 
            $mediaPontuacao
        ]);
        
        var theNode = $tabelaSessoes.fnSettings().aoData[addId[0]].nTr;
        var id = 'idSessao@' + listaSessoesCrianca[s].idSessao;
        theNode.setAttribute('id', id);
    }

    $('#listaSessoes tbody').on( 'click', 'tr', function () {
        sessaoDrillDownCenas($(this).attr('id').split('@')[1]);
        $("#labelSessaoTabelaSessao").prop('disabled', false);
    } );
    
}

function sessaoDrillDownCenas($idSessao){
    console.log("aquiC");
    console.log($idSessao);
    console.log($tabelaSessoesDrillDownCenas);
    if($tabelaSessoesDrillDownCenas != null)
        $tabelaSessoesDrillDownCenas.fnClearTable();
    $tabelaSessoesDrillDownCenas = $('#listaSessoesDrillDownCenas').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": [ 1 ]
        }],
        "bDestroy": true
    });
    
    for(var c = 0; c < listaCenasCrianca.length ; c++){ 
        if(listaCenasCrianca[c].idSessao == $idSessao){
            var $pontuacao = listaCenasCrianca[c].pontuacao;
            if($pontuacao == 0)
                $pontuacao = '--';
            var addId = $tabelaSessoesDrillDownCenas.fnAddData([
                listaCenasCrianca[c].dataHora, 
                listaCenasCrianca[c].nomeCena, 
                listaCenasCrianca[c].tipoActividadeCena,
                $pontuacao
            ]);
            
            var theNode = $tabelaSessoesDrillDownCenas.fnSettings().aoData[addId[0]].nTr;
            theNode.setAttribute('idSessao', listaCenasCrianca[c].idSessao);
            theNode.setAttribute('idCena', listaCenasCrianca[c].idCena);
            theNode.setAttribute('nrRepeticaoCena', listaCenasCrianca[c].nrRepeticaoCena);
            theNode.setAttribute('actividade', listaCenasCrianca[c].tipoActividadeCena);
        }
    }
    $('#listaSessoesDrillDownCenas tbody').on( 'click', 'tr', function () {
        if($(this).attr('actividade') == "Gesto"){
            sessaoDrillDownGestos($(this).attr('idSessao'), $(this).attr('idCena'), $(this).attr('nrRepeticaoCena'));
        } else {
            sessaoDrillDownQuestionarios($(this).attr('idSessao'), $(this).attr('idCena'), $(this).attr('nrRepeticaoCena'));
        }
        $("#labelCenaTabelaSessao").prop('disabled', false);
    } );
    
    $("#sessoesTabelaDiv").hide();
    $("#sessoesDrillDownCenasTabelaDiv").show();
    $("#sessoesCenaNext").show();
    $("#labelCenaTabelaSessao").show();
}

function sessaoDrillDownGestos($idSessao, $idCena, $nrRepeticaoCena){
    console.log("aquiG");
    if($tabelaSessoesDrillDownGestos != null)
        $tabelaSessoesDrillDownGestos.fnClearTable();
    $tabelaSessoesDrillDownGestos = $('#listaSessoesDrillDownGestos').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": [ 1 ] 
        }],
        "bDestroy": true
    });
    
    for(var g = 0; g < listaGestosCrianca.length ; g++){
        console.log("idSessao", listaGestosCrianca[g].idSessao);
        console.log("idCena", listaGestosCrianca[g].idCena);
        if(listaGestosCrianca[g].idSessao == $idSessao &&
           listaGestosCrianca[g].idCena == $idCena &&
           listaGestosCrianca[g].nrRepeticaoCena == $nrRepeticaoCena){
            $tabelaSessoesDrillDownGestos.fnAddData([
                listaGestosCrianca[g].dataHora,
                listaGestosCrianca[g].nomeGesto, 
                listaGestosCrianca[g].respostaGesto,
                listaGestosCrianca[g].pontuacaoGesto 
            ]);
        }
    }
    
    $("#sessoesDrillDownCenasTabelaDiv").hide();
    $("#sessoesDrillDownGestosTabelaDiv").show();
    $("#cenasGestosQuestionarioNext").show();
    $("#labelGestoTabelaSessao").show();
}

function sessaoDrillDownQuestionarios($idSessao, $idCena, $nrRepeticaoCena){
    console.log("aquiQ");
    if($tabelaSessoesDrillDownQuestionarios != null)
        $tabelaSessoesDrillDownQuestionarios.fnClearTable();
    $tabelaSessoesDrillDownQuestionarios = $('#listaSessoesDrillDownQuestionarios').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": [ 1 ] 
        }],
        "bDestroy": true
    });

    for(var q = 0; q < listaQuestionariosCrianca.length ; q++){
        console.log("idSessao", listaQuestionariosCrianca[q].idSessao);
        console.log("idCena", listaQuestionariosCrianca[q].idCena);
        if(listaQuestionariosCrianca[q].idSessao == $idSessao &&
           listaQuestionariosCrianca[q].idCena == $idCena &&
           listaQuestionariosCrianca[q].nrRepeticaoCena == $nrRepeticaoCena){
            var addId = $tabelaSessoesDrillDownQuestionarios.fnAddData([
                listaQuestionariosCrianca[q].dataHora,
                listaQuestionariosCrianca[q].nomeQuestionario, 
                listaQuestionariosCrianca[q].nrTotalPerguntas,
                listaQuestionariosCrianca[q].perguntasCorrectas
            ]);
            
            var theNode = $tabelaSessoesDrillDownQuestionarios.fnSettings().aoData[addId[0]].nTr;
            theNode.setAttribute('idSessao', listaQuestionariosCrianca[q].idSessao);
            theNode.setAttribute('idCena', listaQuestionariosCrianca[q].idCena);
            theNode.setAttribute('nrRepeticaoCena', listaQuestionariosCrianca[q].nrRepeticaoCena);
            theNode.setAttribute('idQuestionario', listaQuestionariosCrianca[q].idQuestionario);
        }
    }
    
    $('#listaSessoesDrillDownQuestionarios tbody').on( 'click', 'tr', function () {
        sessaoDrillDownPerguntas($(this).attr('idSessao'), $(this).attr('idCena'), $(this).attr('nrRepeticaoCena'), $(this).attr('idQuestionario'));
        $("#labelQuestionarioTabelaSessao").prop('disabled', false);
    } );

    $("#sessoesDrillDownCenasTabelaDiv").hide();
    $("#sessoesDrillDownQuestionariosTabelaDiv").show();
    $("#cenasGestosQuestionarioNext").show();
    $("#labelQuestionarioTabelaSessao").show();
}


function sessaoDrillDownPerguntas($idSessao, $idCena, $nrRepeticaoCena, $idQuestionario){
    console.log("aquiP");
    if($tabelaSessoesDrillDownPerguntas != null)
        $tabelaSessoesDrillDownPerguntas.fnClearTable();
    $tabelaSessoesDrillDownPerguntas = $('#listaSessoesDrillDownPerguntas').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": [ 1 ] 
        }],
        "bDestroy": true
    });

    for(var p = 0; p < listaPerguntasCrianca.length ; p++){
        if(listaPerguntasCrianca[p].idSessao == $idSessao &&
           listaPerguntasCrianca[p].idCena == $idCena &&
           listaPerguntasCrianca[p].nrRepeticaoCena == $nrRepeticaoCena &&
           listaPerguntasCrianca[p].idQuestionario == $idQuestionario ){
            $tabelaSessoesDrillDownPerguntas.fnAddData([
                listaPerguntasCrianca[p].dataHora,
                listaPerguntasCrianca[p].questao, 
                listaPerguntasCrianca[p].respostaPergunta
            ]);
        }
    }

    $("#sessoesDrillDownQuestionariosTabelaDiv").hide();
    $("#sessoesDrillDownPerguntasTabelaDiv").show();
    $("#questionariosPeguntasNext").show();
    $("#labelPerguntaTabelaSessao").show();
}

/***********************************
 Função que cria a tabela das cenas
 ***********************************/
function criaTabelaCenas(){
    //cria a tabela
    if($tabelaCenas != null)
        $tabelaCenas.fnClearTable();
    $tabelaCenas = $('#listaCenas').dataTable({
        "aoColumnDefs": [{ 
        "bSortable": false, 
        "aTargets": [ 1 ] 
        }] 
    });

    for(var c = 0; c < listaCenasCrianca.length ; c++){
        var $pontuacao = listaCenasCrianca[c].pontuacao;
        if($pontuacao == 0)
            $pontuacao = '--';
        var addId = $tabelaCenas.fnAddData([
            listaCenasCrianca[c].dataHora, 
            listaCenasCrianca[c].nomeCena, 
            listaCenasCrianca[c].tipoActividadeCena,
            $pontuacao
        ]);
        
        var theNode = $tabelaCenas.fnSettings().aoData[addId[0]].nTr;
        theNode.setAttribute('idSessao', listaCenasCrianca[c].idSessao);
        theNode.setAttribute('idCena', listaCenasCrianca[c].idCena);
        theNode.setAttribute('nrRepeticaoCena', listaCenasCrianca[c].nrRepeticaoCena);
        theNode.setAttribute('actividade', listaCenasCrianca[c].tipoActividadeCena);
    }
    
    $('#listaCenas tbody').on( 'click', 'tr', function () {
        if($(this).attr('actividade') == "Gesto"){
            cenaDrillDownGestos($(this).attr('idSessao'), $(this).attr('idCena'), $(this).attr('nrRepeticaoCena'));
        } else {
            cenaDrillDownQuestionarios($(this).attr('idSessao'), $(this).attr('idCena'), $(this).attr('nrRepeticaoCena'));
        }
        $("#labelCenaTabelaCena").prop('disabled', false);
    } );
    
    $("#cenasDrillDownCenasTabelaDiv").show();
    //$("#sessoesCenaNextCena").show();
    //$("#labelCenaTabelaCena").show();
}

function cenaDrillDownGestos($idSessao, $idCena, $nrRepeticaoCena){
    console.log("aquiG");
    if($tabelaCenasDrillDownGestos != null)
        $tabelaCenasDrillDownGestos.fnClearTable();
    $tabelaCenasDrillDownGestos = $('#listaCenasDrillDownGestos').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": [ 1 ] 
        }],
        "bDestroy": true
    });

    for(var g = 0; g < listaGestosCrianca.length ; g++){
        console.log("idSessao", listaGestosCrianca[g].idSessao);
        console.log("idCena", listaGestosCrianca[g].idCena);
        if(listaGestosCrianca[g].idSessao == $idSessao &&
           listaGestosCrianca[g].idCena == $idCena &&
           listaGestosCrianca[g].nrRepeticaoCena == $nrRepeticaoCena){
            $tabelaCenasDrillDownGestos.fnAddData([
                listaGestosCrianca[g].dataHora,
                listaGestosCrianca[g].nomeGesto, 
                listaGestosCrianca[g].respostaGesto,
                listaGestosCrianca[g].pontuacaoGesto 
            ]);
        }
    }

    $("#cenasTabelaDiv").hide();
    $("#cenasDrillDownGestosTabelaDiv").show();
    $("#cenasGestosQuestionarioNextCena").show();
    $("#labelGestoTabelaCena").show();
}

function cenaDrillDownQuestionarios($idSessao, $idCena, $nrRepeticaoCena){
    console.log("aquiQ");
    if($tabelaCenasDrillDownQuestionarios != null)
        $tabelaCenasDrillDownQuestionarios.fnClearTable();
    $tabelaCenasDrillDownQuestionarios = $('#listaCenasDrillDownQuestionarios').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": [ 1 ] 
        }],
        "bDestroy": true
    });

    for(var q = 0; q < listaQuestionariosCrianca.length ; q++){
        console.log("idSessao", listaQuestionariosCrianca[q].idSessao);
        console.log("idCena", listaQuestionariosCrianca[q].idCena);
        if(listaQuestionariosCrianca[q].idSessao == $idSessao &&
           listaQuestionariosCrianca[q].idCena == $idCena &&
           listaQuestionariosCrianca[q].nrRepeticaoCena == $nrRepeticaoCena){
            var addId = $tabelaCenasDrillDownQuestionarios.fnAddData([
                listaQuestionariosCrianca[q].dataHora,
                listaQuestionariosCrianca[q].nomeQuestionario, 
                listaQuestionariosCrianca[q].nrTotalPerguntas,
                listaQuestionariosCrianca[q].perguntasCorrectas
            ]);

            var theNode = $tabelaCenasDrillDownQuestionarios.fnSettings().aoData[addId[0]].nTr;
            theNode.setAttribute('idSessao', listaQuestionariosCrianca[q].idSessao);
            theNode.setAttribute('idCena', listaQuestionariosCrianca[q].idCena);
            theNode.setAttribute('nrRepeticaoCena', listaQuestionariosCrianca[q].nrRepeticaoCena);
            theNode.setAttribute('idQuestionario', listaQuestionariosCrianca[q].idQuestionario);
        }
    }

    $('#listaCenasDrillDownQuestionarios tbody').on( 'click', 'tr', function () {
        cenaDrillDownPerguntas($(this).attr('idSessao'), $(this).attr('idCena'), $(this).attr('nrRepeticaoCena'), $(this).attr('idQuestionario'));
        $("#labelQuestionarioTabelaCena").prop('disabled', false);
    } );

    $("#cenasTabelaDiv").hide();
    $("#cenasDrillDownQuestionariosTabelaDiv").show();
    $("#cenasGestosQuestionarioNextCena").show();
    $("#labelQuestionarioTabelaCena").show();
}


function cenaDrillDownPerguntas($idSessao, $idCena, $nrRepeticaoCena, $idQuestionario){
    console.log("aquiP");
    if($tabelaCenasDrillDownPerguntas != null)
        $tabelaCenasDrillDownPerguntas.fnClearTable();
    $tabelaCenasDrillDownPerguntas = $('#listaCenasDrillDownPerguntas').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": [ 1 ] 
        }],
        "bDestroy": true
    });

    for(var p = 0; p < listaPerguntasCrianca.length ; p++){
        if(listaPerguntasCrianca[p].idSessao == $idSessao &&
           listaPerguntasCrianca[p].idCena == $idCena &&
           listaPerguntasCrianca[p].nrRepeticaoCena == $nrRepeticaoCena &&
           listaPerguntasCrianca[p].idQuestionario == $idQuestionario ){
            $tabelaCenasDrillDownPerguntas.fnAddData([
                listaPerguntasCrianca[p].dataHora,
                listaPerguntasCrianca[p].questao, 
                listaPerguntasCrianca[p].respostaPergunta
            ]);
        }
    }

    $("#cenasDrillDownQuestionariosTabelaDiv").hide();
    $("#cenasDrillDownPerguntasTabelaDiv").show();
    $("#questionariosPeguntasNextCena").show();
    $("#labelPerguntaTabelaCena").show();
}

/************************************
 Função que cria a tabela dos gestos
 ************************************/
function criaTabelaGestos(){
    //cria a tabela
    $tabelaGestos = $('#listaGestos').dataTable({
        "aoColumnDefs": [{ 
        "bSortable": false, 
        "aTargets": [ 1 ] 
       }] 
   });

    for(var g = 0; g < listaGestosCrianca.length ; g++){
        $tabelaGestos.fnAddData([
            listaGestosCrianca[g].dataHora,
            listaGestosCrianca[g].nomeGesto, 
            listaGestosCrianca[g].respostaGesto,
            listaGestosCrianca[g].pontuacaoGesto 
        ]);
    }
}  

/*******************************************
 Função que cria a tabela dos questionarios
 *******************************************/
function criaTabelaQuestionarios(){
    //cria a tabela
    if($tabelaQuestionarios != null)
        $tabelaQuestionarios.fnClearTable();
    $tabelaQuestionarios = $('#listaQuestionarios').dataTable({
        "aoColumnDefs": [{ 
        "bSortable": false, 
        "aTargets": [ 1 ] 
        }],
        "bDestroy": true 
    });

    for(var q = 0; q < listaQuestionariosCrianca.length ; q++){
        var addId = $tabelaQuestionarios.fnAddData([
            listaQuestionariosCrianca[q].dataHora,
            listaQuestionariosCrianca[q].nomeQuestionario, 
            listaQuestionariosCrianca[q].nrTotalPerguntas,
            listaQuestionariosCrianca[q].perguntasCorrectas
        ]);
        
        var theNode = $tabelaQuestionarios.fnSettings().aoData[addId[0]].nTr;
        theNode.setAttribute('idSessao', listaQuestionariosCrianca[q].idSessao);
        theNode.setAttribute('idCena', listaQuestionariosCrianca[q].idCena);
        theNode.setAttribute('nrRepeticaoCena', listaQuestionariosCrianca[q].nrRepeticaoCena);
        theNode.setAttribute('idQuestionario', listaQuestionariosCrianca[q].idQuestionario);
    }
    
    $('#listaQuestionarios tbody').on( 'click', 'tr', function () {
        questionarioDrillDownPerguntas($(this).attr('idSessao'), $(this).attr('idCena'), $(this).attr('nrRepeticaoCena'), $(this).attr('idQuestionario'));
        $("#labelQuestionarioTabelaQuestionario").prop('disabled', false);
    } );
}

function questionarioDrillDownPerguntas($idSessao, $idCena, $nrRepeticaoCena, $idQuestionario){
    console.log("aquiP");
    if($tabelaQuestionariosDrillDownPerguntas != null)
        $tabelaQuestionariosDrillDownPerguntas.fnClearTable();
    $tabelaQuestionariosDrillDownPerguntas = $('#listaQuestionariosDrillDownPerguntas').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": [ 1 ] 
        }],
        "bDestroy": true
    });

    for(var p = 0; p < listaPerguntasCrianca.length ; p++){
        if(listaPerguntasCrianca[p].idSessao == $idSessao &&
           listaPerguntasCrianca[p].idCena == $idCena &&
           listaPerguntasCrianca[p].nrRepeticaoCena == $nrRepeticaoCena &&
           listaPerguntasCrianca[p].idQuestionario == $idQuestionario ){
            $tabelaQuestionariosDrillDownPerguntas.fnAddData([
                listaPerguntasCrianca[p].dataHora,
                listaPerguntasCrianca[p].questao, 
                listaPerguntasCrianca[p].respostaPergunta
            ]);
        }
    }

    $("#questionariosTabelaDiv").hide();
    $("#questionariosDrillDownPerguntasTabelaDiv").show();
    $("#questionariosPeguntasNextQuestionario").show();
    $("#labelPerguntaTabelaQuestionario").show();
}
/***************************************
 Função que cria a tabela das perguntas
 ***************************************/
function criaTabelaPerguntas(){
    //cria a tabela
    $tabelaPerguntas = $('#listaPerguntas').dataTable({
        "aoColumnDefs": [{ 
            "bSortable": false, 
            "aTargets": [ 1 ] 
        }] 
    });

    for(var p = 0; p < listaPerguntasCrianca.length ; p++){
        $tabelaPerguntas.fnAddData([
            listaPerguntasCrianca[p].dataHora,
            listaPerguntasCrianca[p].questao, 
            listaPerguntasCrianca[p].respostaPergunta
        ]);
    }
}

/**********************************
 Função que inicializa os gráficos
 **********************************/
function criaGrafico($element){
    console.log("criaGrafico");
    //inicializa o gráfico
    $element.ddBarChart({
        //chartDataLink: "Static_Data.js",
        chartData: jsonData,
        //charData: jsonData2,
        action: 'init', 
        xOddClass: "ui-state-active",
        xEvenClass: "ui-state-default",
        yOddClass: "ui-state-active",
        yEvenClass: "ui-state-default",
        xWrapperClass: "ui-widget-content",
        chartWrapperClass: "ui-widget-content",
        chartBarClass: "ui-state-focus ui-corner-top",
        chartBarHoverClass: "ui-state-highlight",
        callBeforeLoad: function (){$('#loading-Notification_static').fadeIn(500);},
        callAfterLoad: function (){$('#loading-Notification_static').stop().fadeOut(0);},
        tooltipSettings: {extraClass: "ui-widget ui-widget-content ui-corner-all"}
    });
}

/**************************************************
 Função que cria o json para o gráfico das sessões
 **************************************************/
function createJSONDataSessoes(){
    var jsonData = "{\n";
    
        jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE", "DRILL_DATA"],\n';
        jsonData += '"DATA":[\n';

        /********************************SESSOES*********************************************/
        for(var s = 0 ; s < listaSessoesCrianca.length ; s++){
            jsonData += '["Sessões","' + listaSessoesCrianca[s].dataHora + '",' + listaSessoesCrianca[s].mediaPontuacao + ',"Média pontuação ^ ",';

            jsonData += "{\n";
                jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE","DRILL_DATA"],\n';
                jsonData += '"DATA":[\n';
                    /********************************CENAS*********************************************/
                    //conta o numero de cenas na sessao
                    var nrCenasSessao = 0;
                    for(var c = 0 ; c < listaCenasCrianca.length ; c++){
                        if(listaSessoesCrianca[s].idSessao == listaCenasCrianca[c].idSessao){
                            nrCenasSessao++;
                        }
                    }
                    //adiciona ao json
                    for(var c = 0 ; c < listaCenasCrianca.length ; c++){
                        if(listaSessoesCrianca[s].idSessao == listaCenasCrianca[c].idSessao){
                            nrCenasSessao--;
                            var $barXLabel = listaCenasCrianca[c].dataHora + " - " + listaCenasCrianca[c].nomeCena;
                            jsonData += '["Cenas","' + $barXLabel + '",' + listaCenasCrianca[c].pontuacao + ',"Pontuação ^ ",';
                            jsonData += "{\n";
                                
                                /*************************************ACTIVIDADE**************************************************/
                                if(listaCenasCrianca[c].tipoActividadeCena == "Gesto"){
                                    jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE"],\n';
                                    jsonData += '"DATA":[\n';
                                    //conta o numero de gestos
                                    $numeroGestos = 0;
                                    for(var g = 0 ; g < listaGestosCrianca.length ; g++){
                                        if(listaCenasCrianca[c].idSessao == listaGestosCrianca[g].idSessao &&
                                            listaCenasCrianca[c].idCena == listaGestosCrianca[g].idCena &&
                                            listaCenasCrianca[c].nrRepeticaoCena == listaGestosCrianca[g].nrRepeticaoCena){
                                            $numeroGestos++;
                                        }
                                    }
                                    console.log("numeroGestos: " + $numeroGestos);
                                    //adiciona ao json
                                    for(var g = 0 ; g < listaGestosCrianca.length ; g++){
                                        if(listaCenasCrianca[c].idSessao == listaGestosCrianca[g].idSessao &&
                                           listaCenasCrianca[c].idCena == listaGestosCrianca[g].idCena &&
                                           listaCenasCrianca[c].nrRepeticaoCena == listaGestosCrianca[g].nrRepeticaoCena){
                                            $numeroGestos--;
                                            var $barXLabel = listaGestosCrianca[g].dataHora + " - " + listaGestosCrianca[g].nomeGesto;
                                            jsonData += '["Gestos","' + $barXLabel + '",' + listaGestosCrianca[g].pontuacaoGesto + ',"' + listaGestosCrianca[g].respostaGesto + ' ^ "';
                                            
                                            if($numeroGestos == 0)
                                                jsonData += "]\n";
                                            else
                                                jsonData += "],\n";
                                        }
                                    }
                                    
                                    
                                   
                                } else { //listaCenasCrianca[c].tipoActividadeCena == "Questionário"
                                    jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE","DRILL_DATA"],\n';
                                    jsonData += '"DATA":[\n';
                                    //conta o numero de questionarios
                                    $numeroQuestionarios = 0;
                                    for(var q = 0 ; q < listaQuestionariosCrianca.length ; q++){
                                        if(listaCenasCrianca[c].idSessao == listaQuestionariosCrianca[q].idSessao &&
                                           listaCenasCrianca[c].idCena == listaQuestionariosCrianca[q].idCena &&
                                           listaCenasCrianca[c].nrRepeticaoCena == listaQuestionariosCrianca[q].nrRepeticaoCena){
                                            $numeroQuestionarios++;
                                        }
                                    }
                                    console.log("numeroQuestionarios: " + $numeroQuestionarios);
                                    //adiciona ao json
                                    for(var q = 0 ; q < listaQuestionariosCrianca.length ; q++){
                                        if(listaCenasCrianca[c].idSessao == listaQuestionariosCrianca[q].idSessao &&
                                           listaCenasCrianca[c].idCena == listaQuestionariosCrianca[q].idCena &&
                                           listaCenasCrianca[c].nrRepeticaoCena == listaQuestionariosCrianca[q].nrRepeticaoCena){
                                            $numeroQuestionarios--;
                                            var $barXLabel = listaQuestionariosCrianca[q].dataHora + " - " + listaQuestionariosCrianca[q].nomeQuestionario;
                                            jsonData += '["Questionários","' + $barXLabel + '",' + listaQuestionariosCrianca[q].perguntasCorrectas + ',"resposta correctas / total de perguntas = ' + ' ' + listaQuestionariosCrianca[q].perguntasCorrectas + '/' + listaQuestionariosCrianca[q].nrTotalPerguntas + ' ^ ",\n';
                                            jsonData += "{\n";
                                            jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE"],\n';
                                            jsonData += '"DATA":[\n';
                                            
                                            /***********************************PERGUNTAS*********************************************/
                                            //conta numero de perguntas
                                            $numeroPerguntas = 0;
                                            for(var p = 0 ; p < listaPerguntasCrianca.length ; p++){
                                                if(listaQuestionariosCrianca[q].idSessao == listaPerguntasCrianca[p].idSessao &&
                                                   listaQuestionariosCrianca[q].idCena == listaPerguntasCrianca[p].idCena &&
                                                   listaQuestionariosCrianca[q].nrRepeticaoCena == listaPerguntasCrianca[p].nrRepeticaoCena &&
                                                   listaQuestionariosCrianca[q].idQuestionario == listaPerguntasCrianca[p].idQuestionario
                                                  ){
                                                    $numeroPerguntas++;
                                                }
                                            }
                                            
                                            //adiciona ao json
                                            for(var p = 0 ; p < listaPerguntasCrianca.length ; p++){
                                                if(listaQuestionariosCrianca[q].idSessao == listaPerguntasCrianca[p].idSessao &&
                                                   listaQuestionariosCrianca[q].idCena == listaPerguntasCrianca[p].idCena &&
                                                   listaQuestionariosCrianca[q].nrRepeticaoCena == listaPerguntasCrianca[p].nrRepeticaoCena &&
                                                   listaQuestionariosCrianca[q].idQuestionario == listaPerguntasCrianca[p].idQuestionario
                                                  ){
                                                    $numeroPerguntas--;
                                                    
                                                    var resposta = 0;
                                                    if(listaPerguntasCrianca[p].respostaPergunta == "Sim")
                                                        resposta = 1;
                                                    else
                                                        resposta = 0;
                                                    var $barXLabel = listaPerguntasCrianca[p].dataHora + " - " + listaPerguntasCrianca[p].questao;
                                                    jsonData += '["Perguntas","' + $barXLabel + '",' + resposta + ',"' + listaPerguntasCrianca[p].respostaPergunta + ' ^ "';
                                                    
                                                    if($numeroPerguntas == 0)
                                                        jsonData += "]\n";
                                                    else
                                                        jsonData += "],\n";
                                                }
                                            }
                                            /*****************************************************************************************/
                                            jsonData += "]\n";
                                            jsonData += "}\n";
                                        }
                                    }
                                    
                                    
                                    if($numeroQuestionarios == 0)
                                        jsonData += "]\n";
                                    else
                                        jsonData += "],\n";
                                }
                                /**************************************************************************************************/
                                jsonData += ']\n';
                            jsonData += "}\n";
                            
                            if(nrCenasSessao == 0)
                                jsonData += "]\n";
                            else
                                jsonData += "],\n";
                        }   

                    }
                    /**********************************************************************************/
                jsonData += ']\n';
            jsonData += "}\n";
            if(s == listaSessoesCrianca.length - 1)
                jsonData += "]\n";
            else
                jsonData += "],\n";
        }
        /************************************************************************************/
    
        jsonData += ']\n';  
    jsonData += "}\n";

    console.log(jsonData);
    var obj = JSON.parse(jsonData);
    return obj;
   
}

/************************************************
 Função que cria o json para o gráfico das cenas
 ************************************************/
function createJSONDataCenas(){
    var jsonData = "{\n";

        jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE","DRILL_DATA"],\n';
        jsonData += '"DATA":[\n';
        /********************************CENAS*********************************************/
        for(var c = 0 ; c < listaCenasCrianca.length ; c++){
            var $barXLabel = listaCenasCrianca[c].dataHora + " - " + listaCenasCrianca[c].nomeCena;
            jsonData += '["Cenas","' + $barXLabel + '",' + listaCenasCrianca[c].pontuacao + ',"Pontuação ^ ",';
            jsonData += "{\n";
            
            /*************************************ACTIVIDADE**************************************************/
            if(listaCenasCrianca[c].tipoActividadeCena == "Gesto"){
                jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE"],\n';
                jsonData += '"DATA":[\n';
                //conta o numero de gestos
                $numeroGestos = 0;
                for(var g = 0 ; g < listaGestosCrianca.length ; g++){
                    if(listaCenasCrianca[c].idSessao == listaGestosCrianca[g].idSessao &&
                       listaCenasCrianca[c].idCena == listaGestosCrianca[g].idCena &&
                       listaCenasCrianca[c].nrRepeticaoCena == listaGestosCrianca[g].nrRepeticaoCena){
                        $numeroGestos++;
                    }
                }
                console.log("numeroGestos: " + $numeroGestos);
                //adiciona ao json
                for(var g = 0 ; g < listaGestosCrianca.length ; g++){
                    if(listaCenasCrianca[c].idSessao == listaGestosCrianca[g].idSessao &&
                       listaCenasCrianca[c].idCena == listaGestosCrianca[g].idCena &&
                       listaCenasCrianca[c].nrRepeticaoCena == listaGestosCrianca[g].nrRepeticaoCena){
                        $numeroGestos--;
                        var $barXLabel = listaGestosCrianca[g].dataHora + " - " + listaGestosCrianca[g].nomeGesto;
                        jsonData += '["Gestos","' + $barXLabel + '",' + listaGestosCrianca[g].pontuacaoGesto + ',"' + listaGestosCrianca[g].respostaGesto + ' ^ "';

                        if($numeroGestos == 0)
                            jsonData += "]\n";
                        else
                            jsonData += "],\n";
                    }
                }



            } else { //listaCenasCrianca[c].tipoActividadeCena == "Questionário"
                jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE","DRILL_DATA"],\n';
                jsonData += '"DATA":[\n';
                //conta o numero de questionarios
                $numeroQuestionarios = 0;
                for(var q = 0 ; q < listaQuestionariosCrianca.length ; q++){
                    if(listaCenasCrianca[c].idSessao == listaQuestionariosCrianca[q].idSessao &&
                       listaCenasCrianca[c].idCena == listaQuestionariosCrianca[q].idCena &&
                       listaCenasCrianca[c].nrRepeticaoCena == listaQuestionariosCrianca[q].nrRepeticaoCena){
                        $numeroQuestionarios++;
                    }
                }
                console.log("numeroQuestionarios: " + $numeroQuestionarios);
                //adiciona ao json
                for(var q = 0 ; q < listaQuestionariosCrianca.length ; q++){
                    if(listaCenasCrianca[c].idSessao == listaQuestionariosCrianca[q].idSessao &&
                       listaCenasCrianca[c].idCena == listaQuestionariosCrianca[q].idCena &&
                       listaCenasCrianca[c].nrRepeticaoCena == listaQuestionariosCrianca[q].nrRepeticaoCena){
                        $numeroQuestionarios--;
                        var $barXLabel = listaQuestionariosCrianca[q].dataHora + " - " + listaQuestionariosCrianca[q].nomeQuestionario;
                        jsonData += '["Questionários","' + $barXLabel + '",' + listaQuestionariosCrianca[q].perguntasCorrectas + ',"resposta correctas / total de perguntas = ' + ' ' + listaQuestionariosCrianca[q].perguntasCorrectas + '/' + listaQuestionariosCrianca[q].nrTotalPerguntas + ' ^ ",\n';
                        jsonData += "{\n";
                        jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE"],\n';
                        jsonData += '"DATA":[\n';

                        /***********************************PERGUNTAS*********************************************/
                        //conta numero de perguntas
                        $numeroPerguntas = 0;
                        for(var p = 0 ; p < listaPerguntasCrianca.length ; p++){
                            if(listaQuestionariosCrianca[q].idSessao == listaPerguntasCrianca[p].idSessao &&
                               listaQuestionariosCrianca[q].idCena == listaPerguntasCrianca[p].idCena &&
                               listaQuestionariosCrianca[q].nrRepeticaoCena == listaPerguntasCrianca[p].nrRepeticaoCena &&
                               listaQuestionariosCrianca[q].idQuestionario == listaPerguntasCrianca[p].idQuestionario
                              ){
                                $numeroPerguntas++;
                            }
                        }

                        //adiciona ao json
                        for(var p = 0 ; p < listaPerguntasCrianca.length ; p++){
                            if(listaQuestionariosCrianca[q].idSessao == listaPerguntasCrianca[p].idSessao &&
                               listaQuestionariosCrianca[q].idCena == listaPerguntasCrianca[p].idCena &&
                               listaQuestionariosCrianca[q].nrRepeticaoCena == listaPerguntasCrianca[p].nrRepeticaoCena &&
                               listaQuestionariosCrianca[q].idQuestionario == listaPerguntasCrianca[p].idQuestionario
                              ){
                                $numeroPerguntas--;

                                var resposta = 0;
                                if(listaPerguntasCrianca[p].respostaPergunta == "Sim")
                                    resposta = 1;
                                else
                                    resposta = 0;
                                var $barXLabel = listaPerguntasCrianca[p].dataHora + " - " + listaPerguntasCrianca[p].questao;
                                jsonData += '["Perguntas","' + $barXLabel + '",' + resposta + ',"' + listaPerguntasCrianca[p].respostaPergunta + ' ^ "';

                                if($numeroPerguntas == 0)
                                    jsonData += "]\n";
                                else
                                    jsonData += "],\n";
                            }
                        }
                        /*****************************************************************************************/
                        jsonData += "]\n";
                        jsonData += "}\n";
                    }
                }


                if($numeroQuestionarios == 0)
                    jsonData += "]\n";
                else
                    jsonData += "],\n";
            }
            /**************************************************************************************************/
            jsonData += ']\n';
            
            
            jsonData += "}\n";
            if(c == listaCenasCrianca.length - 1)
                jsonData += "]\n";
            else
                jsonData += "],\n";
        }
            
            
        /**********************************************************************************/
        jsonData += ']\n';
        jsonData += "}\n";

    console.log(jsonData);
    var obj = JSON.parse(jsonData);
    return obj;
}

/*************************************************
 Função que cria o json para o gráfico dos gesots
 *************************************************/
function createJSONDataGestos(){
    var jsonData = "{\n";

    jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE"],\n';
    jsonData += '"DATA":[\n';
    /********************************GESTOS*********************************************/
    for(var g = 0 ; g < listaGestosCrianca.length ; g++){
        var $barXLabel = listaGestosCrianca[g].dataHora + " - " + listaGestosCrianca[g].nomeGesto;
        jsonData += '["Gestos","' + $barXLabel + '",' + listaGestosCrianca[g].pontuacaoGesto + ',"' + listaGestosCrianca[g].nomeGesto + ' ^ ' + listaGestosCrianca[g].respostaGesto + ' ^ "';
        
        if(g == listaGestosCrianca.length - 1)
            jsonData += "]\n";
        else
            jsonData += "],\n";
    }
    /**********************************************************************************/
    jsonData += ']\n';
    jsonData += "}\n";

    console.log(jsonData);
    var obj = JSON.parse(jsonData);
    return obj;
}

/********************************************************
 Função que cria o json para o gráfico dos questionários
 ********************************************************/
function createJSONDataQuestionarios(){
    var jsonData = "{\n";

    jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE","DRILL_DATA"],\n';
    jsonData += '"DATA":[\n';
    /********************************QUESTIONARIO*********************************************/
    for(var q = 0 ; q < listaQuestionariosCrianca.length ; q++){
        var $barXLabel = listaQuestionariosCrianca[q].dataHora + " - " + listaQuestionariosCrianca[q].nomeQuestionario;
        jsonData += '["Questionários","' + $barXLabel + '",' + listaQuestionariosCrianca[q].perguntasCorrectas + ',"resposta correctas / total de perguntas = ' + ' ' + listaQuestionariosCrianca[q].perguntasCorrectas + '/' + listaQuestionariosCrianca[q].nrTotalPerguntas + ' ^ ",\n';
      
        jsonData += "{\n";
        jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE"],\n';
        jsonData += '"DATA":[\n';

        /***********************************PERGUNTAS*********************************************/
        //conta numero de perguntas
        $numeroPerguntas = 0;
        for(var p = 0 ; p < listaPerguntasCrianca.length ; p++){
            if(listaQuestionariosCrianca[q].idSessao == listaPerguntasCrianca[p].idSessao &&
               listaQuestionariosCrianca[q].idCena == listaPerguntasCrianca[p].idCena &&
               listaQuestionariosCrianca[q].nrRepeticaoCena == listaPerguntasCrianca[p].nrRepeticaoCena &&
               listaQuestionariosCrianca[q].idQuestionario == listaPerguntasCrianca[p].idQuestionario
              ){
                $numeroPerguntas++;
            }
        }

        //adiciona ao json
        for(var p = 0 ; p < listaPerguntasCrianca.length ; p++){
            if(listaQuestionariosCrianca[q].idSessao == listaPerguntasCrianca[p].idSessao &&
               listaQuestionariosCrianca[q].idCena == listaPerguntasCrianca[p].idCena &&
               listaQuestionariosCrianca[q].nrRepeticaoCena == listaPerguntasCrianca[p].nrRepeticaoCena &&
               listaQuestionariosCrianca[q].idQuestionario == listaPerguntasCrianca[p].idQuestionario
              ){
                $numeroPerguntas--;

                var resposta = 0;
                if(listaPerguntasCrianca[p].respostaPergunta == "Sim")
                    resposta = 1;
                else
                    resposta = 0;
                var $barXLabel = listaPerguntasCrianca[p].dataHora + " - " + listaPerguntasCrianca[p].questao;
                jsonData += '["Perguntas","' + $barXLabel + '",' + resposta + ',"' + listaPerguntasCrianca[p].respostaPergunta + ' ^ "';

                if($numeroPerguntas == 0)
                    jsonData += "]\n";
                else
                    jsonData += "],\n";
            }
        }
        /*****************************************************************************************/
        jsonData += ']\n';


        jsonData += "}\n";
        if(q == listaQuestionariosCrianca.length - 1)
            jsonData += "]\n";
        else
            jsonData += "],\n";
    }
    /*****************************************************************************************/
    jsonData += ']\n';
    jsonData += "}\n";

    console.log(jsonData);
    var obj = JSON.parse(jsonData);
    return obj;
}
/****************************************************
 Função que cria o json para o gráfico das perguntas
 ****************************************************/
function createJSONDataPerguntas(){
    var jsonData = "{\n";

    jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE"],\n';
    jsonData += '"DATA":[\n';
    /********************************PERGUNTAS*********************************************/
    for(var p = 0 ; p < listaPerguntasCrianca.length ; p++){
        var resposta = 0;
        if(listaPerguntasCrianca[p].respostaPergunta == "Sim")
            resposta = 1;
        else
            resposta = 0;
        
        var $barXLabel = listaPerguntasCrianca[p].dataHora + " - " + listaPerguntasCrianca[p].questao;
        jsonData += '["Perguntas","' + $barXLabel + '",' + resposta + ',"' + listaPerguntasCrianca[p].respostaPergunta + ' ^ "';


        if(p == listaPerguntasCrianca.length - 1)
            jsonData += "]\n";
        else
            jsonData += "],\n";
    }
    /**********************************************************************************/
    jsonData += ']\n';
    jsonData += "}\n";

    console.log(jsonData);
    var obj = JSON.parse(jsonData);
    return obj;
}