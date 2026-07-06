
const nameInput = document.getElementById("nameInput");
const priceInput = document.getElementById("priceInput");
const quantityInput = document.getElementById("quantityInput");
const addBtn = document.getElementById("addBtn");
const cartContainer = document.getElementById("cartContainer");
const totalDisplay = document.getElementById("totalDisplay");

addBtn.addEventListener("click", addItem);
cartContainer.addEventListener("click", function(event){

    const itemElement = event.target.parentElement;

    if(event.target.classList.contains("plus-btn")){
        updateQuantity(itemElement, 1);
    }

    if(event.target.classList.contains("minus-btn")){
        updateQuantity(itemElement, -1);
    }

    if(event.target.classList.contains("remove-btn")){
        removeItem(itemElement);
    }

});
function addItem(){
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const quantity = parseInt(quantityInput.value);
    if(name === "" || price <= 0 || isNaN(price) || quantity <= 0 || !Number.isInteger(quantity)){
        alert("Please enter valid product information.");
        return;
    }

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    const nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.textContent = name;
    const priceSpan = document.createElement("span");
    priceSpan.className = "price";
    priceSpan.textContent = price.toFixed(2);
    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.className = "minus-btn";

    const quantitySpan = document.createElement("span");
    quantitySpan.className = "quantity";
    quantitySpan.textContent = quantity;

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.className = "plus-btn";

    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    cartItem.appendChild(nameSpan);
    cartItem.appendChild(priceSpan);
    cartItem.appendChild(minusBtn);
    cartItem.appendChild(quantitySpan);
    cartItem.appendChild(plusBtn);
    cartItem.appendChild(removeBtn);

    cartContainer.appendChild(cartItem);
    calculateTotal();
    nameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
}


function updateQuantity(itemElement, change){
    const quantityElement = itemElement.querySelector(".quantity");
    let quantity = parseInt(quantityElement.textContent);
    quantity += change;
    if(quantity <= 0){
        removeItem(itemElement);
        return;
    }

    quantityElement.textContent = quantity;

    calculateTotal();
}
function removeItem(itemElement){

    itemElement.remove();

    calculateTotal();
}

function calculateTotal(){
    const items = document.querySelectorAll(".cart-item");
    let total = 0;
    items.forEach(function(item){

        const price = parseFloat(item.querySelector(".price").textContent);

        const quantity = parseInt(item.querySelector(".quantity").textContent);

        total += price * quantity;

    });
    totalDisplay.textContent = "Total: $" + total.toFixed(2);
}