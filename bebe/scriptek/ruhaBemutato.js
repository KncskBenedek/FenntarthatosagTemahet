/* 
localStorage.getItem("aktualis");
 */
/*
    balra gomb
    jobra gomb
    kisképre kattintva nagyképként kiemel
*/
var lepteto = 0;
var vege = 2;
function ID(elem) {
    return document.getElementById(elem);
}
function $(elem) {
    return document.querySelector(elem);
}
function QS(elem){
    return document.querySelectorAll(elem);
}
const kepekArr = [];
window.addEventListener("load", function () {
    if(localStorage.length === 0){

        ID("bemutat").innerHTML = "<h1>Nem szabadna ide így eljutnod ejnye bejnye.</h1>";
    
    }else{

    var ruhaJson = JSON.parse(localStorage.getItem("aktualis"));
    
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
            indicators += `<li data-target="#nagyKep" data-slide-to="${index}" class="ind active"></li>`;
            kepek += `<div class="carousel-item active"><img src="${ruhaJson.kepek[index]}" alt="Los Angeles" /></div>`;
        } else {
            indicators += `<li data-target="#nagyKep" data-slide-to="${index}" class="ind"></li>`;
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

    let nagykep = indicators + kepek + gombok;
    ID("nagyKep").innerHTML += nagykep;
   
    kezd(kepekArr);
    let ho = kepekArr.length === 2? 2: 3;
    for (let index = 0; index < ho; index++) {
        ID(`kisKep${index}`).addEventListener("click", nagyKepLesz);
    }

}
});

function kezd(tombKepek){
    let alsoKepek = "";
    if(tombKepek.length <=3){
        alsoKepek = `<div id="kisLeptetoCont"> <div id="kisKepek" class="${tombKepek.length === 2?"ketKisKep":"alapKiskepek"}">`;
    }else{
        alsoKepek = `<div id="kisLeptetoCont"> <div class="gomb"><button id="bal"><<</button> </div><div id="kisKepek" class="alapKiskepek">`;
    }
    let meddig = tombKepek.length === 2?2:3;
    for (let index = 0; index < meddig; index++) {
        alsoKepek+= `<div> <img id="kisKep${index}" src="${tombKepek[index]}" class="kicsi"></div>`;
    }    
    if(tombKepek.length <=3){
    alsoKepek += `</div></div> `;
    
    }else{
        alsoKepek += `</div> <div class="gomb"> <button id="jobb">>></button> </div> </div> `;
    }
    ID("leiras").innerHTML += alsoKepek;

    if(kepekArr.length > 3){
    ID("jobb").addEventListener("click", jobbra);
    ID("bal").addEventListener("click", balra);
}
    
}

function balra() {
    let n = lepteto;
    
    for (let index = 0; index < 3; index++) {
        lepteto++;
        
        if(lepteto < kepekArr.length){
            ID("kisKep"+index).src = kepekArr[lepteto];
            if(index === 0){
                
                n = lepteto;
            }
        }else{
            lepteto = 0;
            if(index === 0){
                
                n = lepteto;
            }
            ID("kisKep"+index).src = kepekArr[lepteto];
        }
    }
    vege = lepteto
    lepteto = n;
   
}

function jobbra() {
    let n = 0;
    for (let index = 2; index>=0 ; index--) {
        vege--;
        if(vege >= 0){
            ID("kisKep"+index).src = kepekArr[vege];
            if(index === 2){
                
                n = vege;
            }
        }else{
            vege = kepekArr.length-1;
            if(index === 2){
                
                n = vege;
            }
            ID("kisKep"+index).src = kepekArr[vege];
        }
    }
    lepteto = vege
    vege = n;
    
}

function nagyKepLesz(){
    
    let ut = event.target.src;
    let i = 0;
    let alapUt = kepekArr[i].replace("..", "");
    while(!(ut.includes(alapUt))){
        i++;
        alapUt = kepekArr[i].replace("..", "");
    }
    if(i < kepekArr.length){
       
      
        leszed();
        QS(".carousel-item")[i].className = "carousel-item active";
        QS(".ind")[i].className = "ind active"
    }
}
function  leszed(){
    for (let index = 0; index < kepekArr.length; index++) {
        QS(".ind")[index].className = "ind";
        QS(".carousel-item")[index].className = "carousel-item"; 
    }
          
    }

