const avatarPreview = document.querySelector("[name=imgAvatar]");
const imagesPreview = document.querySelector(".ad-form__photo");
const avatarInput = document.querySelector("#avatar");
const imagesInput = document.querySelector("#images");

avatarInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    avatarPreview.setAttribute("src", e.target.result);
  };

  reader.readAsDataURL(file);
});

imagesInput.addEventListener("change", function () {
  const files = this.files;
  if (!files || files.length === 0) return;

  Array.from(files).forEach((file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;

      imagesPreview.prepend(img);
    };

    reader.readAsDataURL(file);
  });
});
