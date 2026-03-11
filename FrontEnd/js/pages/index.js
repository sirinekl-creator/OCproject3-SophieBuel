// -------------------------------------------------
// index.js (init homepage)
// -------------------------------------------------
export function initHomepage() {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  if (!isLoggedIn) return;

  // Sélection DOM
  const editBanner = document.getElementById("edit-banner");
  const loginItem = document.getElementById("login-item");
  const filters = document.getElementById("filters");
  const editButton = document.getElementById("edit-button");

  // Affiche la bannière et ajuste le body
  editBanner?.classList.add("active");
  document.body.classList.add("logged-in");

  // Login → Logout
  if (loginItem) {
    loginItem.innerHTML = '<a href="#" id="logout">Logout</a>';
    document.getElementById("logout")?.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.reload();
    });
  }

  // Cacher les filtres
  filters?.style.setProperty("display", "none");

  // Afficher le bouton modifier
  editButton?.style.setProperty("display", "inline-block");
}
