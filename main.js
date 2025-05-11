// Coffee data
const coffees = [
    { id: 1, name: "Espresso", description: "Strong, concentrated coffee served in a small cup.", price: 3.5, image: "assets/Espresso.jpg", category: "hot" },
    { id: 2, name: "Cappuccino", description: "Espresso with steamed milk and a layer of foamed milk.", price: 4.5, image: "assets/cappuccino.jpeg", category: "hot" },
    { id: 3, name: "Latte", description: "Espresso with a lot of steamed milk and a little foam.", price: 4.75, image: "assets/Latte.jpeg", category: "hot" },
    { id: 4, name: "Cold Brew", description: "Coffee brewed with cold water over a long period.", price: 5.0, image: "assets/cold-brew.jpg", category: "cold" },
    { id: 5, name: "Iced Latte", description: "Espresso with cold milk and ice.", price: 5.25, image: "assets/cold-coffee.jpg", category: "cold" },
    { id: 6, name: "Mocha", description: "Espresso with chocolate and steamed milk.", price: 5.5, image: "assets/mocha.jpg", category: "hot" },
    { id: 7, name: "Affogato", description: "Espresso poured over a scoop of vanilla ice cream.", price: 6.0, image: "assets/Affogato.jpg", category: "hot" },
    { id: 8, name: "Americano", description: "Espresso diluted with hot water.", price: 3.0, image: "assets/americano.jpg", category: "hot" },
    { id: 9, name: "Black Coffee", description: "Simple, strong, and unsweetened coffee.", price: 2.5, image: "assets/black coffee.jpg", category: "hot" },
    { id: 10, name: "Caramel Macchiato", description: "Espresso with caramel and steamed milk.", price: 5.75, image: "assets/Caramel-macchiato.jpg", category: "hot" },
    { id: 11, name: "Chocolate Cold Coffee", description: "Cold coffee with a rich chocolate flavor.", price: 5.5, image: "assets/chocolate-cold-coffee.jpeg", category: "cold" },
    { id: 12, name: "Frappe", description: "Blended iced coffee with milk and sugar.", price: 5.0, image: "assets/frappe.jpg", category: "cold" },
    { id: 13, name: "French Vanilla", description: "Rich and creamy vanilla-flavored coffee.", price: 4.5, image: "assets/french-vanilla.jpg", category: "hot" },
    { id: 14, name: "Macchiato", description: "Espresso with a small amount of foamed milk.", price: 4.0, image: "assets/Macchiato.jpeg", category: "hot" },
    { id: 15, name: "Turkish Coffee", description: "Strong and unfiltered coffee with a rich aroma.", price: 4.25, image: "assets/Turkish.jpg", category: "hot" },
    { id: 16, name: "Flat White", description: "Espresso with steamed milk and a thin layer of microfoam.", price: 4.75, image: "assets/Flat white.jpg", category: "hot" },
    { id: 17, name: "Cortado", description: "Espresso cut with a small amount of warm milk.", price: 4.0, image: "assets/Cortado.jpg", category: "hot" },
    { id: 18, name: "Brownies", description: "Rich and fudgy chocolate brownies.", price: 3.0, image: "assets/Brownies.jpg", category: "dessert" },
    { id: 19, name: "Burger", description: "Juicy beef burger with fresh toppings.", price: 6.5, image: "assets/Burger.jpeg", category: "food" },
    { id: 20, name: "French Fries", description: "Crispy golden french fries.", price: 2.5, image: "assets/french-fries.jpg", category: "food" },
    { id: 21, name: "Pizza", description: "Cheesy pizza with your choice of toppings.", price: 8.0, image: "assets/pizza.jpg", category: "food" },
    { id: 22, name: "Sandwich", description: "Freshly made sandwich with your choice of fillings.", price: 4.0, image: "assets/Sandwich.jpg", category: "food" },
    { id: 23, name: "Muffin", description: "Soft and fluffy muffin with a hint of sweetness.", price: 2.5, image: "assets/muffin.jpg", category: "dessert" },
    { id: 24, name: "Ice Cream", description: "Creamy and delicious ice cream in various flavors.", price: 3.5, image: "assets/ice-cream.jpg", category: "dessert" },
    { id: 25, name: "Kit Kat Shake", description: "Chocolate shake blended with Kit Kat pieces.", price: 5.0, image: "assets/kit-kat-shake.jpg", category: "drink" },
    { id: 26, name: "Strawberry Milkshake", description: "Refreshing strawberry milkshake.", price: 4.5, image: "assets/Strawberry-Milkshake.jpg", category: "drink" },
    { id: 27, name: "Vanilla Milkshake", description: "Classic vanilla milkshake.", price: 4.0, image: "assets/Vanilla Milkshake.jpeg", category: "drink" },
    { id: 28, name: "Lemon Tea", description: "Refreshing lemon tea with a hint of honey.", price: 3.0, image: "assets/lemon tea.jpeg", category: "drink" },
    { id: 29, name: "Mojito", description: "Cool and refreshing mint mojito.", price: 4.0, image: "assets/mojito.jpg", category: "drink" },
    { id: 30, name: "Fanta", description: "Chilled orange-flavored soda.", price: 2.0, image: "assets/Fanta.jpeg", category: "drink" }
];

// DOM Elements
const coffeeGrid = document.getElementById('coffeeGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const steamContainer = document.getElementById('steamContainer');
const exploreBtn = document.querySelector('.explore-btn');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Generate steam effect
    initSteamEffect();
    
    // Render coffee items
    renderCoffeeItems('all');
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            
            // Render coffee items based on filter
            renderCoffeeItems(filter);
        });
    });
    
    // Scroll to menu section when explore button is clicked
    exploreBtn.addEventListener('click', () => {
        const menuSection = document.querySelector('.menu-section');
        menuSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Generate steam effect
function initSteamEffect() {
    setInterval(() => {
        const steam = document.createElement('div');
        steam.className = 'steam';
        steam.style.left = `${Math.random() * 40 + 30}%`;
        steam.style.animationDuration = `${Math.random() * 3 + 2}s`;
        steamContainer.appendChild(steam);
        
        // Remove steam element after animation
        setTimeout(() => {
            steam.remove();
        }, 5000);
    }, 500);
}

// Mock addToCart function (replace with your actual implementation)
function addToCart(coffee) {
    console.log(`${coffee.name} added to cart (mock function)`);
    // In a real application, you would update the cart state here.
}

// Render coffee items based on filter
function renderCoffeeItems(filter) {
    // Clear coffee grid
    coffeeGrid.innerHTML = '';
    
    // Filter coffees
    const filteredCoffees = filter === 'all' 
        ? coffees 
        : coffees.filter(coffee => coffee.category === filter);
    
    // Render each coffee item
    filteredCoffees.forEach((coffee, index) => {
        const coffeeCard = document.createElement('div');
        coffeeCard.className = 'coffee-card';
        coffeeCard.innerHTML = `
            <div class="coffee-image">
                <img src="${coffee.image}" alt="${coffee.name}" class="coffee-img">
            </div>
            <div class="coffee-details">
                <div class="coffee-header">
                    <h3 class="coffee-name">${coffee.name}</h3>
                    <span class="coffee-price">$${coffee.price.toFixed(2)}</span>
                </div>
                <p class="coffee-description">${coffee.description}</p>
                <button class="add-to-cart-btn" data-id="${coffee.id}">
                    <i class="fas fa-plus"></i>
                    Add to Cart
                </button>
            </div>
        `;
        
        coffeeGrid.appendChild(coffeeCard);
        
        // Add animation delay based on index
        setTimeout(() => {
            coffeeCard.classList.add('visible');
        }, index * 100);
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const coffeeId = parseInt(button.getAttribute('data-id'));
            const coffee = coffees.find(c => c.id === coffeeId);
            
            // Add to cart
            addToCart(coffee);
            
            // Show notification
            showNotification(`${coffee.name} added to cart!`);
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('active');
    
    // Remove notification after animation
    setTimeout(() => {
        notification.classList.remove('active');
    }, 2000);
}