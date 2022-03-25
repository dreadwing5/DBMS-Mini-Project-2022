const overlay = document.querySelector(".overlay");
const megaMenu = document.querySelector(".nav__menu--mega");
const menu = document.querySelector(".nav__menu--submenu");
const scrollBtn = document.getElementById("btn-back-to-top");

const closeMegaMenu = function () {
  menu.classList.remove("submenu--active");
  overlay.classList.add("nav__hidden");
};

if (menu) {
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("submenu--active")) {
      closeMegaMenu();
    }
  });
}

const openMegaMenu = function () {
  if (menu) {
    menu.classList.toggle("submenu--active");
    overlay.classList.toggle("nav__hidden");
  }
};

const backToTop = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

export const scrollFunction = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn?.addEventListener("click", backToTop);
overlay?.addEventListener("click", closeMegaMenu);
megaMenu?.addEventListener("click", openMegaMenu);
