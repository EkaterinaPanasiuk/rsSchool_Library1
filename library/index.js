document.addEventListener("click", (e) => {
  console.log(e.target);

  if (
    //open/close by burger-menu-icon
    e.target.classList.contains("header-burger") ||
    //close by click outsidethe menu
    !(
      e.target.classList.contains("open__menu")
      /* ||
      e.target.classList.contains("header__link") */
    )
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
  " Общая оценка 100 баллов:\nВёрстка валидная +10 \n Вёрстка семантическая +16 \nВёрстка валидная +10 \n Вёрстка соответствует макету +54 \n   ---------(блок <header> +8) \n    ---------секция About +6 \n    --------секция Favorites \n    -------секция CoffeShop \n    ---------секция Contacts \n    --------секция LibraryCard \n    --------блок <footer> +8 \n    Общие требования к верстке +20\n favicon есть в футере и в закладке страницы(head)"
);
