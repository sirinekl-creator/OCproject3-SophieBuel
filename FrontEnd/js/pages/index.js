// -------------------------------------------------
// link the file to main.js
// -------------------------------------------------
export function initHomepage() {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

// -------------------------------------------------
// If the user is logged in, display a black banner and shifts the header down
// -------------------------------------------------
if (isLoggedIn) {
    document.getElementById("edit-banner").classList.add("active");
    document.body.classList.add("logged-in");
}

// -------------------------------------------------
// The login item becomes logout when the user is logged in
// -------------------------------------------------
if (isLoggedIn) {
    const loginItem = document.getElementById('login-item');

    if (loginItem) {
    loginItem.innerHTML = '<a href="#" id="logout">Logout</a>';

    // Ajouter un événement pour déconnexion
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('token'); // Supprimer le token
        window.location.reload(); // Recharger la page pour mettre à jour l'affichage
    });
}
}

// -------------------------------------------------
// Hide filters when the user is logged in
// -------------------------------------------------
if (isLoggedIn) {
    const filters = document.getElementById('filters');

    if (filters) {
        filters.style.display = 'none';
    }
}

// -------------------------------------------------
// Display the "modifier" button when the user is logged in
// -------------------------------------------------
if (isLoggedIn) {
    const editButton = document.getElementById("edit-button");

    if (editButton) {
      editButton.style.display = "inline-block";
    }
  }
}