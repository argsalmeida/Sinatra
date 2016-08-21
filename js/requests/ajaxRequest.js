/********************************************
* Ficheiro onde sao tratados os pedidos     *
* AJAX antes de ser enviado para o servidor *
*********************************************/

/********************************************
 Cria a string para o servidor 
*********************************************/

function getUrl(){
	//sinatraLocal
	var $stringUrl = 'http://localhost/sinatraLocal/server/webservice.php';
    //sinatraDev
    //var $stringUrl = 'http://accessible-serv.lasige.di.fc.ul.pt/~sinatra/sinatraDev/server/webservice.php';	    
    //sinatraPIN
    //var $stringUrl = 'http://accessible-serv.lasige.di.fc.ul.pt/~sinatra/sinatra/server/webservice.php';
    //sinatraBomSucesso
    //var $stringUrl = 'http://accessible-serv.lasige.di.fc.ul.pt/~sinatra/sinatraBS/server/webservice.php';
    //sinatraELI
    //var $stringUrl = 'http://accessible-serv.lasige.di.fc.ul.pt/~sinatra/sinatraELI/server/webservice.php';
    //sinatraPS
    //var $stringUrl = 'http://accessible-serv.lasige.di.fc.ul.pt/~sinatra/sinatraELI/server/webservice.php';
	return $stringUrl;
}


/*************************************
 Funcao que trata dos erros do AJAX
**************************************/
function ajaxError(request, type, errorThrown){
	var message = "There was an error with the AJAX request.\n";
	switch (type) {
		case 'timeout':
			message += "The request timed out.";
			break;
		case 'notmodified':
			message += "The request was not modified but was not retrieved from the cache.";
			break;
		case 'parsererror':
			message += "XML/Json format is bad.";
			break;
		default:
			message += "HTTP Error (" + request.status + " " + request.statusText + ").";
	}
	message += "\n";
	alert(message);
}
