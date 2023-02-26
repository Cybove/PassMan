const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    // Send a request to the server to check the login credentials
    // using the email and password entered by the user
    // the response should be a JSON object containing a field 'success' which is a boolean
    // indicating whether the login was successful or not
    fetch("api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Redirect the user to the vault page
                window.location.href = "vault.html";
            } else {
                // Display an error message to the user
                alert("Invalid email or password");
            }
        });
});