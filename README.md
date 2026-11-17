# VIVERO • Luxury Furniture & Architectural Living
### Premium E-Commerce Web Application (First-Year Engineering Demonstration)

Built strictly using **HTML5**, **CSS3**, and **Vanilla JavaScript**.  
**Zero frameworks, zero external dependencies, zero backend runtimes.** (No React, Angular, Vue, Bootstrap, Tailwind, Node.js, PHP, or Python).

---

## 1. Project Overview & Aesthetic Direction
**VIVERO Living Atelier** is a luxury, minimalist furniture e-commerce website inspired by the design languages of **West Elm**, **IKEA**, and high-end European architectural studios. 

The application offers a complete, realistic frontend shopping experience featuring customer accounts, an interactive product catalog, instant multi-criteria filtering, multi-angle product galleries, customer reviews with live rating recalculation, cart management with promo codes, checkout workflows with mock payment modes, order tracking, and an **Executive Admin Dashboard** with complete CRUD operations.

### Color Palette:
- **Primary:** Warm Beige (`#EDE5D8`)
- **Secondary:** Dark Brown (`#3D3028`)
- **Background:** Off-White (`#FAF9F6`)
- **Accent:** Forest Green (`#536B50`)
- **Text:** Charcoal (`#292929`)
- **Typography:** *Playfair Display* (Serif headings) and *Plus Jakarta Sans* (Clean modern sans-serif body)

---

## 2. Project Architecture & File Hierarchy

```
piyush/
├── index.html          # Luxury Homepage with Hero, Featured Categories, Best Sellers, Why Choose Us, & Testimonials
├── shop.html           # Product Catalog with Live Search, Multi-Filter (Price, Rating, Category), & Sorting
├── product.html        # Detailed Product Page with Multi-Angle Gallery, Color Swatches, Reviews, & Related Items
├── cart.html           # Functional Shopping Bag with Promo Code Engine, Freight Calculation, & Quantity Stepper
├── checkout.html       # Complete Checkout Workflow with Address Validation & Demo Payment Modes (COD, UPI, Card)
├── wishlist.html       # Saved Pieces Portfolio with "Move to Cart" and Instant Removal
├── orders.html         # Customer Order Tracking & History with Real-Time Status Badges
├── login.html          # Authentication Page with One-Click Demo Credential Auto-Fill
├── register.html       # Customer Registration with Real-Time Validation & LocalStorage Persistence
├── admin.html          # Administrator Management Suite (Metrics Overview, Products CRUD, Orders, & Reviews)
├── css/
│   └── style.css       # Master Stylesheet (Variables, Flexbox, CSS Grid, Modals, Toasts, Responsive Breakpoints)
├── js/
│   ├── products.js     # Master Product Database (26 Items across 9 Categories), Reviews, & Storage Engine
│   ├── auth.js         # Client-Side Authentication, Session Management, & Admin Route Guard
│   ├── cart.js         # Cart State Manager, Promo Code Engine, Wishlist Engine, & Toast System
│   ├── checkout.js     # Checkout Validation, Unique Order ID Generator, & Stock Deduction
│   ├── admin.js        # Admin Controller (Product CRUD Modals, Order Status Updater, Customer Roster)
│   └── app.js          # Global Navbar Controller, Search Modal, Active Navigation, & Newsletter
└── README.md           # Complete Project Documentation & Evaluation Guide
```

---

## 3. Demo Credentials

The application comes pre-seeded with demo accounts in `localStorage`:

| Role | Email Address | Password | Privileges |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@furniture.com` | `Admin123` | Full Admin Dashboard, Product CRUD, Order Status Management, Customer Roster, Review Moderation |
| **Customer** | `customer@gmail.com` | `Customer123` | Browse Catalog, Manage Cart & Wishlist, Place Demo Orders, Submit Verified Reviews, Order History |

*Note: On the `login.html` page, click either **"👤 Fill Customer"** or **"🛡️ Fill Admin"** to pre-fill credentials instantly.*

---

## 4. Key Functional Features

### A. Homepage (`index.html`)
- **Announcement Bar:** Dynamic banner displaying complimentary freight code `LUXURY10`.
- **Navigation Bar:** Responsive luxury header with search trigger, live cart & wishlist counter badges, and logged-in user profile dropdown.
- **Hero Section:** Large high-definition interior visual, headline *"Transform Your Space, Elevate Your Living"*, and CTA links.
- **Category Showcase:** 8 core spaces with hover zoom animation and active item counts.
- **Best Sellers & New Arrivals:** Dynamically rendered product cards featuring discount tags, ratings, and instant "Add to Cart" / "Wishlist" actions.
- **Special Offers Banner:** Promo code highlight with direct navigation to the catalog.
- **Why Choose Us:** 4 architectural pillars: *Premium Quality*, *Transparent Pricing*, *White-Glove Delivery*, and *30-Day In-Home Trial*.
- **Client Testimonials:** Verified reviews from interior designers and collectors.
- **Newsletter Subscription:** Frontend email regex validation with instant confirmation toast.

### B. Product Catalog / Shop (`shop.html`)
- **26 Master Products** spanning 9 categories:
  1. *Sofas* (Nordic Bouclé, Milano Velvet, Chesterfield Cognac)
  2. *Beds* (Aura Solid Oak Platform, Serene Upholstered Wingback, Kyoto Low Bed)
  3. *Dining Tables* (Verona Carrara Marble, Artisan Solid Walnut, Tuscan Extendable Teak)
  4. *Chairs* (Eames Palisander Lounge, Scandi Wishbone Oak, Velvet Accent Armchair)
  5. *Coffee Tables* (Travertine Fluted Round, Nesting Brass & Smoked Glass, Kyoto Reclaimed Elm)
  6. *Wardrobes* (Monolithic 4-Door Oak, Fluted Glass Sliding, Minimalist 2-Door Teak)
  7. *Office Furniture* (Executive Walnut Standing Desk, Bergamo Leather Task Chair, Atelier Oak Desk)
  8. *Bookshelves* (Archway Solid Teak Bookcase, Modular Geometric Wall Unit)
  9. *Home Decor* (Fluted Ceramic Arc Floor Lamp, Moroccan Wool Area Rug, Brutalist Brass Mirror)
- **Instant Live Search:** Debounced search matching piece names, categories, and materials.
- **Multi-Filter System:**
  - Category checkboxes with item count badges.
  - Price range slider with simultaneous dual min/max inputs (₹0 to ₹1,50,000).
  - Star rating filter (4.8★+, 4.5★+, 4.0★+).
  - Availability checkboxes (*In Stock Only*, *Special Privilege Offers*).
  - **"Clear All Filters"** button resetting all parameters seamlessly without page reloads.
- **Sorting Options:** *Price: Low to High*, *Price: High to Low*, *Highest Rated*, *Newest Arrivals*, and *Popular Bestsellers*.

### C. Product Details (`product.html`)
- **Multi-Angle Gallery:** Interactive large view with clickable thumbnail switcher.
- **Bespoke Color Swatches:** Visual circular color swatches with active selection indicators.
- **Quantity Stepper:** `[- 1 +]` counter respecting available stock limits.
- **Specifications Accordion:** Detailed tabs for *Materials & Craftsmanship*, *Dimensions & Spatial Footprint*, and *White-Glove Logistics & Care*.
- **Customer Reviews System:**
  - Rating summary score (e.g., 4.9/5) and distribution breakdown.
  - Interactive **"Write a Client Review"** form with a 1-to-5 star picker, title, and comments.
  - Submitting a review recalculates the product's average rating in `localStorage` in real-time.
- **Related Masterpieces:** Context-aware recommendations matching the current category.

### D. Shopping Cart (`cart.html`)
- **Line Items Table:** Displays thumbnail, selected color finish, unit price, quantity stepper, and line total.
- **Promo Coupon Engine:**
  - `LUXURY10` (10% off entire order)
  - `VIVERO20` (20% off festive order)
  - `ROYAL5000` (₹5,000 flat discount)
- **Automatic Calculations:** Subtotal, catalog discounts, coupon discount, delivery fee (Free above ₹10,000), and final payable total.
- **Persistence:** Items remain in the bag after browser refresh.

### E. Checkout Workflow (`checkout.html`)
- **Customer Form:** Full Name, Email, 10-digit Phone, Street Address, City, State dropdown, and 6-digit PIN code.
- **Demonstration Payment Modes:**
  - *Cash on Delivery / Pay on Assembly*
  - *UPI* (Mock QR code and VPA verification)
  - *Credit/Debit Card* (Mock 16-digit card number, MM/YY expiry, CVV)
- **Order Confirmation:** Deducts inventory stock, empties the shopping bag, generates a unique Order ID (`ORD-2026-XXXXX`), and displays a confirmation modal with a direct link to track order status.

### F. Order Tracking (`orders.html`)
- View full portfolio of customer orders with status badges (*Pending*, *Processing*, *Shipped*, *Delivered*, *Cancelled*).
- Allows cancelling unfulfilled orders with automatic status updates.

### G. Executive Admin Dashboard (`admin.html`)
- **Route Guard:** Restricts access to authenticated administrators only (redirects guests to `login.html`).
- **Dashboard Overview:** Real-time counters for *Total Revenue (₹)*, *Total Orders*, *Curated Pieces*, and *Registered Collectors*, alongside recent orders and bestsellers.
- **Product Management (CRUD):**
  - **Create:** Add new piece via modal with image URL preview, category, price, original price, stock, materials, dimensions, and description.
  - **Read:** Search and inspect existing products in a responsive data table.
  - **Update:** Edit existing piece details and price; changes reflect across the client storefront.
  - **Delete:** Remove product with confirmation prompt.
- **Order Management:** View order details, shipping destination, and dynamically change order status from a dropdown (*Pending* &rarr; *Processing* &rarr; *Shipped* &rarr; *Delivered* &rarr; *Cancelled*).
- **Customer Management:** View client roster, email, phone, total orders placed, and lifetime spend.
- **Review Moderation:** View feedback and delete inappropriate reviews.

---

## 5. How to Run Locally

Because this project is built using 100% native web standards (HTML5, CSS3, Vanilla JS):

1. **Option A (Direct Browser Launch):**
   - Navigate to the project directory: `c:\Users\Vipul Kumar\OneDrive\Desktop\piyush\`
   - Double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari.

2. **Option B (VS Code Live Server or Local HTTP Server):**
   - Open the folder in VS Code, right-click `index.html`, and select **"Open with Live Server"**.
   - Or run with any lightweight server:
     ```bash
     # PowerShell / Command Line
     npx serve .
     # Or Python HTTP Server
     python -m http.server 3000
     ```

---

## 6. Testing & Demonstration Workflows for Evaluators

### Workflow 1: Customer Shopping Experience
1. Open `index.html` and click **"Shop Now"**.
2. On `shop.html`, test the live search: type `"Marble"` or `"Oak"`.
3. Test filters: Select category `"Sofas"`, move the price slider, and select `"★ 4.8 & above"`.
4. Click **"Clear All"** to verify all filters reset smoothly.
5. Click any product card (e.g. *Nordic Bouclé 3-Seater Sofa*) to open `product.html`.
6. Switch gallery images by clicking thumbnails. Select a finish color swatch.
7. Increase quantity to `2` and click **"Add to Shopping Bag"** (notice the cart badge increments).
8. Scroll to **"Verified Customer Reviews"**, select `5 Stars`, enter your name and comments, and click **"Submit Review"**. Observe the average rating recalculate.
9. Click the Cart icon in the header to view `cart.html`.
10. In the promo box, enter `LUXURY10` and click **"Apply"** (10% discount is applied immediately).
11. Click **"Proceed to Checkout"**.
12. Fill customer address details, choose a payment method (e.g. *Cash on Delivery* or *UPI*), and click **"Confirm & Place Order"**.
13. View the generated Order ID and click **"Track My Order"** to see your order in `orders.html`.

### Workflow 2: Admin Dashboard & CRUD Operations
1. Click **"Sign In"** in the navigation header (or visit `login.html`).
2. Click the button **"🛡️ Fill Admin"** (email `admin@furniture.com`, password `Admin123`) and click **"Sign In to Atelier"**.
3. You will be automatically redirected to `admin.html`.
4. **Inspect Metrics:** Check Total Store Revenue, Orders Count, and Products Count.
5. **Add a Product (Create):** Click **"+ Add New Product"**, enter a piece name (e.g., *"Kyoto Minimalist Oak Bench"*), category `"Chairs"`, price `32999`, stock `10`, and click **"Save Piece to Catalogue"**.
6. Switch to `shop.html` in another tab to verify the new product appears live in the customer store!
7. **Edit a Product (Update):** Return to Admin &rarr; **Manage Products**, find any piece, click **"Edit"**, update the price or stock, and save.
8. **Delete a Product (Delete):** Click **"Delete"** on any piece, confirm the prompt, and verify its removal.
9. **Update Order Status:** Go to **Manage Orders**, locate the latest customer order, and change its dropdown status from `"Processing"` to `"Shipped"` or `"Delivered"`.
10. Check `orders.html` as a customer to see the status pill update to green.

---

## 7. Compliance Statement
- **Languages Used:** HTML5, CSS3, Vanilla JavaScript (ES6+).
- **External Frameworks:** None.
- **Backend / Server Code:** None. All state, authentication, orders, reviews, and carts are managed securely on the client side using the browser's `localStorage` API.

