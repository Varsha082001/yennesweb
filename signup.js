
/* SHOW / HIDE PASSWORD */
document.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.password);
        const icon = button.querySelector("i");

        const showPassword = input.type === "password";
        input.type = showPassword ? "text" : "password";

        icon.classList.toggle("fa-eye", !showPassword);
        icon.classList.toggle("fa-eye-slash", showPassword);

        button.setAttribute(
            "aria-label",
            showPassword ? "Hide password" : "Show password"
        );
    });
});


/* LOGIN FORM - FRONT-END DEMO */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", event => {
        event.preventDefault();

        const message = document.getElementById("loginMessage");

        message.textContent =
            "Form validated. Connect a secure authentication service to sign in.";
    });
}


/* SIGN UP FORM - FRONT-END DEMO */
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", event => {
        event.preventDefault();

        const password = document.getElementById("signupPassword").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;
        const message = document.getElementById("signupMessage");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match. Please try again.";
            document.getElementById("confirmPassword").focus();
            return;
        }

        message.textContent =
            "Form validated. Connect a secure account registration service to create your account.";
    });
}


/* GOOGLE SIGN-IN PLACEHOLDER */
const googleButton = document.getElementById("googleLogin");

if (googleButton) {
    googleButton.addEventListener("click", () => {
        document.getElementById("loginMessage").textContent =
            "Google sign-in is not configured yet.";
    });
}
