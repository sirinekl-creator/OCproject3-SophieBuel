/* --ce fichier coordonne tout-- */

import { initGallery } from "./components/gallery.js";
import { initHomepage } from "./pages/index.js";
import { initModal } from "./components/modal.js";

console.log("main.js chargé");

document.addEventListener("DOMContentLoaded", async () => {

  initHomepage();

  const works = await initGallery(); // 👈 récupère les données

  initModal(works); // 👈 envoie les works à la modale

});