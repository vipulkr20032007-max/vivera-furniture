/**
 * VIVERO LUXURY LIVING - Products & Mock Database
 * Pure Vanilla JavaScript Data Layer with LocalStorage Persistence
 */

const STORAGE_KEYS = {
    PRODUCTS: 'vivero_products',
    CATEGORIES: 'vivero_categories',
    REVIEWS: 'vivero_reviews',
    USERS: 'vivero_users',
    CURRENT_USER: 'vivero_current_user',
    CART: 'vivero_cart',
    WISHLIST: 'vivero_wishlist',
    ORDERS: 'vivero_orders'
};

// Initial Categories
const DEFAULT_CATEGORIES = [
    { id: 'sofas', name: 'Sofas', icon: 'weekend', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', description: 'Curated ergonomic comfort with bespoke European fabrics' },
    { id: 'beds', name: 'Beds', icon: 'bed', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', description: 'Handcrafted solid oak & walnut sanctuary beds' },
    { id: 'dining-tables', name: 'Dining Tables', icon: 'table_restaurant', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80', description: 'Statement Italian marble and solid timber dining centerpieces' },
    { id: 'chairs', name: 'Chairs', icon: 'chair', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', description: 'Iconic mid-century silhouettes and ergonomic accent chairs' },
    { id: 'coffee-tables', name: 'Coffee Tables', icon: 'table_bar', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80', description: 'Organic travertine stone and brass accented living tables' },
    { id: 'wardrobes', name: 'Wardrobes', icon: 'door_sliding', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', description: 'Sophisticated modular closets with fluted glass & warm LEDs' },
    { id: 'office-furniture', name: 'Office Furniture', icon: 'desk', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80', description: 'Executive walnut standing desks and leather task seating' },
    { id: 'bookshelves', name: 'Bookshelves', icon: 'shelves', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80', description: 'Architectural shelving towers and modular display units' },
    { id: 'home-decor', name: 'Home Decor', icon: 'lightbulb', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', description: 'Artisan ceramic vessels, sculptural lighting, and wool rugs' }
];

// Initial 26 Master Furniture Products
const DEFAULT_PRODUCTS = [
    // --- SOFAS ---
    {
        id: 'prod-1',
        name: 'Nordic Bouclé 3-Seater Sofa',
        category: 'Sofas',
        price: 74999,
        originalPrice: 89999,
        discount: 17,
        rating: 4.9,
        reviewCount: 38,
        stock: 12,
        isNew: true,
        bestseller: true,
        featured: true,
        description: 'Embrace cloud-like luxury with our Nordic Bouclé 3-Seater. Meticulously upholstered in textured cream bouclé fabric over a solid FSC-certified kiln-dried birch frame. Features dual-density feather and high-resilience foam cushioning.',
        material: 'FSC Birch Frame, Italian Wool Bouclé, Down-Feather Fill',
        dimensions: 'W 230cm × D 98cm × H 76cm (Seat Height: 44cm)',
        colors: [
            { name: 'Oatmeal Bouclé', hex: '#EBE5D8' },
            { name: 'Charcoal Grey', hex: '#3B3B3B' },
            { name: 'Olive Green', hex: '#58634B' }
        ],
        images: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-2',
        name: 'Milano Velvet L-Sectional',
        category: 'Sofas',
        price: 119999,
        originalPrice: 139999,
        discount: 14,
        rating: 4.8,
        reviewCount: 24,
        stock: 7,
        isNew: false,
        bestseller: true,
        featured: true,
        description: 'A lavish statement piece engineered in Milan. Draped in stain-resistant performance velvet with subtle French seam stitching and darkened brushed brass stiletto feet.',
        material: 'Performance Velvet, Solid Ashwood, Brass Hardware',
        dimensions: 'W 290cm × D 175cm × H 82cm',
        colors: [
            { name: 'Forest Emerald', hex: '#2F483D' },
            { name: 'Midnight Navy', hex: '#1C2833' },
            { name: 'Warm Terracotta', hex: '#B85D3B' }
        ],
        images: [
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-3',
        name: 'Chesterfield Cognac Leather Sofa',
        category: 'Sofas',
        price: 98999,
        originalPrice: 115000,
        discount: 14,
        rating: 5.0,
        reviewCount: 19,
        stock: 5,
        isNew: false,
        bestseller: false,
        featured: false,
        description: 'Timeless British craftsmanship reimagined. Hand-antiqued top-grain cognac aniline leather featuring deep button-tufting, rolled arms, and solid turned mahogany castors.',
        material: '100% Top-Grain Italian Leather, Solid Mahogany, Brass Studs',
        dimensions: 'W 220cm × D 95cm × H 80cm',
        colors: [
            { name: 'Cognac Amber', hex: '#874A27' },
            { name: 'Espresso Black', hex: '#241B16' }
        ],
        images: [
            'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80'
        ]
    },

    // --- BEDS ---
    {
        id: 'prod-4',
        name: 'Aura Solid Oak Platform Bed',
        category: 'Beds',
        price: 68999,
        originalPrice: 79999,
        discount: 14,
        rating: 4.9,
        reviewCount: 31,
        stock: 9,
        isNew: true,
        bestseller: true,
        featured: true,
        description: 'Clean architectural lines meet Scandinavian serenity. The Aura Platform Bed is crafted from solid American White Oak with integrated floating bedside shelves and sound-dampening slat foundation.',
        material: '100% Solid American White Oak, Natural Matte Lacquer',
        dimensions: 'King: L 215cm × W 195cm × H 95cm',
        colors: [
            { name: 'Natural Light Oak', hex: '#D2B78F' },
            { name: 'Smoked Walnut Finish', hex: '#4B382A' }
        ],
        images: [
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-5',
        name: 'Serene Upholstered Wingback Bed',
        category: 'Beds',
        price: 54999,
        originalPrice: 65000,
        discount: 15,
        rating: 4.7,
        reviewCount: 28,
        stock: 14,
        isNew: false,
        bestseller: true,
        featured: false,
        description: 'Cocoon yourself in bedtime serenity. Featuring an oversized curved wingback headboard clad in stain-repellent textured linen weave with hidden hydraulic underbed storage.',
        material: 'Premium Belgian Linen, Reinforced Steel Sub-Frame, Oak Legs',
        dimensions: 'Queen: L 210cm × W 170cm × H 125cm',
        colors: [
            { name: 'Sand Warm Beige', hex: '#E2D7C7' },
            { name: 'Slate Gray', hex: '#63686D' }
        ],
        images: [
            'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-6',
        name: 'Kyoto Minimalist Low Bed',
        category: 'Beds',
        price: 49999,
        originalPrice: 58999,
        discount: 15,
        rating: 4.8,
        reviewCount: 15,
        stock: 6,
        isNew: true,
        bestseller: false,
        featured: false,
        description: 'Inspired by Japanese ryokan aesthetics. This low-profile bed sits just 25cm off the floor with a subtle perimeter ledge and Japanese joinery that requires zero metal hardware.',
        material: 'Solid Hinoki Cypress & Walnut, Tatami-ready pine slats',
        dimensions: 'King: L 225cm × W 205cm × H 45cm',
        colors: [
            { name: 'Muted Cypress', hex: '#CDB18B' },
            { name: 'Ebonized Black', hex: '#1E1E1E' }
        ],
        images: [
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1000&q=80'
        ]
    },

    // --- DINING TABLES ---
    {
        id: 'prod-7',
        name: 'Verona Carrara Marble Dining Table',
        category: 'Dining Tables',
        price: 88999,
        originalPrice: 109999,
        discount: 19,
        rating: 5.0,
        reviewCount: 22,
        stock: 4,
        isNew: true,
        bestseller: true,
        featured: true,
        description: 'Carved from genuine imported Italian Carrara white marble with grey feather veining. Finished with an organic bullnose edge and supported by twin ribbed fluted walnut pedestals.',
        material: 'Natural Italian Carrara Marble Slab, Fluted Solid Walnut Pedestals',
        dimensions: 'L 220cm × W 100cm × H 76cm (Seats 8)',
        colors: [
            { name: 'Carrara White & Walnut', hex: '#F0EEE9' },
            { name: 'Nero Marquina Black', hex: '#222222' }
        ],
        images: [
            'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-8',
        name: 'Artisan Solid Walnut 6-Seater Table',
        category: 'Dining Tables',
        price: 62999,
        originalPrice: 72000,
        discount: 12,
        rating: 4.8,
        reviewCount: 17,
        stock: 8,
        isNew: false,
        bestseller: true,
        featured: false,
        description: 'Showcasing the raw drama of natural live grain. Built by master woodturners using 45mm thick book-matched black American walnut with bevelled aerodynamic edges.',
        material: 'American Black Walnut, Hand-rubbed Organic Tung Oil',
        dimensions: 'L 190cm × W 90cm × H 75cm (Seats 6)',
        colors: [
            { name: 'Natural Black Walnut', hex: '#483526' },
            { name: 'Bleached Oak', hex: '#D5C4A1' }
        ],
        images: [
            'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-9',
        name: 'Tuscan Extendable Teak Dining Table',
        category: 'Dining Tables',
        price: 72999,
        originalPrice: 84999,
        discount: 14,
        rating: 4.7,
        reviewCount: 14,
        stock: 10,
        isNew: false,
        bestseller: false,
        featured: false,
        description: 'Effortlessly expands from intimate family meals (6 seats) to celebratory dinners (10 seats) with a silky butterfly German slide extension mechanism.',
        material: 'Sustainable Grade-A Plantation Teak Wood',
        dimensions: 'L 180cm-260cm (Extended) × W 95cm × H 76cm',
        colors: [
            { name: 'Golden Honey Teak', hex: '#AC7A43' },
            { name: 'Dark Java', hex: '#3B2A1E' }
        ],
        images: [
            'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80'
        ]
    },

    // --- CHAIRS ---
    {
        id: 'prod-10',
        name: 'Eames-Inspired Palisander Lounge Chair & Ottoman',
        category: 'Chairs',
        price: 49999,
        originalPrice: 59999,
        discount: 16,
        rating: 4.9,
        reviewCount: 43,
        stock: 11,
        isNew: false,
        bestseller: true,
        featured: true,
        description: 'The pinnacle of 20th century mid-century modern seating. Molded 7-ply palisander rosewood shells cushioned in supple full-grain leather, swiveling effortlessly on a die-cast aluminium base.',
        material: 'Molded Palisander Veneer, Top Grain Semi-Aniline Leather, Cast Aluminium',
        dimensions: 'Chair: W 84cm × D 85cm × H 84cm | Ottoman: W 65cm × D 54cm',
        colors: [
            { name: 'Vintage Caramel Leather', hex: '#9E5B2E' },
            { name: 'Onyx Black Leather', hex: '#1C1C1C' },
            { name: 'Ivory White', hex: '#F3EFE6' }
        ],
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1580481077197-0335272a27a0?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-11',
        name: 'Scandi Wishbone Solid Oak Dining Chair (Set of 2)',
        category: 'Chairs',
        price: 24999,
        originalPrice: 29999,
        discount: 16,
        rating: 4.8,
        reviewCount: 33,
        stock: 16,
        isNew: true,
        bestseller: true,
        featured: false,
        description: 'Sculptural, lightweight yet remarkably sturdy. Steam-bent solid oak backrest with a hand-woven natural paper cord seat taking over 120 meters of cord per chair.',
        material: 'Solid Steam-Bent Oak, Natural 3-Ply Danish Paper Cord',
        dimensions: 'W 55cm × D 52cm × H 75cm (Seat Height: 45cm)',
        colors: [
            { name: 'Natural Light Oak', hex: '#DBC5A6' },
            { name: 'Matte Charcoal Black', hex: '#2A2A2A' }
        ],
        images: [
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1580481077197-0335272a27a0?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-12',
        name: 'Velvet Cocoon Accent Armchair',
        category: 'Chairs',
        price: 29999,
        originalPrice: 35000,
        discount: 14,
        rating: 4.7,
        reviewCount: 20,
        stock: 9,
        isNew: false,
        bestseller: false,
        featured: false,
        description: 'A cozy reading sanctuary designed to hug your contours. Curved organic wrap-around silhouette lined with high-density foam and tapered champagne gold legs.',
        material: 'Plush Micro-Velvet, Plywood Core, Electroplated Gold Steel',
        dimensions: 'W 82cm × D 80cm × H 78cm',
        colors: [
            { name: 'Mustard Gold', hex: '#CCA43B' },
            { name: 'Dusty Rose', hex: '#C2847A' },
            { name: 'Forest Green', hex: '#3E5642' }
        ],
        images: [
            'https://images.unsplash.com/photo-1580481077197-0335272a27a0?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80'
        ]
    },

    // --- COFFEE TABLES ---
    {
        id: 'prod-13',
        name: 'Travertine Fluted Round Coffee Table',
        category: 'Coffee Tables',
        price: 38999,
        originalPrice: 46999,
        discount: 17,
        rating: 4.9,
        reviewCount: 26,
        stock: 7,
        isNew: true,
        bestseller: true,
        featured: true,
        description: 'Exuding understated Italian opulence. Honed Roman travertine stone top with natural pores, perched over a sculpted fluted solid oak columnar pedestal base.',
        material: 'Authentic Beige Travertine Stone, Fluted European White Oak',
        dimensions: 'Diameter 90cm × H 42cm (Weight: 38kg)',
        colors: [
            { name: 'Warm Cream Travertine', hex: '#E6DECE' },
            { name: 'Grey Silver Travertine', hex: '#BFB8AB' }
        ],
        images: [
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-14',
        name: 'Nesting Brass & Smoked Glass Coffee Duo',
        category: 'Coffee Tables',
        price: 27999,
        originalPrice: 32999,
        discount: 15,
        rating: 4.6,
        reviewCount: 18,
        stock: 12,
        isNew: false,
        bestseller: false,
        featured: false,
        description: 'Versatile twin tables that nestle together or separate to serve drinks. Constructed with tempered smoked charcoal glass tops and hand-patinated spun brass framework.',
        material: 'Tempered 8mm Smoked Glass, Spun Brass, Non-slip rubber glides',
        dimensions: 'Large: Dia 80cm × H 45cm | Small: Dia 55cm × H 38cm',
        colors: [
            { name: 'Brushed Brass & Smoked Glass', hex: '#B89758' },
            { name: 'Matte Black Metal', hex: '#262626' }
        ],
        images: [
            'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-15',
        name: 'Kyoto Reclaimed Elm Low Coffee Table',
        category: 'Coffee Tables',
        price: 31999,
        originalPrice: 36999,
        discount: 13,
        rating: 4.8,
        reviewCount: 19,
        stock: 8,
        isNew: false,
        bestseller: false,
        featured: false,
        description: 'Reclaimed century-old architectural elm timber restored to glory. Each table possesses completely unique knot patterns, weathering marks, and hand-chiseled mortise joints.',
        material: 'Solid Reclaimed Northern Elm, Plant-based Wax Polish',
        dimensions: 'L 130cm × W 65cm × H 36cm',
        colors: [
            { name: 'Aged Weathered Elm', hex: '#7D6752' }
        ],
        images: [
            'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80'
        ]
    },

    // --- WARDROBES ---
    {
        id: 'prod-16',
        name: 'Monolithic 4-Door Oak Wardrobe with LED',
        category: 'Wardrobes',
        price: 94999,
        originalPrice: 112000,
        discount: 15,
        rating: 4.9,
        reviewCount: 15,
        stock: 5,
        isNew: true,
        bestseller: true,
        featured: true,
        description: 'A bespoke dressing haven. Features four full-height soft-close oak doors concealing sensor-activated warm LED strip illumination, velvet-lined jewelry drawers, and copper hanging rods.',
        material: 'Engineered Wood with Solid American Oak Veneer, Blum Soft-Close Hinges',
        dimensions: 'W 200cm × D 60cm × H 220cm',
        colors: [
            { name: 'Nordic Oak & Warm Amber', hex: '#D6BE98' },
            { name: 'Smoked Walnut', hex: '#483526' }
        ],
        images: [
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-17',
        name: 'Fluted Glass Sliding 3-Door Armoire',
        category: 'Wardrobes',
        price: 84999,
        originalPrice: 99999,
        discount: 15,
        rating: 4.7,
        reviewCount: 12,
        stock: 4,
        isNew: false,
        bestseller: false,
        featured: false,
        description: 'Modern European design with reeded fluted safety glass that catches the light while keeping interior garments private. Sliding aluminum track operates silently.',
        material: 'Tempered Fluted Glass, Matte Bronze Aluminum Frame, Oak Interior',
        dimensions: 'W 180cm × D 62cm × H 215cm',
        colors: [
            { name: 'Bronze Aluminum Frame', hex: '#594537' },
            { name: 'Anodized Black Metal', hex: '#212121' }
        ],
        images: [
            'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-18',
        name: 'Minimalist 2-Door Teak Dresser Wardrobe',
        category: 'Wardrobes',
        price: 52999,
        originalPrice: 59999,
        discount: 11,
        rating: 4.8,
        reviewCount: 21,
        stock: 9,
        isNew: false,
        bestseller: true,
        featured: false,
        description: 'Perfect for compact bedrooms and guest suites. Compact dual doors with two deep bottom storage drawers and solid brass finger pull handles.',
        material: 'Solid Burma Teak, Hand-brushed Satin Brass Pulls',
        dimensions: 'W 110cm × D 58cm × H 195cm',
        colors: [
            { name: 'Golden Teak Wood', hex: '#A87948' }
        ],
        images: [
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80'
        ]
    },

    // --- OFFICE FURNITURE ---
    {
        id: 'prod-19',
        name: 'Executive Walnut Smart Standing Desk',
        category: 'Office Furniture',
        price: 59999,
        originalPrice: 72000,
        discount: 16,
        rating: 4.9,
        reviewCount: 46,
        stock: 14,
        isNew: true,
        bestseller: true,
        featured: true,
        description: 'Where ergonomic engineering meets executive prestige. Solid 35mm walnut desktop with wireless phone charger inset, dual ultra-silent German dual motors, 4-position OLED memory keypad, and integrated cable raceway.',
        material: 'Solid American Walnut Slab, Heavy-Duty Powder-Coated Steel Frame',
        dimensions: 'L 160cm × W 80cm × H 65cm-128cm (Adjustable)',
        colors: [
            { name: 'Walnut & Matte Black', hex: '#443224' },
            { name: 'Natural Oak & White Frame', hex: '#D2B48C' }
        ],
        images: [
            'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-20',
        name: 'Bergamo Full-Grain Leather Executive Task Chair',
        category: 'Office Furniture',
        price: 34999,
        originalPrice: 42000,
        discount: 16,
        rating: 4.8,
        reviewCount: 39,
        stock: 15,
        isNew: false,
        bestseller: true,
        featured: false,
        description: 'Say goodbye to plastic office chairs. Wrap yourself in buttery top-grain leather with synchro-tilt mechanism, 4D adjustable padded arms, and Class-4 heavy duty gas lift.',
        material: 'Top-Grain Leather, Cast Aluminum Base, High-Density Cold-Cure Foam',
        dimensions: 'W 68cm × D 68cm × H 115cm-125cm',
        colors: [
            { name: 'Warm Saddle Tan', hex: '#9E5B2E' },
            { name: 'Executive Obsidian Black', hex: '#1C1C1C' }
        ],
        images: [
            'https://images.unsplash.com/photo-1580481077197-0335272a27a0?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-21',
        name: 'Atelier Minimalist Oak Writing Desk',
        category: 'Office Furniture',
        price: 36999,
        originalPrice: 42999,
        discount: 13,
        rating: 4.7,
        reviewCount: 21,
        stock: 8,
        isNew: false,
        bestseller: false,
        featured: false,
        description: 'For the focused writer and creative. Featuring two concealed felt-lined laptop drawers, rear cord passthrough notch, and slim tapered angled spindle legs.',
        material: 'Solid European White Oak, Felt Liner',
        dimensions: 'L 140cm × W 65cm × H 75cm',
        colors: [
            { name: 'Natural Sand Oak', hex: '#D7C4A7' },
            { name: 'Smoked Walnut', hex: '#4B3621' }
        ],
        images: [
            'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=1000&q=80'
        ]
    },

    // --- BOOKSHELVES ---
    {
        id: 'prod-22',
        name: 'Archway Solid Teak Library Bookcase',
        category: 'Bookshelves',
        price: 58999,
        originalPrice: 69999,
        discount: 15,
        rating: 4.9,
        reviewCount: 23,
        stock: 6,
        isNew: true,
        bestseller: true,
        featured: true,
        description: 'Inspired by classical Roman arches. Crafted from solid mature teak with 5 spacious tiered display shelves to host heavy art books, sculptures, and greenery.',
        material: 'Solid Plantation Teak, Natural Satin Finish',
        dimensions: 'W 110cm × D 38cm × H 200cm',
        colors: [
            { name: 'Natural Honey Teak', hex: '#AB7A44' },
            { name: 'Antique Espresso', hex: '#37271E' }
        ],
        images: [
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-23',
        name: 'Modular Geometric Oak Wall Unit',
        category: 'Bookshelves',
        price: 44999,
        originalPrice: 51999,
        discount: 13,
        rating: 4.8,
        reviewCount: 16,
        stock: 9,
        isNew: false,
        bestseller: false,
        featured: false,
        description: 'Asymmetric open cubbies provide an artistic canvas for your personal collection. Can be wall mounted or freestanding as a room partition.',
        material: 'Solid White Oak & Birch Plywood Veneer',
        dimensions: 'W 140cm × D 32cm × H 160cm',
        colors: [
            { name: 'Natural Blond Oak', hex: '#DECFB8' },
            { name: 'Matte Ebonized Ash', hex: '#232323' }
        ],
        images: [
            'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80'
        ]
    },

    // --- HOME DECOR ---
    {
        id: 'prod-24',
        name: 'Fluted Ceramic Arc Floor Lamp',
        category: 'Home Decor',
        price: 18999,
        originalPrice: 22999,
        discount: 17,
        rating: 4.9,
        reviewCount: 34,
        stock: 20,
        isNew: true,
        bestseller: true,
        featured: true,
        description: 'Sculptural elegance that gently drapes warm illumination over reading nooks or sectional sofas. Weighted marble plinth with spun ceramic shade and brass arm.',
        material: 'Natural White Marble Base, Brass Arm, Hand-cast Ribbed Ceramic',
        dimensions: 'Span 140cm × H 210cm (Base Dia 38cm)',
        colors: [
            { name: 'Warm Terracotta Ceramic', hex: '#BF6648' },
            { name: 'Bone White Ceramic', hex: '#EAE6DF' }
        ],
        images: [
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-25',
        name: 'Handwoven Moroccan Wool & Jute Area Rug',
        category: 'Home Decor',
        price: 26999,
        originalPrice: 31999,
        discount: 15,
        rating: 4.8,
        reviewCount: 29,
        stock: 11,
        isNew: false,
        bestseller: true,
        featured: false,
        description: 'Hand-knotted by Berber artisans using 100% natural unbleached New Zealand wool blended with organic golden jute yarn for cloud-soft durability.',
        material: '70% New Zealand Wool, 30% Golden Jute, Cotton Warp',
        dimensions: '8ft × 10ft (240cm × 300cm)',
        colors: [
            { name: 'Ivory Diamond Tribal', hex: '#EEEAE1' },
            { name: 'Warm Earth Geometric', hex: '#8C7765' }
        ],
        images: [
            'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 'prod-26',
        name: 'Brutalist Asymmetric Solid Brass Mirror',
        category: 'Home Decor',
        price: 15999,
        originalPrice: 18999,
        discount: 15,
        rating: 4.9,
        reviewCount: 22,
        stock: 14,
        isNew: true,
        bestseller: false,
        featured: false,
        description: 'An organic wavy conversation piece. Framed with thick hand-soldered antiqued unlacquered brass and copper-free HD distortion-proof glass.',
        material: 'Hand-beaten Solid Brass, 5mm HD Silver Mirror Plate',
        dimensions: 'H 115cm × W 75cm × Depth 3cm',
        colors: [
            { name: 'Antiqued Brushed Brass', hex: '#B89758' },
            { name: 'Burnished Bronze', hex: '#5E4939' }
        ],
        images: [
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80'
        ]
    }
];

// Initial Customer Reviews Data
const DEFAULT_REVIEWS = [
    {
        id: 'rev-1',
        productId: 'prod-1',
        userName: 'Aanya Singhania',
        userEmail: 'aanya.s@gmail.com',
        rating: 5,
        title: 'Breathtaking quality! Looks like a €5000 European couch',
        comment: 'The bouclé is thick, soft, and remarkably easy to spot clean. It arrived in sturdy timber crates with white glove delivery. Truly elevates our living room.',
        date: '2026-10-14',
        verified: true
    },
    {
        id: 'rev-2',
        productId: 'prod-1',
        userName: 'Vikramaditya Roy',
        userEmail: 'vikram.roy@outlook.com',
        rating: 5,
        title: 'Outstanding seating depth and comfort',
        comment: 'We spent months searching for a couch with true down-feather cushioning. The Nordic Bouclé is perfection. Everyone who visits immediately asks where we bought it.',
        date: '2026-10-28',
        verified: true
    },
    {
        id: 'rev-3',
        productId: 'prod-4',
        userName: 'Priya Nambiar',
        userEmail: 'priya.n@gmail.com',
        rating: 5,
        title: 'Solid American White Oak craftsmanship is unbelievable',
        comment: 'Zero squeaks, zero wobble. The joinery is pure art. Smells of natural timber and the floating bedside tables are so sleek and functional.',
        date: '2026-11-02',
        verified: true
    },
    {
        id: 'rev-4',
        productId: 'prod-7',
        userName: 'Rohan Mehra',
        userEmail: 'rohan.m@gmail.com',
        rating: 5,
        title: 'The Italian Carrara Marble is breathtaking',
        comment: 'Extremely heavy, sturdy, and the veining is gorgeous. We had 8 people over for Diwali dinner and it was the highlight of the night.',
        date: '2026-11-05',
        verified: true
    },
    {
        id: 'rev-5',
        productId: 'prod-10',
        userName: 'Kabir Sengupta',
        userEmail: 'kabir.s@gmail.com',
        rating: 5,
        title: 'Iconic lounge chair, best purchase for my study',
        comment: 'The palisander wood grain and top-grain caramel leather feel magnificent. Unbelievably comfortable for long reading sessions.',
        date: '2026-11-09',
        verified: true
    },
    {
        id: 'rev-6',
        productId: 'prod-19',
        userName: 'Meera Deshmukh',
        userEmail: 'meera.d@techcorp.in',
        rating: 5,
        title: 'Dual motors are silent and the solid walnut top is flawless',
        comment: 'I work 9 hours a day from home. This desk changed my life and posture. The wireless charger embedded in the wood is pure genius.',
        date: '2026-11-12',
        verified: true
    }
];

// Initial Demo Orders
const DEFAULT_ORDERS = [
    {
        id: 'ORD-2026-98241',
        date: '2026-11-10T14:30:00.000Z',
        customer: {
            name: 'Piyush Sharma',
            email: 'customer@gmail.com',
            phone: '+91 98765 43210',
            address: '42, Heritage Enclave, MG Road',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560001'
        },
        items: [
            {
                productId: 'prod-1',
                name: 'Nordic Bouclé 3-Seater Sofa',
                price: 74999,
                quantity: 1,
                color: 'Oatmeal Bouclé',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'
            },
            {
                productId: 'prod-13',
                name: 'Travertine Fluted Round Coffee Table',
                price: 38999,
                quantity: 1,
                color: 'Warm Cream Travertine',
                image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80'
            }
        ],
        subtotal: 113998,
        discount: 10000,
        shipping: 0,
        total: 103998,
        paymentMethod: 'UPI (Demonstration)',
        status: 'Delivered',
        notes: 'Complimentary white-glove assembly completed.'
    },
    {
        id: 'ORD-2026-98315',
        date: '2026-11-15T11:15:00.000Z',
        customer: {
            name: 'Piyush Sharma',
            email: 'customer@gmail.com',
            phone: '+91 98765 43210',
            address: '42, Heritage Enclave, MG Road',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560001'
        },
        items: [
            {
                productId: 'prod-19',
                name: 'Executive Walnut Smart Standing Desk',
                price: 59999,
                quantity: 1,
                color: 'Walnut & Matte Black',
                image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80'
            }
        ],
        subtotal: 59999,
        discount: 5000,
        shipping: 0,
        total: 54999,
        paymentMethod: 'Credit/Debit Card (Demonstration)',
        status: 'Processing',
        notes: 'Dispatched from Central Warehouse.'
    }
];

// Helper Functions
const ProductDB = {
    // Initialize LocalStorage with default seeds if empty
    init() {
        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
            localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
        }
        if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
            localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
        }
    },

    // Get all products
    getAll() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || DEFAULT_PRODUCTS;
        } catch (e) {
            console.error('Failed to parse products from localStorage:', e);
            return DEFAULT_PRODUCTS;
        }
    },

    // Save all products
    saveAll(products) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    },

    // Get single product by ID
    getById(id) {
        const products = this.getAll();
        return products.find(p => p.id === id) || null;
    },

    // Create a new product
    create(productData) {
        const products = this.getAll();
        const newProduct = {
            id: 'prod-' + Date.now(),
            rating: 5.0,
            reviewCount: 0,
            featured: false,
            bestseller: false,
            isNew: true,
            colors: productData.colors || [{ name: 'Default Finish', hex: '#EDE5D8' }],
            images: productData.images && productData.images.length > 0 
                ? productData.images 
                : ['assets/images/placeholder.svg'],
            ...productData
        };
        // Auto compute discount percentage if not passed
        if (newProduct.originalPrice && newProduct.originalPrice > newProduct.price) {
            newProduct.discount = Math.round(((newProduct.originalPrice - newProduct.price) / newProduct.originalPrice) * 100);
        } else {
            newProduct.originalPrice = newProduct.price;
            newProduct.discount = 0;
        }

        products.unshift(newProduct);
        this.saveAll(products);
        return newProduct;
    },

    // Update an existing product
    update(id, updatedFields) {
        const products = this.getAll();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;

        const updated = { ...products[index], ...updatedFields };
        if (updated.originalPrice && updated.originalPrice > updated.price) {
            updated.discount = Math.round(((updated.originalPrice - updated.price) / updated.originalPrice) * 100);
        }

        products[index] = updated;
        this.saveAll(products);
        return updated;
    },

    // Delete a product
    delete(id) {
        let products = this.getAll();
        products = products.filter(p => p.id !== id);
        this.saveAll(products);
        return true;
    },

    // Get all categories
    getCategories() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)) || DEFAULT_CATEGORIES;
        } catch (e) {
            return DEFAULT_CATEGORIES;
        }
    },

    // Save categories
    saveCategories(categories) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    },

    // Get reviews for a product or all
    getReviews(productId = null) {
        this.init();
        try {
            const allReviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || DEFAULT_REVIEWS;
            if (productId) {
                return allReviews.filter(r => r.productId === productId);
            }
            return allReviews;
        } catch (e) {
            return DEFAULT_REVIEWS;
        }
    },

    // Add a review
    addReview(reviewData) {
        const reviews = this.getReviews();
        const newReview = {
            id: 'rev-' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            verified: true,
            ...reviewData
        };
        reviews.unshift(newReview);
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));

        // Recompute product average rating
        const productReviews = reviews.filter(r => r.productId === reviewData.productId);
        const avg = productReviews.reduce((sum, r) => sum + Number(r.rating), 0) / productReviews.length;
        
        this.update(reviewData.productId, {
            rating: parseFloat(avg.toFixed(1)),
            reviewCount: productReviews.length
        });

        return newReview;
    },

    // Delete a review (Admin)
    deleteReview(reviewId) {
        let reviews = this.getReviews();
        const rev = reviews.find(r => r.id === reviewId);
        if (!rev) return false;

        reviews = reviews.filter(r => r.id !== reviewId);
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));

        // Recompute product rating
        const prodReviews = reviews.filter(r => r.productId === rev.productId);
        const avg = prodReviews.length > 0 
            ? parseFloat((prodReviews.reduce((sum, r) => sum + Number(r.rating), 0) / prodReviews.length).toFixed(1))
            : 5.0;

        this.update(rev.productId, {
            rating: avg,
            reviewCount: prodReviews.length
        });
        return true;
    },

    // Format Indian Rupee currency
    formatINR(amount) {
        return '₹' + Number(amount || 0).toLocaleString('en-IN');
    }
};

// Auto-run init
ProductDB.init();

// Expose globally
window.ProductDB = ProductDB;
window.STORAGE_KEYS = STORAGE_KEYS;

