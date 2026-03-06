/* --ce fichier affiche les données de l'API dans le portfolio (index.html)-- */

import { getWorks, getCategories } from "../api/api.js";

export async function initGallery() {
  console.log("initGallery appelé"); // <--- test
  let allWorks = [];

  try {
    allWorks = await getWorks();
    const categories = await getCategories();

    displayWorks(allWorks);
    displayCategories(categories, filterWorks);

    return allWorks;

  } catch (error) {
    console.error("Erreur chargement galerie :", error);
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
}

// Affiche les travaux dans la galerie
export function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  works.forEach(work => {
    const figure = document.createElement("figure");

    figure.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>${work.title}</figcaption>
    `;

    gallery.appendChild(figure);
  });
}

// Affiche les catégories dans les boutons de filtre
export function displayCategories(categories, onFilter) {
  const filtersContainer = document.querySelector(".filters");
  filtersContainer.innerHTML = "";

// Fonction pour gérer le bouton actif
  function setActiveButton(activeBtn) {
    filtersContainer.querySelectorAll("button").forEach(btn => {
      btn.classList.remove("active"); // Supprime l'ancienne classe active
    });
    activeBtn.classList.add("active"); // Ajoute la classe active au bouton cliqué
  }

  // Bouton "Tous"
  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.classList.add("filter-btn", "active"); // Par défaut, "Tous" est actif
  allBtn.addEventListener("click", () => {
    setActiveButton(allBtn);
    onFilter(null);
  });
  filtersContainer.appendChild(allBtn);
  
  //Boutons pour chaque catégorie
  categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.classList.add("filter-btn");

    button.addEventListener("click", () => {
      setActiveButton(button);
      onFilter(category.id);
    });

    filtersContainer.appendChild(button);
  });

}
