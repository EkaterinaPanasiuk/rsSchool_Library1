import { drawBook } from "./templates/favoriteBookTemplate.js";
import { Modal } from "./modal.js";

export function AppView() {
  let box = null;
  this.init = function (container) {
    box = container;
  };
  this.trackUser = function (user) {
    console.log(user);
  };
  /*----------------start-render-modal-windows-----------------------*/
  this.renderModalWindow = function () {
    const registerModal = new Modal(
      "register-modal",
      "register",
      "close-register-btn"
    );
    registerModal.trackEvent();
  };
  /*----------------end-render-modal-windows-----------------------*/

  /*----------------start-user-menu--block-----------------------*/
  this.openNoAuthMenu = function () {
    console.log("menu-no-auth");
    document.getElementById("user-icon").classList.add("open-user-icon");
    document.getElementById("menu-no-auth").classList.toggle("open-user");
  };
  this.openWithAuthMenu = function () {
    console.log("with-auth");

    document.getElementById("user-icon").classList.add("open-user-icon");
    document.getElementById("menu-with-auth").classList.add("open-user");
  };
  this.closeAuthorizationeMenu = function () {
    document.getElementById("user-icon").classList.remove("open-user-icon");
    document.querySelector(".open-user")
      ? document.querySelector(".open-user").classList.remove("open-user")
      : null;
  };
  /*----------------end-user-menu--block-----------------------*/
  /*----------------start-burger-menu--block-----------------------*/
  this.closeBurgerMenu = function () {
    const burger = document.querySelector(".header-burger");
    const menu = document.querySelector(".header__menu");
    const nav = document.querySelector(".header__nav");
    burger.classList.add("close");
    burger.classList.remove("open");
    menu.classList.remove("open__menu");
    nav.classList.remove("animate-open");
  };
  this.openBurgerMenu = function () {
    const burger = document.querySelector(".header-burger");
    const menu = document.querySelector(".header__menu");
    const nav = document.querySelector(".header__nav");
    burger.classList.remove("close");
    burger.classList.add("open");
    menu.classList.add("open__menu");
    nav.classList.add("animate-open");
  };

  /*----------------end-burger-menu--block-----------------------*/

  /*----------------start-register-modal-----------------------*/
  this.openRegisterModal = function (scrollTop, clientHeight) {
    const modal = new Modal("register-modal", "register", "close-register-btn");
    modal.init();
  };
  this.openLibruaryCardModal = function () {
    const libModal = new Modal("lib-modal", "open-lib", "close-lib-btn");
    libModal.init();
    console.log("open lib");
  };
  this.closeRegisterModal = function () {
    document.getElementById("register-modal").classList.remove("visible");
    document
      .getElementById("register-modal")
      .classList.remove("animation-open");

    document.getElementById("register-modal").classList.remove("visible");
    document.documentElement.classList.remove("hystmodal__opened");
    document.documentElement.classList.remove("stopScroll");
  };
  this.closeLoginModal = function () {
    document.getElementById("login-modal").classList.remove("visible");
    document.getElementById("login-modal").classList.remove("animation-open");
    document.documentElement.classList.remove("hystmodal__opened");
    document.documentElement.classList.remove("stopScroll");
  };
  /*----------------end-register-modal-----------------------*/
  this.openLoginModal = function () {
    console.log("view login modaj");
    const loginModal = new Modal("login-modal", "log-in", "close-login-btn");
    loginModal.init();
  };
  this.openMyProfileModal = function (user) {
    console.log("kjsbdjkvbjanfksnkflasklmn");
    console.log(user);
    const myProfileModal = new Modal(
      "profile-modal",
      "my-profile",
      "close-profile-btn"
    );
    myProfileModal.init();
    this.renderDataToMyProfileModal(user, "profile-modal");
  };
  /*----------start-about-caroselt--------------------*/
  this.drawAboutDots = function () {
    let size = window.innerWidth;
    let wrapper = document.getElementById("dot-row");
    wrapper.innerHTML = "";
    let dotNumber = 0;
    size > 768 ? (dotNumber = 3) : (dotNumber = 5);
    for (let i = 0; i < dotNumber; i++) {
      wrapper.innerHTML += `<span class="dot" id="dot-${i}"></span>`;
    }
    this.activeFirstAboutDot();
  };
  this.activeFirstAboutDot = function () {
    let dots = document.querySelectorAll(".dot");
    dots[0].classList.add("active-dot");
  };
  this.activeAboutDot = function (elem) {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((i) => i.classList.remove("active-dot"));
    elem.classList.add("active-dot");
  };
  this.moveAboutCarusel = function (elem) {
    const itemwidth = 475; //(450-imgWidth+25-gap)
    let id = elem.getAttribute("id").slice(4);
    let carusel = document.getElementById("imgRow");
    let caroselPosition = window
      .getComputedStyle(carusel)
      .getPropertyValue("left");
    caroselPosition = caroselPosition.slice(0, caroselPosition.length - 2);
    carusel.style.transition = 0.4 * id ? id : 1 + "s";
    carusel.style.left = -itemwidth * id + "px";
  };
  this.moveAboutCaruselByArrow = function (index) {
    const itemwidth = 475;
    let carusel = document.getElementById("imgRow");
    let caruselWrapper = document.getElementById("imgRow-wrapper");
    let caroselPosition = window
      .getComputedStyle(carusel)
      .getPropertyValue("left");
    caroselPosition = caroselPosition.slice(0, caroselPosition.length - 2);
    carusel.style.transition = 0.4 + "s";
    let caruselShift = caroselPosition - itemwidth * index;
    console.log(caroselPosition);
    switch (true) {
      case caroselPosition >= 0:
        this.blockBackArrow();
        this.noDisabledNextArrow();
        console.log("left");
        if (caruselShift > 0) {
          carusel.style.left = "0px";
        } else {
          carusel.style.left = caruselShift + "px";
          this.noDisabledBackArrow();
        }
        break;
      case caroselPosition <= -1425:
        this.blockNextArrow();
        this.noDisabledBackArrow();
        console.log("right");
        caruselShift < -1900
          ? (carusel.style.left = "-1900px")
          : (carusel.style.left = caruselShift + "px");
        break;
      case caroselPosition > -1425 && caroselPosition < 0:
        console.log(" medium");
        this.noDisabledNextArrow();
        this.noDisabledBackArrow();

        carusel.style.left = caruselShift + "px";
        break;
    }

    if (caroselPosition >= 0) {
      this.blockBackArrow();
      this.noDisabledNextArrow();
      console.log(">0");
      console.log(caroselPosition);
      let caruselShift = 0;
      caroselPosition - itemwidth * index == 475
        ? (caruselShift = 0)
        : (caruselShift = caroselPosition - itemwidth * index);
      carusel.style.left = caruselShift + "px";
    } else if (caroselPosition <= -1425) {
      this.blockNextArrow();
      this.noDisabledBackArrow();
      console.log("<-1425");

      console.log(caroselPosition);
    } else {
      console.log(caroselPosition);
      this.noDisabledNextArrow();
      this.noDisabledBackArrow();
      carusel.style.left = caroselPosition - itemwidth * index + "px";
    }
  };

  this.blockNextArrow = function () {
    const btn = document.getElementById("arrow-next-btn");
    btn.setAttribute("disabled", "disabled");
  };
  this.blockBackArrow = function () {
    console.log("disabled");
    document
      .getElementById("arrow-back-btn")
      .setAttribute("disabled", "disabled");
  };
  this.unBlockBackArrow = function () {
    document.getElementById("arrow-back-btn").removeAttribute("disabled");
  };
  this.unBlockNextArrow = function () {
    document.getElementById("arrow-next-btn").removeAttribute("disabled");
  };

  /*---------end-about-block-end--------------------*/

  /*----------------start-favotite-block-----------------------*/
  this.changeBooks = function (arg) {
    const favoriteItems = arg.map((item) => drawBook(item));
    document.getElementById("favorite-items-wrapper").innerHTML =
      favoriteItems.join("");
  };
  // add "checked" class for favorite-radio-btn
  this.changeRadioChecked = function (arg) {
    const favoriteRadio = document.querySelectorAll(".favorite-form__label");
    console.log(favoriteRadio);
    favoriteRadio.forEach((item) => {
      item.classList.remove("checked");
      item.getAttribute("for") === arg ? item.classList.add("checked") : null;
    });
  };
  // animation-closed favorite-items books-elenment
  this.changeFavoriteItemsOpacity = function () {
    const favoriteItems = document.querySelectorAll(".favorite-item-container");
    favoriteItems.forEach((i) => i.classList.add("favorite-item-closed"));
  };
  /*----------------end-favotite-block-----------------------*/

  this.renderDataToMyProfileModal = function (user, container) {
    console.log(user);
    let bookList;
    let bookNumber;
    if (user.books === null || user.books.length > 0) {
      bookNumber = 0;
      bookList = null;
    } else {
      bookList = user.books.map((i) => {
        return `<li class="section-subtitle profile-list-item ">${i}</li>`;
      });
      bookNumber = user.book.length;
    }

    let box = document.getElementById(container);
    box.querySelector(".profile-name").innerHTML =
      user.firstname + " " + user.lastname;
    box.querySelector(".profile-initial").innerHTML =
      user.firstname.at(0) + user.lastname.at(0);
    box.querySelector("#profile-card-number").innerText = user.cardNumber ?? 0;
    box.querySelector("#profile-books").innerText = user.books ?? 0;
    box.querySelector("#profile-bonuses").innerText = user.bonuses ?? 0;
    box.querySelector("#profile-visits").innerText = user.visits ?? 0;
    bookList
      ? (box.querySelector(".profile-list").innerHTML = bookList.join(""))
      : (box.querySelector(".profile-list").innerText = "List is empty");
  };
  this.chengeCardCheck = function (user, container) {
    const div = document.createElement("div");
    div.setAttribute("id", "digital-card-check");
    div.classList.add("digital-card-check");

    let temp = `
    <div class="profile-cards">
      <div class="profile-card profile-visits">
        <h4 class="profile-card-title text">Visits</h4>
        <img class="profile-card-icon" src="./accets/icons/Union.svg"></img>
        <p class="profile-card-count text-10" id="profile-visits">${
          user.visits ?? 0
        }</p>
      </div>
      <div class=" profile-card  profile-bonuses">
        <h4 class="profile-card-title text">bonuses</h4>
        <img class="profile-card-icon" src="./accets/icons/Star-1.svg"></img>
        <p class="profile-card-count text-10" id="profile-bonuses">${
          user.bonuses ?? 0
        }</p>
      </div>
      <div class="profile-card  profile-books">
        <h4 class="profile-card-title text">books</h4>
        <img class="profile-card-icon" src="./accets/icons/book.svg"></img>
        <p class="profile-card-count text-10" id="profile-books">${
          user.books === null || user.books.length === 0 ? 0 : user.books.length
        }</p>
      </div>
    </div>`;
    div.innerHTML = temp;
    const cardCheck = document.getElementById(container);
    cardCheck.replaceWith(div);
    const name =
      user.firstname.slice(0, 1).toUpperCase() +
      user.firstname.slice(1) +
      " " +
      user.lastname.slice(0, 1).toUpperCase() +
      user.lastname.slice(1);
    document
      .getElementById("digital-name-input")
      .setAttribute("value", `${name}`);

    document
      .getElementById("digital-number-input")
      .setAttribute("value", `${user.cardNumber}`);
    document.getElementById("digital-name-input").classList.add("text-brown");
    document.getElementById("digital-number-input").classList.add("text-brown");
  };

  this.logoutCardCheck = function () {
    const cardCheck = document.getElementById("digital-card-check");
    const cardBtn = document.createElement("button");
    cardBtn.setAttribute("type", "button");
    cardBtn.classList.add("form-button ");
    cardBtn.classList.add("digital-button");
    cardBtn.setAttribute("id", "card-check-btn");
    cardBtn.innerText = "Check the card";
    cardCheck.replaceWith(cardBtn);

    document
      .getElementById("digital-number-input")
      .setAttribute("placeholder", "Reader's name");

    document
      .getElementById("digital-number-input")
      .setAttribute("placeholder", "Card number");
    document
      .getElementById("digital-name-input")
      .classList.remove("text-brown");
    document
      .getElementById("digital-number-input")
      .classList.remove("text-brown");
  };
}

/* profile-books */
