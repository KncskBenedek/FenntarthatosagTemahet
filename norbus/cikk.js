
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
  for (const kulcs in cikkek) {
    let aktualisCikk = cikkek[kulcs];
    let txt = "";
    txt += `<div class = "${cikkekSzama}">`;
    cikkekSzama++;
    for (const key in aktualisCikk) {
        if(key === "cim") {
          txt += `<h1>${aktualisCikk[key]}</h1>`;
        }else if (key.indexOf("bekezd")>=0){
          txt += `<p>${aktualisCikk[key]}</p>`;
        }else if (key.indexOf("alcim")>=0){
          txt += `<h2>${aktualisCikk[key]}</h2>`;
        } else if (key === "szerzo") {
          txt += `<p>${aktualisCikk[key]}</p>`;
        }else if (key === "link") {
          txt += `<a href="${aktualisCikk[key]}">Forrás</a>`;
        } else if (key.indexOf("felsorolas")>=0) {
          txt += `<ul>`;
          txt += `<li>${aktualisCikk[key]}</li>`;
          txt += `</ul>`;
        }else if (key.indexOf("kep")>=0) {
          txt += `<img src= "${aktualisCikk[key]}" alt="kep">`;
        }
      }
      txt += "</div>";
      $(".cikkek").innerHTML += txt;
    }
  }
    
tartalom();