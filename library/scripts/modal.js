export class Modal {
  constructor(modalId, openBtnId, closeBtnId) {
    this.modal = document.getElementById(`${modalId}`);
    this.btnOpen = document.getElementById(`${openBtnId}`);
    this.closeBtn = document.getElementById(`${closeBtnId}`);
    this.html = document.documentElement;
    this.scrollTop = 0;
    this.clientHeight = 0;
  }
  init() {
    this.modal.classList.add("visible");
    this.modal.classList.add("animation-open");
    this.html.classList.add("stopScroll");
    this.trackEvent();
    this.trackPageScroll();
  }
  trackPageScroll() {
    this.scrollTop = this.html.scrollTop;
    this.clientHeight = this.html.clientHeight;
    this.changeSizeModal();
  }
  changeSizeModal() {
    this.modal.style.top = this.scrollTop + "px";
  }
  trackEvent() {
    document.addEventListener("click", (e) => {
      e.preventDefault();
      switch (true) {
        case e.target === this.btnOpen:
          {
            this.modal.classList.add("visible");
            this.modal.classList.add("animation-open");
            this.html.classList.add("stopScroll");
          }
          break;
        case e.target === this.closeBtn:
          this.closeModal();
          break;
        case e.target === this.modal:
          {
            e.stopPropagation();
            this.closeModal();
          }
          break;
      }
    });
  }
  closeModal() {
    this.modal.classList.remove("animation-open");
    this.modal.classList.add("animation-close");
    setTimeout(() => {
      this.modal.classList.remove("animation-close");
      this.modal.classList.remove("visible");
    }, 500);
    this.html.classList.remove("stopScroll");
    this.html.scrollTo(0, this.scrollTop);
  }
}
