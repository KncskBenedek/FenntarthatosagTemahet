/* 
localStorage.getItem("aktualis");
 */
/*
    balra gomb
    jobra gomb
    kisképre kattintva nagyképként kiemel
*/
function ID(elem) {
    return document.getElementById(elem);
}
window.addEventListener("load", function () {
    /* const elem = localStorage.getItem("aktualis");
    console.log(elem);
    fetch()
    .then(response => response.json())
    .then(data => function (data){
        console.log(data); */
    var cucc = JSON.parse(localStorage.getItem("aktualis"));
    console.log(cucc);
    ID("fotos").innerHTML = cucc.fotosnev;

});