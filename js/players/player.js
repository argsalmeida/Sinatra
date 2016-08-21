var $idSessao = 0;
var $terapeutaId = 0;
var $password = '';
var $validaTerapeuta = '';
var $playerNumber = 0;

$(document).ready(function () {
	resizeFunctionPlayerWindow();
	//cria o websocket do lado da crianca
	createWebSocket();
	$idSessao = window.localStorage.getItem('playIdSessao');
    console.log("##############################################" + $idSessao);
	preencheTerapeutas('loginPlayer');
	trataDialogs();

	//bind da tecla enter para o ok dialog	
	$("#dialogLoginPlayer").dialog("open");
});

function preencheListaTerapeutasPlayer(xmlResponse){
	if($(xmlResponse).find('terapeuta')){
		$(xmlResponse).find('terapeuta').each(function(){
			if(Number($(this).find('enable').text()) == 1)
				$('#usernamePlayer').append('<option value="' + $(this).find('id').text() + '">' + $(this).find('nome').text() + '</option>');
		});
	}else{
		alert("Não foram encontrados terapeutas");
	}
}

function trataDialogs(){
	//bind da tecla enter para o dialog
	$('#dialogLoginPlayer').bind('keypress', function(e){
		  if (e.keyCode == 13) {
			  $('#okLoginPlayer').focus();
			  $('#okLoginPlayer').click();
		  }
	});

	$("#dialogLoginPlayer").dialog({
		autoOpen: false,
		modal: true,
		resizable: true,
		buttons: [{
				//botão OK
				text: "OK",
				id: "okLoginPlayer",
				click: function(){
					if($('#usernamePlayer').val() != null && $('#passwordPlayer').val() != ''){
						//se os campos foram todos preenchidos
						$terapeutaId = $('#usernamePlayer').val();
						$password = $('#passwordPlayer').val();
						getTerapeutaById($terapeutaId, 'loginPlayer');
						if($validaTerapeuta == 'Terapeuta válido'){
							$(this).dialog("close");
							sendSMS('criancaLoginPlayer@' + $terapeutaId);
							$playerNumber = Number(window.localStorage.getItem('nrPlayers'));
							//caso seja o primeiro player
							if($playerNumber == 0)
								$playerNumber = 1;
							$playerNumber = $playerNumber + 1;
							window.localStorage.setItem('nrPlayers', $playerNumber);
							$("#iniciaPlayerDiv").show();

						} else {
							alert($validaTerapeuta + '!');
						}
					} else {
						if(($('#usernamePlayer').val() == null))
							alert("Tem de seleccionar um terapeuta.");
						else 
							alert("Tem de inserir a password.");
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
}

function validaTerapeutaPlayer($xmlResponse){
	if($($xmlResponse).find('terapeuta') != ''){
		$($xmlResponse).find('terapeuta').each(function () {
			//nome do terapeuta
			var $nomeTerapeuta = $(this).find('nome').text();
			var $passwordTerapeuta = $(this).find('password').text();
			if($passwordTerapeuta == $password){
				$validaTerapeuta = 'Terapeuta válido';
			} else {
				$validaTerapeuta = 'Password inválida';
			}
		});
	} else {
		$validaTerapeuta = 'Terapeuta não encontrado';
	}
}

function ligacaoTerapeutaPerdida(){
	$("#iniciaPlayerDiv").hide();
	$('#mensagemBemVindoDiv').hide();
	$('#mensagemCoDraw').hide();
	$('#videoSessaoPlayerDiv').hide();
	$('#videoPlayer').hide();
	$('#imagemSessaoPlayerDiv').hide();
	$('#mensagemLigacaoPerdidaDiv').show();
}

function ligacaoTerapeuta(id){
	$('#mensagemLigacaoPerdidaDiv').hide();
	$("#iniciaPlayerDiv").hide();
	$('#mensagemBemVindoDiv').show();
    $idSessao = id;
}


function setVideoPlayer(tipo, sms){
	$("#iniciaPlayerDiv").hide();
	$('#mensagemBemVindoDiv').hide();
	$('#imagemSessaoPlayerDiv').hide();
	$('#videoSessaoPlayerDiv').hide();
	$('#videoPlayer').hide();


	var dados = sms.split('@');
	var mimeTypeVideoCenaPlayer = dados[1];
	//se for um video
	if(mimeTypeVideoCenaPlayer == "video"){
		var videoCenaPlayer = dados[2];

		var videoPlayerMp4 = videoCenaPlayer + '.mp4?random=' + $playerNumber; 
		var videoPlayerWebm = videoCenaPlayer + '.webm';
		$('#videoPlayer').empty();
		$('#videoSessaoPlayerDiv').empty();
		//Cria o elemento de video		
		$('#videoSessaoPlayerDiv').append('<video id="videoPlayer" preload="auto"></video>');
		
		//Não aparecer os controlos
		$('#videoPlayer').prop('controls', false);

		var type = '';
		if ($('#videoPlayer')[0].canPlayType('video/mp4; codecs="amp4v.20.8, mp4a.40.2"') != ''){
			type = 'video/mp4; codecs="amp4v.20.8, mp4a.40.2"';
		}
		
		else if ($('#videoPlayer')[0].canPlayType('video/mp4; codecs="avc1.58A01E, mp4a.40.2"') != ''){
			type = 'video/mp4; codecs="avc1.58A01E, mp4a.40.2"';
		}
		
		else if ($('#videoPlayer')[0].canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') != ''){
			type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
		}

		else if ($('#videoPlayer')[0].canPlayType('video/mp4; codecs="avc1.64001E, mp4a.40.2"') != ''){
			type = 'video/mp4; codecs="avc1.64001E, mp4a.40.2"';
		}

		else if ($('#videoPlayer')[0].canPlayType('video/mp4; codecs="avc1.4D401E, mp4a.40.2"') != ''){
			type = 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"';
		}
		
		else if ($('#videoPlayer')[0].canPlayType('video/mp4; codecs="mp4v.20.8, mp4a.40.2"') != ''){
			type = 'video/mp4; codecs="mp4v.20.240, mp4a.40.2"';
		}

		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
		if(isAndroid) {
			$('#videoPlayer').append('<source src="' + videoPlayerMp4 + '">');
			$('#videoPlayer').append('<source src="' + videoPlayerWebm + '">');
			$('#videoPlayer').append('<p>Your browser does not support HTML5 video.</p>');
		} else {
			$('#videoPlayer').append('<source src="' + videoPlayerMp4 + '" type="' + type + '">');
			$('#videoPlayer').append('<source src="' + videoPlayerWebm + '" type="video/webm; codecs="vp8, vorbis">');
			$('#videoPlayer').append('<p>Your browser does not support HTML5 video.</p>');
		}
		$('#videoSessaoPlayerDiv').show();
		$('#videoPlayer').show();

	} else { //mimeTypeVideoCenaPlayer == "imagem"
		var imagemCenaPlayer = dados[2];
		$('#imagemPlayer').attr('src', imagemCenaPlayer);   
		$('#imagemSessaoPlayerDiv').show();
	}
}

function controlaVideoPlayer(controlo, valor){
	switch(controlo){
		case 'play':
			$('#videoPlayer')[0].play();

		break;
		case 'pause':
			$('#videoPlayer')[0].pause();
		break;
		case 'seeking':
			$('#videoPlayer')[0].pause();
			$('#videoPlayer')[0].currentTime = valor;
		break;
		case 'volume':
			$('#videoPlayer')[0].volume = valor;
		break;
	}
}

/******************************************************
 Função que formata o conteudo dos elementos do player
 consoante o tamanho da janela
*******************************************************/
function resizeFunctionPlayerWindow(){
	var $windowSize = $(window).height();
console.log("xz: " + $windowSize);
	$('#videoSessaoPlayerDiv').css("height", ($windowSize*0.98) + "px");
	$('#imagemSessaoPlayerDiv').css("height", ($windowSize*0.98) + "px");
	$('#imagemPlayer').css("height", ($windowSize*0.98) + "px");
	$('#videoPlayer').css("height", ($windowSize*0.98) + "px");

	$(window).resize(function(){
		$windowSize = $(window).height();
		$('#imagemLigacaoPerdida').css("height", $windowSize + "px");
		$('#videoSessaoPlayerDiv').css("height", ($windowSize*0.98) + "px");
		$('#imagemSessaoPlayerDiv').css("height", ($windowSize*0.98) + "px");
		$('#imagemPlayer').css("height", ($windowSize*0.98) + "px");
		$('#videoPlayer').css("height", ($windowSize*0.98) + "px");
	});
}

function iniciaCoDraw(){
console.log("iniciaCoDrawiniciaCoDraw aqui");
console.log($idSessao);
	//window.localStorage.setItem('idSessaoCodraw', $idSessao);
    window.localStorage.setItem('idSessaoCodraw', $idSessao);
	window.localStorage.setItem('tipoUtilizadorCodraw', '2');
    window.localStorage.setItem('tipoSessaoCodraw', 'sinatra');
    //window.localStorage.setItem('idUtilizadorCodraw', 0);
console.log("idSessaoCodraw" + window.localStorage.getItem('idSessaoCodraw'));
	//window.location.href = 'http://accessible-serv.lasige.di.fc.ul.pt/~fabioaarito/desenhocolaborativo';
	//window.open('http://accessible-serv.lasige.di.fc.ul.pt/~fabioaarito/desenhocolaborativo', '_blank');
    window.open('http://accessible-serv.lasige.di.fc.ul.pt/~codraw/app.php', '_blank');
    //location.href = 'http://accessible-serv.lasige.di.fc.ul.pt/~codraw/app.php';
    console.log("aqui");
	$('#mensagemBemVindoDiv').hide();
	$('#mensagemCoDraw').show();
}
