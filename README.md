#A dead simple, percentage based grid generator.

Simple Grid makes it a snap to output the css necessary to use a percentage based grid of your own design  

##Setup

In order to use Simple Grid, you will need a compiler for sass.  
Many options are available, the simplest being to install the sass gem. This assumes that ruby is installed on your machine.  

    gem install sass

You can then use the built in watch script to watch and compile your files.

    sass --watch style.scss:style.css

More information can be found at [sass-lang.com](http://sass-lang.com/ "Sass-lang")

##Usage

Before implementing Simple Grid, you must output the necessary css. To do this, edit the first three variables in \_grid.scss, which can be found in assets/css/scss/partials/  
The following values would output the css necessary to construct a 12 column grid, with a total width of 950px, and a percentage equivalent of 5px margins</p>

    $cols: 12;  
    $magin: 5;  
    $layout-width: 950;  

Once you have the necessary css, you're ready to write some markup! Heres how it looks.

    <div class="grid-container site-header">
      <div class="grid-4 logo">
        <!-- I'm inside of a grid column! It has the percentage width of 4 columns -->
      </div>
      <div class="grid-4 user-links">
        <!-- I'm inside of a grid column! It has the percentage width of 8 columns -->
      </div>
    </div>

Ideally, you would use the grid more semantically, avoiding class names like the ones above. Something like this:
  
    <div class="site-header">
      <div class="logo">
      </div>
      <div class="user-links">
      </div>
    </div> 

You might then extend or include(if we had written the grid as a mixin) the proper grid classes. That css may look like:

    .site-header {
      @extend .grid-container;
    }
    
    .logo {
      @extend .grid-4;
    }

    .user-links {
      @extend .grid-8;
    } 

## License

(The MIT License)

Copyright (c) 2010 - 2011 Jordan Cooperman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
