// modal.js (version optimisée pour soutenance)
import { removeWorkById } from "./gallery.js";

const API_URL = "http://localhost:5678/api";
const token = localStorage.getItem("token"); // token récupéré une seule fois

// -----------------------------------------------------------------------------------
// Affichage de la galerie dans la modale
// -----------------------------------------------------------------------------------
export function displayModalGallery(works) {
  const galleryView = document.querySelector(".gallery-container");
  galleryView.innerHTML = "";

  const fragment = document.createDocumentFragment();
  works.forEach((work) => {
    fragment.appendChild(createFigure(work, { trash: true }));
  });

  galleryView.appendChild(fragment);
}

// ------------------------------
// Création figure générique
// ------------------------------
function createFigure(work, options = { trash: false, caption: false }) {
  const figure = document.createElement("figure");
  figure.dataset.id = work.id;

  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  figure.appendChild(img);

  if (options.caption) {
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(figcaption);
  }

  if (options.trash) {
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    // Event delegation plus simple
    trash.addEventListener("click", () => deleteWork(work.id, figure));
    figure.appendChild(trash);
  }

  return figure;
}

// ------------------------------
// Suppression d’un projet via API
// ------------------------------
async function deleteWork(id, figure) {
  try {
    const response = await fetch(`${API_URL}/works/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Erreur suppression projet");

    figure.remove(); // supprime dans la modale
    removeWorkById(id); // supprime dans la galerie principale
  } catch (error) {
    console.error(error);
    alert("Impossible de supprimer ce projet.");
  }
}

// ------------------------------
// Initialisation de la modale et formulaire
// ------------------------------
export function initModal(works) {
  const modal = document.getElementById("modal");
  if (!modal) return;

  const openModal = document.getElementById("edit-projects");
  const closeModal = modal.querySelector(".close");
  const addPhotoBtn = document.getElementById("add-photo");
  const galleryView = modal.querySelector(".gallery-container");
  const homepageGallery = document.querySelector(".gallery");
  const formView = document.getElementById("modal-form");
  const backBtn = modal.querySelector(".back");
  const titleModal = document.getElementById("titlemodal");
  const separatorFirstZone = modal.querySelector(".separator-firstzone");

  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("preview");
  const titleInput = document.getElementById("title");
  const categorySelect = document.getElementById("category");
  const form = document.getElementById("add-photo-form");
  const submitBtn = document.getElementById("submitAddPhoto");
  const errorMessage = document.getElementById("formError");
  const uploadBtn = modal.querySelector(".upload-btn");
  const uploadInfo = modal.querySelector(".upload-info");

  // ------------------------------
  // Chargement des catégories
  // ------------------------------
  async function loadCategories() {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const categories = await response.json();
      categorySelect.innerHTML = "";
      categories.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
      });
    } catch (error) {
      console.error("Erreur chargement catégories", error);
    }
  }
  loadCategories();

  // ------------------------------
  // Vérification formulaire
  // ------------------------------
  function checkForm() {
    submitBtn.disabled = !(
      fileInput.files.length &&
      titleInput.value.trim() &&
      categorySelect.value
    );
  }

  fileInput?.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      preview.innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
      uploadBtn.style.display = "none";
      uploadInfo.style.display = "none";
    };
    reader.readAsDataURL(file);
    checkForm();
  });

  titleInput?.addEventListener("input", checkForm);
  categorySelect?.addEventListener("change", checkForm);

  // ------------------------------
  // Soumission formulaire ajout photo
  // ------------------------------
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (
      !fileInput.files.length ||
      !titleInput.value.trim() ||
      !categorySelect.value
    ) {
      errorMessage.textContent = "Veuillez remplir tous les champs.";
      return;
    }

    errorMessage.textContent = "";
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value.trim());
    formData.append("category", categorySelect.value);

    try {
      const response = await fetch(`${API_URL}/works`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur ajout projet");
      const newWork = await response.json();

      // Ajouter figure dans modale et homepage
      galleryView.appendChild(createFigure(newWork, { trash: true }));
      homepageGallery?.appendChild(createFigure(newWork, { caption: true }));

      // Reset formulaire
      form.reset();
      preview.innerHTML = `<i class="fa-regular fa-image"></i>`;
      submitBtn.disabled = true;
      uploadBtn.style.display = "block";
      uploadInfo.style.display = "block";

      // Affichage galerie
      formView.classList.add("hidden");
      galleryView.classList.remove("hidden");
      titleModal?.style.setProperty("display", "block");
      addPhotoBtn?.style.setProperty("display", "block");
      separatorFirstZone?.style.setProperty("display", "block");
      backBtn?.classList.add("hidden");
    } catch (error) {
      errorMessage.textContent = "Erreur lors de l'ajout du projet.";
      console.error(error);
    }
  });

  // ------------------------------
  // Gestion ouverture / fermeture modale
  // ------------------------------
  openModal?.addEventListener("click", () => {
    modal.classList.remove("hidden");
    displayModalGallery(works);
  });

  closeModal?.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.add("hidden");
  });

  // ------------------------------
  // Afficher formulaire ajout photo
  // ------------------------------
  addPhotoBtn?.addEventListener("click", () => {
    galleryView.classList.add("hidden");
    formView.classList.remove("hidden");
    backBtn?.classList.remove("hidden");

    titleModal?.style.setProperty("display", "none");
    addPhotoBtn?.style.setProperty("display", "none");
    separatorFirstZone?.style.setProperty("display", "none");
  });

  // ------------------------------
  // Retour à la galerie depuis formulaire
  // ------------------------------
  backBtn?.addEventListener("click", () => {
    formView.classList.add("hidden");
    galleryView.classList.remove("hidden");
    backBtn?.classList.add("hidden");

    titleModal?.style.setProperty("display", "block");
    addPhotoBtn?.style.setProperty("display", "block");
    separatorFirstZone?.style.setProperty("display", "block");
  });
}
