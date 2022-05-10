
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

function benneVan(cikkJson, cikkNeve) {
  return Object.prototype.hasOwnProperty.call(cikkJson,cikkNeve)
}



function megjelenit(cikkek) {

  var bekezdSzam = 1;
  var alcimSzam = 1;

  for (const kulcs in cikkek) {
    txt = "";
    console.log(cikkek[kulcs].cim);
    if(benneVan(cikkek[kulcs], "cim")) {
      txt += `<h1>${cikkek[kulcs].cim}</h1>`;
    }
    if(benneVan(cikkek[kulcs], ("bekezd" + bekezdSzam))) {
      console.log(("bekezd" + bekezdSzam));
      bekezdes = ("bekezd" + bekezdSzam);
      txt += `<h3>${cikkek[kulcs][bekezdes]}</h3>`;
      bekezdSzam++;
    }
    if(benneVan(cikkek[kulcs], ("alcim" + alcimSzam))) {
      aclim = ("alcim" + alcimSzam);
      txt += `<p>${cikkek[kulcs][alcim]}</p>`;
      alcimSzam++;
    }
    
    if(benneVan(cikkek[kulcs], "kep")) {
      //txt += `<img${cikkek[kulcs].kep}`;
    }
    if(benneVan(cikkek[kulcs], "link")) {
      txt += `<a href="${cikkek[kulcs].link}">Forrás</a>`;
    } 
    if(benneVan(cikkek[kulcs], "szerzo")) {
      txt += `<p>${cikkek[kulcs].szerzo}</p>`;
    }
    }
    $(".cikkek").innerHTML = txt;
  }
    
  /*for (const cikkKulcs in cikkek[index]) {
      }
      
      //txt += `<li>${cikkek[index-1].cim[key]}</li>`;
    }

*/
    


tartalom();