const ADMIN_BIN_ID = "691232e7ae596e708f50f54d";
const API_KEY = "$2a$10$SjcbvSnjiyFfuDwOzew2b.CtowaaptWCm38KZikWrQJRgyCp3owqS";
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
