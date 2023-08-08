const burger = document.getElementById("burger");
document.addEventListener("click", (e) => {
  if (e.target === burger) {
    burger.classList.add("open");
    console.log(e.target);
  }
});

console.log(
  " Общая оценка 100 баллов:\nВёрстка валидная +10 \n Вёрстка семантическая +16 \nВёрстка валидная +10 \n Вёрстка соответствует макету +54 \n   ---------(блок <header> +8) \n    ---------секция About +6 \n    --------секция Favorites \n    -------секция CoffeShop \n    ---------секция Contacts \n    --------секция LibraryCard \n    --------блок <footer> +8 \n    Общие требования к верстке +20\n favicon есть в футере и в закладке страницы(head)"
);
