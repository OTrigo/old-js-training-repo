const columns = document.querySelectorAll(".column");

const addNewCard = document.querySelector(".action-add");

addNewCard.addEventListener("click", () => {
  const newCard = document.createElement("div");
  const numberOfCards = document.querySelectorAll(".item").length + 1;
  newCard.innerHTML = `Card ${
    numberOfCards > 9 ? numberOfCards : "0" + numberOfCards
  } `;
  newCard.classList.add("item");
  newCard.setAttribute("draggable", true);
  const firstColumn = document.querySelector(".column:not(:first-of-type)");
  firstColumn.append(newCard);
  setEventListenerPerItem();
});

document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

const setEventListenerPerItem = () => {
  columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
      const elementInDragging = document.querySelector(".dragging");
      const previewItemInDrop = getNewPosition(item, e.clientY);

      if (previewItemInDrop) {
        previewItemInDrop?.insertAdjacentElement("afterend", elementInDragging);
      } else {
        item.prepend(elementInDragging);
      }
    });
  });
};

const getNewPosition = (column, posY) => {
  const cardsInColumn = column.querySelectorAll(".item:not(.dragging)");

  const result = {
    closestCard: 0,
  };

  for (const refer_card of cardsInColumn) {
    const boxSize = refer_card.getBoundingClientRect();
    const boxCenterY = boxSize.y + boxSize.height / 2;

    if (posY >= boxCenterY) result.closestCard = refer_card;
  }

  return result.closestCard;
};

document.addEventListener("DOMContentLoaded", () => {
  setEventListenerPerItem();
});
