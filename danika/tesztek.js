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

let helyesValaszok = [];
let helyesValaszokCheck = [];
let joV = 0;
let szazalek;
let dobozIndex;

const fajlAltIsk = "json/altIsk.json";
const fajlKozIsk = "json/kozIsk.json";
const fajlFeln = "json/feln.json";

function init() {
    const bezar = document.getElementsByClassName("bezar")[0];
    const felugro = document.getElementById("felugro");

    bezar.addEventListener("click", function () {
        felugro.style.display = "none";
    });

    const altIsk=S("#alt");
    const kozIsk=S("#kozp");
    const feln=S("#feln");

    
    altIsk.addEventListener("click", altIskBeilleszt);
    
    kozIsk.addEventListener("click", kozIskBeilleszt);
    
    feln.addEventListener("click", felnBeilleszt);
}

function nullazas() {
    helyesValaszok = [];
    helyesValaszokCheck = [];
    joV = 0;
}

function altIskBeilleszt(event) {
    if (event.target.id==="alt") {
        dobozIndex=0;
    }
    if (event.target.id==="kozp") {
        dobozIndex=1;
    }
    if (event.target.id==="feln") {
        dobozIndex=2;
    }
    beolvas(fajlAltIsk);
    nullazas();
    megjelenit(event);
    $(".dl_tesztdoboz")[dobozIndex].style.display = "block";
    S("#gombAlt").style.display = "block";
    S("#alt").removeEventListener("click", altIskBeilleszt);
    S("#alt").addEventListener("click", megjelenit);
}
function kozIskBeilleszt(event) {
    dobozIndexBeallito(event);
    beolvas(fajlKozIsk);
    nullazas();
    megjelenit(event);
    $(".dl_tesztdoboz")[dobozIndex].style.display = "block";
    S("#gombKozp").style.display = "block";
    S("#kozp").removeEventListener("click", kozIskBeilleszt);
    S("#kozp").addEventListener("click", megjelenit);
}
function felnBeilleszt(event) {
    dobozIndexBeallito(event);
    beolvas(fajlFeln);
    nullazas();
    megjelenit(event);
    $(".dl_tesztdoboz")[dobozIndex].style.display = "block";
    S("#gombFeln").style.display = "block";
    S("#feln").removeEventListener("click", felnBeilleszt);
    S("#feln").addEventListener("click", megjelenit);
}

function megjelenit(event) {
    console.log(dobozIndex);
    dobozIndexBeallito(event);
    const doboz=$(".dl_tesztdoboz")[dobozIndex];
    console.log(doboz);
    if (doboz.style.display === "none") {
        doboz.style.display = "block";
        gombMegjelenit("block");
    }else{
        gombMegjelenit("none");
        doboz.style.display = "none";
    }
}

function dobozIndexBeallito(event) {
    if (event.target.id==="alt") {
        dobozIndex=0;
    }
    if (event.target.id==="kozp") {
        dobozIndex=1;
    }
    if (event.target.id==="feln") {
        dobozIndex=2;
    }
}

function gombMegjelenit(mutat) {
    if (dobozIndex===0) {
        const gombAlt=S("#gombAlt");
        gombAlt.style.display = mutat;
        gombAlt.addEventListener("click", gombAltEsemeny);
    }
    if (dobozIndex===1) {
        const gombKozp=S("#gombKozp");
        gombKozp.style.display = mutat;
        gombKozp.addEventListener("click", gombKozpEsemeny);
    }
    if (dobozIndex===2) {
        const gombFeln=S("#gombFeln");
        gombFeln.style.display = mutat;
        gombFeln.addEventListener("click", gombFelnEsemeny);
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
    szazalek = joV/(helyesValaszok.length+helyesValaszokCheck.length)*100;
    szazalek.toFixed(2);
}

function vege() {
    szazalekSzamitas();
    document.getElementById("szov").innerHTML=`Az elért pontszámod: ${joV}.<br> Válaszaidat ${szazalek}%-ban válaszoltad meg helyesen!`;
    document.getElementById("felugro").style.display="block";
}

function gombAltEsemeny(event) {
    console.log(helyesValaszok);
    valaszokEll("altalanos");
    vege();
    gombAlt.removeEventListener("click", gombAltEsemeny);
    megjelenit(event);
}
function gombKozpEsemeny(event) {
    valaszokEll("kozep");
    vege();
    gombKozp.removeEventListener("click", gombKozpEsemeny);
    megjelenit(event);
}
function gombFelnEsemeny(event) {
    valaszokEll("felnott");
    vege();
    gombFeln.removeEventListener("click", gombFelnEsemeny);
    megjelenit(event);
}