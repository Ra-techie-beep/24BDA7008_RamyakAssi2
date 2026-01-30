const products = [
    { id: 1, name: "Wireless Noise Cancelling Headphones", category: "Electronics", price: 299.99, rating: 4.8, image: "🎧" },
    { id: 2, name: "4K Ultra HD Smart TV 55\"", category: "Electronics", price: 450.00, rating: 4.5, image: "📺" },
    { id: 3, name: "Bluetooth Portable Speaker", category: "Electronics", price: 49.99, rating: 4.2, image: "🔊" },
    { id: 4, name: "Sleek Ultrabook Laptop", category: "Electronics", price: 999.00, rating: 4.9, image: "💻" },
    { id: 5, name: "Smart Watch Series 5", category: "Electronics", price: 199.50, rating: 4.6, image: "⌚" },
    
    { id: 6, name: "Classic Denim Jacket", category: "Fashion", price: 65.00, rating: 4.4, image: "🧥" },
    { id: 7, name: "Running Sneakers Breathable", category: "Fashion", price: 89.99, rating: 4.3, image: "👟" },
    { id: 8, name: "Premium Cotton T-Shirt", category: "Fashion", price: 25.00, rating: 4.0, image: "👕" },
    { id: 9, name: "Leather Crossbody Bag", category: "Fashion", price: 120.00, rating: 4.7, image: "👜" },
    { id: 10, name: "Designer Sunglasses", category: "Fashion", price: 150.00, rating: 4.5, image: "🕶️" },

    { id: 11, name: "Ergonomic Office Chair", category: "Home", price: 250.00, rating: 4.6, image: "🪑" },
    { id: 12, name: "Ceramic Coffee Mug Set", category: "Home", price: 35.00, rating: 4.8, image: "☕" },
    { id: 13, name: "Minimalist Desk Lamp", category: "Home", price: 45.00, rating: 4.1, image: "💡" },
    { id: 14, name: "Soft Throw Blanket", category: "Home", price: 29.99, rating: 4.9, image: "🛋️" },
    { id: 15, name: "Indoor Potted Plant (Fake)", category: "Home", price: 19.99, rating: 3.8, image: "🪴" },

    { id: 16, name: "Yoga Mat Non-Slip", category: "Sports", price: 22.00, rating: 4.7, image: "🧘" },
    { id: 17, name: "Professional Tennis Racket", category: "Sports", price: 180.00, rating: 4.6, image: "🎾" },
    { id: 18, name: "Stainless Steel Water Bottle", category: "Sports", price: 15.00, rating: 4.4, image: "💧" },
    { id: 19, name: "Dumbbell Set (10kg)", category: "Sports", price: 55.00, rating: 4.5, image: "🏋️" },
    { id: 20, name: "Camping Tent 2-Person", category: "Sports", price: 120.00, rating: 4.3, image: "⛺" }
];

const container = document.getElementById('product-container');
const filterCategory = document.getElementById('filter-category');
const sortBy = document.getElementById('sort-by');
const sortOrder = document.getElementById('sort-order');

function renderProducts(items) {
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<div class="no-results">No products found matching your filters.</div>';
        return;
    }

    items.forEach(product => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-image">
                <span class="category-badge">${product.category}</span>
                ${product.image}
            </div>
            <div class="card-body">
                <h3 class="product-name">${product.name}</h3>
                <div class="rating">
                        ${getStarRating(product.rating)}
                        <span class="rating-count">(${product.rating})</span>
                </div>
                <div class="price-row">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="btn-add">Add</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function getStarRating(rating) {
    const stars = Math.round(rating);
    let starHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < stars) {
            starHtml += '★';
        } else {
            starHtml += '☆';
        }
    }
    return starHtml;
}

function updateDisplay() {
    let result = [...products];

    const category = filterCategory.value;
    if (category !== 'all') {
        result = result.filter(p => p.category === category);
    }

    const sortField = sortBy.value;
    const order = sortOrder.value;

    result.sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });

    renderProducts(result);
}

filterCategory.addEventListener('change', updateDisplay);
sortBy.addEventListener('change', updateDisplay);
sortOrder.addEventListener('change', updateDisplay);

updateDisplay();
