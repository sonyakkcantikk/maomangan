// Data Produk Contoh
const products = [
    { id: 1, name: "Kopi Susu Gula Aren", price: 15000, category: "coffee", img: "☕" },
    { id: 2, name: "Americano", price: 12000, category: "coffee", img: "☕" },
    { id: 3, name: "Matcha Latte", price: 18000, category: "noncoffee", img: "🍵" },
    { id: 4, name: "Fresh Milk Brown Sugar", price: 16000, category: "milk", img: "🥛" }
];

let cart = [];
let selectedProduct = null;

// Tampilkan Halaman Utama
function startOrdering() {
    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("mainWebsite").classList.remove("hidden");
    renderProducts(products);
}

// Render Produk ke Layar
function renderProducts(items) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";
    items.forEach(p => {
        container.innerHTML += `
            <div style="background:white; padding:15px; border-radius:10px; text-align:center; box-shadow:0 2px 5px rgba(0,0,0,0.1); margin-bottom:15px;">
                <div style="font-size:40px;">${p.img}</div>
                <h3>${p.name}</h3>
                <p>Rp${p.price.toLocaleString("id-ID")}</p>
                <button onclick="openProduct(${p.id})" style="background:#6f4e37; color:white; padding:8px 15px; border-radius:15px; margin-top:10px;">Pilih</button>
            </div>
        `;
    });
}

// Filter Menu
function filterMenu(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Modal Produk
function openProduct(id) {
    selectedProduct = products.find(p => p.id === id);
    document.getElementById("modalName").innerText = selectedProduct.name;
    document.getElementById("modalPrice").innerText = "Rp" + selectedProduct.price.toLocaleString("id-ID");
    document.getElementById("productModal").classList.remove("hidden");
}

function closeProduct() {
    document.getElementById("productModal").classList.add("hidden");
}

// Masukkan Keranjang
function addToCart() {
    const sizeExtra = parseInt(document.getElementById("size").value);
    const qty = parseInt(document.getElementById("quantity").value);
    const itemPrice = selectedProduct.price + sizeExtra;

    cart.push({
        name: selectedProduct.name,
        price: itemPrice * qty,
        qty: qty
    });

    updateCartCount();
    closeProduct();
    alert("Berhasil ditambahkan ke keranjang!");
}

function updateCartCount() {
    document.getElementById("cartCount").innerText = cart.length;
}

// Modal Keranjang
function openCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `<p>${item.name} (${item.qty}x) - Rp${item.price.toLocaleString("id-ID")}</p>`;
    });

    document.getElementById("cartTotal").innerText = total.toLocaleString("id-ID");
    document.getElementById("cartModal").classList.remove("hidden");
}

function closeCart() {
    document.getElementById("cartModal").classList.add("hidden");
}

// Modal Checkout
function openCheckout() {
    closeCart();
    document.getElementById("checkoutModal").classList.remove("hidden");
}

function closeCheckout() {
    document.getElementById("checkoutModal").classList.add("hidden");
}

// Kirim Pesanan ke Web3Forms
function sendOrder() {
    let daftarPesanan = cart.map(item => `${item.name} (${item.qty}x)`).join(", ");
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    document.getElementById('input-pesanan').value = daftarPesanan;
    document.getElementById('input-total').value = "Rp " + total.toLocaleString("id-ID");

    closeCheckout();
    document.getElementById("successModal").classList.remove("hidden");
}

function closeSuccess() {
    document.getElementById("successModal").classList.add("hidden");
}