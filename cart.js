// Cart state
let cart = [];
let checkoutStep = 0;
let orderPlaced = false;

// DOM Elements
const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartContent = document.getElementById('cartContent');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const backBtn = document.getElementById('backBtn');
const cartTitle = document.getElementById('cartTitle');
const cartFooter = document.getElementById('cartFooter');

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners
    cartToggleBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    checkoutBtn.addEventListener('click', handleCheckout);
    backBtn.addEventListener('click', handleBack);
    
    // Update cart UI
    updateCartUI();
});

// Toggle cart sidebar
function toggleCart() {
    cartOverlay.classList.toggle('active');
    cartSidebar.classList.toggle('active');
}

// Add item to cart
function addToCart(coffee) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === coffee.id);
    
    if (existingItem) {
        // Update quantity
        existingItem.quantity += 1;
    } else {
        // Add new item
        cart.push({
            ...coffee,
            quantity: 1
        });
    }
    
    // Update cart UI
    updateCartUI();
}

// Remove item from cart
function removeFromCart(id) {
    // Filter out item
    cart = cart.filter(item => item.id !== id);
    
    // Update cart UI
    updateCartUI();
}

// Update item quantity
function updateQuantity(id, quantity) {
    if (quantity <= 0) {
        removeFromCart(id);
        return;
    }
    
    // Update quantity
    cart = cart.map(item => {
        if (item.id === id) {
            return {
                ...item,
                quantity
            };
        }
        return item;
    });
    
    // Update cart UI
    updateCartUI();
}

// Clear cart
function clearCart() {
    cart = [];
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    
    // Show/hide checkout button
    checkoutBtn.disabled = cart.length === 0 && checkoutStep === 0;
    
    // Update cart content based on checkout step
    if (orderPlaced) {
        renderOrderSuccess();
    } else if (checkoutStep === 0) {
        renderCartItems();
    } else if (checkoutStep === 1) {
        renderCheckoutForm();
    } else if (checkoutStep === 2) {
        renderPaymentForm();
    }
}

// Render cart items
function renderCartItems() {
    // Update cart title
    cartTitle.innerHTML = '<i class="fas fa-shopping-cart"></i> Your Cart';
    
    // Hide back button
    backBtn.style.display = 'none';
    
    // Show cart footer if items exist
    cartFooter.style.display = cart.length > 0 ? 'block' : 'none';
    
    // Update checkout button text
    checkoutBtn.textContent = 'Checkout';
    
    // Clear cart content
    cartContent.innerHTML = '';
    
    if (cart.length === 0) {
        // Show empty cart message
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-coffee"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious coffee to get started!</p>
            </div>
        `;
        return;
    }
    
    // Render each cart item
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <i class="fas fa-coffee"></i>
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease-btn" data-id="${item.id}">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn increase-btn" data-id="${item.id}">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <button class="remove-btn" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        cartContent.appendChild(cartItem);
    });
    
    // Add event listeners to cart item buttons
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            updateQuantity(id, item.quantity - 1);
        });
    });
    
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            updateQuantity(id, item.quantity + 1);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

// Render checkout form
function renderCheckoutForm() {
    // Update cart title
    cartTitle.innerHTML = '<i class="fas fa-shopping-cart"></i> Checkout';
    
    // Show back button
    backBtn.style.display = 'block';
    
    // Show cart footer
    cartFooter.style.display = 'block';
    
    // Update checkout button text
    checkoutBtn.textContent = 'Continue to Payment';
    
    // Render checkout form
    cartContent.innerHTML = `
        <div class="checkout-form">
            <h3 class="form-title">Delivery Information</h3>
            <div class="form-group">
                <label class="form-label" for="name">Full Name</label>
                <input type="text" id="name" class="form-input" placeholder="Enter your full name" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="email">Email</label>
                <input type="email" id="email" class="form-input" placeholder="Enter your email" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="address">Delivery Address</label>
                <input type="text" id="address" class="form-input" placeholder="Enter your address" required>
            </div>
        </div>
    `;
}

// Render payment form
function renderPaymentForm() {
    // Update cart title
    cartTitle.innerHTML = '<i class="fas fa-shopping-cart"></i> Payment';
    
    // Show back button
    backBtn.style.display = 'block';
    
    // Show cart footer
    cartFooter.style.display = 'block';
    
    // Update checkout button text
    checkoutBtn.textContent = 'Place Order';
    
    // Render payment form
    cartContent.innerHTML = `
        <div class="checkout-form">
            <h3 class="form-title">Payment Method</h3>
            <div class="payment-option">
                <div class="payment-header">
                    <input type="radio" id="card" name="payment" checked>
                    <label for="card">Credit Card</label>
                </div>
                <div class="card-inputs">
                    <input type="text" class="form-input" placeholder="Card Number">
                    <div class="card-row">
                        <input type="text" placeholder="MM/YY">
                        <input type="text" placeholder="CVC">
                    </div>
                </div>
            </div>
            <div class="payment-option">
                <div class="payment-header">
                    <input type="radio" id="cash" name="payment">
                    <label for="cash">Cash on Delivery</label>
                </div>
            </div>
        </div>
    `;
}

// Render order success
function renderOrderSuccess() {
    // Hide cart footer
    cartFooter.style.display = 'none';
    
    // Render success message
    cartContent.innerHTML = `
        <div class="order-success">
            <div class="success-icon">
                <i class="fas fa-check"></i>
            </div>
            <h3 class="success-title">Order Placed!</h3>
            <p class="success-message">Thank you for your order. Your coffee will be ready soon!</p>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
        </div>
    `;
    
    // Animate progress bar
    setTimeout(() => {
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = '100%';
    }, 100);
}

// Handle checkout button click
function handleCheckout() {
    if (checkoutStep < 2) {
        // Go to next step
        checkoutStep++;
    } else {
        // Place order
        orderPlaced = true;
        
        // Reset after 3 seconds
        setTimeout(() => {
            clearCart();
            checkoutStep = 0;
            orderPlaced = false;
            toggleCart();
        }, 3000);
    }
    
    // Update cart UI
    updateCartUI();
}

// Handle back button click
function handleBack() {
    // Go to previous step
    checkoutStep--;
    
    // Update cart UI
    updateCartUI();
}