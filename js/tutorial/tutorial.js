$(document).ready(function(e){

    $("#login").click(function(){
        changeClassAllLi();
        $("#login").attr('class', 'blue');
        $(".contents").hide();
        $("#loginContent").show();
    });
    $("#sessoesRealizar").click(function(){
        changeClassAllLi();
        $("#sessoesRealizar").attr('class', 'blue');
        $(".contents").hide();
        $("#sessoesArealizarContent").show();
    });
    $("#sessoesRealizarPlay").click(function(){
        changeClassAllLi();
        $("#sessoesRealizarPlay").attr('class', 'blue');
        $("#sessoesRealizar").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#sessoesArealizarPlayContent").show();
        
    });
    $("#sessoesRealizarEditarSessao").click(function(){
        changeClassAllLi();
        $("#sessoesRealizarEditarSessao").attr('class', 'blue');
        $("#sessoesRealizar").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#sessoesArealizarEditarSessaoContent").show();
    });
    $("#sessoesRealizarRemoverSessao").click(function(){
        changeClassAllLi();
        $("#sessoesRealizarRemoverSessao").attr('class', 'blue');
        $("#sessoesRealizar").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#sessoesArealizarRemoverSessaoContent").show();
    });
    $("#sessoesRealizarDuplicarSessao").click(function(){
        changeClassAllLi();
        $("#sessoesRealizarDuplicarSessao").attr('class', 'blue');
        $("#sessoesRealizar").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#sessoesArealizarDuplicarSessaoContent").show();
    });
    $("#sessoesRealizarAdicionarSessao").click(function(){
        changeClassAllLi();
        $("#sessoesRealizarAdicionarSessao").attr('class', 'blue');
        $("#sessoesRealizar").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#sessoesArealizarAdicionarSessaoContent").show();
    });

    $("#historicoSessoes").click(function(){
        changeClassAllLi();
        $("#historicoSessoes").attr('class', 'blue');
        $(".contents").hide();
        $("#historicoSessoesContent").show();
        
    });

    $("#historicoSessoesDuplicarSessao").click(function(){
        changeClassAllLi();
        $("#historicoSessoesDuplicarSessao").attr('class', 'blue');
        $("#historicoSessoes").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#historicoSessoesDuplicarSessaoContent").show();
    });

    $("#historicoSessoesRegistosSessao").click(function(){
        changeClassAllLi();
        $("#historicoSessoesRegistosSessao").attr('class', 'blue');
        $("#historicoSessoes").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#historicoSessoesRegistosSessaoContent").show();
    });

    
    $("#terapeutas").click(function(){
        changeClassAllLi();
        $("#terapeutas").attr('class', 'blue');
        $(".contents").hide();
        $("#terapeutasContent").show();
    });
    
    $("#terapeutasEditarTerapeuta").click(function(){
        changeClassAllLi();
        $("#terapeutasEditarTerapeuta").attr('class', 'blue');
        $("#terapeutas").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#terapeutasEditarContent").show();
    });

    $("#terapeutasRemoverTerapeuta").click(function(){
        changeClassAllLi();
        $("#terapeutasRemoverTerapeuta").attr('class', 'blue');
        $("#terapeutas").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#terapeutasRemoverContent").show();
    });

    $("#terapeutasAdicionarTerapeuta").click(function(){
        changeClassAllLi();
        $("#terapeutasAdicionarTerapeuta").attr('class', 'blue');
        $("#terapeutas").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#terapeutasAdicionarTerapeutaContent").show();
    });

    $("#criancas").click(function(){
        changeClassAllLi();
        $("#criancas").attr('class', 'blue');
        $(".contents").hide();
        $("#criancasContent").show();
    });

    $("#criancasEditarCrianca").click(function(){
        changeClassAllLi();
        $("#criancasEditarCrianca").attr('class', 'blue');
        $("#criancas").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#criancasEditarContent").show();
    });

    $("#criancasRemoverCrianca").click(function(){
        changeClassAllLi();
        $("#criancasRemoverCrianca").attr('class', 'blue');
        $("#criancas").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#criancasRemoverContent").show();
    });

    $("#criancasRegistosCrianca").click(function(){
        changeClassAllLi();
        $("#criancasRegistosCrianca").attr('class', 'blue');
        $("#criancas").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#criancasRegistosContent").show();
    });

    $("#criancasAdicionarCrianca").click(function(){
        changeClassAllLi();
        $("#criancasAdicionarCrianca").attr('class', 'blue');
        $("#criancas").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#criancasAdicionarCriançaContent").show();
    });

    $("#adicionarSessao").click(function(){
        changeClassAllLi();
        $("#adicionarSessao").attr('class', 'blue');
        $(".contents").hide();
        $("#adicionarSessaoContent").show();
    });

    $("#escolherTerapeuta").click(function(){
        changeClassAllLi();
        $("#escolherTerapeuta").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#adicionarSessaoEscolherTerapeutaContent").show();
    });

    $("#escolherCriancas").click(function(){
        changeClassAllLi();
        $("#escolherCriancas").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#adicionarSessaoEscolherCriancasContent").show();
    });

    $("#escolherCriancasAdicionarCrianca").click(function(){
        changeClassAllLi();
        $("#escolherCriancasAdicionarCrianca").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherCriancas").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#adicionarSessaoEscolherCriancasAdicionarCriancaContent").show();
    });

    $("#escolherCriancasRetirarCrianca").click(function(){
        changeClassAllLi();
        $("#escolherCriancasRetirarCrianca").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherCriancas").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#adicionarSessaoEscolherCriancasRetirarCriancaContent").show();
    });

    $("#escolherCriancasSeleccionarTudo").click(function(){
        changeClassAllLi();
        $("#escolherCriancasSeleccionarTudo").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherCriancas").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#adicionarSessaoEscolherCriancasSeleccionarTudoContent").show();
    });

    $("#escolherCriancasRemoverSeleccao").click(function(){
        changeClassAllLi();
        $("#escolherCriancasRemoverSeleccao").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherCriancas").attr('class', 'darkBlue');
        $(".contents").hide();
        $("#adicionarSessaoEscolherCriancasRemoverSeleccaoContent").show();
        
    });

    $("#tipoSessao").click(function(){
        changeClassAllLi();
        $("#tipoSessao").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherDataHora").click(function(){
        changeClassAllLi();
        $("#escolherDataHora").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#tipoExercicio").click(function(){
        changeClassAllLi();
        $("#tipoExercicio").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#tipoExercicioCoDraw").click(function(){
        changeClassAllLi();
        $("#tipoExercicioCoDraw").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#tipoExercicio").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#tipoExercicioHistoria").click(function(){
        changeClassAllLi();
        $("#tipoExercicioHistoria").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#tipoExercicio").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherHistoria").click(function(){
        changeClassAllLi();
        $("#escolherHistoria").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherHistoriaCriarNovaHistoria").click(function(){
        changeClassAllLi();
        $("#escolherHistoriaCriarNovaHistoria").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherHistoria").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherHistoriaEscolherHistoriaBiblioteca").click(function(){
        changeClassAllLi();
        $("#escolherHistoriaEscolherHistoriaBiblioteca").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherHistoria").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#bibliotecaHistorias").click(function(){
        changeClassAllLi();
        $("#bibliotecaHistorias").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#bibliotecaHistoriasAlterar").click(function(){
        changeClassAllLi();
        $("#bibliotecaHistoriasAlterar").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#bibliotecaHistorias").attr('class', 'darkBlue');        
        $(".contents").hide();
    });

    $("#bibliotecaHistoriasCriarSessao").click(function(){
        changeClassAllLi();
        $("#bibliotecaHistoriasCriarSessao").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#bibliotecaHistorias").attr('class', 'darkBlue');        
        $(".contents").hide();
    });

    $("#nomeHistoria").click(function(){
        changeClassAllLi();
        $("#nomeHistoria").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#imagemHistoria").click(function(){
        changeClassAllLi();
        $("#imagemHistoria").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasHistoria").click(function(){
        changeClassAllLi();
        $("#etiquetasHistoria").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasHistoriaAdicionar").click(function(){
        changeClassAllLi();
        $("#etiquetasHistoriaAdicionar").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#etiquetasHistoria").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasHistoriaAdicionarEtiqueta").click(function(){
        changeClassAllLi();
        $("#etiquetasHistoriaAdicionarEtiqueta").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#etiquetasHistoria").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasHistoriaRetirarEtiqueta").click(function(){
        changeClassAllLi();
        $("#etiquetasHistoriaRetirarEtiqueta").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#etiquetasHistoria").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasHistoriaSeleccionarTudo").click(function(){
        changeClassAllLi();
        $("#etiquetasHistoriaSeleccionarTudo").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#etiquetasHistoria").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasHistoriaRemoverSeleccao").click(function(){
        changeClassAllLi();
        $("#etiquetasHistoriaRemoverSeleccao").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#etiquetasHistoria").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherCena").click(function(){
        changeClassAllLi();
        $("#escolherCena").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherCenaCriarNovaCena").click(function(){
        changeClassAllLi();
        $("#escolherCenaCriarNovaCena").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherCena").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherCenaEscolherCenaBiblioteca").click(function(){
        changeClassAllLi();
        $("#escolherCenaEscolherCenaBiblioteca").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherCena").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherCenaCriarSessao").click(function(){
        changeClassAllLi();
        $("#escolherCenaCriarSessao").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherCena").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#bibliotecaCenas").click(function(){
        changeClassAllLi();
        $("#bibliotecaCenas").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#bibliotecaCenasAlterar").click(function(){
        changeClassAllLi();
        $("#bibliotecaCenasAlterar").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#bibliotecaCenas").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#bibliotecaCenasUsar").click(function(){
        changeClassAllLi();
        $("#bibliotecaCenasUsar").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#bibliotecaCenas").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#nomeCena").click(function(){
        changeClassAllLi();
        $("#nomeCena").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#descricaoCena").click(function(){
        changeClassAllLi();
        $("#descricaoCena").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasCena").click(function(){
        changeClassAllLi();
        $("#etiquetasCena").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasCenaAdicionar").click(function(){
        changeClassAllLi();
        $("#etiquetasCenaAdicionar").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#etiquetasCena").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasCenaAdicionarEtiqueta").click(function(){
        changeClassAllLi();
        $("#etiquetasCenaAdicionarEtiqueta").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#etiquetasCena").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasCenaRetirarEtiqueta").click(function(){
        changeClassAllLi();
        $("#etiquetasCenaRetirarEtiqueta").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#etiquetasCena").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasCenaSeleccionarTudo").click(function(){
        changeClassAllLi();
        $("#etiquetasCenaSeleccionarTudo").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#etiquetasCena").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#etiquetasCenaRemoverSeleccao").click(function(){
        changeClassAllLi();
        $("#etiquetasCenaRemoverSeleccao").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#etiquetasCena").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#introducaoActividade").click(function(){
        changeClassAllLi();
        $("#introducaoActividade").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherActividade").click(function(){
        changeClassAllLi();
        $("#escolherActividade").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherActividadeGesto").click(function(){
        changeClassAllLi();
        $("#escolherActividadeGesto").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherActividade").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherActividadeQuestionario").click(function(){
        changeClassAllLi();
        $("#escolherActividadeQuestionario").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherActividade").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherGesto").click(function(){
        changeClassAllLi();
        $("#escolherGesto").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherGestoEscolher").click(function(){
        changeClassAllLi();
        $("#escolherGestoEscolher").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherGesto").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherGestoNovoGesto").click(function(){
        changeClassAllLi();
        $("#escolherGestoNovoGesto").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherGesto").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherGestoRemover").click(function(){
        changeClassAllLi();
        $("#escolherGestoRemover").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherGesto").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#nomeGesto").click(function(){
        changeClassAllLi();
        $("#nomeGesto").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#numeroGestos").click(function(){
        changeClassAllLi();
        $("#numeroGestos").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherQuestionario").click(function(){
        changeClassAllLi();
        $("#escolherQuestionario").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherQuestionarioEscolher").click(function(){
        changeClassAllLi();
        $("#escolherQuestionarioEscolher").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherQuestionarioEscolher").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherQuestionarioNovoQuestionario").click(function(){
        changeClassAllLi();
        $("#escolherQuestionarioNovoQuestionario").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherQuestionarioEscolher").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherQuestionarioDetalhesQuestionario").click(function(){
        changeClassAllLi();
        $("#escolherQuestionarioDetalhesQuestionario").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherQuestionarioEscolher").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#escolherQuestionarioRemover").click(function(){
        changeClassAllLi();
        $("#escolherQuestionarioRemover").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#escolherQuestionarioEscolher").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#nomeQuestionario").click(function(){
        changeClassAllLi();
        $("#nomeQuestionario").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#perguntasQuestionario").click(function(){
        changeClassAllLi();
        $("#perguntasQuestionario").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#perguntasQuestionarioEscolher").click(function(){
        changeClassAllLi();
        $("#perguntasQuestionarioEscolher").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');$("#criarSessao").attr('class', 'darkBlue');
        $("#perguntasQuestionario").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#perguntasQuestionarioNovaPergunta").click(function(){
        changeClassAllLi();
        $("#perguntasQuestionarioNovaPergunta").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#perguntasQuestionario").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#perguntasQuestionarioRemover").click(function(){
        changeClassAllLi();
        $("#perguntasQuestionarioRemover").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $("#perguntasQuestionario").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#reforcoPositivo").click(function(){
        changeClassAllLi();
        $("#reforcoPositivo").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#reforcoNegativo").click(function(){
        changeClassAllLi();
        $("#reforcoNegativo").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#repeticaoCena").click(function(){
        changeClassAllLi();
        $("#logrepeticaoCenain").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#pontuacao").click(function(){
        changeClassAllLi();
        $("#pontuacao").attr('class', 'blue');
        $("#criarSessao").attr('class', 'darkBlue');
        $(".contents").hide();
    });

    $("#playerTerapeuta").click(function(){
        changeClassAllLi();
        $("#playerTerapeuta").attr('class', 'blue');
        $(".contents").hide();
    });

    $("#playerCrianca").click(function(){
        changeClassAllLi();
        $("#playerCrianca").attr('class', 'blue');
        $(".contents").hide();
    });
    
    $("#sessoesRealizarPlay2").click(function(){
        $("#sessoesRealizarPlay").click();
    });
    $("#sessoesRealizarEditarSessao2").click(function(){
        $("#sessoesRealizarEditarSessao").click();
    });
    $("#sessoesRealizarRemoverSessao2").click(function(){
        $("#sessoesRealizarRemoverSessao").click();
    });
    $("#sessoesRealizarDuplicarSessao2").click(function(){
        $("#sessoesRealizarDuplicarSessao").click();
    });

    $("#verPlayerTerapeuta").button();
    $("#verPlayerTerapeuta").click(function(){
        $("#playerTerapeuta").click();
    });
    $("#verAdicionarSessao").button();
    $("#verAdicionarSessao").click(function(){
        $("#adicionarSessao").click();
    });
    
});

function changeClassAllLi(){
    $(this).scrollTop(0);
    $( "li" ).each(function( index ) {
        $("li").attr('class', 'black');
    });
}
//$("#td_id").attr('class', 'black');