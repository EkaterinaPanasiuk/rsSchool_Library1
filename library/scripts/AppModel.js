import { info } from "./info.js";

export function AppModel() {
  let view = null;
  let data = null;
  let user = null;
  let usersData = [];
  let registerUser = null;
  let loginUser = {
    email: null,
    password: null,
    cardNumber: null,
    visits: null,
  };

  let userRegisterData = {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    initial: null,
    cardNumber: null,
    libruaryCard: null,
    books: [],
    visits: null,
  };
  this.init = function (viewbox) {
    view = viewbox;
    data = info;
    this.initUserDataBase(); /* инициализация бд пользователей из хранилища */
    this.initUser();
    this.updateUserIcon();
    this.updeteCardNumber();
    this.updateProfileText();
    console.log(usersData);
  };
  this.initUser = function () {
    localStorage.getItem("user")
      ? (user = JSON.parse(localStorage.getItem("user")))
      : {
          firstname: null,
          lastname: null,
          email: null,
          password: null,
          initial: null,
          cardNumber: null,
          libruaryCard: null,
          books: [],
          visits: null,
        };
  }; /* инициализация последнего пользователя из хранилища  localStorage*/

  /* инициализация бд пользователей из хранилища  localStorage*/
  this.initUserDataBase = function () {
    localStorage.getItem("usersData")
      ? (usersData = JSON.parse(localStorage.getItem("usersData")))
      : [];
  };
  this.trackUser = function (user) {
    view.trackUser(user);
  };
  this.renderModalWindows = function () {
    view.renderModalWindows();
  };
  this.changeBooks = function (arg) {
    view.changeBooks(data.favorite[arg]);
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
    console.log(user);
    if (user === null || user.firstname === null) view.openNoAuthMenu();
    else view.openWithAuthMenu();
  };

  this.openRegisterModal = function (scrollTop, clientHeight) {
    view.openRegisterModal(scrollTop, clientHeight);
  };
  this.openBurgerMenu = function () {
    view.openBurgerMenu();
  };
  this.closeBurgerMenu = function () {
    view.closeBurgerMenu();
  };
  this.closeAuthorizationeMenu = function () {
    view.closeAuthorizationeMenu();
  };
  /*-----------------------start-about-block-----------*/
  this.drawAboutDots = function () {
    view.drawAboutDots();
  };
  this.activeFirstAboutDot = function () {
    view.activeFirstAboutDot();
  };
  this.activeAboutDot = function (elem) {
    view.activeAboutDot(elem);
  };
  this.moveAboutCarusel = function (elem) {
    if (elem.classList.contains("active-dot")) {
      console.log("contain active");
    } else view.moveAboutCarusel(elem);
  };
  this.moveAboutCaruselByArrow = function (index) {
    view.moveAboutCaruselByArrow(index);
  };
  this.blockBackArrow = function () {
    view.blockBackArrow;
  };
  this.blockNextArrow = function () {
    view.blocNextArrow();
  };
  this.unBlockBackArrow = function () {
    view.unBlockBackArrow();
  };
  this.unBlockNextArrow = function () {
    view.unBlockNextArrow();
  };
  /*-----------------------end-about-block-----------*/
  /*-----------------------start-register-modal-block-----------*/
  /* основная логика обработки ормы регистрациии!!!!!!*/
  this.sendRegisterData = function (registerForm) {
    for (let key in registerForm) {
      if (registerForm[key].length < 1 || registerForm[key].length === "") {
        this.closeRegisterModal();
        return;
      } else if (registerForm.password.length < 7) {
        this.closeRegisterModal();
        return;
      }
    }

    for (let key in userRegisterData) {
      userRegisterData[key] = registerForm[key];
    }
    console.log(userRegisterData);
    userRegisterData.cardNumber = this.generateCardNumber();
    userRegisterData.initial =
      userRegisterData.firstname.slice(0, 1) +
      userRegisterData.lastname.slice(0, 1);
    userRegisterData.visits = this.visitsCounter(userRegisterData);

    /* if (userRegisterData.visits) {
      userRegisterData.visits = Number(userRegisterData.visits) + 1;
    } else userRegisterData.visits = 1; */
    userRegisterData.books = null;
    user = userRegisterData; /* инициализируем юзера */
    this.createUserStore(userRegisterData);
    this.sentRegistrationDatatoLocalstorage();
    this.updateUserIcon(user);
    this.updateProfileText();
    this.closeRegisterModal();
    this.chengeCardCheck();
    console.log(userRegisterData);
  };
  this.sendLoginData = function (loginform) {
    let authUser;
    console.log(loginform);
    let userFromDB = usersData.filter(
      (i) =>
        loginform.loginemail === i.email || loginform.loginemail === i.email
    );
    console.log(userFromDB);

    let filtred = userFromDB.filter(
      (i) => i.password === loginform.loginpassword
    );
    console.log(filtred);
    filtred.length > 0 ? (authUser = filtred[0]) : null;
    console.log(authUser);
    //  authUser.visits = this.visitsCounter(authUser);
    user = authUser;
    view.closeLoginModal();
    this.updateProfileText();
    this.chengeCardCheck();

    this.updateUserIcon(user);
  };
  this.visitsCounter = function (user) {
    if (user.visits) {
      user.visits = Number(user.visits) + 1;
    } else user.visits = 1;
    return user.visits;
  };
  this.createUserStore = function (data) {
    localStorage.setItem("user", JSON.stringify(data));
  };
  this.validateRegisterData = function (key, value) {
    switch (true) {
      case key === "firstname": {
        this.validateText(value);
        userRegisterData[key] = value;
      }
      case key === "lastname": {
        this.validateText(value);
        userRegisterData[key] = value;
      }
      case key === "password": {
        this.validatePassword(value);
        userRegisterData[key] = value;
      }
      case key === "email": {
        this.validateText(value);
        userRegisterData[key] = value;
      }
    }
    /* обновление иконки после регистрации пользователя */
    /*  let number = Object.values(userRegisterData).filter((i) => i !== null);
    console.log(number.length);
    if (number.length >= 4) {
      userRegisterData.cardNumber = this.generateCardNumber();
      user =
        userRegisterData; /* переопределяем пользователя после регистрации */
    /* this.sentRegistrationDatatoLocalstorage(); /* отправка даннычх в стор */
    /* view.closeRegisterModal();
      this.updateUserIcon(
        user
      ); */
    // }
  };
  this.validateText = function (text) {
    if (text.trim.length > 0) return text;
    else return null;
  };
  this.validatePassword = function (pass) {
    if (pass.trim.length > 7) return pass;
    else return null;
  };
  this.updateRegisterForm = function (key, value) {
    switch (true) {
      case key === "firstname" || key === "lastname":
        if (value.trim().length > 0) {
          userRegisterData[key] = value.trim();
        } else userRegisterData[key] = null;
        this.validateRegisterData();
        break;
      case key === "password":
        if (value.trim().length >= 8) {
          userRegisterData[key] = value.trim();
        } else userRegisterData[key] = null;
        this.validateRegisterData();
        break;
      case key === "email":
        if (value.trim().length >= 3) {
          userRegisterData[key] = value.trim();
        } else userRegisterData[key] = null;
        this.validateRegisterData();
        break;
    }
  };
  this.sentRegistrationDatatoLocalstorage = function () {
    this.initUserDataBase;
    //this.createUserDataBase();
    usersData.push(userRegisterData);
    localStorage.setItem("usersData", JSON.stringify(usersData));
  };
  /*-----------------------end-register-modal-block-----------*/
  /*-------------------------- start- modal-login-window--------------------------------*/

  this.openLoginModal = function () {
    view.openLoginModal();
  };

  /*-------------------------- end- modal-login-window--------------------------------*/
  this.updateUserIcon = function () {};
  /*-----------------------start-header--block-----------*/

  this.updateUserIcon = function (user) {
    if (user) {
      let userName = user.initial;
      const icon = document.getElementById("user-icon");
      const nameIcon = document.createElement("span");
      nameIcon.setAttribute("id", "user-icon");
      nameIcon.classList.add("user-icon-name");
      nameIcon.setAttribute("title", `${user.firstname + " " + user.lastname}`);
      nameIcon.innerText = userName.toUpperCase();
      icon.replaceWith(nameIcon);
    }
  };
  this.generateCardNumber = function () {
    function a() {
      function generate() {
        return Math.ceil(Math.random() * Math.random() * Math.random() * 63355);
      }
      let code = [];
      while (code.length < 10) {
        code.push(generate());
      }
      const f = code.map((i) => i.toString(16));
      return f.join("").slice(0, 9);
    }
    return a();
  };

  this.updeteCardNumber = function () {
    //console.log(localStorage.getItem("registerData"));
    /*   let code = JSON.parse(localStorage.getItem("registerData")).code
      ? JSON.parse(localStorage.getItem("registerData")).code
      : 1; */
    // console.log(code);
    /*
      ? JSON.parse(localStorage.getItem("registerData")).code
      : null;
    code ? code : null;
    this.updateProfileText(); */
  };
  this.chengeCardCheck = function () {
    view.chengeCardCheck(user, "card-check-btn");
  };
  /* обновление номера профиля юзера */
  this.updateProfileText = function () {
    let text = "Profile";
    user === null || user.firstname === null
      ? (text = "Profile")
      : (text = user.cardNumber);
    document.getElementById("profile-cardnumber").innerText = text;
  };
  this.openMyProfileModal = function () {
    view.openMyProfileModal(user);
  };
  this.buyBook = function (name, author) {
    if (user !== null) {
      if (user.libruaryCard === true) {
        /* дизэйблим кнопку и добавляем кнопку в массив купленных */
      } else {
        console.log("open");
        this.openLibruaryCardModal();
      }
    } else {
      view.openLoginModal();
    }
  };
  this.closeRegisterModal = function () {
    view.closeRegisterModal();
  };
  this.logOut = function () {
    usersData.map((i) => {
      if (user.password === i.password && user.email === i.email) {
        for (let key in user) {
          i[key] = user[key];
        }
        console.log(i);
      }
    });
    user = null;
    localStorage.setItem("usersData", JSON.stringify(usersData));
    localStorage.setItem("user", JSON.stringify(user));
    this.logoutUser(user);
  };

  this.logoutUser = function () {
    this.logoutUserIcon();
    this.updateProfileText();
    this.closeAuthorizationeMenu();
    view.logoutCardCheck();
  };
  this.logoutUserIcon = function () {
    const icon = document.getElementById("user-icon");
    const logoIcon = document.createElement("img");
    logoIcon.setAttribute("id", "user-icon");
    logoIcon.setAttribute("alt", "icon_user");
    logoIcon.setAttribute("src", "./accets/icon_profile.svg");
    console.log(icon);
    console.log(logoIcon);

    icon.replaceWith(logoIcon);
  };
  this.openLibruaryCardModal = function () {
    view.openLibruaryCardModal();
  };
  this.validateLibForm = function (form) {
    console.log(form);
    for (let key in form) {
      if (
        (key === "cardnumber" && form[key].trim.length !== 16) ||
        form.expcode1.trim.length !== 2 ||
        form.expcode2.trim.length !== 2 ||
        form.cvc.trim.length !== 3
      ) {
        return;
      } else {
        userRegisterData.libruaryCard = true;
      }
    }
    //  model.validateLibForm(form);
  };
}
