var slideIndex = 1;
var paused = true;
var slideFade = true;
var intervalId = null;
var tranformSlide;
var tranformSlideOpa;

function showSlide(n) {
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  var i;
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove('prevSlide');
    slides[i].classList.remove('active-slide');
    slides[i].classList.remove('nextSlide');

    dots[i].classList.remove('prevDot');
    dots[i].classList.remove('active-dot');
    dots[i].classList.remove('nextDot');
  }

  x = n - 1;
  if (x < 0) {
    x = 5;
  }

  y = n + 1;
  if (y > slides.length - 1) {
    y = 0;
  }

  slides[x].classList.add('prevSlide');
  slides[n].classList.add('active-slide');
  slides[y].classList.add('nextSlide');

  dots[x].classList.add('prevDot');
  dots[n].classList.add('active-dot');
  dots[y].classList.add('nextDot');
}

function currentSlideShow(n) {
  showSlide(slideIndex = n);
}

function moveSlide(x) {
  var currentSlide = document.querySelector('.active-slide');
  var prevSlide = document.querySelector('.prevSlide');
  var nextSlide = document.querySelector('.nextSlide');

  var prevDot = document.querySelector('.prevDot')
  var currentDot = document.querySelector('.active-dot');
  var nextDot = document.querySelector('.nextDot')

  prevSlide.classList.remove('prevSlide');
  currentSlide.classList.remove('active-slide');
  nextSlide.classList.remove('nextSlide');

  prevDot.classList.remove('prevDot');
  currentDot.classList.remove('active-dot');
  nextDot.classList.remove('nextDot');

  if (x === 1) {
    prevSlide = currentSlide;
    currentSlide = nextSlide;
    nextSlide = nextSlide.nextElementSibling;

    if (nextSlide == null) {
      nextSlide = document.querySelector('.firstSlide');
    }

    prevDot = currentDot;
    currentDot = nextDot;
    nextDot = nextDot.nextElementSibling;

    if (nextDot == null) {
      nextDot = document.querySelector('.firstDot');
    }

    if(slideFade){
      prevSlideMoveSlide(prevSlide, 1);
      nextSlideMoveSlide(currentSlide, 1);
    }else{
      slideMoveFade(currentSlide);
    }

  } else if (x === -1) {
    nextSlide = currentSlide;
    currentSlide = prevSlide;
    prevSlide = prevSlide.previousElementSibling;
    if (prevSlide == null) {
      prevSlide = document.querySelector('.lastSlide');
    }

    nextDot = currentDot;
    currentDot = prevDot;
    prevDot = prevDot.previousElementSibling;
    if (prevDot == null) {
      prevDot = document.querySelector('.lastDot');
    }

    if(slideFade){
      prevSlideMoveSlide(currentSlide, -1);
      nextSlideMoveSlide(nextSlide, -1);
    }else{
      slideMoveFade(currentSlide);
    }

  }

  prevSlide.classList.add('prevSlide');
  currentSlide.classList.add('active-slide');
  nextSlide.classList.add('nextSlide');

  prevDot.classList.add('prevDot');
  currentDot.classList.add('active-dot');
  nextDot.classList.add('nextDot');
}

function nextSlideMoveSlide(nextSlide, prevNext) {
  const a = 'translate(50%,-50%) scale(0.5)';
  const b = 'translate(-50%,-50%) scale(1)';

  if (prevNext === 1) {
    tranformSlide = [
      {transform: a},
      {transform: b}
    ];
  } else if (prevNext === -1) {
    tranformSlide = [
      {transform: b},
      {transform: a}
    ];
  }

  const timing = {
    duration: 1000,
    iterations: 1,
  }
  const slide = nextSlide;
  slide.animate(tranformSlide, timing);
}

function prevSlideMoveSlide(prevSlide, prevNext) {
  const a = 'translate(-50%,-50%) scale(1)';
  const b = 'translate(-150%,-50%) scale(0.5)';

  if (prevNext === 1) {
    tranformSlide = [
      {transform: a},
      {transform: b}
    ];
  } else if (prevNext === -1) {
    tranformSlide = [
      {transform: b},
      {transform: a}
    ];
  }

  const timing = {
    duration: 1000,
    iterations: 1,
  }

  const slide = prevSlide;
  slide.animate(tranformSlide, timing);

}

function slideMoveFade(currentSlide){
  tranformSlideOpa = [
    {opacity: '0.2'},
    {opacity: '1'}
  ];

  const timing = {
    duration: 1000,
    iterations: 1,
  }
  const slide = currentSlide;
  slide.animate(tranformSlideOpa, timing);
}

function pauseSlideshow() {
  var pauseButton = document.getElementById("pause");
  if (paused) {
    paused = false;
    pauseButton.innerHTML = "Pause";
    startSlider();

  } else {
    paused = true;
    pauseButton.innerHTML = "Play";
    stopSlider();
  }
}

function startSlider() {
  intervalId = setInterval(moveSlide, 2000, 1);
}

function stopSlider() {
  clearInterval(intervalId);
  intervalId = null;
}

function changeAnimation() {
  var pauseButton = document.getElementById("slideFade");
  if (slideFade) {
    slideFade = false;
    pauseButton.innerHTML = "Fade";

  } else {
    slideFade = true;
    pauseButton.innerHTML = "Slide";
  }
}