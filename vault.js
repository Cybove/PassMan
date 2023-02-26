const entriesList = document.getElementById("entries-list");
const addEntryButton = document.getElementById("add-entry-button");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const entryForm = document.getElementById("entry-form");
const saveButton = document.getElementById("save-button");
const generatePasswordButton = document.getElementById("generate-password-button");
const nameInput = document.getElementById("name");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const siteInput = document.getElementById("site");
const entryIdInput = document.getElementById("entry-id");
const id = localStorage.getItem("user_id");
const dataID = document.querySelector(".delete-button");


console.log("id: " + id);

function getEntries() {
    fetch("/api/vault", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                displayEntries(data.entries);
            } else {
                alert("Failed to get entries");
            }
        });
}

function addEntry(entry) {
    console.log(entry);
    fetch("/api/vault", {
        method: "POST",
        body: JSON.stringify(entry),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                displayEntries(data.entries);
            } else {
                alert("Failed to add entry");
            }
        });
}
function displayEntries(entries) {
    entriesList.innerHTML = "";
    entries.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = `
            <div class="entry-name ${entry.name.length > 20 ? "long" : ""}">${entry.name}</div>
            <div class="entry-username">${entry.username}</div>
            <div class="entry-password">${entry.password}</div>
            <div class="entry-site">${entry.site}</div>
            <div class="entry-actions">
                <button class="delete-button" data-id="${entry.id}">Delete</button>
            </div>
        `;
        entriesList.appendChild(entryDiv);
    });
}


function searchEntries(searchTerm) {
    fetch(`/api/vault/search/${searchTerm}`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                displayEntries(data.entries);
            } else {
                alert("Failed to search entries");
            }
        });
}

function deleteEntry(id) {
    fetch(`/api/vault/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                getEntries();
            } else {
                alert("Failed to delete entry");
            } 
        });
}

entriesList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
        const id = event.target.getAttribute("data-id");
        deleteEntry(id);
    }
});

function generatePassword() {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
}

saveButton.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const site = document.getElementById("site").value;
    const entry = { name, username, password, site };
    addEntry(entry);
});

generatePasswordButton.addEventListener("click", () => {
    document.getElementById("password").value = generatePassword();
});

getEntries();
