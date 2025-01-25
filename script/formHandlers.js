import { sendFormData } from "./api.js";

export function initFormHandlers(formSelector) {
  const form = document.querySelector(formSelector);
  const typeField = form.querySelector("#type");
  const priceField = form.querySelector("#price");
  const checkInField = form.querySelector("#timein");
  const checkOutField = form.querySelector("#timeout");
  const roomField = form.querySelector("#room_number");
  const capacityField = form.querySelector("#capacity");

  setupTypePriceSync(typeField, priceField);
  setupTimeSync(checkInField, checkOutField);
  setupRoomCapacitySync(roomField, capacityField);

  initializeFields(typeField, checkInField, roomField);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const transformedData = {
      author: {
        avatar: "img/avatars/default.png",
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
        photos: [],
        location: {
          x: parseFloat(formData.get("address").split(",")[0]),
          y: parseFloat(formData.get("address").split(",")[1]),
        },
      },
    };

    try {
      const result = await sendFormData(
        "http://localhost:8080/offer",
        JSON.stringify(transformedData)
      );
      console.log("Данные успешно отправлены:", result);
      form.reset();
    } catch (error) {
      console.error("Не удалось отправить данные:", error);
    }
  });
}

function setupTypePriceSync(typeField, priceField) {
  const typeToMinPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  typeField.addEventListener("change", () => {
    const selectedType = typeField.value;
    const minPrice = typeToMinPrice[selectedType];

    priceField.min = minPrice;
    priceField.placeholder = minPrice.toString();
  });
}

function setupTimeSync(checkInField, checkOutField) {
  checkInField.addEventListener("change", () => {
    checkOutField.value = checkInField.value;
  });

  checkOutField.addEventListener("change", () => {
    checkInField.value = checkOutField.value;
  });
}

function setupRoomCapacitySync(roomField, capacityField) {
  const roomToCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  roomField.addEventListener("change", () => {
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
  });
}

function initializeFields(typeField, checkInField, roomField) {
  typeField.dispatchEvent(new Event("change"));
  checkInField.dispatchEvent(new Event("change"));
  roomField.dispatchEvent(new Event("change"));
}
