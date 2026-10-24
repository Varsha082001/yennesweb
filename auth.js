
import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const $ = (id) => document.getElementById(id);

function message(id, text, success = false) {
  const element = $(id);
  if (!element) return;
  element.textContent = text;
  element.style.color = success ? "#15803d" : "#dc2626";
}



// LOGIN: use your previously registered account
$("loginForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;
  const button = $("loginButton");

  button.disabled = true;
  message("loginMessage", "Signing in...", true);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.replace("./index.html");
  } catch (error) {
    console.error("Login failed:", error.code, error.message);

    const errors = {
      "auth/invalid-credential": "Incorrect email or password.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/too-many-requests": "Too many attempts. Please try again later.",
      "auth/network-request-failed": "Check your internet connection."
    };

    message(
      "loginMessage",
      errors[error.code] || `Login failed: ${error.code}`
    );
    button.disabled = false;
  }
});




// SIGNUP
$("signupForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = $("fullName").value.trim();
  const email = $("signupEmail").value.trim();
  const password = $("signupPassword").value;
  const confirm = $("confirmPassword").value;
  const button = $("signupButton");

  if (password !== confirm) {
    message("signupMessage", "Passwords do not match.");
    return;
  }

  if (!$("acceptTerms").checked) {
    message("signupMessage", "Please accept the Privacy Policy.");
    return;
  }

  button.disabled = true;
  message("signupMessage", "Creating account...", true);

  try {
    const result = await createUserWithEmailAndPassword(
      auth, email, password
    );

    await updateProfile(result.user, { displayName: name });
    window.location.replace("./index.html");
  } catch (error) {
    console.error("Signup failed:", error.code, error.message);

    const errors = {
      "auth/email-already-in-use": "This account already exists. Please sign in.",
      "auth/weak-password": "Use a stronger password with at least 6 characters.",
      "auth/operation-not-allowed": "Enable Email/Password in Firebase Authentication.",
      "auth/invalid-email": "Please enter a valid email address."
    };

    message(
      "signupMessage",
      errors[error.code] || `Signup failed: ${error.code}`
    );
    button.disabled = false;
  }
});




// PASSWORD VISIBILITY
document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.toggle ||
      (button.id === "togglePassword" ? "loginPassword" : null);

    const input = id ? $(id) : null;
    if (!input) return;

    input.type = input.type === "password" ? "text" : "password";
  });
});





// FORGOT PASSWORD
$("forgotPassword")?.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = $("loginEmail").value.trim();

  if (!email) {
    message("loginMessage", "Enter your email address first.");
    $("loginEmail").focus();
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    message("loginMessage", "If the account exists, a reset email will be sent.", true);
  } catch (error) {
    console.error("Password reset failed:", error);
    message("loginMessage", "Could not send reset email. Check your email and Firebase settings.");
  }
});





// Redirect already-signed-in users away from login/signup
onAuthStateChanged(auth, (user) => {
  if (user && ( $("loginForm") || $("signupForm") )) {
    window.location.replace("./index.html");
  }
});
