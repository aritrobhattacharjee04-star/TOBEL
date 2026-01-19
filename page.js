gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
  autoRaf: false,
  smoothWheel: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
document.addEventListener("DOMContentLoaded", () => {
  const magneticBtn = document.getElementById("magneticBtn");
  const playCircle = document.querySelector(".play-circle");
  const playText = document.querySelector(".play-text");
  const videoModal = document.getElementById("videoModal");
  const closeBtn = document.getElementById("closeBtn");
  const videoFrame = document.getElementById("videoFrame");

  const videoSrc =
    "https://player.vimeo.com/video/410546111?h=6233a2f081&autoplay=1";

  if (magneticBtn) {
    magneticBtn.addEventListener("mousemove", (e) => {
      const rect = magneticBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(playCircle, {
        x: x * 0.5,
        y: y * 0.5,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(playText, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    magneticBtn.addEventListener("mouseleave", () => {
      gsap.to([playCircle, playText], {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
    });

    magneticBtn.addEventListener("click", () => {
      if (videoModal) {
        videoModal.classList.add("active");

        setTimeout(() => {
          videoFrame.src = videoSrc;
        }, 100);

        lenis.stop();
      }
    });
  }

  const closeModal = () => {
    if (videoModal) {
      videoModal.classList.remove("active");

      setTimeout(() => {
        videoFrame.src = "";
        lenis.start();
      }, 300);
    }
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeModal();
    });
  }
});

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector("#pages-watermark")) {
    var typed = new Typed("#pages-watermark", {
      strings: ["ABOUT US", "OUR STORY", "HISTORY", "MISSION"],
      typeSpeed: 150,
      backSpeed: 100,
      startDelay: 500,
      backDelay: 2000,
      loop: true,
      showCursor: true,
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const closeBtnMenu = document.getElementById("closeBtnMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const body = document.body;

  if (hamburgerBtn && mobileMenu && closeBtnMenu) {
    hamburgerBtn.addEventListener("click", () => {
      mobileMenu.classList.add("active");
      body.classList.add("no-scroll");
    });

    closeBtnMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      body.classList.remove("no-scroll");
    });

    document.querySelectorAll(".navlinks a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("no-scroll");
      });
    });
  }
});
