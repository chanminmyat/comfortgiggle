# Comfort Zone - Premium Interior Design E-commerce

A modern Next.js e-commerce application for interior design products with WooCommerce and WordPress integration.

## Features

- Beautiful, responsive design inspired by modern interior design websites
- WooCommerce integration for product management
- WordPress checkout integration
- Shopping cart functionality with local storage
- Product browsing and search
- Product detail pages
- Secure checkout process
- About and Contact pages

## Tech Stack

- **Framework:** Next.js 13 with App Router
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **E-commerce:** WooCommerce REST API
- **Icons:** Lucide React
- **Notifications:** Sonner

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A WordPress site with WooCommerce installed
- WooCommerce REST API credentials

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd classic-comfort
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.local.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# WooCommerce Configuration
NEXT_PUBLIC_WORDPRESS_URL=https://yourwordpresssite.com
NEXT_PUBLIC_WOOCOMMERCE_URL=https://yourwordpresssite.com
WOOCOMMERCE_CONSUMER_KEY=ck_your_consumer_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_consumer_secret_here

# Optional: For WordPress authentication
WORDPRESS_AUTH_TOKEN=your_wordpress_auth_token_here
```

### WooCommerce API Setup

1. Log in to your WordPress admin panel
2. Go to WooCommerce > Settings > Advanced > REST API
3. Click "Add key"
4. Set the following:
   - Description: Comfort Zone App
   - User: Select your admin user
   - Permissions: Read/Write
5. Click "Generate API key"
6. Copy the Consumer key and Consumer secret to your `.env.local` file

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
classic-comfort/
├── app/
│   ├── about/              # About page
│   ├── cart/               # Shopping cart page
│   ├── checkout/           # Checkout page
│   ├── contact/            # Contact page
│   ├── products/           # Products listing and detail pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── header.tsx          # Site header with navigation
│   └── footer.tsx          # Site footer
├── lib/
│   ├── woocommerce.ts      # WooCommerce API integration
│   ├── cart.ts             # Cart management utilities
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Key Features Explained

### WooCommerce Integration

The app integrates with WooCommerce through REST API endpoints:
- Fetches products from your WooCommerce store
- Supports product filtering, search, and pagination
- Creates orders directly in WooCommerce

### Cart Management

- Client-side cart stored in localStorage
- Real-time cart updates across the application
- Persistent cart between sessions

### Checkout Flow

1. User adds products to cart
2. Reviews cart items
3. Fills out billing information
4. Order is created in WooCommerce
5. User is redirected to WordPress checkout for payment

## Customization

### Changing Colors

The site uses amber/gold as the primary color. To change:

1. Update Tailwind config colors in `tailwind.config.ts`
2. Search and replace color classes in components:
   - `amber-600` -> your color
   - `amber-700` -> your darker shade
   - `amber-50` -> your lightest shade

### Adding More Product Categories

Update the footer links in `components/footer.tsx` to include your product categories.

### Modifying the Home Page

Edit `app/page.tsx` to customize:
- Hero section content
- Feature cards
- Testimonials
- Call-to-action sections

## WordPress Configuration

Ensure your WordPress site has:
- WooCommerce plugin installed and activated
- REST API enabled (default in WooCommerce)
- HTTPS enabled for secure API communication
- CORS configured to allow requests from your Next.js domain

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted with PM2 or Docker

## Support

For issues or questions:
- Check the WooCommerce REST API documentation
- Review Next.js documentation
- Check your environment variables configuration

## License

MIT License - feel free to use this project for your own purposes.
