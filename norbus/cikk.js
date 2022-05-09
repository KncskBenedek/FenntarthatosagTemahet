
function $(elem) {
  return document.querySelector(elem);
}

function tartalom(){
  fetch("forras.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.cikkek);
      megjelenit(data.cikkek);
    })
    .catch((err) => console.log("hiba", err));



}
function megjelenit(cikkek) {

  txt ="";
  for (let index = 0; index < cikkek.length; index++) {
    txt += `<h1>${cikkek[index].cim}</h1>`;
    for (const kulcs in cikkek[index].alcimek) {
      txt += `<h1>${kulcs}</h1>`;
    }
    if ("felsorolasok" in cikkek[index]) {
      txt += "<br>";
      for (const ertek in cikkek[index].felsorolasok) {
        txt += `<h1>${ertek}</h1>`;
      }
    } else {
      console.log("nincs");
    }
    
  }
  console.log(txt)
  $(".cikkek").innerHTML += txt;
}
  
  /*for (const cikkKulcs in cikkek[index]) {
      }
      
      //txt += `<li>${cikkek[index-1].cim[key]}</li>`;
    }

*/
    


tartalom();