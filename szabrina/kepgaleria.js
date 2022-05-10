
window.addEventListener("load",MSZ_init);

let slideIndex = 0;

function MSZ_init(){
    MSZ_slider();
    jsonbolOlvas();
  }



function MSZ_slider() {
  let i;
  let slides = document.getElementsByClassName("MSZ_slide");
  let dots = document.getElementsByClassName("MSZ_csik");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(MSZ_slider, 2000);
}

function MSZ_kepbetolt(data) {
  console.log(data);

  if ("content" in document.createElement("template")) {
      var tDIV = document.querySelector("#MSZ_tarolo");
      var galeriaDIV = document.querySelector("#MSZ_galeria");

      for (const key in data.kepek) {
          var clone = tDIV.content.cloneNode(true);
          var td = clone.querySelectorAll("span");
          td[0].textContent = data.kepek[key].tervezo;
          td[1].textContent = data.kepek[key].fotosnev;
          clone.querySelector(".MSZ_kartya").style.backgroundImage = `url(${data.kepek[key].kicsiKepek[0]})`;
          clone.querySelector(".MSZ_btn").id = data.kepek[key].id;
          //clone.querySelector("a").href = data.kepek[key].tovabboldalra;
          galeriaDIV.appendChild(clone);
      }
      console.log(document.querySelectorAll(".MSZ_btn"));
      const gombTomb = document.querySelectorAll(".MSZ_btn");
      gombTomb.forEach((elem) => {
          elem.addEventListener("click", function (event) {
              console.log(event.target.id); //ez a kattintott gomb sorszáma
              let aktID = event.target.id;
              console.log(data.kepek[aktID]); //ez a kattintott gombhoz tartozó adat
              let aktKep = data.kepek[aktID];
              kattint(aktKep);
          });
      });
  }
}

function jsonbolOlvas(){
  fetch('kepek.json')
  .then(response => response.json())
  .then(data => MSZ_kepbetolt(data));
}

function kattint(aktKep) {
  console.log(aktKep);
  localStorage.setItem("aktualis", JSON.stringify(aktKep));
  //ezzel lépek a következő oldalra
  window.location.assign(aktKep.tovabboldalra);
}


