function $(elem) {
    return document.querySelectorAll(elem);
}

function S(elem) {
    return document.querySelector(elem);
}

window.addEventListener("load", init);
const kerdesekAltIsk = [];
const kerdesekKozIsk = [];
const kerdesekFeln = [];

const tlteszt = gsap.timeline();

let helyesValaszok = [];
let helyesValaszokCheck = [];
let joV = 0;
let szazalek;
let dobozIndex;

const fajlAltIsk = "json/altIsk.json";
const fajlKozIsk = "json/kozIsk.json";
const fajlFeln = "json/feln.json";

function init() {
    scrollTesztek();
    const altIsk=S("#alt");
    const kozIsk=S("#kozp");
    const feln=S("#feln");

    altIsk.addEventListener("click", altIskBeilleszt);
    kozIsk.addEventListener("click", kozIskBeilleszt);
    feln.addEventListener("click", felnBeilleszt);

    const gombAlt=S("#gombAlt");
    gombAlt.addEventListener("click", gombAltEsemeny);
    const gombKozp=S("#gombKozp");
    gombKozp.addEventListener("click", gombKozpEsemeny);
    const gombFeln=S("#gombFeln");
    gombFeln.addEventListener("click", gombFelnEsemeny);
}

function scrollTesztek () {

    tlteszt.fromTo($(".scrollanimacio"), 0,{y:"0%"}, {y:"-200%"});
    
      gsap.to($(".scrollanimacio"),{
        scrollTrigger: {
          trigger: $(".scrollanimacio"),
          start: "top 90%",
          end: "top 90%",
          markers: false,
          toggleActions: "restart none reverse none",
        },
        y:"0%",
        duration:3
      })
    
    }

function nullazas() {
    helyesValaszok = [];
    helyesValaszokCheck = [];
    joV = 0;
}

function altIskBeilleszt() {
    dobozIndex=0;
    beolvas(fajlAltIsk);
    nullazas();
    megjelenit(dobozIndex);
    S("#alt").removeEventListener("click", altIskBeilleszt);
    S("#alt").addEventListener("click", function () {
        eltuntet(dobozIndex);
    });
}
function kozIskBeilleszt() {
    dobozIndex=1;
    beolvas(fajlKozIsk);
    nullazas();
    megjelenit(dobozIndex);
    S("#kozp").removeEventListener("click", kozIskBeilleszt);
    S("#kozp").addEventListener("click", function () {
        eltuntet(dobozIndex);
    });
}
function felnBeilleszt() {
    dobozIndex=2;
    beolvas(fajlFeln);
    nullazas();
    megjelenit(dobozIndex);
    S("#feln").removeEventListener("click", felnBeilleszt);
    S("#feln").addEventListener("click", function () {
        eltuntet(dobozIndex);
    });
}

function megjelenit(dobozIndex) {
    $(".dl_tesztdoboz")[dobozIndex].style.display = "block";
    if (dobozIndex===0) {
        S("#gombAlt").style.display = "block";
        S("#alt").addEventListener("click", function () {
            eltuntet(dobozIndex);
        });
    }
    if (dobozIndex===1) {
        S("#gombKozp").style.display = "block";
        S("#kozp").addEventListener("click", function () {
            eltuntet(dobozIndex);
        });
        
    }
    if (dobozIndex===2) {
        S("#gombFeln").style.display = "block";
        S("#feln").addEventListener("click", function () {
            eltuntet(dobozIndex);
        });
    }
}

function eltuntet(dobozszam) {
    $(".dl_tesztdoboz")[dobozszam].style.display = "none";
    if (dobozszam===0) {
        S("#gombAlt").style.display = "none";
        S("#alt").addEventListener("click", function () {
            megjelenit(dobozszam);
        });
    }
    if (dobozszam===1) {
        S("#gombKozp").style.display = "none";
        S("#kozp").addEventListener("click", function () {
            megjelenit(dobozszam);
        });
        
    }
    if (dobozszam===2) {
        S("#gombFeln").style.display = "none";
        S("#feln").addEventListener("click", function () {
            megjelenit(dobozszam);
        });
    }
}

function beolvas(fajl) {
    fetch(fajl)
        .then((res) => res.json())
        .then((data)=>{
            if (fajl === fajlAltIsk) {
                data.altIsk.forEach((elem)=>{
                    kerdesekAltIsk.push(elem);
                });
            }else if (fajl === fajlKozIsk) {
                data.kozIsk.forEach((elem)=>{
                    kerdesekKozIsk.push(elem);
                });
            }else if (fajl === fajlFeln){
                data.feln.forEach((elem)=>{
                    kerdesekFeln.push(elem);
                });
            }
            if (fajl === fajlAltIsk) {
                feldolgoz(kerdesekAltIsk, dobozIndex);
            }
            else if (fajl === fajlKozIsk) {
                feldolgoz(kerdesekKozIsk, dobozIndex);
            }
            else if (fajl === fajlFeln) {
                feldolgoz(kerdesekFeln, dobozIndex);
            }
        })
        .catch((err)=>{
            console.log(err);
        });
}

function feldolgoz(tomb, index) {
    const szuloElem=$(".dl_tesztdoboz");
    let txt="";
    tomb.forEach((tipus)=>{
        for (const key in tipus) {
            if (key === "radio") {
                const kerdesek=tipus["radio"];
                txt+=kerdesekBeilleszt(kerdesek, key);
            }
            else if (key === "checkbox") {
                const kerdesek=tipus["checkbox"];
                txt+=kerdesekBeilleszt(kerdesek, key);
            }   
            
        }
        txt += "<br>";
    });
    szuloElem[index].innerHTML+=txt;
}


function valaszokEll(dobozId) {
    let valaszok = document.getElementById(`${dobozId}`).getElementsByTagName("input");
    console.log(valaszok);
    let valasztott;
    let valasztottak = [];
    let index = 0; 

    for (let i = 0; i < valaszok.length; i++) {
        let valasz = valaszok[i];
        if (valasz.type == 'radio') {
            if (valasz.checked) {
                valasztott = valasz.value;
                console.log(valasztott);
                if (valasztott===helyesValaszok[index]) {
                    joV++;
                    console.log("jo");
                }
                index++;
            }
        }        
        if (valasz.type === 'checkbox') {
            if (valasz.checked) {
                valasztottak.push(valasz.value);
        
                while (i<helyesValaszokCheck.length && !(valasztottak[i]===helyesValaszokCheck[i]) && !(valasztottak[i]===helyesValaszokCheck[i])) {
                    i++;
                }
                if (!(i<helyesValaszokCheck.length)) {
                    joV+=1;
                    console.log("joCheck");
                    console.log(joV);
                }
            }
        }
    }
}

function kerdesekBeilleszt(kerdesek, tipus) {
    let txt="";
    let kerdesSzam = 0;
    let i = 0;
    kerdesek.forEach((kerdes)=>{
        for (const key in kerdes) {
            if (tipus==="checkbox") {
                if (!(key==="helyesV1") && !(key==="helyesV2")){
                    if (key==="kerdes") {
                        txt += `<div>${kerdes[key]}</div>`;
                        kerdesSzam++;
                    }
                    else{
                        txt += `<input type="${tipus}" name="valasz${kerdesSzam}" value="${kerdes[key]}">${kerdes[key]}<br>`;
                    }
                }
                else{
                    helyesValaszokCheck[i]=kerdes[key];
                    i++;
                }
            }
            else{
                if (!(key==="helyesV")){
                    if (key==="kerdes") {
                        txt += `<div>${kerdes[key]}</div>`;
                        kerdesSzam++;
                    }
                    else{
                        txt += `<input type="radio" name="valasz${kerdesSzam}" value="${kerdes[key]}">${kerdes[key]}<br>`;
                    }
                }
                else{
                    helyesValaszok[i]=kerdes[key];
                    i++;
                }
            }
        }
    });
    return txt;
}

function szazalekSzamitas() {
    szazalek = joV/helyesValaszok.length*100;
}

function vege() {
    szazalekSzamitas();
    alert(`Az elért pontszámod: ${joV}. Válaszaidat ${szazalek}%-ban válaszoltad meg helyesen!` );
}

function gombAltEsemeny() {
    console.log(helyesValaszok);
    valaszokEll("altalanos");
    vege();
    gombAlt.removeEventListener("click", gombAltEsemeny);
    eltuntet(0);
}
function gombFelnEsemeny() {
    valaszokEll("felnott");
    vege();
    gombFeln.removeEventListener("click", gombFelnEsemeny);
    eltuntet(1);
}
function gombKozpEsemeny() {
    valaszokEll("kozep");
    vege();
    gombKozp.removeEventListener("click", gombKozpEsemeny);
    eltuntet(2);
}