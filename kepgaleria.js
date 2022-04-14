
window.addEventListener("load",MSZ_init);

let slideIndex = 0;
function MSZ_init(){
    MSZ_slider();
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
