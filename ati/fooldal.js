window.addEventListener("load", init);
window.addEventListener("resize", scrollAnimaciok);
gsap.registerPlugin(ScrollTrigger);

function QS(elem) {
  return document.querySelector(elem);
}
function ID(elem) {
  return document.getElementById(elem);
}
function $(elem) {
  return document.querySelectorAll(elem);
}
var tema = "";
var randomIndex = 0;
var leiras = [];
const hero = QS(".hero");
const slider = QS(".slider");
const navbar = QS(".navbar");
const navIcon = QS(".navicon");
const nav = QS(".container");
const footer = QS(".footer");
const cikkek = QS(".bejegyzes1");
const scroll = QS(".scroll");
const tesztek = QS(".bejegyzes2");
const galeria = QS(".bejegyzes3");
const content = QS(".content");
const kezdoGaleria = QS(".kezdoGaleria");

var lathato = true;

const linkek = document.querySelectorAll(".container li");

var tl = gsap.timeline();
//scroll animációk

// föóldal anímációk

function init() {
  beuszasok();
  navSlide();
  tartalom();
  scrollAnimaciok();
  galeriaScroll();
  navIcon.addEventListener("click", videoNincs);
  kepTartalom();
  // galeriaSzoveg();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}
function scrollAnimaciok() {
  scrollAnimacio(".b1", cikkek);
  scrollAnimacio(".b2", tesztek);
  scrollAnimacio(".b3", galeria);
}
function beuszasok() {
  tl.fromTo(
    hero,
    1,
    { height: "0%" },
    { height: "80%", ease: Power2.easeInOut }
  )
    .fromTo(
      hero,
      1.2,
      { width: "100%" },
      { width: "85%", ease: Power2.easeInOut }
    )
    .fromTo(
      slider,
      1.2,
      { backgroundPositionX: "100%" },
      { backgroundPositionX: "0%", ease: Power2.easeInOut },
      "-=1.2"
    )
    .fromTo(
      navbar,
      1.2,
      { y: "-100%" },
      { y: "0%", ease: Power2.easeInOut },
      "-=1.2"
    )
    .fromTo(
      footer,
      1.2,
      { y: "100%" },
      { y: "0%", ease: Power2.easeInOut },
      "-=1.2"
    );
}
//const navSlide = () => {
function navSlide() {
  navIcon.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    linkek.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `containerFade 0.5s ease forwards ${
          index / 7 + 0.4
        }s`;
      }
    });
    navIcon.classList.toggle("toggle");
  });
}

function scrollAnimacio(belso, kulso) {
  if (window.innerWidth < 770) {
    gsap.to(belso, {
      scrollTrigger: {
        trigger: belso,
        start: "top 90%",
        end: "top 90%",
        toggleActions: "play none none none",
      },
      x: 25,
      duration: 2,
      opacity: 1,
      color: "#2c364f;",
    });
    gsap.to(kulso, {
      scrollTrigger: {
        trigger: kulso,
        start: "top 90%",
        end: "top 90%",
        toggleActions: "play none none none",
      },
      duration: 2,
      backgroundPosition: "left",
      color: "#2c364f;",
    });
  } else {
    gsap.to(belso, {
      scrollTrigger: {
        trigger: belso,
        start: "top 90%",
        end: "top 90%",
        toggleActions: "play none none none",
      },
      x: kulso.offsetWidth / 3.7,
      duration: 2,
      opacity: 1,
      color: "#2c364f;",
    });
    gsap.to(kulso, {
      scrollTrigger: {
        trigger: kulso,
        start: "top 90%",
        end: "top 90%",
        toggleActions: "play none none none",
      },
      duration: 2,
      backgroundPosition: "left",
      color: "#2c364f;",
    });
  }
}
function galeriaScroll() {
  tl.fromTo(
    QS("#kep1"),
    0,
    { x: "0%" },
    { x: "-150%", ease: Power2.easeInOut }
  );
  tl.fromTo(
    QS("#kep2"),
    0,
    { x: "0%" },
    { x: "+150%", ease: Power2.easeInOut }
  );
  gsap.to(QS("#kep1"), {
    //QS("#kep1")
    scrollTrigger: {
      trigger: kezdoGaleria,
      start: "top 90%",
      end: "top 90%",
      toggleActions: "play none none none",
    },
    x: "0%",
    duration: "2",
    ease: Power0.easeIn,
  });
  gsap.to(QS("#kep2"), {
    //QS("#kep1")
    scrollTrigger: {
      trigger: kezdoGaleria,
      start: "top 90%",
      end: "top 90%",
      toggleActions: "play none none none",
    },
    x: "0%",
    duration: "2",
    ease: Power0.easeIn,
  });
}
function kepTartalom() {
  fetch("./szabrina/kepek.json")
    .then((response) => response.json())
    .then((data) => {
      leiras = data.leiras;
      kepGaleria(data.kepek);
    })
    .catch((err) => console.log("hiba", err));
}
function kepGaleria(jsonName) {
  randomIndex = Math.floor(Math.random() * jsonName.length);
  kepValtas("kep1", jsonName[randomIndex].kepek[0].substring(1));
  kepValtas("kep2", jsonName[randomIndex].kepek[1].substring(1));
  tema = jsonName[randomIndex].kollekcio;
  galeriaSzovegBehelyezes(tema);
  setInterval(() => {
    randomIndex = Math.floor(Math.random() * jsonName.length);
    let ujKepek = preLoad(randomIndex, jsonName);
    tema = jsonName[randomIndex].kollekcio;
    ID("kep1").style.opacity = "0";
    ID("kep1").style.transitionDuration = "600ms";
    ID("kep2").style.opacity = "0";
    ID("kep2").style.transitionDuration = "600ms";
    setTimeout(() => {
      kepValtas("kep1", ujKepek[0].src);
      kepValtas("kep2", ujKepek[1].src);
      galeriaSzovegBehelyezes(tema);
    }, 620);
    setTimeout(() => {
      ID("kep1").style.opacity = "1";
      ID("kep1").style.transitionDuration = "600ms";
      ID("kep2").style.opacity = "1";
      ID("kep2").style.transitionDuration = "600ms";
    }, 1000);
  }, 8000);
}
function kepValtas(id, src) {
  ID(id).src = src;
}
function preLoad(index, jsonName) {
  let kep1 = new Image();
  kep1.src = jsonName[index].kepek[0].substring(1);
  let kep2 = new Image();
  kep2.src = jsonName[index].kepek[1].substring(1);
  let ujKepek = [kep1, kep2];
  return ujKepek;
}

function galeriaSzovegBehelyezes(tema) {
  if (tema === "Zero") {
    QS(".galeriaSzoveg").innerHTML = `<h2>${leiras[0].cim}</h2>`;
    QS(".galeriaSzoveg").innerHTML += `<p>${leiras[0].szoveg}</p>`;
  } else {
    QS(".galeriaSzoveg").innerHTML = `<h2>${leiras[1].cim}</h2>`;
    QS(".galeriaSzoveg").innerHTML += `<p>${leiras[1].szoveg}</p>`;
  }
}

function tartalom() {
  fetch("ati/fooldal.json")
    .then((response) => response.json())
    .then((data) => {
      megjelenitBevezeto(data.bevezeto);
    })
    .catch((err) => console.log("hiba", err));
}
function megjelenitBevezeto(jsonName) {
  for (let index = 1; index < jsonName.length + 1; index++) {
    txt = "";
    txt += `<h2>${jsonName[index - 1].cim}</h2>`;
    for (const key in jsonName[index - 1].bekezdes) {
      txt += `<p>${jsonName[index - 1].bekezdes[key]}</p>`;
    }
    QS(".b" + index).innerHTML = txt;
  }
}
function videoNincs() {
  if (lathato) {
    hero.style.opacity = "0";
    hero.style.transition = "500ms";
    hero.style.zIndex = "-10";
    lathato = false;
  } else {
    hero.style.zIndex = "0";
    hero.style.opacity = "1";
    hero.style.transition = "500ms";
    lathato = true;
  }
}
