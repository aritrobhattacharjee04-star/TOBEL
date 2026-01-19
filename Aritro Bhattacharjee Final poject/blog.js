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
  var typed = new Typed("#watermark-typed", {
    strings: ["STORIES", "JOURNAL", "NEWS", "UPDATES"],
    typeSpeed: 150,
    backSpeed: 100,
    startDelay: 500,
    backDelay: 2000,
    loop: true,
    showCursor: true,
  });
});
