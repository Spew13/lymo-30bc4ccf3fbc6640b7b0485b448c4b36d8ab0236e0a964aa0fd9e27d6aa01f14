const ADMIN_BIN_ID = "YOUR_ADMIN_BIN_ID";
const API_KEY = "YOUR_API_KEY";
let adminPassword = "";

// Load current password from JSONBin
async function loadAdminPassword() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${ADMIN_BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY }
  });
  const data = await res.json();
  adminPassword = data.record.password;
}

// Login function
async function login() {
  await loadAdminPassword();
  const input = document.getElementById("adminPass").value.trim();
  if (input === adminPassword) {
    alert("Logged in as admin");
    // show composer etc.
  } else {
    alert("Wrong password");
  }
}

// Change password function
async function changePassword(newPass) {
  if (!newPass) return;
  adminPassword = newPass;
  await fetch(`https://api.jsonbin.io/v3/b/${ADMIN_BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify({ password: newPass })
  });
  alert("Admin password changed!");
}
