//sinatraLocal + sinatraDev
var port = 8880;
//sinatraPIN
//var port = 8881;
//sinatraBomSucesso
//var port = 8882;
//sinatraELI
//var port = 8883;
//sinatraPS
//var port = 8884;
var connection;

function createWebSocket () {
console.log("********************************* clienteCrianca - createWebSocket");	
	if ('WebSocket' in window){
        //sinatraLocal
        connection = new WebSocket('ws://localhost:' + port + '/sinatraLocal/serverNodeJS/', 'echo-protocol');
        //sinatraDev
        //connection = new WebSocket('ws://accessible-serv.lasige.di.fc.ul.pt:' + port + '/~sinatra/sinatraDev/serverNodeJS/', 'echo-protocol');
        //sinatraPIN
        //connection = new WebSocket('ws://accessible-serv.lasige.di.fc.ul.pt:' + port + '/~sinatra/sinatra/serverNodeJS/', 'echo-protocol');
        //sinatraBomSucesso
        //connection = new WebSocket('ws://accessible-serv.lasige.di.fc.ul.pt:' + port + '/~sinatra/sinatraBS/serverNodeJS/', 'echo-protocol');
        //sinatraELI
        //connection = new WebSocket('ws://accessible-serv.lasige.di.fc.ul.pt:' + port + '/~sinatra/sinatraELI/serverNodeJS/', 'echo-protocol');
        //sinatraPS
        //connection = new WebSocket('ws://accessible-serv.lasige.di.fc.ul.pt:' + port + '/~sinatra/sinatraPS/serverNodeJS/', 'echo-protocol');
		connection.onopen = function(){
			/*Send a small message to the console once the connection is established */
		   	console.log('Ligação aberta - player Criança!');
			
			sendSMS ('criancaOn@');  		
		} 
		 
		connection.onmessage = function (evt) {
			receiveSMS (evt);
		}
	}
	else 
		alert('O seu browser não permite que a sessão seja iniciada em computadores diferentes.');
}

function receiveSMS (evt) {
console.log("********************************* clienteCrianca - receiveSMS: " + evt.data);	
	var received_msg = evt.data;
	var sms = received_msg.split('@');
	switch(sms[0]){
		case 'criancaTerapeutaAssociados':
			ligacaoTerapeuta(sms[1]);
            console.log("****:" + sms[1]);
		break;
		case 'terapeutaClosed':
			ligacaoTerapeutaPerdida();
		break;
		case 'iniciaIntroducao':
		case 'iniciaReforcoPositivo':
		case 'iniciaReforcoNegativo':
console.log("VAR SMS[0]: " + sms[0]);
			//vai iniciar o player neste lado
			setVideoPlayer(sms[0], received_msg);
		break;
		case 'controlaSessaoIntroducao':
		case 'controlaSessaoReforcoPositivo':
		case 'controlaSessaoReforcoNegativo':
console.log('controlaSessaoIntroducao - controlaSessaoIntroducao');
console.log("------------ RECEIVE SMS: " + sms[2]);
			switch(sms[2]){
				case 'seeking':
					controlaVideoPlayer('seeking', sms[3]);
				break;
				case 'volume':
					controlaVideoPlayer('volume', sms[3]);
				break;
				case 'play':
					controlaVideoPlayer('play', 0)
				break;
				case 'pause':
					controlaVideoPlayer('pause', 0)
				break;
			}
		break;
		case 'iniciaCoDraw':
console.log("iniciaCoDraw");
			iniciaCoDraw();
		break;
		case 'terminaCoDraw':
console.log("terminaSessaoCriança");
			ligacaoTerapeutaPerdida();
		break;
	}
}

function sendSMS (string) {
console.log("********************************* clienteCrianca - sendSMS");	
	connection.send(string);	
}

function closeSocket() {
console.log("********************************* clienteCrianca - closeSocket");	
	connection.onclose = function(){	
		alert('Connection closed');
	}
}
