window.addEventListener("load", init())

var cikklista = []

function init() {
  tartalom();

  //document.getElementById("tiszta").addEventListener("click", function() { document.getElementById("tiszta").innerHTML = "";});
  
}


function ID(elem) {
  document.getElementById(elem);
}



function $(elem) {
  return document.querySelector(elem);
}


function tartalom(){
  fetch("ujForras.json")
    .then((response) => response.json())
    .then((data) => {
      megjelenit(data.cikkek);
    })
    .catch((err) => console.log("hiba", err));
}

function megjelenit(cikkek,classSzam) {
  var cikkekSzama = 1;
  var cikklista =[]
  var cikkekSzamaSeged =1
  var cimSzam = 1;
  var cikkSzam =1;
  var alcimSzam = 1;
  var siker =0;
  

  for (const kulcs in cikkek) {
    let aktualisCikk = cikkek[kulcs];
    let txt = "";
    let txt2 = ""
    txt += `<div class = "${cikkekSzama}">`;
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
          cikklista.push(txt); 
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
        }else if (data === "szerzoSeged") {
          siker++;
          var seged =aktualisCikk[data]
          var szerzoszam = seged[0]
          var cikkSeged =cikklista[szerzoszam]
          if (siker=>1) {
            div = document.createElement('div');
            div.id = aktualisCikk[data];
            div.innerHTML = cikklista[szerzoszam];
            document.body.appendChild(div);
          }

          
        }
        

        
        txt += "</div>";
          }
        } 
        } 
        

