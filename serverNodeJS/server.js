var pedido = require('./requests');
var WebSocketServer = require('websocket').server;

var http = require("http");
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
//cria o servidor e fica à escuta no porto correspondente
var server = http.createServer(function(request, response) {
		console.log((new Date()) + ' Received request for ' + request.url);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.end();
		}).listen(port, function() {
			//mensagem a indicar que o servidor está à escuta
			console.log((new Date()) + ' Server is listening on port ' + port);
		});

//cria o websocket
wsServer = new WebSocketServer({
    httpServer: server,
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

//quando o servidor recebe um request
wsServer.on('request', function(request) {
    var connection = request.accept('echo-protocol', request.origin);        
    console.log((new Date()) + ' Connection accepted.');
   
    //Quando o utilizador envia mensagem
    connection.on('message', function(message) {        	  
        if (message.type === 'utf8') {
        	var sms = message.utf8Data;
        	pedido.trataSMS(connection, sms);	 
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
        } 
    });
	
	//Quando o utilizador se desliga
    connection.on('close', function(reasonCode, description) {
	   //se for a ligação do terapeuta
        for (var i = 0; i < pedido.terapeutaConnectionsObject.length; i++){
            if(pedido.terapeutaConnectionsObject[i].connectionTerapeuta == connection){
                terapeuta(pedido.terapeutaConnectionsObject[i].connectionTerapeuta, 'terapeutaClosed@' + pedido.terapeutaConnectionsObject[i].idConnectionSessao);
            }
        }
        //se for a ligação da crianca
        for (var i = 0; i < pedido.criancasConnectionsObject.length; i++){
            if(pedido.criancasConnectionsObject[i].connectionCrianca == connection){
                crianca(pedido.criancasConnectionsObject[i].connectionCrianca, 'criancaClosed@' + pedido.criancasConnectionsObject[i].idConnectionSessao);
            }
        }
    });

});
