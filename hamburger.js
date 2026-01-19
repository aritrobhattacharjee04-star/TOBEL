document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector("#hamburger-menu") || document.querySelector(".hamburger");
  const body = document.querySelector("body");
  const mobileNav = document.createElement("div");
  mobileNav.className = "mobile-nav";
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  mobileNav.innerHTML = `
        <div class="close-menu" id="close-btn-id" style="cursor:pointer;">&times;</div>
        <a href="index.html" class="${currentPage === "index.html" ? "active-nav" : ""}">HOME</a>
        <a href="pages.html" class="${currentPage === "pages.html" ? "active-nav" : ""}">PAGES</a>
        <a href="portfolio.html" class="${currentPage === "portfolio.html" ? "active-nav" : ""}">PORTFOLIO</a>
        <a href="blog.html" class="${currentPage === "blog.html" ? "active-nav" : ""}">BLOG</a>
        <a href="shop.html" class="${currentPage === "shop.html" ? "active-nav" : ""}">SHOP</a>
        <div style="height: 1px; width: 30px; background: #333; margin: 15px 0;"></div>
        <a href="login.html" style="font-size: 12px;">LOG IN</a>
        <a href="login.html" style="border: 1px solid #fff; padding: 10px 25px; font-size: 12px; margin-top: 10px;">SIGN UP</a>
    `;
  document.body.appendChild(mobileNav);
  const closeMenuFunc = () => {
    mobileNav.classList.remove("active");
    body.style.overflow = "auto";
    if (hamburger) hamburger.classList.remove("toggle"); 
  };
  if (hamburger) {
    hamburger.onclick = () => {
      mobileNav.classList.add("active");
      body.style.overflow = "hidden";
      hamburger.classList.add("toggle"); 
    };
  }
  document.addEventListener("click", (e) => {
    if (e.target.id === "close-btn-id" || e.target === mobileNav) {
      closeMenuFunc();
    }
    
    if (e.target.tagName === "A" && e.target.closest(".mobile-nav")) {
        closeMenuFunc();
    }
  });
});