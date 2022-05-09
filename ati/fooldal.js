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
const headline = QS(".headline");
const navbar = QS(".navbar");
const navIcon = QS(".navicon");
const nav = QS(".container");
const footer = QS(".footer");
const cikkek = QS(".bejegyzes1");
const scroll = QS(".scroll");
const tesztek = QS(".bejegyzes2");
const galeria = QS(".bejegyzes3");

const linkek = document.querySelectorAll(".container li");

var tl = gsap.timeline();
//scroll animációk
scrollAnimacio(".b1", cikkek);
scrollAnimacio(".b2", tesztek);
scrollAnimacio(".b3", galeria);

// föóldal anímációk
tl.fromTo(hero, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "100%" },
    { width: "75%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1.2,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(
    headline,
    1.2,
    { x: "-100%" },
    { x: "10%", ease: Power2.easeInOut },
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
  navSlide();
  tartalom();
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
      x: cikkek.offsetWidth / 5,
      duration: 2,
      opacity: 1,
      color: "white",
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
      color: "white",
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
      x: cikkek.offsetWidth / 5,
      duration: 2,
      opacity: 1,
      color: "white",
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
      color: "white",
    });
  }
}
function tartalom() {
  fetch("ati/fooldal.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.bevezeto);
      megjelenit(data.bevezeto);
    })
    .catch((err) => console.log("hiba", err));
}
function megjelenit(bevezeto) {
  for (let index = 1; index < bevezeto.length + 1; index++) {
    txt = "";
    txt += `<h3>${bevezeto[index - 1].cim}</h3>`;
    for (const key in bevezeto[index - 1].bekezdes) {
      console.log(bevezeto[index - 1].bekezdes[key]);
      txt += `<li>${bevezeto[index - 1].bekezdes[key]}</li>`;
    }
    QS(".b" + index).innerHTML = txt;
  }
}
