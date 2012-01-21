// Author: Jordan Cooperman
// Contact: jordancooperman@gmail.com, @jordancooperman
// Date: January, 2012

(function() {
	
	var
	layoutWidth = 'layout_width',
	marginWidth = 'margin_width',
	columns = 'columns';


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
    form = createForm( 'grid-editor', inputs ),
    body = document.getElementsByTagName("body")[0],
    len = getSize(form),
    i = 0;

    for (i; i < len; i++) {
      // ...and insert each element into the DOM
      body.insertBefore(form[i], document.body.firstChild);
    }

    // check the values in our new inputs
    // ...and set event to check on key up
    checkInput( layoutWidth );
    checkInput( marginWidth );
    checkInput( columns);
  }

  // check inputs on page load, then watch for new input
  function checkInput( id ) {
    var
    init = false,
    input;

    var value = function() {
      input = document.getElementById( id );
      document.getElementById( id ).onkeyup = function() {
        // when we change a value
        routeInput.call(this);
      };
      if (!init) {
        init = true;
        routeInput.call(input);
        return input.value;
      }
    }();
    return value;
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
		gridElements = getGridElements(),
    wrappers = getElementsByClass('wrapper', document, 'div'),
		margin = getMarginWidth(),
		percentMargin = (margin / getLayoutWidth() * 100) + '%',
		len = gridElements.length,
		i = 0;

		if (input == layoutWidth) localStorage.setItem( layoutWidth, this.value );
		else if (input == marginWidth) localStorage.setItem( marginWidth, this.value );
		else if (input == columns) localStorage.setItem( columns, this.value );

    for(i; i < wrappers.length; i++) {
			console.log(getLayoutWidth());
      wrappers[i].style.width = (getLayoutWidth() + getMarginWidth()*2) + 'px';
    }

		i = 0;
		for(i; i < len; i++) {

			gridElements[i].style.marginLeft = percentMargin;
			gridElements[i].style.marginRight = percentMargin;
      gridElements[i].style.width = ((gridElements[i].getAttribute('data-grid')/getNumberOfCols() * 100) - parseFloat(percentMargin)*2) + '%';
		}
  }

	function getGridElements() {
    var
    divs = document.getElementsByTagName('div'),
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
}())
