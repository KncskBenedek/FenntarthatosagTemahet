window.addEventListener("load", init);

jsonAdat = []
const tl = gsap.timeline();
function init() {
  tartalom();
  scrollCikk();
}

function clikkHozzaadas() {
  for (let index = 0; index < 10; index++) {
    ID(index).addEventListener("click", clikkTarolas);
  }

}

function scrollCikk () {
  gsap.to($(".scrollanimacio"),{
    scrollTrigger: {
      trigger: $(".scrollanimacio"),
      start: "top 90%",
      end: "top 90%",
      markers: true,
      toggleActions: "restart none reverse none",
    },
    
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
  txt += `<div class="grid grid-cols-3 gap-10 mt-10 sm:grid-cols-8 lg:grid-cols-19 sm:px-8 xl:px-0">`;
  for (const kulcs in szerzokSzovege) {
    let aktualisSzerzoSzoveg = szerzokSzovege[kulcs];
    for (const kulcs2 in aktualisSzerzoSzoveg) {
      if (kulcs2 === "szoveg") {
        txt += `<div id="${index}"
        class="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 border-2 border-black rounded-md animacio"
        href="cikk.html">`;
        txt += `<div class="text-xl font-medium text-gray-700">${aktualisSzerzoSzoveg[kulcs2]}</div>`;
      } else if (kulcs2 === "szerzo") {
        txt += `<p class="text-base text-center text-gray-500">${aktualisSzerzoSzoveg[kulcs2]}</p>`;
      }
    }
    txt += `</div>`;
    index++;
  }
  $(".cikkek").innerHTML += txt;
  clikkHozzaadas();
}

