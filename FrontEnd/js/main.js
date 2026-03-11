import { initGallery } from "./components/gallery.js";
import { initHomepage } from "./pages/index.js";
import { initModal } from "./components/modal.js";

/* -- Ce fichier coordonne le chargement de la page -- */
document.addEventListener("DOMContentLoaded", async () => {
  // Initialisation de la page d'accueil
  initHomepage();

  // Chargement des travaux pour la galerie
  let works = [];
  try {
    works = await initGallery();
  } catch (error) {
    console.error("Erreur lors du chargement de la galerie :", error);
    // Optionnel : afficher un message à l'utilisateur
  }

  // Initialisation de la modale avec les travaux
  initModal(works);
});
