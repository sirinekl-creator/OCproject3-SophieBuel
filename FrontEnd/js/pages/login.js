const API_URL_LOGIN = "http://localhost:5678/api/users/login";
const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("loginError");

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// -------------------------------------------------
// Login: redirection si succès, affichage erreur si échec
// -------------------------------------------------
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMsg.style.display = "none"; // reset error

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    errorMsg.textContent = "Veuillez remplir tous les champs.";
    errorMsg.style.display = "block";
    return;
  }

  try {
    const response = await fetch(API_URL_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Identifiant ou mot de passe incorrect.");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    // Redirection vers la page d’accueil
    window.location.href = "../pages/index.html";
  } catch (error) {
    errorMsg.textContent = error.message;
    errorMsg.style.display = "block";
    passwordInput.value = ""; // vider le mot de passe
  }
});
