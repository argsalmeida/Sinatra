/*********************************
* Ficheiro que contem as funcoes *
* referentes a loginSessao.html  *
**********************************/

/* variaveis */
//terapeuta escolhido
var $terapeutaLoginId = 0;
//password inserida
var $passwordLogin = '';

//inicializacao dos elementos
$(document).ready(function(e){
	//LocalStorage
	if(typeof(Storage)==="undefined"){
		alert("Lamentamos, mas o seu browser nao suporta web storage...");
	} else {
		//limpa todas as variaveis
		window.localStorage.clear();
		//trata dos dialogs
		setDialogs();
		//trata dos botoes existentes
		setButtonsLogin();
		preencheTerapeutas("login");
        
        $("#tutorialButton").click(function(){
            location.href = "tutorial/tutorial.html";
        });

	}
});

/************************************************
 Funcao que trata das funcionalidades dos botoes
*************************************************/
function setButtonsLogin(){
	$('#loginButton').bind('click', function(){
		//verifica se os campos foram todos preenchidos
		if($('#loginSelectTerapeuta').val() != null && $('#loginPassword').val() != ''){
			//se os campos foram todos preenchidos
			$terapeutaLoginId = $('#loginSelectTerapeuta').val();
			$passwordLogin = $('#loginPassword').val();
			//vai buscar os dados do terapeuta escolhido
			getTerapeutaById($terapeutaLoginId,"login");

		} else {
console.log(($('#loginSelectTerapeuta').val()));
console.log($('#loginPassword').val());
			if(($('#loginSelectTerapeuta').val() == null))
				//alert("Tem de seleccionar um terapeuta.");
				$('#dialogNecessarioSeleccionarTerapeuta').dialog("open");
			else 
				//alert("Tem de inserir a password.");
				$('#dialogNecessarioInserirPassword').dialog("open");
		}
	});

	//bind da tecla enter para o botão de login
	$('#login').bind('keypress', function(e){
		  if (e.keyCode == 13) {
			  $('#loginButton').focus();
			  $('#loginButton').click();
	  	}
	});

	//bind da tecla enter para o ok dialog necessario seleccionar terapeuta
	$('#dialogNecessarioSeleccionarTerapeuta').bind('keypress', function(e){
		  if (e.keyCode == 13) {
			$('#okNecessarioSeleccionarTerapeuta').focus();
			$('#okNecessarioSeleccionarTerapeuta').click();
	  	}
	});

	//bind da tecla enter para o ok dialog necessario seleccionar terapeuta
	$('#dialogPasswordIncorrecta').bind('keypress', function(e){
		  if (e.keyCode == 13) {
			  $('#okPasswordIncorrecta').focus();
			  $('#okPasswordIncorrecta').click();
	  	}
	});

	//bind da tecla enter para o ok dialog necessario inserir password
	$('#dialogNecessarioInserirPassword').bind('keypress', function(e){
		  if (e.keyCode == 13) {
			  $('#okNecessarioInserirPassword').focus();
			  $('#okNecessarioInserirPassword').click();
	  	}
	});
}

function setDialogs(){
	//dialog que indica que é necessário escolher um terapeuta
	$("#dialogNecessarioSeleccionarTerapeuta").dialog({
		autoOpen: false,
		modal: true,
		resizable: true,
		buttons: [{
				//botão OK
				text: "OK",
				id: "okNecessarioSeleccionarTerapeuta",
				click: function(){
					$('#loginSelectTerapeuta').focus();
					$(this).dialog("close");
				}
			}]
	});
	
	//dialog que indica que a password é incorrecta
	$("#dialogPasswordIncorrecta").dialog({
		autoOpen: false,
		modal: true,
		resizable: true,
		buttons: [{
				//botão OK
				text: "OK",
				id: "okPasswordIncorrecta",
				click: function(){
					$(this).dialog("close");
				}
			}]
	});
	//dialog que indica que é necessário inserir uma password
	$("#dialogNecessarioInserirPassword").dialog({
		autoOpen: false,
		modal: true,
		resizable: true,
		buttons: [{
				//botão OK
				text: "OK",
				id: "okNecessarioInserirPassword",
				click: function(){
					$('#loginPassword').focus();
					$(this).dialog("close");
				}
			}]
	});
}

/*****************************************************
 Funcao que preenche o select com todos os terapeutas
 que estão enable
******************************************************/
function preencheTerapeutasLogin(xmlResponse){
	if($(xmlResponse).find('terapeuta')){
		$(xmlResponse).find('terapeuta').each(function(){
			if(Number($(this).find('enable').text()) == 1)
				$('#loginSelectTerapeuta').append('<option value="' + $(this).find('id').text() + '">' + $(this).find('nome').text() + '</option>');
		});
	}else{
		alert("Não foram encontrados terapeutas");
	}
}

/*****************************************************
 Funcao que verifica se a password do terapeuta e
 valida, no caso de ser faz login e passar para a 
 proxima pagina - listaSessao.html
******************************************************/
function validaTerapeuta(xmlResponse){
	if($(xmlResponse).find('terapeuta')){
		$(xmlResponse).find('terapeuta').each(function(){
			if($(this).find('password').text() == $passwordLogin){
				//id do terapeuta
				$terapeutaLoginId = $(this).find('id').map(function () {
					return Number($(this).text());
				}).get(0);
                //adiciona / actualiza data de login do terapeuta
                 var $aux = getLastLoginTerapeuta($terapeutaLoginId);
                
                if($aux == "Login existente."){
                    setLastLoginTerapeuta($terapeutaLoginId, true);
                } else {
                    setLastLoginTerapeuta($terapeutaLoginId, false);
                }
				window.localStorage.setItem("idTerapeutaLogin", $terapeutaLoginId);
				location.href='listas/listas.html';	
			}
			else{ 
				//alert("A password está incorrecta");
				$('#loginPassword').val('');
				$('#loginPassword').focus();
				$('#dialogPasswordIncorrecta').dialog("open");
				
			}
		});
	}else{
		alert("Não foi encontrado o terapeuta");
	}	
}

