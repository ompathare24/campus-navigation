// route.js

document.addEventListener('DOMContentLoaded', function() {
    // Get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const startLocation = urlParams.get('start');
    const endLocation = urlParams.get('end');
    const routeImageName = urlParams.get('image');

    // Display route information
    const routeInfoContainer = document.getElementById('route-info');
    routeInfoContainer.innerHTML = `<h2>${startLocation} to ${endLocation}</h2>`;
    
    // Set the source of the route image based on the provided route image name
    const routeImage = document.getElementById('route-image');
    routeImage.src = `assets/images/rout 5 SOE building.jpg`; // Adjust the file extension as needed
});
