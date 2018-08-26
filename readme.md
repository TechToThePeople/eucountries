# Flags, the d3 svg way
This is build upon a great [collection of flags](https://github.com/lipis/flag-icon-css).
The goal of this project was to be able to use icons (of any size) using the svg of the flags, but without having to laod them as separate files.

On modern browsers, you can define the flags as svg "symbol", give them each a unique id (flag-{iso}, eg "flag-ch") and use them where you want

    <svg><use href="#flag-ch"></svg>
    
you can set the height and width with css.

# How to use?

put directly at the bottom of your file (check gulp html) or ajax load the svg/eu-countries and simply svg use the flags you want where you want them. Don't forget to style the size of the icon you want (css). I used the 4x3 flags

# I want different countries/size

    $npm install
    $gulp copy
    $gulp svg
    

check the gulpfile.js, it should be fairly obvious how to modify




to get the list of countries:
http://www.europarl.europa.eu/meps/en/search.html

var iso = {};
var countries = {};
var sel = document.querySelector("#input_country");
for (var i=0, n=sel.options.length;i<n;i++) { // looping over the options
  if (sel.options[i].value) iso[sel.options[i].value.toLowerCase()]=sel.options[i].title;
  if (sel.options[i].value) countries[sel.options[i].title]=sel.options[i].value.toLowerCase();
}
