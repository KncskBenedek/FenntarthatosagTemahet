function $(elem) {
  return document.querySelectorAll(elem);
}

function S(elem) {
  return document.querySelector(elem);
}

window.addEventListener("load", init);
const KERDESEKALTALANOS = [];
const KERDESEKKOZEP = [];
const KERDESEKFELNOTT = [];

const KERDESEKSZAMA = [11, 12, 15];
const DOBOZOKID = ["altalanos", "kozep", "felnott"];

const KERDESEK = [KERDESEKALTALANOS, KERDESEKKOZEP, KERDESEKFELNOTT];

const HELYESVALASZOK = [];
const HELYESCHECKBOXVALASZOK = [];
let pontszam = 0;
let szazalek;
let dobozIndex;

const FAJLOK = ["json/altIsk.json", "json/kozIsk.json", "json/feln.json"]; //json fájlok
const H1IDK = [S("#alt"), S("#kozp"), S("#feln")]; //h1 tag id-jei querySelectorban elhelyezve
const GOMBOK = [S("#gombAlt"), S("#gombKozp"), S("#gombFeln")]; //gombok id-jei querySelectorban elhelyezve
const JSONDATA = [];

function init() {
  const BEZAR = document.getElementsByClassName("bezar")[0];
  const FELUGRO = document.getElementById("felugro");

  BEZAR.addEventListener("click", function () {
    FELUGRO.style.display = "none";
  });

  H1IDK[0].addEventListener("click", tesztBeilleszt);
  H1IDK[1].addEventListener("click", tesztBeilleszt);
  H1IDK[2].addEventListener("click", tesztBeilleszt);
  scrolltesztek();
}

function nullazas() { //lenullázza a pontszámot
  pontszam = 0;
}

function tesztBeilleszt(event) { //egyszer beilleszti az adott tesztet
  dobozIndexBeallito(event);
  beolvas(FAJLOK[dobozIndex]);
  nullazas();
  megjelenit(event);
  $(".dl_tesztdoboz")[dobozIndex].style.display = "block";
  GOMBOK[dobozIndex].style.display = "block";
  H1IDK[dobozIndex].removeEventListener("click", tesztBeilleszt);
  H1IDK[dobozIndex].addEventListener("click", megjelenit);
}

function megjelenit(event) { //megjeleníti az adott div-et és a hozzá tartozó gombot a gombMegjelenit() használatával
  nullazas();
  dobozIndexBeallito(event);
  const DOBOZ = $(".dl_tesztdoboz")[dobozIndex];
  if (DOBOZ.style.display === "none") {
    DOBOZ.style.display = "block";
    gombMegjelenit("block");
  } else {
    gombMegjelenit("none");
    DOBOZ.style.display = "none";
  }
}

const tltesztek = gsap.timeline();

function scrolltesztek() {

  tltesztek.fromTo($(".scrollanimacio"), 0, { y: "0%" }, { y: "-200%" });

  gsap.to($(".scrollanimacio"), {
    scrollTrigger: {
      trigger: $(".scrollanimacio"),
      start: "top 90%",
      end: "top 90%",
      markers: false,
      toggleActions: "restart none reverse none",
    },
    y: "0%",
    duration: 3
  })

}


function dobozIndexBeallito(event) { //beállítja hogy melyik indexű diven tartózkodunk
  if (event.target.id === "alt") {
    dobozIndex = 0;
  }
  if (event.target.id === "kozp") {
    dobozIndex = 1;
  }
  if (event.target.id === "feln") {
    dobozIndex = 2;
  }
}

function gombMegjelenit(mutat) { //megjeleníti az adott küldés gombot
  GOMBOK[dobozIndex].style.display = mutat;
  GOMBOK[dobozIndex].addEventListener("click", gombEsemeny);
}

function beolvas(fajl) { //beolvassa a JSON fájlt
  fetch(fajl)
    .then((res) => res.json())
    .then((data) => {
      tombJSONDATAFeltolt(data);
      JSONDATA[dobozIndex].forEach((elem) => {
        KERDESEK[dobozIndex].push(elem);
      });
      feldolgoz(KERDESEK[dobozIndex], dobozIndex);
    })
    .catch((err) => {
      console.log(err);
    });
}

function tombJSONDATAFeltolt(data) { //feltölti a JSONDATA tömböt a megfelelő adatokkal
  JSONDATA[0] = data.altIsk;
  JSONDATA[1] = data.kozIsk;
  JSONDATA[2] = data.feln;
}

function feldolgoz(tomb, index) { //feldolgozza a JSON fájlból kapott adatokat
  const SZULO = $(".dl_tesztdoboz");
  let txt = "";
  tomb.forEach((tipus) => {
    for (const key in tipus) {
      if (key === "radio") {
        const kerdesek = tipus["radio"];
        txt += kerdesekBeilleszt(kerdesek, key);
      } else if (key === "checkbox") {
        const kerdesek = tipus["checkbox"];
        txt += kerdesekBeilleszt(kerdesek, key);
      }
    }
    txt += "<br>";
  });
  SZULO[index].innerHTML += txt;
}

function valaszokEll(dobozId) { //ellenőrzi a válaszokat
  const VALASZOK = document.getElementById(`${dobozId}`).getElementsByTagName("input");
  let valasztott;

  for (let i = 0; i < VALASZOK.length; i++) {
    let valasz = VALASZOK[i];
    if (valasz.checked) {
      valasztott = valasz.value;
      valasz.checked = false;
      if (HELYESVALASZOK.includes(valasztott)) {
        pontszam++;
      }
      if (HELYESCHECKBOXVALASZOK.includes(valasztott)) {
        pontszam++;
      }
    }
  }
}

function kerdesekBeilleszt(kerdesek, tipus) { //a kérdéseket illeszti be a válaszokkal együtt
  let txt = "";
  let kerdesSzam = 0;
  kerdesek.forEach((kerdes) => {
    for (const key in kerdes) {
      if (tipus === "checkbox") {
        if (!(key === "helyesV1") && !(key === "helyesV2")) {
          if (key === "kerdes") {
            txt += `<div>${kerdes[key]}</div>`;
            kerdesSzam++;
          } else {
            txt += `<input type="${tipus}" name="valasz${kerdesSzam}" value="${kerdes[key]}">${kerdes[key]}<br>`;
          }
        } else {
          HELYESCHECKBOXVALASZOK.push(kerdes[key]);
        }
      } else {
        if (!(key === "helyesV")) {
          if (key === "kerdes") {
            txt += `<div>${kerdes[key]}</div>`;
            kerdesSzam++;
          } else {
            txt += `<input type="radio" name="valasz${kerdesSzam}" value="${kerdes[key]}">${kerdes[key]}<br>`;
          }
        } else {
          HELYESVALASZOK.push(kerdes[key]);
        }
      }
    }
  });
  return txt;
}

function szazalekSzamitas(kerdesSzam) { //felugró dobozban lévő százalékot számítja ki
  szazalek = (pontszam / kerdesSzam) * 100;
  szazalek = szazalek.toFixed(2);
}

function vege(kerdesSzam) { //felugró doboz szövege
  szazalekSzamitas(kerdesSzam);
  document.getElementById("szov").innerHTML = `Az elért pontszámod: ${pontszam}.<br> Válaszaidat ${szazalek}%-ban válaszoltad meg helyesen!`;
  document.getElementById("felugro").style.display = "block";
}

function gombEsemeny(event) { //küldésgombok eseménye
  dobozIndexBeallito(event);
  megjelenit(event);
  valaszokEll(DOBOZOKID[dobozIndex]);
  vege(KERDESEKSZAMA[dobozIndex]);
  GOMBOK[dobozIndex].removeEventListener("click", gombEsemeny);
}
