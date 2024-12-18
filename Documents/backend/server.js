const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // For enabling Cross-Origin Requests
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS to accept requests from the frontend
app.use(bodyParser.json()); // Parse JSON requests

// API Route to handle form submission
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Log the form data to the console (for debugging)
    console.log(req.body);

    // Perform validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
    }

    // Simulate form submission success (In reality, this would be saved to a database or sent via email)
    res.status(200).json({ message: "Your message has been sent successfully!" });
});

// Helper function to validate email
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
