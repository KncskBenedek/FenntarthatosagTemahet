window.addEventListener("load", init);
const kerdesek = [];
let helyesValaszok = [];
let joV = 0;
let szazalek;

function init() {
    beolvas();
    const gomb=document.querySelector("#gomb");
    gomb.addEventListener("click", gombEsemeny);
}

function beolvas() {
    let fajl = "json/altIsk.json";
    fetch(fajl)
        .then((res) => res.json())
        .then((data)=>{
            data.altIsk.forEach((elem)=>{
                kerdesek.push(elem);
            });
            feldolgoz(kerdesek);
        })
        .catch((err)=>{
            console.log(err);
        });
}

function feldolgoz(tomb) {
    const szuloelem=document.querySelector(".dl_tesztdoboz");
    let i=0;
    tomb.forEach((kerdes)=>{
        for (const key in kerdes) {
            if (!(key==="helyesV")) {
                if (key==="kerdes") { szuloelem.innerHTML += `<div>${kerdes[key]}</div>`;}
                else {
                    szuloelem.innerHTML += `<input type="radio" value="${kerdes[key]}">${kerdes[key]}<br>`;
                }
            }else{
                helyesValaszok[i]=kerdes[key];
                i++;
            }
        }
        szuloelem.innerHTML += "<br>";
    });
}


function radioEll() {
    let valaszok = document.querySelectorAll("input[type='radio']");
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

function szazalekSzamitas() {
    szazalek = joV/helyesValaszok.length*100;
}

function vege() {
    szazalekSzamitas();
    alert(`Az elért pontszámod: ${joV}. Válaszaidat ${szazalek}%-ban válaszoltad meg helyesen!` );
}

function gombEsemeny() {
    radioEll();
    vege();
    document.querySelector("#gomb").removeEventListener("click", gombEsemeny);
}