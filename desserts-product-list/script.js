let cart = [];

async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        let grid = document.getElementById('productGrid');
        
        data.forEach(product => {
            let card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-name', product.name);
            card.innerHTML = `
                <div class="img-container">
                    <img src="${product.image.desktop}" alt="${product.name}" class="product-img">
                    <div class="button-container">
                        <button class="cart-btn">
                           🛒 Add to Cart
                        </button>
                    </div>
                </div>
                <div class="info">
                    <p class="category">${product.category}</p>
                    <h4 class="product-name">${product.name}</h4>
                    <p class="price">$${product.price.toFixed(2)}</p>
                </div>`;

            grid.appendChild(card);
            setupCartButtonListener(card, product);
        });
    } catch (err) {
        console.log("Error loading dynamic elements:", err);
    }
}

loadData();

function setupCartButtonListener(card, product) {
    let mainBtn = card.querySelector('.cart-btn');

    if (mainBtn) {
        mainBtn.addEventListener('click', () => {
            let newItem = cart.find(item => item.name === product.name);
            if (!newItem) {
                cart.push({
                    category: product.category,
                    name: product.name,
                    price: product.price,
                    qty: 1
                });
            }
            updateCartUI();
            updateAllCardButtons();
        });
    }
}

function updateAllCardButtons() {
    document.querySelectorAll('.product-card').forEach(card => {
        let productName = card.getAttribute('data-name');
        let img = card.querySelector('.product-img');
        let btnContainer = card.querySelector('.button-container');
        let currentItem = cart.find(item => item.name === productName);

        if (currentItem && currentItem.qty > 0) {
            img.style.border = "2px solid #C73B0F";
            btnContainer.innerHTML = `
                <div class="counter-btn">
                    <span class="minus-icon" role="button" aria-label="Decrease quantity">−</span>
                    <span class="qty-text" aria-live="polite">${currentItem.qty}</span>
                    <span class="plus-icon" role="button" aria-label="Increase quantity">+</span>
                </div>`;

            btnContainer.querySelector('.minus-icon').addEventListener('click', (e) => {
                e.stopPropagation();
                currentItem.qty--;
                if (currentItem.qty === 0) {
                    cart = cart.filter(item => item.name !== productName);
                    resetCardToDefault(card, productName);
                } else {
                    btnContainer.querySelector('.qty-text').innerText = currentItem.qty;
                }
                updateCartUI();
            });

            btnContainer.querySelector('.plus-icon').addEventListener('click', (e) => {
                e.stopPropagation();
                currentItem.qty++;
                btnContainer.querySelector('.qty-text').innerText = currentItem.qty;
                updateCartUI();
            });
        } else {
            resetCardToDefault(card, productName);
        }
    });
}

function resetCardToDefault(card, productName) {
    let img = card.querySelector('.product-img');
    let btnContainer = card.querySelector('.button-container');
    
    img.style.border = "none";
    btnContainer.innerHTML = `
        <button class="cart-btn">
            🛒 Add to Cart
        </button>`;
    
    let priceText = card.querySelector('.price').innerText.replace('$', '');
    let dummyProduct = { 
        name: productName, 
        price: parseFloat(priceText), 
        category: card.querySelector('.category').innerText 
    };
    setupCartButtonListener(card, dummyProduct);
}

function updateCartUI() {
    let itemContainer = document.getElementById('cartItems');
    let cartCount = document.getElementById('cartCount');
    let cartTotalContainer = document.getElementById('cartTotal');

    itemContainer.innerHTML = "";
    cartCount.innerHTML = "0";

    let totalItem = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        let newDiv = document.createElement('div');
        newDiv.className = 'cart-item';
        totalItem += item.qty;
        totalPrice += (item.price * item.qty);

        newDiv.innerHTML = `
            <div class="cart-item-info">
                <p>${item.name}</p>
                <div class="cart-item-details">
                    <span class="qty">${item.qty}x</span> 
                    <span class="single-price">@ $${item.price.toFixed(2)}</span> 
                    <span class="total-item-price">$${(item.price * item.qty).toFixed(2)}</span>
                </div>
            </div>
            <button class="remove-btn" data-name="${item.name}" aria-label="Remove ${item.name} from cart">×</button>`;

        itemContainer.appendChild(newDiv);
    });

    // Add click listeners to newly created remove cross buttons
    itemContainer.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', () => {
            let productName = button.getAttribute('data-name');
            cart = cart.filter(item => item.name !== productName);
            updateCartUI();
            updateAllCardButtons();
        });
    });

    cartCount.innerHTML = totalItem;

    if (cart.length > 0) {
        cartTotalContainer.innerHTML = `
            <div class="total-row">
                <span>Order Total</span>
                <span class="total-price-text">$${totalPrice.toFixed(2)}</span>
            </div>
            <div class="delivery-note">
                <span>🌳</span> This is a <strong>carbon-neutral</strong> delivery
            </div>
            <button id="confirmOrderBtn">Confirm Order</button>`;

        document.getElementById('confirmOrderBtn').addEventListener('click', () => {
            let modal = document.getElementById('orderModal');
            let modalItemsContainer = document.getElementById('modalItems');

            // Native showModal application access handling built-in focus management
            modal.showModal();
            modal.style.display = 'flex'; 
            modalItemsContainer.innerHTML = ""; 
            
            cart.forEach(item => {
                let mDiv = document.createElement('div');
                mDiv.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:16px 0; border-bottom:1px solid #F4EDEB;";
                mDiv.innerHTML = `
                    <div>
                        <p style="font-weight:600; margin:0; font-size:14px; color:#26201E;">${item.name}</p>
                        <span style="color:#C73B0F; font-weight:600; font-size:14px; margin-right:12px;">${item.qty}x</span> 
                        <span style="color:#87635A; font-size:14px;">@ $${item.price.toFixed(2)}</span>
                    </div>
                    <span style="font-weight:600; color:#26201E; font-size:16px;">$${(item.price * item.qty).toFixed(2)}</span>`;
                modalItemsContainer.appendChild(mDiv);
            });
            
            let totalRow = document.createElement('div');
            totalRow.style.cssText = "display:flex; justify-content:space-between; align-items:center; margin-top:24px; color:#26201E;";
            totalRow.innerHTML = `
                <span style="font-size:14px;">Order Total</span>
                <span style="font-size:24px; font-weight:700;">$${totalPrice.toFixed(2)}</span>`;
            modalItemsContainer.appendChild(totalRow);
        });
    } else {
        itemContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 0; color: #87635A;">
                <p>Your added items will appear here</p>
            </div>`;
        cartTotalContainer.innerHTML = "";
    }
}

document.getElementById('startNewOrderBtn').addEventListener('click', () => {
    cart = [];
    updateCartUI();
    updateAllCardButtons();
    
    let modal = document.getElementById('orderModal');
    modal.style.display = 'none';
    modal.close();
    
    const trackingTrigger = document.getElementById('confirmOrderBtn') || document.getElementById('productGrid');
    if (trackingTrigger) trackingTrigger.focus();
});
