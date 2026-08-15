/* =========================================
   CAMPUS NAVIGATION
========================================= */


/* DESTINATIONS */

const locations = [

    "SOE Building",
    "Student Parking",
    "Tuck Shop",
    "Hostel",
    "DY PATIL School",
    "Dental Building",
    "Dental Parking",
    "Canteen",
    "DC Building",
    "ULC Building",
    "Main Gate"

];


/* ELEMENTS */

const destinationInput =
    document.getElementById(
        "destinationInput"
    );

const suggestions =
    document.getElementById(
        "suggestions"
    );

const routeButton =
    document.getElementById(
        "routeButton"
    );

const clearButton =
    document.getElementById(
        "clearButton"
    );

const quickLocations =
    document.getElementById(
        "quickLocations"
    );

const result =
    document.getElementById(
        "result"
    );

const resultTitle =
    document.getElementById(
        "resultTitle"
    );

const resultText =
    document.getElementById(
        "resultText"
    );

const campusMap =
    document.getElementById(
        "campusMap"
    );

const routeLine =
    document.getElementById(
        "routeLine"
    );

const startMarker =
    document.getElementById(
        "startMarker"
    );

const endMarker =
    document.getElementById(
        "endMarker"
    );

const toast =
    document.getElementById(
        "toast"
    );


/* =========================================
   QUICK DESTINATION BUTTONS
========================================= */

const popularLocations = [

    "SOE Building",
    "Canteen",
    "Hostel",
    "DC Building",
    "Dental Building",
    "Student Parking"

];


popularLocations.forEach(
    location => {

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "chip";

        button.textContent =
            location;

        button.addEventListener(
            "click",
            () => {

                destinationInput.value =
                    location;

                showToast(
                    location +
                    " selected"
                );

            }
        );

        quickLocations.appendChild(
            button
        );

    }
);


/* =========================================
   SEARCH AUTOCOMPLETE
========================================= */

destinationInput.addEventListener(
    "input",
    function () {

        const value =
            this.value
                .trim()
                .toLowerCase();


        suggestions.innerHTML = "";


        if (!value) {

            suggestions.classList.remove(
                "show"
            );

            return;

        }


        const filtered =
            locations.filter(
                location =>
                    location
                        .toLowerCase()
                        .includes(value)
            );


        filtered.forEach(
            location => {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "suggestion";

                item.textContent =
                    location;


                item.addEventListener(
                    "click",
                    () => {

                        destinationInput.value =
                            location;

                        suggestions.classList.remove(
                            "show"
                        );

                    }
                );


                suggestions.appendChild(
                    item
                );

            }
        );


        if (filtered.length) {

            suggestions.classList.add(
                "show"
            );

        }

    }
);


/* =========================================
   CLOSE SEARCH
========================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".destination"
            )
        ) {

            suggestions.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   ROUTE DATA
========================================= */


/*
   These coordinates are percentages
   inside the map.

   You can adjust them later according
   to your actual OG_MAP.jpg.
*/

const routePoints = {

    "SOE Building": {
        x: 70,
        y: 35,
        distance: "5 min walk"
    },

    "Student Parking": {
        x: 25,
        y: 70,
        distance: "4 min walk"
    },

    "Tuck Shop": {
        x: 57,
        y: 48,
        distance: "3 min walk"
    },

    "Hostel": {
        x: 80,
        y: 70,
        distance: "7 min walk"
    },

    "DY PATIL School": {
        x: 18,
        y: 25,
        distance: "8 min walk"
    },

    "Dental Building": {
        x: 40,
        y: 55,
        distance: "6 min walk"
    },

    "Dental Parking": {
        x: 35,
        y: 75,
        distance: "6 min walk"
    },

    "Canteen": {
        x: 55,
        y: 60,
        distance: "4 min walk"
    },

    "DC Building": {
        x: 63,
        y: 25,
        distance: "6 min walk"
    },

    "ULC Building": {
        x: 75,
        y: 50,
        distance: "5 min walk"
    },

    "Main Gate": {
        x: 10,
        y: 50,
        distance: "Starting point"
    }

};


/* =========================================
   FIND ROUTE
========================================= */

routeButton.addEventListener(
    "click",
    findRoute
);


function findRoute() {

    const destination =
        destinationInput.value.trim();


    if (!destination) {

        showToast(
            "Please select a destination."
        );

        destinationInput.focus();

        return;

    }


    const location =
        routePoints[
            destination
        ];


    if (!location) {

        showToast(
            "Destination not available."
        );

        return;

    }


    drawRoute(
        location
    );


    result.classList.add(
        "show"
    );


    resultTitle.textContent =
        destination;


    resultText.textContent =
        "From Main Gate • " +
        location.distance;


    showToast(
        "Route found to " +
        destination
    );

}


/* =========================================
   DRAW ROUTE
========================================= */

function drawRoute(
    destination
) {

    const startX = 10;

    const startY = 50;

    const endX =
        destination.x;

    const endY =
        destination.y;


    /* MARKERS */

    startMarker.style.left =
        startX + "%";

    startMarker.style.top =
        startY + "%";


    endMarker.style.left =
        endX + "%";

    endMarker.style.top =
        endY + "%";


    startMarker.classList.add(
        "show"
    );

    endMarker.classList.add(
        "show"
    );


    /* ROUTE LINE */

    const dx =
        endX - startX;

    const dy =
        endY - startY;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    const angle =
        Math.atan2(
            dy,
            dx
        ) *
        180 /
        Math.PI;


    routeLine.style.left =
        startX + "%";

    routeLine.style.top =
        startY + "%";

    routeLine.style.width =
        distance + "%";

    routeLine.style.transform =
        `rotate(${angle}deg)`;


    routeLine.classList.add(
        "show"
    );

}


/* =========================================
   CLEAR
========================================= */

clearButton.addEventListener(
    "click",
    clearRoute
);


function clearRoute() {

    destinationInput.value =
        "";

    suggestions.innerHTML =
        "";

    suggestions.classList.remove(
        "show"
    );


    routeLine.classList.remove(
        "show"
    );

    startMarker.classList.remove(
        "show"
    );

    endMarker.classList.remove(
        "show"
    );


    result.classList.remove(
        "show"
    );

}


/* =========================================
   MAP ZOOM
========================================= */

let zoom =
    1;


document
    .getElementById(
        "zoomIn"
    )
    .addEventListener(
        "click",
        () => {

            zoom += 0.1;

            if (zoom > 2) {
                zoom = 2;
            }

            updateZoom();

        }
    );


document
    .getElementById(
        "zoomOut"
    )
    .addEventListener(
        "click",
        () => {

            zoom -= 0.1;

            if (zoom < 0.7) {
                zoom = 0.7;
            }

            updateZoom();

        }
    );


function updateZoom() {

    campusMap.style.transform =
        `scale(${zoom})`;

}


/* =========================================
   RESET MAP
========================================= */

document
    .getElementById(
        "resetButton"
    )
    .addEventListener(
        "click",
        () => {

            zoom = 1;

            updateZoom();

            clearRoute();

            showToast(
                "Map reset"
            );

        }
    );


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(
    message
) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================
   ENTER KEY
========================================= */

destinationInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Enter"
        ) {

            findRoute();

        }

    }
);
