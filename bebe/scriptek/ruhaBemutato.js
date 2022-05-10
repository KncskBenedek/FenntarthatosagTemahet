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
const kepekArr = [];
window.addEventListener("load", function () {
    if(localStorage.length === 0){

        ID("bemutat").innerHTML = "<h1>Nem szabadna ide így eljutnod ejnye bejnye.</h1>";
    
    }else{

    var ruhaJson = JSON.parse(localStorage.getItem("aktualis"));
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
        kepekArr.push(ruhaJson.kepek[index]);
        if (index === 0) {
            indicators += `<li data-target="#nagyKep" data-slide-to="${index}" class="active"></li>`;
            kepek += `<div class="carousel-item active"><img src="${ruhaJson.kepek[index]}" alt="Los Angeles" /></div>`;
        } else {
            indicators += `<li data-target="#nagyKep" data-slide-to="${index}"></li>`;
            kepek += `<div class="carousel-item"><img src="${ruhaJson.kepek[index]}" class="belsoNagyKep" alt="Los Angeles" /></div>`;
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
    console.log(kepekArr);
    kezd(kepekArr);
}
});

function kezd(tombKepek){
    let alsoKepek = "";
    if(tombKepek.length <=3){
        alsoKepek = `<div id="kisLeptetoCont"> <div id="kisKepek" class="${tombKepek.length === 2?"ketKisKep":"alapKiskepek"}">`;
    }else{
        alsoKepek = `<div id="kisLeptetoCont"> <div class="gomb"><button id="bal"><<</button> </div><div id="kisKepek" class="alapKiskepek">`;
    }
    let meddig = alsoKepek.length === 2?2:3;
    for (let index = 0; index < meddig; index++) {
        alsoKepek+= `<div> <img src="${tombKepek[index]}"></div>`;
    }    
    if(tombKepek.length <=3){
    alsoKepek += `</div></div> `;
    
    }else{
        alsoKepek += `</div> <div class="gomb"> <button id="jobb">>></button> </div> </div> `;
    }
    ID("kepekContainer").innerHTML += alsoKepek;
}
