const cart = [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
        const id = e.target.getAttribute("data-id");
        const name = e.target.getAttribute("data-name");
        const price = parseFloat(e.target.getAttribute("data-price"));

        const existingProduct = cart.find((item) => item.id === id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        renderCart();
    }
});

function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">Eliminar</button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartTotal.textContent = total.toFixed(2);
}

cartItemsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-item")) {
        const id = e.target.getAttribute("data-id");
        const index = cart.findIndex((item) => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
            renderCart();
        }
    }
});
