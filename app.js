/
// API
/const mockDB = {
    subscriptions: [
        { id: 1, name: 'Netflix Premium', cost: 15.49, category: 'streaming', renewalDate: '2026-02-20', status: 'active', notes: '4 screens • Ultra HD quality' },
        { id: 2, name: 'Spotify Family', cost: 16.99, category: 'music', renewalDate: '2026-02-25', status: 'active', notes: '6 accounts included' },
        { id: 3, name: 'Adobe Creative Cloud', cost: 54.99, category: 'software', renewalDate: '2026-02-28', status: 'active', notes: 'All apps included' },
        { id: 4, name: 'Amazon Prime', cost: 14.99, category: 'other', renewalDate: '2026-03-05', status: 'active', notes: 'Free shipping + video' }
    ],
    nextId: 5
};

const API = {
    delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); },
    async getAllSubscriptions() { await this.delay(100); return [...mockDB.subscriptions]; },
    async getSubscription(id) { await this.delay(50); return mockDB.subscriptions.find(sub => sub.id === id); },
    async createSubscription(data) { 
        await this.delay(200); 
        const newSub = { id: mockDB.nextId++, ...data, status: 'active' }; 
        mockDB.subscriptions.push(newSub); 
        return newSub; 
    },
    async updateSubscription(id, data) {
        await this.delay(200);
        const index = mockDB.subscriptions.findIndex(sub => sub.id === id);
        if (index !== -1) {
            mockDB.subscriptions[index] = { ...mockDB.subscriptions[index], ...data };
            return mockDB.subscriptions[index];
        }
        throw new Error('Subscription not found');
    },
    async deleteSubscription(id) {
        await this.delay(150);
        const index = mockDB.subscriptions.findIndex(sub => sub.id === id);
        if (index !== -1) {
            mockDB.subscriptions.splice(index, 1);
            return true;
        }
        return false;
    },
    async cancelSubscription(id) {
        await this.delay(150);
        return this.updateSubscription(id, { status: 'cancelled' });
    }
};

// Login Toggle
function setupLoginToggle() {
    const loginButton = document.querySelector('.login-button');
    const loginText = document.querySelector('.login-text');

    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const updateLoginText = () => {
        loginText.innerHTML = isLoggedIn
            ? 'Welcome back!<br>Sync enabled'
            : 'Sign in to sync<br>across devices';
    };
    updateLoginText();

    loginButton.addEventListener('click', () => {
        isLoggedIn = !isLoggedIn;
        localStorage.setItem('isLoggedIn', isLoggedIn);
        updateLoginText();
        loginButton.style.transform = 'scale(1.1)';
        setTimeout(() => loginButton.style.transform = 'scale(1)', 150);
    });
}


// Product Selection
function setupProductSelection() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (!card) return;

        const { subName, company, logo, price } = card.dataset;
        highlightElement(card);

        const params = new URLSearchParams({ name: subName, company, logo, price });
        window.location.href = `detail.html?${params.toString()}`;
    });
}


// Saved Subscriptions
function setupSavedSubscriptions() {
    const prescriptionList = document.querySelector('.prescription-list');
    if (!prescriptionList) return;

    prescriptionList.addEventListener('click', (e) => {
        const item = e.target.closest('.prescription-item');
        if (!item) return;

        highlightElement(item);

        const { subName, company, logo, price } = item.dataset;
        const params = new URLSearchParams({ name: subName, company, logo, price });
        window.location.href = `detail.html?${params.toString()}`;
    });
}


// Browse by Category
function setupCategoryBrowse() {
    const browseSection = document.querySelector('.browse-categories');
    const productGrid = document.querySelector('.product-grid');
    if (!browseSection || !productGrid) return;

    const allProducts = Array.from(productGrid.children);

    browseSection.addEventListener('click', (e) => {
        const categoryCard = e.target.closest('.category-card');
        if (!categoryCard) return;

        highlightElement(categoryCard);

        const categoryName = categoryCard.querySelector('.category-name').textContent.trim().toLowerCase();

        allProducts.forEach(card => {
            const cardCategory = card.dataset.subName.toLowerCase();
            // Simple matching based on category keywords
            if (
                (categoryName.includes('streaming') && ['netflix', 'youtube', 'disney', 'hbo', 'hulu'].some(n => cardCategory.includes(n))) ||
                (categoryName.includes('music') && ['spotify', 'apple'].some(n => cardCategory.includes(n))) ||
                (categoryName.includes('software') && ['adobe', 'github'].some(n => cardCategory.includes(n)))
            ) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// News Items
function setupNewsItems() {
    const newsFeed = document.querySelector('.news-feed');
    if (!newsFeed) return;

    newsFeed.addEventListener('click', (e) => {
        const item = e.target.closest('.news-item');
        if (!item) return;

        highlightElement(item);

        const title = item.querySelector('.news-title-text').textContent.trim();
        const tag = item.querySelector('.news-tag').textContent.trim();
        const spans = item.querySelectorAll('.news-meta span');
        const posted = spans[0]?.textContent.trim() || '';
        const priceChange = spans[1]?.textContent.trim() || '';

        alert(`Update Details:\n${title}\nType: ${tag}\nPosted: ${posted}` +
              (priceChange ? `\nChange: ${priceChange}` : ''));
    });
}

//Highlight clicked element
function highlightElement(el) {
    el.classList.add('selected');
    setTimeout(() => el.classList.remove('selected'), 300);
}

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
    setupLoginToggle();
    setupProductSelection();
    setupSavedSubscriptions();
    setupCategoryBrowse();
    setupNewsItems();

    console.log('SubTracker dashboard loaded successfully.');
});



// PAGE LOADED

console.log('SubTracker dashboard loaded successfully.');
