
to get the list of countries:
http://www.europarl.europa.eu/meps/en/search.html

var iso = {};
var countries = {};
var sel = document.querySelector("#input_country");
for (var i=0, n=sel.options.length;i<n;i++) { // looping over the options
  if (sel.options[i].value) iso[sel.options[i].value.toLowerCase()]=sel.options[i].title;
  if (sel.options[i].value) countries[sel.options[i].title]=sel.options[i].value.toLowerCase();
}
