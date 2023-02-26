const entriesList = document.getElementById("entries-list");
const entryForm = document.getElementById("entry-form");
const nameInput = document.getElementById("name");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const siteInput = document.getElementById("site");
const generatePasswordButton = document.getElementById("generate-password-button");
const addEntryButton = document.getElementById("add-entry-button");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const saveButton = document.getElementById("save-button");

let selectedEntryId;

// Get the user's entries from the server
fetch("api/entries")
    .then((response) => response.json())
    .then((data) => {
        // Populate the entries list with the entries received from the server
        data.forEach((entry) => {
            const entryItem = document.createElement("li");
            entryItem.classList.add("entry-item");
            entryItem.textContent = entry.name;
            entryItem.addEventListener("click", () => {
                selectEntry(entry.id);
            });
            entriesList.appendChild(entryItem);
        });
    });

function selectEntry(id) {
    selectedEntryId = id;
    // Send a request to the server to get the details of the selected entry
    fetch(`api/entry/${id}`)
        .then((response) => response.json())
        .then((data) => {
            // Populate the entry form with the details of the selected entry
            nameInput.value = data.name;
            usernameInput.value = data.username;
            passwordInput.value = data.password;
            siteInput.value = data.site;
        });
}

// Handle the entry form submit event
entryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the values from the form inputs
    const name = nameInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const site = siteInput.value;

    // Send a request to the server to update the entry
    // using the values entered by the user
    fetch(`api/entry/${selectedEntryId}`, {
        method: "PUT",
        body: JSON.stringify({ name, username, password, site }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Display a success message to the user
                alert("Entry updated successfully");
            } else {
                // Display an error message to the user
                alert("An error occurred while updating the entry. Please try again later.");
            }
        });
});

// Handle the generate password button click event
generatePasswordButton.addEventListener("click", () => {
    // Send a request to the server to generate a new password
    fetch("api/password")
        .then((response) => response.json())
        .then((data) => {
            // Populate the password input with the generated password
            passwordInput.value = data.password;
        });
});
