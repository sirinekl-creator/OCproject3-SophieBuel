/* --ce fichier récupère les données de l'API (fetch)-- */

const API_URL = "http://localhost:5678/api";

/* -------------------------------------------------
   GET Works ("Mes projets")
-------------------------------------------------- */

export async function getWorks() {
  const response = await fetch(`${API_URL}/works`);
  if (!response.ok) {
    throw new Error("Erreur API");
  }
  return response.json();
}

/* -------------------------------------------------
   GET Categories (filtres des catégories)
-------------------------------------------------- */

export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error("Erreur API catégories");
  }
  return response.json();
}
