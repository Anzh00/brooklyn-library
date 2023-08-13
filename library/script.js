const burger = document.querySelector(".nav__burger-btn");
const navList = document.querySelector(".nav__list");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navList.classList.toggle("active");
})

document.querySelectorAll(".nav__link").forEach(n => n.addEventListener("click", () => {
  burger.classList.remove("active");
  navList.classList.remove("active");
}))

document.onclick = function (e) {
  if (!e.composedPath().includes(burger) && !e.composedPath().includes(navList)) {
    burger.classList.remove("active");
    navList.classList.remove("active");
  }
}