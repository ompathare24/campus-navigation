/* =========================================
   ADYPU CAMPUS NAVIGATION
========================================= */


/* =========================================
   WELCOME SCREEN
========================================= */

const welcomeScreen =
    document.getElementById(
        "welcomeScreen"
    );

const app =
    document.getElementById(
        "app"
    );

const enterCampus =
    document.getElementById(
        "enterCampus"
    );


enterCampus.addEventListener(
    "click",
    () => {

        welcomeScreen.classList.add(
            "hide"
        );

        setTimeout(
            () => {

                welcomeScreen.style.display =
                    "none";

                app.classList.remove(
                    "hidden"
                );

            },
            800
        );

    }
);


/* =========================================
   LOCATIONS
========================================= */

const locations = [

    {
        name: "Solar Parking",

        image:
            "rout 1 solar parking.jpg",

        time:
            "4 min walk"
    },

    {
        name: "Dental Parking",

        image:
            "rout 2 dental parking.jpg",

        time:
            "6 min walk"
    },

    {
        name: "Dental Building",

        image:
            "rout 3 dental building.jpg",

        time:
            "6 min walk"
    },

    {
        name: "Student Parking",

        image:
            "rout 4 student parking.jpg",

        time:
            "5 min walk"
    },

    {
        name: "SOE Building",

        image:
            "rout 5 SOE building.jpg",

        time:
            "5 min walk"
    },

    {
        name: "Tuck Shop",

        image:
            "rout 6 tuck shop.jpg",

        time:
            "4 min walk"
    },

    {
        name: "Canteen",

        image:
            "rout 7 canteen.jpg",

        time:
            "4 min walk"
    },

    {
        name: "Hostel",

        image:
            "rout 8 hostel.jpg",

        time:
            "7 min walk"
    },

    {
        name: "DC Building",

        image:
            "rout 9 DC building.jpg",

        time:
            "6 min walk"
    },

    {
        name:
            "DY PATIL International School",

        image:
            "rout 10 DY PATIL INTERNATIONAL SCHOOL.jpg",

        time:
            "8 min walk"
    }

];


/* =========================================
   ELEMENTS
========================================= */

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

const toast =
    document.getElementById(
        "toast"
    );

const mapMessage =
    document.querySelector(
        ".map-message"
    );


/* =========================================
   POPULAR DESTINATIONS
========================================= */

locations.forEach(
    location => {

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "chip";

        button.textContent =
            location.name;


        button.addEventListener(
            "click",
            () => {

                destinationInput.value =
                    location.name;

                showRoute(
                    location
                );

            }
        );


        quickLocations.appendChild(
            button
        );

    }
);


/* =========================================
   SEARCH
========================================= */

destinationInput.addEventListener(
    "input",
    () => {

        const search =
            destinationInput.value
                .trim()
                .toLowerCase();


        suggestions.innerHTML =
            "";


        if (!search) {

            suggestions.classList.remove(
                "show"
            );

            return;

        }


        const matches =
            locations.filter(
                location =>
                    location.name
                        .toLowerCase()
                        .includes(
                            search
                        )
            );


        matches.forEach(
            location => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "suggestion";


                item.textContent =
                    location.name;


                item.addEventListener(
                    "click",
                    () => {

                        destinationInput.value =
                            location.name;

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


        if (matches.length) {

            suggestions.classList.add(
                "show"
            );

        }

    }
);


/* =========================================
   FIND ROUTE
========================================= */

routeButton.addEventListener(
    "click",
    findRoute
);


function findRoute() {

    const value =
        destinationInput.value
            .trim()
            .toLowerCase();


    if (!value) {

        showToast(
            "Please select a destination."
        );

        return;

    }


    const location =
        locations.find(
            item =>
                item.name
                    .toLowerCase() ===
                value
        );


    if (!location) {

        showToast(
            "Please select a valid destination."
        );

        return;

    }


    showRoute(
        location
    );

}


/* =========================================
   SHOW ROUTE
========================================= */

function showRoute(
    location
) {

    /*
       Load the actual route image.

       Every route image represents
       the correct path starting from
       Main Gate.
    */

    campusMap.src =
        location.image;


    campusMap.style.transform =
        "scale(1)";


    zoom = 1;


    result.classList.add(
        "show"
    );


    resultTitle.textContent =
        location.name;


    resultText.textContent =
        "Starting from Main Gate • " +
        location.time;


    mapMessage.textContent =
        "Main Gate → " +
        location.name;


    showToast(
        "Route loaded to " +
        location.name
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


    campusMap.src =
        "OG_MAP.jpg";


    campusMap.style.transform =
        "scale(1)";


    zoom = 1;


    result.classList.remove(
        "show"
    );


    mapMessage.textContent =
        "Select a destination to show route";

}


/* =========================================
   MAP ZOOM
========================================= */

let zoom = 1;


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
   RESET
========================================= */

document
    .getElementById(
        "resetButton"
    )
    .addEventListener(
        "click",
        () => {

            clearRoute();

            showToast(
                "Campus map reset"
            );

        }
    );


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


/* =========================================
   CLOSE SUGGESTIONS
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
