window.addEventListener("load", init);
const kerdesekAltIsk = [];
const kerdesekKozIsk = [];
const kerdesekFeln = [];

let helyesValaszok = [];
let helyesValaszokCheck = [];
let joV = 0;
let szazalek;
let dobozIndex=0;

const fajlAltIsk = "json/altIsk.json";
const fajlKozIsk = "json/kozIsk.json";
const fajlFeln = "json/feln.json";

function init() {
    const altIsk=document.querySelector("#alt");
    const kozIsk=document.querySelector("#kozp");
    const feln=document.querySelector("#feln");

    altIsk.addEventListener("click", altIskEsemeny);
    kozIsk.addEventListener("click", kozIskEsemeny);
    feln.addEventListener("click", felnEsemeny);
    
    document.querySelectorAll(".dl_tesztdoboz").forEach(doboz=>doboz.style.opacity = 0);
    // beolvas(fajlKozIsk);
    // beolvas(fajlFeln);   

    // const gomb=document.querySelector("#gomb");
    // gomb.addEventListener("click", gombEsemeny);
}

function nullazas() {
    helyesValaszok = [];
    helyesValaszokCheck = [];
    joV = 0;
}

function altIskEsemeny() {
    beolvas(fajlAltIsk);
    nullazas();
    document.querySelectorAll(".dl_tesztdoboz")[0].style.opacity=1;
    document.querySelector("#alt").removeEventListener("click", altIskEsemeny);
}
function kozIskEsemeny() {
    beolvas(fajlKozIsk);
    nullazas();
    document.querySelectorAll(".dl_tesztdoboz")[1].style.opacity=1;
    // document.querySelectorAll(".dl_tesztdoboz")[1].style.display="inline";
    document.querySelector("#kozp").removeEventListener("click", kozIskEsemeny);
}
function felnEsemeny() {
    beolvas(fajlFeln);
    nullazas();
    document.querySelectorAll(".dl_tesztdoboz")[2].style.opacity=1;
    // document.querySelectorAll(".dl_tesztdoboz")[2].style.display="inline";
    document.querySelector("#feln").removeEventListener("click", felnEsemeny);
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
                feldolgoz(kerdesekAltIsk);
            }
            else if (fajl === fajlKozIsk) {
                feldolgoz(kerdesekKozIsk);
            }
            else if (fajl === fajlFeln) {
                feldolgoz(kerdesekFeln);
            }
        })
        .catch((err)=>{
            console.log(err);
        });
}

function feldolgoz(tomb) {
    const szuloElem=document.querySelectorAll(".dl_tesztdoboz");
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
    szuloElem[dobozIndex].innerHTML+=txt;
    dobozIndex++;
}


function radioEll() {
    let valaszok = document.querySelectorAll("input[name='radio']");
    let valasztott;
    let i = 0;
    valaszok.forEach((valasz)=>{
        if (valasz.checked) {
            valasztott = valasz.value;
            console.log(valasztott);
            if (valasztott===helyesValaszok[i]) {
                joV++;
                console.log("jo");
            }
            i++;
        }
    }); 
}

function checkboxEll() {
    let valaszok = document.querySelectorAll("input[name='checkbox']");
    let valasztottak = [];
    valaszok.forEach((valasz)=>{
        if (valasz.checked) {
            valasztottak.push(valasz.value);
        }
    });
    console.log(valasztottak);
    let i=0;
    while (i<helyesValaszokCheck.length && !(valasztottak[i]===helyesValaszokCheck[0] || valasztottak[i]===helyesValaszokCheck[1])) {
        i++;
    }

    if (!(i<helyesValaszokCheck.length)) {
        joV+=2;
        // console.log(" jo");
    }
    // else {
    //     console.log(" hibas");
    // }
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

function gombEsemeny() {
    radioEll();
    checkboxEll();
    // vege();
    document.querySelector("#gomb").removeEventListener("click", gombEsemeny);
}