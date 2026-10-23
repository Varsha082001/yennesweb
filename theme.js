
const YENNES_THEME_KEY = "yennes-profile-dark";

function applyYennesTheme(isDark) {
    document.documentElement.classList.toggle("yennes-dark-mode", isDark);
    document.body?.classList.toggle("yennes-dark-mode", isDark);
}

function loadYennesTheme() {
    const isDark = localStorage.getItem(YENNES_THEME_KEY) === "true";
    applyYennesTheme(isDark);
}

function setYennesTheme(isDark) {
    localStorage.setItem(YENNES_THEME_KEY, String(isDark));
    applyYennesTheme(isDark);
}

loadYennesTheme();

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("darkModeToggle");

    if (toggle) {
        toggle.checked = localStorage.getItem(YENNES_THEME_KEY) === "true";

        toggle.addEventListener("change", () => {
            setYennesTheme(toggle.checked);
        });
    }
});
