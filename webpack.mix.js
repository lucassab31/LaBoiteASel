const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


//add the name of your scss file in "parts" array to compile in a separate css file
let parts = ["app", "home"];
mix.js('resources/js/app.js', 'public/js').react();

for(i=0; i < parts.length; i++){
        mix.sass('resources/sass/' + parts[i] + ".scss", 'public/css/' + parts[i] + ".css");
}
