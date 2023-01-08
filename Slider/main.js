var slideIndex = 1;
var paused = false;
var slideFade = false;
var intervalId = null;

function showSlide(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove('active-slide');
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].classList.add('active-slide');
  dots[slideIndex - 1].className += " active";
}

function currentSlideShow(n) {
  showSlide(slideIndex = n);
}

function nextSlide() {
  var currentSlide = document.querySelector('.active-slide');
  var currentDot = document.querySelector('.active');
  var slides = document.querySelectorAll('.slide');
  var nextSlide = currentSlide.nextElementSibling;
  var nextDot = currentDot.nextElementSibling;
  
  if (nextDot == null) {
    nextDot = document.querySelector('.firstDot');
  }

  currentDot.classList.remove('active');
  nextDot.classList.add('active');

  if (nextSlide == null) {
    nextSlide = document.querySelector('.first');
  }

  currentSlide.style.display = "none";
  setSlideAnimation('cubic-bezier(0.25, 0.1, 0.25, 1)');
  nextSlide.style.display = "block";

  currentSlide.classList.remove('active-slide');
  nextSlide.classList.add('active-slide');
  
}

function backSlide() {
  var currentSlide = document.querySelector('.active-slide');
  var currentDot = document.querySelector('.active');
  var slides = document.querySelectorAll('.slide');
  var backSlide = currentSlide.previousElementSibling;
  var backDot = currentDot.previousElementSibling;

  if (backDot == null) {
    backDot = document.querySelector('.lastDot');
  }

  currentDot.classList.remove('active');
  backDot.classList.add('active');

  if (backSlide == null) {
    backSlide = document.querySelector('.last');
  }

  backSlide.style.display = "block";
  currentSlide.style.display = "none";
  backSlide.classList.add('active-slide');
  currentSlide.classList.remove('active-slide');

}

function pauseSlideshow() {
  var pauseButton = document.getElementById("pause");

  if (paused) {
    paused = false;
    pauseButton.innerHTML = "Play";
    stopSlider();

  } else {
    paused = true;
    pauseButton.innerHTML = "Pause";
    startSlider();
  }
}

function startSlider() {
  intervalId = setInterval(nextSlide, 1000);
}

function stopSlider() {
  clearInterval(intervalId);
  intervalId = null;
}

function changeAnimation() {
  var slideFadeButton = document.getElementById("slideFade");

  if (slideFade) {
    slideFade = false;
    slideFadeButton.innerHTML = "Slide";
    

  } else {
    slideFade = true;
    slideFadeButton.innerHTML = "Fade";
  }
}

function setSlideAnimation(type) {
  const slides = document.querySelectorAll('.slide');

  slides.forEach((slide) => {
    slide.style.transition = `all ${type}`;
  });
}


