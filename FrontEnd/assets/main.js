/* --ce fichier coordonne tout-- */


//PROJETS & FILTRES CATEGORIES
import { getWorks, getCategories } from "./API.js";
import { displayWorks, displayCategories } from "./displaydata.js";

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
