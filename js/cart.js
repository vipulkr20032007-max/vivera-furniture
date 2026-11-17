/**
 * VIVERO LUXURY LIVING - Shopping Cart & Wishlist State Engine
 * Pure Vanilla JavaScript with LocalStorage Persistence
 */

const Cart = {
    // Get all cart items
    getItems() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
        } catch (e) {
            return [];
        }
    },

    // Save cart
    saveItems(items) {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
        this.updateBadges();
    },

    // Add item to cart
    addItem(productId, quantity = 1, color = null) {
        const product = ProductDB.getById(productId);
        if (!product) return { success: false, message: 'Product not found.' };

        if (product.stock <= 0) {
            return { success: false, message: 'Sorry, this bespoke piece is currently out of stock.' };
        }

        const items = this.getItems();
        const selectedColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : 'Natural');

        // Check if same product with same color already exists in cart
        const existingIndex = items.findIndex(item => item.productId === productId && item.color === selectedColor);

        if (existingIndex > -1) {
            const newQty = items[existingIndex].quantity + quantity;
            if (newQty > product.stock) {
                items[existingIndex].quantity = product.stock;
                this.saveItems(items);
                return { success: true, message: `Maximum available stock (${product.stock}) added to cart.`, capped: true };
            } else {
                items[existingIndex].quantity = newQty;
            }
        } else {
            items.push({
                productId: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.images[0],
                color: selectedColor,
                quantity: Math.min(quantity, product.stock)
            });
        }

        this.saveItems(items);
        this.showToast(`"${product.name}" added to your shopping cart!`, 'success');
        return { success: true, message: 'Added to cart successfully.' };
    },

    // Update quantity
    updateQuantity(productId, color, newQuantity) {
        const items = this.getItems();
        const product = ProductDB.getById(productId);
        const index = items.findIndex(item => item.productId === productId && item.color === color);

        if (index === -1) return;

        if (newQuantity <= 0) {
            this.removeItem(productId, color);
            return;
        }

        const maxStock = product ? product.stock : 99;
        items[index].quantity = Math.min(newQuantity, maxStock);
        this.saveItems(items);
    },

    // Remove item
    removeItem(productId, color) {
        let items = this.getItems();
        const removed = items.find(item => item.productId === productId && item.color === color);
        items = items.filter(item => !(item.productId === productId && item.color === color));
        this.saveItems(items);
        if (removed) {
            this.showToast(`"${removed.name}" removed from cart.`, 'info');
        }
    },

    // Clear cart
    clear() {
        localStorage.removeItem(STORAGE_KEYS.CART);
        localStorage.removeItem('vivero_applied_coupon');
        this.updateBadges();
    },

    // Calculate totals
    getTotals() {
        const items = this.getItems();
        let subtotal = 0;
        let originalSubtotal = 0;
        let totalItems = 0;

        items.forEach(item => {
            subtotal += item.price * item.quantity;
            originalSubtotal += (item.originalPrice || item.price) * item.quantity;
            totalItems += item.quantity;
        });

        // Free delivery on orders above ₹10,000, else flat ₹999 for luxury freight
        const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 999;

        // Check applied coupon
        let couponDiscount = 0;
        const coupon = this.getAppliedCoupon();
        if (coupon && subtotal > 0) {
            if (coupon.type === 'percentage') {
                couponDiscount = Math.round((subtotal * coupon.value) / 100);
            } else if (coupon.type === 'flat') {
                couponDiscount = Math.min(coupon.value, subtotal);
            }
        }

        const catalogDiscount = Math.max(0, originalSubtotal - subtotal);
        const totalDiscount = catalogDiscount + couponDiscount;
        const finalTotal = Math.max(0, subtotal - couponDiscount + shipping);

        return {
            itemsCount: totalItems,
            uniqueCount: items.length,
            subtotal,
            originalSubtotal,
            shipping,
            couponDiscount,
            catalogDiscount,
            totalDiscount,
            total: finalTotal,
            coupon
        };
    },

    // Apply promo coupon
    applyCoupon(code) {
        const cleanCode = (code || '').trim().toUpperCase();
        const validCoupons = {
            'LUXURY10': { code: 'LUXURY10', type: 'percentage', value: 10, description: '10% Off Entire Luxury Order' },
            'VIVERO20': { code: 'VIVERO20', type: 'percentage', value: 20, description: '20% Off Festive Privilege' },
            'ROYAL5000': { code: 'ROYAL5000', type: 'flat', value: 5000, description: '₹5,000 Flat Archival Discount' }
        };

        if (validCoupons[cleanCode]) {
            localStorage.setItem('vivero_applied_coupon', JSON.stringify(validCoupons[cleanCode]));
            this.showToast(`Promo code "${cleanCode}" applied successfully!`, 'success');
            return { success: true, coupon: validCoupons[cleanCode] };
        } else {
            return { success: false, message: 'Invalid or expired promo code. Try "LUXURY10" or "VIVERO20".' };
        }
    },

    getAppliedCoupon() {
        try {
            return JSON.parse(localStorage.getItem('vivero_applied_coupon')) || null;
        } catch (e) {
            return null;
        }
    },

    removeCoupon() {
        localStorage.removeItem('vivero_applied_coupon');
        this.showToast('Coupon removed.', 'info');
    },

    // Update cart and wishlist count badges in navbar
    updateBadges() {
        const cartBadge = document.querySelectorAll('.cart-count-badge');
        const wishlistBadge = document.querySelectorAll('.wishlist-count-badge');

        const cartTotals = this.getTotals();
        const wishlist = Wishlist.getItems();

        cartBadge.forEach(badge => {
            badge.textContent = cartTotals.itemsCount;
            badge.style.display = cartTotals.itemsCount > 0 ? 'inline-flex' : 'none';
        });

        wishlistBadge.forEach(badge => {
            badge.textContent = wishlist.length;
            badge.style.display = wishlist.length > 0 ? 'inline-flex' : 'none';
        });
    },

    // Global Toast Notification Helper
    showToast(message, type = 'info') {
        let container = document.getElementById('vivero-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'vivero-toast-container';
            container.className = 'vivero-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `vivero-toast toast-${type}`;
        
        let iconSvg = '';
        if (type === 'success') {
            iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
        } else if (type === 'error') {
            iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
        } else {
            iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
        }

        toast.innerHTML = `
            <div class="toast-icon">${iconSvg}</div>
            <div class="toast-body">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;

        container.appendChild(toast);

        // Auto remove after 3.8s
        setTimeout(() => {
            toast.classList.add('toast-fade-out');
            setTimeout(() => toast.remove(), 400);
        }, 3800);
    }
};

// Wishlist Engine
const Wishlist = {
    getItems() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST)) || [];
        } catch (e) {
            return [];
        }
    },

    saveItems(items) {
        localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(items));
        Cart.updateBadges();
    },

    toggle(productId) {
        const items = this.getItems();
        const index = items.indexOf(productId);
        const product = ProductDB.getById(productId);

        if (index > -1) {
            items.splice(index, 1);
            this.saveItems(items);
            Cart.showToast(product ? `"${product.name}" removed from wishlist.` : 'Item removed from wishlist.', 'info');
            return false; // Removed
        } else {
            items.push(productId);
            this.saveItems(items);
            Cart.showToast(product ? `"${product.name}" saved to your wishlist!` : 'Saved to wishlist!', 'success');
            return true; // Added
        }
    },

    has(productId) {
        return this.getItems().includes(productId);
    },

    moveToCart(productId) {
        const product = ProductDB.getById(productId);
        if (!product) return;

        Cart.addItem(productId, 1);
        let items = this.getItems();
        items = items.filter(id => id !== productId);
        this.saveItems(items);
    },

    remove(productId) {
        let items = this.getItems();
        items = items.filter(id => id !== productId);
        this.saveItems(items);
        Cart.showToast('Item removed from wishlist.', 'info');
    }
};

window.Cart = Cart;
window.Wishlist = Wishlist;

// Initialize badges when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    Cart.updateBadges();
});

