/*************************************
* Ficheiro que contem as funcoes     *
* referentes a listas.html  	     *
* Este ficheiro contem o que é 	     *
* referente aos terapeutas	     *
**************************************/
//id do terapeuta que fez o login
var $idTerapeutaLogin = 0;

//variaveis auxiliares para o botões
var $idModificarTerapeuta = 0;
var $idRemoverTerapeuta = 0;

//variaveis para a modificação de terapeutas
var $nomeTerapeutaModificado = '';
var $fotoTerapeutaModificado = '';

//variavel auxiliar para verificar o nome do terapeuta
var $verificaNome = '';
var $passwordTerapeuta = '';
var $fotoTerapeuta = '';
var $urlFotoTerapeuta = '';
var $temFoto = false;

function setButtonsListaTerapeutas(){
	//botão adicionar terapeuta
	$('#adicionarTerapeutasButton').bind('click', function () {
		$('#passwordTerapeuta').val('');
		$('#nomeTerapeuta').val('');
		$('#dialogAdicionarTerapeuta').dialog("open");
	});

	//bind da tecla enter para o ok dialog terapeuta
	$('#dialogAdicionarTerapeuta').bind('keypress', function(e){
		  if (e.keyCode == 13) {
		  $('#okAdicionarTerapeutaButton').focus();
		  $('#okAdicionarTerapeutaButton').click();
	  	}
	});

	//bind da tecla enter para o ok dialog modificar terapeuta
	$('#dialogModificarTerapeuta').bind('keypress', function(e){
		  if (e.keyCode == 13) {
		  $('#okModificarTerapeutaButton').focus();
		  $('#okModificarTerapeutaButton').click();
	  	}
	});

    $('#alterarFotoTerapeutaButton').click(function(){
        $('#novaFotoTerapeuta').click();
    });

    $('#newFotoTerapeuta').change(function(){
        var $fd = new FormData(document.getElementById('newFotoTerapeuta'));
        var $ajax = thumbnailRequest($fd, "uploadTempFile", "" , "tempFotosTerapeuta", "", "");
        //podem existir 3 casos:
        //cancelar o pedido (no chrome não detectava o botão de cancelar, o ficheiro mostrava-se como 'broken')
        //o ficheiro nao ser suportado
        //sucesso
        $ajax.success(function(realData) {
            if(realData != "empty"){
                if(realData == "file not supported"){
                    alert("O ficheiro que escolheu não é suportado. Escolha outro.");
                } else {
                    $fotoTerapeuta = realData;
                    $('#fotoTerapeuta').attr("src", $fotoTerapeuta);
                    $temFoto = true;
                }
            }
        });
        console.log("fotoTerapeuta: " + $fotoTerapeuta);
    });

    $('#alterarFotoTerapeutaModificadoButton').click(function(){
        $('#novaFotoTerapeutaModificado').click();
        $alterouFoto = true;
    });

    $('#newFotoTerapeutaModificado').change(function(){
        var $fd = new FormData(document.getElementById('newFotoTerapeutaModificado'));
        var $ajax = thumbnailRequest($fd, "uploadTempFile", "" , "tempFotosTerapeuta", "", "");
        //podem existir 3 casos:
        //cancelar o pedido (no chrome não detectava o botão de cancelar, o ficheiro mostrava-se como 'broken')
        //o ficheiro nao ser suportado
        //sucesso
        $ajax.success(function(realData) {
            if(realData != "empty"){
                if(realData == "file not supported"){
                    alert("O ficheiro que escolheu não é suportado. Escolha outro.");
                } else {
                    $fotoTerapeuta = realData;
                    $('#fotoTerapeutaModificado').attr("src", $fotoTerapeuta);
                    $temFoto = true;
                }
            }
        });
        console.log("$fotoTerapeuta: " + $fotoTerapeuta);
    });
	//bind da tecla enter para o ok dialog remover terapeuta
	$('#dialogRemoverTerapeuta').bind('keypress', function(e){
		  if (e.keyCode == 13) {
		  $('#okRemoverTerapeutaButton').focus();
		  $('#okRemoverTerapeutaButton').click();
	  	}
	});

	//bind da tecla enter para o ok dialog de confirmação de activacao do terapeuta
	$('#dialogTerapeutaMesmoNome').bind('keypress', function(e){
		  if (e.keyCode == 13) {
		  $('#simMesmoNomeTerapeutaButton').focus();
		  $('#simMesmoNomeTerapeutaButton').click();
	  	}
	});
}
function setDialogsListaTerapeutas(){
	$( "#dialogAdicionarTerapeuta" ).dialog({
		autoOpen: false,
		modal: true,
		resizable: true,
		buttons: [{
				//botão OK
				text: "OK",
				id: "okAdicionarTerapeutaButton",
				click: function(){
					//Ambos os campos, nome e password, têm que ser preenchidos
					if ($('#nomeTerapeuta').val() != '' && $('#passwordTerapeuta').val() != '' && $temFoto){
						//vai verificar se o nome já existe
						$verificaNome = getTerapeutaByNome($('#nomeTerapeuta').val());
						//se não existir cria um terapeuta novo
						if($verificaNome == "Terapeuta não existente."){
                            $urlFotoTerapeuta = thumbnailRequest(null, 'saveFile', $('#nomeTerapeuta').val(), "tempFotosTerapeuta", "fotosTerapeuta", $fotoTerapeuta, "gravar");
                            var $novoTerapeuta = adicionaNovoTerapeuta($urlFotoTerapeuta, $('#nomeTerapeuta').val(), $('#passwordTerapeuta').val());
								//se inseriu retorna o id, 
								//se já existe um terapeuta com o mesmo nome retorna "Terapeuta existente."
								//se não inseriu, retorna mensagem de erro
								if(Number($novoTerapeuta)){
									$(this).dialog("close");
									location.reload();
								} else {
									if($novoTerapeuta == "Terapeuta existente."){
										alert('Já existe um terapeuta com este nome.');
										$('#nomeTerapeuta').focus();
									} else 
										alert('Não foi possível inserir o terapeuta.');
								}
						} else {
							//se existir verifica se o terapeuta esta enable ou disable
							var $enableTerapeuta = $($verificaNome).find('terapeuta').find('enable').text();
							//se está enable avisa e não deixa usar o nome
							if($enableTerapeuta == '1'){
								alert('Já existe um terapeuta com este nome.');
								$('#nomeTerapeuta').focus();
							} else {
								//se está disable pergunta se é o próprio
								//se sim, reactiva o terapeuta (enable = 1) e guarda a nova password
								//se não, volta a esta dialog para o terapeuta mudar o nome
								$passwordTerapeuta = $('#passwordTerapeuta').val();
								$('#dialogTerapeutaMesmoNome').dialog("open");
							}							
						}
					} else {
                        if(!temFoto)
                            alert('A foto é obrigatória.');
						else if($('#nomeTerapeuta').val() == '')
							alert('O nome é obrigatório.');
						else if($('#passwordTerapeuta').val() == '')
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

	$("#dialogModificarTerapeuta").dialog({
		autoOpen: false,
		modal: true,
		resizable: true,
		buttons: [{
				//botão OK
				text: "OK",
				id: "okModificarTerapeutaButton",
				click: function(){
					var $updateTerapeuta = '';
					var $novoNomeTerapeuta = false;
					//Ambos os campos, nome e password, têm que ser preenchidos
					if ($('#nomeTerapeutaModificado').val() != '' && $('#passwordTerapeutaModificado').val() != ''){
						//se o nome foi modificado, tem que se verificar se não existe nenhum nome igual	
						if($('#nomeTerapeutaModificado').val() != $nomeTerapeutaModificado){
							//vai verificar se o nome já existe
							$verificaNome = getTerapeutaByNome($('#nomeTerapeutaModificado').val());
							//Se existir, nao actualiza e informa
							if($verificaNome != "Terapeuta não existente."){
								alert('Já existe um terapeuta com este nome.');
								$('#nomeTerapeutaModificado').focus();
							}  else 
								$novoNomeTerapeuta = true;
						} 
						if($('#nomeTerapeutaModificado').val() == $nomeTerapeutaModificado || $novoNomeTerapeuta){
                            //alert("posso modificar");
                            if($alterouFoto)
                                $fotoTerapeutaModificado = thumbnailRequest(null, 'saveFile', $('#nomeTerapeutaModificado').val(), "tempFotosTerapeuta", "fotosTerapeuta", $fotoTerapeuta, "gravar");
							//se o nome for igual ou se o novo nome não existir então actualiza
                            $updateTerapeuta = updateTerapeuta($idModificarTerapeuta, $fotoTerapeutaModificado, $('#nomeTerapeutaModificado').val(), $('#passwordTerapeutaModificado').val());
							//verifica a actualizacao
							if($updateTerapeuta == "Erro: Falha na actualização do terapeuta."){
								alert('Não foi possível actualizar o terapeuta.');
							} else {
								alert('Sucesso a actualizar o terapeuta');
							}

							$(this).dialog("close");
							location.reload();
						}			
					} else {
						if($('#nomeTerapeutaModificado').val() == '')
							alert('O nome é obrigatório.');
						else if($('#passwordTerapeutaModificado').val() == '')
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

	$("#dialogRemoverTerapeuta").dialog({
		autoOpen: false,
		modal: true,
		resizable: true,
		buttons: [{
				//botão OK
				text: "OK",
				id: "okRemoverTerapeutaButton",
				click: function(){
					var $removerTerapeuta = removeTerapeuta($idRemoverTerapeuta);
					alert($removerTerapeuta);
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

	$("#dialogTerapeutaMesmoNome").dialog({
		autoOpen: false,
		modal: true,
		resizable: true,
		buttons: [{
				//botão Sim
				text: "Sim",
				id: "simMesmoNomeTerapeutaButton",
				click: function(){
					//reactiva o terapeuta
					var $idReactivarTerapeuta = $($verificaNome).find('terapeuta').find('id').map(function () {
										return Number($(this).text());
									}).get(0);
					var $reactivouTerapeuta = reactivaTerapeuta($idReactivarTerapeuta, $passwordTerapeuta);
					//alert($reactivouTerapeuta);
					$(this).dialog("close");
					$("#dialogAdicionarTerapeuta").dialog("close");
					location.reload();				
				}
			},
				//botão Não
			{
				text: "Não",
				click: function() { 
					$(this).dialog("close");
					$('#nomeTerapeuta').focus();
				}
		}]
	});
}

/******************************************************
 Funcao que vai ler a resposta do servidor ao pedido 
 de obtenção de todos os terapeutas, insere-os na
 lista e consoante o id trata dos botões
 Se for o terapeuta que fez login, este tem a
 possibilidade de editar os seus dados e remover-se,
 senão só pode remover os outros terapeutas
*******************************************************/
function preencheListaTerapeutas($xmlResponse){
    console.log($xmlResponse);
	//terapeuta que fez login
	var $idTerapeutaLogin = window.localStorage.getItem('idTerapeutaLogin');

	//vai ler da resposta o nome do terapeuta
	//consoante seja o terapeuta que fez login ou não
	//associa-lhe os botões correspondentes
	var $nomeTerapeuta = '';
	$($xmlResponse).find('terapeuta').each(function () {
        
        //id do terapeuta
        var $idTerapeutaObtido = $(this).find('id').map(function () {
            return Number($(this).text());
        }).get(0);

        
		//nome do terapeuta
		$nomeTerapeuta = $(this).find('nome').text();
        
        //foto do terapeuta
        $fotoTerapeuta = $(this).find('foto').text();
		
		//se for o terapeuta que fez login, posso editar e remover
		//senão só posso remover
		if($idTerapeutaObtido == $idTerapeutaLogin){
			//adiciona uma linha à tabela
			$tabelaTerapeutas.fnAddData( [
				$nomeTerapeuta, 
                '<div style="text-align:center;"><img id="fotoCrianca' + $idTerapeutaObtido + '" src="' + $fotoTerapeuta + '" width="35px" height="35px"></div>',
				'<div id="botoes"><img id="modificarTerapeuta' + $idTerapeutaObtido + '" src="../imagens/editar.png" width="35px"> <img id="removerTerapeuta' + $idTerapeutaObtido + '" src="../imagens/remover.png" width="35px"></div>'
		 	]);
			
			//botão para editar o terapeuta
			$('#modificarTerapeuta' + $idTerapeutaObtido).prop('title', 'Modificar');
			$('#modificarTerapeuta' + $idTerapeutaObtido).bind('click', function (){
				$idModificarTerapeuta = $(this).attr('id').split('modificarTerapeuta')[1];
				getTerapeutaById($idTerapeutaObtido, "listaTerapeutasModificar");
				$("#dialogModificarTerapeuta").dialog("open");
			});
		}else{
			//adiciona uma linha à tabela			
			$tabelaTerapeutas.fnAddData( [
				$nomeTerapeuta, 
                '<div style="text-align:center;"><img id="fotoCrianca' + $idTerapeutaObtido + '" src="' + $fotoTerapeuta + '" width="35px" height="35px"></div>', 
				'<div id="botoes"><img id="removerTerapeuta' + $idTerapeutaObtido + '" src="../imagens/remover.png" width="35px"></div>'
		 	]);
		}

		//botao para remover o terapeuta
		$('#removerTerapeuta' + $idTerapeutaObtido).prop('title', 'Remover');
		$('#removerTerapeuta' + $idTerapeutaObtido).bind('click', function (){
			$idRemoverTerapeuta = $(this).attr('id').split('removerTerapeuta')[1];
			$("#dialogRemoverTerapeuta").dialog("open");
		});
	});
}

/******************************************************
 Funcao que vai ler a resposta do servidor ao pedido 
 de obtenção do terapeuta a modificar e preenche os
 campos do dialog
*******************************************************/
function preencheDialogModificarTerapeuta($xmlResponse){
//console.log("preencheDialogModificarTerapeuta");
//console.log($xmlResponse);
	$($xmlResponse).find('terapeuta').each(function () {
        //foto do terapeuta
        $fotoTerapeutaModificado = $(this).find('foto').text();
        $('#fotoTerapeutaModificado').attr("src", $fotoTerapeutaModificado);
        $temFoto = true;
		//nome do terapeuta
		$nomeTerapeutaModificado = $(this).find('nome').text();
		$("#nomeTerapeutaModificado").val($nomeTerapeutaModificado);
		//password do terapeuta
		$("#passwordTerapeutaModificado").val($(this).find('password').text());
	});
}
