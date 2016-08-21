<?php
//	require_once('FirePHPCore/fb.php');
//	ob_start();

	//Base de dados
	include_once 'inc/db/database.php';

	//Escrita XML
	include_once 'xml/write/writeXML.php';

	//Queries
	include_once 'database/terapeuta.php';
    include_once 'database/login.php';
	include_once 'database/crianca.php';
	include_once 'database/sessao.php';
	include_once 'database/historico.php';
	include_once 'database/historia.php';
	include_once 'database/cena.php';
	include_once 'database/etiqueta.php';
	include_once 'database/gesto.php';
	include_once 'database/questionario.php';
	include_once 'database/pergunta.php';
	include_once 'database/registo.php';

	connectBD();

	$xml = file_get_contents("php://input");
	$xmlLoaded = simplexml_load_string($xml);
//fb($xml);
	$result = $xmlLoaded->xpath("/pedido");
	$method = $result[0]->metodo;
//fb($method, "result0");

	switch ($method) {
	    case "GET":
            get();
		break;
	    case "PUT":
            put();
		break;
	    case "POST":
            post();
		break;
	    case "DELETE":
            delete();
		break;
	    default:
       	 	mensagemToXML("Bad Gateway - Invalid Method.");
	}

	/********************************************************************
	 			     Pedidos GET
	*********************************************************************/
	function get(){
		$tipoPedido = $GLOBALS["result"][0]->tipoPedido;
//fb($tipoPedido, "tipoPedido");
		switch($tipoPedido){
			case "allTerapeutas":
				getAllTerapeutas($GLOBALS["result"][0]->where);
				break;
			case "getTerapeutaById":
				getTerapeutaById($GLOBALS["result"][0]->idTerapeuta,"");	
				break;
			case "getTerapeutaByNome":		
				getTerapeutaByNome($GLOBALS["result"][0]->nomeTerapeuta);
				break;
			case "allCriancas":
				getAllCriancas($GLOBALS["result"][0]->where);
				break;
			case "getCrianca":
				getCriancaById($GLOBALS["result"][0]->idCrianca, "");
				break;
			case "getCriancaByNome":		
				getCriancaByNome($GLOBALS["result"][0]->nomeCrianca);
				break;
            case "getCriancaByUsername":	
//fb($GLOBALS["result"][0]->usernameCrianca, "asdjaslkdjsalkdj");
                getCriancaByUsername($GLOBALS["result"][0]->usernameCrianca);
            break;
			case "allSessoes":
				getAllSessoes();
				break;
			case "allSessoesCoDraw":
				getAllSessoesCoDraw();
				break;
            case "sessaoById":
                getSessaoById($GLOBALS["result"][0]->idSessao);
                break;
            case "allHistorico":
                getAllHistorico();
                break;
            case "sessaoHistoricoById":
                getSessaoHistoricoById($GLOBALS["result"][0]->idSessao);
                break;
            case "allHistorias":
                getAllHistorias();
                break;
            case "historiaById":
                getHistoriaById($GLOBALS["result"][0]->idHistoria);
                break;
			case "nomeHistoria":
				verificaNomeHistoria($GLOBALS["result"][0]->nomeHistoria);
				break;
			case "allCenas":
				getAllCenas();
				break;
			case "cenaById":
				getCenaById($GLOBALS["result"][0]->idCena);
				break;
			case "nomeCena":
				verificaNomeCena($GLOBALS["result"][0]->nomeCena);
				break;
            case "tipoActividade":
                getTipoActividadeCena($GLOBALS["result"][0]->idCena);
            break;
			case "allEtiquetas":
				getAllEtiquetas();
				break;
			case "allGestos":
				getAllGestos();
				break;
			case "gestoById":
				getGestoById($GLOBALS["result"][0]->idGesto);
				break;
			case "nomeGesto":
				verificaNomeGesto($GLOBALS["result"][0]->nomeGesto);
				break;
			case "allQuestionarios":
				getAllQuestionarios();
				break;
			case "questionarioById":
				getQuestionarioById($GLOBALS["result"][0]->idQuestionario);
				break;
			case "nomeQuestionario":
				verificaNomeQuestionario($GLOBALS["result"][0]->nomeQuestionario);
				break;
			case "allPerguntas":
				getAllPerguntas();
				break;
			case "allRegistos":
				getAllRegistos();
				break;
			case "registoById":
				getRegistoById($GLOBALS["result"][0]->idRegisto);
				break;
             case "registoBySessaoId":
                getRegistoBySessaoId($GLOBALS["result"][0]->idSessao);
				break;
            case "lastLoginTerapeuta":
                getlastLogin($GLOBALS["result"][0]->idTerapeuta);
            break;
			default:
				mensagemToXML("Get Sessao - Service not found.");
				break;
		}
	}

	/********************************************************************
	 			     Pedidos POST
	*********************************************************************/
	function post(){
		$tipoPedido = $GLOBALS["result"][0]->tipoPedido;
		switch($tipoPedido){
			case "adicionaTerapeuta":
            adicionaTerapeuta($GLOBALS["result"][0]->fotoTerapeuta, $GLOBALS["result"][0]->nomeTerapeuta,$GLOBALS["result"][0]->passwordTerapeuta);
				break;
			case "adicionaCrianca":
                adicionaCrianca($GLOBALS["result"][0]->urlFotoCrianca, $GLOBALS["result"][0]->usernameCrianca, $GLOBALS["result"][0]->nomeCrianca, $GLOBALS["result"][0]->dataNascimentoCrianca, $GLOBALS["result"][0]->observacaoCrianca, $GLOBALS["result"][0]->passwordCrianca);
				break;
			case "adicionaSessao":
				adicionaSessao($GLOBALS["result"][0]->idTerapeutaSessao, $GLOBALS["result"][0]->dataHoraSessao, $GLOBALS["result"][0]->dataInicioSessao, $GLOBALS["result"][0]->dataFimSessao, $GLOBALS["result"][0]->idCriancasSessao, $GLOBALS["result"][0]->tipoSessao, $GLOBALS["result"][0]->tipoExercicioSessao, $GLOBALS["result"][0]->idExercicioSessao, $GLOBALS["result"][0]->idCenasPontuacaoSessao);
				break;
			case "adicionaHistorico":
				adicionaHistorico($GLOBALS["result"][0]->idTerapeutaHistorico, $GLOBALS["result"][0]->dataHoraHistorico, $GLOBALS["result"][0]->dataInicioHistorico, $GLOBALS["result"][0]->dataFimHistorico, $GLOBALS["result"][0]->idCriancasHistorico, $GLOBALS["result"][0]->tipoSessao, $GLOBALS["result"][0]->tipoExercicioHistorico, $GLOBALS["result"][0]->idExercicioHistorico, $GLOBALS["result"][0]->logSessao, $GLOBALS["result"][0]->anotacoesSessao);
				break;
			case "adicionaEtiqueta":
				adicionaEtiqueta($GLOBALS["result"][0]->nomeEtiqueta);
				break;
			case "adicionaGesto":
				adicionaGesto($GLOBALS["result"][0]->nomeGesto);
				break;
			case "adicionaQuestionario":
				adicionaQuestionario($GLOBALS["result"][0]->nomeQuestionario, $GLOBALS["result"][0]->idPerguntas);
				break;
			case "adicionaPergunta":
				adicionaPergunta($GLOBALS["result"][0]->questao);
				break;
			case "adicionaCena":
				adicionaCena($GLOBALS["result"][0]->thumbnailCena, $GLOBALS["result"][0]->nomeCena, $GLOBALS["result"][0]->descricaoCena, $GLOBALS["result"][0]->tagsCena, $GLOBALS["result"][0]->urlIntroducaoCena, $GLOBALS["result"][0]->mimeIntroducaoCena, $GLOBALS["result"][0]->idActividadesCena, $GLOBALS["result"][0]->nrRepeticoesActividadeCena, $GLOBALS["result"][0]->tipoActividadeCena, $GLOBALS["result"][0]->urlReforcoPositivoCena, $GLOBALS["result"][0]->mimeReforcoPositivoCena, $GLOBALS["result"][0]->urlReforcoPositivoThumbCena, $GLOBALS["result"][0]->urlReforcoNegativoCena, $GLOBALS["result"][0]->mimeReforcoNegativoCena, $GLOBALS["result"][0]->urlReforcoNegativoThumbCena, $GLOBALS["result"][0]->nrVezesCena, $GLOBALS["result"][0]->pontuacaoCena);
				break;
			case "adicionaHistoria":
				adicionaHistoria($GLOBALS["result"][0]->thumbnailHistoria, $GLOBALS["result"][0]->nomeHistoria, $GLOBALS["result"][0]->descricaoHistoria, $GLOBALS["result"][0]->idCenasHistoria, $GLOBALS["result"][0]->idEtiquetasHistoria);
				break;
			case "adicionaRegistoGesto":
            adicionaRegistoGesto($GLOBALS["result"][0]->idSessao, $GLOBALS["result"][0]->idCena, $GLOBALS["result"][0]->nrRepeticaoCena, $GLOBALS["result"][0]->idCrianca, $GLOBALS["result"][0]->tipoRegisto, $GLOBALS["result"][0]->idGesto, $GLOBALS["result"][0]->nrRepeticaoGesto, $GLOBALS["result"][0]->respostaGesto, $GLOBALS["result"][0]->pontuacaoGesto);
			break;
			case "adicionaRegistoQuestionario":
            adicionaRegistoQuestionario($GLOBALS["result"][0]->idSessao, $GLOBALS["result"][0]->idCena, $GLOBALS["result"][0]->nrRepeticaoCena, $GLOBALS["result"][0]->idCrianca, $GLOBALS["result"][0]->tipoRegisto, $GLOBALS["result"][0]->idQuestionario, $GLOBALS["result"][0]->idPergunta, $GLOBALS["result"][0]->respostaPergunta);
			break;
			case "adicionaRegistoPontuacao":
            adicionaRegistoPontuacao($GLOBALS["result"][0]->idSessao, $GLOBALS["result"][0]->idCena, $GLOBALS["result"][0]->nrRepeticaoCena, $GLOBALS["result"][0]->idCrianca, $GLOBALS["result"][0]->tipoRegisto, $GLOBALS["result"][0]->pontuacaoCena);
			break;
            case "lastLoginTerapeuta":
                adicionarLastLoginTerapeuta($GLOBALS["result"][0]->idTerapeuta);
            break;
			default:
				mensagemToXML("Post Sessao - Service not found.");
				break;
		}	
	}

	/********************************************************************
	 			     Pedidos PUT
	*********************************************************************/
	function put(){
		$tipoPedido = $GLOBALS["result"][0]->tipoPedido;
		switch($tipoPedido){
			case "modificaTerapeuta":
            updateTerapeuta($GLOBALS["result"][0]->idTerapeuta, $GLOBALS["result"][0]->fotoTerapeuta, $GLOBALS["result"][0]->nomeTerapeuta, $GLOBALS["result"][0]->passwordTerapeuta);
				break;
			case "reactivaTerapeuta":
				reactivaTerapeuta($GLOBALS["result"][0]->idTerapeuta, $GLOBALS["result"][0]->passwordTerapeuta);
				break;
			case "modificaCrianca":
//fb($GLOBALS["result"][0]->urlFotoCrianca, 'urlFotoCrianca');
            updateCrianca($GLOBALS["result"][0]->idCrianca, $GLOBALS["result"][0]->urlFotoCrianca, $GLOBALS["result"][0]->usernameCrianca, $GLOBALS["result"][0]->nomeCrianca, $GLOBALS["result"][0]->dataNascimentoCrianca, $GLOBALS["result"][0]->observacaoCrianca, $GLOBALS["result"][0]->passwordCrianca);
                break;
			case "updateRegistosCrianca":
//fb($GLOBALS["result"][0]->registosCriancas,"updateRegistosCrianca");
				updateRegistosCrianca($GLOBALS["result"][0]->idCrianca, $GLOBALS["result"][0]->registosCriancas);
			break;
			case "reactivaCrianca":
				reactivaCrianca($GLOBALS["result"][0]->idCrianca, $GLOBALS["result"][0]->dataNascimentoCrianca, $GLOBALS["result"][0]->observacaoCrianca, $GLOBALS["result"][0]->passwordCrianca);
				break;
			case "modificaSessao":
				//updateSessao($GLOBALS["result"][0]->idSessaoEditar, $GLOBALS["result"][0]->idTerapeutaSessao, $GLOBALS["result"][0]->dataHoraSessao, $GLOBALS["result"][0]->idCriancasSessao, $GLOBALS["result"][0]->idHistoriaSessao, $GLOBALS["result"][0]->idCenasPontuacaoSessao);
                updateSessao($GLOBALS["result"][0]->idSessaoEditar, $GLOBALS["result"][0]->idTerapeutaSessao, $GLOBALS["result"][0]->dataHoraSessao, $GLOBALS["result"][0]->dataInicioSessao, $GLOBALS["result"][0]->dataFimSessao, $GLOBALS["result"][0]->idCriancasSessao, $GLOBALS["result"][0]->tipoSessao, $GLOBALS["result"][0]->tipoExercicioSessao, $GLOBALS["result"][0]->idExercicioSessao, $GLOBALS["result"][0]->idCenasPontuacaoSessao);
				break;
            case "modificaSessaoDataHoraSessao":
                modificaDataHora($GLOBALS["result"][0]->idSessaoEditar, $GLOBALS["result"][0]->dataHoraSessao, $GLOBALS["result"][0]->dataInicioSessao, $GLOBALS["result"][0]->dataFimSessao);
            break;
            case "lastLoginTerapeuta":
                updateLastLoginTerapeuta($GLOBALS["result"][0]->idTerapeuta);
            break;
			default:
				mensagemToXML("Put Sessao - Service not found.");
				break;
		}	
	}

	/********************************************************************
	 			     Pedidos DELETE
	*********************************************************************/
    function delete(){
		$tipoPedido = $GLOBALS["result"][0]->tipoPedido;
		switch($tipoPedido){
			case "removeTerapeuta":
				removeTerapeuta($GLOBALS["result"][0]->idTerapeuta);
				break;
			case "removeCrianca":
				removeCrianca($GLOBALS["result"][0]->idCrianca);
				break;
			case "removeSessao":
				removeSessao($GLOBALS["result"][0]->idSessao);
				break;
			default:
				mensagemToXML("Delete Sessao - Service not found.");
				break;
		}	
	}

?>
