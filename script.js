//Initialize empty array where we store data objects
let shoppingList = [];

//Grabbing the parts in html we need to target
const itemForm = document.getElementById('item-form');
const productInput = document.getElementById('product');
const priceInput = document.getElementById('price');
const displayArea = document.getElementById('display-area');
const hiddenSection = document.querySelector('.hiddenPart');
const clearBtn = document.querySelector('.clear-list');

//runs when form is submitted(click add/press enter)
itemForm.addEventListener('submit', (e) => {
    //stop page from reloading
    e.preventDefault();

    //Create new object for item
    const newItem = {
        name: productInput.value,
        price: parseFloat(priceInput.value),
        id: Date.now()
    };

    //Add object to array
    shoppingList.push(newItem);
    //Call function to update screen
    renderList();
    itemForm.reset();
});
//Clear screen and redraw list from array
function renderList() {
    //Clear display area to avoid duplicates
    displayArea.innerHTML = '';
    //Check if list is empty to show/hide sections
    if (shoppingList.length > 0){
        displayArea.style.display = 'grid';
        hiddenSection.style.display = 'block';
    }
    else{
        displayArea.style.display = 'none';
        hiddenSection.style.display = 'none';
    }
    //loop throrugh array and build cards
    shoppingList.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'shopping-card';
        //add content(Item & Price)
        card.innerHTML = `
            <strong>${item.name}</strong>
            <p>Ksh ${item.price.toFixed(2)}</p>
            `;

            //push card into display area
            displayArea.appendChild(card);
    });
}


//Empty array and update screen
clearBtn.addEventListener('click', () => {
    shoppingList = [];//Reset array
    renderList();//Redraw(hides everything)
});
    