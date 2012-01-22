// Author: Jordan Cooperman
// Contact: jordancooperman@gmail.com, @jordancooperman
// Date: January, 2012

(function() {
	
	var
	layoutWidth = 'layout_width',
	marginWidth = 'margin_width',
	columns = 'columns',

	wrapperElementTag = 'div',
	gridElementTag = 'div';


/* APPLICATION FUNCTIONS
--------------------------------------- */

  function setupInputs() {

    // an object that represents our inputs
    var inputs = {
      cols: {
        id: columns,
        type: 'text',
        placeholder: 'Number of Columns',
        value: localStorage.getItem(columns) ? localStorage.getItem(columns) : 8
      },

      layoutWidth: {
        id: layoutWidth,
        type: 'text',
        placeholder: 'Layout Width',
        value: localStorage.getItem(layoutWidth) ? localStorage.getItem(layoutWidth) : 960 
      },

      marginWidth: {
        id: marginWidth,
        type: 'text',
        placeholder: 'Margin Width',
        value: localStorage.getItem(marginWidth) ? localStorage.getItem(marginWidth) : 10 
      }
    },
    // ...and turn them into an object that contains DOM elements
    inputs = createFormElements( 'grid-editor', inputs ),
		form = createElement('form', {id: 'grid-editor'});
    body = document.getElementsByTagName("body")[0],
    len = getSize(inputs),
    i = 0;

		// insert the form inside the body
		body.insertBefore(form, document.body.firstChild);

    for (i; i < len; i++) {
      // ...and insert each input into the form 
			form.appendChild(inputs[i]);
    }

    setupInputEvents( layoutWidth );
    setupInputEvents( marginWidth );
    setupInputEvents( columns);
  }

  // set up events
  function setupInputEvents( id ) {
    var
    input = document.getElementById( id ),
		value = parseFloat(input.value),
		arrowKey = false;

		routeInput.call(input);

		input.onkeyup = function() {
			if (!arrowKey) {
				value = parseFloat(this.value);
				this.setAttribute('value', value);
				routeInput.call(this); 
			}
		}

		input.onkeydown = function(e) {
			value = parseFloat(this.value);

			if (e.keyCode ==  38) {
				arrowKey = true;
				value++;  // up
			}

			else if (e.keyCode == 40) {
				arrowKey = true;
				value--; // down
			}

			if (arrowKey) {
				arrowKey = false;

				// setting the attribute seems only to work
				// when we're actually typing
				if (value) this.value = value.toString();
				else this.value = 1;
				routeInput.call(this); 
			}
		};
  }

  function routeInput() {
		var input;
    // is it a number?
    if (checkIsNumber(this.value)) {
      // which input is it for?
      switch (this.getAttribute('id')) {
        case columns:
					input = columns;
          break;
        case layoutWidth:
					input = layoutWidth;
          break;
        case marginWidth:
					input = marginWidth;
          break;
        default:
          console.log('not getting an expected input id');
      }
    }
		if (input) modifyGridElements.call(this, input);
  }

  function modifyGridElements(input) {
		var
		init,
		gridElements = getGridElements(),
    wrappers = getWrapperElements(),
		margin = getMarginWidth(),
		percentMargin = (margin / getLayoutWidth() * 100) + '%',
		len,
		i = 0;

		// add current input values to localStorage in case we reload
		if (localStorage) {
			if (input == layoutWidth) localStorage.setItem( layoutWidth, this.value );
			else if (input == marginWidth) localStorage.setItem( marginWidth, this.value );
			else if (input == columns) localStorage.setItem( columns, this.value );
		}

		// loop through wrapper elements
		// if editing layout width
		if (input == layoutWidth) {
			len = wrappers.length;

			for(i; i < len; i++) {
				if (!init) {
					wrappers[i].style.marginLeft = 'auto';
					wrappers[i].style.marginRight = 'auto';
					wrappers[i].className += " group";
				}
				wrappers[i].style.width = (getLayoutWidth() + getMarginWidth()*2) + 'px';
			}
		}

		// loop through grid elements
		i = 0;
		len = gridElements.length

		for(i; i < len; i++) {
			if (!init) {
				gridElements[i].style.cssFloat = 'left';
				gridElements[i].style.backgroundColor = '#333';
				gridElements[i].style.height = '1000px';
			}

			gridElements[i].style.marginLeft = percentMargin;
			gridElements[i].style.marginRight = percentMargin;
      gridElements[i].style.width = ((gridElements[i].getAttribute('data-grid')/getNumberOfCols() * 100) - parseFloat(percentMargin)*2) + '%';
		}
		init = true;
  }

	function getGridElements() {
    var
    divs = document.getElementsByTagName(gridElementTag),
		gridElements = [],
    len = divs.length,
    i = 0;
		
    for(i; i < len; i++) {
      if (divs[i].getAttribute('data-grid')) {
				gridElements.push(divs[i]);
      }
    }
		return gridElements;
	}

	function getWrapperElements() {
    var
    divs = document.getElementsByTagName(wrapperElementTag),
		wrapperElements = [],
    len = divs.length,
    i = 0;
		
    for(i; i < len; i++) {
      if (divs[i].getAttribute('data-gridWrapper')) {
				wrapperElements.push(divs[i]);
      }
    }
		return wrapperElements;
	}

  function getMarginWidth() {
    return parseFloat(document.getElementById(marginWidth).value);
  }

  function getLayoutWidth() {
    return parseFloat(document.getElementById(layoutWidth).value);
  }

	function getNumberOfCols() {
		return parseFloat(document.getElementById(columns).value);
	}

  window.onload = function() {
    setupInputs();
  };
}());
