import { drawBook } from "./templates/favoriteBookTemplate.js";

export function AppView() {
  let box = null;
  this.init = function (container) {
    box = container;
  };
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
  this.openNoAuthMenu = function () {
    document.getElementById("menu-no-auth").classList.add("open");
  };
  this.openWithAuthMenu = function () {
    document.getElementById("menu-with-auth").classList.add("open");
  };
}
