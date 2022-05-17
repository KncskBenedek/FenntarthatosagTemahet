window.addEventListener("load", init);
localStorage.setItem("elem", "a kurva js");

var jsonAdat = [];

function init() {
  tartalom();
  ok();
}

function ok () {
  for (let index = 0; index <10; index++) {
    ID(index).addEventListener("click", asd);
  }

}
function asd () {
  let index = parseInt(event.target.id);
  localStorage.setItem("egycikk",JSON.stringify(jsonAdat[index]));// jsonAdat[index]);
  window.location.assign("cikk.html");
};

function ID(elem) {
  return document.getElementById(elem);
}



function $(elem) {
  return document.querySelector(elem);
}


function tartalom(){
  fetch("ujForras.json")
    .then((response) => response.json())
    .then((data) => {
      jsonAdat = data.cikkek;
      megjelenit(data.cikkek);
    })
    .catch((err) => console.log("hiba", err));
}

function megjelenit(cikkek) {
  var cikkekSzama = 1;

  for (const kulcs in cikkek) {
    let aktualisCikk = cikkek[kulcs];
    let txt = "";
    //txt += `<div class = "${cikkekSzama}">`;
    cikkekSzama++;
    for (const data in aktualisCikk) {
        if(data === "cim") {
          txt += `<div class = "cim">`;
          txt += `<h1>${aktualisCikk[data]}</h1>`;
          txt += "</div>";
        }else if (data.indexOf("bekezd")>=0){
          txt += `<div class = "cikk">`;
          txt += `<p>${aktualisCikk[data]}</p>`;
          txt += "</div>";
        }else if (data.indexOf("alcim")>=0){
          txt += `<div class = "alcim">`;
          txt += `<h2>${aktualisCikk[data]}</h2>`;
          txt += "</div>";
        } else if (data === "szerzo") {
          txt += `<div class = "szerzo">`;
          txt += `<p=>${aktualisCikk[data]}</p>`;
          txt += "</div>"; 
        }else if (data === "link") {
          txt += `<div class = "link">`;
          txt += `<a href="${aktualisCikk[data]}">Forrás</a>`;
          txt += "</div>";
        } else if (data.indexOf("felsorolas")>=0) {
          felsorTxt = "";
          felsorTxt += `<li>${aktualisCikk[data]}</li>`;
          txt += felsorTxt;
        }else if (data.indexOf("kep")>=0) {
          txt += `<div class = "kep">`;
          txt += `<img src= "${aktualisCikk[data]}" alt="kep">`;
          txt += "</div>";
        }
        //txt += "</div>";
          }
        }
        
        
        } 
        

