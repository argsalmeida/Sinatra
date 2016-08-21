/*************************************
* Ficheiro que contem as funcoes     *
* referentes a listas.html  	     *
* Este ficheiro contem o que é  	     *
* referente as criancas		     *
**************************************/
//variaveis auxiliares para o botões
var $idModificarCrianca = 0;
var $idRemoverCrianca = 0;

//variaveis para a modificação de criancas
var $nomeCriancaModificada = '';
var $usernameCriancaModificada = '';
var $alterouFoto = false;

//variavel auxiliar para verificar o nome da crianca
var $verificaNome = '';
var $passwordCrianca = '';
var $dataNascimentoCrianca = '';
var $observacaoCrianca = '';
var $usernameCrianca = '';
var $urlFotoCrianca = '';
var $fotoCrianca = '';
var $temFoto = false;


function setButtonsListaCriancas(){
    //botão adicionar crianca
    $('#adicionarCriancaButton').bind('click', function () {
        $('#passwordCrianca').val('');
        $('#nomeCrianca').val('');
        $('#usernameCrianca').val('');
        $('#dataNascimentoCrianca').val('');
        $('#observacaoCrianca').val('');
        $('#dialogAdicionarCrianca').dialog("open");
    });

    //bind da tecla enter para o ok dialog terapeuta
    $('#dialogAdicionarCrianca').bind('keypress', function(e){
        if (e.keyCode == 13) {
            $('#okAdicionarCriancaButton').focus();
            $('#okAdicionarCriancaButton').click();
        }
    });

    //bind da tecla enter para o ok dialog modificar crianca
    $('#dialogModificarCrianca').bind('keypress', function(e){
        if (e.keyCode == 13) {
            $('#okModificarCriancaButton').focus();
            $('#okModificarCriancaButton').click();
        }
    });

    $('#alterarFotoCriancaButton').click(function(){
        $('#novaFotoCrianca').click();
    });
    
    $('#newFotoCrianca').change(function(){
        var $fd = new FormData(document.getElementById('newFotoCrianca'));
        var $ajax = thumbnailRequest($fd, "uploadTempFile", "" , "tempFotosCrianca", "", "");
        //podem existir 3 casos:
        //cancelar o pedido (no chrome não detectava o botão de cancelar, o ficheiro mostrava-se como 'broken')
        //o ficheiro nao ser suportado
        //sucesso
        $ajax.success(function(realData) {
            console.log(realData);
            if(realData != "empty"){
                if(realData == "file not supported"){
                    alert("O ficheiro que escolheu não é suportado. Escolha outro.");
                } else {
                    $fotoCrianca = realData;
                    $('#fotoCrianca').attr("src", $fotoCrianca);
                    $temFoto = true;
                }
            }
        });
        console.log("$fotoCrianca: " + $fotoCrianca);
    });
    
    $('#alterarFotoCriancaModificadaButton').click(function(){
        $('#novaFotoCriancaModificada').click();
        $alterouFoto = true;
    });

    $('#newFotoCriancaModificada').change(function(){
        var $fd = new FormData(document.getElementById('newFotoCriancaModificada'));
        var $ajax = thumbnailRequest($fd, "uploadTempFile", "" , "tempFotosCrianca", "", "");
        //podem existir 3 casos:
        //cancelar o pedido (no chrome não detectava o botão de cancelar, o ficheiro mostrava-se como 'broken')
        //o ficheiro nao ser suportado
        //sucesso
        $ajax.success(function(realData) {
            if(realData != "empty"){
                if(realData == "file not supported"){
                    alert("O ficheiro que escolheu não é suportado. Escolha outro.");
                } else {
                    $fotoCrianca = realData;
                    $('#fotoCriancaModificada').attr("src", $fotoCrianca);
                    $temFoto = true;
                }
            }
        });
        console.log("$fotoCrianca: " + $fotoCrianca);
    });
    
    //bind da tecla enter para o ok dialog remover crianca
    $('#dialogRemoverCrianca').bind('keypress', function(e){
        if (e.keyCode == 13) {
            $('#okRemoverCriancaButton').focus();
            $('#okRemoverCriancaButton').click();
        }
    });

    //bind da tecla enter para o ok dialog de confirmação de activacao da crianca
    $('#dialogCriancaMesmoNome').bind('keypress', function(e){
        if (e.keyCode == 13) {
            $('#simMesmoNomeCriancaButton').focus();
            $('#simMesmoNomeCriancaButton').click();
        }
    });

    //Calendario para a data de nascimento
    $("#dataNascimentoCrianca").datepicker({
        changeYear: true,
        changeMonth: true,
        dateFormat: "yy-mm-dd", //formato da data
        constrainInput: true,
        firstDay: 1, //dia da semana começa à segunda
        maxDate: 0, //último dia a apresentar
        monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dez" ],
        dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        yearRange: "-100:+0",
        minDate: null
    });

    //Calendario para a data de nascimento dialog Modificar Crianca
    $("#dataNascimentoCriancaModificada").datepicker({
        changeYear: true,
        changeMonth: true,
        dateFormat: "yy-mm-dd", //formato da data
        constrainInput: true,
        firstDay: 1, //dia da semana começa à segunda
        maxDate: 0, //último dia a apresentar
        monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dez" ],
        dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        yearRange: "1900:2013",
        minDate: null
    });
}
function setDialogsListaCriancas(){
    $( "#dialogAdicionarCrianca" ).dialog({
        autoOpen: false,
        modal: true,
        resizable: true,
        buttons: [{
            //botão OK
            text: "OK",
            id: "okAdicionarCriancaButton",
            click: function(){
                //Os campos, nome, data de nascimento e password, têm que ser preenchidos
                if ($('#nomeCrianca').val() != '' && $('#passwordCrianca').val() != '' && $('#dataNascimentoCrianca').val() != '' && $temFoto && $('#usernameCrianca').val() != ''){
                    //vai verificar se o nome já existe
                    $verificaNome = getCriancaByNome($('#nomeCrianca').val());
                    //se não existir cria uma crianca nova
                    if($verificaNome == "Criança não existente."){
                        //vai verificar se o username já existe
                        $verificaUsername = getCriancaByUsername($('#usernameCrianca').val());
                        if($verificaUsername == "Criança não existente."){
                            $urlFotoCrianca = thumbnailRequest(null, 'saveFile', $('#nomeCrianca').val(), "tempFotosCrianca", "fotosCrianca", $fotoCrianca, "gravar");
                            var $novaCrianca = adicionaNovaCrianca($urlFotoCrianca, $('#usernameCrianca').val(), $('#nomeCrianca').val(), $('#dataNascimentoCrianca').val(), $('#observacaoCrianca').val(), $('#passwordCrianca').val());
                            //se inseriu retorna o id, 
                            //se já existe um terapeuta com o mesmo nome retorna "Criança existente."
                            //se não inseriu, retorna mensagem de erro
                            if(Number($novaCrianca)){
                                $(this).dialog("close");
                                location.reload();
                            } else {
                                /*if($novaCrianca == "Criança existente."){
                                    alert('Já existe uma criança com este nome.');
                                    $('#nomeCrianca').focus();
                                } else */
                                    alert('Não foi possível inserir a criança.');
                            }
                        } else {
                            //se existir verifica se a criança esta enable ou disable
                            var $enableCrianca = $($verificaUsername).find('crianca').find('enable').text();
                            //se está enable avisa e não deixa usar o nome
                            if($enableCrianca == '1'){
                                alert('Já existe uma crianca com este username.');
                                $('#usernameCrianca').focus();
                            } else {
                                //se está disable pergunta se deseja substituir a criança
                                //se sim, reactiva a criança (enable = 1) e guarda os novos dados
                                //se não, volta a esta dialog para o terapeuta mudar o nome
                                $urlFotoCrianca = $fotoCrianca;
                                $usernameCrianca = $('#usernameCrianca').val();
                                $passwordCrianca = $('#passwordCrianca').val();$('#passwordCrianca').val();
                                $dataNascimentoCrianca = $('#dataNascimentoCrianca').val();
                                $observacaoCrianca = $('#observacaoCrianca').val();
                                $('#dialogCriancaMesmoNome').dialog("open");
                            }							
                        }
                    } else {
                        //se existir verifica se a criança esta enable ou disable
                        var $enableCrianca = $($verificaNome).find('crianca').find('enable').text();
                        //se está enable avisa e não deixa usar o nome
                        if($enableCrianca == '1'){
                            alert('Já existe uma crianca com este nome.');
                            $('#nomeCrianca').focus();
                        } else {
                            //se está disable pergunta se deseja substituir a criança
                            //se sim, reactiva a criança (enable = 1) e guarda os novos dados
                            //se não, volta a esta dialog para o terapeuta mudar o nome
                            $urlFotoCrianca = $fotoCrianca;
                            $usernameCrianca = $('#usernameCrianca').val();
                            $passwordCrianca = $('#passwordCrianca').val();$('#passwordCrianca').val();
                            $dataNascimentoCrianca = $('#dataNascimentoCrianca').val();
                            $observacaoCrianca = $('#observacaoCrianca').val();
                            $('#dialogCriancaMesmoNome').dialog("open");
                        }							
                    }
                } else {
                    if(!$temFoto)
                        alert('A foto é obrigatória.');	
                    else if($('#usernameCrianca').val() == '')
                        alert('O username é obrigatório.');	
                    else if($('#nomeCrianca').val() == '')
                        alert('O nome é obrigatório.');
                    else if($('#dataNascimentoCrianca').val() == '')
                        alert('A data de nascimento é obrigatória.')
                    else if($('#passwordCrianca').val() == '')
                        alert('A password é obrigatória.');		
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

    $("#dialogModificarCrianca").dialog({
        autoOpen: false,
        modal: true,
        resizable: true,
        buttons: [{
            //botão OK
            text: "OK",
            id: "okModificarCriancaButton",
            click: function(){
                var $updateCrianca = '';
                var $novoNomeCrianca = false;
                var $novoUsernameCrianca = false;
                //Os campos, nome, data de nascimento e password, têm que ser preenchidos                
                if ($('#nomeCriancaModificada').val() != '' && $('#passwordCriancaModificada').val() != '' && $('#dataNascimentoCriancaModificada').val() != '' && $temFoto && $('#usernameCriancaModificada').val() != ''){
                    
                    //verifica se o nome foi modificado, se for o caso vai verificar se já existe uma criança com esse nome
                    if($('#nomeCriancaModificada').val() != $nomeCriancaModificada){
                        $verificaNome = getCriancaByNome($('#nomeCriancaModificada').val());
                        //Se existir, nao actualiza e informa
                        if($verificaNome != "Criança não existente."){
                            alert('Já existe uma criança com este nome.');
                            $('#nomeCriancaModificada').focus();
                        } else //senão indica que o nome é válido
                            $novoNomeCrianca = true;
                    } else //se o nome não foi modificado continua válido
                        $novoNomeCrianca = true;
                    
                    //verifica se o username foi modificado, se for o caso vai verificar se já existe uma criança com esse username
                    if($novoNomeCrianca && $('#usernameCriancaModificada').val() != $usernameCriancaModificada){
                        $verificaUsername = getCriancaByUsername($('#usernameCriancaModificada').val());
                        //Se existir, nao actualiza e informa
                        if($verificaUsername != "Criança não existente."){
                            alert('Já existe uma criança com este username.');
                            $('#usernameCriancaModificada').focus();
                        } else //senão indica que o nome é válido
                            $novoUsernameCrianca = true;
                    } else //se o username não foi modificado continua válido
                        $novoUsernameCrianca = true;
                    
                    //se estiver tudo válido modifica a criança
                    if($novoNomeCrianca && $novoUsernameCrianca){
                        //alert("posso modificar");
                        if($alterouFoto)
                            $fotoCriancaModificada = thumbnailRequest(null, 'saveFile', $('#nomeCriancaModificada').val(), "tempFotosCrianca", "fotosCrianca", $fotoCrianca, "gravar");
                            
                        $updateCrianca = updateCrianca($idModificarCrianca, $fotoCriancaModificada, $('#usernameCriancaModificada').val(), $('#nomeCriancaModificada').val(), $('#dataNascimentoCriancaModificada').val(), $('#observacaoCriancaModificada').val(), $('#passwordCriancaModificada').val());
                        
                        //verifica a actualizacao
                        if($updateCrianca == "Erro: Falha na actualização da criança."){
                            alert('Não foi possível actualizar a criança.');
                        } else {
                            alert('Sucesso a actualizar a criança');
                        }
                        
                        $(this).dialog("close");
                        location.reload();
                    }
                } else {
                    if(!$temFoto)
                        alert('A foto é obrigatória.');
                    else if($('#usernameCriancaModificada').val() == ''){
                        alert('O username é obrigatório.');
                        $('#usernameCriancaModificada').focus();
                    } else if($('#nomeCriancaModificada').val() == ''){
                        alert('O nome é obrigatório.');
                        $('#nomeCriancaModificada').focus();
                    } else if($('#dataNascimentoCriancaModificada').val() == '') {
                        alert('A data de nascimento é obrigatória.');
                        $('#dataNascimentoCriancaModificada').focus();
                    } else if($('#passwordCriancaModificada').val() == ''){
                        alert('A password é obrigatória.');
                        $('#passwordCriancaModificada').focus();
                    }
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

    $("#dialogRemoverCrianca").dialog({
        autoOpen: false,
        modal: true,
        resizable: true,
        buttons: [{
            //botão OK
            text: "OK",
            id: "okRemoverCriancaButton",
            click: function(){
                var $removerCrianca = removeCrianca($idRemoverCrianca);
                alert($removerCrianca);
                $(this).dialog("close");
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

    $("#dialogCriancaMesmoNome").dialog({
        autoOpen: false,
        modal: true,
        resizable: true,
        buttons: [{
            //botão Sim
            text: "Sim",
            id: "simMesmoNomeCriancaButton",
            click: function(){
                //reactiva a crianca
                var $idReactivarCrianca = $($verificaNome).find('crianca').find('id').map(function () {
                    return Number($(this).text());
                }).get(0);
                var $reactivouCrianca = reactivaCrianca($idReactivarCrianca, $dataNascimentoCrianca, $observacaoCrianca, $passwordCrianca);
                alert($reactivouCrianca);
                $(this).dialog("close");
                $("#dialogAdicionarCrianca").dialog("close");
                location.reload();				
            }
        },
                  //botão Não
                  {
                      text: "Não",
                      click: function() { 
                          $(this).dialog("close");
                          $('#nomeCrianca').focus();
                      }
                  }]
    });
}

/******************************************************
 Funcao que vai ler a resposta do servidor ao pedido 
 de obtenção de todos as criancas, insere-os na
 lista e consoante o id trata dos botões
*******************************************************/
function preencheListaCriancas($xmlResponse){
    //console.log($xmlResponse);
    //vai ler da resposta os dados das criancas
    $($xmlResponse).find('crianca').each(function () {
        //nome da criança
        var $nomeCrianca = $(this).find('nome').text();

        //data de nascimento da criança
        var $dataNascimentoCrianca = $(this).find('dataNascimento').text();

        //observação da criança
        var $observacaoCrianca = $(this).find('observacao').text();

        //password da criança
        var $passwordCrianca = $(this).find('password').text();
        //id da criança
        var $idCriancaObtido = $(this).find('id').map(function () {
            return Number($(this).text());
        }).get(0);

        $fotoCrianca = $(this).find('foto').text();
        var $usernameCrianca = $(this).find('username').text();
        
        $tabelaCriancas.fnAddData([
            $nomeCrianca,
            '<div style="text-align:center;"><img id="fotoCrianca' + $idCriancaObtido + '" src="' + $fotoCrianca + '" width="35px" height="35px"></div>',
            $usernameCrianca,
            $dataNascimentoCrianca, 
            $observacaoCrianca, 
            $passwordCrianca, 
            '<div id="botoes"><img id="modificarCrianca' + $idCriancaObtido + '" src="../imagens/editar.png" width="35px"> <img id="removerCrianca' + $idCriancaObtido + '" src="../imagens/remover.png" width="35px"> <img id="verRegistoCrianca' + $idCriancaObtido + '" src="../imagens/registos.png" width="35px"></div>'
        ]);

        //botão para editar a crianca
        $('#modificarCrianca' + $idCriancaObtido).prop('title', 'Modificar');
        $('#modificarCrianca' + $idCriancaObtido).bind('click', function (){
            $idModificarCrianca = $(this).attr('id').split('modificarCrianca')[1];
            getCriancaById($idCriancaObtido, "listaCriancasModificar");
            $("#dialogModificarCrianca").dialog("open");
        });

        //botao para remover a crianca
        $('#removerCrianca' + $idCriancaObtido).prop('title', 'Remover');
        $('#removerCrianca' + $idCriancaObtido).bind('click', function (){
            $idRemoverCrianca = $(this).attr('id').split('removerCrianca')[1];
            $("#dialogRemoverCrianca").dialog("open");
        });

        //botao para remover a crianca
        $('#verRegistoCrianca' + $idCriancaObtido).prop('title', 'Registo');
        $('#verRegistoCrianca' + $idCriancaObtido).bind('click', function (){
            $idRegistoCrianca = $(this).attr('id').split('verRegistoCrianca')[1];
            location.href="../registos/registosCrianca.html"
            window.localStorage.setItem('registoCrianca', $idRegistoCrianca);
            //alert("REGISTOCRIANCA - todo " + $idRegistoCrianca);
        });
    });
}

/******************************************************
 Funcao que vai ler a resposta do servidor ao pedido 
 de obtenção do terapeuta a modificar e preenche os
 campos do dialog
*******************************************************/
function preencheDialogModificarCrianca($xmlResponse){
    $($xmlResponse).find('crianca').each(function () {
        //foto da crianca
        $fotoCriancaModificada = $(this).find('foto').text();
        $('#fotoCriancaModificada').attr("src", $fotoCriancaModificada);
        $temFoto = true;
        //username da crianca
        $usernameCriancaModificada = $(this).find('username').text();
        $("#usernameCriancaModificada").val($usernameCriancaModificada);
        //nome da crianca
        $nomeCriancaModificada = $(this).find('nome').text();
        $("#nomeCriancaModificada").val($nomeCriancaModificada);
        //data de nascimento da criança
        $("#dataNascimentoCriancaModificada").val($(this).find('dataNascimento').text());
        //observacao da crianca
        $("#observacaoCriancaModificada").val($(this).find('observacao').text());
        //password da crianca
        $("#passwordCriancaModificada").val($(this).find('password').text());
    });
}
