
import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const form = document.getElementById("changePasswordForm");
const button = document.getElementById("changePasswordButton");
const message = document.getElementById("passwordMessage");

let currentUser = null;

function showMessage(text, success = false) {
    message.textContent = text;
    message.style.color = success ? "#15803d" : "#dc2626";
}

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.replace("./login.html");
        return;
    }

    currentUser = user;
});

document.querySelectorAll(".show-password").forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const input = document.getElementById(toggle.dataset.target);
        if (!input) return;

        const show = input.type === "password";
        input.type = show ? "text" : "password";

        const icon = toggle.querySelector("i");
        icon.classList.toggle("fa-eye", !show);
        icon.classList.toggle("fa-eye-slash", show);

        toggle.setAttribute(
            "aria-label",
            show ? "Hide password" : "Show password"
        );
    });
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!currentUser) {
        showMessage("Your session is loading. Please try again.");
        return;
    }

    const currentPassword =
        document.getElementById("currentPassword").value;
    const newPassword =
        document.getElementById("newPassword").value;
    const confirmPassword =
        document.getElementById("confirmNewPassword").value;

    if (newPassword.length < 8) {
        showMessage("Your new password must contain at least 8 characters.");
        return;
    }

    if (newPassword !== confirmPassword) {
        showMessage("The new passwords do not match.");
        return;
    }

    if (newPassword === currentPassword) {
        showMessage("Choose a password different from your current password.");
        return;
    }

    if (!currentUser.email) {
        showMessage(
            "This account has no email/password login. Please use the appropriate sign-in provider."
        );
        return;
    }

    button.disabled = true;
    showMessage("Verifying your current password...", true);

    try {
        const credential = EmailAuthProvider.credential(
            currentUser.email,
            currentPassword
        );

        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);

        form.reset();
        showMessage("Your password has been updated successfully.", true);
    } catch (error) {
        console.error("Change password failed:", error.code, error.message);

        const errors = {
            "auth/invalid-credential":
                "Your current password is incorrect. Please try again.",
            "auth/wrong-password":
                "Your current password is incorrect. Please try again.",
            "auth/weak-password":
                "Please choose a stronger password.",
            "auth/requires-recent-login":
                "Please sign out and sign in again, then retry.",
            "auth/too-many-requests":
                "Too many attempts. Please wait and try again.",
            "auth/network-request-failed":
                "Network error. Check your internet connection."
        };

        showMessage(
            errors[error.code] ||
            `Unable to change password: ${error.code || "Unknown error"}`
        );
    } finally {
        button.disabled = false;
    }
});
