import { AppModel } from "./scripts/AppModel.js";
import { AppView } from "./scripts/AppView.js";
import { AppController } from "./scripts/AppController.js";

const app = document.getElementById("app");
const myapp = (function () {
  AppView;
  AppModel;
  AppController;
  return {
    init: function (container) {
      const view = new AppView();
      const controller = new AppController();
      const model = new AppModel();
      view.init(container);
      model.init(view);
      controller.init(container, model);
    },
  };
})();
myapp.init(app);

document.addEventListener("click", (e) => {
  console.log(e.target);

  if (
    //open/close by burger-menu-icon
    e.target.classList.contains("header-burger") ||
    //close menu by menu-link-click
    e.target.classList.contains("header__link") ||
    //close by click outsidethe menu
    !e.target.classList.contains("open__menu")
  ) {
    closeBurger();
  }
});
function closeBurger() {
  const burger = document.querySelector(".header-burger");
  const menu = document.querySelector(".header__menu");
  const nav = document.querySelector(".header__nav");
  burger.classList.toggle("close");
  burger.classList.toggle("open");
  menu.classList.toggle("open__menu");
  nav.classList.toggle("animate-open");
}

console.log(
  " Общая оценка 48 баллов:\nблок <header> +2\n Welcome +2 \nAbout +4. (не понятно как должна выглядеть высота стрелок с учетом сохранения расстояния межд картинкой и точками(40пх) (+2) + 5точек кнопку own(+2) \n CoffeShop +4 \n Contacts +4 \n LibraryCard +4 \n <footer> + 2 \n не появляется горизонтальная полоса (+4) \n элементы не выходят за пределы окна(+4) \n элементы не наезжают друг на друга(+4) \n адаптивное меню +12 \n отступ иконки юзера от правого края - 105px(+2)\n  иконка юзера не прыгает(+2)\nпри нажатии на бургер-иконку плавно появляется адаптивное меню +4 \n фдаптивное меню скрывается резко(0)\nссылки в адаптивном меню работают(+2)\n PixelPerfect (+2)"
);
