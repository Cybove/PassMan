const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const id = localStorage.getItem("user_id");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"   //allow CORS
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                console.log(data);
                localStorage.setItem("user_id", data.user_id);
                window.location.href = "/vault.html";
            } else {
                alert("Login failed");
            }
        });

});

