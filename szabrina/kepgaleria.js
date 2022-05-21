window.addEventListener("load", MSZ_init);

function CLASS(nev) {
  return document.getElementsByClassName(nev);
}

let slideIndex = 0;

function MSZ_init() {
  CLASS("zero")[0].addEventListener("click", function () { jsonbolOlvas("Zero"), leirJson("0")});
  CLASS("kreativ")[0].addEventListener("click", function () { jsonbolOlvas("Kreativ"), leirJson("1")});
  slJson();
}

function MSZ_slideBetolt(kep) {
  let index = 1;
  setInterval(() => {
    let kepTomb = kep[index].kepek;
    if (kep[index].kollekcio == "Zero") {
      document.getElementById("slideKep").src = kepTomb[0];
    }else{
      document.getElementById("slideKep2").src = kepTomb[0];
    }
    index++;
    if (index >= kep.length - 1) {
      index = 0;
    }
  }, 1000);
}

function MSZ_kepbetolt(data, koll) {
  console.log(data);
  document.querySelector("#MSZ_galeria").innerHTML = "";
  if ("content" in document.createElement("template")) {
    var tDIV = document.querySelector("#MSZ_tarolo");
    var galeriaDIV = document.querySelector("#MSZ_galeria");

    for (const key in data.kepek) {
      if (data.kepek[key].kollekcio == koll) {
        var clone = tDIV.content.cloneNode(true);
        var td = clone.querySelectorAll("span");
        td[0].textContent = data.kepek[key].tervezo;
        td[1].textContent = data.kepek[key].fotosnev;
        clone.querySelector(".MSZ_kartya").style.backgroundImage = `url(${data.kepek[key].kicsiKepek[0]})`;
        clone.querySelector(".MSZ_btn").id = data.kepek[key].id;
        //clone.querySelector("a").href = data.kepek[key].tovabboldalra;
        galeriaDIV.appendChild(clone);
      }
    }
  }
  console.log(document.querySelectorAll(".MSZ_btn"));
  const gombTomb = document.querySelectorAll(".MSZ_btn");
  gombTomb.forEach((elem) => {
    elem.addEventListener("click", function (event) {
      console.log(event.target.id); //ez a kattintott gomb sorszáma
      let aktID = event.target.id;
      console.log(data.kepek[aktID]); //ez a kattintott gombhoz tartozó adat
      let aktKep = data.kepek[aktID];
      kattint(aktKep);
    });
  });
}

function leirBetolt(szov, resz){
  if(resz=="0"){
    document.querySelector(".cim").innerHTML=`<h2>${szov[0].cim}</h2>`;
    document.querySelector(".sz").innerHTML=`<p>${szov[0].szoveg}</p><br><p>${szov[0].kezdo}</p>`;
    document.querySelector(".felsorol").innerHTML=`<ul>
    <li>${szov[0].felsorolas}</li>
    <li>${szov[0].felsorolas2}</li>
    <li>${szov[0].felsorolas3}</li>
  </ul>`;
  document.querySelector(".sz2").innerHTML=`<p>${szov[0].szoveg2}</p>`;
  document.querySelector(".tanar").innerHTML=`<p>${szov[0].tanar}</p>`
  document.querySelector(".tanar").innerHTML=`<h4>Felkészítő tanár:</h4><p>${szov[0].tanar}</p>`
  }else{
    document.querySelector(".cim").innerHTML=`<h2>${szov[1].cim}</h2>`;
    document.querySelector(".sz").innerHTML=`<p>${szov[1].szoveg}</p>`;
    document.querySelector(".sz2").innerHTML=`<p>${szov[1].szoveg2}</p>`;
    document.querySelector(".felsorol").innerHTML="";
    document.querySelector(".tanar").innerHTML=`<h4>Felkészítő tanár:</h4><p>${szov[1].tanar}</p>`
  }

}

function jsonbolOlvas(koll) {
  fetch('kepek.json')
    .then(response => response.json())
    .then(data => MSZ_kepbetolt(data, koll));
}
function slJson() {
  fetch('kepek.json')
    .then(response => response.json())
    .then(adat => MSZ_slideBetolt(adat.kepek));
}
function leirJson(resz){
  fetch('kepek.json')
    .then(response => response.json())
    .then(leir => leirBetolt(leir.leiras,resz));
}

function kattint(aktKep) {
  console.log(aktKep);
  localStorage.setItem("aktualis", JSON.stringify(aktKep));
  //ezzel lépek a következő oldalra
  window.location.assign(aktKep.tovabboldalra);
}
