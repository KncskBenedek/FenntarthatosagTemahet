
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
    galeriaDIV.appendChild(clone);
    document.querySelector(".MSZ_btn").addEventListener("click",betolt);

    }
    );

  }
  
}

function jsonbolOlvas(){
  fetch('kepek.json')
  .then(response => response.json())
  .then(data => MSZ_kepbetolt(data));
}

function betolt(evt){
  
  console.log(evt.target);
}