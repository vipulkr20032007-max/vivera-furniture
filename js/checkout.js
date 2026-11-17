/**
 * VIVERO LUXURY LIVING - Checkout & Order Processing
 * Pure Vanilla JavaScript Client-Side Workflow (Demonstration Mode)
 */

const Checkout = {
    // Initialize checkout page
    init() {
        const cartItems = Cart.getItems();
        if (cartItems.length === 0) {
            // Redirect to cart if empty
            const checkoutContainer = document.getElementById('checkout-page-container');
            if (checkoutContainer) {
                checkoutContainer.innerHTML = `
                    <div class="empty-state-box text-center py-5">
                        <div class="empty-icon-circle mb-3">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        </div>
                        <h2 class="serif-title mb-2">Your Cart is Currently Empty</h2>
                        <p class="text-muted mb-4">Please add pieces to your shopping cart before proceeding to checkout.</p>
                        <a href="shop.html" class="btn btn-luxury-primary">Explore Furniture Catalog</a>
                    </div>
                `;
            }
            return;
        }

        this.prefillCustomerDetails();
        this.renderOrderSummary();
        this.setupPaymentTabs();
        this.setupFormValidation();
    },

    // Prefill form if customer is logged in
    prefillCustomerDetails() {
        const user = Auth.getCurrentUser();
        if (user) {
            const nameEl = document.getElementById('checkout-name');
            const emailEl = document.getElementById('checkout-email');
            const phoneEl = document.getElementById('checkout-phone');
            const addressEl = document.getElementById('checkout-address');
            const cityEl = document.getElementById('checkout-city');
            const stateEl = document.getElementById('checkout-state');
            const pinEl = document.getElementById('checkout-pin');

            if (nameEl && !nameEl.value) nameEl.value = user.name || '';
            if (emailEl && !emailEl.value) emailEl.value = user.email || '';
            if (phoneEl && !phoneEl.value) phoneEl.value = user.phone || '';
            if (addressEl && !addressEl.value && user.address) addressEl.value = user.address;
            if (cityEl && !cityEl.value && user.city) cityEl.value = user.city;
            if (stateEl && !stateEl.value && user.state) stateEl.value = user.state;
            if (pinEl && !pinEl.value && user.pincode) pinEl.value = user.pincode;
        }
    },

    // Render Order Summary in sidebar
    renderOrderSummary() {
        const summaryContainer = document.getElementById('checkout-order-items');
        const priceBreakdown = document.getElementById('checkout-price-breakdown');
        if (!summaryContainer) return;

        const cartItems = Cart.getItems();
        const totals = Cart.getTotals();

        summaryContainer.innerHTML = cartItems.map(item => `
            <div class="checkout-summary-item d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center gap-3">
                    <div class="checkout-item-thumb-wrapper position-relative">
                        <img src="${item.image}" alt="${item.name}" class="checkout-item-thumb" onerror="this.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80'">
                        <span class="checkout-item-qty-badge">${item.quantity}</span>
                    </div>
                    <div>
                        <h4 class="checkout-item-name fs-6 mb-1">${item.name}</h4>
                        <span class="text-muted small">${item.color || 'Standard Finish'}</span>
                    </div>
                </div>
                <div class="checkout-item-price fw-semibold">
                    ${ProductDB.formatINR(item.price * item.quantity)}
                </div>
            </div>
        `).join('');

        if (priceBreakdown) {
            priceBreakdown.innerHTML = `
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Subtotal (${totals.itemsCount} items)</span>
                    <span class="fw-medium">${ProductDB.formatINR(totals.subtotal)}</span>
                </div>
                ${totals.totalDiscount > 0 ? `
                <div class="d-flex justify-content-between mb-2 text-success">
                    <span>Privilege Discount</span>
                    <span>- ${ProductDB.formatINR(totals.totalDiscount)}</span>
                </div>
                ` : ''}
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">White-Glove Delivery</span>
                    <span>${totals.shipping === 0 ? '<strong class="text-success">Complimentary</strong>' : ProductDB.formatINR(totals.shipping)}</span>
                </div>
                <hr class="my-3 border-light-subtle">
                <div class="d-flex justify-content-between align-items-center">
                    <span class="fs-5 fw-bold font-serif">Total Payable</span>
                    <span class="fs-4 fw-bold text-accent font-serif">${ProductDB.formatINR(totals.total)}</span>
                </div>
                <p class="text-muted extra-small mt-2">Includes all luxury freight handling, insurance & GST.</p>
            `;
        }
    },

    // Handle switching between COD, UPI, Card
    setupPaymentTabs() {
        const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
        const paymentSections = {
            'cod': document.getElementById('payment-section-cod'),
            'upi': document.getElementById('payment-section-upi'),
            'card': document.getElementById('payment-section-card')
        };

        paymentRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const method = e.target.value;
                Object.keys(paymentSections).forEach(key => {
                    if (paymentSections[key]) {
                        paymentSections[key].style.display = key === method ? 'block' : 'none';
                    }
                });
            });
        });

        // UPI Mock Verify Button
        const upiVerifyBtn = document.getElementById('btn-verify-upi');
        if (upiVerifyBtn) {
            upiVerifyBtn.addEventListener('click', () => {
                const upiInput = document.getElementById('checkout-upi-id');
                const feedback = document.getElementById('upi-verify-feedback');
                if (upiInput && upiInput.value.includes('@')) {
                    feedback.innerHTML = '<span class="text-success small fw-medium">✓ VPA Verified for ' + upiInput.value + '</span>';
                } else {
                    feedback.innerHTML = '<span class="text-danger small">Please enter a valid UPI ID (e.g. yourname@okhdfcbank)</span>';
                }
            });
        }
    },

    // Handle order submission and validation
    setupFormValidation() {
        const form = document.getElementById('checkout-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleOrderSubmission();
        });
    },

    handleOrderSubmission() {
        const name = document.getElementById('checkout-name')?.value.trim();
        const email = document.getElementById('checkout-email')?.value.trim();
        const phone = document.getElementById('checkout-phone')?.value.trim();
        const address = document.getElementById('checkout-address')?.value.trim();
        const city = document.getElementById('checkout-city')?.value.trim();
        const state = document.getElementById('checkout-state')?.value.trim();
        const pin = document.getElementById('checkout-pin')?.value.trim();

        const paymentMethodEl = document.querySelector('input[name="paymentMethod"]:checked');
        const paymentMethod = paymentMethodEl ? paymentMethodEl.value : 'cod';

        // Validations
        if (!name || name.length < 3) {
            Cart.showToast('Please enter your full name.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            Cart.showToast('Please enter a valid email address for delivery updates.', 'error');
            return;
        }

        const phoneDigits = phone ? phone.replace(/\D/g, '') : '';
        if (phoneDigits.length < 10) {
            Cart.showToast('Please enter a valid 10-digit mobile number.', 'error');
            return;
        }

        if (!address || address.length < 5) {
            Cart.showToast('Please enter your complete street address.', 'error');
            return;
        }

        if (!city) {
            Cart.showToast('Please enter your city.', 'error');
            return;
        }

        if (!state) {
            Cart.showToast('Please select your state.', 'error');
            return;
        }

        if (!pin || pin.length < 6) {
            Cart.showToast('Please enter a valid 6-digit postal PIN code.', 'error');
            return;
        }

        // Validate payment fields if card selected
        if (paymentMethod === 'card') {
            const cardNum = document.getElementById('card-number')?.value.replace(/\s/g, '');
            const cardExpiry = document.getElementById('card-expiry')?.value.trim();
            const cardCvv = document.getElementById('card-cvv')?.value.trim();

            if (!cardNum || cardNum.length < 15) {
                Cart.showToast('Please enter a valid 16-digit card number.', 'error');
                return;
            }
            if (!cardExpiry || !cardExpiry.includes('/')) {
                Cart.showToast('Please enter card expiry in MM/YY format.', 'error');
                return;
            }
            if (!cardCvv || cardCvv.length < 3) {
                Cart.showToast('Please enter valid 3-digit CVV.', 'error');
                return;
            }
        }

        const cartItems = Cart.getItems();
        const totals = Cart.getTotals();

        // Format Payment label
        let paymentLabel = 'Cash on Delivery';
        if (paymentMethod === 'upi') paymentLabel = 'UPI (Demonstration)';
        if (paymentMethod === 'card') paymentLabel = 'Credit/Debit Card (Demonstration)';

        // Generate Unique Order ID
        const orderId = 'ORD-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);

        const newOrder = {
            id: orderId,
            date: new Date().toISOString(),
            customer: {
                name,
                email,
                phone,
                address,
                city,
                state,
                pincode: pin
            },
            items: cartItems.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                color: item.color,
                image: item.image
            })),
            subtotal: totals.subtotal,
            discount: totals.totalDiscount,
            shipping: totals.shipping,
            total: totals.total,
            paymentMethod: paymentLabel,
            status: 'Processing',
            notes: 'Demo order generated successfully.'
        };

        // Deduct inventory stock
        cartItems.forEach(item => {
            const prod = ProductDB.getById(item.productId);
            if (prod) {
                ProductDB.update(prod.id, {
                    stock: Math.max(0, prod.stock - item.quantity)
                });
            }
        });

        // Save order to LocalStorage
        try {
            const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
            orders.unshift(newOrder);
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
        } catch (e) {
            console.error('Error saving order:', e);
        }

        // Empty Cart
        Cart.clear();

        // Display Success Modal or Redirect
        this.showOrderConfirmation(newOrder);
    },

    showOrderConfirmation(order) {
        const modalEl = document.getElementById('order-confirmation-modal');
        if (modalEl) {
            document.getElementById('conf-order-id').textContent = order.id;
            document.getElementById('conf-customer-name').textContent = order.customer.name;
            document.getElementById('conf-order-total').textContent = ProductDB.formatINR(order.total);
            document.getElementById('conf-payment-method').textContent = order.paymentMethod;
            document.getElementById('conf-address').textContent = `${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`;

            modalEl.classList.add('show');
            modalEl.style.display = 'block';
            document.body.classList.add('modal-open');
        } else {
            // Redirect to orders page with new order highlighted
            window.location.href = `orders.html?newOrder=${order.id}`;
        }
    }
};

window.Checkout = Checkout;

