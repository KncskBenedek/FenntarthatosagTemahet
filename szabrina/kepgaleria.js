
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

/*function MSZ_kepbetolt(){
  let txt=`<div class="MSZ_content">
  <h2 class="MSZ_title">Címe a ruhának</h2>
  <p class="MSZ_copy">
    Szerő: XY<br />
    Fotós neve: ZX
  </p>
  <a href="kepgaleria.html"
    ><button class="MSZ_btn">Tovább az oldalra</button></a
  >
</div>`;
  document.getElementById("MSZ_kartya").innerHTML=txt;
  console.log(getElementById());
}*/

function MSZ_kepbetolt(data){
console.log(data);

  if ('content' in document.createElement('template')){
    var tDIV = document.querySelector("#MSZ_tarolo");
    var galeriaDIV = document.querySelector('#MSZ_galeria');
    
    
    data.kepek.forEach(element => {
      var clone = tDIV.content.cloneNode(true);
    var td = clone.querySelectorAll("span");
    td[0].textContent = element.cim;
    td[1].textContent = element.szerzo;
    td[2].textContent = element.fotosnev;
    clone.querySelector(".MSZ_kartya").style.backgroundImage = `url(${element.eleresiut})`;
    clone.querySelector("a").href = element.tovabboldalra;
    galeriaDIV.appendChild(clone);
    });

  }else{

  }
  console.log();
}

function jsonbolOlvas(){
  fetch('kepek.json')
  .then(response => response.json())
  .then(data => MSZ_kepbetolt(data));
}