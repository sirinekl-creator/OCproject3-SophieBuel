
// Fonction pour afficher la gallerie dans la modale zone 1 avec l'icone de suppression (poubelle)
function displayModalGallery(works) {
  const galleryView = document.querySelector(".gallery-container");
  galleryView.innerHTML = "";

  works.forEach(work => {

    const figure = document.createElement("figure");
    figure.dataset.id = work.id; // Ajouter un attribut data-id pour permettre de réellement supprimer la photo avec l'API

    const img = document.createElement("img");
    img.src = work.imageUrl;

    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");

    trash.addEventListener("click", () => {
  deleteWork(work.id, figure);
});

    figure.appendChild(img);
    figure.appendChild(trash);

    galleryView.appendChild(figure);
  });
}

// Fonction pour supprimer un projet via l'API
import { removeWorkById } from "./gallery.js";

async function deleteWork(id, figure) {
console.log("suppression", id);
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  if (response.ok) {

    // supprimer dans la modale
    figure.remove();

    // supprimer dans la galerie principale
removeWorkById(id);

  } else {
    console.log("Erreur lors de la suppression");
  }
}


export function initModal(works) {

  const modal = document.getElementById("modal");
  const openModal = document.getElementById("edit-projects");
  const closeModal = document.querySelector(".close");
  const addPhotoBtn = document.getElementById("add-photo");
  const galleryView = document.querySelector(".gallery-container");
  const formView = document.getElementById("modal-form");
  const backBtn = document.querySelector(".back");
  const titleModal = document.getElementById("titlemodal");
  const addPhoto = document.getElementById("add-photo");
  const separatorfirstzone = document.querySelector(".separator-firstzone");

// Permet d'ajouter des photos via l'API dans la modale zone 2 et les afficher sur la homepage
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");
const form = document.getElementById("add-photo-form");
const submitBtn = document.getElementById("submitAddPhoto");

const uploadBtn = document.querySelector(".upload-btn");
const uploadInfo = document.querySelector(".upload-info");

async function loadCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    categorySelect.innerHTML = "";

    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      categorySelect.appendChild(option);
    });

  } catch (error) {
    console.log("Erreur chargement catégories", error);
  }
}

loadCategories();

if (fileInput) {
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (!file) return;
      const reader = new FileReader();

      reader.onload = function (e) {
        preview.innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;

      //cacher les éléments upload lorsqu'une image est sélectionnée
      uploadBtn.style.display = "none";
      uploadInfo.style.display = "none";
      };

      reader.readAsDataURL(file);

    checkForm();
  });
}

function checkForm() {
  if (
    fileInput.files.length &&
    titleInput.value.trim() !== "" &&
    categorySelect.value !== ""
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

titleInput.addEventListener("input", checkForm);
categorySelect.addEventListener("change", checkForm);

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value.trim());
    formData.append("category", categorySelect.value);

    try {

      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Erreur ajout projet");
      }

      const newWork = await response.json();

      console.log("Projet ajouté :", newWork);

      // reset formulaire
      form.reset();
      preview.innerHTML = `<i class="fa-regular fa-image"></i>`;
      submitBtn.disabled = true;

      uploadBtn.style.display = "block";
uploadInfo.style.display = "block";

      // fermer le formulaire
      formView.classList.add("hidden");
      galleryView.classList.remove("hidden");

      // recharger la page pour afficher la nouvelle image
      location.reload();

    } catch (error) {
      console.log(error);
    }
  });
}


//Autres fonctions de la modale (ouvrir, fermer, basculer entre galerie et formulaire)

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
  

      // Cacher le titre de la galerie
      if (titleModal) {
        titleModal.style.display = "none";
      }

      // Cacher le bouton "Ajouter une photo"
      if (addPhoto) {
        addPhoto.style.display = "none";
      }

      // Cacher la ligne de séparation de la zone 1
      if (separatorfirstzone) {
        separatorfirstzone.style.display = "none";
      }

    });
  }

  // Zone 1 modale qui réapparait lorsqu'on clique sur la flèche de retour
  // Back to gallery (arrow)
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      formView.classList.add("hidden");
      galleryView.classList.remove("hidden");
      backBtn.classList.add("hidden");

// Réafficher le titre de la galerie
      if (titleModal) {
        titleModal.style.display = "block";
      }
//Réafficher le séparateur de la zone 1
      if (separatorfirstzone) {
        separatorfirstzone.style.display = "block";
      }

// Réafficher le bouton "Ajouter une photo"
      if (addPhoto) {
        addPhoto.style.display = "block";
      }


    });
  }

}