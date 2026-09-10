
// Open Zoom Modal
function triggerZoom() {
    const mainImg = document.getElementById('mainPropImg1');
    if (mainImg) {
        openLightbox(mainImg.src);
    }
}

function openLightbox(imageSrc) {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modal.style.display = "flex";
    }
}

// Close Zoom Modal
function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.style.display = "none";
    }
}
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
function swapImage(mainImageId, clickedThumb) {
    // Update main image source
    const mainImg = document.getElementById(mainImageId);
    mainImg.src = clickedThumb.src;

    // Highlight active thumbnail
    const thumbnails = clickedThumb.parentElement.querySelectorAll('.thumb');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    clickedThumb.classList.add('active');
}
// Array containing all six photo paths
const propertyPhotos = [
    "outside.jpeg",
    "sittingroom1.jpeg",
    "sittingroom2.jpeg",
    "sittingroom3.jpeg",
    "kitchen.jpeg",
    "bathroom.jpeg"
];

let currentIndex = 0;

function updateGalleryDisplay() {
    const mainImg = document.getElementById('mainPropImg1');
    mainImg.src = propertyPhotos[currentIndex];

    // Highlight active thumbnail
    const thumbs = document.querySelectorAll('.thumbnail-grid .thumb');
    thumbs.forEach((thumb, idx) => {
        if (idx === currentIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Thumbnail click handler
function setImage(index) {
    currentIndex = index;
    updateGalleryDisplay();
}

// Arrow button click handler
function nextSlide(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = propertyPhotos.length - 1;
    } else if (currentIndex >= propertyPhotos.length) {
        currentIndex = 0;
    }
    updateGalleryDisplay();
}

// Lightbox Modal functions
function openLightbox(src) {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    modal.style.display = "flex";
    modalImg.src = src;
}

function closeLightbox() {
    document.getElementById('lightboxModal').style.display = "none";
}
