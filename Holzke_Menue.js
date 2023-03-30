// ==UserScript==
// @name     Holzke Menue
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
    result = result || mealparam.includes(text[meal])
    if (result) {
      return result
    }
  }
  
  return result;
}

// ----------------------------------------------------------

maybe = ["fleisch", "Fleisch", "Roulade", "roulade", "braten", "Braten", "würstchen", "Würstchen", "Knacker", "knacker",
         "con Carne", "Kassler", "kassler", "Jäger", "Jagd", "steak", "Steak", "Hähnchen", "Hühn", "Hahn", "kalb", "Kalb",
         "Pute", "Schwein", "Rind", "Schinken", "schinken", "Wurst", "wurst", "Königsberger Klopse", "frikassee", "Frikassee",
         "Hirtenrolle", "lachs", "Lachs", "forelle", "Forelle", "Frikadelle", "Pulled Pork", "fisch", "Fisch", "Klops", "klops",
         "Hecht", "hecht", "Speck", "speck", "Bulette", "Matjes", "matjes", "Barsch", "barsch", "Salami", "salami", "Zander", "zander",
				 "Eisbein", "eisbein", "Gulasch", "gulasch", "Huhn", "huhn", "Rippchen", "rippchen" ]
excludes = ["gebraten", "Gebraten"]

maybecol = "#eeee55" // yellow
goodcol = "#88ff88" // pink
excludecol = "#ffccff" // pink

meals = document.getElementsByTagName("mealtxt")
for (const meal in meals) {
  m = meals[meal]
  mtext = m.innerText.split(/\r?\n|\r|\n/g)[0].trim();

	if (isTextIn(mtext, excludes)) {
  	m.parentElement.parentElement.style.backgroundColor = excludecol
  } else if (isTextIn(mtext, maybe)) {
  	m.parentElement.parentElement.style.backgroundColor = maybecol
  } else {
  	m.parentElement.parentElement.style.backgroundColor = goodcol
  }
  m.parentElement.parentElement.style.border = "0px"
}
