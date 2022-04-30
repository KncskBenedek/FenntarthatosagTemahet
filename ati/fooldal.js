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
const cikkek = QS(".cikkek");
const scroll = QS(".scroll");
const bikkek = QS(".bikkek");

const linkek = document.querySelectorAll(".container li");

var tl = gsap.timeline();
//scroll animációk
gsap.to(".c", {
  scrollTrigger: {
    trigger: ".c",
    start: "top 800px",
    end: "top 900px",
    markers: true,
    toggleActions: "restart none reverse none",
  },
  x: cikkek.offsetWidth / 2 - 50,
  duration: 2,
  opacity: 1,
  backgroundPosition: "left",
  color: "white",
});
gsap.to(cikkek, {
  scrollTrigger: {
    trigger: cikkek,
    start: "top 800px",
    end: "top 900px",
    markers: true,
    toggleActions: "restart none reverse none",
  },
  duration: 2,
  backgroundPosition: "left",
  color: "white",
});
gsap.to(".b", {
  scrollTrigger: {
    trigger: ".b",
    start: "top 800px",
    end: "top 900px",
    markers: true,
    toggleActions: "restart none reverse none",
  },
  x: cikkek.offsetWidth / 2 - 50,
  duration: 2,
  opacity: 1,
  backgroundPosition: "left",
  color: "white",
});
gsap.to(bikkek, {
  scrollTrigger: {
    trigger: bikkek,
    start: "top 800px",
    end: "top 900px",
    markers: true,
    toggleActions: "restart none reverse none",
  },
  duration: 2,
  backgroundPosition: "left",
  color: "white",
});

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
}
