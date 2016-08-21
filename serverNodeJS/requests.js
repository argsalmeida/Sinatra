var numeroPlayersActivos = 0;
//ligações do terapeuta
var terapeutaConnectionsObject = [];
// -- descricao do terapeutaConnectionObject
// -- idConnectionTerapeuta - idTerapeuta
// -- idConnectionSessao - idSessao
// -- connectionTerapeuta - ligação do terapeuta

//ligações da criança
var criancasConnectionsObject = [];
// -- descricao do criancasConnectionsObject
// -- idConnectionTerapeuta - idTerapeuta
// -- idConnectionSessao - idSessao
// -- connectionCrianca - ligação da 'crianca'

//funcao que trata as mensagens enviadas para o servidor
trataSMS = function(connection, sms){
console.log("REQUESTS.JS trataSMS vou tratar pedido");
	if (sms.indexOf ('@') != Number(-1)){
		var splitedSMS = sms.split('@');
		switch(splitedSMS[0]){
			case 'terapeutaOn': //o terapeuta liga-se
                console.log("REQUESTS.JS trataSMS terapeutaOn: " + sms);
				terapeutaConnectionsObject.push({idConnectionTerapeuta: splitedSMS[1], idConnectionSessao: splitedSMS[2], connectionTerapeuta: connection});
//printTerapeutas();
				//vai percorrer todas as ligações das crianças para ver se alguma ja fez o login e associar lhe o id da sessao
				for(var i = 0 ; i < criancasConnectionsObject.length ; i++){
					if(criancasConnectionsObject[i].idConnectionTerapeuta == splitedSMS[1]){
						criancasConnectionsObject[i].idConnectionSessao = splitedSMS[2];
                        crianca(criancasConnectionsObject[i].connectionCrianca, 'criancaTerapeutaAssociados@' + splitedSMS[2]);
					}
				}
				sendNumeroPlayersToTerapeuta(splitedSMS[2]);
//printCriancas();
			break;
			case 'criancaOn': //a 'crianca' liga-se
                console.log("REQUESTS.JS trataSMS terapeutaOn: " + sms);
				criancasConnectionsObject.push({idConnectionTerapeuta: 0, idConnectionSessao: 0, connectionCrianca: connection});
//printCriancas();
			break;
			case 'criancaLoginPlayer': //quando a 'crianca' faz login
                console.log("REQUESTS.JS trataSMS criancaLoginPlayer: " + sms);
				//percorre as ligacoes do terapeuta a ver se ja iniciou a sessao, se sim, vai ter um id de sessao associado
				var idSessao = 0;
				for(var i = 0 ; i < terapeutaConnectionsObject.length ; i++){
					if(terapeutaConnectionsObject[i].idConnectionTerapeuta == splitedSMS[1]){
						idSessao = terapeutaConnectionsObject[i].idConnectionSessao;
					}
				}

				//procura a crianca que fez a ligacao e atribui lhe o id do terapeuta e se for o caso o id da sessao
				for(var i = 0 ; i < criancasConnectionsObject.length ; i++){
					if(criancasConnectionsObject[i].connectionCrianca == connection){
						criancasConnectionsObject[i].idConnectionTerapeuta = splitedSMS[1];
						criancasConnectionsObject[i].idConnectionSessao = idSessao;
						if(idSessao != 0){
							crianca(criancasConnectionsObject[i].connectionCrianca, 'criancaTerapeutaAssociados@' + idSessao);
						}
					}
				}
//printCriancas();		
				if(idSessao != 0)
					sendNumeroPlayersToTerapeuta(idSessao);
			break;
			case 'iniciaIntroducao':
                console.log("REQUESTS.JS trataSMS iniciaIntroducao: " + sms);
				//envia mensagem para todas as 'criancas' desta sessao
				for(var i = 0 ; i < criancasConnectionsObject.length ; i++){
					if(criancasConnectionsObject[i].idConnectionSessao == splitedSMS[1]){
						crianca(criancasConnectionsObject[i].connectionCrianca, 'iniciaIntroducao@' + splitedSMS[2] + '@' + splitedSMS[3]);
					}
				}	
			break;
			case 'iniciaReforcoPositivo':
                console.log("REQUESTS.JS trataSMS iniciaReforcoPositivo: " + sms);
				//envia mensagem para todas as 'criancas' desta sessao
				for(var i = 0 ; i < criancasConnectionsObject.length ; i++){
					if(criancasConnectionsObject[i].idConnectionSessao == splitedSMS[1]){
						crianca(criancasConnectionsObject[i].connectionCrianca, 'iniciaReforcoPositivo@' + splitedSMS[2] + '@' + splitedSMS[3]);
					}
				}	
			break;
			case 'iniciaReforcoNegativo':
                console.log("REQUESTS.JS trataSMS iniciaReforcoNegativo: " + sms);
				//envia mensagem para todas as 'criancas' desta sessao
				for(var i = 0 ; i < criancasConnectionsObject.length ; i++){
					if(criancasConnectionsObject[i].idConnectionSessao == splitedSMS[1]){
						crianca(criancasConnectionsObject[i].connectionCrianca, 'iniciaReforcoNegativo@' + splitedSMS[2] + '@' + splitedSMS[3]);
					}
				}	
			break;
			case 'controlaSessaoIntroducao':
			case 'controlaSessaoReforcoPositivo':
			case 'controlaSessaoReforcoNegativo':
                console.log("REQUESTS.JS trataSMS controlaSessaoIntroducao: " + sms);
                console.log("REQUESTS.JS trataSMS controlaSessaoReforcoPositivo: " + sms);
                console.log("REQUESTS.JS trataSMS controlaSessaoReforcoNegativo: " + sms);
				for(var i = 0 ; i < criancasConnectionsObject.length ; i++){
					if(criancasConnectionsObject[i].idConnectionSessao == splitedSMS[1]){
						crianca(criancasConnectionsObject[i].connectionCrianca, sms);
					}
				}	
			break;
			case 'iniciaCoDraw':
                console.log("REQUESTS.JS trataSMS iniciaCoDraw: " + sms);
				//percorro todas as crianças e vejo quais têm a sessao com o id correspondente
				//ou seja as que estão associadas ao terapeuta naquela sessão
				for(var i = 0 ; i < criancasConnectionsObject.length ; i++){
					if(criancasConnectionsObject[i].idConnectionSessao == splitedSMS[1]){
						crianca(criancasConnectionsObject[i].connectionCrianca, sms);
					}
				}	
			break;
			case 'terminaCoDraw':
                console.log("REQUESTS.JS trataSMS terminaCoDraw: " + sms);
				for(var i = 0 ; i < criancasConnectionsObject.length ; i++){
					if(criancasConnectionsObject[i].idConnectionSessao == splitedSMS[1]){
						crianca(criancasConnectionsObject[i].connectionCrianca, sms);
					}
				}	

				for(var i = 0 ; i < terapeutaConnectionsObject.length ; i++){
					if(terapeutaConnectionsObject[i].idConnectionSessao == splitedSMS[1]){
						terapeuta(terapeutaConnectionsObject[i].connectionTerapeuta, sms);
					}
				}
			break;
		}
	}
}
/*********************************************************************************
	NUMERO DE PLAYERS
*********************************************************************************/
function sendNumeroPlayersToTerapeuta(idSessao){
console.log("REQUESTS.JS sendNumeroPlayersToTerapeuta: " + idSessao);
	numeroPlayersActivos = 0;
	for(var i = 0 ; i < criancasConnectionsObject.length ; i++){
		if(criancasConnectionsObject[i].idConnectionSessao == idSessao){
			numeroPlayersActivos++;
		}
	}

//console.log("*****************************************************************************");
//console.log("*********************************NUMERO PLAYERS ACTIVOS:" + numeroPlayersActivos);
//console.log("********************************************************************'*********");
	
    var newSMS = "numeroPlayersActivos@" + numeroPlayersActivos;
	for(var i = 0 ; i < terapeutaConnectionsObject.length ; i++){
		if(terapeutaConnectionsObject[i].idConnectionSessao == idSessao){
			terapeuta(terapeutaConnectionsObject[i].connectionTerapeuta, newSMS);
		}
	}
}
/*********************************************************************************
	CRIANCA
*********************************************************************************/
crianca = function (connection, sms) {
console.log("REQUESTS.JS crianca vou tratar pedidos crianca");
	var splitedSMS = sms.split('@');
	switch(splitedSMS[0]){
		case "criancaClosed":
            console.log("REQUESTS.JS criancaClosed: " + sms);
			//apaga a ligação da criança
			var idSessao = 0;
			var j = 0;
			while (j < criancasConnectionsObject.length){
				if(criancasConnectionsObject[j].connectionCrianca == connection){
					idSessao = criancasConnectionsObject[j].idConnectionSessao;
					criancasConnectionsObject.splice(j,1);
				//	break;
				} else {
					j++;
				}
			}
			//vai ao terapeuta com o id da mesma sessao e decrementa o numero de players activos
			if(idSessao != 0){
				sendNumeroPlayersToTerapeuta(idSessao)
			}
		break;
		default:
            console.log("REQUESTS.JS default: " + sms);
			//case 'criancaTerapeutaAssociados':
			//case 'terapeutaClosed':
			//case 'iniciaIntroducao':
			//case 'iniciaReforcoPositivo':
			//case 'iniciaReforcoNegativo':
			//case 'controlaSessaoIntroducao':
			//case 'controlaSessaoReforcoPositivo':
			//case 'controlaSessaoReforcoNegativo':
			//case 'iniciaCoDraw':
			//case 'terminaCoDraw':
			connection.sendUTF(sms);
		break;
	}
}

/*********************************************************************************
	TERAPEUTA
*********************************************************************************/
terapeuta = function (connection, sms) {
    console.log("REQUESTS.JS terapeuta vou tratar pedidos terapeuta");
	var splitedSMS = sms.split('@');
	switch(splitedSMS[0]){
		case "terapeutaClosed":
            console.log("REQUESTS.JS terapeutaClosed: " + sms);
			//apaga a ligação do terapeuta
			var i = 0;
			while (i < terapeutaConnectionsObject.length){
				if(terapeutaConnectionsObject[i].idConnectionSessao == splitedSMS[1]){
					terapeutaConnectionsObject.splice(terapeutaConnectionsObject[i],1);
				} else {
					i++;
				}
			}
			//vai a todas as crianças da sessao e manda mensagem de erro
			for(var i = 0 ; i < criancasConnectionsObject.length ; i++){
				if(criancasConnectionsObject[i].idConnectionSessao == splitedSMS[1]){
					crianca(criancasConnectionsObject[i].connectionCrianca, 'terapeutaClosed@');
				}
			}

//printTerapeutas();
//printCriancas();
		break;
		case 'numeroPlayersActivos':
		case 'terminaCoDraw':
            console.log("REQUESTS.JS numeroPlayersActivos: " + sms);
            console.log("REQUESTS.JS terminaCoDraw: " + sms);
			connection.sendUTF(sms);
		break;
	}
}

exports.trataSMS = trataSMS;
exports.terapeutaConnectionsObject = terapeutaConnectionsObject;
exports.criancasConnectionsObject = criancasConnectionsObject;

/*********************************************************************************
	PRINT TERAPEUTAS
*********************************************************************************/
function printTerapeutas(){
for(var i = 0 ; i < terapeutaConnectionsObject.length ; i++){
	console.log("********************************* requests trataSMS terapeutaConnectionObject terapeuta " + terapeutaConnectionsObject[i].idConnectionTerapeuta + " - sessao " + terapeutaConnectionsObject[i].idConnectionSessao);	
}
}

/*********************************************************************************
	PRINT CRIANCAS
*********************************************************************************/
function printCriancas(){
for(var i = 0 ; i < criancasConnectionsObject.length ; i++){
	console.log("********************************* requests trataSMS criancasConnectionObject crianca " + criancasConnectionsObject[i].idConnectionTerapeuta + " - sessao " + criancasConnectionsObject[i].idConnectionSessao);	
}
}
