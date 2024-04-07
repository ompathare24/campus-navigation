document.getElementById('find-route-btn').addEventListener('click', function() {
    const startLocation = document.getElementById('start-input').value;
    const endLocation = document.getElementById('end-input').value;

    // Validate if start and end locations are provided
    if (startLocation && endLocation) {
        // Redirect to the corresponding route page based on end location
        const lowerCaseEndLocation = endLocation.toLowerCase();

        switch (lowerCaseEndLocation) {
            case 'soe building':
                window.location.href = 'assets/images/SOE_Building.html';
                break;
            case 'solar parking':
                window.location.href = 'assets/images/Student parking.html';
                break;
            case 'ulc building':
                window.location.href = 'assets/images/ULC Building.html';
                break;
            case 'tuck shop':
                window.location.href = 'assets/images/tuckshop.html';
                break;
            case 'hostel':
                window.location.href = 'assets/images/hostel.html';
                break;
            case 'dy patil school':
                window.location.href = 'assets/images/rout 10 DY PATIL INTERNATIONAL SCHOOL.jpg';
                break;
            case 'dental parking':
                window.location.href = 'assets/images/Dental parking.html';
                break;
            case 'dental building':
                window.location.href = 'assets/images/Dental building.html';
                break;
            case 'canteen':
                window.location.href = 'assets/images/Canteen.html';
                break;
            case 'dc building':
                window.location.href = 'assets/images/DC building.html';
                break;
            default:
                alert('Route information not available for the selected end location.');
        }
    } else {
        alert('Please enter both start and end locations.');
    }
});

// Autocomplete functionality for start and end input boxes
const locations = [
    'SOE Building', 'Solar Parking', 'Tuck Shop', 'Hostel', 'DY PATIL School',
     'Dental Building', 'Canteen', 'DC Building','dental parking'
]; // Add your locations here
// Rest of the autocomplete code remains the same
function autocomplete(input, locations) {
    let currentFocus;

    input.addEventListener('input', function(e) {
        const value = this.value;
        closeAllLists();
        if (!value) return false;

        currentFocus = -1;
        const suggestions = locations.filter(location => location.toLowerCase().includes(value.toLowerCase()));

        const listContainer = document.createElement('div');
        listContainer.setAttribute('id', `${this.id}-autocomplete-list`);
        listContainer.setAttribute('class', 'autocomplete-items');

        this.parentNode.appendChild(listContainer);

        suggestions.forEach((suggestion, index) => {
            const suggestionItem = document.createElement('div');
            suggestionItem.innerHTML = `<strong>${suggestion.substr(0, value.length)}</strong>${suggestion.substr(value.length)}`;
            suggestionItem.addEventListener('click', function() {
                input.value = this.innerText;
                closeAllLists();
            });

            listContainer.appendChild(suggestionItem);
        });
    });

    input.addEventListener('keydown', function(e) {
        const listContainer = document.getElementById(`${this.id}-autocomplete-list`);
        const suggestionItems = listContainer ? listContainer.getElementsByClassName('autocomplete-item') : [];

        if (e.keyCode === 40) {
            currentFocus++;
            addActive(suggestionItems);
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(suggestionItems);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (suggestionItems) suggestionItems[currentFocus].click();
            }
        }
    });

    function addActive(suggestionItems) {
        if (!suggestionItems) return false;
        removeActive(suggestionItems);
        if (currentFocus >= suggestionItems.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = suggestionItems.length - 1;
        suggestionItems[currentFocus].classList.add('autocomplete-active');
    }

    function removeActive(suggestionItems) {
        for (let i = 0; i < suggestionItems.length; i++) {
            suggestionItems[i].classList.remove('autocomplete-active');
        }
    }

    function closeAllLists(elmnt) {
        const suggestionItems = document.getElementsByClassName('autocomplete-items');
        for (let i = 0; i < suggestionItems.length; i++) {
            if (elmnt !== suggestionItems[i] && elmnt !== input) {
                suggestionItems[i].parentNode.removeChild(suggestionItems[i]);
            }
        }
    }

    document.addEventListener('click', function(e) {
        closeAllLists(e.target);
    });
}

// Apply autocomplete to start and end input boxes
autocomplete(document.getElementById('start-input'), locations);
autocomplete(document.getElementById('end-input'), locations);
