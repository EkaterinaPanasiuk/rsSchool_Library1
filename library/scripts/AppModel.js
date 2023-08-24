import { info } from "./info.js";

export function AppModel() {
  let view = null;
  let data = null;
  let user = null;
  this.init = function (viewbox) {
    view = viewbox;
    data = info;
  };
  this.changeBooks = function (arg) {
    view.changeBooks(data.favorite[arg]);
    console.log(data.favorite[arg]);
  };
  // add "checked" class for favorite-radio-btn
  this.changeRadioChecked = function (arg) {
    view.changeRadioChecked(arg);
  };
  // animation-closed favorite-items books-elenment
  this.changeFavoriteItemsOpacity = function () {
    view.changeFavoriteItemsOpacity();
  };
  this.openAuthorizationeMenu = function () {
    user ? view.openNoAuthMenu() : view.openWithAuthMenu();
  };
}
