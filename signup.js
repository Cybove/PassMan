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

    fetch("/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            name,
            phone,
        }),
    })
        .then((response) => {
            if (response.status === 200) {
                window.location.href = "/login.html";
            } else {
                alert("Signup failed");
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

