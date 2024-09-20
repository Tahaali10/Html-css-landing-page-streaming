const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const slideWidth = slides[0].clientWidth;

let currentIndex = 0;
const totalSlides = slides.length;
const slidesToShow = 3;
let startX, isDragging = false, startTransform;

// Function to update carousel position
function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Function to go to a specific slide
function goToSlide(index) {
  currentIndex = (index + totalSlides) % totalSlides;
  updateCarousel();
}

// Function to handle automatic slide transition
function startAutoSlide() {
  setInterval(() => {
    goToSlide(currentIndex + slidesToShow);
  }, 3000);
}

// Start the automatic sliding
startAutoSlide();

// Function to handle mouse drag start
function handleDragStart(e) {
  startX = e.pageX || e.touches[0].pageX;
  startTransform = parseFloat(getComputedStyle(carousel).transform.split(',')[4]) || 0;
  isDragging = true;
  carousel.style.transition = 'none'; // Disable transition during drag
}

// Function to handle mouse drag move
function handleDragMove(e) {
  if (!isDragging) return;

  const x = e.pageX || e.touches[0].pageX;
  const diff = startX - x;
  carousel.style.transform = `translateX(${startTransform - diff}px)`;
}

// Function to handle mouse drag end
function handleDragEnd(e) {
  if (!isDragging) return;

  isDragging = false;
  carousel.style.transition = 'transform 0.5s ease'; // Re-enable transition

  const x = e.pageX || e.changedTouches[0].pageX;
  const diff = startX - x;
  const threshold = slideWidth / 3; // Drag threshold to change slide

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      goToSlide(currentIndex + slidesToShow);
    } else {
      goToSlide(currentIndex - slidesToShow);
    }
  } else {
    updateCarousel(); // Snap back to the original position if not dragged far enough
  }
}

// Event listeners for mouse and touch events
carousel.addEventListener('mousedown', handleDragStart);
carousel.addEventListener('mousemove', handleDragMove);
carousel.addEventListener('mouseup', handleDragEnd);

carousel.addEventListener('touchstart', handleDragStart);
carousel.addEventListener('touchmove', handleDragMove);
carousel.addEventListener('touchend', handleDragEnd);



//new

const multipleItemCarousel = document.querySelector("#testimonialCarousel");

if (window.matchMedia("(min-width:576px)").matches) {
  const carousel = new bootstrap.Carousel(multipleItemCarousel, {
    interval: false,
  });

  const carouselInner = document.querySelector(".carousel-inner");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const carouselControlNext = document.querySelector(".carousel-control-next");
  const carouselControlPrev = document.querySelector(".carousel-control-prev");

  const carouselWidth = carouselInner.scrollWidth;
  const cardWidth = carouselItems[0].offsetWidth;

  let scrollPosition = 0;

  carouselControlNext.addEventListener("click", () => {
    if (scrollPosition < carouselWidth - cardWidth * 3) {
      console.log("next");
      scrollPosition += cardWidth;
      carouselInner.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    }
  });

  carouselControlPrev.addEventListener("click", () => {
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      carouselInner.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    }
  });
} else {
  multipleItemCarousel.classList.add("slide");
}
