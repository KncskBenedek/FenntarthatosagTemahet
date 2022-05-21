
var lepteto = 0;
var vege = 2;
let jInd = 0;
function ID(elem) {
    return document.getElementById(elem);
}





const kepekArr = [];
const kepekArrKis = [];
window.addEventListener("load", function () {
    if (localStorage.length === 0) { // getitemes változat kell
        ID("bemutat").innerHTML = "<h1>Nem szabadna ide így eljutnod ejnye bejnye.</h1>";
    } else {
        var ruhaJson = JSON.parse(localStorage.getItem("aktualis"));
        ID("ruhaLeiras").innerHTML = ruhaJson.szoveg;
        ID("tervezo").innerHTML = "Tervező: " + ruhaJson.tervezo;
        ID("fotos").innerHTML = "Fotós: " + ruhaJson.fotosnev;
        ID("modell").innerHTML = "Modell: " + ruhaJson.modell;
        //let indicators = ; // `<ul class="carousel-indicators">`;
        let kepek = ""; //`div class="carousel-inner">`;
        let index = 0;


        let hossz = ruhaJson.kepek.length;

        //console.log(ruhaJson);
        //képek
        for (let index = 0; index < hossz; index++) {
            kepekArr.push(ruhaJson.kepek[index]);
            kepekArrKis.push(ruhaJson.kicsiKepek[index]);
            if (index === 0) {
                console.log("bléptem nyomik");
                kepek += `<div class="items" data-active="true"> <div class="hanyadik">${index+1} / ${hossz}</div> <img src="${ruhaJson.kepek[index]}"/></div>`;
            } else {
                kepek += `<div class="items" > <div class="hanyadik">${index+1} / ${hossz}</div> <img src="${ruhaJson.kepek[index]}"/></div>`;
            }
            
        }
        console.log(kepek);
        //gombok
        let gombok = `<a id="prev" class="prev">❮</a><a id="next" class="next">❯</a>`;

        let nagykep = kepek + gombok ;//indicators + kepek + gombok;
        console.log(nagykep);
        ID("nagyKep").innerHTML += nagykep;
        

        ID("prev").addEventListener("click", ()=>{lep(-1)});
        ID("next").addEventListener("click", ()=>{lep(1)});
        
        kezd(kepekArrKis);
        /* let ho = kepekArr.length === 2 ? 2 : 3;
        for (let index = 0; index < ho; index++) {
            ID(`kisKepQS{index}`).addEventListener("click", nagyKepLesz);
        }  */

    }
    QS(".navicon").addEventListener("click", zind);
});

function lep(ertek){
    jInd += ertek;
    if(jInd < 0){
    jInd = kepekArr.length - 1;
    }else if(jInd>= kepekArr.length){
        jInd = 0;
    }
    
    megjelenit(jInd);
}

function megjelenit(index){
    let n =  QS("[data-active]");
    //console.log(n);
    $(".items")[index].dataset.active = true;
    delete n.dataset.active;
}

function zind(){
    console.log("Bement a zind");
    QS(".navicon").removeEventListener("click", zind);
    ID("nagyKep").style.zIndex = -1;
    QS(".navicon").addEventListener("click", zindVissz);
}


function zindVissz(){
    console.log("Bement a zindVissz");
    QS(".navicon").removeEventListener("click", zindVissz)
    ID("nagyKep").style.zIndex = 0;
    QS(".navicon").addEventListener("click", zind);
}


function kezd(tombKepek) {
    let alsoKepek = "";
    if (tombKepek.length <= 3) {
        alsoKepek = `<div id="kisLeptetoCont"> <div id="kisKepek" class="${tombKepek.length === 2 ? "ketKisKep" : "alapKiskepek"}">`;
    } else {
        alsoKepek = `<div id="kisLeptetoCont"> <div id="kisKepek" class="alapKiskepek"><a id="bal" class="prev">❮</a> <a id="jobb" class="next">❯</a>`;
    }
    let meddig = tombKepek.length === 2 ? 2 : 3;
    for (let index = 0; index < meddig; index++) {
        alsoKepek += `<div> <img id="kisKep${index}" src="${tombKepek[index]}" class="kicsi"></div>`;
    }
    
        alsoKepek += `</div></div> `;

    
    ID("leiras").innerHTML += alsoKepek;

    if (kepekArr.length > 3) {
        ID("jobb").addEventListener("click", jobbra);
        ID("bal").addEventListener("click", balra);
    }

}


function jobbra() {
    let n = lepteto;
    for (let index = 0; index < 3; index++) {
        lepteto++;
        if (lepteto < kepekArrKis.length) {
            ID("kisKep" + index).src = kepekArrKis[lepteto];
            if (index === 0) {
                n = lepteto;
            }
        } else {
            lepteto = 0;
            if (index === 0) {
                n = lepteto;
            }
            ID("kisKep" + index).src = kepekArrKis[lepteto];
        }
    }
    vege = lepteto
    lepteto = n;

}


function balra() {
    let n = 0;
    for (let index = 2; index >= 0; index--) {
        vege--;
        if (vege >= 0) {
            ID("kisKep" + index).src = kepekArrKis[vege];
            if (index === 2) {

                n = vege;
            }
        } else {
            vege = kepekArr.length - 1;
            if (index === 2) {

                n = vege;
            }
            ID("kisKep" + index).src = kepekArrKis[vege];
        }
    }
    lepteto = vege
    vege = n;
}


function nagyKepLesz() {

    let ut = event.target.src;
    let i = 0;
    let alapUt = kepekArrKis[i].replace("..", "");
    while (!(ut.includes(alapUt))) {
        i++;
        alapUt = kepekArrKis[i].replace("..", "");
    }
    if (i < kepekArrKis.length) {
        leszed();
        $(".carousel-item")[i].className = "carousel-item active";
        $(".ind")[i].className = "ind active"
    }
}


function leszed() {
    for (let index = 0; index < kepekArr.length; index++) {
        $(".ind")[index].className = "ind";
        $(".carousel-item")[index].className = "carousel-item";
    }
}

