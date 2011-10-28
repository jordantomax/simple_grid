function getKeys(obj) {
 var keys = [];

 for (var key in obj) {
   keys.push(key);
 }
 return keys; 
}

function getValues(obj) {
  values = [];
   
  for (var key in obj) {
    values.push(obj[key]); 
  }
  return values; 
}

function createElement (tag, id, attrs) {
  var element = document.createElement(tag);
  element.setAttribute('id', id);
  if (typeof attrs != 'undefined') {
    var key = getKeys(attrs),
        value = getValues(attrs),
        i = 0,
        len = attrs.length;
         
    console.log(key, value);
    console.log(attrs.length);
    for (i; i < len; i++) {
      element.setAttribute(key[i], value[i]);
    }
  }
  return element;
}

function setupGrid () {
  var
  cols,
  margin,
  layoutWidth,
  colWidth,
  percentMargin,
  
  colsInput,
  marginInput,
  layoutWidthInput,
  colWidthInput,

  // Cache DOM elements
  body,
  wrapper,
  grid,
  options;

  body = document.getElementsByTagName("body")[0];

  wrapper = createElement('div', 'wrapper'),
  grid = createElement('div', 'gridElement'),
  options = createElement('div', 'options'),
  gridForm = createElement('form', 'gridForm'),
  colsInput = createElement('input', 'cols', {type : 'text', placeholder : 'Columns'});
  
  options.innerHTML = '';
  gridForm.appendChild(colsInput);
  body.appendChild(gridForm);
  body.appendChild(wrapper);
  wrapper.appendChild(grid);
  body.appendChild(options);
};

window.onload = function() { 
  setupGrid(); 
} 
// $cols: 12;
// $margin: 5;
// $layout-width: 950 + $margin * 2;
// $col-width: $layout-width / $cols;
// $percent-margin: $margin / $layout-width;

// // CONTAINER

// .grid-container {
//   @include group;
//   width: $layout-width + px;
//   margin: 0 auto;
//   padding: 0 75px;
//   position: relative;
// }

// // COLUMNS

// @for $i from 1 through $cols {
//   .grid-#{$i} {
//     width: ( ($col_width * $i / $layout-width) - 2 * $percent-margin) * 100%;
//     padding: 0;
//     margin: 0 $percent-margin * 100%;
//     display: inline;
//     float: left;
//     position: relative;
//   }
// }
