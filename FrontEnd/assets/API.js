
/* --ce fichier récupère les données de l'API (fetch)-- */

/* -------------------------------------------------
   GET Works ("Mes projets")
-------------------------------------------------- */

export async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  if (!response.ok) {
    throw new Error("Erreur API");
  }
  return await response.json();
}

/* -------------------------------------------------
   GET Categories (filtres des catégories)
-------------------------------------------------- */

export async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  if (!response.ok) {
    throw new Error("Erreur API catégories");
  }
  return await response.json();
}
