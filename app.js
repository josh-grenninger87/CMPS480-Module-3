// LOGIN
const loginButton = document.querySelector('.login-button');
const loginText = document.querySelector('.login-text');

let isLoggedIn = false;

loginButton.addEventListener('click', () => {
    isLoggedIn = !isLoggedIn;

    loginText.innerHTML = isLoggedIn
        ? 'Welcome back!<br>Sync enabled'
        : 'Sign in to sync<br>across devices';

    // FEEDBACK
    loginButton.style.transform = 'scale(1.1)';
    setTimeout(() => {
        loginButton.style.transform = 'scale(1)';
    }, 150);
});

// SELECTION
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('click', () => {
        const productName = card.querySelector('.product-name').textContent.trim();
        const productPrice = card.querySelector('.product-price').textContent.trim();

        alert(`Subscription Selected:\n\n${productName}\n${productPrice}`);

        // FEEDBACK
        card.classList.add('selected');
        setTimeout(() => card.classList.remove('selected'), 300);
    });
});

// SUBSCRIPTIONS
const savedSubscriptions = document.querySelectorAll('.prescription-item');

savedSubscriptions.forEach(item => {
    item.addEventListener('click', () => {
        const name = item.querySelector('.prescription-name').textContent.trim();
        const details = item.querySelector('.prescription-details').textContent.trim();
        const price = item.querySelector('.prescription-badge').textContent.trim();

        alert(`Subscription Details:\n\n${name}\n${details}\nPrice: ${price}`);

        // FEEDBACK
        item.classList.add('selected');
        setTimeout(() => item.classList.remove('selected'), 300);
    });
});

// BROWSE BY CATEGORY
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(category => {
    category.addEventListener('click', () => {
        const categoryName = category.textContent.trim();
        alert(`Browsing subscriptions in category:\n\n${categoryName}`);

        // FEEDBACK
        category.classList.add('selected');
        setTimeout(() => category.classList.remove('selected'), 300);
    });
});

// NEWS ITEMS
const newsItems = document.querySelectorAll('.news-item');

newsItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('.news-title-text').textContent.trim();
        const tag = item.querySelector('.news-tag').textContent.trim();

        
        const spans = item.querySelectorAll('.news-meta span');
        const posted = spans[0]?.textContent.trim() || '';
        const priceChange = spans[1]?.textContent.trim() || '';

        alert(
            `Update Details:\n\n${title}\nType: ${tag}\nPosted: ${posted}` +
            (priceChange ? `\nChange: ${priceChange}` : '')
        );

        // FEEDBACK
        item.classList.add('selected');
        setTimeout(() => item.classList.remove('selected'), 300);
    });
});

// PAGE LOADED
console.log('SubTracker dashboard loaded successfully.');