
let megTalalva = 0;
let megy = false;
const hol = [];
const kepek = ["kep1.jpg", "kep1.jpg", "kep2.jpg", "kep2.jpg", "kep3.jpg", "kep3.jpg", "kep4.jpg", "kep4.jpg", "kep5.jpg", "kep5.jpg", "kep6.jpg", "kep6.jpg", "kep7.jpg", "kep7.jpg", "kep8.jpg", "kep8.jpg"];
let hatter = "jKepek/hatter.jpg";
let sorhossz = 4;


const tlJatek = gsap.timeline();

window.addEventListener("load", init);


function init () {
    kezdetiAllapot();
    scrollJatek();
}

function scrollJatek() {

    tlJatek.fromTo(ID("jatek"), 0, { y: "0%" }, { y: "-200%" });
  
    gsap.to(ID("jatek"), {
      scrollTrigger: {
        trigger: ID("jatek"),
        start: "top 90%",
        end: "top 90%",
        markers: false,
        toggleActions: "restart none reverse none",
      },
      y:"0%",
      duration:3
    })
  
  }


function megfordit() { // nem egy dolgot csinál
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
                setTimeout(() => {//kód ismétlés
                    ID(hol[0]).src = hatter;
                    ID(hol[1]).src = hatter;
                    ID(hol[0]).addEventListener("click", megfordit);
                    ID(hol[1]).addEventListener("click", megfordit);

                    /* ID("fed").style.zIndex =-1; */
                    hol.splice(0);
                }, 1000);


            }
        }
    }
}

function start() {
    let hossz = sorhossz * sorhossz;
    for (let index = 0; index < hossz; index++) {
        ID(index).src = `jKepek/${kepek[index]}`;
    }
    setTimeout(()=> {
        for (let index = 0; index < hossz; index++) {
            ID(index).src =  hatter;
            ID(index).addEventListener("click", megfordit);
        }
        ID("btnKezd").removeEventListener("click", start);
        ID("btnKezd").addEventListener("click", ()=> {
        clearInterval(szamlalo);
        kezdetiAllapot();});
        ID("btnKezd").innerHTML = "Újra";
    }, 1500);
    //ID(event.target.id).disabled = true;
    
    megy = true;
    let sec = 0;
    let szamlalo = setInterval(function () {
        sec++;
        let ido = valt(sec);
        ID("idoKi").innerHTML = ido;
        if (megTalalva === sorhossz*2) {
            clearInterval(szamlalo);
            alert("Gratulálok sikerült megoldanod "+ido+" alatt!");
            kezdetiAllapot();
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

function kezdetiAllapot() {
    megTalalva = 0;
    megy = false;
    let idKepek = ID("kepek");
    let txt = "";
    //kepek keverése
    shuffleArray();
    for (let index = 0; index < kepek.length; index++) {
         txt += `<div class="kartya"><img src="${hatter}" id="${index}"></div>`; //jKepek/${kepek[index]
    }
    idKepek.innerHTML = txt;
    ID("idoKi").innerHTML = "";
    ID("btnKezd").removeEventListener("click", kezdetiAllapot)
    ID("btnKezd").innerHTML = "Kezdés";
    ID("btnKezd").addEventListener("click", start);
}

function shuffleArray() {
    let index = kepek.length;
    while (0 !== index) {
      
      let randInd = Math.floor(Math.random() * index);
      index -= 1;
      // Swap it with the current element.
      let ideiglenes = kepek[index];
      kepek[index] = kepek[randInd];
      kepek[randInd] = ideiglenes;
    }
    
  }