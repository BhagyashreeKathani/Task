let selectedOption = null;
let cart = [];

function selectOption(element, price, quantity) {
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));

    element.classList.add('selected');
    selectedOption = { element, price, quantity };

    document.querySelector('.total').textContent = `Total: DKK ${price.toFixed(2)}`;

    document.getElementById('add-to-cart-btn').textContent = `+ Add `;
}

function addToCart() {
    if (!selectedOption) {
        alert("Please select a bundle first!");
        return;
    }

    // Get selected size and color
    const size = selectedOption.element.querySelector('.size-select').value;
    const color = selectedOption.element.querySelector('.color-select').value;

    // Add item to cart
    const item = {
        quantity: selectedOption.quantity,
        price: selectedOption.price,
        size: size,
        color: color
    };
    cart.push(item);

    // Update Cart Display
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            ${item.quantity} Pairs - Size: ${item.size}, Color: ${item.color} - DKK ${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})">X</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById('cart-total').textContent = `Total: DKK ${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
