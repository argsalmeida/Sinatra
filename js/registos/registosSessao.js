var criancasSessao = [];
//variavel que guarda os objectos crianca com a media de pontuacao da sessao
var registoCriancasMediaPontuacaoSessao = [];
//variavel que guarda os objectos crianca com a pontuacao de cada cena feita pela mesma
var registoCriancasPorCenas = [];
//variavel que guarda a informação sobre os gestos/questionarios por crianca e por cena
var registoCriancasCenasGestosQuestionarios = [];
//variavel que guarda a informacao sobre as perguntas
var registoCriancasQuestionarioPerguntas = [];
 
var jsonData = '';
$(document).ready(function(){    
    //LocalStorage
    if(typeof(Storage)==="undefined"){
        alert("Lamentamos, mas o seu browser nao suporta web storage...");
    } else {
        var $idTerapeutaLogin = window.localStorage.getItem('idTerapeutaLogin');

        //verifica se houve um login feito
        if($idTerapeutaLogin != null){
            //vai buscar o id da sessao cujos registos se quer mostrar
            var $idSessao = window.localStorage.getItem('registoSessao');
            //vai buscar os dados da sessão
            getSessaoHistoricoById($idSessao, "registoSessao");
            //vai buscar os registos consoante a sessão
            getRegistosBySessaoId($idSessao, "registoSessao");
            
            setButtonsRegistos();
            jsonData = createJSONData();    
            //inicializa o gráfico
            $("#chart_div_static").ddBarChart({
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
        
        }else{
            alert("Tem de se autenticar para ter acesso a este conteúdo!");	
            location.href='../loginSessao.html';
        }
    }	    

});

/************************************
 Função que trata os dados da sessão
*************************************/
function preencheDadosSessaoRegistos($xmlResponse){
    console.log("preencheDadosSessaoRegistos");
    console.log($xmlResponse);
    //cria um objecto com as criancas na sessao
    if($($xmlResponse).find('crianca')){
        $($xmlResponse).find('crianca').each(function(){
            if(Number($(this).find('enable').text()) == 1){
                criancasSessao.push($(this).find('id').text());
            }
        });
    }else{
        alert("Não foram encontradas crianças");
    }
    
    var $tipoExercicio = '';
    //preenche o div com o resumo da sessao
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

                break;
        }
    });
    
    //preenche o div com os dados da sessao
    switch($tipoExercicio){
        case 'História':
            $($xmlResponse).find('sessao').find('historia').find('cena').each(function(){
                
                var $nomeCena = $(this).find('nome').map(function () {
                    return $(this).text();
                }).get(0);
                
                //nome da cena
                $("#dadosDiv").append('<p class="nomeCenaHistorico">\u25B8 ' + $nomeCena + '</p>');
                
                //introducao
                $("#dadosDiv").append('<p class="introducaoHistorico">\u25B8 ' + 'Introdução' + '</p>');

                var $tipoActividade = $(this).find('tipoActividade').map(function () {
                    return $(this).text();
                }).get(0);
                
                $("#dadosDiv").append('<p class="tipoActividadeHistorico">\u25B8 ' + $tipoActividade + '</p>');
                
                if($tipoActividade == 'Gesto'){
                   $(this).find('gesto').each(function(){
                       $nomeGesto = $(this).find('nomeGesto').map(function () {
                           return $(this).text();
                       }).get(0);
                       
                       $nrRepeticoesGesto = $(this).find('nrRepeticaoGestos').map(function () {
                           return $(this).text();
                       }).get(0);

                    for(var i = 1; i <= $nrRepeticoesGesto ; i++)
                        $("#dadosDiv").append('<p class="actividadeGestoHistorico">\u25B8 ' + $nomeGesto + ' - Repeticão nº' + i + '</p>');
                    
                     
                    
                    });
                } else { //questionario
                    $(this).find('questionario').each(function(){
                        $nomeQuestionario = $(this).find('nomeQuestionario').map(function () {
                            return $(this).text();
                        }).get(0);
                        $("#dadosDiv").append('<p class="actividadeQuestionarioHistorico">\u25B8 ' + $nomeQuestionario + '</p>');
                        $(this).find('pergunta').each(function(){
                            $questao = $(this).find('questao').map(function () {
                                return $(this).text();
                            }).get(0);
                            $("#dadosDiv").append('<p class="perguntasQuestionarioHistorico">\u25B8 ' + $questao + '</p>');
                        });    
                    });
                }
                
                //reforco ou reforco/pontuacao
                var $pontuacao = $(this).find('pontuacao').map(function () {
                    return $(this).text();
                }).get(0);
                if($pontuacao == 0)
                    $("#dadosDiv").append('<p class="reforcoPontuacaoHistorico">\u25B8 ' + 'Reforço' + '</p>');		
                else
                    $("#dadosDiv").append('<p class="reforcoPontuacaoHistorico">\u25B8 ' + 'Reforço/Pontuação' + '</p>');		 
                
            });
            break;
            case "CoDraw":
                $("#dadosDiv").append('<p id="mensagemArvoreHistoricoSessao"> Não existem detalhes a apresentar.</p>');
            break;
    }
    
    //preenche o div com o log da sessão
    $logSessao = $($xmlResponse).find('logSessao').text();
    $logSessaoArray = $logSessao.split('\n');
    for(var j = 0 ; j < $logSessaoArray.length ; j++){
        $("#logColuna").append('<p class="logSessao">' + $logSessaoArray[j] + '</p>');	
    }

    //preenche o div com as anotações da sessão
    $anotacoesSessao = $($xmlResponse).find('anotacoesSessao').text();
    console.log($anotacoesSessao);
    if($anotacoesSessao == '')
        $("#anotacoesColuna").append('<p class="anotacoesSessao">Não existem anotações a apresentar.</p>');
    else{
        $anotacoesSessaoArray = $anotacoesSessao.split('\n');
        for(var j = 0 ; j < $anotacoesSessaoArray.length ; j++){
            $("#anotacoesColuna").append('<p class="anotacoesSessao">' + $anotacoesSessaoArray[j] + '</p>');	
        }
    }

}

/***************************************
 Função que trata os registos da sessão
***************************************/
function preencheRegistosSessao($xmlResponse){
    console.log("preencheRegistos");
    console.log($xmlResponse);
    //calcula a media da pontuacao da sessao para cada crianca
    mediaPontuacaoSessaoPorCrianca($xmlResponse);
    //vai buscar a pontuacao por cada cena para cada crianca
    pontuacaoCenasPorCrianca($xmlResponse);
    //vai buscar os dados dos gestos para cada crianca com base na cena
    dadosGestosQuestionariosCriancaCena($xmlResponse);
    
 /*  console.log("registoCriancasCenasGestosQuestionarios");
    for(var i = 0 ; i < registoCriancasCenasGestosQuestionarios.length; i++){
        console.log(registoCriancasCenasGestosQuestionarios[i]);
    }
        console.log("registoCriancasQuestionarioPerguntas.length");
    for(var i = 0 ; i < registoCriancasQuestionarioPerguntas.length; i++){
        console.log(registoCriancasQuestionarioPerguntas[i]);
    }
  */ 
}

/******************************************
 Função que trata dos botões dos registos
 ******************************************/
function setButtonsRegistos(){
    //botão logout
    $('#logoutButton').bind('click', function () {
        window.localStorage.setItem('idTerapeutaLogin', null);
        location.href='../loginSessao.html';
    });

    console.log("setButtonsDIv");
    $("#resumoSessaoButton").click(function(){
        console.log("resumoSessaoButton");
        $("#logAnotacoesDiv").hide();
        $("#dadosSessaoDiv").hide();
        $("#graphsDiv").hide();
        $("#resumoSessaoDiv").show();
        $('#resumoSessaoButton').css('border', '2px outset #0191d8');
        $('#logAnotacoesButton').css('border', '2px outset buttonface');
        $('#dadosSessaoButton').css('border', '2px outset buttonface');
        $('#graficosSessaoButton').css('border', '2px outset buttonface');
    });
    $("#logAnotacoesButton").click(function(){
        console.log("logAnotacoesButton");
        $("#resumoSessaoDiv").hide();
        $("#dadosSessaoDiv").hide();
        $("#graphsDiv").hide();
        $("#logAnotacoesDiv").show();
        $('#logAnotacoesButton').css('border', '2px outset #0191d8');
        $('#resumoSessaoButton').css('border', '2px outset buttonface');
        $('#dadosSessaoButton').css('border', '2px outset buttonface');
        $('#graficosSessaoButton').css('border', '2px outset buttonface');
    });
    $("#dadosSessaoButton").click(function(){
        console.log("dadosSessaoButton");
        $("#resumoSessaoDiv").hide();
        $("#logAnotacoesDiv").hide();
        $("#graphsDiv").hide();
        $("#dadosSessaoDiv").show();
        $('#dadosSessaoButton').css('border', '2px outset #0191d8');
        $('#resumoSessaoButton').css('border', '2px outset buttonface');
        $('#logAnotacoesButton').css('border', '2px outset buttonface');
        $('#graficosSessaoButton').css('border', '2px outset buttonface');
    });
    $("#graficosSessaoButton").click(function(){
        console.log("graficosSessaoButton");
        $("#resumoSessaoDiv").hide();    
        $("#dadosSessaoDiv").hide();
        $("#logAnotacoesDiv").hide();
        $("#graphsDiv").show();
        $('#graficosSessaoButton').css('border', '2px outset #0191d8');
        $('#resumoSessaoButton').css('border', '2px outset buttonface');
        $('#logAnotacoesButton').css('border', '2px outset buttonface');
        $('#dadosSessaoButton').css('border', '2px outset buttonface');
    });
   
}
/******************************************
 Função que faz a média das pontuações por
 sessão para cada criança
 ******************************************/
function mediaPontuacaoSessaoPorCrianca($xmlResponse){
    for(var i = 0; i < criancasSessao.length; i++){
        var criancaMediaPontuacao = {
                idCrianca: criancasSessao[i],
                nomeCrianca: '',
                mediaPontuacao: 0
        }
        var $contador = 0;
        var $pontuacao = 0;
        var $encontrei = false;
        //vai percorrer os registos e procurar a crianca pretendida que tenha o tipo de registo pontuacao
        $($xmlResponse).find('registo').each(function(){
            $idCrianca =  $(this).find('crianca').find('id').map(function () {
                return Number($(this).text());
            }).get(0);
            $tipoRegisto = $(this).find('tipoRegisto').text();
            if($idCrianca == criancasSessao[i] && $tipoRegisto == "Pontuacao"){
                criancaMediaPontuacao.nomeCrianca = $(this).find('crianca').find('nome').text();
                $pontuacao += Number($(this).find('pontuacaoCena').text());
                $contador++;
                $encontrei = true;
            }
        });
        //faz a media e adiciona ao objecto
        if($encontrei){
            criancaMediaPontuacao.mediaPontuacao = $pontuacao / $contador;
        } else {
            criancaMediaPontuacao.mediaPontuacao = 0;
        }

        //adiciona ao array de criancas/pontuacao da sessao
        registoCriancasMediaPontuacaoSessao.push(criancaMediaPontuacao);
    }
    /* console.log("registoCriancasMediaPontuacaoSessao");
        for(var k = 0; k < registoCriancasMediaPontuacaoSessao.length ; k++){
            console.log(registoCriancasMediaPontuacaoSessao[k]);
        }*/
}

/***********************************************
 Função que vai buscar a pontuacao de cada cena
 para cada crianca
 ***********************************************/
function pontuacaoCenasPorCrianca($xmlResponse){
    for(var i = 0; i < criancasSessao.length; i++){
        //vai percorrer os registos e procurar a crianca pretendida que tenha o tipo de registo pontuacao
        $($xmlResponse).find('registo').each(function(){
            var criancaPontuacao = {
                idCrianca: criancasSessao[i],
                nomeCrianca: '',
                idCena: 0,
                nomeCena: '',
                tipoRegisto: '',
                nrRepeticaoCena: 0,
                pontuacao: 0,
            }
            
            $idCrianca =  $(this).find('crianca').find('id').map(function () {
                return Number($(this).text());
            }).get(0);
            $tipoRegisto = $(this).find('tipoRegisto').text();
            if($idCrianca == criancasSessao[i] && $tipoRegisto == "Pontuacao"){
                criancaPontuacao.nomeCrianca = $(this).find('crianca').find('nome').text();
                criancaPontuacao.idCena = $(this).find('cena').find('id').map(function () {
                    return Number($(this).text());
                }).get(0);
                criancaPontuacao.nomeCena = $(this).find('cena').find('nome').text();
                criancaPontuacao.tipoRegisto = $tipoRegisto;
                criancaPontuacao.nrRepeticaoCena = $(this).find('nrRepeticaoCena').text();
                criancaPontuacao.pontuacao += Number($(this).find('pontuacaoCena').text());  
                
                //adiciona ao array de criancas/pontuacao da sessao
                registoCriancasPorCenas.push(criancaPontuacao);
            }
        });
    }
    /*console.log("registoCriancasPorCenas");
    for(var k = 0; k < registoCriancasPorCenas.length ; k++){
        console.log(registoCriancasPorCenas[k]);
    }*/
}

/******************************************************
 Função que vai buscar os dados dos gestos ou questionarios
 por crianca e por cena
 ******************************************************/
function dadosGestosQuestionariosCriancaCena($xmlResponse){
    var $tipoRegistoAux = '';
    for(var i = 0; i < criancasSessao.length; i++){
        //vai percorrer os registos e procurar a crianca pretendida que tenha o tipo de registo gesto
        $($xmlResponse).find('registo').each(function(){
            $idCrianca =  $(this).find('crianca').find('id').map(function () {
                return Number($(this).text());
            }).get(0);
            $tipoRegisto = $(this).find('tipoRegisto').text();
            if($idCrianca == criancasSessao[i] && $tipoRegisto == 'Gesto'){
                var criancaGesto = {
                    idCrianca: criancasSessao[i],
                    nomeCrianca: '',
                    idCena: 0,
                    nomeCena: '',
                    tipoRegisto: '',
                    nrRepeticaoCena: 0,
                    idGesto: 0,
                    nomeGesto: '',
                    nrRepeticaoGesto: 0,
                    pontuacaoGesto: 0,
                    respostaGesto: '',
                }
                criancaGesto.nomeCrianca = $(this).find('crianca').find('nome').text();
                criancaGesto.idCena = $(this).find('cena').find('id').map(function () {
                    return Number($(this).text());
                }).get(0);
                criancaGesto.nomeCena = $(this).find('cena').find('nome').text();
                criancaGesto.tipoRegisto = $tipoRegisto;
                criancaGesto.nrRepeticaoCena = $(this).find('nrRepeticaoCena').text();
                criancaGesto.idGesto = $(this).find('gesto').find('id').map(function () {
                    return Number($(this).text());
                }).get(0);
                criancaGesto.nomeGesto = $(this).find('gesto').find('nomeGesto').map(function () {
                    return $(this).text();
                }).get(0);
                criancaGesto.nrRepeticaoGesto = $(this).find('nrRepeticaoGesto').text();
                criancaGesto.pontuacaoGesto = Number($(this).find('pontuacaoGesto').text());  
                criancaGesto.respostaGesto = $(this).find('respostaGesto').text(); 
                //adiciona ao array de criancas/pontuacao da sessao
                registoCriancasCenasGestosQuestionarios.push(criancaGesto);
            } else if($idCrianca == criancasSessao[i] && $tipoRegisto == 'Questionario'){ //Se for questionario
                var criancaQuestionario = {
                    idCrianca: criancasSessao[i],
                    nomeCrianca: '',
                    idCena: 0,
                    nomeCena: '',
                    tipoRegisto: '',
                    nrRepeticaoCena: 0,
                    idQuestionario: 0,
                    nomeQuestionario: '',
                    nrTotalPerguntas: 0,
                    nrRespostasCertas: 0
                }
                
                criancaQuestionario.nomeCrianca = $(this).find('crianca').find('nome').text();
                criancaQuestionario.idCena = $(this).find('cena').find('id').map(function () {
                    return Number($(this).text());
                }).get(0);
                criancaQuestionario.nomeCena = $(this).find('cena').find('nome').text();
                criancaQuestionario.tipoRegisto = $tipoRegisto;
                criancaQuestionario.nrRepeticaoCena = $(this).find('nrRepeticaoCena').text();
                criancaQuestionario.idQuestionario = $(this).find('questionario').find('id').map(function () {
                    return Number($(this).text());
                }).get(0);
                criancaQuestionario.nomeQuestionario = $(this).find('questionario').find('nomeQuestionario').map(function () {
                    return $(this).text();
                }).get(0);
                criancaQuestionario.nrTotalPerguntas = $(this).find('questionario').find('idPerguntas').map(function () {
                    return $(this).text();
                }).get(0).split(',').length;

                //adiciona ao array de criancas/pontuacao da sessao
                if(registoCriancasCenasGestosQuestionarios.length == 0){
                    registoCriancasCenasGestosQuestionarios.push(criancaQuestionario);
                } else{
                    var $encontrei = false;
                    for(var j = 0 ; j < registoCriancasCenasGestosQuestionarios.length; j++){
                        if(registoCriancasCenasGestosQuestionarios[j].tipoRegisto == "Questionario" &&
                           registoCriancasCenasGestosQuestionarios[j].idCrianca == criancaQuestionario.idCrianca &&
                           registoCriancasCenasGestosQuestionarios[j].idCena == criancaQuestionario.idCena &&
                           registoCriancasCenasGestosQuestionarios[j].nrRepeticaoCena == criancaQuestionario.nrRepeticaoCena &&
                           registoCriancasCenasGestosQuestionarios[j].idQuestionario == criancaQuestionario.idQuestionario
                          ){
                            $encontrei = true;
                            break;
                        }
                    }
                    if(!$encontrei){
                        registoCriancasCenasGestosQuestionarios.push(criancaQuestionario);
                    }
                }
                
                var criancaQuestionarioPergunta = {
                    idCrianca: criancasSessao[i],
                    nomeCrianca: '',
                    idCena: 0,
                    nomeCena: '',
                    tipoRegisto: '',
                    nrRepeticaoCena: 0,
                    idQuestionario: 0,
                    idPergunta: 0,
                    questao: '',
                    respostaPergunta: ''                    
                }
                
                criancaQuestionarioPergunta.nomeCrianca = $(this).find('crianca').find('nome').text();
                criancaQuestionarioPergunta.idCena = $(this).find('cena').find('id').map(function () {
                    return Number($(this).text());
                }).get(0);
                criancaQuestionarioPergunta.nomeCena = $(this).find('cena').find('nome').text();
                criancaQuestionarioPergunta.tipoRegisto = $tipoRegisto;
                criancaQuestionarioPergunta.nrRepeticaoCena = $(this).find('nrRepeticaoCena').text();
                criancaQuestionarioPergunta.idQuestionario = $(this).find('questionario').find('id').map(function () {
                    return Number($(this).text());
                }).get(0);
                criancaQuestionarioPergunta.idPergunta = $(this).find('pergunta').find('id').map(function () {
                    return $(this).text();
                }).get(0);
                criancaQuestionarioPergunta.questao = $(this).find('pergunta').find('questao').map(function () {
                    return $(this).text();
                }).get(0);
                criancaQuestionarioPergunta.respostaPergunta = $(this).find('respostaPergunta').text();

                //adiciona ao array de perguntas
                registoCriancasQuestionarioPerguntas.push(criancaQuestionarioPergunta);
            }
            
        });
    }
        contaNumeroPerguntasCorrectasQuestionario();
}

function contaNumeroPerguntasCorrectasQuestionario(){
    if(registoCriancasQuestionarioPerguntas.length != 0){
        //console.log("contaNumeroPerguntasCorrectasQuestionario");
        //console.log("contaNumeroPerguntasCorrectasQuestionario");
        var numeroPerguntasCorrectasCriancaQuestionario = [];

        var numeroPerguntas = {
            idCrianca: registoCriancasQuestionarioPerguntas[0].idCrianca,
            idCena: registoCriancasQuestionarioPerguntas[0].idCena,
            nrRepeticaoCena: registoCriancasQuestionarioPerguntas[0].nrRepeticaoCena,
            idQuestionario: registoCriancasQuestionarioPerguntas[0].idQuestionario,
            perguntasCorrectas: 0
        }
        numeroPerguntasCorrectasCriancaQuestionario.push(numeroPerguntas);

        var contador = 1;
        for(var i = 0 ; i < registoCriancasQuestionarioPerguntas.length; i++){
            if(registoCriancasQuestionarioPerguntas[i].tipoRegisto == "Questionario"){
                var $encontrei = false;
                for(var j = 0 ; j < numeroPerguntasCorrectasCriancaQuestionario.length; j++){
                    if(numeroPerguntasCorrectasCriancaQuestionario[j].idCrianca == registoCriancasQuestionarioPerguntas[i].idCrianca &&
                       numeroPerguntasCorrectasCriancaQuestionario[j].idCena == registoCriancasQuestionarioPerguntas[i].idCena &&
                       numeroPerguntasCorrectasCriancaQuestionario[j].nrRepeticaoCena == registoCriancasQuestionarioPerguntas[i].nrRepeticaoCena &&
                       numeroPerguntasCorrectasCriancaQuestionario[j].idQuestionario == registoCriancasQuestionarioPerguntas[i].idQuestionario
                      ){
                        $encontrei = true;
                        if(registoCriancasQuestionarioPerguntas[i].respostaPergunta == "Sim"){
                            numeroPerguntasCorrectasCriancaQuestionario[j].perguntasCorrectas++;
                        }
                    } 
                }
                if(!$encontrei){
                    var numeroPerguntas = {
                        idCrianca: registoCriancasQuestionarioPerguntas[i].idCrianca,
                        idCena: registoCriancasQuestionarioPerguntas[i].idCena,
                        nrRepeticaoCena: registoCriancasQuestionarioPerguntas[i].nrRepeticaoCena,
                        idQuestionario: registoCriancasQuestionarioPerguntas[i].idQuestionario,
                        perguntasCorrectas: 0
                    }
                    if(registoCriancasQuestionarioPerguntas[i].respostaPergunta == "Sim"){
                        numeroPerguntas.perguntasCorrectas = 1;
                    }
                    numeroPerguntasCorrectasCriancaQuestionario.push(numeroPerguntas);
                }
            }
        }
   
        for(var i = 0; i < numeroPerguntasCorrectasCriancaQuestionario.length ; i++){
            for(var j = 0; j < registoCriancasCenasGestosQuestionarios.length; j++){
                if(registoCriancasCenasGestosQuestionarios[j].tipoRegisto == "Questionario" &&
                   numeroPerguntasCorrectasCriancaQuestionario[i].idCrianca == registoCriancasCenasGestosQuestionarios[j].idCrianca &&
                   numeroPerguntasCorrectasCriancaQuestionario[i].idCena == registoCriancasCenasGestosQuestionarios[j].idCena &&
                   numeroPerguntasCorrectasCriancaQuestionario[i].nrRepeticaoCena == registoCriancasCenasGestosQuestionarios[j].nrRepeticaoCena &&
                   numeroPerguntasCorrectasCriancaQuestionario[i].idQuestionario == registoCriancasCenasGestosQuestionarios[j].idQuestionario
                  ){
                    registoCriancasCenasGestosQuestionarios[j].nrRespostasCertas = numeroPerguntasCorrectasCriancaQuestionario[i].perguntasCorrectas;
                }
            }
        }
    }
}

/****************************************
 Função que cria o JSON para os gráficos
 ****************************************/
function createJSONData(){
    var jsonData = "{\n";
        jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE","DRILL_DATA"],\n';
        jsonData += '"DATA":[\n';
   /************************************************************************************************************/
        //grafico 1 - media pontuacao das cenas por crianca
        for(var c = 0 ; c < criancasSessao.length ; c++){
            for(var p = 0; p < registoCriancasMediaPontuacaoSessao.length ; p++){
                if(criancasSessao[c] == registoCriancasMediaPontuacaoSessao[p].idCrianca){
                    jsonData += '["Sessão","' + registoCriancasMediaPontuacaoSessao[p].nomeCrianca + '",' + registoCriancasMediaPontuacaoSessao[p].mediaPontuacao + ',"Sessão ^ ",\n';
                    jsonData += "{\n";
                        jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE","DRILL_DATA"],\n';
                        jsonData += '"DATA":[\n';
                        var numeroCenas = 0;
                        for(var n = 0; n < registoCriancasPorCenas.length ; n++){
                            if(criancasSessao[c] == registoCriancasPorCenas[n].idCrianca)
                                numeroCenas++;
                        }
                        for(var n = 0; n < registoCriancasPorCenas.length ; n++){
                            if(criancasSessao[c] == registoCriancasPorCenas[n].idCrianca){
                                numeroCenas--;
                                jsonData += '["Cena","' + registoCriancasPorCenas[n].nomeCena + '",' + registoCriancasPorCenas[n].pontuacao + ',"' + registoCriancasPorCenas[n].nomeCena + ' ^ ",\n';
                                jsonData += "{\n";
                                
                                //verifico qual o tipo de actividade da cena
                                var $tipoActividadeCena = getTipoActividadeCena(registoCriancasPorCenas[n].idCena);
                                /**********************************************************************************************/    
                                if ($tipoActividadeCena == "Gesto"){
                                    jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE"],\n';
                                    jsonData += '"DATA":[\n';        

                                        var numeroGestos = 0;
                                        for(var g = 0; g < registoCriancasCenasGestosQuestionarios.length ; g++){
                                            if(criancasSessao[c] == registoCriancasCenasGestosQuestionarios[g].idCrianca && registoCriancasPorCenas[n].idCena == registoCriancasCenasGestosQuestionarios[g].idCena && registoCriancasPorCenas[n].nrRepeticaoCena == registoCriancasCenasGestosQuestionarios[g].nrRepeticaoCena)
                                                numeroGestos++;
                                        }
                                    
                                        for(var g = 0; g < registoCriancasCenasGestosQuestionarios.length ; g++){
                                            if(criancasSessao[c] == registoCriancasCenasGestosQuestionarios[g].idCrianca && registoCriancasPorCenas[n].idCena == registoCriancasCenasGestosQuestionarios[g].idCena && registoCriancasPorCenas[n].nrRepeticaoCena == registoCriancasCenasGestosQuestionarios[g].nrRepeticaoCena){
                                                numeroGestos--;
                                             jsonData += '["Gesto","' + registoCriancasCenasGestosQuestionarios[g].nomeGesto + '",' + registoCriancasCenasGestosQuestionarios[g].pontuacaoGesto + ',"' + registoCriancasCenasGestosQuestionarios[g].respostaGesto + ' ^ "';
                                                if(numeroGestos == 0)
                                                    jsonData += "]\n";
                                                else
                                                    jsonData += "],\n";
                                            }
                                        }
                                        jsonData += ']\n';
                                } else { //Questionário
                                    jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE","DRILL_DATA"],\n';
                                    jsonData += '"DATA":[\n';  
                                        
                                    var numeroQuestionarios = 0;
                                    for(var g = 0; g < registoCriancasCenasGestosQuestionarios.length ; g++){
                                        if(criancasSessao[c] == registoCriancasCenasGestosQuestionarios[g].idCrianca && registoCriancasPorCenas[n].idCena == registoCriancasCenasGestosQuestionarios[g].idCena && registoCriancasPorCenas[n].nrRepeticaoCena == registoCriancasCenasGestosQuestionarios[g].nrRepeticaoCena)
                                            numeroQuestionarios++;
                                    }

                                    for(var g = 0; g < registoCriancasCenasGestosQuestionarios.length ; g++){
                                        if(criancasSessao[c] == registoCriancasCenasGestosQuestionarios[g].idCrianca && registoCriancasPorCenas[n].idCena == registoCriancasCenasGestosQuestionarios[g].idCena && registoCriancasPorCenas[n].nrRepeticaoCena == registoCriancasCenasGestosQuestionarios[g].nrRepeticaoCena){
                                            numeroQuestionarios--;
                                            jsonData += '["Questionário","' + registoCriancasCenasGestosQuestionarios[g].nomeQuestionario + '",' + registoCriancasCenasGestosQuestionarios[g].nrRespostasCertas + ',"resposta correctas / total de perguntas = ' + ' ' + registoCriancasCenasGestosQuestionarios[g].nrRespostasCertas + '/' + registoCriancasCenasGestosQuestionarios[g].nrTotalPerguntas + ' ^ ",\n';
                                            
                                            jsonData += "{\n";
                                            jsonData += '"COLUMNS":["CONTEXT","X_BAR_LABEL","X_BAR_VALUE","TOOL_TIP_TITLE"],\n';
                                            jsonData += '"DATA":[\n';
                                                
                                            var numeroPerguntas = 0;
                                            for(var l = 0; l < registoCriancasQuestionarioPerguntas.length ; l++){
                                                if(criancasSessao[c] == registoCriancasQuestionarioPerguntas[l].idCrianca && registoCriancasPorCenas[n].idCena == registoCriancasQuestionarioPerguntas[l].idCena && registoCriancasPorCenas[n].nrRepeticaoCena == registoCriancasQuestionarioPerguntas[l].nrRepeticaoCena && registoCriancasCenasGestosQuestionarios[g].idQuestionario == registoCriancasQuestionarioPerguntas[l].idQuestionario)
                                                    numeroPerguntas++;
                                            }
                                            
                                            /******************************************/
                                            for(var l = 0; l < registoCriancasQuestionarioPerguntas.length ; l++){
                                            if(criancasSessao[c] == registoCriancasQuestionarioPerguntas[l].idCrianca && registoCriancasPorCenas[n].idCena == registoCriancasQuestionarioPerguntas[l].idCena && registoCriancasPorCenas[n].nrRepeticaoCena == registoCriancasQuestionarioPerguntas[l].nrRepeticaoCena && registoCriancasCenasGestosQuestionarios[g].idQuestionario == registoCriancasQuestionarioPerguntas[l].idQuestionario){
                                                numeroPerguntas--;
                                                var resposta = 0;
                                                if(registoCriancasQuestionarioPerguntas[l].respostaPergunta == "Sim")
                                                    resposta = 1;
                                                else
                                                    resposta = 0;
                                                
                                             jsonData += '["Pergunta","' + registoCriancasQuestionarioPerguntas[l].questao + '",' + resposta + ',"' + registoCriancasQuestionarioPerguntas[l].respostaPergunta + ' ^ "';
                                                if(numeroPerguntas == 0)
                                                    jsonData += "]\n";
                                                else
                                                    jsonData += "],\n";
                                                }
                                            }
                                        
                                            
                                            /******************************************/
                                            
                                            jsonData += ']\n';
                                            jsonData += "}\n";
                                            
                                            
                                            if(numeroQuestionarios == 0)
                                                jsonData += "]\n";
                                            else
                                                jsonData += "],\n";
                                        }
                                    }
                                
                                    jsonData += ']\n';
                                }
                                /**********************************************************************************************/
                                    
                                /***********************************************************************************************/
                                jsonData += "}\n";
                                if(numeroCenas == 0)
                                    jsonData += "]\n";
                                else
                                    jsonData += "],\n";
                            }
                        }
                        jsonData += "]\n";
                    jsonData += "}\n";
                    if(c == criancasSessao.length - 1)
                        jsonData += "]\n";
                    else
                        jsonData += "],\n";
                }
            }
        }
    /************************************************************************************************************/
        jsonData += ']\n';
    jsonData += "}\n";
    //console.log(jsonData);
    var obj = JSON.parse(jsonData);

    return obj;
}
