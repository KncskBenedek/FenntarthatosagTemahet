window.addEventListener("load", init);

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

var szazalekok = [];
var szovegek = [];

let szamSzazalek = 0;
var lathato = true;

const linkek = document.querySelectorAll(".container li");

var tl = gsap.timeline();
//scroll animációk
scrollAnimacio(".b1", cikkek);
scrollAnimacio(".b2", tesztek);
scrollAnimacio(".b3", galeria);

// föóldal anímációk

function init() {
  beuszasok();
  navSlide();
  tartalom();
  navIcon.addEventListener("click", videoNincs);
  kepTartalom();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
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
      { x: "-100%" },
      { x: "0%", ease: Power2.easeInOut },
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
  function navSlide () {
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
};

function scrollAnimacio(belso, kulso) {
  if (window.innerWidth <= 770) {
    gsap.to(belso, {
      scrollTrigger: {
        trigger: belso,
        start: "top 90%",
        end: "top 90%",
        markers: true,
        toggleActions: "restart none reverse none",
      },
      x: kulso.offsetWidth / 4,
      duration: 2,
      opacity: 1,
      color: "#2c364f;",
    });
    gsap.to(kulso, {
      scrollTrigger: {
        trigger: kulso,
        start: "top 90%",
        end: "top 90%",
        markers: true,
        toggleActions: "restart none reverse none",
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
        scrub: true,
        markers: true,
        toggleActions: "restart none reverse none",
      },
      x: kulso.offsetWidth / 4,
      duration: 2,
      opacity: 1,
      color: "#2c364f;",
    });
    gsap.to(kulso, {
      scrollTrigger: {
        trigger: kulso,
        start: "top 90%",
        end: "top 90%",
        markers: true,
        toggleActions: "restart none reverse none",
      },
      duration: 2,
      backgroundPosition: "left",
      color: "#2c364f;",
    });
  }
}
function kepTartalom() {
  fetch("szabrina/kepek.json")
    .then((response) => response.json())
    .then((data) => {
      kepGaleria(data.kepek);
    })
    .catch((err) => console.log("hiba", err));
}

function kepGaleria(jsonName) {
  console.log(jsonName);
  let randomIndex = Math.floor(Math.random() * jsonName.length);
  ID("kep1").src = jsonName[randomIndex].kepek[0];
  ID("kep2").src = jsonName[randomIndex].kepek[1];
  console.log(randomIndex);
  setInterval(() => {
    randomIndex = Math.floor(Math.random() * jsonName.length);
    console.log(randomIndex);
    
    ID("kep1").style.opacity = "0";
    ID("kep1").style.transitionDuration = "500ms";
    ID("kep2").style.opacity = "0";
    ID("kep2").style.transitionDuration = "500ms";
    setTimeout(() => {
      ID("kep2").src = jsonName[randomIndex].kepek[1];
      ID("kep1").src = jsonName[randomIndex].kepek[0];
    }, 500);
    setTimeout(() => {
      ID("kep1").style.opacity = "1";
      ID("kep1").style.transitionDuration = "500ms";
      ID("kep2").style.opacity = "1";
      ID("kep2").style.transitionDuration = "500ms";
    }, 550);
   
    
  }, 5000);
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
    txt += `<h3>${jsonName[index - 1].cim}</h3>`;
    for (const key in jsonName[index - 1].bekezdes) {
      txt += `<li>${jsonName[index - 1].bekezdes[key]}</li>`;
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
