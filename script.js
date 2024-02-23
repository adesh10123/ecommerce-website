document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('send-message').addEventListener('click', () => {
        const input = document.getElementById('chat-input');
        const messages = document.getElementById('chat-messages');
        messages.value += `You: ${input.value}\n`; // Simulate user message
        // Simulate a response
        setTimeout(() => {
            messages.value += `Support: Thank you for contacting us. How may I assist you?\n`;
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
        input.value = ''; // Clear input
    });
    
    const discountCodes = {
        'SAVE10': 10, // 10% discount
        'WELCOME20': 20 // 20% discount
    };
    
    document.getElementById('apply-discount').addEventListener('click', () => {
        const inputCode = document.getElementById('discount-code').value.toUpperCase();
        const discount = discountCodes[inputCode];
        if (discount) {
            alert(`Discount of ${discount}% applied!`);
            // Apply discount logic here, e.g., update the cart total
        } else {
            alert('Invalid discount code.');
        }
    });
    
    document.querySelectorAll('.product-img').forEach(image => {
        image.addEventListener('click', () => {
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'flex';
            lightbox.querySelector('img').src = image.src;
        });
    });
    
    document.getElementById('lightbox').addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        e.currentTarget.style.display = 'none';
    });
    
    document.getElementById('search-input').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const products = document.querySelectorAll('.product'); // Assuming each product has a class "product"
        products.forEach(product => {
            const title = product.querySelector('.product-title').textContent.toLowerCase(); // Assuming title class
            if (title.includes(searchTerm)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    });
    
    document.getElementById('checkout-btn').addEventListener('click', () => {
        // Check if the cart is empty
        if (cart.length === 0) {
            alert("Your cart is empty.");
        } else {
            // Simulate a checkout process
            alert("Checkout successful. Thank you for your purchase!");
    
            // Clear the cart
            cart = [];
            updateCart();
        }
    });
    
    const products = [
        { id: 1, name: 'Product 1', price: 10, image: 'camera.jpg' },
        { id: 2, name: 'Product 2', price: 20, image: 'rayban-glasses.jpg' },
        { id: 3, name: 'Product 3', price: 5, image: 'pepsi.jpg' },
        { id: 4, name: 'Product 4', price: 50, image: 'headphiones.jpg' },
        { id: 5, name: 'Product 5', price: 200, image: 'nike.jpg' },
    ];

    const productList = document.getElementById('product-list');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    let cart = [];

    function updateCart() {
        cartItemsEl.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            total += product.price * item.quantity;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <span>${product.name} x ${item.quantity}</span>
                <button onclick="removeFromCart(${product.id})">Remove</button>
            `;
            cartItemsEl.appendChild(itemEl);
        });
        cartTotalEl.textContent = total.toFixed(2);
    }

    window.removeFromCart = (productId) => {
        const productIndex = cart.findIndex(item => item.productId === productId);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
            updateCart();
        }
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });

    window.addToCart = (productId) => {
        const cartItem = cart.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ productId, quantity: 1 });
        }
        updateCart();
    };

    updateCart();
});
