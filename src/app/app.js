import "./style.scss";

const header = document.querySelector(".header__layout");

window.onscroll = () => {
  if (window.pageYOffset > 50) {
    header.classList.add("header__layout--scrolled");
  } else {
    header.classList.remove("header__layout--scrolled");
  }
};
