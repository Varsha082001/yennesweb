
import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const trigger = document.getElementById("accountTrigger");
const dropdown = document.getElementById("accountDropdown");
const logout = document.getElementById("logoutButton");

trigger?.addEventListener("click", () => {
  const open = trigger.getAttribute("aria-expanded") === "true";
  trigger.setAttribute("aria-expanded", String(!open));
  dropdown.hidden = open;
});

document.addEventListener("click", (event) => {
  if (!document.getElementById("userAccount")?.contains(event.target)) {
    dropdown.hidden = true;
    trigger?.setAttribute("aria-expanded", "false");
  }
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace("./login.html");
    return;
  }

  const name = user.displayName ||
    (user.email ? user.email.split("@")[0] : "User");

  document.getElementById("navUserName").textContent = name;
  document.getElementById("dropdownUserName").textContent = name;
  document.getElementById("dropdownUserEmail").textContent =
    user.email || "";
});

logout?.addEventListener("click", async () => {
  logout.disabled = true;

  try {
    await signOut(auth);
    window.location.replace("./login.html");
  } catch (error) {
    console.error("Sign out failed:", error);
    document.getElementById("accountMessage").textContent =
      "Unable to sign out. Please try again.";
    logout.disabled = false;
  }
});
