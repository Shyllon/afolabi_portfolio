const contactForm = document.getElementById("contact-form");
const feedbackContainer = document.getElementById("feedback-container");
const spinner = document.getElementById("spinner");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    feedbackContainer.textContent = '';
    feedbackContainer.style.display = 'none';
    spinner.style.display = "block";

    const formData = new FormData(contactForm);
    const jsonData = Object.fromEntries(formData.entries());

    if (!jsonData.name || !jsonData.email || !jsonData.subject || !jsonData.message) {
        showFeedback("All fields are required. Please fill out the form completely.", "error");
        spinner.style.display = "none";
        return;
    }

    if (!validateEmail(jsonData.email)) {
        showFeedback("Please enter a valid email address.", "error");
        spinner.style.display = "none";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        });

        spinner.style.display = "none";

        if (response.ok) {
            showFeedback("Your message has been sent successfully!", "success");
            contactForm.reset();
        } else {
            const errorData = await response.json();
            showFeedback(errorData.message || "Something went wrong. Please try again.", "error");
        }
    } catch (error) {
        spinner.style.display = "none";
        showFeedback("Failed to send the message. Please try again later.", "error");
        console.error("Error:", error);
    }
});

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function showFeedback(message, type) {
    feedbackContainer.textContent = message;
    feedbackContainer.style.display = "block";
    feedbackContainer.style.color = type === "success" ? "green" : "red";
}
