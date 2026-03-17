const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let counter = 0;
const size = carouselImages[0].clientWidth;

function updateCarousel() {
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

nextBtn.addEventListener('click', () => {
  counter++;
  if(counter >= carouselImages.length) counter = 0;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  counter--;
  if(counter < 0) counter = carouselImages.length - 1;
  updateCarousel();
});

