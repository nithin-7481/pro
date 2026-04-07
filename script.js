// DEFAULT PRODUCTS
const products = JSON.parse(localStorage.getItem("products")) || [
    {
        title: "Laptop",
        price: 60000,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
        title: "Phone",
        price: 20000,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
        title: "Bike",
        price: 45000,
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39"
    },
    {
        title: "Bullet",
        price: 180000,
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2"
    },
    {
        title: "Car",
        price: 500000,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
    }
];
// CART
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// DISPLAY PRODUCTS
function displayProducts() {
    const container = document.getElementById("products");
    if (!container) return;

    container.innerHTML = "";

    products.forEach((p, i) => {
        container.innerHTML += `
        <div class="card">
            <img src="${p.image}">
            <h3>${p.title}</h3>
            <p>₹${p.price}</p>

            <button onclick="addToCart(${i})">Add to Cart</button>
            <button onclick="deleteProduct(${i})">Delete</button>
        </div>
        `;
    });
}

// ADD PRODUCT
function addProduct() {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const file = document.getElementById("imageInput").files[0];

    if (!title || !price || !file) {
        alert("Fill all fields");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        products.push({
            title,
            price,
            image: reader.result
        });

        saveProducts();
        displayProducts();
    };

    reader.readAsDataURL(file);
}

// DELETE PRODUCT
function deleteProduct(i) {
    products.splice(i, 1);
    saveProducts();
    displayProducts();
}

// ADD TO CART
function addToCart(i) {
    cart.push(products[i]);
    saveCart();
    alert("Added to cart");
}

// DISPLAY CART
function displayCart() {
    const container = document.getElementById("cart");
    const totalEl = document.getElementById("total");

    if (!container) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
        total += Number(item.price);

        container.innerHTML += `
        <div class="card">
            <img src="${item.image}">
            <h3>${item.title}</h3>
            <p>₹${item.price}</p>
            <button onclick="removeFromCart(${i})">Remove</button>
        </div>
        `;
    });

    totalEl.innerText = "Total: ₹" + total;
}

// REMOVE FROM CART
function removeFromCart(i) {
    cart.splice(i, 1);
    saveCart();
    displayCart();
}

// CHECKOUT
function placeOrder() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;

    if (!name || !address) {
        alert("Fill all details");
        return;
    }

    localStorage.removeItem("cart");

    document.getElementById("message").innerText =
        "Order placed successfully 🎉";
}

// LOAD
displayProducts();
displayCart();