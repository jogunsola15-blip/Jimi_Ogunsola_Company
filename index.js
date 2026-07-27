document.getElementById('contactForm').addEventListener('submit', function(event) {
    // 1. Prevent Outlook or any email application from popping up
    event.preventDefault();

    const form = event.target;
    const statusDiv = document.getElementById('formStatus');

    // 2. Give user immediate feedback (HCI Principle)
    statusDiv.style.color = "#E65F00";
    statusDiv.textContent = "Sending your message...";

    // 3. Gather all the data from the form inputs automatically
    const formData = new FormData(form);

    // 4. Send the data to Web3Forms in the background
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success feedback
            statusDiv.style.color = "green";
            statusDiv.textContent = "Thank you! Your message has been sent directly to our team.";
            form.reset(); // Clear the form fields
        } else {
            // Server error feedback
            statusDiv.style.color = "red";
            statusDiv.textContent = "Oops! Something went wrong on the server. Please try again.";
        }
    })
    .catch(error => {
        // Network/Internet connection error feedback
        statusDiv.style.color = "red";
        statusDiv.textContent = "Network error. Please check your internet connection.";
    });
});
