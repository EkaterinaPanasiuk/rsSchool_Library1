export function AppController() {
  let box = null;
  let model = null;
  this.init = function (mybox, mymodel) {
    box = mybox;
    model = mymodel;

    document.addEventListener("DOMContentLoaded", () => {
      this.changeBooks("winter");
      document.addEventListener("click", (e) => {
        switch (true) {
          case e.target.id === "arrow-back":
            this.sliderBack(e);
            break;
          case e.target.id === "arrow-next":
            this.sliderNext(e);
            break;
          case e.target.classList.contains("favorite-form__label"):
            this.changeFavoriteItemsOpacity();
            this.changeRadioChecked(e.target.getAttribute("for"));

            function start() {
              model.changeBooks(e.target.getAttribute("for"));
            }
            setTimeout(start, 2900);

            break;
          case (e.target.id = "user-icon"):
            this.openAutorizationeMenu();
            break;
        }
      });
    });
  };

  this.changeBooks = function (arg) {
    model.changeBooks(arg);
  };
  this.sliderBack = function (e) {
    e.preventDefault();
    console.log("back");
    this.moveAboutCarusel("475");
  };
  this.sliderNext = function (e) {
    e.preventDefault();
    console.log("next");
    this.moveAboutCarusel("-475");
  };
  this.moveAboutCarusel = function (arg) {
    let imgRow = document.getElementById("imgRow");
    const imgCollection = document.querySelectorAll(".about-galery__img");
    console.log(imgCollection);
    let positionNow = window.getComputedStyle(imgRow).getPropertyValue("left");
    if (positionNow.includes("px")) {
      positionNow = positionNow.slice(0, positionNow.length - 2);
    }
    imgRow.style.left = +positionNow + +arg + "px";
    positionNow < -1900 ? (imgRow.style.left = "0px") : null;
    positionNow > 0 ? (imgRow.style.left = "-1900px") : null;
  };
  // add "checked" class for favorite-radio-btn
  this.changeRadioChecked = function (arg) {
    model.changeRadioChecked(arg);
  };
  // animation-closed favorite-items books-elenment
  this.changeFavoriteItemsOpacity = function () {
    model.changeFavoriteItemsOpacity();
  };
  this.openAuthorizationeMenu = function () {
    model.openAuthorizationeMenu();
  };
}
