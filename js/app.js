/**
 * VIVERO LUXURY LIVING - Global Application Controller
 * Handles Navigation, Header User Menus, Global Search, Newsletter, and Global UI
 */

const App = {
    init() {
        this.renderHeaderUserMenu();
        this.setupMobileMenu();
        this.setupGlobalSearch();
        this.setupNewsletter();
        this.setupBackToTop();
        this.setupActiveNavLink();
    },

    // Render header user button / profile dropdown
    renderHeaderUserMenu() {
        const userContainer = document.getElementById('nav-user-container');
        if (!userContainer) return;

        const currentUser = Auth.getCurrentUser();

        if (currentUser) {
            const isAdmin = currentUser.role === 'admin';
            userContainer.innerHTML = `
                <div class="user-dropdown-wrapper position-relative">
                    <button class="nav-icon-btn user-btn d-flex align-items-center gap-2" id="user-menu-toggle" aria-expanded="false" title="Account Menu">
                        <div class="user-avatar-circle">
                            ${currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <span class="user-display-name d-none d-md-inline">${currentUser.name.split(' ')[0]}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="user-dropdown-menu" id="user-dropdown-menu">
                        <div class="user-dropdown-header">
                            <div class="fw-semibold text-truncate">${currentUser.name}</div>
                            <small class="text-muted text-truncate d-block">${currentUser.email}</small>
                            <span class="badge ${isAdmin ? 'bg-dark' : 'bg-sand text-dark'} mt-1">${currentUser.role.toUpperCase()}</span>
                        </div>
                        <hr class="my-1">
                        ${isAdmin ? `
                            <a href="admin.html" class="user-dropdown-item d-flex align-items-center gap-2 text-accent fw-medium">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                                Admin Dashboard
                            </a>
                        ` : ''}
                        <a href="orders.html" class="user-dropdown-item d-flex align-items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                            My Orders
                        </a>
                        <a href="wishlist.html" class="user-dropdown-item d-flex align-items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                            My Wishlist
                        </a>
                        <hr class="my-1">
                        <button class="user-dropdown-item text-danger d-flex align-items-center gap-2 w-100 border-0 bg-transparent" id="btn-global-logout">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                            Sign Out
                        </button>
                    </div>
                </div>
            `;

            // Toggle dropdown
            const toggleBtn = document.getElementById('user-menu-toggle');
            const menu = document.getElementById('user-dropdown-menu');
            if (toggleBtn && menu) {
                toggleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    menu.classList.toggle('show');
                });
                document.addEventListener('click', () => {
                    menu.classList.remove('show');
                });
            }

            // Logout
            const logoutBtn = document.getElementById('btn-global-logout');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    Auth.logout();
                });
            }
        } else {
            userContainer.innerHTML = `
                <a href="login.html" class="btn btn-luxury-outline btn-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span>Sign In</span>
                </a>
            `;
        }
    },

    // Mobile Navigation Drawer Toggle
    setupMobileMenu() {
        const toggle = document.getElementById('mobile-menu-toggle');
        const drawer = document.getElementById('mobile-menu-drawer');
        const overlay = document.getElementById('mobile-menu-overlay');
        const closeBtn = document.getElementById('mobile-menu-close');

        if (!toggle || !drawer) return;

        const openDrawer = () => {
            drawer.classList.add('open');
            if (overlay) overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        };

        const closeDrawer = () => {
            drawer.classList.remove('open');
            if (overlay) overlay.classList.remove('open');
            document.body.style.overflow = '';
        };

        toggle.addEventListener('click', openDrawer);
        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
        if (overlay) overlay.addEventListener('click', closeDrawer);
    },

    // Global Search Modal with Live Filtering
    setupGlobalSearch() {
        const searchOpenButtons = document.querySelectorAll('.btn-open-search');
        const searchModal = document.getElementById('global-search-modal');
        const searchClose = document.getElementById('search-modal-close');
        const searchInput = document.getElementById('global-search-input');
        const searchResults = document.getElementById('search-modal-results');

        if (!searchModal) return;

        const openSearch = () => {
            searchModal.classList.add('show');
            searchModal.style.display = 'block';
            if (searchInput) {
                searchInput.value = '';
                setTimeout(() => searchInput.focus(), 150);
            }
            this.renderSearchResults('');
        };

        const closeSearch = () => {
            searchModal.classList.remove('show');
            searchModal.style.display = 'none';
        };

        searchOpenButtons.forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            openSearch();
        }));

        if (searchClose) searchClose.addEventListener('click', closeSearch);

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchModal.classList.contains('show')) {
                closeSearch();
            }
            // Shortcut '/' to open search
            if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                e.preventDefault();
                openSearch();
            }
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.renderSearchResults(e.target.value.trim());
            });
        }
    },

    renderSearchResults(query) {
        const resultsContainer = document.getElementById('search-modal-results');
        if (!resultsContainer) return;

        const products = ProductDB.getAll();

        if (!query) {
            // Show trending categories & curated recommendations
            resultsContainer.innerHTML = `
                <div class="search-empty-state">
                    <p class="text-muted small fw-semibold text-uppercase tracking-wider mb-3">Popular Searches</p>
                    <div class="d-flex flex-wrap gap-2 mb-4">
                        <a href="shop.html?category=Sofas" class="badge-chip">Sofas</a>
                        <a href="shop.html?category=Beds" class="badge-chip">Solid Oak Beds</a>
                        <a href="shop.html?category=Dining+Tables" class="badge-chip">Carrara Marble</a>
                        <a href="shop.html?category=Chairs" class="badge-chip">Lounge Chairs</a>
                        <a href="shop.html?category=Home+Decor" class="badge-chip">Ceramic Lamps</a>
                    </div>
                </div>
            `;
            return;
        }

        const filtered = products.filter(p => {
            return p.name.toLowerCase().includes(query.toLowerCase()) ||
                   p.category.toLowerCase().includes(query.toLowerCase()) ||
                   p.description.toLowerCase().includes(query.toLowerCase()) ||
                   p.material.toLowerCase().includes(query.toLowerCase());
        });

        if (filtered.length === 0) {
            resultsContainer.innerHTML = `
                <div class="text-center py-5">
                    <p class="fs-5 mb-1">No bespoke pieces matching "<strong>${query}</strong>"</p>
                    <small class="text-muted">Try searching by category such as "Sofas", "Chairs", or "Marble".</small>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = `
            <p class="text-muted small mb-3">Found ${filtered.length} matching piece${filtered.length > 1 ? 's' : ''}:</p>
            <div class="search-results-grid">
                ${filtered.map(p => `
                    <a href="product.html?id=${p.id}" class="search-result-card d-flex align-items-center gap-3 p-2 rounded text-decoration-none text-dark">
                        <img src="${p.images[0]}" alt="${p.name}" class="search-thumb rounded" style="width: 58px; height: 58px; object-fit: cover;">
                        <div class="flex-grow-1">
                            <div class="fw-semibold mb-0">${p.name}</div>
                            <small class="text-muted">${p.category}</small>
                        </div>
                        <div class="fw-bold text-accent font-serif">
                            ${ProductDB.formatINR(p.price)}
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    },

    // Newsletter Subscription Form
    setupNewsletter() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('newsletter-email');
            const email = input ? input.value.trim() : '';

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                Cart.showToast('Please enter a valid email address to join the private salon.', 'error');
                return;
            }

            Cart.showToast('Welcome to the VIVERO Inner Circle. Your 10% welcome privilege code is LUXURY10.', 'success');
            if (input) input.value = '';
        });
    },

    // Back to top button
    setupBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    // Highlight current nav item based on pathname
    setupActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.nav-link-item');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    },

    // Render Star Rating SVG Helper
    renderStars(rating) {
        let starsHtml = '';
        const rounded = Math.round(rating * 2) / 2;
        for (let i = 1; i <= 5; i++) {
            if (i <= rounded) {
                starsHtml += '<span class="star-filled">★</span>';
            } else if (i - 0.5 === rounded) {
                starsHtml += '<span class="star-half">★</span>';
            } else {
                starsHtml += '<span class="star-empty">☆</span>';
            }
        }
        return `<span class="rating-stars" title="${rating} out of 5 stars">${starsHtml}</span>`;
    },

    // Helper to generate Luxury Product Card HTML
    createProductCard(p) {
        const inWishlist = Wishlist.has(p.id);
        return `
            <div class="product-card" data-product-id="${p.id}">
                <div class="product-card-image-box position-relative">
                    <a href="product.html?id=${p.id}" class="d-block product-card-image-link">
                        <img src="${p.images[0]}" alt="${p.name}" class="product-card-img" loading="lazy" onerror="this.src='assets/images/placeholder.svg'">
                        ${p.images[1] ? `<img src="${p.images[1]}" alt="${p.name}" class="product-card-img-hover" loading="lazy" onerror="this.src='assets/images/placeholder.svg'">` : ''}
                    </a>
                    
                    <div class="product-card-badges">
                        ${p.discount > 0 ? `<span class="badge-discount">-${p.discount}%</span>` : ''}
                        ${p.isNew ? `<span class="badge-new">New</span>` : ''}
                        ${p.bestseller ? `<span class="badge-bestseller">Bestseller</span>` : ''}
                    </div>

                    <button class="product-wishlist-btn ${inWishlist ? 'active' : ''}" onclick="App.handleWishlistToggle('${p.id}', this)" title="${inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="${inWishlist ? '#C2847A' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    </button>

                    <div class="product-card-quick-actions">
                        <button class="btn btn-quick-cart" onclick="Cart.addItem('${p.id}', 1)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                            Add to Cart
                        </button>
                        <a href="product.html?id=${p.id}" class="btn btn-quick-view" title="View Details">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </a>
                    </div>
                </div>

                <div class="product-card-info">
                    <div class="product-card-category">${p.category}</div>
                    <h3 class="product-card-title">
                        <a href="product.html?id=${p.id}">${p.name}</a>
                    </h3>
                    <div class="product-card-rating">
                        ${this.renderStars(p.rating)}
                        <span class="rating-count">(${p.reviewCount})</span>
                    </div>
                    <div class="product-card-pricing">
                        <span class="product-price">${ProductDB.formatINR(p.price)}</span>
                        ${p.originalPrice > p.price ? `<span class="product-orig-price">${ProductDB.formatINR(p.originalPrice)}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    },

    handleWishlistToggle(productId, btnElement) {
        const added = Wishlist.toggle(productId);
        if (btnElement) {
            btnElement.classList.toggle('active', added);
            const svg = btnElement.querySelector('svg');
            if (svg) {
                svg.setAttribute('fill', added ? '#C2847A' : 'none');
            }
        }
    }
};

window.App = App;

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

