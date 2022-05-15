window.addEventListener("load", init);

gsap.registerPlugin(ScrollTrigger);

function QS(elem) {
  return document.querySelector(elem);
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
const staggeran = QS(".staggeran");
var lathato = true;

const linkek = document.querySelectorAll(".container li");

var tl = gsap.timeline();
//scroll animációk
scrollAnimacio(".b1", cikkek);
scrollAnimacio(".b2", tesztek);
scrollAnimacio(".b3", galeria);

// föóldal anímációk
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
const navSlide = () => {
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

function init() {
  beuszasok();
  navSlide();
  tartalom();
  navIcon.addEventListener("click", videoNincs);
  generalas();
  animacioPirosa();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}

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

function generalas() {
  for (var index = 0; index < 64; index++) {
    staggeran.innerHTML += `<div class="kocka"></div>`;
  }

  fetch("ati/fooldal.json")
    .then((response) => response.json())
    .then((data) => {
      adatMegjelenites(data.adatok);
    })
    .catch((err) => console.log("hiba", err));
}
function adatMegjelenites(jsonName) {
  for (let index = 0; index < jsonName.length; index++) {
    txt = "";
    txt += `<h3>${jsonName[index].szoveg}</h3>`;

    QS(".adatok").innerHTML = txt;
    //var szamSzazalek = Number("0" + jsonName[index].sza);
  }
}

function animacioPirosa() {
  let targets = gsap.utils.toArray(".kocka").slice(0, 64 /** szamSzazalek*/);

  gsap.to(targets, {
    scale: 0.4,
    background: "red",
    duration: 2,
    stagger: {
      each: 0.1,
    },
    scrollTrigger: {
      trigger: staggeran,
      start: "top 90%",
      end: "top 90%",
      markers: true,
      toggleActions: "play none reverse none",
    },
  });
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
