const apiUrlLogin = "http://localhost:5678/api/users/login";
const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("loginError");

// -------------------------------------------------
// Redirect to the home page when the connection is confirmed
// & display an error message when the user information/password is incorrect.
// -------------------------------------------------
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const response = await fetch(apiUrlLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error("Erreur dans l’identifiant ou le mot de passe");
        }

        const data = await response.json();

        // Stocker le token
        localStorage.setItem("token", data.token);

        // Redirection
        window.location.href = "../pages/index.html";

    } catch (error) {
        document.querySelector(".login-error").style.display = "block";
    }
});