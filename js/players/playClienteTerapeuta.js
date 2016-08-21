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

function createWebSocket (idTerapeuta, idSessao) {
console.log("********************************* clienteTerapeuta - createWebSocket");
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
			/* Send a small message to the console once the connection is established */
		   	console.log('Ligação aberta - player Terapeuta!');
		   	sendSMS('terapeutaOn@' + idTerapeuta + '@' + idSessao);
		} 
		connection.onmessage = function (evt) {
			receiveSMS (evt);
		}	
	}
	else 
		alert('O seu browser não permite que a sessão seja iniciada em computadores diferentes.');
}

function receiveSMS (evt) {
console.log("********************************* clienteTerapeuta - receiveSMS");	
		var received_msg = evt.data;
		var sms = received_msg.split('@');
		switch(sms[0]){
			case 'numeroPlayersActivos':
				actualizaPlayersActivos(sms[1]);
			break;
			case 'terminaCoDraw':
			console.log("terminaSessaoTerapeuta");
			//closeSocket();
			location.href="../listas/listas.html";
			break;
		}	
}

function sendSMS (string) {
console.log("********************************* clienteTerapeuta - sendSMS -- " + string);
	connection.send(string);	
}

function closeSocket () {
console.log("********************************* clienteTerapeuta - closeSocket");
	connection.onclose = function(){
		console.log('Connection closed');
	}	
}

