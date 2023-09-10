export function AppController() {
  let box = null;
  let model = null;
  this.init = function (mybox, mymodel) {
    box = mybox;
    model = mymodel;
    localStorage.setItem("registerData", null);

    document.addEventListener("DOMContentLoaded", () => {
      /*- первичное присвоение класса active первой точке карусели-*/
      this.drawAboutDots();
      this.activeFirstAboutDot();
      /*- первичное блокировка стрелки карусели-*/
      this.blockBackArrow();
      /*- первичное отрисовка книг по тегу 'зима'-*/
      this.changeBooks("winter");
      /* первичне отслеживание юзера */
      this.trackUser();
      window.addEventListener("resize", () => {
        this.drawAboutDots();
      });
      document.addEventListener("click", (e) => {
        console.log(e.target);
        e.preventDefault();
        // e.stopPropagation();
        switch (true) {
          /* выход из аккаунта */
          case e.target.id === "log-out":
            this.logOut();
            break;
          /* запус открытия регистрации */
          case e.target.id === "register-submit-btn":
            {
              const form = document.getElementById("registration-form");
              const registerForm = new FormData(form);
              const userform = {};
              for (let [key, value] of registerForm) {
                userform[key] = value;
              }
              this.sendRegisterData(userform);
            }
            break;
          /* запуск логина пользователя */
          case e.target.id === "login-submit-btn":
            {
              const loginform = {};
              const loginData = new FormData(
                document.getElementById("login-form")
              );
              for (let [key, value] of loginData) {
                loginform[key] = value;
              }
              this.sendLoginData(loginform);
            }
            break;
          case e.target.id === "lib-submit-btn":
            {
              const libForm = new FormData(document.getElementById("lib-form"));
              const form = {};
              for (let [key, value] in libForm) {
                form[key] = libForm[value];
              }
              this.validateLibForm(form);
            }
            break;
          /* запус покупки книги */
          case e.target.classList.contains("favorite-item__btn"):
            {
              const id = e.target.parentElement.id;
              this.buyBook(
                id,
                e.target.parentElement.dataset.name,
                e.target.parentElement.dataset.author
              );
            }
            break;
          case e.target.id === "log-in" || e.target.id === "login-digital-btn":
            this.openLoginModal();
            this.closeAuthorizationeMenu();
            break;
          case e.target.id === "my-profile":
            this.openMyProfileModal();
            this.closeAuthorizationeMenu();
            break;
          case e.target.id === "digital-profile": {
            this.openMyProfileModal();
          }
          /*--------------------------start- header-burger-menu-----------------------------------*/
          /* ОТкрытие меню прои клике на header-burger */
          case e.target.id === "burger" && e.target.classList.contains("close"):
            this.closeAuthorizationeMenu();
            this.openBurgerMenu();
            break;
          /* закрытие открытого навигационного меню прои клике на header-burger  */
          case e.target.id === "burger" && e.target.classList.contains("open"):
            this.closeBurgerMenu();
            this.closeAuthorizationeMenu();
            break;
          /*-------------------------end- header-burger-menu-----------------------------------*/
          /*--------------------------start- user-icon-menu--------------------------------*/
          case e.target.id === "user-icon" &&
            e.target.classList.contains("open-user-icon"):
            {
              this.closeBurgerMenu(); /* закрываем меню-бургер */
              this.closeAuthorizationeMenu(); /* oткрываем меню авторизации-регистрации */
            }
            break;
          case e.target.id === "user-icon" &&
            !e.target.classList.contains("open-user-icon"):
            {
              this.closeBurgerMenu(); /* закрываем меню-бургер */
              this.openAuthorizationeMenu(); /* щткрываем меню авторизации-регистрации */
            }
            break;
          /*-------------------------- end- user-icon-menu---------------------------------*/
          /*-------------------------- start- favorite-slider--------------------------------*/

          case e.target.classList.contains("favorite-form__label"):
            this.changeFavoriteItemsOpacity();
            this.changeRadioChecked(e.target.getAttribute("for"));

            function start() {
              model.changeBooks(e.target.getAttribute("for"));
            }
            setTimeout(start, 2900);

            break;
          /*-------------------------- end- favorite-slider--------------------------------*/

          /*-------------------------- start- modal-registration-window--------------------------------*/

          case e.target.id === "register" || e.target.id === "digital-singUp":
            /*передаем значение скролла */
            //this.stopScroll(e);
            this.closeAuthorizationeMenu();
            this.openRegisterModal(
              document.documentElement.scrollTop,
              document.documentElement.clientHeight
            );
            break;
          /*-------------------------- end- modal-registration-window--------------------------------*/
          /*-------------------------- start- modal-login-window--------------------------------*/

          /*-------------------------- end- modal-login-window--------------------------------*/

          case e.target.id === "header__link":
            this.closeBurgerMenu();
            this.closeAuthorizationeMenu();
            break;
          case !e.target.classList.contains("open__menu") &&
            document
              .getElementById("header__menu")
              .classList.contains("open-menu"):
            this.closeBurgerMenu();
            this.closeAuthorizationeMenu();
            break;
          case e.target.id === "register-modal":
            this.closeRegisterModal();
            break;
          case e.target.id === "close-register-btn":
            this.closeRegisterModal();
            break;

          /*-------------------------- start-about-- carusel--------------------------------*/

          case e.target.id === "arrow-back":
            this.sliderBack(e);
            break;
          case e.target.id === "arrow-next":
            this.sliderNext(e);
            break;
          case e.target.classList.contains("dot"):
            this.moveAboutCarusel(e.target);
            this.activeAboutDot(e.target);
            break;
        }
      });
      /*-------------------------- end-about-- carusel--------------------------------*/

      /*       document.addEventListener("change", (e) => {
        console.log(e.target.value);
        switch (true) {
          case e.target.id === "firstname":
            this.validateRegisterData(e.target.id, e.target.value);
            break;
          case e.target.id === "lastname":
            this.validateRegisterData(e.target.id, e.target.value);
            break;
          case e.target.id === "email":
            this.validateRegisterData(e.target.id, e.target.value);
            break;
          case e.target.id === "password":
            this.validateRegisterData(e.target.id, e.target.value);
            break;
          /* case e.target.id === "login-password":
            this.updateRegisterForm(e.target.id, e.target.value);
            break;
          case e.target.id === "login-email":
            this.updateRegisterForm(e.target.id, e.target.value);
            break; 
        }
      }); */
    });
  };
  /*-----------------------end- init-----------*/
  /*-----------------------end- init-----------*/
  /*-----------------------end- init-----------*/
  /*-----------------------end- init-----------*/

  this.sendLoginData = function (loginform) {
    model.sendLoginData(loginform);
  };
  this.validateText = function (obj, key, value) {
    model.validateText(obj, key, value);
  };
  this.validatePassword = function (obj, key, value) {
    model.validatePassword(obj, key, value);
  };
  /* validation registerform */
  this.sendRegisterData = function (obj) {
    model.sendRegisterData(obj);
  };

  this.openLoginModal = function () {
    model.openLoginModal();
  };
  /*-----------------------start-about-carosel-----------*/
  //draw dots 3 or 5, dependent on size
  this.drawAboutDots = function () {
    model.drawAboutDots();
  };
  this.activeFirstAboutDot = function () {
    model.activeFirstAboutDot();
  };
  this.activeAboutDot = function (elem) {
    model.activeAboutDot(elem);
  };
  this.moveAboutCarusel = function (elem) {
    model.moveAboutCarusel(elem);
  };
  this.sliderBack = function () {
    console.log("back");
    this.moveAboutCaruselByArrow(-1);
  };
  this.sliderNext = function () {
    console.log("next");
    this.moveAboutCaruselByArrow(1);
  };
  this.moveAboutCaruselByArrow = function (index) {
    model.moveAboutCaruselByArrow(index);
  };

  this.blockBackArrow = function () {
    model.blockBackArrow();
  };
  this.blockNextArrow = function () {
    model.blocNextArrow();
  };
  this.unBlockBackArrow = function () {
    model.unBlockBackArrow();
  };
  this.unBlockNextArrow = function () {
    model.unBlockNextArrow();
  };
  /*-----------------------end-about-carosel-----------*/

  /*-----------------------end-about-block-----------*/

  this.changeBooks = function (arg) {
    model.changeBooks(arg);
  };
  // add "checked" class for favorite-radio-btn
  this.changeRadioChecked = function (arg) {
    model.changeRadioChecked(arg);
  };
  // animation-closed favorite-items books-elenment
  this.changeFavoriteItemsOpacity = function () {
    model.changeFavoriteItemsOpacity();
  };

  this.openRegisterModal = function (scrollTop, clientHeight) {
    model.openRegisterModal(scrollTop, clientHeight);
  };
  this.closeRegisterModal = function () {
    model.closeRegisterModal();
  };
  this.getFormData = function (arg) {
    console.log(arg);
  };
  this.validateRegisterData = function (key, value) {
    model.validateRegisterData(key, value);
  };
  this.updateRegisterForm = function (key, value) {
    model.updateRegisterForm(key, value);
  };
  /*   this.stopScroll = function (value) {
    console.log("scrollstop   " + value);
  }; */
  /* -----------------------start-header--burger-menu----------------------------- */
  this.openBurgerMenu = function () {
    model.openBurgerMenu();
  };
  this.closeBurgerMenu = function () {
    model.closeBurgerMenu();
  };

  /* -------------------------end-header-burger-menu----------------------------- */

  /* -------------------------start--user-menu--block----------------------------- */
  this.closeAuthorizationeMenu = function () {
    model.closeAuthorizationeMenu();
  };
  this.openAuthorizationeMenu = function () {
    model.openAuthorizationeMenu();
  };
  /* -------------------------end--user-menu--block----------------------------- */
  this.renderModalWindows = function () {
    model.renderModalWindows();
  };
  this.openMyProfileModal = function () {
    model.openMyProfileModal();
  };
  this.trackUser = function () {
    model.trackUser();
  };
  this.buyBook = function (id, name, author) {
    console.log(id);
    model.buyBook(id, name, author);
  };
  this.logOut = function () {
    model.logOut();
  };
  this.validateLibForm = function (form) {
    model.validateLibForm(form);
  };
}
