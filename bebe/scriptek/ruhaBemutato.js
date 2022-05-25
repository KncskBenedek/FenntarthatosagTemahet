var lepteto = 0;
var vege = 2;
let jelenlegiIndex = 0;
const NAGYKEPEKTOMB = [];
const KISKEPEKTOMB = [];
let hossz;
let ref;
let szelesseg = window.innerWidth;
let hatszAl = szelesseg > 600;
ref = hatszAl ? NAGYKEPEKTOMB : KISKEPEKTOMB;
/* let leszed = ()=>{
    zind(leszed, felrak, -1);
};
let felrak = ()=>{
    zind(felrak, leszed, 0);
}; */
window.addEventListener("resize", () => {
    szelesseg = window.innerWidth;
    let elozo = hatszAl;
    hatszAl = szelesseg > 600;
    if (hatszAl !== elozo) {
        ref = hatszAl ? NAGYKEPEKTOMB : KISKEPEKTOMB;
        QS(".item img").src = ref[jelenlegiIndex];
    }
});

window.addEventListener("load", function () {
    let lS = localStorage.getItem("aktualis");
    if (lS === null) {
        alert("You are not supposed to be here!");
        location.replace("../szabrina/kepgaleria.html");
    } else {
        var ruhaJson = JSON.parse(lS);
        leirasBeilleszt(ruhaJson);

        hossz = ruhaJson.kepek.length;

        //képek mentése
        kepekMentese(ruhaJson);

        // nagy kép beillesztése a html-be
        alapNagyKep();

        ID("prev").addEventListener("click", () => {
            lep(-1);
        });
        ID("next").addEventListener("click", () => {
            lep(1);
        });

        kezdKisKepek(KISKEPEKTOMB);
        let kisKepekSzama = NAGYKEPEKTOMB.length === 2 ? 2 : 3;
        for (let index = 0; index < kisKepekSzama; index++) {
            ID(`kisKep${index}`).addEventListener("click", nagyKepLesz);
        }
        kiemel(jelenlegiIndex);
        //QS(".navicon").addEventListener("click", leszed); már felesleges cssben van megoldva

    }
});
function kepekMentese(ruhaJson) {
    for (let index = 0; index < hossz; index++) {
        NAGYKEPEKTOMB.push(ruhaJson.kepek[index]);
        KISKEPEKTOMB.push(ruhaJson.kicsiKepek[index]);
    }
}
function alapNagyKep() {
    let kep = "";
    kep += `<div class="item"> <div class="hanyadik">${1} / ${hossz}</div> <img src="${ref[0]
        }"/></div>`;

    //gombok
    let gombok = `<a id="prev" class="prev">❮</a><a id="next" class="next">❯</a>`;

    let nagykep = kep + gombok;
    ID("nagyKep").innerHTML += nagykep;
}
function leirasBeilleszt(ruhaJson) {
    ID("ruhaLeiras").innerHTML = ruhaJson.szoveg;
    ID("tervezo").innerHTML =
        "Tervező: " + `<span class="nev">${ruhaJson.tervezo}</span>`;
    ID("fotos").innerHTML =
        "Fotós: " + `<span class="nev">${ruhaJson.fotosnev}</span>`;
    ID("modell").innerHTML =
        "Modell: " + `<span class="nev">${ruhaJson.modell}</span>`;
}

function lep(ertek) {
    jelenlegiIndex += ertek;
    if (jelenlegiIndex < 0) {
        jelenlegiIndex = ref.length - 1;
    } else if (jelenlegiIndex >= ref.length) {
        jelenlegiIndex = 0;
    }
    megjelenit(jelenlegiIndex);
}

function kiemel(index) {
    let elem = QS(`.kicsi${index}`);
    let meddig = hossz === 2 ? 2 : 3;
    kiemelLeszed(meddig);
    if (elem !== null) {
        elem.style.opacity = "100%";
    }
}
function kiemelLeszed(meddig) {
    for (let n = 0; n < meddig; n++) {
        QS(`#kisKep${n}`).style.opacity = "60%";
    }
}

function itemOpacity(opa) {
    QS(".item img").style.opacity = opa;
    QS(".item img").style.transitionDuration = "200ms";
}

function megjelenit(index) {
    kiemel(index);
    itemOpacity(0);
    setTimeout(() => {
        QS(".item img").src = ref[index];
        itemOpacity(1);
    }, 250);
    QS(".hanyadik").innerHTML = `${index + 1} / ${hossz}`;
}


/* function zind(leszed, felrak, zindex) {
    QS(".navicon").removeEventListener("click", leszed); 
    ID("nagyKep").style.zIndex = zindex; 
    QS(".navicon").addEventListener("click", felrak); // zindVissza
} */


function kezdKisKepek(tombKepek) {
    let alsoKepek = "";

    if (tombKepek.length <= 3) {
        alsoKepek = `<div id="kisLeptetoCont"> <div id="kisKepek" class="${tombKepek.length === 2 ? "ketKisKep" : "alapKiskepek"
            }">`;
    } else {
        alsoKepek = `<div id="kisLeptetoCont"> <div id="kisKepek" class="alapKiskepek"><a id="bal" class="prev">❮</a> <a id="jobb" class="next">❯</a>`;
    }

    let meddig = tombKepek.length === 2 ? 2 : 3;
    for (let index = 0; index < meddig; index++) {
        alsoKepek += `<div> <img id="kisKep${index}" src="${tombKepek[index]}" class="kicsi${index}" alt="kép"></div>`;
    }

    alsoKepek += `</div></div> `;
    ID("leiras").innerHTML += alsoKepek;

    if (NAGYKEPEKTOMB.length > 3) {
        ID("jobb").addEventListener("click", jobbra);
        ID("bal").addEventListener("click", balra);
    }
    /*  ID("leiras").innerHTML += `<a href="../szabrina/kepgaleria.html" class="vissza" id="leBtn"> <button>Vissza</button></a>`; */
}

function kicsiKepLesz(index, hely) {
    ID("kisKep" + index).src = KISKEPEKTOMB[hely];
    ID("kisKep" + index).className = `kicsi${hely}`;
}
function jobbra() {
    let n = lepteto;
    for (let index = 0; index < 3; index++) {
        lepteto++;
        if (lepteto < KISKEPEKTOMB.length) {
            //kód ismétlés
            kicsiKepLesz(index, lepteto);
            if (index === 0) {
                n = lepteto;
            }
        } else {
            lepteto = 0;
            if (index === 0) {
                n = lepteto;
            }
            kicsiKepLesz(index, lepteto);
        }
    }
    kiemel(jelenlegiIndex);
    vege = lepteto;
    lepteto = n;
}

function balra() {
    let n = 0;
    for (let index = 2; index >= 0; index--) {
        vege--;
        if (vege >= 0) {
            // kód ismétlés
            kicsiKepLesz(index, vege);
            if (index === 2) {
                n = vege;
            }
        } else {
            vege = NAGYKEPEKTOMB.length - 1;
            if (index === 2) {
                n = vege;
            }
            kicsiKepLesz(index, vege);
        }
    }
    kiemel(jelenlegiIndex);
    lepteto = vege;
    vege = n;
}

function nagyKepLesz() {
    let id = parseInt(event.target.className.replace("kicsi", ""));

    if (jelenlegiIndex !== id) {
        jelenlegiIndex = id;
        megjelenit(jelenlegiIndex);
    }
}
