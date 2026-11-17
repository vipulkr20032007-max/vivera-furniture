/**
 * VIVERO LUXURY LIVING - Authentication & Role Management
 * Pure Vanilla JavaScript Client-Side Auth (Demonstration Mode)
 */

const DEFAULT_USERS = [
    {
        id: 'user-admin',
        name: 'Master Administrator',
        email: 'admin@furniture.com',
        phone: '+91 99999 88888',
        password: 'Admin123',
        role: 'admin',
        createdAt: '2026-01-01T00:00:00.000Z',
        address: 'Headquarters, Executive Suites',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001'
    },
    {
        id: 'user-customer',
        name: 'Piyush Sharma',
        email: 'customer@gmail.com',
        phone: '+91 98765 43210',
        password: 'Customer123',
        role: 'customer',
        createdAt: '2026-02-15T00:00:00.000Z',
        address: '42, Heritage Enclave, MG Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001'
    }
];

const Auth = {
    // Initialize users
    init() {
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
        }
    },

    // Get all registered users
    getAllUsers() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || DEFAULT_USERS;
        } catch (e) {
            return DEFAULT_USERS;
        }
    },

    // Get current logged-in user
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
            return userStr ? JSON.parse(userStr) : null;
        } catch (e) {
            return null;
        }
    },

    // Check if user is logged in
    isLoggedIn() {
        return !!this.getCurrentUser();
    },

    // Check if logged-in user is admin
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },

    // Register a new customer
    register({ name, email, phone, password, confirmPassword }) {
        this.init();
        const users = this.getAllUsers();

        // Validation
        if (!name || name.trim().length < 3) {
            return { success: false, message: 'Please enter a valid full name (minimum 3 characters).' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.trim().toLowerCase())) {
            return { success: false, message: 'Please enter a valid email address.' };
        }

        const cleanEmail = email.trim().toLowerCase();
        if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
            return { success: false, message: 'An account with this email address already exists. Please log in.' };
        }

        const phoneDigits = phone ? phone.replace(/\D/g, '') : '';
        if (phoneDigits.length < 10) {
            return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
        }

        if (!password || password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters long.' };
        }

        if (password !== confirmPassword) {
            return { success: false, message: 'Passwords do not match.' };
        }

        const newUser = {
            id: 'user-' + Date.now(),
            name: name.trim(),
            email: cleanEmail,
            phone: phone.trim(),
            password: password, // Note: Stored in localStorage for client-side demo only
            role: 'customer',
            createdAt: new Date().toISOString(),
            address: '',
            city: '',
            state: '',
            pincode: ''
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

        // Auto log in new customer
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
        return { success: true, message: `Welcome to VIVERO, ${newUser.name}! Your account has been created.`, user: newUser };
    },

    // Login
    login(email, password, remember = false) {
        this.init();
        const users = this.getAllUsers();
        const cleanEmail = (email || '').trim().toLowerCase();

        const user = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

        if (!user) {
            return { success: false, message: 'Invalid email address or password. Please check your credentials.' };
        }

        // Save session
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
        return { success: true, message: `Welcome back, ${user.name}!`, user: user };
    },

    // Logout
    logout() {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        window.location.href = 'index.html';
    },

    // Protect Admin routes
    requireAdmin() {
        if (!this.isAdmin()) {
            alert('Access Denied. Admin privileges are required to view this page. Redirecting to Login...');
            window.location.href = 'login.html?redirect=admin.html';
            return false;
        }
        return true;
    },

    // Protect Customer account routes (orders, checkout)
    requireAuth(redirectUrl = 'login.html') {
        if (!this.isLoggedIn()) {
            window.location.href = `${redirectUrl}?redirect=${encodeURIComponent(window.location.pathname)}`;
            return false;
        }
        return true;
    }
};

Auth.init();
window.Auth = Auth;

