gsap.registerPlugin(gsap);
function QS(elem){
    return document.querySelector(elem)
}

const hero = QS('.hero');
const slider = QS('.slider');
const headline = QS('.headline');
const navbar = QS('.navbar');

var tl = gsap.timeline();

tl.fromTo(hero,1,{height: "0%"},{ height:"80%", ease: Power2.easeInOut})
.fromTo(hero, 1.2,{width: "100%"},{ width:"80%", ease: Power2.easeInOut})
.fromTo(slider,1.2,{x:"-100%"},{x:"0%", ease: Power2.easeInOut},"-=1.2")
.fromTo(headline,1.2,{x:"-100%"},{x:"10%", ease: Power2.easeInOut},"-=1.2")
.fromTo(navbar,1.2,{x:"-100%"},{x:"0%", ease: Power2.easeInOut},"-=1.2")
