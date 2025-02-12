import { sendFormData } from "./api.js";

const typeField = document.querySelector("#type");
const priceField = document.querySelector("#price");
const checkInField = document.querySelector("#timein");
const checkOutField = document.querySelector("#timeout");
const roomField = document.querySelector("#room_number");
const capacityField = document.querySelector("#capacity");

const typeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const roomToCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

export function initFormHandlers(formSelector) {
  const form = document.querySelector(formSelector);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const images = document.querySelectorAll(".ad-form__photo img");

    const formData = new FormData(form);

    const transformedData = {
      author: {
        avatar: document.querySelector(".ad-form-header__preview img").src,
      },
      offer: {
        title: formData.get("title"),
        address: formData.get("address"),
        price: parseInt(formData.get("price"), 10),
        type: formData.get("type"),
        rooms: parseInt(formData.get("rooms"), 10),
        guests: parseInt(formData.get("capacity"), 10),
        checking: formData.get("timein"),
        checkout: formData.get("timeout"),
        features: formData.getAll("features"),
        description: formData.get("description"),
        photos: [Array.from(images).map((img) => img.src)],
        location: {
          x: parseFloat(formData.get("address").split(",")[0]),
          y: parseFloat(formData.get("address").split(",")[1]),
        },
      },
    };
    console.log(transformedData);

    try {
      const result = await sendFormData(JSON.stringify(transformedData));
      console.log("Данные успешно отправлены:", result);
      form.reset();
    } catch (error) {
      console.error("Не удалось отправить данные:", error);
    }
  });
}

typeField.addEventListener("change", () => {
  const selectedType = typeField.value;
  const minPrice = typeToMinPrice[selectedType];

  priceField.min = minPrice;
  priceField.placeholder = minPrice.toString();
  priceField.value = minPrice;
});

function syncTime(event) {
  const selectedValue = event.target.value;
  checkInField.value = selectedValue;
  checkOutField.value = selectedValue;
}

checkInField.addEventListener("change", syncTime);
checkOutField.addEventListener("change", syncTime);

document.addEventListener("DOMContentLoaded", function () {
  function updateCapacityOptions() {
    const selectedRoom = roomField.value;
    const allowedCapacities = roomToCapacity[selectedRoom];

    Array.from(capacityField.options).forEach((option) => {
      if (allowedCapacities.includes(Number(option.value))) {
        option.disabled = false;
        option.hidden = false;
      } else {
        option.disabled = true;
        option.hidden = true;
      }
    });

    if (!allowedCapacities.includes(Number(capacityField.value))) {
      capacityField.value = allowedCapacities[0];
    }
  }

  updateCapacityOptions();

  roomField.addEventListener("change", updateCapacityOptions);
});

priceField.addEventListener("input", (e) => {
  priceField.value = e.target.value;
});
