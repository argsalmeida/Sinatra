/*******************************************************
 * Ficheiro com as funções referentes ao preenchimento *
 * dos dados da sessão				       *
 *******************************************************/ 

/******************************************************
 Funçao que vai preencher os dados da sessão caso
 editar sessao
*******************************************************/
function preencheSessaoModificar(xmlResponse){
console.log("preencheSessaoModificar");
console.log(xmlResponse);
	if($(xmlResponse).find('sessao')){
		$(xmlResponse).find('sessao').each(function(){
			//id da sessao
			$idSessao = $(this).find('id').map(function () { 
							return $(this).text();
						}).get(0);

console.log("$idSessao: " + $idSessao);
			//terapeuta
			$idTerapeutaSessao = $(this).find('terapeuta').find('id').map(function () { 
							return $(this).text();
						}).get(0);
console.log("$idTerapeutaSessao: " + $idTerapeutaSessao);
			//criancas
			$(xmlResponse).find('sessao').find('crianca').each(function(){
				//id das criancas
				var $idCrianca = $(this).find('id').map(function () { 
							return $(this).text();
						}).get(0);
				var $nomeCrianca = $(this).find('nome').map(function () { 
							return $(this).text();
						}).get(0);

				$idCriancasSessao.push($idCrianca);
				$nomeCriancasSessao.push($nomeCrianca);
			});

			$tipoSessao = $(xmlResponse).find('sessao').find('tipoSessao').map(function () { 
							return $(this).text();
						}).get(0);

			//data e hora da sessao
			var $dataHora = $(xmlResponse).find('sessao').find('dataHora').map(function () { 
							return $(this).text();
						}).get(0);
			$dataSessao = $dataHora.split(' ')[0];
			$horaSessao = $dataHora.split(' ')[1];

			$tipoExercicioSessao = $(xmlResponse).find('sessao').find('tipoExercicio').map(function () { 
							return $(this).text();
						}).get(0);

			switch($tipoExercicioSessao){
				case 'História':
					$idHistoria = $(xmlResponse).find('sessao').find('historia').find('id').map(function () { 
							return $(this).text();
						}).get(0);
                    $nomeHistoria = $(xmlResponse).find('sessao').find('historia').find('nome').map(function () { 
                        return $(this).text();
                    }).get(0);
                    $descricaoHistoria = $(xmlResponse).find('sessao').find('historia').find('descricao').map(function () { 
                        return $(this).text();
                    }).get(0);
                    $imagemHistoria = $(xmlResponse).find('sessao').find('historia').find('thumbnail').map(function () { 
                        return $(this).text();
                    }).get(0);
                    $(xmlResponse).find('sessao').find('historia').find('etiqueta').each(function(){
                        $etiqueta = $(this).find('id').map(function () { 
                            return $(this).text();
                        }).get(0);
                        $nomeEtiqueta = $(this).find('nomeEtiqueta').map(function () { 
                            return $(this).text();
                        }).get(0);
                        if($etiqueta != null){
                            $idEtiquetasHistoria.push(Number($etiqueta));
                            $etiquetasHistoria.push($nomeEtiqueta);
                        }
                    });
				break;
				case 'CoDraw':
				break;
			}
			/*//historia da sessao
			$idHistoria = $(xmlResponse).find('sessao').find('historia').find('id').map(function () { 
							return $(this).text();
						}).get(0);
console.log("$idHistoria: " + $idHistoria);*/
			});
	}else{
		alert("Não foi encontrada a sessao.");
	}
}


/******************************************************
 Funçao que preenche a lista de terapeutas na tab de
 "Escolher Terapeuta"
*******************************************************/
function preencheListaTerapeutasSessao(xmlResponse){
	if($(xmlResponse).find('terapeuta')){
		$(xmlResponse).find('terapeuta').each(function(){
			if(Number($(this).find('enable').text()) == 1)
				$('#listaTerapeutasSessao').append('<option value="' + $(this).find('id').text() + '">' + $(this).find('nome').text() + '</option>');
		});
	}else{
		alert("Não foram encontrados terapeutas.");
	}
}

/******************************************************
 Funçao que preenche a lista de crianças na tab de
 "Escolher Crianças"
*******************************************************/
function preencheListaCriancasSessao(xmlResponse){
	if($(xmlResponse).find('crianca')){
		$(xmlResponse).find('crianca').each(function(){
            var $idCrianca = 0;
            var $nomeCrianca = '';
			if(Number($(this).find('enable').text()) == 1){
                $idCrianca = $(this).find('id').map(function () {
                    return $(this).text();
                }).get(0);
                $nomeCrianca = $(this).find('nome').map(function () {
                    return $(this).text();
                }).get(0);
				$('#listaCriancasExistentes').append('<option value="' + $idCrianca + '">' + $nomeCrianca + '</option>');
                $('#listaCriancasExistentesAux').append('<option value="' + $idCrianca + '">' + $nomeCrianca + '</option>');
			}
		});
	}else{
        $('#listaCriancasExistentes').append('<option value="' + $idCrianca + '" disabled>' + "(sem resultados.)" + '</option>');
        $('#listaCriancasExistentesAux').append('<option value="' + $idCrianca + '" disabled>' + "(sem resultados.)" + '</option>');
	}
}

/******************************************************
 Funçao que preenche a lista de etiquetas na tab de
 "Etiquetas da História"
*******************************************************/
function preencheListaEtiquetasHistoria(xmlResponse){
	if($(xmlResponse).find('etiqueta')){
		$(xmlResponse).find('etiqueta').each(function(){
				$('#listaEtiquetasHistoriasExistentes').append('<option value="' + $(this).find('id').text() + '">' + $(this).find('nomeEtiqueta').text() + '</option>');
				$('#listaEtiquetasHistoriasExistentesAux').append('<option value="' + $(this).find('id').text() + '">' + $(this).find('nomeEtiqueta').text() + '</option>');
		});
	}else{
		$('#listaEtiquetasHistoriasExistentes').append('<option value="-1" disabled>' + "(sem etiquetas.)" + '</option>');
		$('#listaEtiquetasHistoriasExistentesAux').append('<option value="-1" disabled>' + "(sem etiquetas.)" + '</option>');
	}
}

/******************************************************
 Funçao que preenche a lista de historias na tab de
 "Biblioteca de Histórias"
*******************************************************/
var $idHistoriaSeleccionada = 0;
var $idHist = 0;
function preencheBibliotecaHistorias($xmlResponse){
	//a lista começa vazia
	$('#listaHistoria').empty();
	if($($xmlResponse).find('historia').text() == ''){
		$('#listaHistoria').append('<p id="listaHistoriaP">Não foram encontradas histórias.</p>');
	} else { 
		$($xmlResponse).find('historia').each(function () {
			//idHistoria
			var $idHistoria = $(this).find('id').map(function () { 
						return $(this).text();
					}).get(0);
			//thumbnail
			var $thumbnail = $(this).find('thumbnail').map(function () { 
						return $(this).text();
					}).get(0);
			//nome
			var $nome = $(this).find('nome').map(function () { 
						return $(this).text();
					}).get(0);
			//descrição
			var $descricao = $(this).find('descricao').map(function () { 
						return $(this).text();
					}).get(0);
			//idCenas
			var $idCenas = $(this).find('idCenas').map(function () { 
						return $(this).text();
					}).get(0);
			//tags
			var $tags = $(this).find('tags').map(function () { 
						return $(this).text();
					}).get(0);
			//versão
			var $versao = $(this).find('versao').map(function () { 
						return $(this).text();
					}).get(0);
			//preenche a lista de histórias
			$('#listaHistoria').append('<div class="frameHistoria"><img class="thumbnailHistoria" id="historia' + $idHistoria + 
					'" src="' + $thumbnail + '"/>' + 
					'<p class="nomeHistoriaBiblioteca">' + $nome + '</p></div>');

			$(".frameHistoria").css('cursor', 'pointer');
			//muda a border da história quando o rato está em cima do thumbnail	
			$('#historia' + $idHistoria).bind('mouseover', function () {
				$(this).css('border-color', '#FF0000');
			});
			//muda a border da história quando o rato sai de cima do thumbnail
			$('#historia' + $idHistoria).bind('mouseout', function () {
				if($idHistoria != $idHistoriaSeleccionada)
					$(this).css('border-color', '#0191d8');
			});
			//ao seleccionar uma história, muda a border e preenche a informação dessa historia
			$('#historia' + $idHistoria).bind('click', function () {
				$idHist = $(this).attr('id').split('historia')[1];
				$('#usarBibliotecaHistoriasButton').attr('disabled', false);
				if($idHistoriaSeleccionada !=  $idHist){
					removeTabs();
					$('#historia' + $idHistoriaSeleccionada).css('border', 'solid #0191d8');
					$idHistoriaSeleccionada = $idHist;
					$('#historia' + $idHistoriaSeleccionada).css('border', 'dashed #FF0000');
					//vai buscar a historia por id
					getHistoriaById($idHistoriaSeleccionada, "seleccionarHistoria");
				}
			});
		});
	}
}

/*********************************************************
 Funçao que preenche os detalhes da historia seleccionada
 na tab de "Biblioteca de Histórias"
**********************************************************/
var $idCenaHistoriaSeleccionada = 0;
var $idCenaHist = 0;
function preencheHistoriaSeleccionada($xmlResponse){
	if($($xmlResponse).find('historia').text() == ''){
		$('#informacaoHistoria').empty();
		$('#informacaoHistoria').append('<p>Não foi seleccionada uma história. Escolha uma história da biblioteca.</p>');
	} else { 
		$($xmlResponse).find('historia').each(function () {
				//idHistoria
				$idHistoria = $(this).find('id').map(function () { 
							return $(this).text();
						}).get(0);

				//thumbnail
				$imagemHistoria = $(this).find('thumbnail').map(function () { 
						return $(this).text();
					}).get(0);
				//nome
				$nomeHistoria = $(this).find('nome').map(function () { 
						return $(this).text();
					}).get(0);
				//descrição
				$descricaoHistoria = $(this).find('descricao').map(function () { 
						return $(this).text();
					}).get(0);

				//tags - cria um array com os nomes para identificar os thumbnails
				$idEtiquetasHistoria = [];
				$etiquetasHistoria = [];
				$(this).find('etiqueta').each(function(){
					$idEtiquetasHistoria.push($(this).find('id').map(function () { 
						return $(this).text();
					}).get(0));
					$etiquetasHistoria.push($(this).find('nomeEtiqueta').text());
				});
				//versão
				$versaoHistoria = $(this).find('versao').map(function () { 
						return $(this).text();
					}).get(0);
				//tipo Actividade
				var $actividade = $(this).find('tipoActividade').text();
				var $tipoActividade = '';
				var $temActividadeAux = false;
				if ($actividade.indexOf("Gesto") >= 0){
					$tipoActividade += "Gesto";
					$temActividadeAux = true;
				}
				if ($actividade.indexOf("Questionario") >= 0){
					if($temActividadeAux) 
						$tipoActividade += " / ";
					$tipoActividade += "Questionario";
				}
				//preenche o thumbnail
				//No caso de se ter seleccionado uma história antes, limpa o conteúdo
				$('#informacaoHistoria').empty();

				//adiciona o thumbnail
				$('#informacaoHistoria').append('<div id="thumbnailHistoriaSeleccionada"></div>');
				$('#thumbnailHistoriaSeleccionada').empty();
				$('#thumbnailHistoriaSeleccionada').append('<img id="thumbnailImagem"/>');
				$('#thumbnailImagem').attr('src', $imagemHistoria);

				$('#informacaoHistoria').append('<div id="historiaSeleccionadaDetalhes">');

				//adiciona o nome
				$('#historiaSeleccionadaDetalhes').append('<p id="nomeHistoriaSeleccionada"><strong><font size="4">Nome: </font></strong><font size="3">' + $nomeHistoria  + '</font></p>');

				//Adiciona a descrição
				if ($descricaoHistoria != '')
					$('#historiaSeleccionadaDetalhes').append('<p id="descricaoHistoriaSeleccionada"><strong><font size="4">Descrição: </font></strong><font size="3">' + $descricaoHistoria  + '</font></p>');
				else
					$('#historiaSeleccionadaDetalhes').append('<p id="descricaoHistoriaSeleccionada"><strong><font size="4">Descrição: </font></strong><font size="3">Esta história não tem uma descrição associada.</font><div></p>');
				//adiciona as etiquetas
				var $etiquetasStringHistoria = '';
				if ($etiquetasHistoria.length != 0){
					for ( var i = 0; i < $etiquetasHistoria.length-1; i++ ) {
					    $etiquetasStringHistoria += $etiquetasHistoria[i] + ", ";
					}
					$etiquetasStringHistoria += $etiquetasHistoria[$etiquetasHistoria.length-1];
					$('#historiaSeleccionadaDetalhes').append('<p id="tagsHistoriaSeleccionada"><strong><font size="4">Etiquetas: </font></strong><font size="3">' + $etiquetasStringHistoria  + '</font></p>');
				}
				else
					$('#historiaSeleccionadaDetalhes').append('<p id="tagsHistoriaSeleccionada"><strong><font size="4">Etiquetas: </font></strong><font size="3">Esta história não tem uma etiquetas associadas.</font><div></p>');

				//Tipo de Actividade
				$('#historiaSeleccionadaDetalhes').append('<p id="tipoActividadeSeleccionada"><strong><font size="4">Tipo de Actividade: </font></strong><font size="3">' + $tipoActividade  + '</font></p>');

				//idCenas
				$('#historiaSeleccionadaDetalhes').append('<p id="cenasHistoriaSeleccionada"><strong><font size="4">Cenas: </font></p>');
				$('#historiaSeleccionadaDetalhes').append('<div id="listaCenasHistoriaDiv"></div>');
				//adiciona o thumbnail das cenas existentes na historias
				$('#listaCenasHistoriaDiv').append('<div id="listaCenasHistoria"></div>');
				$($xmlResponse).find('historia').find('cena').each(function(){
					var $idCenaHistoria = $(this).find('id').map(function () { 
								return $(this).text();
							}).get(0);

					$idCenasHistoria.push($idCenaHistoria);

					var $nomeCena = $(this).find('nome').text();
					var $thumbnailCena = $(this).find('thumbnail').text();
					var $pontuacao = $(this).find('pontuacao').text();
					if($pontuacao == 1)
						$idCenasPontuacao.push($idCenaHistoria);
					//tamanho das imagens
					var width = $('#listaCenasHistoria').width() + 96;

					$('#listaCenasHistoria').css('width', width + 'px');
					$('#listaCenasHistoria').append('<div class="frameCenasHistoria"><img class="thumbnailCenasHistoria" id="cenaHistoria' +
						 $idCenaHistoria + '" src="' + $thumbnailCena + '"/>' + 
						'<p class="nomeHistoriaBiblioteca">' + $nomeCena + '</p></div>');
					$(".frameCenasHistoria").css('cursor', 'pointer');
				
					$('#cenaHistoria' + $idCenaHistoria).bind('mouseover', function () {
						$(this).css('border-color', '#FF0000');
					});
				
					$('#cenaHistoria' + $idCenaHistoria).bind('mouseout', function () {
						if($idCenaHistoria != $idCenaHistoriaSeleccionada)
							$(this).css('border-color', '#0191d8');
					});

					$('#cenaHistoria' + $idCenaHistoria).bind('click', function () {
						$idCenaHist = $(this).attr('id').split('cenaHistoria')[1];
						if($idCenaHistoriaSeleccionada !=  $idCenaHist){
							$('#cenaHistoria' + $idCenaHistoriaSeleccionada).css('border', 'solid #0191d8');
							$idCenaHistoriaSeleccionada = $idCenaHist;
							$('#cenaHistoria' + $idCenaHistoriaSeleccionada).css('border', 'solid #0191d8');
							getCenaById($idCenaHistoriaSeleccionada, "seleccionarCenaDetalhes");
						}
					});
				});
				$('#informacaoHistoria').append('</div>');
				$('#alterarBibliotecaHistoriasButton').attr("disabled", false);
			});
	}
}

/*********************************************************
 Funçao que preenche as cenas existentes na história
**********************************************************/
var $idCenaSeleccionada = 0;
var $idCenaAux = 0;
function preencheCenasHistoria($xmlResponse){
	$('#listaCenasHistoriaSeleccionadas').empty();
			
	if($($xmlResponse).find('historia').find('cena').text() == ''){
		$('#listaCenasHistoriaSeleccionadas').append('<p id="cenasHistoriaP" style="">Não existem cenas nesta história.</p>');
	} else { 
		$($xmlResponse).find('historia').find('cena').each(function () {
			//idCena
			$idCena = $(this).find('id').map(function () { 
							return $(this).text();
						}).get(0);

			//thumbnail
			$imagemCena = $(this).find('thumbnail').map(function () { 
						return $(this).text();
					}).get(0);
			//nome
			$nomeCena = $(this).find('nome').map(function () { 
						return $(this).text();
					}).get(0);

			$('#listaCenasHistoriaSeleccionadas').append('<div class="frameCenasHistoriaSeleccionada"><img class="thumbnailCenasHistoriaSeleccionada" id="cena' + $idCena + 
					'" src="' + $imagemCena + '"/>' + 
					'<p class="nomeCenasBibliotecaSeleccionada">' + $nomeCena + '</p></div>');

			$(".frameCenasHistoriaSeleccionada").css('cursor', 'pointer');

			$('#cena' + $idCena).bind('mouseover', function () {
				$(this).css('border-color', '#FF0000');
			});

			$('#cena' + $idCena).bind('mouseout', function () {
				if($idCena != $idCenaSeleccionada)
					$(this).css('border-color', '#0191d8');
			});

			$('#cena' + $idCena).bind('dblclick', function () {
				$idCenaAux = $(this).attr('id').split('cena')[1];
				if($idCenaSeleccionada !=  $idCenaAux){
					$('#cena' + $idCenaSeleccionada).css('border', 'solid #0191d8');
					$idCenaSeleccionada = $idCenaAux;
					$('#cena' + $idCenaSeleccionada).css('border', 'solid #0191d8');
					getCenaById($idCenaSeleccionada, "seleccionarCenaDetalhes");
				}
			});
			
		});
	}
}

/******************************************************
 Funçao que preenche a lista de etiquetas na tab de
 "Etiquetas da Cena"
*******************************************************/
function preencheListaEtiquetasCena($xmlResponse){
	if($($xmlResponse).find('etiqueta')){
		$($xmlResponse).find('etiqueta').each(function(){
				$('#listaEtiquetasCenasExistentes').append('<option value="' + $(this).find('id').text() + '">' + $(this).find('nomeEtiqueta').text() + '</option>');
				$('#listaEtiquetasCenasExistentesAux').append('<option value="' + $(this).find('id').text() + '">' + $(this).find('nomeEtiqueta').text() + '</option>');
		});
	}else{
		//alert("Não foram encontradas etiquetas.");
		$('#listaEtiquetasCenasExistentes').append('<option value="-1" disabled>' + "(sem etiquetas.)" + '</option>');
		$('#listaEtiquetasCenasExistentesAux').append('<option value="-1" disabled>' + "(sem etiquetas.)" + '</option>');
	}
}

/******************************************************
 Funçao que preenche a lista de cenas na tab de
 "Biblioteca de Cenas"
*******************************************************/
var $idCenaSelec = 0;
var $idCenaAux = 0;
function preencheBibliotecaCenas($xmlResponse){
	//a lista começa vazia
	$('#listaCenas').empty();
	if($($xmlResponse).find('cena').text() == ''){
		$('#listaCenas').append('<p id="cenasHistoriaP">Não foram encontradas cenas.</p>');
	} else { 
		$($xmlResponse).find('cena').each(function () {
			//idCena
			var $idCena = $(this).find('id').map(function () { 
						return $(this).text();
					}).get(0);
			//thumbnail
			var $thumbnail = $(this).find('thumbnail').map(function () { 
						return $(this).text();
					}).get(0);
			//nome
			var $nome = $(this).find('nome').map(function () { 
						return $(this).text();
					}).get(0);
			//descrição
			var $descricao = $(this).find('descricao').map(function () { 
						return $(this).text();
					}).get(0);

			//tags
			var $tags = $(this).find('tags').map(function () { 
						return $(this).text();
					}).get(0);
			//versão
			var $versao = $(this).find('versao').map(function () { 
						return $(this).text();
					}).get(0);
			//preenche a lista de cenas
			$('#listaCenas').append('<div class="frameCena"><img class="thumbnailCenaBiblioteca" id="cenaBiblioteca' + $idCena + 
					'" src="' + $thumbnail + '"/>' + 
					'<p class="nomeCenaBiblioteca">' + $nome + '</p></div>');

			$(".frameCena").css('cursor', 'pointer');
			//muda a border da cena quando o rato está em cima do thumbnail	
			$('#cenaBiblioteca' + $idCena).bind('mouseover', function () {
				$(this).css('border-color', '#FF0000');
			});
			//muda a border da cena quando o rato sai de cima do thumbnail
			$('#cenaBiblioteca' + $idCena).bind('mouseout', function () {
				if($idCena != $idCenaSelec)
					$(this).css('border-color', '#0191d8');
			});

			//ao seleccionar uma cena, muda a border e preenche a informação dessa cena
			$('#cenaBiblioteca' + $idCena).bind('click', function () {
				$idCenaAux = $(this).attr('id').split('cenaBiblioteca')[1];
				$('#usarBibliotecaCenasButton').attr('disabled', false);
				if($idCenaSelec !=  $idCenaAux){
					removeTabs();
					$('#cenaBiblioteca' + $idCenaSelec).css('border', 'solid #0191d8');
					$idCenaSelec = $idCenaAux;
					$('#cenaBiblioteca' + $idCenaSelec).css('border', 'dashed #FF0000');
console.log("$idCenaSelec: " + $idCenaSelec);
					//vai buscar a historia por id
					getCenaById($idCenaSelec, "seleccionarCena");
				}
			});
		});
	}
}

/*********************************************************
 Funçao que preenche os detalhes da cena seleccionada
 na tab de "Biblioteca de Cenas"
**********************************************************/
var $idCenaSeleccionadaBiblioteca = 0;
var $idCenaBiblioteca = 0;
function preencheCenaSeleccionada($xmlResponse){
console.log("preencheCenaSeleccionada");
	if($($xmlResponse).find('cena').text() == ''){
		$('#informacaoCena').empty();
		$('#informacaoCena').append('<p>Não foi seleccionada uma cena. Escolha uma cena da biblioteca.</p>');
	} else { 
		$idTipoActividadeCena = [];
		$($xmlResponse).find('cena').each(function () {
				//idCena
				$idCena = $(this).find('id').map(function () { 
							return $(this).text();
						}).get(0);
				//thumbnail
				$imagemCena = $(this).find('thumbnail').map(function () { 
						return $(this).text();
					}).get(0);

				//introducao
				$urlIntroducaoCena = $(this).find('urlIntroducao').map(function () { 
						return $(this).text();
					}).get(0);
console.log("preencheCenaSeleccionada: " + $urlIntroducaoCena);
				$mimeIntroducaoCena = $(this).find('mimeTypeIntroducao').map(function () { 
						return $(this).text();
					}).get(0);
				//nome
				$nomeCena = $(this).find('nome').map(function () { 
						return $(this).text();
					}).get(0);
				//descrição
				$descricaoCena = $(this).find('descricao').map(function () { 
						return $(this).text();
					}).get(0);
				//nrRepeticaoCena
				$nrVezesCena = $(this).find('nrVezesCena').map(function () { 
						return $(this).text();
					}).get(0);
				//nrRepeticaoCena
				$pontuacaoCena = $(this).find('pontuacao').map(function () { 
						return $(this).text();
					}).get(0);
				var $pontuacao = "";
				if($pontuacaoCena == 1) 
					$pontuacao = "Sim";
				else 
					$pontuacao = "Não";

				//tags - cria um array com os nomes para identificar os thumbnails
				$idEtiquetasCena = [];
				$etiquetasCena = [];
				$(this).find('etiqueta').each(function(){
					$idEtiquetasCena.push($(this).find('id').map(function () { 
						return $(this).text();
					}).get(0));
					$etiquetasCena.push($(this).find('nomeEtiqueta').text());
				});
				//versão
				$versaoCena = $(this).find('versao').map(function () { 
						return $(this).text();
					}).get(0);

				//tipo Actividade
				//var $tipoActividade = '';
				if($(this).find('tipoActividade').text() == "Questionario")
					$tipoActividade = 'Questionário';
				else 
					$tipoActividade = $(this).find('tipoActividade').text();

				if($tipoActividade == 'Gesto'){
					$(this).find('gesto').each(function(){
						$idTipoActividadeCena.push($(this).find('id').map(function () { 
							return $(this).text();
						}).get(0));
						$nrVezesGesto.push($(this).find('nrRepeticaoGestos').text());
					});
				} else {
					$(this).find('questionario').each(function(){
						$idTipoActividadeCena.push($(this).find('id').map(function () { 
							return $(this).text();
						}).get(0));
					});
				}

				//Reforço positivo
				$urlReforcoPositivo = $(this).find('urlReforcoPositivo').map(function () { 
							return $(this).text();
						}).get(0);
				$urlReforcoPositivoThumb = $(this).find('urlReforcoPositivoThumb').map(function () { 
							return $(this).text();
						}).get(0);
				$mimeReforcoPositivo = $(this).find('mimeTypeReforcoPositivo').map(function () { 
						return $(this).text();
					}).get(0);

				//Reforço negativo
				$urlReforcoNegativo = $(this).find('urlReforcoNegativo').map(function () { 
							return $(this).text();
						}).get(0);

				$urlReforcoNegativoThumb = $(this).find('urlReforcoNegativoThumb').map(function () { 
									return $(this).text();
								}).get(0);
				$mimeReforcoNegativo = $(this).find('mimeTypeReforcoNegativo').map(function () { 
						return $(this).text();
					}).get(0);

				//preenche o thumbnail
				//No caso de se ter seleccionado uma história antes, limpa o conteúdo
				$('#informacaoCena').empty();
	
				//adiciona o thumbnail
				$('#informacaoCena').append('<div id="thumbnailCenaSeleccionada"></div>');
				$('#thumbnailCenaSeleccionada').empty();
				$('#thumbnailCenaSeleccionada').append('<img id="thumbnailImagemCena"/>');
				$('#thumbnailImagemCena').attr('src', $imagemCena);
				
				$('#informacaoCena').append('<div id="cenaSeleccionadaDetalhes">');

				//adiciona o nome
				$('#cenaSeleccionadaDetalhes').append('<p id="nomeCenaSeleccionada"><strong><font size="4">Nome: </font></strong><font size="3">' + $nomeCena  + '</font></p>');

				//Adiciona a descrição
				if ($descricaoCena != '')
					$('#cenaSeleccionadaDetalhes').append('<p id="descricaoCenaSeleccionada"><strong><font size="4">Descrição: </font></strong><font size="3">' + $descricaoCena  + '</font></p>');
				else
					$('#cenaSeleccionadaDetalhes').append('<p id="descricaoCenaSeleccionada"><strong><font size="4">Descrição: </font></strong><font size="3">Esta cena não tem uma descrição associada.</font><div></p>');

				//adiciona as etiquetas
				var $etiquetasStringCena = '';
				if ($etiquetasCena.length != 0){
					for ( var i = 0; i < $etiquetasCena.length-1; i++ ) {
					    $etiquetasStringCena += $etiquetasCena[i] + ", ";
					}
					$etiquetasStringCena += $etiquetasCena[$etiquetasCena.length-1];
					$('#cenaSeleccionadaDetalhes').append('<p id="tagsCenaSeleccionada"><strong><font size="4">Etiquetas: </font></strong><font size="3">' + $etiquetasStringCena  + '</font></p>');
				}
				else
					$('#cenaSeleccionadaDetalhes').append('<p id="tagsCenaSeleccionada"><strong><font size="4">Etiquetas: </font></strong><font size="3">Esta cena não tem uma etiquetas associadas.</font><div></p>');

				//adiciona o numero de vezes que a cena vai ser repetidas
				$('#cenaSeleccionadaDetalhes').append('<p id="nrVezesCenaSeleccionada"><strong><font size="4">Número de Repetições da Cena: </font></strong><font size="3">' + $nrVezesCena  + '</font></p>');

				//adiciona se a cena tem pontuação ou não
				$('#cenaSeleccionadaDetalhes').append('<p id="pontuacaoCenaSeleccionada"><strong><font size="4">Pontuação: </font></strong><font size="3">' + $pontuacao  + '</font></p>');

				//Tipo de Actividade
				$('#cenaSeleccionadaDetalhes').append('<p id="tipoActividadeSeleccionada"><strong><font size="4">Tipo de Actividade: </font></strong><font size="3">' + $tipoActividade  + '</font></p>');
				$('#cenaSeleccionadaDetalhes').append('<p id="componentesActividadeSeleccionada"><strong><font size="4">Componentes da Actividade: </font></p>');
console.log($xmlResponse);
				switch($tipoActividade){
					case 'Gesto': 
var $nrActividade = 1;
						$($xmlResponse).find('cena').find('gesto').each(function() {
console.log('aqui');
							var $nomeActividade = $(this).find('nomeGesto').map(function () { 
										return $(this).text();
									}).get(0);

							$('#cenaSeleccionadaDetalhes').append('<p id="actividade">&#x25B8; ' + $nomeActividade + '</p>');
//							$('#cenaSeleccionadaDetalhes').append('<input type="button" class="seta" id="seta' + $nrActividade + '" value="&#x25B8;"/>' + $nomeActividade + '<br>'); 
							
							$('#cenaSeleccionadaDetalhes').append('<div class="detalhes" id="detalhes' + $nrActividade + '">'); 
							var $nrRepeticoesGestos = $(this).find('nrRepeticaoGestos').map(function () { 
										return $(this).text();
									}).get(0);
							var $repeticoesText = '';
							if($nrRepeticoesGestos == 1)
								$repeticoesText = '1 repetição';
							else
								$repeticoesText = $nrRepeticoesGestos + ' repetições';
							$('#detalhes' + $nrActividade).append($repeticoesText + '<br>'); 

							$('#detalhes' + $nrActividade).append('</div>'); 

/*							$('#seta' + $nrActividade).bind('click', function(){
console.log('click');
								var val = $(this).val();
console.log($(this));
								if(val == "\u25B8"){
console.log('click1');
									$(this).prop('value', "\u25BE");
									$('#cenaSeleccionadaDetalhes').append('<div id="detalhes"> Repetições: ' + $nrRepeticoesGestos + '</div>'); 
									//$('#detalhes' + $nrActividade).show();
									
								} else {
console.log('click2');
									$(this).prop('value', "\u25B8");
									$('#cenaSeleccionadaDetalhes').empty();
									//$('#detalhes' + $nrActividade).hide();
									
								}
							});
*/
							$nrActividade++;
						});
					break;
					case 'Questionário': 
						var $nrActividade = 1;
						$($xmlResponse).find('cena').find('questionario').each(function() {
							var $nomeActividade = $(this).find('nomeQuestionario').map(function () { 
										return $(this).text();
									}).get(0);
							$('#cenaSeleccionadaDetalhes').append('<p id="actividade">&#x25B8; ' + $nomeActividade + '</p>');
//							$('#cenaSeleccionadaDetalhes').append('<input type="button" class="seta" id="seta' + $nrActividade + '" value="&#x25B8;"/>' + $nomeActividade + '<br>'); 
							
							$('#cenaSeleccionadaDetalhes').append('<div class="detalhes" id="detalhes' + $nrActividade + '">'); 
							$($xmlResponse).find('cena').find('questionario').find('pergunta').each(function() {
								var $pergunta = $(this).find('questao').map(function () { 
										return $(this).text();
									}).get(0);
									$('#detalhes' + $nrActividade).append($pergunta + '<br>'); 
							});
							$('#detalhes' + $nrActividade).append('</div>'); 
							$nrActividade++;
							//$('#detalhes' + $nrActividade).append($repeticoesText + '<br>'); 

							//$('#detalhes' + $nrActividade).append('</div>'); 
/*							$('#cenaSeleccionadaDetalhes').append('<input type="button" id="seta3" value="&#x25B8;"/>' + $nomeActividade); 
							$('#seta3').click(function(){
								var val = $('#seta3').val();
								if(val == "\u25B8"){
									$('#seta3').prop('value', "\u25BE");
									$('#detalhes').show();
								}
								else {
									$('#seta3').prop('value', "\u25B8");
									$('#detalhes').hide();
								}
							});
*/
/*							$('#cenaSeleccionadaDetalhes').append('<div id="detalhes" hidden>'); 
							$($xmlResponse).find('cena').find('questionario').find('pergunta').each(function() {
								var $pergunta = $(this).find('questao').map(function () { 
										return $(this).text();
									}).get(0);
							$('#detalhes').append($pergunta + '<br>'); 
							});
							$('#detalhes').append('</div>'); 
*/
						});
					break;
				}
				/* botão detalhes da actividade */
				$("#detalhesActividadeCenaSeleccionadaBibliotecaCenas").bind('click', function(){
					$.blockUI({ 
						message: $('#dialogDetalhesActividadeBibliotecaCenas'), 
						css: { 
							border: '3px solid #aed0ea', 
							padding: '5px', 
							backgroundColor: '#CCE0FF', 
							'-webkit-border-radius': '10px', 
							'-moz-border-radius': '10px', 
							color: '#000', 
							position: 'absolute',
							top: '20%'
						}
					});

					$('#okDialogDetalhesActividadeBibliotecaCenas').click(function() {
						$('#okDialogDetalhesActividadeBibliotecaCenas').unbind();
				   		 $.unblockUI();  
					});
				});
				//Reforço positivo
				$('#cenaSeleccionadaDetalhes').append('<p id="reforcoPositivoSeleccionado" style="margin-bottom: 8px;"><strong><font size="4">Reforço Positivo:  </font></strong></p><img src="' + $urlReforcoPositivoThumb + '" style="width:50px; height:50px; margin-left:30%;"/>');

				//Reforço negativo
				if($urlReforcoNegativo != ''){
					$('#cenaSeleccionadaDetalhes').append('<p id="reforcoNegativoSeleccionado" style="margin-bottom: 8px;"><strong><font size="4">Reforço Negativo:  </font></strong></p><img src="' + $urlReforcoNegativoThumb + '" style="width:50px; height:50px; margin-left:30%;"/>');
				}

				$('#informacaoCena').append('</div>');
				$('#alterarBibliotecaCenasButton').attr("disabled", false);
			});
	}
}

/*********************************************************
 Funçao que adiciona uma nova cena à lista de cenas
 seleccionadas na tab de "Escolher Cena"
**********************************************************/
function preencheAdicionaNovaCenaBibliotecaCenas($xmlResponse){
	opcaoCenas = "";
	opcaoActividade = "";
	opcaoGesto = "";
	opcaoQuestionario = "";
	if($idCenasHistoria.length == 1){
		$('#listaCenasHistoriaSeleccionadas').empty();
	}
		$($xmlResponse).find('cena').each(function () {
			//idCena
			$idCena = $(this).find('id').map(function () { 
							return $(this).text();
						}).get(0);

			//thumbnail
			$imagemCena = $(this).find('thumbnail').map(function () { 
						return $(this).text();
					}).get(0);
			//nome
			$nomeCena = $(this).find('nome').map(function () { 
						return $(this).text();
					}).get(0);
			$('#listaCenasHistoriaSeleccionadas').append('<div class="frameCenasHistoriaSeleccionada"><img class="thumbnailCenasHistoriaSeleccionada" id="cena' + $idCena + 
					'" src="' + $imagemCena + '"/>' + 
					'<p class="nomeCenasBibliotecaSeleccionada">' + $nomeCena + '</p></div>');

			$(".frameCenasHistoriaSeleccionada").css('cursor', 'pointer');

			$('#cena' + $idCena).bind('mouseover', function () {
				$(this).css('border-color', '#FF0000');
			});

			$('#cena' + $idCena).bind('mouseout', function () {
				if($idCena != $idCenaSeleccionada)
					$(this).css('border-color', '#0191d8');
			});

			$('#cena' + $idCena).bind('dblclick', function () {
				$idCenaAux = $(this).attr('id').split('cena')[1];
				if($idCenaSeleccionada !=  $idCenaAux)
					$('#cena' + $idCenaSeleccionada).css('border', 'solid #0191d8');
					$idCenaSeleccionada = $idCenaAux;
					$('#cena' + $idCenaSeleccionada).css('border', 'dashed #FF0000');
					getCenaById($idCenaSeleccionada, "seleccionarCenaDetalhes");
			});
			
		});
}

/******************************************************
 Funçao que preenche a lista de gestos na tab de
 "Escolher Gesto"
*******************************************************/
function preencheListaGestos($xmlResponse){
	if($($xmlResponse).find('gesto')){
		$($xmlResponse).find('gesto').each(function(){
			$idGesto = $(this).find('id').map(function () { 
					return $(this).text();
				}).get(0);
			$('#listaGestosExistentes').append('<option value="' + $idGesto + '">' + $(this).find('nomeGesto').text() + '</option>');
			$('#listaGestosExistentesAux').append('<option value="' + $idGesto + '">' + $(this).find('nomeGesto').text() + '</option>');
		});
	}else{
		alert("Não foram encontrados gestos.");
	}
}

/*************************************************
 Função que preenche os gestos existentes na cena
 quando se está a alterar a cena
**************************************************/
function preencheGestosExistentesNaCena(){
console.log("preencheGestosExistentesNaCena");
console.log("idTipoActividadeCena: " + $idTipoActividadeCena);
	$("#gestosSorteable").empty();
	for(var i = 0; i < $idTipoActividadeCena.length; i++){
		var $idGesto = $idTipoActividadeCena[i];
		var $nomeGesto = getGestoById($idGesto, 'nomeGesto');
		var $nrGesto = $nrVezesGesto[i];

		$("#gestosSorteable").append('<li class="ui-state-default liGestos" id="' + $countGestos + 'gestoEscolhido' + $idGesto + '">' + '<div id="liGestostexto">' + $nomeGesto + '</div><div id="liGestosButton"><img id="' + $countGestos + 'gestoEscolhidoButton' + $idGesto + '" src="../imagens/remover.png" width="35px" align="right"/><img class="detalhesGesto" name="' + $nrGesto + '" id="' + $countGestos + 'detalhesGestoEscolhidoButton' + $idGesto + '" src="../imagens/ver.png" width="35px" align="right" style="padding-right:2px"></div></li>');

		$("#gestosSorteable").click();

		$('#' + $countGestos + 'gestoEscolhidoButton' + $idGesto).bind('click', function() {
			var $count = $(this).attr('id').split('gestoEscolhidoButton')[0];
			var $idGestoRemover = $(this).attr('id').split('gestoEscolhidoButton')[1];
			var $gestoRemover = $count + 'gestoEscolhido' + $idGestoRemover;
			$('li#'+ $gestoRemover).remove(); 
			$("#gestosSorteable").click();
			if($idTipoActividadeCena.length == 0){
				$("#gestosSorteable").append('<p> Não existem gestos seleccionados nesta cena </p>');		
			}
		});

		$('#' + $countGestos + 'detalhesGestoEscolhidoButton' + $idGesto).bind('click', function() {
			var $nrVezes = $(this).attr('name');
			var $count = $(this).attr('id').split('detalhesGestoEscolhidoButton')[0];
			var $idGesto = $(this).attr('id').split('detalhesGestoEscolhidoButton')[1];

			$('#inputboxesNrRepeticoes').empty();
			var $gestoSeleccionadoGestosSorteable = $("#gestosSorteable li[id='" + $count + "gestoEscolhido" + $idGesto + "']").text();
			$('#inputboxesNrRepeticoes').append('<div id="titleDialogNrRepeticoes"><h3 id="titleNrRepeticoes">' + $gestoSeleccionadoGestosSorteable + 'aaa</h3></div>');
			$('#inputboxesNrRepeticoes').append('<div id="numeroRepeticoesGesto"><br><p id="mensagem">Número de repetições: ' +
							'&nbsp;&nbsp;<input type="number" id="nrRepeticoesGestoDetalhes" min="1" value="' + $nrVezes +'" readonly></p><br></div>'); 
							
			$.blockUI({ 
				message: $('#dialogNrRepeticoes'), 
				css: { 
					border: '3px solid #aed0ea', 
					padding: '5px', 
					backgroundColor: '#CCE0FF', 
					'-webkit-border-radius': '10px', 
					'-moz-border-radius': '10px', 
					color: '#000', 
					position: 'absolute',
					top: '20%'
				}
			});
	
			$('#okDialogNrRepeticoes').click(function() {	
				$('#okDialogNrRepeticoes').unbind();
		   		 $.unblockUI();  
			});
		});

		$countGestos++;
	}
}

/*******************************************************
 Funçao que preenche a lista de questionarios na tab de
 "Escolher Questionario"
********************************************************/
function preencheListaQuestionarios($xmlResponse){
	if($($xmlResponse).find('questionario')){
		$($xmlResponse).find('questionario').each(function(){
			$idQuestionario = $(this).find('id').map(function () { 
					return $(this).text();
				}).get(0);
			$('#listaQuestionariosExistentes').append('<option value="' + $idQuestionario + '">' + $(this).find('nomeQuestionario').text() + '</option>');
			$('#listaQuestionariosExistentesAux').append('<option value="' + $idQuestionario + '">' + $(this).find('nomeQuestionario').text() + '</option>');
		});
	}else{
		alert("Não foram encontrados questionários.");
	}
}

/*******************************************************
 Função que preenche os questionários existentes na cena
 se estivermos a alterar uma cena
********************************************************/
function preencheQuestionariosExistentesNaCena(){
console.log("preencheQuestionariosExistentesNaCena: " + $idTipoActividadeCena);
	$("#questionariosSorteable").empty();
	for(var i = 0; i < $idTipoActividadeCena.length; i++){
		var $idQuestionario = $idTipoActividadeCena[i];
		var $nomeQuestionario = getQuestionarioById($idQuestionario, 'nomeQuestionario');
		$("#questionariosSorteable").append('<li class="ui-state-default liQuestionarios" id="' + $countQuestionarios + 'questionarioEscolhido' + $idQuestionario + '">' + '<div id="liQuestionariostexto">' + $nomeQuestionario + '</div><div id="liQuestionariosButton"><img id="' + $countQuestionarios + 'questionarioEscolhidoButton' + $idQuestionario + '" src="../imagens/remover.png" width="35px" align="right"/><img id="' + $countQuestionarios + 'detalhesQuestionarioEscolhidoButton' + $idQuestionario + '" src="../imagens/ver.png" width="35px" align="right" style="padding-right:2px"></div></li>');
			$("#questionariosSorteable").click();
 
			$('#' + $countQuestionarios + 'questionarioEscolhidoButton' + $idQuestionario).bind('click', function() {
				var $count = $(this).attr('id').split('questionarioEscolhidoButton')[0];
				var $idQuestionarioRemover = $(this).attr('id').split('questionarioEscolhidoButton')[1];
				var $questionarioRemover = $count + 'questionarioEscolhido' + $idQuestionarioRemover;
				$('li#'+ $questionarioRemover).remove(); 
				$("#questionariosSorteable").click();
				if($idTipoActividadeCena.length == 0){
					$("#questionariosSorteable").append('<p> Não existem questionários seleccionados nesta cena </p>');		
				}
			});

			$('#' + $countQuestionarios + 'detalhesQuestionarioEscolhidoButton' + $idQuestionario).bind('click', function() {
			console.log("cliquei");
				var $count = $(this).attr('id').split('detalhesQuestionarioEscolhidoButton')[0];
				var $idQuestionario = $(this).attr('id').split('detalhesQuestionarioEscolhidoButton')[1];

				getQuestionarioById($idQuestionario, "detalhesQuestionario");			

				$.blockUI({ 
					message: $('#dialogPerguntasQuestionario'), 
					css: { 
						border: '3px solid #aed0ea', 
						padding: '5px', 
						backgroundColor: '#CCE0FF', 
						'-webkit-border-radius': '10px', 
						'-moz-border-radius': '10px', 
						color: '#000', 
						position: 'absolute',
						top: '20%'
					}
				});
		
				$('#okDialogPerguntasQuestionario').click(function() {	
					$('#okDialogPerguntasQuestionario').unbind();
			   		 $.unblockUI();  
				});
			});

			$countQuestionarios++;
	}
}

/*******************************************************
 Funçao que preenche a lista de perguntas na tab de
 "Perguntas do Questionário"
********************************************************/
function preencheListaPerguntas($xmlResponse){
console.log("preencheListaPerguntas");
	if($($xmlResponse).find('pergunta')){
		$($xmlResponse).find('pergunta').each(function(){
			$idPergunta = $(this).find('id').map(function () { 
					return $(this).text();
				}).get(0);
			$('#listaPerguntasExistentesQuestionario').append('<option value="' + $idPergunta + '">' + $(this).find('questao').text() + '</option>');
			$('#listaPerguntasExistentesQuestionarioAux').append('<option value="' + $idPergunta + '">' + $(this).find('questao').text() + '</option>');
		});
	}else{
		//alert("Não foram encontradas perguntas.");
		$('#listaPerguntasExistentesQuestionario').append('<option value="-1" disabled>' + "(sem perguntas.)" + '</option>');
		$('#listaPerguntasExistentesQuestionarioAux').append('<option value="-1" disabled>' + "(sem perguntas.)" + '</option>');
	}
}

/***************************************************************************
 Funcao que preenche os detalhes dos questionarios na tab 
 "Escolher Questionario"
****************************************************************************/
function preencheDetalhesPerguntasQuestionariosDialog($xmlResponse){
console.log("preencheDetalhesPerguntasQuestionariosDialog");
	if($($xmlResponse).find('questionario')){
		$('#inputboxesPerguntas').empty();
		$('#inputboxesPerguntas').append('<div id="titleDialogPerguntasQuestionario"><h3 id="titlePerguntasQuestionario">' + $($xmlResponse).find('questionario').find('nomeQuestionario').text() + '</h3></div>');
		$('#inputboxesPerguntas').append('<div id="perguntasQuestionario"><br>');
		$($xmlResponse).find('questionario').find('pergunta').each(function(){
			//$('#inputboxesPerguntas').append('<p id="mensagem"><input type=text id="perguntasQuestionarioDetalhes" value="' + $(this).find('questao').text() +'" readonly></p>'); 	
			$('#perguntasQuestionario').append('<p id="mensagem"><input type=text id="perguntasQuestionarioDetalhes" value="' + $(this).find('questao').text() +'" readonly>');
		});
		$('#perguntasQuestionario').append('<br>');
		$('#inputboxesPerguntas').append('</div>');
	}else{
		alert("Não foram encontradas perguntas.");
	}
}



/************************************************************************************************************************************
	D I A L O G S
*************************************************************************************************************************************
/*********************************************************
 Funçao que preenche os detalhes da cena seleccionada
 nas tabs de "Biblioteca de Histórias" e "Escolher Cena"
**********************************************************/
function preencheDetalhesCenaDialog($xmlResponse){
console.log("preencheDetalhesCenaDialog");
	//limpa o div dos detalhes da cena seleccionada
	$('#inputboxesDetalhesCenasHistoria').empty();
	$($xmlResponse).find('cena').each(function () {
		var $nomeCena = $(this).find('nome').map(function () { 
							return $(this).text();
						}).get(0);
		$('#inputboxesDetalhesCenasHistoria').append('<div id="titleDialogDetalhesCenasHistoria"><h3 id="titleNomeCenaDetalhes">' + $nomeCena + '</h3></div>');
		$('#inputboxesDetalhesCenasHistoria').append('<div id="detalhesDialogCenasHistoria">');
		var $tipoActividade = $(this).find('tipoActividade').map(function () { 
							return $(this).text();
						}).get(0);
		if($tipoActividade == "Questionario") 
			$tipoActividade = "Questionário";
		$('#detalhesDialogCenasHistoria').append('<br>');
		$('#detalhesDialogCenasHistoria').append('<p id="mensagem">Tipo de Actividade: <input type=text class="detalhesCenaHistoria" value="' + $tipoActividade +'" readonly></p>');

		$actividade = '';
		switch($tipoActividade){
			case 'Gesto': 
				var $nrActividade = 1;
				$('#detalhesDialogCenasHistoria').append('<p id="mensagem">Componentes:</p>'); 
				$($xmlResponse).find('cena').find('gesto').each(function() {
					var $nomeActividade = $(this).find('nomeGesto').map(function () { 
								return $(this).text();
							}).get(0);
					//$('#detalhesDialogCenasHistoria').append('<input type="button" id="seta2" value="&#x25B8;"/>' + $nomeActividade); 
$('#detalhesDialogCenasHistoria').append('<p id="actividade">&#x25B8; ' + $nomeActividade + '</p>');
//							$('#cenaSeleccionadaDetalhes').append('<input type="button" class="seta" id="seta' + $nrActividade + '" value="&#x25B8;"/>' + $nomeActividade + '<br>'); 
							
							$('#detalhesDialogCenasHistoria').append('<div class="detalhes" id="detalhes' + $nrActividade + '">'); 
							var $nrRepeticoesGestos = $(this).find('nrRepeticaoGestos').map(function () { 
										return $(this).text();
									}).get(0);
							var $repeticoesText = '';
							if($nrRepeticoesGestos == 1)
								$repeticoesText = '1 repetição';
							else
								$repeticoesText = $nrRepeticoesGestos + ' repetições';
							$('#detalhes' + $nrActividade).append($repeticoesText + '<br>'); 

							$('#detalhes' + $nrActividade).append('</div>'); 
$nrActividade++;
					/*$('#seta2').click(function(){
						var val = $('#seta2').val();
						if(val == "\u25B8"){
							$('#seta2').prop('value', "\u25BE");
							$('#detalhes').show();
						}
						else {
							$('#seta2').prop('value', "\u25B8");
							$('#detalhes').hide();
						}
					});*/
					/*var $nrRepeticoesGestos = $(this).find('nrRepeticaoGestos').map(function () { 
								return $(this).text();
							}).get(0);

					$('#detalhesDialogCenasHistoria').append('<div id="detalhes" hidden> Repetições: ' + $nrRepeticoesGestos + '</div>'); 
*/
				});
			break;
			case 'Questionário': 
				var $nrActividade = 1;
				$('#detalhesDialogCenasHistoria').append('<p id="mensagem">Componentes:</p>'); 
				$($xmlResponse).find('cena').find('questionario').each(function() {
					var $nomeActividade = $(this).find('nomeQuestionario').map(function () { 
								return $(this).text();
							}).get(0);
					$('#detalhesDialogCenasHistoria').append('<p id="actividade">&#x25B8; ' + $nomeActividade + '</p>');

$('#detalhesDialogCenasHistoria').append('<div class="detalhes" id="detalhes' + $nrActividade + '">'); 
							$($xmlResponse).find('cena').find('questionario').find('pergunta').each(function() {
								var $pergunta = $(this).find('questao').map(function () { 
										return $(this).text();
									}).get(0);
								$('#detalhes' + $nrActividade).append($pergunta + '<br>'); 
					});

							$('#detalhes' + $nrActividade).append('</div>'); 
$nrActividade++;
/*					$('#detalhesDialogCenasHistoria').append('<input type="button" id="seta2" value="&#x25B8;"/>' + $nomeActividade); 
					$('#seta2').click(function(){
						var val = $('#seta2').val();
						if(val == "\u25B8"){
							$('#seta2').prop('value', "\u25BE");
							$('#detalhes').show();
						}
						else {
							$('#seta2').prop('value', "\u25B8");
							$('#detalhes').hide();
						}
					});
					$('#detalhesDialogCenasHistoria').append('<div id="detalhes" hidden>'); 
					$($xmlResponse).find('cena').find('questionario').find('pergunta').each(function() {
						var $pergunta = $(this).find('questao').map(function () { 
								return $(this).text();
							}).get(0);
					$('#detalhes').append($pergunta + '<br>'); 
					});
					$('#detalhes').append('</div>'); */
				});
			break;
		}
		
		var $nrVezesCenas = $(this).find('nrVezesCena').map(function () { 
							return $(this).text();
						}).get(0);
		$('#detalhesDialogCenasHistoria').append('<p id="mensagem">Número de repetições da cena: <input type=text class="detalhesCenaHistoria" value="' + $nrVezesCenas +'" readonly></p>'); 

		var $pontuacao = $(this).find('pontuacao').map(function () { 
							return $(this).text();
						}).get(0);
		var $temPontuacao = 'Não';
		if($pontuacao == 1) 
			$temPontuacao = 'Sim';
		$('#detalhesDialogCenasHistoria').append('<p id="mensagem">Pontuação: <input type=text class="detalhesCenaHistoria" value="' + $temPontuacao +'" readonly></p>'); 

		var $reforcoPositivo = $(this).find('urlReforcoPositivoThumb').map(function () { 
							return $(this).text();
						}).get(0);
		
		var $reforcoNegativo = $(this).find('urlReforcoNegativoThumb').map(function () { 
							return $(this).text();
						}).get(0);

		var $urlreforcoNegativo = $(this).find('urlReforcoNegativo').map(function () { 
							return $(this).text();
						}).get(0);

console.log('$reforcoNegativo$reforcoNegativo$reforcoNegativo$reforcoNegativo$reforcoNegativo$reforcoNegativo$reforcoNegativo: ' + $reforcoNegativo);
		$('#detalhesDialogCenasHistoria').append('<div id="reforcosDetalhes">');
		$('#reforcosDetalhes').append('<div id="reforcoPositivo"><p id="mensagem">Reforço Positivo: </p><img id="reforcoPositivoThumbnail" src="' + $reforcoPositivo + '"/></div>');
		if($urlreforcoNegativo != '')
			$('#reforcosDetalhes').append('<div id="reforcoNegativo"><p id="mensagem">Reforço Negativo: </p><img id="reforcoNegativoThumbnail" src="' + $reforcoNegativo + '"/></div>');
		$('#detalhesDialogCenasHistoria').append('<br><br>');
		$('#detalhesDialogCenasHistoria').append('</div>');
		$('#detalhesDialogCenasHistoria').append('</div>');

	});
		
	//dialog para os detalhes da cena
	$.blockUI({ 
		message: $('#dialogDetalhesCenasHistoria'), 
		css: { 
			border: '3px solid #aed0ea', 
			padding: '5px', 
			backgroundColor: '#CCE0FF', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			color: '#000', 
			position: 'absolute',
			top: '20%'
		}
	});

	$('#okDialogDetalhesCenasHistoria').click(function() {
		$('#cenaHistoria' + $idCenaHistoriaSeleccionada).css('border', 'solid #0191d8');
		$idCenaHistoriaSeleccionada = 0;
		$idCenaSeleccionada = 0;
		$('#okDialogDetalhesCenasHistoria').unbind();
   		 $.unblockUI();  
	});
}


/*function preencheListaPerguntasQuestionarios($xmlResponse){
console.log("preencheListaPerguntasQuestionarios");
$('#listaPerguntas').empty();
	if($($xmlResponse).find('questionario')){
		$($xmlResponse).find('questionario').find('pergunta').each(function(){
			$('#listaPerguntas').append('<p style="margin-left:10px"> ' + $(this).find('questao').text() + '</p>');
		});
	}else{
		alert("Não foram encontrados questionarios.");
	}
}*/
/******************************************************
 Funçao que preenche a lista de gestos seleccionados 
 na tab de "Escolher Gesto" quando se altera uma cena
*******************************************************/
/*function preencheGestoSeleccionado($xmlResponse){
console.log("preencheGestoSeleccionado");
	$($xmlResponse).find('gesto').each(function () {
		$idGestoSessao = $(this).find('id').text();
		$nomeGestoSessao = $(this).find('nomeGesto').text();
	});
}*/
