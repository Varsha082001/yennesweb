
import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const byId = (id) => document.getElementById(id);

const message = byId("profileMessage");

function setMessage(text, success = false) {
    if (!message) return;

    message.textContent = text;
    message.style.color = success ? "#15803d" : "#dc2626";
}

function getProviderName(user) {
    const providers = user.providerData.map((item) => item.providerId);

    if (providers.includes("google.com")) return "Google";
    if (providers.includes("password")) return "Email & Password";

    return providers.length ? providers.join(", ") : "Firebase";
}

function displayUser(user) {
    const name =
        user.displayName ||
        (user.email ? user.email.split("@")[0] : "YENNES User");

    byId("profileName").textContent = name;
    byId("profileEmail").textContent = user.email || "No email available";
    byId("detailName").textContent = name;
    byId("detailEmail").textContent = user.email || "No email available";

    byId("profileAvatar").textContent =
        name.trim().charAt(0).toUpperCase() || "Y";

    byId("emailVerification").textContent =
        user.emailVerified ? "Verified" : "Not verified";

    byId("verificationDescription").textContent =
        user.emailVerified
            ? "Your email address is verified."
            : "Verify your email to help secure your account.";

    byId("accountCreated").textContent =
        user.metadata.creationTime
            ? new Date(user.metadata.creationTime).toLocaleDateString(
                undefined,
                { day: "numeric", month: "long", year: "numeric" }
            )
            : "Not available";

    byId("authProvider").textContent = getProviderName(user);
    byId("accountId").textContent = user.uid;

    const verifyButton = byId("verifyEmailButton");
    verifyButton.hidden = user.emailVerified;
}

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.replace("./login.html");
        return;
    }

    displayUser(user);
});

async function handleLogout() {
    try {
        await signOut(auth);
        window.location.replace("./login.html");
    } catch (error) {
        console.error("Sign-out failed:", error);
        setMessage("Unable to sign out. Please try again.");
    }
}

byId("logoutButton")?.addEventListener("click", handleLogout);
byId("logoutButtonBottom")?.addEventListener("click", handleLogout);

byId("verifyEmailButton")?.addEventListener("click", async () => {
    const user = auth.currentUser;

    if (!user) {
        setMessage("Please sign in again.");
        return;
    }

    if (user.emailVerified) {
        setMessage("Your email is already verified.", true);
        return;
    }

    try {
        await sendEmailVerification(user);
        setMessage(
            "Verification email sent. Check your inbox and spam folder.",
            true
        );
    } catch (error) {
        console.error("Verification email failed:", error);
        setMessage(
            error.code === "auth/too-many-requests"
                ? "Too many attempts. Please wait before trying again."
                : "Could not send the verification email. Please try again."
        );
    }
});

byId("copyAccountId")?.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        await navigator.clipboard.writeText(user.uid);
        setMessage("Account ID copied.", true);
    } catch {
        setMessage(
            "Copy was blocked by the browser. Select and copy the Account ID manually."
        );
    }
});




/* Browser-only appearance preference */
const darkToggle = byId("darkModeToggle");

function applyAppearance(isDark) {
    document.body.classList.toggle("account-dark-mode", isDark);
    if (darkToggle) darkToggle.checked = isDark;
}

const savedAppearance = localStorage.getItem("yennes-profile-dark") === "true";
applyAppearance(savedAppearance);

darkToggle?.addEventListener("change", () => {
    const isDark = darkToggle.checked;
    localStorage.setItem("yennes-profile-dark", String(isDark));
    applyAppearance(isDark);
});
