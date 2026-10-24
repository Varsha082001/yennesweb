emailjs.init({
    publicKey: "_erykYYxDeayGi0Wb"
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".support-form");

    if (!form) {
        console.error("Support form not found.");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const button = form.querySelector('button[type="submit"]');
        const originalText = button ? button.textContent : "";

        if (button) {
            button.disabled = true;
            button.textContent = "Sending...";
        }

        try {
            await emailjs.sendForm(
                "service_anpqgti",
                "template_gkvpyok",
                form
            );

            alert("Your support request has been sent successfully!");
            form.reset();
        } catch (error) {
            console.error("EmailJS error:", error);
            alert("Unable to send your request. Please try again or contact varsharangan2001@gnail.com.");
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = originalText;
            }
        }
    });
});
