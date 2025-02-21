import { renderCard } from "./renderCards.js";
import { fetchAnnouncements } from "./api.js";

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

export function setPageInactive() {
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

const map = L.map("map-canvas").setView(setPointTokyo, 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const mainMarker = L.marker(setPointTokyo, {
  icon: mainPinIcon,
  draggable: true,
}).addTo(map);

mainMarker.on("move", (event) => {
  const { lat, lng } = event.target.getLatLng();
  inputAddress.value = `${lat}, ${lng}`;
});

let markersLayer = L.layerGroup().addTo(map);
let allAnnouncements = [];

function addMarkersToMap(announcements) {
  markersLayer.clearLayers();

  announcements.forEach((announcement) => {
    const marker = L.marker(
      [announcement.offer.location.x, announcement.offer.location.y],
      { icon: pinIcon }
    );

    markersLayer.addLayer(marker);
    marker.bindPopup(renderCard(announcement));
  });
}

async function loadAnnouncements() {
  try {
    allAnnouncements = await fetchAnnouncements();
    addMarkersToMap(allAnnouncements);
  } catch (error) {
    console.error("Не удалось загрузить данные:", error);
    alert("Ошибка загрузки данных. Попробуйте обновить страницу.");
  } finally {
    setPageActive();
  }
}

map.whenReady(() => {
  setPageActive();
  inputAddress.value = `${setPointTokyo[0]}, ${setPointTokyo[1]}`;
  loadAnnouncements();
});

let isPopupOpened = false;

map.on("popupopen", () => {
  isPopupOpened = true;
});

map.on("popupclose", () => {
  isPopupOpened = false;
});

map.on("movestart", () => {
  if (isPopupOpened && map.dragging.enabled()) {
    map.closePopup();
  }
});

function applyFilters() {
  const type = document.getElementById("housing-type").value;
  const price = document.getElementById("housing-price").value;
  const rooms = document.getElementById("housing-rooms").value;
  const guests = document.getElementById("housing-guests").value;

  const selectedFeatures = Array.from(
    document.querySelectorAll("#housing-features input:checked")
  ).map((input) => input.value);

  const filteredAnnouncements = allAnnouncements.filter((announcement) => {
    const offer = announcement.offer;

    if (type !== "any" && offer.type !== type) {
      return false;
    }

    if (price !== "any") {
      if (price === "middle" && !(offer.price >= 1000 && offer.price <= 5000)) {
        return false;
      }
      if (price === "low" && offer.price > 1000) {
        return false;
      }
      if (price === "high" && offer.price < 10000) {
        return false;
      }
    }

    if (rooms !== "any" && offer.rooms !== Number(rooms)) {
      return false;
    }

    if (guests !== "any" && offer.guests !== Number(guests)) {
      return false;
    }

    if (selectedFeatures.length > 0) {
      const hasAllFeatures = selectedFeatures.every((feature) =>
        offer.features.includes(feature)
      );
      if (!hasAllFeatures) {
        return false;
      }
    }

    return true;
  });

  addMarkersToMap(filteredAnnouncements);
}

mapFilters.addEventListener("change", () => {
  applyFilters();
});
