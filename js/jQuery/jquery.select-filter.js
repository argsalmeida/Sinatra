/**
 * jQuery Select-Filter 0.0.1
 *
 * Dynamically filter long <select> lists through an (automatically created)
 * input[type="text"] control.
 *
 * https://github.com/kfr2/jquery-select-filter
 *
 * License: GPL - http://www.gnu.org/licenses/gpl.html
 */
(function($) {
    $.fn.selectFilter = function(options) {
        var defaults = {
            // searching should be case sensitive
            'caseSensitive': false,

            // clear input box on Escape press
            'clearInputOnEscape': true,
            
            // disable regular expressions in search input
            'disableRegex': true,

            // class to associate with filter element
            'filterClass': 'filter-bar',

            // text to display as placeholder for the filter bar
            'inputPlaceholder': 'Escreva para filtrar',
            
            // the minimum number of characters required to begin initial filtering
            'minimumCharacters': 1,

            // the minimum size attribute for the select element this plugin is called on
            'minimumSelectElementSize': 10,

            // amount of time to delay filter between keypresses (in ms)
            'searchDelay': 200,

            // begin searching strickly from beginning of each option
            'searchFromBeginning': false,

            // the width for the select/input boxes. If -1, use the width of the calling element before filtering occurs
            // the width may be numeric (in which case px will be appended) or another valid CSS designator (ex: %)
            'width': -1,

	    'name': 'undefined'
        };

        // Overwrite default settings with user provided ones.
        options = $.extend(defaults, options);

	empty = false;
        // Note the calling element -- i.e., the select element -- and its
        // children.
        var self = this;
        if (!self || self.get(0).tagName !== 'SELECT') {
            return false;
        }

        // Lock the calling element's width to prevent it from dynamically
        // resizing when the maximum length of its children changes.
        // Otherwise, the calling element may resize as its children
        // are removed/added.
        var width = options.width;
        if (width === -1) {
            width = self.width();
        }

        var widthStr = width.toString();
        if (isFinite(widthStr)) {
            widthStr += 'px';
        }

        self.css('width', widthStr);
        
        // Used for connection between input and select elements.
//        var name = '';
/*        if (typeof(self.attr('name')) === 'undefined') {
            name = 'undefined_name';
        }
        else {
            name = self.attr('name').replace(/\]/g, '').replace(/\[/g, '');
        }*/
        var name = options.name;


        // Keep a copy of the children of the calling element.
	switch(name){
		case 'escolheCriancas':
		       	cloneCriancas = self.children().clone();
			break;
		case 'escolheEtiquetasHistoria': 
		       	cloneEtiquetasHistorias = self.children().clone();
			break;
		case 'escolheEtiquetasCena':
			cloneEtiquetasCenas = self.children().clone();
			break;
		case 'escolhePerguntasQuestionario':
			clonePerguntasQuestionario = self.children().clone();
			break;
		case 'escolheGesto':
			cloneGestos = self.children().clone();
			break;
		case 'escolheQuestionario':
			cloneQuestionarios = self.children().clone();
			break;
	}

        // Ascertain the calling element's size is at least mininumSelectElementSize
        if(typeof(self.attr('size')) === 'undefined' || self.attr('size') < options.minimumSelectElementSize)
        {
            self.attr('size', options.minimumSelectElementSize);
        }

        if(name == 'escolheEtiquetasHistoria' || name == 'escolhePerguntasQuestionario' || name == 'escolheGesto' || name == 'escolheQuestionario' || name == 'escolheEtiquetasCena') 
		options.inputPlaceholder = 'Escreva para filtrar/adicionar'
        // Create the filter element and attach it to the calling element.
        var filterElement = $('<input>', {
            id: 'input_' + name,
            type: 'text',
            placeholder: options.inputPlaceholder,
            class: options.filterClass,
            style: 'display: block; width: ' + widthStr
        });

        self.addClass(name + '_select').css({'display': 'block'}).before(filterElement);

        // Clear the input box when escape is pressed.
        if (options.clearInputOnEscape) {
            $('#input_' + name).on('keydown', function(key) {
                if (key.which === 27) {
                    $(this).val('');
                }
            });
        }


        /**
         * Filtering logic
         */
        var keyDelayTimeout;
        var filteringStarted = false;
        var oldSearchText = null;

        $('#input_' + name).on('keyup', function() {
		if($("#input_" + name).val() != ''){
			switch(name){
				case 'escolheEtiquetasHistoria': 
					$("#adicionarEtiquetasHistoriaButton").attr('disabled', false);
					break;
				case 'escolheEtiquetasCena':
      					$("#adicionarEtiquetasCenaButton").attr('disabled', false);
					break;
				case 'escolhePerguntasQuestionario':
					$("#novaPerguntaQuestionarioButton").attr('disabled', false);
					$("#escolherPerguntaQuestionarioButton").attr('disabled', true);
					break;
				case 'escolheGesto':
					$("#novoGestoButton").attr('disabled', false);
					$("#escolherGestoButton").attr('disabled', true);
					break;
				case 'escolheQuestionario':
					$("#novoQuestionarioButton").attr('disabled', false);
					$("#escolherQuestionarioButton").attr('disabled', true);
					break;
			}
		} else {
			switch(name){
				case 'escolheEtiquetasHistoria': 
					$("#adicionarEtiquetasHistoriaButton").attr('disabled', true);
					break;
				case 'escolheEtiquetasCena':
      					$("#adicionarEtiquetasCenaButton").attr('disabled', true);
					break;
				case 'escolhePerguntasQuestionario':
					$("#novaPerguntaQuestionarioButton").attr('disabled', true);
					$("#escolherPerguntaQuestionarioButton").attr('disabled', true);
					break;
				case 'escolheGesto':
					$("#novoGestoButton").attr('disabled', true);
					$("#escolherGestoButton").attr('disabled', true);
					break;
				case 'escolheQuestionario':
					$("#novoQuestionarioButton").attr('disabled', true);
					$("#escolherQuestionarioButton").attr('disabled', true);
					break;
			}
		}
            clearTimeout(keyDelayTimeout);

            var searchText = $(this).val();
            if (!filteringStarted && searchText.length < options.minimumCharacters) {
                return;
            }

            filteringStarted = true;

            // Add timeout to filtering for performance reasons.
            keyDelayTimeout = setTimeout(function() {
                // Refresh the list of items if the search string has
                // grown shorter as the user is backtracking.
                // TODO: it might be neat to consider caching copies of results
                // for various phrases and swap them into place as the user
                // backtracks and enters previous queries.
                if (oldSearchText !== null) {
                    if (searchText.length <= oldSearchText.length) {
                        self.children().remove();
			switch(name){
				case 'escolheCriancas':
				       self.append(cloneCriancas);
					break;
				case 'escolheEtiquetasHistoria': 
				       self.append(cloneEtiquetasHistorias);
					break;
				case 'escolheEtiquetasCena':
				       self.append(cloneEtiquetasCenas);
					break;
				case 'escolhePerguntasQuestionario':
					self.append(clonePerguntasQuestionario);
					break;
				case 'escolheGesto':
					self.append(cloneGestos);
					break;
				case 'escolheQuestionario':
					self.append(cloneQuestionarios);
					break;
			}
                        
                    }
                }
                oldSearchText = searchText;

                if (!options.caseSensitive) {
                    searchText = searchText.toLowerCase();
                }

                if (options.disableRegex) {
                    searchText = searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                }

                if (options.searchFromBeginning) {
                    searchText = '^' + searchText;
                }

                var pattern = new RegExp(searchText);
                self.children().each(function(i, selected) {
                    var option_value = $(this).text();
                    if (!options.caseSensitive) {
                        option_value = option_value.toLowerCase();
                    }

                    if (!pattern.test(option_value)) {
                        $(selected).remove();
                    }
                });

                /*if (self.children().length === 0) {
			//self.append('<option disabled>(Sem resultados.)</option>');
			switch (name){
				case 'escolheEtiquetasHistoria':
					if($('#listaEtiquetasHistoria option:contains('+ $('#input_escolheEtiquetasHistoria').val() +')').length == 0)
						$('#adicionarEtiquetasHistoriaButton').attr("disabled", false);
					break;
				case 'escolheEtiquetasCena':
					if($('#listaEtiquetasCena option:contains('+ $('#input_escolheEtiquetasCena').val() +')').length == 0)
						$('#adicionarEtiquetasCenaButton').attr("disabled", false);
					break;
				case 'escolhePerguntasQuestionario':
					$('#novaPerguntaQuestionarioButton').attr("disabled", false);
					break;
				case 'escolheGesto':
					$('#novoGestoButton').attr("disabled", false);
					$('#escolherGestoButton').attr("disabled", true);
					break;
				case 'escolheQuestionario':
					$('#novoQuestionarioButton').attr("disabled", false);
					break;
			}
                    
                } else {
			switch (name){
				case 'escolheEtiquetasHistoria':
					$('#adicionarEtiquetasHistoriaButton').attr("disabled", true);
					break;
				case 'escolheEtiquetasCena':
					$('#adicionarEtiquetasCenaButton').attr("disabled", true);	
					break;
				case 'escolhePerguntasQuestionario':
					$('#novaPerguntaQuestionarioButton').attr("disabled", true);
					break;
				case 'escolheGesto':
					$('#novoGestoButton').attr("disabled", true);
					$('#escolherGestoButton').attr("disabled", false);
					break;
				case 'escolheQuestionario':
					$('#novoQuestionarioButton').attr("disabled", true);
					break;
			} 
		}*/

                clearTimeout(keyDelayTimeout);
            }, options.searchDelay);
        });


        return this;
    };
})(jQuery);
