/* 
localStorage.getItem("aktualis");
 */
/*
    balra gomb
    jobra gomb
    kisképre kattintva nagyképként kiemel
*/
function ID(elem) {
    return document.getElementById(elem);
}
function $(elem) {
    return document.querySelector(elem);
}
window.addEventListener("load", function () {
    if(localStorage.length){
        ID("bemutato").innerHTML = "Nem szabadna itt lenned enyje benyje.";
    }else{
    var ruhaJson = JSON.parse(localStorage.getItem("aktualis"));

    ID("bemutat").innerHTML += "<h1>Nem szabadna itt lenned ejnye bejnye</h1>";

    // console.log(cucc);
    ID("ruhaLeiras").innerHTML = ruhaJson.szoveg;
    ID("tervezo").innerHTML = "Tervező: " + ruhaJson.tervezo;
    ID("fotos").innerHTML = "Fotós: " + ruhaJson.fotosnev;
    ID("modell").innerHTML = "Modell: " + ruhaJson.modell;

    let indicators = `<ul class="carousel-indicators">`;
    let kepek = `<div class="carousel-inner">`;

    let index = 0;

    //slide elemek, kepek elemek
    let hossz = ruhaJson.kepek.length;
    for (let index = 0; index < hossz; index++) {
        if (index === 0) {
            indicators += `<li data-target="#nagyKep" data-slide-to="${index}" class="active"></li>`;
            kepek += `<div class="carousel-item active"><img src="${ruhaJson.kepek[index]}" alt="Los Angeles" /></div>`;
        } else {
            indicators += `<li data-target="#nagyKep" data-slide-to="${index}"></li>`;
            kepek += `<div class="carousel-item"><img src="${ruhaJson.kepek[index]}" alt="Los Angeles" /></div>`;
        }

    }
    indicators += "</ul>";
    kepek += `</div>`;

    let gombok = `<a class="carousel-control-prev" href="#nagyKep" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </a>
          <a class="carousel-control-next" href="#nagyKep" data-slide="next">
            <span class="carousel-control-next-icon"></span>
          </a>`;
    console.log(indicators);
    console.log(kepek);
    console.log(gombok);
    let nagykep = indicators + kepek + gombok;
    ID("nagyKep").innerHTML += nagykep;

    localStorage.clear();
}
});