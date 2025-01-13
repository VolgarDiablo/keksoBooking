const mapFilters = document.getElementById("map__filters");
const adFilters = document.getElementById("ad-form");
const setPointTokyo = [35.67267785620779, 139.75866624868985];
const inputAddress = document.getElementById("address");

const mainPinIcon = L.icon({
  iconUrl: "./img/main-pin.svg",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const pinIcon = L.icon({
  iconUrl: "./img/pin.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function setPageInactive() {
  stateElementsForm(mapFilters, true);
  stateElementsForm(adFilters, true);
}

setPageInactive();

function setPageActive() {
  stateElementsForm(mapFilters, false);
  stateElementsForm(adFilters, false);
}

export function stateElementsForm(form, state) {
  Array.from(form.elements).forEach((element) => {
    element.disabled = state;
  });
}

// Инициализация
const map = L.map("map-canvas").setView(setPointTokyo, 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Главная метка
const mainMarker = L.marker(setPointTokyo, {
  icon: mainPinIcon,
  draggable: true,
}).addTo(map);

// Обновление при перемещении метки
mainMarker.on("move", (event) => {
  const { lat, lng } = event.target.getLatLng();
  inputAddress.value = `${lat}, ${lng}`;
});

const adLocations = [
  { lat: 35.652, lng: 139.758666 },
  { lat: 35.622, lng: 139.76 },
  { lat: 35.624, lng: 139.457 },
];

// Добавление обычных меток на карту
adLocations.forEach((location) => {
  L.marker([location.lat, location.lng], {
    icon: pinIcon,
  }).addTo(map);
});

map.whenReady(() => {
  console.log("Карта загрузилась");
  setPageActive();
  inputAddress.value = `${setPointTokyo[0]}, ${setPointTokyo[1]}`;
});
