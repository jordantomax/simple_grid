(function() {

  function checkIsNumber(value) {
    var
    intRegex = /^\d+$/,
    floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;

    if (intRegex.test(value) || floatRegex.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  function getElementsByClass(searchClass,node,tag) {
    var classElements = new Array();
    if ( node == null )
      node = document;
    if ( tag == null )
      tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
      if ( pattern.test(els[i].className) ) {
        classElements[j] = els[i];
        j++;
      }
    }
    return classElements;
  }

  // get one level deep size of any object
  function getSize(obj) {
    var size = 0;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }

  // get all one level deep keys in an object
  function getKeys(obj) {
    var keys = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) keys.push(key);

      // if our value is also an object
      if (getSize(obj[key]) > 0) {
      }
    }
    return keys;
  }

  // get all values in an object
  function getValues(obj) {
    values = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) values.push(obj[key]);
    }
    return values;
  }

  // create a DOM element, where attrs is an object literal
  function createElement(tag, attrs) {
    var element = document.createElement(tag);

    if (typeof attrs != 'undefined') {
      var key = getKeys(attrs),
          value = getValues(attrs),
          i = 0,
          len = getSize(attrs);
      for (i; i < len; i++) {
        element.setAttribute(key[i], value[i]);
      }
    }
    return element;
  }

  function createElements( tag, id, obj ) {
    var
    keys = getKeys(obj),
    values = getValues(obj),
    elements = {},
    i = 0,
    len = keys.length;

    for (i; i < len; i++) {
      elements[i] = createElement( tag, values[i] );
    }
    // return an object that contains our new inputs
    return elements;
  }

  // create an input
  function createInput( attrs ) {
    var input = createElement( 'input', attrs );
    return input;
  }

  // create an object that contains inputs
  function createForm( id, obj, labels ) {
    var inputs = createElements( 'input', id, obj );
    return inputs;
  }

  function setupInputs() {

    // an object that represents our inputs
    var inputs = {
      cols: {
        id: 'columns',
        type: 'text',
        placeholder: 'Number of Columns',
        value: 8
      },

      layoutWidth: {
        id: 'layout_width',
        type: 'text',
        placeholder: 'Layout Width',
        value: 960
      },

      marginWidth: {
        id: 'margin_width',
        type: 'text',
        placeholder: 'Margin Width',
        value: 10
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
    checkInput( form[0]['id'] );
    checkInput( form[1]['id'] );
    checkInput( form[2]['id'] );
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
        changeGrid.call(this);
      };
      if (!init) {
        init = true;
        changeGrid.call(input);
        return input;
      }
    }();
    return value;
  }

  function changeGrid() {
    var
    divs = document.getElementsByTagName('div'),
    wrappers = getElementsByClass('wrapper', document, 'div'),
    i = 0;

    // is it a number?
    if (checkIsNumber(this.value)) {
      // which input is it for?
      switch (this.getAttribute('id')) {
        case 'columns':
          break;
        case 'layout_width':
          for(i; i < wrappers.length; i++) {
            wrappers[i].style.width = this.value + 'px';
          }
          break;
        case 'margin_width':
          break;
        default:
          console.log('not getting an expected input id');
      }
    }

    // for(i; i < len; i++) {
    //   if (divs[i].getAttribute('data-grid')) {
    //   }
    // }
  }


  // var grid = {
  //   getWrapper:  function() {
  //     var wrapper = getElementsByClass('wrapper', document, 'div');
  //     return wrapper;
  //   },

  //   changeColumns: function(value) {
  //     var wrapper = this.getWrapper;
  //   },

  //   changeLayoutWidth: function(value) {
  //     var wrapper = grid.getWrapper();
  //   },

  //   changeMarginWidth: function(value) {
  //   }
  // }

  window.onload = function() {
    setupInputs();
  };
}())
