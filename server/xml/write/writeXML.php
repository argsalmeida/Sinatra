<?php
	//require_once('FirePHPCore/fb.php');
	//ob_start();

	include('../../database/terapeuta.php');
	include('../../database/crianca.php');
	include('../../database/historia.php');
	include('../../database/cena.php');
	include('../../database/etiqueta.php');
	include('../../database/gesto.php');
	include('../../database/questionario.php');
	include('../../database/pergunta.php');
	include('../../database/registo.php');

	/****************************************
	 Ficheiro que contem o XML com os resultados
	 para mandar para o cliente
	*****************************************/

	/****************************************
	 Função que encapsula uma mensagem 
	 em XML para mandar para o cliente
	*****************************************/
	function mensagemToXML($mensagem) {
	    header("Content-type: text/xml");
	    echo "<?xml version='1.0' encoding='UTF-8'?>";
		echo "<aviso>";
	    echo "\t<mensagem>" . utf8_encode($mensagem) . "</mensagem>";
		echo "</aviso>";
	}

	/****************************************
	 Função que encapsula uma mensagem 
	 em XML para mandar para o cliente
	 nos pedidos GET
	*****************************************/	
	function terapeutaToXML ($count, $terapeutas){
		header("Content-type: text/xml");
		echo "<?xml version='1.0' encoding='UTF-8'?>";
		echo "<catalogoTerapeutas>";
		while ($terapeuta = mysql_fetch_array($terapeutas)) {
			echo "<terapeuta>";
			for($i=0; $i< $count; $i++) { 
				$node = mysql_field_name($terapeutas, $i ); 
				echo ("<$node>". utf8_encode($terapeuta[$node]). "</$node>"); 
			}
			echo "</terapeuta>";
		}
		echo "</catalogoTerapeutas>";
	}

	/****************************************
	 Função que encapsula uma mensagem 
	 em XML para mandar para o cliente
	 nos pedidos GET
	*****************************************/
    function criancaToXML($count, $criancas) {
        header("Content-type: text/xml");
        echo "<?xml version='1.0' encoding='UTF-8'?>";
        echo "<catalogoCriancas>";
        while ($crianca = mysql_fetch_array($criancas)) {
            echo "<crianca>";
            for($i=0; $i< $count; $i++) { 
                $node = mysql_field_name($criancas, $i ); 
                switch($node){
                    case 'registos':
                        $idregistos = explode(",", $crianca['registos']);
                        foreach ($idregistos as $c) {
                            if($c != ' '){ //o ultimo elemento do array é ' '
                                $registos = getRegistoById($c, "xml");
                                while ($registo = mysql_fetch_array($registos)){
                                    echo "<registo>";
                                    for($k=0; $k< mysql_num_fields($registos); $k++) { 
                                        $node3 = mysql_field_name($registos, $k); 
                                        switch ($node3){ 
                                            case 'id':
                                                echo ("<$node3>". utf8_encode($registo[$node3]). "</$node3>"); 
                                            break;
                                            //vai buscar os dados necessários para a sessao
                                            case 'idSessao':
                                                //idSessao
                                                echo ("<$node3>". utf8_encode($registo[$node3]). "</$node3>"); 
                                                $sessoes = getSessaoHistoricoById($registo[$node3], "xml");
                                                while ($sessao = mysql_fetch_array($sessoes)) {
                                                    for($j=0; $j< mysql_num_fields($sessoes); $j++) { 
                                                        $node2 = mysql_field_name($sessoes, $j);
                                                        switch($node2){
                                                            case 'dataHora':
                                                                $phpdate = strtotime( $sessao[$node2] );
                                                                $mysqldate = date( 'Y-m-d H:i', $phpdate );
                                                                echo ("<$node2>". utf8_encode($mysqldate). "</$node2>"); 
                                                            break;
                                                        }
                                                    }
                                                }                                               
                                            break;
                                            //vai buscar os dados necessários para a cena
                                            case idCena:
                                                //idCena
                                                echo ("<$node3>". utf8_encode($registo[$node3]). "</$node3>");
                                                //nomeCena
                                                //a cena tem pontuacao?
                                                $cenas = getCenaById($registo[$node3], "xml");
                                                while ($cena = mysql_fetch_array($cenas)) {
                                                    for($q=0; $q< mysql_num_fields($cenas); $q++){ 
                                                        $node2 = mysql_field_name($cenas, $q);
                                                        switch($node2){
                                                            case 'nome':
                                                                echo("<nomeCena>". utf8_encode($cena[$node2]). "</nomeCena>");
                                                            break;
                                                            case 'pontuacao':
                                                                echo ("<temPontuacao>". utf8_encode($cena[$node2]). "</temPontuacao>"); 
                                                            break;
                                                            case 'tipoActividade':
                                                                echo ("<$node2>". utf8_encode($cena[$node2]). "</$node2>"); 
                                                            break;
                                                        }
                                                    }
                                                }       
                                            break;
                                                case 'idGesto':
                                                    //idGesto
                                                    echo ("<idGesto>". utf8_encode($registo[$node3]). "</idGesto>");
                                                    //nomeGesto
                                                    $gestos = getGestoById($registo[$node3], "xml");
                                                    while ($gesto = mysql_fetch_array($gestos)) {
                                                        for($g=0; $g< mysql_num_fields($gestos); $g++){ 
                                                            $node2 = mysql_field_name($gestos, $g);
                                                            switch($node2){
                                                                case 'nomeGesto':
                                                                    echo("<$node2>". utf8_encode($gesto[$node2]). "</$node2>");
                                                                break;
                                                            }
                                                        }
                                                    }       
                                                break;
                                                case 'idQuestionario':
                                                    //idQuestionario
                                                    echo ("<idQuestionario>". utf8_encode($registo[$node3]). "</idQuestionario>");
                                                    //nomeQuestionario
                                                    $questionarios = getQuestionarioById($registo[$node3], "xml");
                                                    while ($questionario = mysql_fetch_array($questionarios)) {
                                                        $nrTotalPerguntas = 0;
                                                        for($w=0; $w< mysql_num_fields($questionarios); $w++){ 
                                                            $node2 = mysql_field_name($questionarios, $w);
                                                            switch($node2){
                                                                case 'nomeQuestionario':
                                                                    echo("<nomeQuestionario>". utf8_encode($questionario[$node2]). "</nomeQuestionario>");
                                                                break;
                                                                case 'idPerguntas':
                                                                    $perguntasIds = explode(",", $questionario['idPerguntas']);
                                                                    $nrTotalPerguntas = count($perguntasIds);
                                                                break;
                                                            }
                                                        }
                                                        echo("<nrTotalPerguntas>". utf8_encode($nrTotalPerguntas). "</nrTotalPerguntas>");
                                                    }       
                                                break;
                                                case 'idPergunta':
                                                    //idPergunta
                                                    echo ("<idPergunta>". utf8_encode($registo[$node3]). "</idPergunta>");
                                                    //nomePergunta
                                                    $perguntas = getPerguntaById($registo[$node3], "xml");
                                                    while ($pergunta = mysql_fetch_array($perguntas)) {
                                                        for($p=0; $p< mysql_num_fields($perguntas); $p++){ 
                                                            $node2 = mysql_field_name($perguntas, $p);
                                                                switch($node2){
                                                                    case 'questao':
                                                                        echo("<questao>". utf8_encode($pergunta[$node2]). "</questao>");
                                                                    break;
                                                                }
                                                        }
                                                    }       
                                                break;
                                            default: 
                                                echo ("<$node3>". utf8_encode($registo[$node3]). "</$node3>"); 
                                        }
                                    }
                                    echo "</registo>";
                                }
                            }
                        }
                    break;
                    default:
                        echo ("<$node>". utf8_encode($crianca[$node]). "</$node>"); 
                }
            }
            echo "</crianca>";
        }
        echo "</catalogoCriancas>";
    }

	/****************************************
	 Função que encapsula uma mensagem 
	 em XML para mandar para o cliente
	 nos pedidos GET
	*****************************************/
	$exercicio = '';
	function sessaoToXML($count, $sessoes, $codigo) {
	    header("Content-type: text/xml");
	    echo "<?xml version='1.0' encoding='UTF-8'?>";
	    echo "<catalogoSessoes>";
	    while ($sessao = mysql_fetch_array($sessoes)) {
		echo "<sessao>";
		for($i=0; $i<$count; $i++) { 
			$node = mysql_field_name($sessoes, $i);
			switch($node){
				case "id": 
					echo ("<$node>". utf8_encode($sessao[$node]). "</$node>"); 
					break;
				case "idTerapeuta": 
					//vai buscar o terapeuta pelo id
					$terapeutas = getTerapeutaById($sessao['idTerapeuta'], "xml");
					while ($terapeuta = mysql_fetch_array($terapeutas)) {
						echo "<terapeuta>";
						for($j=0; $j< mysql_num_fields($terapeutas); $j++) { 
							$node2 = mysql_field_name($terapeutas, $j ); 
							echo ("<$node2>". utf8_encode($terapeuta[$node2]). "</$node2>"); 
						}
					}
					echo "</terapeuta>";
					break;
				case "dataHora": 
					$phpdate = strtotime( $sessao[$node] );
					$mysqldate = date( 'Y-m-d H:i', $phpdate );
					echo ("<$node>". utf8_encode($mysqldate). "</$node>"); 
					break;
				case "dataInicio": 
				case "dataFim": 
					if($sessao[$node] != '0000-00-00'){
						$phpdate = strtotime( $sessao[$node] );
						$mysqldate = date( 'Y-m-d', $phpdate );
						echo ("<$node>". utf8_encode($mysqldate). "</$node>"); 
					} else  {
						echo ("<$node>". '' . "</$node>"); 
					}
					break;
				case "idCriancas":
					$criancasIds = explode(",", $sessao['idCriancas']);
					foreach ($criancasIds as $c) {
						if($c != ' '){ //o ultimo elemento do array é ' '
							$criancas = getCriancaById($c, "xml");
							while ($crianca = mysql_fetch_array($criancas)) {
								echo "<crianca>";
								for($j=0; $j< mysql_num_fields($criancas); $j++) { 
									$node2 = mysql_field_name($criancas, $j ); 
									echo ("<$node2>". utf8_encode($crianca[$node2]). "</$node2>"); 
								}
								echo "</crianca>";
							}
						}
					}
					break;
				case "tipoExercicio":
					$GLOBALS["exercicio"] = utf8_encode($sessao[$node]);
					echo ("<$node>". utf8_encode($sessao[$node]) . "</$node>"); 
				break;
				case 'idExercicio':
					switch($GLOBALS["exercicio"]){
						case 'História':
							//vai buscar a historia pelo id
							$historias = getHistoriaById($sessao['idExercicio'], "xml");
							while ($historia = mysql_fetch_array($historias)) {
								echo "<historia>";
								for($j=0; $j< mysql_num_fields($historias); $j++) { 
									$node2 = mysql_field_name($historias, $j ); 
									switch($node2){
										case "idCenas":
											$idCenas = explode(",", $historia['idCenas']);
											foreach ($idCenas as $c) {
												if($c != ' '){ //o ultimo elemento do array é ' '
													$cenas = getCenaById($c, "xml");
													while ($cena = mysql_fetch_array($cenas)) {
														echo "<cena>";
														for($k=0; $k< mysql_num_fields($cenas); $k++) { 
															$node3 = mysql_field_name($cenas, $k); 
															//echo ("<$node3>". utf8_encode($cena[$node3]). "</$node3>");*/
															writeCenaToXML($node3, $cena);
														}
														echo "</cena>";
													}
												}
											}
										break;
										case "tags":
											$idEtiquetas = explode(",", $historia['tags']);
											foreach ($idEtiquetas as $c) {
												if($c != ' '){ //o ultimo elemento do array é ' '
													$etiquetas = getEtiquetaById($c, "xml");
													while ($etiqueta = mysql_fetch_array($etiquetas)) {
														echo "<etiqueta>";
														for($k=0; $k< mysql_num_fields($etiquetas); $k++) { 
															$node3 = mysql_field_name($etiquetas, $k); 
															echo ("<$node3>". utf8_encode($etiqueta[$node3]). "</$node3>"); 
														}
														echo "</etiqueta>";
													}
												}
											}
                                            if($idEtiquetas.length == 0){
                                                echo "<etiqueta>";
                                                echo "</etiqueta>";
                                            }
										break;
										default:
											echo ("<$node2>". utf8_encode($historia[$node2]). "</$node2>"); 
									}
								}
							}
							echo "</historia>";
						break;
					}
				break;
				case "tipoSessao":
				case "idCenasPontuacao":
				case "logSessao": 
				case "anotacoesSessao": 
					echo ("<$node>". utf8_encode($sessao[$node]) . "</$node>"); 
				break;
			}
		}
		echo "</sessao>";
	    }
	    echo "</catalogoSessoes>";
	}

	/****************************************
	 Função que encapsula uma mensagem 
	 em XML para mandar para o cliente
	 nos pedidos GET
	*****************************************/
	function historiaToXML($count, $historias) {
	    header("Content-type: text/xml");
	    echo "<?xml version='1.0' encoding='UTF-8'?>";
		echo "<catalogoHistorias>";
		//Escreve o xml da historia
		while ($historia = mysql_fetch_array($historias)) {
			echo "<historia>";
			for($i=0; $i < $count; $i++) {  // ciclo for que vai buscar toda a informacao da historia 
				$node = mysql_field_name($historias, $i);
				switch($node){
					case 'id':
						echo ("<$node>". utf8_encode($historia[$node]) . "</$node>"); 
						break;
					case 'thumbnail':
						echo ("<$node>". utf8_encode($historia[$node]) . "</$node>"); 
						break;
					case 'nome':
						echo ("<$node>". utf8_encode($historia[$node]) . "</$node>"); 
						break;
					case 'descricao':
						echo ("<$node>". utf8_encode($historia[$node]) . "</$node>"); 
						break;
					case 'idCenas':
						$idCenas = explode(",", $historia['idCenas']);
						foreach ($idCenas as $c) {
							if($c != ' '){ //o ultimo elemento do array é ' '
								$cenas = getCenaById($c, "xml");
								while ($cena = mysql_fetch_array($cenas)) {
									echo "<cena>";
									for($j=0; $j< mysql_num_fields($cenas); $j++) { 
										$node2 = mysql_field_name($cenas, $j);
										echo ("<$node2>". utf8_encode($cena[$node2]). "</$node2>"); 
									}
									echo "</cena>";
								}
							}
						}
						break;
					case 'tags':
						$idEtiquetas = explode(",", $historia['tags']);
						foreach ($idEtiquetas as $c) {
							if($c != ' '){ //o ultimo elemento do array é ' '
								$etiquetas = getEtiquetaById($c, "xml");
								while ($etiqueta = mysql_fetch_array($etiquetas)) {
									echo "<etiqueta>";
									for($j=0; $j< mysql_num_fields($etiquetas); $j++) { 
										$node2 = mysql_field_name($etiquetas, $j); 
										echo ("<$node2>". utf8_encode($etiqueta[$node2]). "</$node2>"); 
									}
									echo "</etiqueta>";
								}
							}
						}
						break;
					case 'versao':
						echo ("<$node>". utf8_encode($historia[$node]) . "</$node>"); 
						break;
				}
			}
			echo "</historia>";
		}
		echo "</catalogoHistorias>";	
	}

	/****************************************
	 Função que encapsula uma mensagem 
	 em XML para mandar para o cliente
	 nos pedidos GET
	*****************************************/
	$actividade = '';
	$nrRepeticaoGestos = array();
	function cenaToXML($count, $cenas) {
	    header("Content-type: text/xml");
	    echo "<?xml version='1.0' encoding='UTF-8'?>";
		echo "<catalogoCenas>";
		//Escreve o xml da cena
		while ($cena = mysql_fetch_array($cenas)) {
			echo "<cena>";
			for($i=0; $i < $count; $i++) {  // ciclo for que vai buscar toda a informacao da cena 
				$node = mysql_field_name($cenas, $i);
				writeCenaToXML($node, $cena);
			}
			echo "</cena>";
		}
		echo "</catalogoCenas>";	
	}

	/****************************************
	 Função que encapsula uma mensagem 
	 em XML para mandar para o cliente
	 nos pedidos GET
	*****************************************/	
	function etiquetaToXML ($count, $etiquetas){
		header("Content-type: text/xml");
		echo "<?xml version='1.0' encoding='UTF-8'?>";
		echo "<catalogoEtiquetas>";
		while ($etiqueta = mysql_fetch_array($etiquetas)) {
			echo "<etiqueta>";
			for($i=0; $i< $count; $i++) { 
				$node = mysql_field_name($etiquetas, $i ); 
				echo ("<$node>". utf8_encode($etiqueta[$node]) . "</$node>"); 
			}
			echo "</etiqueta>";
		}
		echo "</catalogoEtiquetas>";
	}

	/****************************************
	 Função que encapsula uma mensagem 
	 em XML para mandar para o cliente
	 nos pedidos GET
	*****************************************/	
	function gestoToXML ($count, $gestos){
		header("Content-type: text/xml");
		echo "<?xml version='1.0' encoding='UTF-8'?>";
		echo "<catalogoGestos>";
		while ($gesto = mysql_fetch_array($gestos)) {
			echo "<gesto>";
			for($i=0; $i< $count; $i++) { 
				$node = mysql_field_name($gestos, $i ); 
				echo ("<$node>". utf8_encode($gesto[$node]) . "</$node>"); 
			}
			echo "</gesto>";
		}
		echo "</catalogoGestos>";
	}

	/****************************************
	 Função que encapsula uma mensagem 
	 em XML para mandar para o cliente
	 nos pedidos GET
	*****************************************/	
	function questionarioToXML ($count, $questionarios){
		header("Content-type: text/xml");
		echo "<?xml version='1.0' encoding='UTF-8'?>";
		echo "<catalogoQuestionarios>";
		while ($questionario = mysql_fetch_array($questionarios)) {
			echo "<questionario>";
				for($i=0; $i < $count; $i++) {  // ciclo for que vai buscar toda a informacao da historia 
				$node = mysql_field_name($questionarios, $i);
				switch($node){
					case 'id':
						echo ("<$node>". utf8_encode($questionario[$node]) . "</$node>"); 
						break;
					case 'nomeQuestionario':
						echo ("<$node>". utf8_encode($questionario[$node]) . "</$node>"); 
						break;
					case 'idPerguntas':
						$idPerguntas = explode(",", $questionario['idPerguntas']);
						foreach ($idPerguntas as $c) {
							if($c != ' '){ //o ultimo elemento do array é ' '
								$perguntas = getPerguntaById($c, "xml");
								while ($pergunta = mysql_fetch_array($perguntas)) {
									echo "<pergunta>";
									for($j=0; $j< mysql_num_fields($perguntas); $j++) { 
										$node2 = mysql_field_name($perguntas, $j); 
										echo ("<$node2>". utf8_encode($pergunta[$node2]). "</$node2>"); 
									}
									echo "</pergunta>";
								}
							}
						}
						break;
				}
			}
			echo "</questionario>";
		}
		echo "</catalogoQuestionarios>";
	}

	/****************************************
	 Função que encapsula uma mensagem 
	 em XML para mandar para o cliente
	 nos pedidos GET
	*****************************************/	
	function perguntaToXML ($count, $perguntas){
		header("Content-type: text/xml");
		echo "<?xml version='1.0' encoding='UTF-8'?>";
		echo "<catalogoPerguntas>";
		while ($pergunta = mysql_fetch_array($perguntas)) {
			echo "<pergunta>";
			for($i=0; $i< $count; $i++) { 
				$node = mysql_field_name($perguntas, $i ); 
				echo ("<$node>". utf8_encode($pergunta[$node]) . "</$node>"); 
			}
			echo "</pergunta>";
		}
		echo "</catalogoPerguntas>";
	}	

	/****************************************
	 Função que escreve o XML de uma cena
	*****************************************/	
	function writeCenaToXML($node, $cena){
		switch($node){
			case 'id':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'thumbnail':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'nome':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'descricao':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'tags':
				$idEtiquetas = explode(",", $cena['tags']);
				foreach ($idEtiquetas as $c) {
					if($c != ' '){ //o ultimo elemento do array é ' '
						$etiquetas = getEtiquetaById($c, "xml");
						while ($etiqueta = mysql_fetch_array($etiquetas)) {
							echo "<etiqueta>";
							for($j=0; $j< mysql_num_fields($etiquetas); $j++) { 
								$node2 = mysql_field_name($etiquetas, $j); 
								echo ("<$node2>". utf8_encode($etiqueta[$node2]). "</$node2>"); 
							}
							echo "</etiqueta>";
						}
					}
				}
				break;
			case 'urlIntroducao':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'mimeTypeIntroducao':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'tipoActividade':
				$GLOBALS["actividade"] = utf8_encode($cena[$node]);
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'nrRepeticaoGesto':
				switch($GLOBALS["actividade"]){
					case 'Gesto':
						$GLOBALS["nrRepeticaoGestos"] = explode(",", $cena['nrRepeticaoGesto']);
						//echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
					break;
				}
				break;
			case 'idActividades':
				switch($GLOBALS["actividade"]){
					case 'Gesto':
						$idGestos = explode(",", $cena['idActividades']);

						$w = 0;
						foreach ($idGestos as $c) {
							if($c != ' '){ //o ultimo elemento do array é ' '
								$gestos = getGestoById($c, "xml");
								while ($gesto = mysql_fetch_array($gestos)) {
									echo "<gesto>";
									for($j=0; $j< mysql_num_fields($gestos); $j++) { 
										$node2 = mysql_field_name($gestos, $j); 
										echo ("<$node2>". utf8_encode($gesto[$node2]). "</$node2>"); 
									}
									echo ("<nrRepeticaoGestos>". $GLOBALS["nrRepeticaoGestos"][$w] . "</nrRepeticaoGestos>"); 
									$w++;

									echo "</gesto>";
								}
							}
						}
						break;
					case 'Questionário':
						$idQuestionarios = explode(",", $cena['idActividades']);
						foreach ($idQuestionarios as $c) {
							if($c != ' '){ //o ultimo elemento do array é ' '
								$questionarios = getQuestionarioById($c, "xml");
								while ($questionario = mysql_fetch_array($questionarios)) {
									echo "<questionario>";
									for($j=0; $j< mysql_num_fields($questionarios); $j++) { 
										$node2 = mysql_field_name($questionarios, $j);
										switch($node2){
											case 'id':
												echo ("<$node2>". utf8_encode($questionario[$node2]). "</$node2>");
												break;
											case 'nomeQuestionario':
												echo ("<$node2>". utf8_encode($questionario[$node2]). "</$node2>");
												break;
											case 'idPerguntas':
												$idPerguntas = explode(",", $questionario['idPerguntas']);
												foreach ($idPerguntas as $c) {
													if($c != ' '){ //o ultimo elemento do array é ' '
														$perguntas = getPerguntaById($c, "xml");
														while ($pergunta = mysql_fetch_array($perguntas)) {
														echo "<pergunta>";
															for($k=0; $k< mysql_num_fields($perguntas); $k++) { 
																$node3 = mysql_field_name($perguntas, $k);
																echo ("<$node3>". utf8_encode($pergunta[$node3]). "</$node3>");
															}
														echo "</pergunta>";
														}
													}
												}
												break;
										}
									}
									echo "</questionario>";
								}
							}
						}
						break;
				}
				break;
			case 'urlReforcoPositivo':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'mimeTypeReforcoPositivo':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'urlReforcoPositivoThumb':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'urlReforcoNegativo':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'mimeTypeReforcoNegativo':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'urlReforcoNegativoThumb':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'nrVezesCena':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'pontuacao':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
			case 'versao':
				echo ("<$node>". utf8_encode($cena[$node]) . "</$node>"); 
				break;
		}
	}

	/****************************************
	 Função que encapsula uma mensagem 
	 em XML para mandar para o cliente
	 nos pedidos GET
	*****************************************/	
	function registoToXML ($count, $registos){
		header("Content-type: text/xml");
		echo "<?xml version='1.0' encoding='UTF-8'?>";
		echo "<catalogoRegistos>";
		while ($registo = mysql_fetch_array($registos)) {
			echo "<registo>";
				for($i=0; $i < $count; $i++) {  // ciclo for que vai buscar toda a informacao do registo
				$node = mysql_field_name($registos, $i);
                //echo ("<$node>". utf8_encode($registo[$node]) . "</$node>"); 
                switch($node){
					case 'id':
						echo ("<$node>". utf8_encode($registo[$node]) . "</$node>"); 
						break;
					case 'idSessao':
						echo ("<$node>". utf8_encode($registo[$node]) . "</$node>"); 
						break;
					case 'idCena':
						//echo ("<$node>". utf8_encode($registo[$node]) . "</$node>"); 
                        $cenas = getCenaById($registo[$node], "xml");
                        while ($cena = mysql_fetch_array($cenas)) {
                            echo "<cena>";
                            for($k=0; $k< mysql_num_fields($cenas); $k++) { 
                                $node3 = mysql_field_name($cenas, $k); 
                                //echo ("<$node3>". utf8_encode($cena[$node3]). "</$node3>");*/
                                //writeCenaToXML($node3, $cena);
                                switch($node3){
                                    case 'id':
                                    case 'nome':
                                        echo ("<$node3>". utf8_encode($cena[$node3]). "</$node3>"); 
                                    break;
                                }
                            }
                            echo "</cena>";
                        }
						break;
                    case 'nrRepeticaoCena':
                        echo ("<$node>". utf8_encode($registo[$node]) . "</$node>"); 
                    break;
                    case 'idCrianca':
                        $criancas = getCriancaById($registo[$node], "xml");
                        while ($crianca = mysql_fetch_array($criancas)) {
                            echo "<crianca>";
                            for($j=0; $j < mysql_num_fields($criancas); $j++) { 
                                $node2 = mysql_field_name($criancas, $j ); 
                                echo ("<$node2>". utf8_encode($crianca[$node2]). "</$node2>"); 
                            }
                            echo "</crianca>";
                        }
						break;
					case 'tipoRegisto':
						echo ("<$node>". utf8_encode($registo[$node]) . "</$node>"); 
						break;
					case 'idGesto':
                        $gestos = getGestoById($registo[$node], "xml");
                        while ($gesto = mysql_fetch_array($gestos)) {
                            echo "<gesto>";
                            for($j=0; $j< mysql_num_fields($gestos); $j++) { 
                                $node2 = mysql_field_name($gestos, $j); 
                                echo ("<$node2>". utf8_encode($gesto[$node2]). "</$node2>"); 
                            }
                            echo "</gesto>";
                        }
						break;
					case 'nrRepeticaoGesto':
						echo ("<$node>". utf8_encode($registo[$node]) . "</$node>"); 
						break;
					case 'respostaGesto':
						echo ("<$node>". utf8_encode($registo[$node]) . "</$node>"); 
						break;
                    case 'pontuacaoGesto':
                        echo ("<$node>". utf8_encode($registo[$node]) . "</$node>"); 
                    break;
                    case 'idQuestionario':
                        $questionarios = getQuestionarioById($registo[$node], "xml");
                        while ($questionario = mysql_fetch_array($questionarios)) {
                            echo "<questionario>";
                            for($j=0; $j< mysql_num_fields($questionarios); $j++) { 
                                $node2 = mysql_field_name($questionarios, $j); 
                                echo ("<$node2>". utf8_encode($questionario[$node2]). "</$node2>"); 
                            }
                            echo "</questionario>";
                        }
                    break;
					case 'idPergunta':
                        $perguntas = getPerguntaById($registo[$node], "xml");
                        while ($pergunta = mysql_fetch_array($perguntas)) {
                            echo "<pergunta>";
                            for($j=0; $j< mysql_num_fields($perguntas); $j++) { 
                                $node2 = mysql_field_name($perguntas, $j); 
                                echo ("<$node2>". utf8_encode($pergunta[$node2]). "</$node2>"); 
                                }
                            echo "</pergunta>";
                        }
						break;
					case 'respostaPergunta':
						echo ("<$node>". utf8_encode($registo[$node]) . "</$node>"); 
						break;
					case 'pontuacaoCena':
						echo ("<$node>". utf8_encode($registo[$node]) . "</$node>"); 
						break;
				}
			}
			echo "</registo>";
		}
		echo "</catalogoRegistos>";
	}
?>
