export class Carusel {
  constructor(
    caruselId,
    caruselContainer,
    btnLeft,
    btnRight,
    caruselVisible,
    caruselRow,
    img,
    caruselDots,
    mediaQuery
  ) {
    this.carusel = document.getElementById(caruselId);
    this.caruselContainer = document.getElementById(caruselContainer);
    this.btnLeft = document.getElementById(btnLeft);
    this.btnRight = document.getElementById(btnRight);
    this.caruselRow = document.getElementById(caruselRow);
    this.caruselVisible = document.getElementById(caruselVisible);
    this.imgCollection = document.querySelectorAll(`.${img}`);
    this.caruselDots = document.getElementById(caruselDots);
    this.dotCollection = null;
    this.mediaQuery = mediaQuery;

    //this.dotCollection = document.querySelectorAll(`.${dot}`);
    this.totalWidth = null;
    this.totalNumber = 0;
    this.imgWidth = null;
    this.imgHeight = null;
    this.shift = null;
    this.currentShift = null;
    this.count = 0;
    this.visibleWidth = null;
    this.differNumber = null;
    this.clientWidth = null;
  }

  init() {
    const rowWidth = getComputedStyle(this.caruselRow);
    const imgWidth = getComputedStyle(this.imgCollection[0]);
    const imgHeight = getComputedStyle(this.imgCollection[0]);
    this.totalNumber = this.imgCollection.length;
    this.totalWidth = rowWidth.width.slice(0, rowWidth.width.length - 2);
    this.imgWidth = imgWidth.width.slice(0, imgWidth.width.length - 2);
    this.imgHeight = imgHeight.height.slice(0, imgHeight.width.length - 2);
    this.caruselVisible.style.height = this.imgHeight + "px";
    const visibleCaruselWidth = getComputedStyle(this.caruselVisible);
    this.visibleWidth = visibleCaruselWidth.width.slice(
      0,
      visibleCaruselWidth.width.length - 2
    );

    /*ширина 1 картинки*/
    this.shift = Math.ceil(this.totalWidth / this.totalNumber);
    /*сдвиг влево всего блока картинок*/
    this.currentShift = rowWidth.left.slice(0, rowWidth.left.length - 2);
    this.differNumber = Math.ceil(
      (this.totalWidth - this.visibleWidth) / this.shift
    );
    this.clientWidth = document.documentElement.clientWidth;

    document.addEventListener("DOMContentLoaded", () => {
      this.startRender();
    });
    window.addEventListener("resize", () => {
      this.trackResizing();
    });
  }
  trackEvents() {
    this.init();
    document.addEventListener("click", (e) => {
      e.preventDefault();
      switch (true) {
        case e.target === this.btnRight:
          {
            this.moveCaruselRow(-1);
            this.unDisabledBtn(this.btnLeft);
            this.changeCount(1);
            console.log("coloring" + this.currentShift / this.shift);

            this.coloringDot(-this.currentShift / this.shift);
          }
          break;
        case e.target === this.btnLeft:
          {
            this.moveCaruselRow(1);
            this.unDisabledBtn(this.btnRight);
            this.changeCount(-1);
            this.coloringDot(-this.currentShift / this.shift);
          }
          break;
        case e.target.classList.contains("dot"):
          {
            let num = Number(e.target.id.slice(4));
            this.coloringDot(num);
            this.moveCaruselByDots(-num);
            this.changeCountByDot(num);
            switch (true) {
              case num === 0 || num === "0":
                {
                  this.disabledBtn(this.btnLeft);
                  this.unDisabledBtn(this.btnRight);
                  this.moveCaruselRow(num);
                }
                break;
              case num === this.totalNumber - 1:
                {
                  this.disabledBtn(this.btnRight);
                  this.unDisabledBtn(this.btnLeft);
                }
                break;
              case num > 0 && num < this.totalNumber - 1:
                {
                  this.unDisabledBtn(this.btnLeft);
                  this.unDisabledBtn(this.btnRight);
                }
                break;
            }
          }
          break;
      }
    });
  }
  trackResizing() {
    this.clientWidth = document.documentElement.clientWidth;
    if (Number(this.clientWidth) <= Number(this.mediaQuery)) {
      console.log("eeeeeeeee");
      this.renderDots(); //this.trackEvents();
      //this.startRender();
    }
  }
  startRender() {
    this.disabledBtn(this.btnLeft);
    this.renderDots();

    console.log(this.totalNumber);
    console.log(this.totalWidth);
    console.log(this.shift);
  }

  moveCaruselRow(koef) {
    this.currentShift = Number(this.currentShift) + Number(koef * this.shift);
    this.caruselRow.style.left = this.currentShift + "px";
  }
  moveCaruselByDots(num) {
    this.currentShift = this.shift * num;
    this.caruselRow.style.left = this.currentShift + "px";
  }
  coloringDot(num) {
    this.dotCollection = document.querySelectorAll(`.dot`);
    this.dotCollection.forEach(
      (i) => (i.style.backgroundColor = "greenyellow")
    );
    this.dotCollection[num].style.backgroundColor = "red";
  }
  renderDots() {
    let dotNumber;
    if (this.visibleWidth > this.mediaQuery) {
      dotNumber = this.differNumber + 1;
    } else dotNumber = this.totalNumber;
    console.log(dotNumber + "  dotNumber");
    /*     let width = document.documentElement.clientWidth;
    console.log(width);
    if (width > this.mediaQuery) {
      let num = Math.ceil(this.totalWidth-this.visibleWidth)/
      let dotsCollection = ``;
      for (let i = 0; i < this.totalNumber; i++) {
        dotsCollection += `<div class="dot" id="dot-${i}"></div>`;
      }
      this.caruselDots.innerHTML = dotsCollection;
      this.coloringDot(0);
    }
    else{ */
    let dotsCollection = ``;
    for (let i = 0; i < dotNumber; i++) {
      dotsCollection += `<div class="dot" id="dot-${i}"></div>`;
    }
    this.caruselDots.innerHTML = dotsCollection;
    this.coloringDot(0);
    //}
  }
  unDisabledBtn(btn) {
    btn.removeAttribute("disabled", "");
  }
  disabledBtn(btn) {
    btn.setAttribute("disabled", "");
  }
  changeCount(value) {
    this.count = this.count + value;
    this.examinationCount();
  }
  changeCountByDot(value) {
    this.count = value;
    this.examinationCount();
  }

  examinationCount() {
    switch (true) {
      case this.count === 0 || this.count === "0":
        this.disabledBtn(this.btnLeft);
        break;
      case this.count === this.totalNumber - 1:
        this.disabledBtn(this.btnRight);
        break;
    }
  }
}
