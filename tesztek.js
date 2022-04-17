window.addEventListener("load", init);


function init() {
    const gomb=document.querySelector("#gomb");
    const jok=[1, 2];
    gomb.addEventListener("click", function () {radioEll("valasz1", 1);});
    gomb.addEventListener("click", function () {checkboxEll("valasz2", jok)});
    gomb.addEventListener("click", function () {radioEll("valasz3", 3);});
    jok[0]=2;
    jok[1]=3;
    gomb.addEventListener("click", function () {checkboxEll("valasz4", jok);});
}

function checkboxEll(hol, jok) {
    let valaszok = document.querySelectorAll("input[name='"+hol+"']");
    let valasztottak = [];
    valaszok.forEach((valasz)=>{
        if (valasz.checked) {
            valasztottak.push(valasz.value);
        }
    });
    console.log(valasztottak);
    let i=0;
    while (i<jok.length && Number(valasztottak[i])===Number(jok[i])) {
        i++;
    }

    if (!(i<jok.length)) {
        console.log(hol+" jo");
    } else {
        console.log(hol+" hibas");
    }
}

function radioEll(hol, helyesV) {
    let valaszok = document.querySelectorAll("input[name='"+hol+"']");
    let valasztott;
    valaszok.forEach((valasz)=>{
        if (valasz.checked) {
            valasztott = valasz.value;
            console.log(valasztott);
            if (Number(valasztott)===Number(helyesV)) {
                console.log(hol+" jo");
            }else{
                console.log(hol+" rossz");
            }
        }
    }); 
}