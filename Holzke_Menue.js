// ==UserScript==
// @name     Holzke_Menue
// @version  1
// @grant    none
// @include  https://30.bestellung-holzke-menue.de/de/menu/*
// ==/UserScript==

delmenus = ["mealtitel menuhash-3e0fec menu-5", "mealtitel menuhash-998eca menu-7", "mealtitel menuhash-30ba20 menu-8", "mealtitel menuhash-8e7ba2 menu-9",
            "mealtitel menuhash-e281d4 menu-11", "mealtitel menuhash-f7e37a menu-12", "mealtitel menuhash-48cca8 menu-13", "mealtitel menuhash-3841bf menu-14",
            "mealtitel menuhash-b143cd menu-15", "mealtitel menuhash-aa82a3 menu-16", "mealtitel menuhash-e02b1d menu-17", "mealtitel menuhash-e73758 menu-18"]

for (const menu in delmenus) {
  document.getElementsByClassName(delmenus[menu])[0].parentElement.remove()
}

// ----------------------------------------------------------

function isTextIn(mealparam, text) {
  result = false
  
  for (const meal in text) {
    result = result || mealparam.toLowerCase().includes(text[meal])
    if (result) {
      return result
    }
  }
  
  return result;
}

// ----------------------------------------------------------

meat = ["braten","bulette","con carne","eisbein","fleisch","frikadelle","frikassee","geflügel","gulasch","hahn","hähnchen",
        "hirtenrolle","huhn","hühn","jagd","jäger","kalb","kassler","klops","knacker","königsberger klopse", "pulled pork",
        "pute","rind","rippchen","roulade","salami","schinken","schwein","speck","steak","wiener","wurst","würstchen"]
fish = ["barsch","fisch","forelle","hecht","lachs","matjes","zander"]
excludes = ["gebraten"]

meals = document.getElementsByTagName("mealtxt")
for (const meal in meals) {
  m = meals[meal]
  mtext = m.innerText.split(/\r?\n|\r|\n/g)[0].trim();

	if (isTextIn(mtext, excludes)) {
  	m.parentElement.parentElement.style.backgroundColor = "#ffccff"
  } else if (isTextIn(mtext, meat)) {
  	m.parentElement.parentElement.style.backgroundColor = "#ffaaaa"
  } else if (isTextIn(mtext, fish)) {
  	m.parentElement.parentElement.style.backgroundColor = "#eeee55"
  } else {
  	m.parentElement.parentElement.style.backgroundColor = "#88ff88"
  }
  m.parentElement.parentElement.style.border = "0px"
}
