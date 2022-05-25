window.addEventListener("load", MSZ_init);

function CLASS(elem) {
  return document.getElementsByClassName(elem);}
function QS(elem) {
  return document.querySelector(elem);}
function $(elem) {
  return document.querySelector(elem);}
function ID(elem) {
  return document.getElementById(elem);}

let slideIndex = 0;
console.log(slideIndex);

function MSZ_init() {
  CLASS("zero")[0].addEventListener("click", function () {
    jsonbolOlvas("Zero", "0");
  });
  CLASS("kreativ")[0].addEventListener("click", function () {
    jsonbolOlvas("Kreativ", "1");
  });
  galAnim();
}

function MSZ_slideBetolt(kep) {
  let index = 0;
  var zeroTomb = [];
  var kreativTomb = [];
  kep.forEach((element) => {
    if (element.kollekcio == "Zero") {
      zeroTomb.push(index);
    } else {
      kreativTomb.push(index);
    }
    index++;
  });
  index = 0;
  setInterval(() => {
    ID("slideKep").src = kep[zeroTomb[index]].kepek[0];
    ID("slideKep2").src = kep[kreativTomb[index]].kepek[0];
    index++;
    if (index >= zeroTomb.length - 1 || index >= kreativTomb.length - 1) {
      index = 0;
    }
  }, 1500);
  if (index >= kep.length - 1) {
    index = 0;
  }
}

function galAnim() {
  gsap.set(".MSZ_header", { scale: 1 });
  gsap
    .timeline()
    .from(".MSZ_header", { duration: 1.5, yPercent: -100 })
    .from(".MSZ_article", { duration: 1.5, xPercent: -100 });
}

function MSZ_kepbetolt(data, koll) {
  QS("#MSZ_galeria").innerHTML = "";
  if ("content" in document.createElement("template")) {
    var tDIV = QS("#MSZ_tarolo");
    var galeriaDIV = QS("#MSZ_galeria");

    for (const key in data.kepek) {
      if (data.kepek[key].kollekcio == koll) {
        var clone = tDIV.content.cloneNode(true);
        var td = clone.querySelectorAll("span");
        td[0].textContent = data.kepek[key].tervezo;
        td[1].textContent = data.kepek[key].fotosnev;
        clone.querySelector(
          ".MSZ_kartya"
        ).style.backgroundImage = `url(${data.kepek[key].kicsiKepek[0]})`;
        clone.querySelector(".MSZ_btn").id = data.kepek[key].id;
        galeriaDIV.appendChild(clone);
      }
    }
  }

  const gombTomb = $(".MSZ_btn");
  gombTomb.forEach((elem) => {
    elem.addEventListener("click", function (event) {
      let aktID = event.target.id;
      let aktKep = data.kepek[aktID];
      kattint(aktKep);
    });
  });
}

function leirBetolt(leiras, resz) {
  for (const kulcs in leiras){
    console.log(leiras);
    if (leiras[kulcs].id == resz) {
      QS(".cim").innerHTML = `<h2>${leiras[kulcs].cim}</h2>`;
      QS(".sz").innerHTML = `<p>${leiras[kulcs].szoveg}</p><br><p>${leiras[kulcs].kezdo}</p>`;
      QS(".felsorol").innerHTML = `<ul>
      <li>${leiras[kulcs].felsorolas}</li>
      <li>${leiras[kulcs].felsorolas2}</li>
      <li>${leiras[kulcs].felsorolas3}</li>
    </ul>`;
      QS(".sz2").innerHTML = `<p>${leiras[kulcs].szoveg2}</p>`;
      QS(".tanar").innerHTML = `<p>${leiras[kulcs].tanar}</p>`;
      QS(
        ".tanar"
      ).innerHTML = `<h4>Felkészítő tanár:</h4><p>${leiras[kulcs].tanar}</p><ion-icon name="arrow-down-outline"></ion-icon>`;
    }
  }
}

function jsonbolOlvas(koll, resz) {
  fetch("kepek.json")
    .then((response) => response.json())
    .then((data) => { MSZ_kepbetolt(data, koll);
      MSZ_slideBetolt(data.kepek);
      leirBetolt(data.leiras, resz);
    });
}


function kattint(aktKep) {
  localStorage.setItem("aktualis", JSON.stringify(aktKep));
  window.location.assign(aktKep.tovabboldalra);
}
