document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 1;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const sliderContainer = document.querySelector(".banner");
  let slideInterval;
  showSlides(slideIndex);
  startAutoPlay();
  window.changeSlide = function (n) {
    showSlides((slideIndex += n));
    resetTimer();
  };
  window.currentSlide = function (n) {
    showSlides((slideIndex = n));
    resetTimer();
  };
  function showSlides(n) {
    let i;
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].classList.add("active");
    }
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.add("active");
    }
  }

  function startAutoPlay() {
    slideInterval = setInterval(function () {
      window.changeSlide(1);
    }, 1700);
  }
  function stopAutoPlay() {
    clearInterval(slideInterval);
  }
  function resetTimer() {
    stopAutoPlay();
    startAutoPlay();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const magneticBtn = document.getElementById("magneticBtn");
  const playCircle = document.querySelector(".play-circle");
  const playText = document.querySelector(".play-text");
  const videoModal = document.getElementById("videoModal");
  const closeBtn = document.getElementById("closeBtn");
  const videoFrame = document.getElementById("videoFrame");
  const videoSrc = "https://player.vimeo.com/video/410546111?h=6233a2f081";

  if (magneticBtn) {
    magneticBtn.addEventListener("mousemove", (e) => {
      const rect = magneticBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      playCircle.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
      playText.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    magneticBtn.addEventListener("mouseleave", () => {
      playCircle.style.transform = "translate(0px, 0px)";
      playText.style.transform = "translate(0px, 0px)";
    });

    magneticBtn.addEventListener("click", () => {
      videoModal.classList.add("active");
      videoFrame.src = videoSrc;
    });
  }
  const closeModal = () => {
    videoModal.classList.remove("active");
    setTimeout(() => {
      videoFrame.src = "";
    }, 300);
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeModal();
    });
  }
});

const lenis = new Lenis({
  autoRaf: true,
});
lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const closeBtnMenu = document.getElementById("closeBtnMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const body = document.body;
  if (hamburgerBtn && mobileMenu && closeBtnMenu) {
    hamburgerBtn.addEventListener("click", () => {
      mobileMenu.classList.add("active");
      body.classList.add("no-scroll");
      console.log("Menu Opened");
    });
    closeBtnMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      body.classList.remove("no-scroll");
      console.log("Menu Closed");
    });
    document.querySelectorAll(".navlinks a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("no-scroll");
      });
    });
    document.addEventListener("click", (e) => {
      if (
        !mobileMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target) &&
        mobileMenu.classList.contains("active")
      ) {
        mobileMenu.classList.remove("active");
        body.classList.remove("no-scroll");
      }
    });
  } else {
    console.error("Error: Element not found! Check HTML IDs.");
  }
});
