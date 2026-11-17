/**
 * VIVERO LUXURY LIVING - Administrator Management Suite
 * Pure Vanilla JavaScript Admin Dashboard with Complete CRUD & Order Handling
 */

const Admin = {
    currentTab: 'overview',
    editingProductId: null,

    // Initialize Admin Page
    init() {
        // Enforce Admin Access Guard
        if (!Auth.requireAdmin()) return;

        this.setupNavigation();
        this.renderAdminHeader();
        this.renderOverview();
        this.setupProductFormModal();
    },

    // Render Admin Header
    renderAdminHeader() {
        const adminNameEl = document.getElementById('admin-logged-name');
        const user = Auth.getCurrentUser();
        if (adminNameEl && user) {
            adminNameEl.textContent = user.name;
        }
    },

    // Handle tab switching
    setupNavigation() {
        const navLinks = document.querySelectorAll('.admin-nav-item');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = link.getAttribute('data-tab');
                if (tab === 'logout') {
                    if (confirm('Are you sure you want to log out of the VIVERO Administration Suite?')) {
                        Auth.logout();
                    }
                    return;
                }
                this.switchTab(tab);
            });
        });

        // Search inputs
        const prodSearch = document.getElementById('admin-product-search');
        if (prodSearch) {
            prodSearch.addEventListener('input', (e) => this.renderProductsTable(e.target.value));
        }

        const orderSearch = document.getElementById('admin-order-search');
        if (orderSearch) {
            orderSearch.addEventListener('input', (e) => this.renderOrdersTable(e.target.value));
        }

        const customerSearch = document.getElementById('admin-customer-search');
        if (customerSearch) {
            customerSearch.addEventListener('input', (e) => this.renderCustomersTable(e.target.value));
        }
    },

    switchTab(tabName) {
        this.currentTab = tabName;
        document.querySelectorAll('.admin-nav-item').forEach(el => {
            el.classList.toggle('active', el.getAttribute('data-tab') === tabName);
        });

        document.querySelectorAll('.admin-tab-pane').forEach(pane => {
            pane.style.display = pane.id === `tab-${tabName}` ? 'block' : 'none';
        });

        if (tabName === 'overview') this.renderOverview();
        if (tabName === 'products') this.renderProductsTable();
        if (tabName === 'orders') this.renderOrdersTable();
        if (tabName === 'customers') this.renderCustomersTable();
        if (tabName === 'reviews') this.renderReviewsTable();
        if (tabName === 'categories') this.renderCategoriesTable();
    },

    // 1. OVERVIEW TAB
    renderOverview() {
        const products = ProductDB.getAll();
        const orders = this.getOrders();
        const users = Auth.getAllUsers();

        // Calculate Revenue from non-cancelled orders
        const validOrders = orders.filter(o => o.status !== 'Cancelled');
        const totalRevenue = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);

        document.getElementById('stat-total-revenue').textContent = ProductDB.formatINR(totalRevenue);
        document.getElementById('stat-total-orders').textContent = orders.length;
        document.getElementById('stat-total-products').textContent = products.length;
        document.getElementById('stat-total-customers').textContent = users.filter(u => u.role !== 'admin').length;

        // Recent Orders Table
        const recentOrdersContainer = document.getElementById('admin-recent-orders-body');
        if (recentOrdersContainer) {
            const recent = orders.slice(0, 5);
            if (recent.length === 0) {
                recentOrdersContainer.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No orders found.</td></tr>';
            } else {
                recentOrdersContainer.innerHTML = recent.map(o => `
                    <tr>
                        <td><strong class="font-monospace">${o.id}</strong></td>
                        <td>${o.customer.name}</td>
                        <td>${new Date(o.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td>${ProductDB.formatINR(o.total)}</td>
                        <td><span class="status-badge status-${o.status.toLowerCase()}">${o.status}</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-secondary" onclick="Admin.viewOrderDetails('${o.id}')">View</button>
                        </td>
                    </tr>
                `).join('');
            }
        }

        // Top Selling Products Widget
        const bestSellersContainer = document.getElementById('admin-best-sellers-list');
        if (bestSellersContainer) {
            const best = products.filter(p => p.bestseller || p.rating >= 4.8).slice(0, 4);
            bestSellersContainer.innerHTML = best.map(p => `
                <div class="d-flex align-items-center justify-content-between py-2 border-bottom">
                    <div class="d-flex align-items-center gap-3">
                        <img src="${p.images[0]}" alt="${p.name}" class="rounded" style="width: 44px; height: 44px; object-fit: cover;">
                        <div>
                            <div class="fw-semibold text-truncate" style="max-width: 220px;">${p.name}</div>
                            <small class="text-muted">${p.category} &bull; ${ProductDB.formatINR(p.price)}</small>
                        </div>
                    </div>
                    <span class="badge bg-sand text-dark">${p.stock} in stock</span>
                </div>
            `).join('');
        }
    },

    // 2. PRODUCTS CRUD
    renderProductsTable(query = '') {
        const products = ProductDB.getAll();
        const tbody = document.getElementById('admin-products-table-body');
        if (!tbody) return;

        const filtered = products.filter(p => {
            const matchName = p.name.toLowerCase().includes(query.toLowerCase());
            const matchCat = p.category.toLowerCase().includes(query.toLowerCase());
            return matchName || matchCat;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">No matching products found.</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(p => `
            <tr>
                <td>
                    <img src="${p.images[0]}" alt="${p.name}" class="rounded shadow-sm" style="width: 52px; height: 52px; object-fit: cover;">
                </td>
                <td>
                    <div class="fw-bold">${p.name}</div>
                    <small class="text-muted font-monospace">${p.id}</small>
                </td>
                <td><span class="badge bg-light text-dark border">${p.category}</span></td>
                <td>
                    <div class="fw-semibold">${ProductDB.formatINR(p.price)}</div>
                    ${p.originalPrice > p.price ? `<small class="text-muted text-decoration-line-through">${ProductDB.formatINR(p.originalPrice)}</small>` : ''}
                </td>
                <td>
                    <span class="badge ${p.stock <= 5 ? 'bg-danger' : 'bg-success'}">${p.stock} units</span>
                </td>
                <td>★ ${p.rating} <small class="text-muted">(${p.reviewCount})</small></td>
                <td>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-outline-primary" onclick="Admin.openEditModal('${p.id}')" title="Edit Product">Edit</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="Admin.deleteProductConfirm('${p.id}')" title="Delete Product">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    setupProductFormModal() {
        const form = document.getElementById('product-modal-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSaveProduct();
        });
    },

    openAddModal() {
        this.editingProductId = null;
        document.getElementById('product-modal-title').textContent = 'Add New Furniture Masterpiece';
        document.getElementById('product-modal-form').reset();
        document.getElementById('modal-prod-preview').src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80';
        
        // Populate category dropdown
        this.populateCategoryOptions();

        const modal = document.getElementById('admin-product-modal');
        modal.classList.add('show');
        modal.style.display = 'block';
    },

    openEditModal(productId) {
        const p = ProductDB.getById(productId);
        if (!p) return;

        this.editingProductId = productId;
        document.getElementById('product-modal-title').textContent = `Edit Product: ${p.name}`;
        
        this.populateCategoryOptions(p.category);

        document.getElementById('modal-prod-name').value = p.name;
        document.getElementById('modal-prod-category').value = p.category;
        document.getElementById('modal-prod-price').value = p.price;
        document.getElementById('modal-prod-orig-price').value = p.originalPrice || p.price;
        document.getElementById('modal-prod-stock').value = p.stock;
        document.getElementById('modal-prod-image').value = p.images[0] || '';
        document.getElementById('modal-prod-preview').src = p.images[0] || '';
        document.getElementById('modal-prod-material').value = p.material || '';
        document.getElementById('modal-prod-dimensions').value = p.dimensions || '';
        document.getElementById('modal-prod-desc').value = p.description || '';

        const modal = document.getElementById('admin-product-modal');
        modal.classList.add('show');
        modal.style.display = 'block';
    },

    populateCategoryOptions(selectedCategory = '') {
        const select = document.getElementById('modal-prod-category');
        if (!select) return;
        const categories = ProductDB.getCategories();
        select.innerHTML = categories.map(c => `
            <option value="${c.name}" ${c.name === selectedCategory ? 'selected' : ''}>${c.name}</option>
        `).join('');
    },

    closeProductModal() {
        const modal = document.getElementById('admin-product-modal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
        }
    },

    handleSaveProduct() {
        const name = document.getElementById('modal-prod-name').value.trim();
        const category = document.getElementById('modal-prod-category').value;
        const price = parseFloat(document.getElementById('modal-prod-price').value);
        const originalPrice = parseFloat(document.getElementById('modal-prod-orig-price').value) || price;
        const stock = parseInt(document.getElementById('modal-prod-stock').value, 10);
        const imageUrl = document.getElementById('modal-prod-image').value.trim() || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80';
        const material = document.getElementById('modal-prod-material').value.trim();
        const dimensions = document.getElementById('modal-prod-dimensions').value.trim();
        const description = document.getElementById('modal-prod-desc').value.trim();

        if (!name || isNaN(price) || price <= 0 || isNaN(stock) || stock < 0) {
            alert('Please fill all required fields with valid values.');
            return;
        }

        const data = {
            name,
            category,
            price,
            originalPrice,
            stock,
            images: [imageUrl],
            material: material || 'Solid Hardwood & Premium Upholstery',
            dimensions: dimensions || 'Custom Bespoke Sizing',
            description: description || 'Meticulously crafted with timeless luxury aesthetics.'
        };

        if (this.editingProductId) {
            ProductDB.update(this.editingProductId, data);
            Cart.showToast(`Product "${name}" updated successfully.`, 'success');
        } else {
            ProductDB.create(data);
            Cart.showToast(`New product "${name}" added to catalog.`, 'success');
        }

        this.closeProductModal();
        this.renderProductsTable();
        this.renderOverview();
    },

    deleteProductConfirm(id) {
        const p = ProductDB.getById(id);
        if (!p) return;

        if (confirm(`Are you sure you want to permanently delete "${p.name}"? This action cannot be undone.`)) {
            ProductDB.delete(id);
            Cart.showToast(`Product "${p.name}" deleted.`, 'info');
            this.renderProductsTable();
            this.renderOverview();
        }
    },

    // 3. ORDERS MANAGEMENT
    getOrders() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
        } catch (e) {
            return [];
        }
    },

    saveOrders(orders) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    },

    renderOrdersTable(query = '') {
        const orders = this.getOrders();
        const tbody = document.getElementById('admin-orders-table-body');
        if (!tbody) return;

        const filtered = orders.filter(o => {
            const matchId = o.id.toLowerCase().includes(query.toLowerCase());
            const matchCust = o.customer.name.toLowerCase().includes(query.toLowerCase());
            const matchEmail = o.customer.email.toLowerCase().includes(query.toLowerCase());
            return matchId || matchCust || matchEmail;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">No orders found.</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(o => `
            <tr>
                <td><strong class="font-monospace">${o.id}</strong></td>
                <td>
                    <div class="fw-semibold">${o.customer.name}</div>
                    <small class="text-muted">${o.customer.email} &bull; ${o.customer.phone}</small>
                </td>
                <td>
                    ${o.items.length} items
                    <div class="small text-muted text-truncate" style="max-width: 160px;">${o.items.map(i => i.name).join(', ')}</div>
                </td>
                <td><strong>${ProductDB.formatINR(o.total)}</strong><br><small class="text-muted">${o.paymentMethod}</small></td>
                <td>
                    <select class="form-select form-select-sm status-select status-${o.status.toLowerCase()}" onchange="Admin.updateOrderStatus('${o.id}', this.value)">
                        <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                        <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>${new Date(o.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-outline-secondary" onclick="Admin.viewOrderDetails('${o.id}')">View</button>
                        ${o.status !== 'Cancelled' ? `
                            <button class="btn btn-sm btn-outline-danger" onclick="Admin.cancelOrder('${o.id}')">Cancel</button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `).join('');
    },

    updateOrderStatus(orderId, newStatus) {
        const orders = this.getOrders();
        const index = orders.findIndex(o => o.id === orderId);
        if (index > -1) {
            orders[index].status = newStatus;
            this.saveOrders(orders);
            Cart.showToast(`Order #${orderId} status changed to ${newStatus}.`, 'success');
            this.renderOrdersTable();
            this.renderOverview();
        }
    },

    cancelOrder(orderId) {
        if (confirm(`Are you sure you want to cancel Order #${orderId}?`)) {
            this.updateOrderStatus(orderId, 'Cancelled');
        }
    },

    viewOrderDetails(orderId) {
        const orders = this.getOrders();
        const o = orders.find(ord => ord.id === orderId);
        if (!o) return;

        const content = document.getElementById('order-detail-modal-body');
        if (!content) return;

        content.innerHTML = `
            <div class="mb-4 d-flex justify-content-between align-items-center">
                <div>
                    <h4 class="mb-0">Order <span class="font-monospace text-accent">${o.id}</span></h4>
                    <span class="text-muted small">Placed on ${new Date(o.date).toLocaleString('en-IN')}</span>
                </div>
                <span class="status-badge status-${o.status.toLowerCase()} fs-6">${o.status}</span>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-md-6">
                    <div class="p-3 bg-light rounded">
                        <h6 class="fw-bold mb-2">Customer Details</h6>
                        <p class="mb-1"><strong>Name:</strong> ${o.customer.name}</p>
                        <p class="mb-1"><strong>Email:</strong> ${o.customer.email}</p>
                        <p class="mb-0"><strong>Phone:</strong> ${o.customer.phone}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="p-3 bg-light rounded">
                        <h6 class="fw-bold mb-2">Delivery Destination</h6>
                        <p class="mb-1">${o.customer.address}</p>
                        <p class="mb-0">${o.customer.city}, ${o.customer.state} - ${o.customer.pincode}</p>
                    </div>
                </div>
            </div>

            <h6 class="fw-bold mb-3">Items Purchased</h6>
            <div class="border rounded overflow-hidden mb-4">
                <table class="table mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Item</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th class="text-end">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${o.items.map(item => `
                            <tr>
                                <td>
                                    <div class="d-flex align-items-center gap-2">
                                        <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; object-fit: cover;" class="rounded">
                                        <div>
                                            <div class="fw-medium">${item.name}</div>
                                            <small class="text-muted">${item.color || 'Standard'}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>${ProductDB.formatINR(item.price)}</td>
                                <td>${item.quantity}</td>
                                <td class="text-end fw-semibold">${ProductDB.formatINR(item.price * item.quantity)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="d-flex justify-content-end">
                <div style="width: 280px;">
                    <div class="d-flex justify-content-between mb-1">
                        <span class="text-muted">Subtotal:</span>
                        <span>${ProductDB.formatINR(o.subtotal)}</span>
                    </div>
                    <div class="d-flex justify-content-between mb-1">
                        <span class="text-muted">Discount:</span>
                        <span class="text-success">- ${ProductDB.formatINR(o.discount || 0)}</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Shipping:</span>
                        <span>${o.shipping === 0 ? 'Free' : ProductDB.formatINR(o.shipping)}</span>
                    </div>
                    <hr class="my-2">
                    <div class="d-flex justify-content-between">
                        <strong>Grand Total:</strong>
                        <strong class="fs-5 text-accent">${ProductDB.formatINR(o.total)}</strong>
                    </div>
                </div>
            </div>
        `;

        const modal = document.getElementById('admin-order-modal');
        modal.classList.add('show');
        modal.style.display = 'block';
    },

    closeOrderModal() {
        const modal = document.getElementById('admin-order-modal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
        }
    },

    // 4. CUSTOMERS TAB
    renderCustomersTable(query = '') {
        const users = Auth.getAllUsers();
        const orders = this.getOrders();
        const tbody = document.getElementById('admin-customers-table-body');
        if (!tbody) return;

        const filtered = users.filter(u => {
            const matchName = u.name.toLowerCase().includes(query.toLowerCase());
            const matchEmail = u.email.toLowerCase().includes(query.toLowerCase());
            return matchName || matchEmail;
        });

        tbody.innerHTML = filtered.map(u => {
            const userOrders = orders.filter(o => o.customer.email.toLowerCase() === u.email.toLowerCase());
            const spent = userOrders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0);

            return `
                <tr>
                    <td>
                        <div class="fw-semibold">${u.name}</div>
                        <span class="badge ${u.role === 'admin' ? 'bg-dark' : 'bg-secondary'}">${u.role.toUpperCase()}</span>
                    </td>
                    <td>${u.email}</td>
                    <td>${u.phone || 'N/A'}</td>
                    <td>${userOrders.length} orders</td>
                    <td><strong>${ProductDB.formatINR(spent)}</strong></td>
                    <td>${u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : '2026-01-01'}</td>
                </tr>
            `;
        }).join('');
    },

    // 5. REVIEWS TAB
    renderReviewsTable() {
        const reviews = ProductDB.getReviews();
        const tbody = document.getElementById('admin-reviews-table-body');
        if (!tbody) return;

        if (reviews.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">No customer reviews yet.</td></tr>';
            return;
        }

        tbody.innerHTML = reviews.map(r => {
            const product = ProductDB.getById(r.productId);
            return `
                <tr>
                    <td><strong>${r.userName}</strong><br><small class="text-muted">${r.userEmail || ''}</small></td>
                    <td>
                        <div class="fw-medium text-truncate" style="max-width: 180px;">${product ? product.name : 'Unknown Product'}</div>
                        <small class="text-muted font-monospace">${r.productId}</small>
                    </td>
                    <td><span class="text-warning">★ ${r.rating}/5</span></td>
                    <td>
                        <div class="fw-semibold">${r.title || ''}</div>
                        <small class="text-muted text-truncate d-block" style="max-width: 280px;">${r.comment}</small>
                    </td>
                    <td>${r.date}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger" onclick="Admin.deleteReview('${r.id}')">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    deleteReview(reviewId) {
        if (confirm('Are you sure you want to remove this customer review?')) {
            ProductDB.deleteReview(reviewId);
            Cart.showToast('Customer review removed.', 'info');
            this.renderReviewsTable();
            this.renderOverview();
        }
    },

    // 6. CATEGORIES TAB
    renderCategoriesTable() {
        const categories = ProductDB.getCategories();
        const products = ProductDB.getAll();
        const tbody = document.getElementById('admin-categories-table-body');
        if (!tbody) return;

        tbody.innerHTML = categories.map(c => {
            const count = products.filter(p => p.category.toLowerCase() === c.name.toLowerCase()).length;
            return `
                <tr>
                    <td><img src="${c.image}" alt="${c.name}" style="width: 45px; height: 45px; object-fit: cover;" class="rounded"></td>
                    <td><strong>${c.name}</strong></td>
                    <td><small class="text-muted">${c.description}</small></td>
                    <td><span class="badge bg-sand text-dark">${count} products</span></td>
                </tr>
            `;
        }).join('');
    }
};

window.Admin = Admin;

