function displayModalGallery(works) {
  const galleryView = document.querySelector(".gallery-container");
  galleryView.innerHTML = "";

  works.forEach(work => {

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;

    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");

    figure.appendChild(img);
    figure.appendChild(trash);

    galleryView.appendChild(figure);
  });
}

export function initModal(works) {

  const modal = document.getElementById("modal");
  const openModal = document.getElementById("edit-projects");
  const closeModal = document.querySelector(".close");
  const addPhotoBtn = document.getElementById("add-photo");
  const galleryView = document.querySelector(".gallery-container");
  const formView = document.getElementById("modal-form");
  const backBtn = document.querySelector(".back");

  if (!modal) return;

  // Open modal (edit button)
  if (openModal) {
    openModal.addEventListener("click", () => {
      modal.classList.remove("hidden");
      displayModalGallery(works);
    });
  }

  // Close modal (cross)
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // Close modal by clicking outside
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Display form (add photo button)
  if (addPhotoBtn) {
    addPhotoBtn.addEventListener("click", () => {
      galleryView.classList.add("hidden");
      formView.classList.remove("hidden");
      backBtn.classList.remove("hidden");
    });
  }

  // Back to gallery (arrow)
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      formView.classList.add("hidden");
      galleryView.classList.remove("hidden");
      backBtn.classList.add("hidden");
    });
  }

}