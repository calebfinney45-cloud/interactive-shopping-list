// Initialize array from LocalStorage or empty if nothing exists
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

//Grabbing the parts in html we need to target
const itemForm = document.getElementById('item-form');
const productInput = document.getElementById('product');
const priceInput = document.getElementById('price');
const displayArea = document.getElementById('display-area');
const hiddenSection = document.querySelector('.hiddenPart');
const totalPriceElement = document.getElementById('total-price');
const clearBtn = document.querySelector('.clear-list'); // Use the class from HTML

// Helper function to synchronize our JavaScript array with the browser's LocalStorage.
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Listen for the 'submit' event on the form. This captures both button clicks and 'Enter' key presses inside the input fields.
itemForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission (page refresh)

    // Create a data object representing the new item.
    // We use Date.now() as a simple way to generate a unique ID.
    const newItem = {
        id: Date.now(), 
        name: productInput.value,
        price: parseFloat(priceInput.value),
        purchased: false
    };

    shoppingList.push(newItem); // Add new item to our state array
    saveToLocalStorage();       // Persist the updated array
    renderList();               // Refresh the UI
    itemForm.reset();           // Clear the input fields for the next entry
});

// The core function responsible for drawing the UI based on the shoppingList array.
// It handles the visibility of sections, card creation, and total price calculation.
function renderList() {
    displayArea.innerHTML = ''; // Clear the current display to prevent duplicates
    
    // Show or hide the display area and "Total/Clear" section based on whether the list has items.
    if (shoppingList.length > 0) {
        displayArea.style.display = 'grid';
        hiddenSection.style.display = 'block';
    } else {
        displayArea.style.display = 'none';
        hiddenSection.style.display = 'none';
    }

    let total = 0; // Accumulator for the total cost

    // Iterate through each item object in the array to build its visual representation.
    shoppingList.forEach((item) => {
        const card = document.createElement('div');
        
        // Apply conditional styling if the item has been marked as purchased.
        card.className = `shopping-card ${item.purchased ? 'completed' : ''}`;
        if (item.purchased) {
            card.style.textDecoration = "line-through";
            card.style.opacity = "0.6";
        }
        
        // Use Template Literals to inject the HTML structure for each item card.
        card.innerHTML = `
            <div class="item-info" style="cursor: pointer;">
                <strong>${item.name}</strong>
                <p>Ksh ${item.price.toFixed(2)}</p>
            </div>
            <button class="edit-btn" style="padding: 5px; cursor: pointer;">Edit</button>
        `;

        // Toggle the 'purchased' boolean when the item info is clicked.
        card.querySelector('.item-info').addEventListener('click', () => {
            item.purchased = !item.purchased;
            saveToLocalStorage();
            renderList();
        });

        // Handle editing. We use stopPropagation() so clicking 'Edit' doesn't also trigger the 'purchased' toggle on the parent container.
        card.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const newName = prompt("Edit item name:", item.name);
            const newPrice = prompt("Edit price:", item.price);
            
            if (newName !== null && newPrice !== null) {
                item.name = newName;
                item.price = parseFloat(newPrice) || 0;
                saveToLocalStorage();
                renderList();
            }
        });

        total += item.price;
        displayArea.appendChild(card);
    });

    totalPriceElement.textContent = total.toFixed(2);
}

clearBtn.addEventListener('click', () => {
    shoppingList = [];
    saveToLocalStorage();
    renderList();
});
    

// Initial load
renderList();