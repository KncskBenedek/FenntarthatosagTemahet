window.addEventListener("load", init);

function ID(elem) {
    return document.getElementById(elem);
  }


function init () {
    let txt = "";
    const aktualisCikk = JSON.parse(localStorage.getItem("egycikk"));
    txt += `<div class="container max-w-6xl mx-auto">`;
    txt += `<div class="flex flex-col box-border order-first w-full text-black border-solid mx:w-1/2 md:pl-10 md:order-none">`;
    for (data in aktualisCikk) {
            if(data === "cim") {
              //txt += `<div class="flex justify-between">`;
              txt += `<h1 class="text-6xl font-bold tracking-tight text-center" >${aktualisCikk[data]}</h1>`;
                //txt += "</div>";
            }else if (data.indexOf("bekezd")>=0){
              //txt += `<div class = "cikk">`;
              txt += `<p class="tracking-tight text-center text-2xl" >${aktualisCikk[data]}</p>`;
              //txt += "</div>";
            }else if (data.indexOf("alcim")>=0){
              //txt += `<div class = "alcim">`;
              txt += `<h2 class="text-4xl font-bold text-left" >${aktualisCikk[data]}</h2>`;
              //txt += "</div>";
            } else if (data === "szerzo") {
              //txt += `<div class = "szerzo">`;
              txt += `<p=>${aktualisCikk[data]}</p>`;
              //txt += "</div>";
            }else if (data === "link") {
              //txt += `<div class = "link">`;
              txt += `<a href="${aktualisCikk[data]}">Forrás</a>`;
              //txt += "</div>";
            } else if (data.indexOf("felsorolas")>=0) {
              felsorTxt = "";
              felsorTxt += `<li>${aktualisCikk[data]}</li>`;
              txt += felsorTxt;
            }else if (data.indexOf("kep")>=0) {
               
                var kepVegSzam =parseInt(String([data])[3]);
                console.log(kepVegSzam)
                if(kepVegSzam%2==0){
                    //txt += `<div >`;
                    txt += `<img src="${aktualisCikk[data]}" alt="kep" >`;
                    //txt += `</div>`;
                }else{
                    //txt += `<div>`;
                    txt += `<img src="${aktualisCikk[data]}" alt="kep">`;
                    //txt += `</div>`;
                }
 
            }
        }
        txt += "</div>";
        txt += "</div>";
              ID("egycikk").innerHTML += txt;
            }