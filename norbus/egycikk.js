window.addEventListener("load", init);

const tlegycikk = gsap.timeline();

function ID(elem) {
  return document.getElementById(elem);
}

function init() {
  megjelenit();
  scrollEgyCikk();
}


function scrollEgyCikk() {

  tlegycikk.fromTo(ID("egycikk"), 0, { y: "0%" }, { y: "-200%" });

  gsap.to(ID("egycikk"), {
    scrollTrigger: {
      trigger: ID("egycikk"),
      start: "top 90%",
      end: "top 90%",
      markers: false,
      toggleActions: "restart none reverse none",
    },
    y:"0%",
    duration:4
  })

}


function megjelenit() {
  let txt = "";
  const aktualisCikk = JSON.parse(localStorage.getItem("cikkek"));
  txt += `<div class="max-w-6xl mx-auto">`;
  txt += `<div class="flex flex-col box-border order-first w-full text-black border-solid mx:w-1/2 md:pl-10 md:order-none">`;
  for (data in aktualisCikk) {
    if (data === "cim") {
      //txt += `<div class="flex justify-between">`;
      txt += `<h1 class="font-bold tracking-tight text-center text-3xl" >${aktualisCikk[data]}</h1>`;
      //txt += "</div>";
    } else if (data.indexOf("bekezd") >= 0) {
      //txt += `<div class = "cikk">`;
      txt += `<p class="tracking-tight text-justify" >${aktualisCikk[data]}</p>`;
      //txt += "</div>";
    } else if (data.indexOf("alcim") >= 0) {
      //txt += `<div class = "alcim">`;
      txt += `<h2 class="font-bold text-left text-2xl" >${aktualisCikk[data]}</h2>`;
      //txt += "</div>";
    } else if (data === "szerzo") {
      //txt += `<div class = "szerzo">`;
      txt += `<p=>${aktualisCikk[data]}</p>`;
      //txt += "</div>";
    } else if (data === "link") {
      //txt += `<div class = "link">`;
      txt += `<a href="${aktualisCikk[data]}">Forrás</a>`;
      //txt += "</div>";
    } else if (data.indexOf("felsorolas") >= 0) {
      felsorTxt = "";
      felsorTxt += `<li>${aktualisCikk[data]}</li>`;
      txt += felsorTxt;
    } else if (data.indexOf("kep") >= 0) {
      //txt += `<div >`;
      txt += `<img src="${aktualisCikk[data]}" alt="kep" >`;
      //txt += `</div>`;
    }

  }
  txt += "</div>";
  txt += `<button onclick="location.href = 'cikkek.html';" type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Vissza</button>`;
  txt += "</div>";
  ID("egycikk").innerHTML += txt;
}


