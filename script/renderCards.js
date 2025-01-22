export function renderCard(data) {
  const template = document.querySelector("#card");
  const clonedTemplate = template.content.cloneNode(true);

  clonedTemplate.querySelector(".popup__avatar").src = data.author.avatar;
  clonedTemplate.querySelector(".popup__title").textContent = data.offer.title;
  clonedTemplate.querySelector(".popup__text--address").textContent =
    data.offer.address;
  clonedTemplate.querySelector(
    ".popup__text--price"
  ).textContent = `${data.offer.price} грн/ночь`;
  clonedTemplate.querySelector(".popup__type").textContent = data.offer.type;
  clonedTemplate.querySelector(
    ".popup__text--capacity"
  ).textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  clonedTemplate.querySelector(
    ".popup__text--time"
  ).textContent = `Заезд после ${data.offer.checking}, выезд до ${data.offer.checkout}`;
  clonedTemplate.querySelector(".popup__description").textContent =
    data.offer.description;

  const featuresContainer = clonedTemplate.querySelector(".popup__features");
  featuresContainer.innerHTML = "";
  data.offer.features.forEach((feature) => {
    const li = document.createElement("li");
    li.classList.add("popup__feature", `popup__feature--${feature}`);
    featuresContainer.appendChild(li);
  });

  const photosContainer = clonedTemplate.querySelector(".popup__photos");
  photosContainer.innerHTML = "";
  data.offer.photos.forEach((photo) => {
    const img = document.createElement("img");
    img.classList.add("popup__photo");
    img.src = photo;
    img.width = 45;
    img.height = 40;
    img.alt = "Фотография жилья";
    photosContainer.appendChild(img);
  });

  return clonedTemplate;
}
