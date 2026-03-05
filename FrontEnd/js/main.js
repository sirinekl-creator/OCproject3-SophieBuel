/* --ce fichier coordonne tout-- */


//PROJETS, FILTRES CATEGORIES et EDIT MODE HOMEPAGE
import { getWorks, getCategories } from "./api/api.js";
import { displayWorks, displayCategories } from "./components/gallery.js";
import { initHomepage } from "./pages/index.js";
initHomepage();

let allWorks = [];

async function init() {
  try {
    allWorks = await getWorks();
    const categories = await getCategories();

    displayWorks(allWorks);

    displayCategories(categories, filterWorks);

  } catch (error) {
    console.error("Erreur d'initialisation :", error);
  }
}

function filterWorks(categoryId) {
  if (categoryId === null) {
    displayWorks(allWorks);
  } else {
    const filtered = allWorks.filter(
      work => work.categoryId === categoryId
    );
    displayWorks(filtered);
  }
}

init();