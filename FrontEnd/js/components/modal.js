
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