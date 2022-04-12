window.addEventListener("load", init);

gsap.registerPlugin(gsap);
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
const linkek = document.querySelectorAll(".container li");

var tl = gsap.timeline();

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
}
