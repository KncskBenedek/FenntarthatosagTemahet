window.addEventListener("load", init);
jsonAdat = []
const tlcikk = gsap.timeline();
function init() {
  if(sessionStorage.getItem("betoltszam") === null) {
    sessionStorage.setItem("betoltszam", 1);
    tartalom();
    scrollCikk();
  }else{
    tartalom();
    scrollCikkjobbrol();
  }
}

function clikkHozzaadas() {
  for (let index = 0; index < 10; index++) {
    ID(index).addEventListener("click", clikkTarolas);
  }

}

function scrollCikkjobbrol () {

  tlcikk.fromTo($(".scrollanimacio"), 0,{x:"0%"}, {x:"200%"});
  
    gsap.to($(".scrollanimacio"),{
      scrollTrigger: {
        trigger: $(".scrollanimacio"),
        start: "top 90%",
        end: "top 90%",
        markers: false,
        toggleActions: "restart none reverse none",
      },
      x:"0%",
      duration:1.5
    })
  
  }

function scrollCikk () {

tlcikk.fromTo($(".scrollanimacio"), 0,{y:"0%"}, {y:"-200%"});

  gsap.to($(".scrollanimacio"),{
    scrollTrigger: {
      trigger: $(".scrollanimacio"),
      start: "top 90%",
      end: "top 90%",
      markers: false,
      toggleActions: "restart none reverse none",
    },
    y:"0%",
    duration:2.5
  })

}

function clikkTarolas() {
  let index = parseInt(event.currentTarget.id);
  localStorage.setItem("cikkek", JSON.stringify(jsonAdat[index])); // jsonAdat[index]);
  window.location.assign("cikk.html");
}

function ID(elem) {
  return document.getElementById(elem);
}

function $(elem) {
  return document.querySelector(elem);
}

function tartalom() {
  fetch("szovegSzerzo.json")
    .then((response) => response.json())
    .then((data) => {
      megjelenit(data.szovegSzerzo);
    })
    .catch((err) => console.log("hiba", err));

    fetch("ujForras.json")
    .then((response) => response.json())
    .then((adat) => {
      jsonAdat = adat.cikkek;
    })
    .catch((err) => console.log("hiba", err));

  }

function megjelenit(szerzokSzovege) {
  var index = 0;
  let txt = "";
  txt += `<div class="grid grid-cols-3 gap-10 mt-10 sm:grid-cols-8 lg:grid-cols-19 sm:px-20 xl:px-10">`;
  for (const kulcs in szerzokSzovege) {
    let aktualisSzerzoSzoveg = szerzokSzovege[kulcs];
    for (const kulcs2 in aktualisSzerzoSzoveg) {
      if (kulcs2 === "szoveg") {
        txt += `<div id="${index}"
        class="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 animacio"
        href="cikk.html">`;
        txt += `<div class="text-xl font-medium">${aktualisSzerzoSzoveg[kulcs2]}</div>`;
      } else if (kulcs2 === "szerzo") {
        txt += `<p class="text-base text-center">${aktualisSzerzoSzoveg[kulcs2]}</p>`;
      }
    }
    txt += `</div>`;
    index++;
  }
  $(".cikkek").innerHTML = txt;
  clikkHozzaadas();
}

