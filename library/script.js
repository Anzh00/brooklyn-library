const burger = document.querySelector(".nav__burger-btn");
const navList = document.querySelector(".nav__list");
const profileIcon = document.querySelector(".profile-menu__icon");
const profileMenuDropdown = document.querySelector(".profile-menu__dropdown");
const authList = document.querySelector(".dropdown-list_auth");
const noauthList = document.querySelector(".dropdown-list_no-auth");
const loginLink = document.querySelectorAll(".login-link");
const registerLink = document.querySelectorAll(".register-link");
const registerForm = document.querySelector(".register-form");
const loginForm = document.querySelector(".login-form");

//бургер-меню в хедере
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

//меню авторизации в хедере
profileIcon.addEventListener("click", () => {
  profileMenuDropdown.classList.toggle("active");
})

document.onclick = function (e) {
  if (!e.composedPath().includes(profileMenuDropdown) && !e.composedPath().includes(profileIcon)) {
    profileMenuDropdown.classList.remove("active");
  }
}

document.querySelectorAll(".dropdown-list__link").forEach(n => n.addEventListener("click", () => {
  profileMenuDropdown.classList.remove("active");
}))

document.querySelectorAll(".btn_close").forEach(n => n.addEventListener("click", () => {
  document.querySelectorAll(".popup").forEach(n => {
    n.classList.remove("active");
  })
}))

// Popups
function closePopup(e, popup) {
  const content = popup.getElementsByClassName('popup__content')[0];
  if (!e.composedPath().includes(content)) {
    popup.classList.remove("active");
    popup.onclick = undefined;
  }
}

function createPopupOpener(buttonClassName, popupId) {
  Array.from(document.getElementsByClassName(buttonClassName)).forEach(n => n.addEventListener("click", () => {
    const popup = document.getElementById(popupId);
    popup.classList.toggle("active");
  
    popup.onclick = (e) => closePopup(e, popup);
  }));
}

createPopupOpener("login-link", "login-popup");
createPopupOpener("register-link", "register-popup");

//signup
function signUp(e) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const isSignedUp = users.length && users.some(user => 
    (user.email === document.getElementById("email").value));
  if (!isSignedUp) {
    users.push({
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    })
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementsByTagName("form").reset();
  } 
  else {
    alert("You have already signed up");
  }
  e.preventDefault();
}

function logIn(e) {
  const users = JSON.parse(localStorage.getItem("users"));
  const isSignedUp = users.some(user => (user.email === document.getElementById("login-email").value && user.password === document.getElementById("login-password")));
  if (isSignedUp) {

  }
  else {
    alert("User is not exist");
  }
}

//slider
const slides = document.querySelectorAll(".slider__img");
const gallery = document.querySelector(".slider__gallery");
const frame = document.querySelector(".slider__frame");
const sliderDotsContainer = document.querySelector(".slider__dots");
const sliderDots = [];
const dotsFigures = [];

const dotsNumber = slides.length - Math.round(frame.offsetWidth/slides[0].offsetWidth) + 1;

for (let i = 0; i < dotsNumber; i++) {
  sliderDots[i] = document.createElement("div");
  sliderDots[i].className = "dot";
  sliderDotsContainer.appendChild(sliderDots[i]);
  dotsFigures[i] = sliderDots[i].appendChild(document.createElement("div"));
  dotsFigures[i].className = "dot__figure";

  sliderDots[i].addEventListener("click", () => {
    gallery.style.transform = `translateX(-${i * (slides[0].offsetWidth + 26)}px)`;
    dotsFigures.forEach(n => {
      n.classList.remove("dot__figure_active");
    });
    dotsFigures[i].classList.toggle("dot__figure_active");
  });
}
