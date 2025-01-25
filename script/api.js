const BASE_URL = "http://localhost:8080";

// Функция для получения списка объявлений
export async function fetchAnnouncements() {
  try {
    const response = await fetch(`${BASE_URL}/offers`);

    if (!response.ok) {
      throw new Error(
        `Ошибка загрузки: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении объявлений:", error);
    throw error;
  }
}

export async function sendFormData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Ошибка отправки данных: ${response.statusText}`);
  }

  return response.json();
}
