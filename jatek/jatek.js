function ID(elem) {
    return document.getElementById(elem);
}

function $(elem) {
    return document.querySelectorAll(elem);
}
let megTalalva = 0;
let megy = false;
const hol = [];
const kepek = ["kep1.jpg", "kep1.jpg", "kep2.jpg", "kep2.jpg", "kep3.jpg", "kep3.jpg", "kep4.jpg", "kep4.jpg", "kep5.jpg", "kep5.jpg", "kep6.jpg", "kep6.jpg", "kep7.jpg", "kep7.jpg", "kep8.jpg", "kep8.jpg"];

let sorhossz = 4;


window.addEventListener("load", jatekKezd);

function megfordit() {
    let id = event.target.id;
    if (hol.length <= 1) {
        event.target.src = `jKepek/${kepek[Number(id)]}`;
        hol.push(id);
        ID(id).removeEventListener("click", megfordit);
        if (hol.length === 2) {
            /* ID("fed").style.zIndex =10000; */
            if (kepek[Number(hol[0])] === kepek[Number(hol[1])]) {
                /*  ID("fed").style.zIndex =-1; */
                megTalalva++;
                hol.splice(0);
            } else {
                setTimeout(() => {
                    ID(hol[0]).src = "jKepek/hatter.jpg";
                    ID(hol[1]).src = "jKepek/hatter.jpg";
                    ID(hol[0]).addEventListener("click", megfordit);
                    ID(hol[1]).addEventListener("click", megfordit);

                    /* ID("fed").style.zIndex =-1; */
                    hol.splice(0);
                }, 1000);


            }
        }
    }
}

function kezd() {
    for (let index = 0; index < 16; index++) {
        ID(index).addEventListener("click", megfordit);
    }
    ID(event.target.id).disabled = true;
    megy = true;
    let sec = 0;
    let szamlalo = setInterval(function () {
        sec++;
        let ido = valt(sec);
        ID("idoKi").innerHTML = ido;
        if (megTalalva === 8) {
            clearInterval(szamlalo);
            ID("btnKezd").disabled = false;
            alert("Gratulálok sikerült megoldanod "+ido+" alatt!")
            jatekKezd();
        }
    }, 1000);

}

function valt(sec) {

    var hours = Math.floor(sec / 3600);

    var minutes = Math.floor(sec / 60) % 60;

    var seconds = sec % 60;

    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
}

function jatekKezd() {
    megTalalva = 0;
    megy = false;
    ID("btnKezd").addEventListener("click", kezd);
    let idKepek = ID("kepek");
    let txt = "";
    //kepek keverése
    for (let index = 0; index < kepek.length; index++) {
         txt += `<img src="jKepek/hatter.jpg" id="${index}">`; //jKepek/${kepek[index]
    }
    idKepek.innerHTML = txt;

}