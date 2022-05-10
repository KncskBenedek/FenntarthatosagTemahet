
function $(elem) {
  return document.querySelector(elem);
}

function tartalom(){
  fetch("ujForras.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.cikkek);
      megjelenit(data.cikkek);
    })
    .catch((err) => console.log("hiba", err));
}

function megjelenit(cikkek) {
  var cikkekSzama = 1;
  var cimSzam = 1;
  var cikkSzam =1;
  var alcimSzam = 1;
  for (const kulcs in cikkek) {
    let aktualisCikk = cikkek[kulcs];
    let txt = "";
    txt += `<div class = "${cikkekSzama}">`;
    cikkekSzama++;
    for (const key in aktualisCikk) {
        if(key === "cim") {
          txt += `<div class = "cim">`;
          txt += `<h1>${aktualisCikk[key]}</h1>`;
          txt += "</div>";
        }else if (key.indexOf("bekezd")>=0){
          txt += `<div class = "cikk">`;
          txt += `<p>${aktualisCikk[key]}</p>`;
          txt += "</div>";
        }else if (key.indexOf("alcim")>=0){
          txt += `<div class = "alcim">`;
          txt += `<h2>${aktualisCikk[key]}</h2>`;
          txt += "</div>";
        } else if (key === "szerzo") {
          txt += `<div class = "szerzo">`;
          txt += `<p=>${aktualisCikk[key]}</p>`;
          txt += "</div>";
        }else if (key === "link") {
          txt += `<div class = "link">`;
          txt += `<a href="${aktualisCikk[key]}">Forrás</a>`;
          txt += "</div>";
        } else if (key.indexOf("felsorolas")>=0) {
          //felsorTxt = `<ul>`;
          //console.log(felsorTxt);
          felsorTxt = "";
          felsorTxt += `<li>${aktualisCikk[key]}</li>`;
          console.log(felsorTxt);
          //felsorTxt = "";
          //felsorTxt = `</ul>`;
          //console.log(felsorTxt);
          txt += felsorTxt;
        }else if (key.indexOf("kep")>=0) {
          txt += `<div class = "kep">`;
          txt += `<img src= "${aktualisCikk[key]}" alt="kep">`;
          txt += "</div>";
        }
      }
      txt += "</div>";
      $(".cikkek").innerHTML += txt;
    }
  }
    
tartalom();