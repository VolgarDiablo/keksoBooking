export function renderCards(data, templateId, containerSelector) {
  const template = document.querySelector(templateId);
  const container = document.querySelector(containerSelector);

  if (!template || !container) {
    console.error("Template or container not found.");
    return;
  }

  data.forEach((item) => {
    const cardElement = createCardElement(item, template);
    container.appendChild(cardElement);
  });
}

function createCardElement(item, template) {
  const cardElement = template.content.cloneNode(true);

  cardElement.querySelector(".popup__avatar").src = item.author.avatar;
  cardElement.querySelector(".popup__title").textContent = item.offer.title;
  cardElement.querySelector(".popup__text--address").textContent =
    item.offer.address;
  cardElement.querySelector(
    ".popup__text--price"
  ).innerHTML = `${item.offer.price} $/ночь`;
  cardElement.querySelector(".popup__type").textContent = item.offer.type;
  cardElement.querySelector(
    ".popup__text--capacity"
  ).textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  cardElement.querySelector(
    ".popup__text--time"
  ).textContent = `Заезд после ${item.offer.checking}, выезд до ${item.offer.checkout}`;
  cardElement.querySelector(".popup__description").textContent =
    item.offer.description;

  populateFeatures(
    cardElement.querySelector(".popup__features"),
    item.offer.features
  );
  populatePhotos(
    cardElement.querySelector(".popup__photos"),
    item.offer.photos
  );

  return cardElement;
}

function populateFeatures(featuresContainer, features) {
  featuresContainer.innerHTML = "";
  features.forEach((feature) => {
    const li = document.createElement("li");
    li.className = `popup__feature popup__feature--${feature}`;
    featuresContainer.appendChild(li);
  });
}

function populatePhotos(photosContainer, photos) {
  photosContainer.innerHTML = "";
  photos.forEach((photo) => {
    const img = document.createElement("img");
    img.src = photo;
    img.className = "popup__photo";
    img.width = 45;
    img.height = 40;
    img.alt = "Фотография жилья";
    photosContainer.appendChild(img);
  });
}
