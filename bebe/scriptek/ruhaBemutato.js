
var lepteto = 0;
var vege = 2;
let jInd = 0;
const kepekArr = [];
const kepekArrKis = [];
let hossz;
let ref;
let szelesseg = window.innerWidth ;
let hatszAl = szelesseg > 600;
ref = hatszAl? kepekArr:kepekArrKis;
window.addEventListener("resize", () => {
    //console.log("bent a resizeban");
    szelesseg = window.innerWidth ;
    let elozo = hatszAl;
    hatszAl = szelesseg > 600;
    if (hatszAl !== elozo) {
        ref = hatszAl? kepekArr:kepekArrKis;
        QS(".item img").src = ref[jInd];
    } 
    //ref = hatszAl? kepekArr:kepekArrKis;
});


window.addEventListener("load", function () {
    let lS = localStorage.getItem("aktualis") ;
    if (lS === null) { 
        alert("You are not supposed to be here :(");
        location.replace("../szabrina/kepgaleria.html")
    } else {
        var ruhaJson = JSON.parse(lS);
        ID("ruhaLeiras").innerHTML = ruhaJson.szoveg;
        ID("tervezo").innerHTML = "Tervező: " + ruhaJson.tervezo;
        ID("fotos").innerHTML = "Fotós: " + ruhaJson.fotosnev;
        ID("modell").innerHTML = "Modell: " + ruhaJson.modell;
        //let indicators = ; // `<ul class="carousel-indicators">`;
        let kep = ""; //`div class="carousel-inner">`;
        


        hossz = ruhaJson.kepek.length;

        //console.log(ruhaJson);
        //képek
        
        for (let index = 0; index < hossz; index++) {
            kepekArr.push(ruhaJson.kepek[index]);
            kepekArrKis.push(ruhaJson.kicsiKepek[index]);
            
        }
        
            kep += `<div class="item"> <div class="hanyadik">${1} / ${hossz}</div> <img src="${ref[0]}"/></div>`;
        
        
        //gombok
        let gombok = `<a id="prev" class="prev">❮</a><a id="next" class="next">❯</a>`;

        let nagykep = kep + gombok ;//indicators + kepek + gombok;
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
    jInd = ref.length - 1;
    }else if(jInd>= ref.length){
        jInd = 0;
    }
    //console.log("bent jInd = "+ jInd);
    megjelenit(jInd);
}

function megjelenit(index){
    QS(".item img").style.opacity = 0;
    QS(".item img").style.transitionDuration = "200ms";
    setTimeout(()=>{ 
        QS(".item img").src = ref[index];
        QS(".item img").style.opacity = 1;
        QS(".item img").style.transitionDuration = "200ms";
 }, 200);
    
    
    //QS(".item img").style.transitionDelay = "0ms";
    QS(".hanyadik").innerHTML = `${index+1} / ${hossz}`;
}

function zind(){
    //console.log("Bement a zind");
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
        
       
    }
}




