//nome dos divs para criar as tabs
var divs = [	
		/*0*/"#dadosSessaoTerapeuta", 
		/*1*/"#dadosSessaoCriancas", 
		/*2*/"#dadosSessaoTipoSessao", 
		/*3*/"#dadosSessaoDataHora", 
		/*4*/"#dadosSessaoIntervaloDatas", 
		/*5*/"#dadosSessaoTipoExercicio", 
		/*6*/"#dadosSessaoExercicioGateau", 
		/*7*/"#dadosSessaoHistoria", 
		/*8*/"#dadosSessaoNomeHistoria", 
		/*9*/"#dadosSessaoDescricaoHistoria", 
		/*10*/"#dadosSessaoThumbnailHistoria", 
		/*11*/"#dadosSessaoEtiquetasHistoria", 
		/*12*/"#dadosSessaoBibliotecaHistorias", 
		/*13*/"#dadosSessaoCena", 
		/*14*/"#dadosSessaoNomeCena", 
		/*15*/"#dadosSessaoDescricaoCena", 
		/*16*/"#dadosSessaoEtiquetasCena", 
		/*17*/"#dadosSessaoIntroducaoCena", 
		/*18*/"#dadosSessaoBibliotecaCenas", 
		/*19*/"#dadosSessaoActividade", 
		/*20*/"#dadosSessaoGesto", 
		/*21*/"#dadosSessaoNomeGesto", 
		/*22*/"#dadosSessaoNrVezesGesto", 
		/*23*/"#dadosSessaoQuestionario", 
		/*24*/"#dadosSessaoNomeQuestionario", 
		/*25*/"#dadosSessaoPerguntasQuestionario", 
		/*26*/"#dadosSessaoReforcoPositivo", 
		/*27*/"#dadosSessaoReforcoNegativo", 
		/*28*/"#dadosSessaoRepeticaoCena", 
		/*29*/"#dadosSessaoPontuacao"
	];

//labels para as tabs
var labels = [
		/*0*/"Escolher Terapeuta", 
		/*1*/"Escolher Crianças", 
		/*2*/"Tipo de Sessão", 
		/*3*/"Escolher Data/Hora", 
		/*4*/"Escolher Data", 
		/*5*/"Tipo de Exercício", 
		/*6*/"Dados Gateau", 
		/*7*/"Escolher História", 
		/*8*/"Nome da História", 
		/*9*/"Descrição da História", 
		/*10*/"Imagem da História", 
		/*11*/"Etiquetas da História", 
		/*12*/"Biblioteca de Histórias", 
		/*13*/"Escolher Cena", 
		/*14*/"Nome da Cena", 
		/*15*/"Descrição da Cena", 
		/*16*/"Etiquetas da Cena", 
		/*17*/"Introdução à actividade", 
		/*18*/"Biblioteca de Cenas", 
		/*19*/"Escolher Actividade", 
		/*20*/"Escolher Gesto",
		/*21*/"Nome do Gesto",
		/*22*/"Número de gestos", 
		/*23*/"Escolher Questionário", 
		/*24*/"Nome Questionário",
		/*25*/"Perguntas do Questionário",  
		/*26*/"Reforço Positivo", 
		/*27*/"Reforço Negativo",
		/*28*/"Repetição da Cena",
		/*29*/"Pontuação"
	];

/*0 - terapeuta que vai realizar a sessão*/
var $dadosSessaoTerapeuta = '<div id="dadosSessaoTerapeuta">' + 
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Cancelar" id="cancelarTerapeutaButton" />' +	
						'<input type="button" value="Seguinte" id="seguinteTerapeutaButton" disabled />' +	
					'</div>' +
					'<div class="contentTabs">' + 
						'<h3>Nome do terapeuta<font color="red">*</font></h3>'+
						'<select id="listaTerapeutasSessao">' +
							'<option disabled value="0" selected>Selecione o/a terapeuta</option>' +
						'</select>' +
						'<br><br>' +
					'</div>' +
				'</div>';
/*1 - crianças que vão realizar a sessão*/
var $dadosSessaoCrianca = '<div id="dadosSessaoCriancas">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorCriancaButton" />' +
						'<input type="button" value="Seguinte" id="seguinteCriancaButton" disabled/>' + 
					'</div>' +
					'<div class="contentTabs">' + 
						'<table width="55%" align="center">' +
							'<tbody>' +
								'<tr>' +
									'<td align="center" style="width: 275px;">' +
										'<h3>Crianças existentes</h3>' +
											'<select id="listaCriancasExistentes" multiple="multiple">' +
											'</select>' +
										'<br>' +
										'<input type="button" id="seleccionarTudoListaCriancasExistentesButton" value="Seleccionar tudo"/>' + 
										'<input type="button" id="removerTudoListaCriancasExistentesButton" value="Remover Selecção"/>' +
									'</td>' +
									'<td align="center" valign="center" style="">' +
										'<input type="button" id="adicionarCriancaListaSessaoButton" value="Adicionar Criança &gt;&gt;">' + 
										'<br><br>' + 
										'<input type="button" id="removerCriancaListaSessaoButton" value="&lt;&lt; Retirar Criança">' + 
									'</td>' + 
									'<td align="center" style="width: 275px;">' +
										'<h3>Crianças na sessão<font color="red">*</font></h3>' +
											'<select id="listaCriancasSessao" multiple="multiple" size="10">' +
											'</select>' +
											'<br><br>' + 
												'<input type="button" id="seleccionarTudoListaCriancasSessaoButton" value="Seleccionar tudo">' + 
												'<input type="button" id="removerTudoListaCriancaSessaoButton" value="Remover Selecção">' + 
									'</td>' +
								'</tr>' +
							'</tbody>' +
						'</table>' + 
					'</div>' + 
				'</div>' + '<select id="listaCriancasExistentesAux" multiple="multiple" hidden> </select>';
/*2 - Tipo de Sessao*/
var $dadosSessaoTipoSessao = '<div id="dadosSessaoTipoSessao">' + 
				'<div class="anteriorSeguinteButtonsDiv">' +
					'<input type="button" value="Anterior" id="anteriorTipoSessaoButton" />' +
					'<input type="button" value="Seguinte" id="seguinteTipoSessaoButton" disabled/>' +
				'</div>' +
				'<div class="contentTabs">' +
					'<h3>Escolha o tipo de sessão que pretende <font color="red">*</font></h3>' + 
					'<div id="dadosSessaoTipoSessaoDiv">' +
						'<input type="button" id="sessaoPresencialButton" value="Sessão Presencial"/>' +
						'<input type="button" id="sessaoRemotaButton" value="Sessão Remota" disabled/>' +
					'</div>' +
					'<br><br>' + 
				'</div>' +
			'</div>';

/*3 - data e hora da realização da sessão presencial*/
var $dadosSessaoDataHora = '<div id="dadosSessaoDataHora">' + 
				'<div class="anteriorSeguinteButtonsDiv">' +
					'<input type="button" value="Anterior" id="anteriorDataHoraButton" />' +
					'<input type="button" value="Seguinte" id="seguinteDataHoraButton" disabled/>' +
				'</div>' +
				'<div class="contentTabs">' +
					'<div id="conteudoDataHora">' + 
						'<h3>Marcação da sessão de terapia<font color="red">*</font></h3>' +       	
						'<strong>Data</strong><font color="red">*</font> <input type="text" id="dataSessao"> &nbsp;' +
						'<strong>Hora</strong><font color="red">*</font> <input type="text" id="horaSessao"> </br> </br>' +	
					'</div>' +
				'</div>' +			
			'</div>';

/*4 - intervalo para sessões remotas */
var $dadosSessaoIntervaloDatas = '<div id="dadosSessaoIntervaloDatas">' + 
				'<div class="anteriorSeguinteButtonsDiv">' +
					'<input type="button" value="Anterior" id="anteriorIntervaloDatasButton" />' +
					'<input type="button" value="Seguinte" id="seguinteIntervaloDatasButton"/>' +
				'</div>' +
				'<div class="contentTabs">' +
					'<div id="conteudoIntervaloDatas">' + 
						'<h3>Introduza o intervalo de datas em que a sessão vai ser realizada (opcional)</h3>' +       	
						'<strong>Data Início:</strong> <input type="text" id="dataInicioSessao"> &nbsp;' +
						'<strong>Data Fim:</strong> <input type="text" id="dataFimSessao"> &nbsp;' +
					'</div>' +
				'</div>' +			
			'</div>';

/*5 - Tipo de Exercicio*/
var $dadosSessaoTipoExercicio = '<div id="dadosSessaoTipoExercicio">' + 
				'<div class="anteriorSeguinteButtonsDiv">' +
					'<input type="button" value="Anterior" id="anteriorTipoExercicioButton" />' +
					'<input type="button" value="Seguinte" id="seguinteTipoExercicioButton" disabled/>' +
				'</div>' +
				'<div class="contentTabs">' +
					'<h3>Escolha o tipo de exercício que pretende</h3>' + 
					'<div id="dadosSessaoTipoExercicioDiv">' +
						'<input type="button" id="exercicioHistoriaButton" value="História"/>' +
						'<input type="button" id="exercicioCoDrawButton" value="CoDraw"/>' +
						'<input type="button" id="exercicioGateauButton" value="Gateau" hidden/>' +
					'</div>' +
					'<br><br>' + 
					'<br><br><br><br>' + 
					'<input type="button" value="Criar Sessão" id="terminarTipoExercicioButton" hidden/>' +
				'</div>' +
			'</div>';

/*6 -Dados para o Gateau*/
var $dadosSessaoExercicioGateau = '<div id="dadosSessaoExercicioGateau">' + 
				'<div class="anteriorSeguinteButtonsDiv">' +
					'<input type="button" value="Anterior" id="anteriorExercicioGateauButton" />' +
					'<input type="button" value="Seguinte" id="seguinteExercicioGateauButton" disabled/>' +
				'</div>' +
				'<div class="contentTabs">' +
					'<h3>GATEAU</h3>' + 
					'<br><br>' + 
					'<br><br><br><br>' + 
					'<input type="button" value="Criar Sessão" id="terminarExercicioGateauButton"/>' +
				'</div>' +
			'</div>';

/*7 - opção para criar nova historia ou escolher historia*/
var $dadosSessaoHistoria = '<div id="dadosSessaoHistoria">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorHistoriaButton" />' +
						'<input type="button" value="Seguinte" id="seguinteHistoriaButton" disabled/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<h3>Deseja criar uma história nova ou escolher uma história existente na biblioteca?</h3>' + 
						'<div id="dadosSessaoHistoriaDiv">' +
							'<input type="button" id="novaHistoriaButton" value="Criar Nova História"/>' +
							'<input type="button" id="historiaBibliotecaButton" value="Escolher História da Biblioteca"/>' +
						'</div>' +
						'<br><br>' + 
					'</div>' +
				'</div>';
/*8 - nome da historia associada à sessão*/
var $dadosSessaoNomeHistoria = '<div id="dadosSessaoNomeHistoria">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorNomeHistoriaButton" />' +
						'<input type="button" value="Seguinte" id="seguinteNomeHistoriaButton" disabled/>' + 
					'</div>' +
					'<div class="contentTabs">' +
						  '<p><strong>Nome da História</strong><font color="red">*</font>' + '</br></br>' +
							'<input name="nome" cols="36" id="nomeHistoria" maxlength="255"/>' +
						'</p>' +
					'</div>' +
				'</div>';
/*9 - descrição da história associada à sessão - opcional*/
var $dadosSessaoDescricaoHistoria = '<div id="dadosSessaoDescricaoHistoria">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorDescricaoHistoriaButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteDescricaoHistoriaButton"/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<p><strong>Descrição da História </strong>(opcional)<br><br>' +
							'<textarea id="descricaoHistoria" name="descricaoHistoria" cols="40" rows="7" maxlength="255"></textarea>' +
						'</p>' +
					'</div>' + 
				'</div>';
/*10 - thumbnail associado à história*/
var $dadosSessaoThumbnailHistoria = '<div id="dadosSessaoThumbnailHistoria">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorThumbnailHistoriaButton" />' +
						'<input type="button" value="Seguinte" id="seguinteThumbnailHistoriaButton" disabled/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<p><strong>Imagem da História</strong><font color="red">*</font></p>' +
						'<img id="thumbnailHistoria" src="../imagens/noImage.gif" width="86" height="86"/>' + 
						'<form id="newThumbnail" method="post" enctype="multipart/form-data">' + 
							'<input type="file" name="path" id="novoThumbnailHistoria" style="display:none;" accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp" />' + 
						'</form>' + 
						'<div id="alterarThumbnailDiv"> ' + 
							'<p><button id="alterarThumbnailButton" type="button">Alterar</button></p>' + 
						'</div>' +
					'</div>' +  
				'</div>';
/*11 - etiquetas da historia*/
var $dadosSessaoEtiquetasHistoria = '<div id="dadosSessaoEtiquetasHistoria">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorEtiquetasHistoriaButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteEtiquetasHistoriaButton"/>' + 
					'</div>' +
					'<div class="contentTabs">' +
						'<table width="55%" align="center">' +
							'<tbody>' +
								'<tr>' +
									'<td align="center" style="width: 275px;">' +
										'<p>Etiquetas existentes</p>' +
											'<select id="listaEtiquetasHistoriasExistentes" multiple="multiple">' +
											'</select>' +
										'<br>' +
										'<input type="button" id="seleccionarTudolistaEtiquetasExistentesHistoriaButton" value="Seleccionar tudo"/>' + 
										'<input type="button" id="removerTudolistaEtiquetasExistentesHistoriaButton" value="Remover Selecção"/>' +
										'<br><br>' +
									'</td>' +
									'<td align="left" valign="top">' +
										'<button id="adicionarEtiquetasHistoriaButton" type="button" disabled>Adicionar</button>' +
										'<input type="button" id="adicionarEtiquetaListaHistoriaButton" value="Adicionar Etiqueta &gt;&gt;">' + 
										'<br><br>' + 
										'<input type="button" id="removerEtiquetaListaHistoriaButton" value="&lt;&lt; Retirar Etiqueta">' + 
									'</td>' + 
									'<td align="center" style="width: 275px;">' +
										'<p style="margin-top:0px">Etiquetas na História (opcional)</p>' +
											'<select id="listaEtiquetasHistoria" multiple="multiple">' +
											'</select>' +
											'<br><br>' +
												'<input type="button" id="seleccionarTudoListaEtiquetasHistoriaButton" value="Seleccionar tudo">' + 
												'<input type="button" id="removerTudoListaEtiquetasHistoriaButton" value="Remover Selecção">' + 
									'</td>' +
								'</tr>' +
							'</tbody>' +
						'</table>' + 
					'</div>' +
				'</div>' + '<select id="listaEtiquetasHistoriasExistentesAux" multiple="multiple" hidden> </select>';
/*12 - biblioteca de historias*/
var $dadosSessaoBibliotecaHistorias = '<div id="dadosSessaoBibliotecaHistorias">' + 
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorBibliotecaHistoriasButton" />' +
						'<input type="button" value="Seguinte" id="seguinteBibliotecaHistoriasButton" disabled/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<div id="bibliotecaHistoriasColuna">' + 
							'<div id="bibliotecaDivTitleButtons">' +
								'<div id="bibliotecaHistoriaTitle"><h3>Biblioteca de Histórias</h3></div>' +
							'</div>' +
							'<div id="bibliotecaHistoriasDiv">' +
								'<div id="listaHistoria"></div>' +
							'</div>' +
						'</div>' +
						'<div id="historiaSeleccionadaColuna">' + 
							'<div id="bibliotecaDivHistoriaSeleccionada">' +
								'<div id="historiaSeleccionadaDiv"><h3>História Seleccionada</h3></div>' +
							'</div>' +
							'<div id="informacaoHistoria">' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</div>' + 
					'<div id="dadosSessaoBibliotecaButtons">' +
						'<input type="button" value="Alterar" id="alterarBibliotecaHistoriasButton" disabled/>' +
						'<input type="button" value="Criar Sessão" id="usarBibliotecaHistoriasButton" disabled/>' +
					'</div>';
/*13 - escolher nova sessão ou biblioteca de cenas - mostra cenas na historia se existirem*/
var $dadosSessaoCena = '<div id="dadosSessaoCena">' +
				'<div class="anteriorSeguinteButtonsDiv">' +
					'<input type="button" value="Anterior" id="anteriorCenaButton" />' +
					'<input type="button" value="Seguinte" id="seguinteCenaButton" disabled/>' +
				'</div>' +
				'<div class="contentTabs">' +
					'<div id="escolherCenaColuna">' + 
						'<h3>Deseja criar uma cena nova ou escolher uma cena existente na biblioteca?</h3>' + 
						'<br>' + 
						'<div id="dadosSessaoCenaDiv">' +
							'<input type="button" id="novaCenaButton" value="Criar Nova Cena"/>' +
							'<input type="button" id="cenaBibliotecaButton" value="Escolher Cena da Biblioteca"/>' +
						'</div>' +
						'<br><br><br><br>' + 
						'<input type="button" value="Criar Sessão" id="terminarBibliotecaCenasButton" disabled/>' +
					'</div>' +
					'<div id="cenasHistoriaColuna">' + 
						'<div id="cenasHistoriaDivTitle">' +
								'<div id="cenaHistoriaTitleDiv"><h3 id="cenaHistoriaTitle">Cenas na História</h3>' +
									'<p id="cenasEscolhidasMensagem">(Arraste as cenas para as ordenar<br>Duplo clique para detalhes)</p>' +
								'</div>' +
							'</div>' +
							'<div id="cenasHistoriasDiv">' +
								'<div id="listaCenasHistoriaSeleccionadas"></div>' +
							'</div>' + 
					'</div>' +
				'</div>' +
			'</div>';
/*14 - nome da cena*/
var $dadosSessaoNomeCena = '<div id="dadosSessaoNomeCena">' +
				'<div class="anteriorSeguinteButtonsDiv">' +
					'<input type="button" value="Anterior" id="anteriorNomeCenaButton" />' +
					'<input type="button" value="Seguinte" id="seguinteNomeCenaButton" disabled/>' + 
				'</div>' +
				'<div class="contentTabs">' +
					'<p><strong>Nome da Cena</strong><font color="red">*</font>' + '</br></br>' +
						'<input name="nome" id="nomeCena"/>' +
					'</p>' +
				'</div>' + 
			'</div>';
/*15 - descricao da cena*/
var $dadosSessaoDescricaoCena = '<div id="dadosSessaoDescricaoCena">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorDescricaoCenaButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteDescricaoCenaButton"/>' + 
					'</div>' +
					'<div class="contentTabs">' +
						'<p><strong>Descrição da Cena </strong>(opcional)<br><br>' +
							'<textarea id="descricaoCena" name="descricaoCena" cols="40" rows="7" maxlength="255"></textarea>' +
						'</p>' +
					'</div>' + 
				'</div>';
/*16 - etiquetas da cena*/
var $dadosSessaoEtiquetasCena = '<div id="dadosSessaoEtiquetasHistoria">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorEtiquetasCenaButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteEtiquetasCenaButton"/>' + 
					'</div>' +
					'<div class="contentTabs">' +
						'<table width="55%" align="center">' +
							'<tbody>' +
								'<tr>' +
									'<td align="center" style="width: 275px;">' +
										'<p>Etiquetas existentes</p>' +
											'<select id="listaEtiquetasCenasExistentes" multiple="multiple">' +
											'</select>' +
										'<br><br>' +
										'<input type="button" id="seleccionarTudolistaEtiquetasExistentesCenaButton" value="Seleccionar tudo"/>' + 
										'<input type="button" id="removerTudolistaEtiquetasExistentesCenaButton" value="Remover Selecção"/>' +
										'<br><br>' +
									'</td>' +
									'<td align="left" valign="top">' +
										'<input type="button" id="adicionarEtiquetasCenaButton" value="Adicionar" disabled>' +
										'<input type="button" id="adicionarEtiquetaListaCenaButton" value="Adicionar Etiqueta &gt;&gt;">' + 
										'<br><br>' + 
										'<input type="button" id="removerEtiquetaListaCenaButton" value="&lt;&lt; Retirar Etiqueta">' + 
									'</td>' + 
									'<td align="center" style="width: 275px;">' +
										'<p>Etiquetas na Cena (opcional)</p>' +
											'<select id="listaEtiquetasCena" multiple="multiple">' +
											'</select>' +
											'<br><br>' +
												'<input type="button" id="seleccionarTudoListaEtiquetasCenaButton" value="Seleccionar tudo">' + 
												'<input type="button" id="removerTudoListaEtiquetasCenaButton" value="Remover Selecção">' + 
									'</td>' +
								'</tr>' +
							'</tbody>' +
						'</table>' + 
					'</div>' +
				'</div>' + '<select id="listaEtiquetasCenasExistentesAux" multiple="multiple" hidden> </select>';
/*17 - escolher ficheiro para a introdução à cena*/
var $dadosSessaoIntroducaoCena = '<div id="dadosSessaoIntroducaoCena">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorIntroducaoCenaButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteIntroducaoCenaButton" disabled/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<p><strong>Escolha um vídeo ou uma imagem para a introdução à actividade</strong><font color="red">*</font>' + '</p>' +
						'<img id="thumbnailCena" src="../imagens/noImage.gif" width="86" height="86"/>' + 
						'<form id="introducao" method="post" enctype="multipart/form-data">' + 
							'<input type="file" name="path" id="introducaoCena" style="display:none;" accept="image/*, video/*" />' + 
						'</form>' + 
						'<div id="adicionarIntroducaoDiv"> ' + 
							'<p><button id="adicionarIntroducaoButton" type="button">Adicionar Ficheiro</button></p>' + 
						'</div>' + 
		    	    			'<progress id="progressoIntroducaoUploadBar"></progress><p id="progressoIntroducao"></p><br>' +
					'</div>';
				'</div>';
/*18 - biblioteca de cenas*/
var $dadosSessaoBibliotecaCenas = '<div id="dadosSessaoBibliotecaCenas">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorBibliotecaCenasButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteBibliotecaCenasButton" disabled/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<div id="bibliotecaCenasColuna">' + 
							'<div id="bibliotecaCenaDivTitleButtons">' +
								'<div id="bibliotecaCenasTitle"><h3>Biblioteca de Cenas</h3></div>' +
							'</div>' +
							'<div id="bibliotecaCenasDiv">' +
								'<div id="listaCenas"></div>' +
							'</div>' +
						'</div>' +
						'<div id="cenaSeleccionadaColuna">' + 
							'<div id="bibliotecaDivCenaSeleccionada">' +
								'<div id="cenaSeleccionadaDiv"><h3>Cena Seleccionada</h3></div>' +
							'</div>' +
							'<div id="informacaoCena">' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</div>' + 
					'<div id="dadosSessaoBibliotecaCenaButtons">' +
						'<input type="button" value="Alterar" id="alterarBibliotecaCenasButton" disabled/>' +
						'<input type="button" value="Usar" id="usarBibliotecaCenasButton" disabled/>' +
					'</div>';

/*19 - escolher actividade*/
var $dadosSessaoActividade = '<div id="dadosSessaoActividade">' + 
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorActividadeButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteActividadeButton" disabled/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<h3>Escolha o tipo de actividade que pretende:</h3>' + 
						'<br>' + 
						'<div id="dadosSessaoActividadeDiv">' +
							'<input type="button" id="gestoButton" value="Gesto"/>' +
							'<input type="button" id="questionarioButton" value="Questionário"/>' +
						'</div>' + 
					'</div>' + 
				'</div>';
/*20 - actividade gesto */
var $dadosSessaoGesto = '<div id="dadosSessaoGesto">' + 
				'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorGestoButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteGestoButton" disabled/>' +
				'</div>' +
				'<div class="contentTabs">' +
					'<div id="gestoTitle">' + 
						'<h3>Escolha os gestos da lista ou adicione novos</h3>' + 
						'<br>' + 
					'</div>' +
					'<div id="dadosSessaoGestoDiv">' +
						'<div id="escolherGestoDiv">' +
							'<select id="listaGestosExistentes" multiple="multiple">' +
							'</select>' +
						'</div>' +
						'<div id="botoesGesto">' +
							'<input type="button" value="Novo Gesto" id="novoGestoButton" disabled/>' +
							'<br>' + 
							'<input type="button" value="Escolher" id="escolherGestoButton" disabled/>' + 
						'</div>' +
					'</div>' +
					'<div id="listaGestosEscolhidos">' + 
						'<div id="listaGestosEscolhidosDivTitleButtons">' +
							'<div id="listaGestosEscolhidosTitle">' + 
								'<h3 id="gestosEscolhidosTitle">Gestos escolhidos para esta cena:</h3>' +
								'<p id="gestosEscolhidosMensagem">(Arraste os gestos para os ordenar)</p>' +
							'</div>' +
						'</div>' +
						'<div id="gestosEscolhidosDiv">' +
							'<div id="gestosEscolhidos">' + 
								'<ul id="gestosSorteable">' +
								'</ul>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' + 
			'</div>' + '<select id="listaGestosExistentesAux" multiple="multiple" hidden> </select>';	
/*21 - adicionar gesto - nome do gesto*/
var $dadosSessaoNomeGesto = '<div id="dadosSessaoNomeGesto">' + 
				'<div class="anteriorSeguinteButtonsDiv">' +
					'<input type="button" value="Anterior" id="anteriorNomeGestoButton" />' +
					'<input type="button" value="Seguinte" id="seguinteNomeGestoButton" disabled/>' + 
				'</div>' +
				'<div class="contentTabs">' +
					'<p><strong>Nome do Gesto</strong><font color="red">*</font></br></br>' +
						'<input name="nomeGesto" id="nomeGesto"/>' +
					'</p>' +
				'</div>' +
			'</div>';
/*22 - adicionar gesto - numero de vezes que o gesto é repetido */
var $dadosSessaoNrVezesGesto = '<div id="dadosSessaoNrVezesGesto">' + 
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorNrVezesGestoButton" />' +
						'<input type="button" value="Seguinte" id="seguinteNrVezesGestoButton" disabled/>' + 
					'</div>' +
				'<div class="contentTabs">' +
					'<p><strong>Indique o número de vezes que deseja que o Gesto seja repetido</strong><font color="red">*</font></br></br>' +
						'<input name="nome" type="number" id="nrVezesGesto" size="2" min="1"/>' +
					'</p>' +
				'</div>' +
			'</div>';
/*23 - actividade questionario */
var $dadosSessaoQuestionario = '<div id="dadosSessaoQuestionario">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorQuestionarioButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteQuestionarioButton" disabled/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<div id="questionarioTitle">' + 
							'<h3>Escolha os questionários da lista ou adicione novos</h3>' + 
							'<br>' +
						'</div>' + 
						'<div id="dadosSessaoQuestionarioDiv">' +
							'<div id="escolherQuestionarioDiv">' +
								'<select id="listaQuestionariosExistentes" multiple="multiple">' +
								'</select>' +
							'</div>' +
							'<div id="botoesQuestionario">' +
								'<input type="button" value="Novo Questionario" id="novoQuestionarioButton" disabled/>' +
								'<br>' + 
								'<input type="button" value="Escolher" id="escolherQuestionarioButton" disabled/>' + 
							'</div>' +
						'</div>' +
						'<div id="listaQuestionariosEscolhidos">' + 
							'<div id="listaQuestionariosEscolhidosDivTitleButtons">' +
								'<div id="listaQuestionariosEscolhidosTitle"><h3 id="questionariosEscolhidosTitle">Questionários escolhidos para esta cena:</h3>' +
									'<p id="questionariosEscolhidosMensagem">(Arraste os questionários para os ordenar)</p>' +
								'</div>' +
							'</div>' +
							'<div id="questionariosEscolhidosDiv">' +
								'<div id="questionariosEscolhidos">' + 
									'<ul id="questionariosSorteable">' +
									'</ul>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' + '<select id="listaQuestionariosExistentesAux" multiple="multiple" hidden> </select>';
/*24 - adicionar novo questionario - nome do questionario*/
var $dadosSessaoNomeQuestionario = '<div id="dadosSessaoNomeQuestionario">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorNomeQuestionarioButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteNomeQuestionarioButton" disabled/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<p><strong>Nome do Questionário</strong><font color="red">*</font><br><br>' +
							'<input name="nome" id="nomeQuestionario"/>' +
						'</p>' +
					'</div>' +
				'</div>';
/*25 - perguntas do questionario*/
var $dadosSessaoPerguntasQuestionario = '<div id="dadosSessaoPerguntasQuestionario">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorPerguntasQuestionarioButton"/>' +
						'<input type="button" value="Seguinte" id="seguintePerguntasQuestionarioButton" disabled/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<div id="perguntasQuestionarioTitle">' + 
							'<h3>Insira uma nova pergunta ou escolha uma da lista</h3>' + 
							'<br>' + 
						'</div>' +
						'<div id="dadosSessaoPerguntasQuestionarioDiv">' +
							'<div id="escolherPerguntaQuestionarioDiv">' +
								'<select id="listaPerguntasExistentesQuestionario" multiple="multiple">' +
								'</select>' +
							'</div>' +
							'<div id="botoesPerguntas">' +
								'<input type="button" value="Nova Pergunta" id="novaPerguntaQuestionarioButton" disabled/>' +
								'<br>' + 
								'<input type="button" value="Escolher" id="escolherPerguntaQuestionarioButton" disabled/>' + 
							'</div>' +
						'</div>' +
						'<div id="listaPerguntasEscolhidasQuestionario">' + 
							'<div id="listaPerguntasEscolhidasQuestionarioDivTitleButtons">' +
								'<div id="listaPerguntasEscolhidasQuestionarioTitle"><h3 id="perguntasEscolhidasTitle">Perguntas escolhidas para este questionário:</h3>' + 
									'<p id="perguntasEscolhidasMensagem">(Arraste as perguntas para as ordenar)</p>' +
								'</div>' +
							'</div>' +
							'<div id="perguntasEscolhidasQuestionarioDiv">' +
								'<div id="listaPerguntasEscolhidas">' + 
									'<ul id="perguntasSorteable">' +
									'</ul>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' + '<select id="listaPerguntasExistentesQuestionarioAux" multiple="multiple" hidden> </select>';

/*26 - reforço positivo*/
var $dadosSessaoReforcoPositivo = '<div id="dadosSessaoReforcoPositivo">' +
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorReforcoPositivoButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteReforcoPositivoButton" disabled/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<h3><strong>Escolha o reforço positivo</strong><font color="red">*</font></h3>' +
						'<img id="thumbnailReforcoPositivo" src="../imagens/noImage.gif" width="86" height="86"/>' + 
						'<form id="retorno" method="post" enctype="multipart/form-data">' + 
							'<input type="file" name="path" id="reforcoPositivo" style="display:none;" accept="image/*, video/*" />' + 
						'</form>' + 
						'<br>' + 
						'<div id="adicionarReforcoPositivoDiv"> ' + 
							'<p><button id="adicionarReforcoPositivoButton" type="button">Adicionar Ficheiro</button></p>' + 
						'</div>' + 
						'<progress id="progressoReforcoPositivoUploadBar"></progress><p id="progressoReforcoPositivo"></p><br>' +
					'</div>' +
				'</div>';
/*27 - reforço negativo*/
var $dadosSessaoReforcoNegativo = '<div id="dadosSessaoReforcoNegativo">' + 
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorReforcoNegativoButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteReforcoNegativoButton"/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<h3><strong>Escolha o reforço negativo</strong>(opcional)</h3>' +
						'<img id="thumbnailReforcoNegativo" src="../imagens/noImage.gif" width="86" height="86"/>' + 
						'<form id="retornoN" method="post" enctype="multipart/form-data">' + 
							'<input type="file" name="path" id="reforcoNegativo" style="display:none;" accept="image/*, video/*" />' + 
						'</form>' + 
						'<br>' + 
						'<div id="adicionarReforcoNegativoDiv"> ' + 
							'<p><input id="adicionarReforcoNegativoButton" type="button" value="Adicionar Ficheiro"></p>' +
							'<p><input id="removerReforcoNegativoButton" type="button" value="Remover Ficheiro" disabled></button></p>' +  
						'</div>' + 
						'<progress id="progressoReforcoNegativoUploadBar"></progress><p id="progressoReforcoNegativo"></p><br>' +
					'</div>' +
				'</div>';
/*28 - número de vezes que é a cena é repetida */
var $dadosSessaoRepeticaoCena = '<div id="dadosSessaoRepeticaoCena">' +  
					'<div class="anteriorSeguinteButtonsDiv">' +
						'<input type="button" value="Anterior" id="anteriorRepeticaoCenaButton"/>' +
						'<input type="button" value="Seguinte" id="seguinteRepeticaoCenaButton"/>' +
					'</div>' +
					'<div class="contentTabs">' +
						'<h3><strong>Indique o número de vezes que deseja que a cena seja repetida</strong><font color="red">*</font></h3>' +
							'</br></br></br>' +
							'<input name="nome" type="number" id="nrVezesCena" size="2" min="1" value="1"/>' +
					'</div>' +
				'</div>';
/*29 - escolher se a sessão tem pontuação*/
var $dadosSessaoPontuacao = '<div id="dadosSessaoPontuacao">' +  
				'<div class="anteriorSeguinteButtonsDiv">' +
					'<input type="button" value="Anterior" id="anteriorPontuacaoButton" />' +
					'<input type="button" value="Seguinte" id="seguintePontuacaoButton"/>' +
				'</div>' +
				'<div class="contentTabs">' +
					 '<div id="dadosSessaoPontuacaoDiv">' + 
						'<h3>Deseja que esta cena tenha pontuação?</h3>' + 
						 '<input type="radio" id="simPontuacao" name="radio"><label for="simPontuacao">Sim</label>' +
						'<input type="radio" id="naoPontuacao" name="radio" checked="checked"><label for="naoPontuacao">Não</label>' +
					'</div>' +
				'</div>' +
			'</div>';

//conteudo das tabs
var conteudo = [
		/*0*/$dadosSessaoTerapeuta, 
		/*1*/$dadosSessaoCrianca, 
		/*2*/$dadosSessaoTipoSessao, 
		/*3*/$dadosSessaoDataHora, 
		/*4*/$dadosSessaoIntervaloDatas,
		/*5*/$dadosSessaoTipoExercicio, 
		/*6*/$dadosSessaoExercicioGateau, 
		/*7*/$dadosSessaoHistoria,
		/*8*/$dadosSessaoNomeHistoria, 
		/*9*/$dadosSessaoDescricaoHistoria, 
		/*10*/$dadosSessaoThumbnailHistoria, 
		/*11*/$dadosSessaoEtiquetasHistoria, 
		/*12*/$dadosSessaoBibliotecaHistorias, 
		/*13*/$dadosSessaoCena, 
		/*14*/$dadosSessaoNomeCena, 
		/*15*/$dadosSessaoDescricaoCena, 
		/*16*/$dadosSessaoEtiquetasCena, 
		/*17*/$dadosSessaoIntroducaoCena, 
		/*18*/$dadosSessaoBibliotecaCenas, 
		/*19*/$dadosSessaoActividade, 
		/*20*/$dadosSessaoGesto, 
		/*21*/$dadosSessaoNomeGesto, 
		/*22*/$dadosSessaoNrVezesGesto, 
		/*23*/$dadosSessaoQuestionario, 
		/*24*/$dadosSessaoNomeQuestionario, 
		/*25*/$dadosSessaoPerguntasQuestionario, 
		/*26*/$dadosSessaoReforcoPositivo, 
		/*27*/$dadosSessaoReforcoNegativo, 
		/*28*/$dadosSessaoRepeticaoCena, 
		/*20*/$dadosSessaoPontuacao
		];

