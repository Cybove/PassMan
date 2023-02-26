const signupForm = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");

signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const name = nameInput.value;
    const phone = phoneInput.value;

    // Send a request to the server to create a new account
    // using the email, password, name and phone entered by the user
    // the response should be a JSON object containing a field 'success' which is a boolean
    // indicating whether the signup was successful or not
    fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name, phone }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Redirect the user to the login page
                window.location.href = "login.html";
            } else {
                // Display an error message to the user
                alert("An error occurred while creating the account. Please try again later.");
            }
        });
});
