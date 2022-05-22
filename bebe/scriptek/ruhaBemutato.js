
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
        
        let kep = ""; 
        hossz = ruhaJson.kepek.length;
        
        //képek
        
        for (let index = 0; index < hossz; index++) {
            kepekArr.push(ruhaJson.kepek[index]);
            kepekArrKis.push(ruhaJson.kicsiKepek[index]);
            
        }
        
            kep += `<div class="item"> <div class="hanyadik">${1} / ${hossz}</div> <img src="${ref[0]}"/></div>`;
        
        
        //gombok
        let gombok = `<a id="prev" class="prev">❮</a><a id="next" class="next">❯</a>`;

        let nagykep = kep + gombok ;//indicators + kepek + gombok;
        ID("nagyKep").innerHTML += nagykep;
        

        ID("prev").addEventListener("click", ()=>{lep(-1)});
        ID("next").addEventListener("click", ()=>{lep(1)});
        
        kezd(kepekArrKis);
        let ho = kepekArr.length === 2 ? 2 : 3;
        for (let index = 0; index < ho; index++) {
            ID(`kisKep${index}`).addEventListener("click", nagyKepLesz);
        }
        kiemel(jInd);

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
    megjelenit(jInd);
}

function kiemel(index){
    let elem = QS(`.kicsi${index}`);
    
    for (let n = 0; n < 3; n++) {
        QS(`#kisKep${n}`).style.opacity = "60%";
    }
    if (elem !== null) {
        elem.style.opacity = "100%";
    }
}


function megjelenit(index){
    kiemel(index);
    QS(".item img").style.opacity = 0;
    QS(".item img").style.transitionDuration = "200ms";
    setTimeout(()=>{ 
        QS(".item img").src = ref[index];
        QS(".item img").style.opacity = 1;
        QS(".item img").style.transitionDuration = "200ms";
 }, 200);
    QS(".hanyadik").innerHTML = `${index+1} / ${hossz}`;

}

//kód ismétlés
function zind(){
    QS(".navicon").removeEventListener("click", zind);
    ID("nagyKep").style.zIndex = -1;
    QS(".navicon").addEventListener("click", zindVissz);
}


function zindVissz(){
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
        alsoKepek += `<div> <img id="kisKep${index}" src="${tombKepek[index]}" class="kicsi${index}"></div>`;
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
        if (lepteto < kepekArrKis.length) { //kód ismétlés
            ID("kisKep" + index).src = kepekArrKis[lepteto];
            ID("kisKep" + index).className = `kicsi${lepteto}`;
            if (index === 0) {
                n = lepteto;
            }
        } else {
            lepteto = 0;
            if (index === 0) {
                n = lepteto;
            }
            ID("kisKep" + index).src = kepekArrKis[lepteto];
            ID("kisKep" + index).className = `kicsi${lepteto}`;
        }
    }
    kiemel(jInd);
    vege = lepteto
    lepteto = n;
}


function balra() {
    let n = 0;
    for (let index = 2; index >= 0; index--) {
        vege--;
        if (vege >= 0) { // kód ismétlés
            ID("kisKep" + index).src = kepekArrKis[vege];
            ID("kisKep" + index).className = `kicsi${vege}`;
            if (index === 2) {
                n = vege;
            }
        } else {
            vege = kepekArr.length - 1;
            if (index === 2) {
                n = vege;
            }
            ID("kisKep" + index).src = kepekArrKis[vege];
            ID("kisKep" + index).className = `kicsi${vege}`;
        }
    }
    kiemel(jInd);
    lepteto = vege
    vege = n;
}


function nagyKepLesz() {
    console.log(event.target.className);
    let id = parseInt((event.target.className).replace("kicsi", ""));
    console.log(id);
    console.log(typeof id);
    console.log("bent van a metódusban");
    if(jInd !== id){
        console.log("bent van az elágazásban");
        jInd = id;
        megjelenit(jInd);
    }
    
}




