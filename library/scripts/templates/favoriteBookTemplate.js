export function drawBook(data) {
  let id = (data.subtitle + data.title).split(" ");
  id.filter((i) => i !== " ");
  id.join("");
  const temp = `
  <div class="favorite-item-container"  >
    <div class="favorite-item"  data-name="${data.title}" data-author="${
    data.subtitle
  }" id="${id.join("")}">
      <h4 class="favorite-item__maintitle text">Staff Picks</h4>
      <hr class="favorite-item__row" />
      <h4 class="favorite-item__title">
        ${data.title}
        <br />
        <span class="favorite-item__subtitle">${data.subtitle}</span>
      </h4>

      <p class="favorite-item__text">
      ${data.text}
      </p>
      <button class="favorite-item__btn">Buy</button>
      <img
        class="favorite-item__img"
        src=${data.src}
        alt=${data.title}
      />
    </div>
  </div>
`;
  return temp;
}
