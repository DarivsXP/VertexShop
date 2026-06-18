import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import LazyImage from '../components/LazyImage'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/ProductCardSkeleton'

const features = [
    {
        icon: '⚡',
        title: 'Lightning-fast checkout',
        text: 'Streamlined cart flow with coupon support and instant order confirmation.',
    },
    {
        icon: '🔍',
        title: 'Smart product discovery',
        text: 'Search, filter, and infinite-scroll through a curated developer gear catalog.',
    },
    {
        icon: '❤️',
        title: 'Wishlist & reviews',
        text: 'Save favorites and share honest product feedback with the community.',
    },
    {
        icon: '📦',
        title: 'Real-time order tracking',
        text: 'Follow every order from pending to delivered with a visual status timeline.',
    },
    {
        icon: '🛡️',
        title: 'Secure authentication',
        text: 'Session-based auth powered by Laravel Sanctum with role-based admin access.',
    },
    {
        icon: '📱',
        title: 'Mobile-first design',
        text: 'Responsive layouts, skeleton loading, and optimized images on every screen.',
    },
]

const steps = [
    { number: '01', title: 'Browse the catalog', text: 'Explore categories, featured picks, and detailed product pages.' },
    { number: '02', title: 'Add to cart', text: 'Adjust quantities, apply coupons like VERTEX10, and check out securely.' },
    { number: '03', title: 'Track your order', text: 'View order history and follow shipment status in your account dashboard.' },
]

const testimonials = [
    {
        quote: 'VertexShop feels like a real storefront — the cart, wishlist, and admin panel are all polished.',
        name: 'Alex Rivera',
        role: 'Frontend Engineer',
    },
    {
        quote: 'Perfect portfolio piece. The API integration and dark mode toggle show real attention to detail.',
        name: 'Mia Chen',
        role: 'Full-stack Developer',
    },
    {
        quote: 'I demo this to clients as a reference for what a modern e-commerce UX should look like.',
        name: 'Jordan Okonkwo',
        role: 'Product Designer',
    },
]

const stats = [
    { value: '120+', label: 'Products' },
    { value: '2.4k', label: 'Happy customers' },
    { value: '98%', label: 'Satisfaction rate' },
    { value: '24h', label: 'Avg. dispatch' },
]

export default function LandingPage() {
    const [featured, setFeatured] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/products', { params: { featured: true } })
            .then(({ data }) => setFeatured((data.data ?? data).slice(0, 4)))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <section className="shop-landing-hero">
                <div className="shop-container shop-landing-hero-grid">
                    <div>
                        <p className="shop-badge">Full-stack e-commerce platform</p>
                        <h1 className="shop-title shop-landing-headline">
                            Gear up.<br />
                            <span>Ship faster.</span>
                        </h1>
                        <p className="shop-muted shop-landing-lead">
                            VertexShop is a complete developer storefront — authentication, cart, wishlist,
                            reviews, order tracking, and an admin dashboard, all in one polished experience.
                        </p>
                        <div className="shop-landing-cta">
                            <Link to="/shop" className="shop-btn shop-btn-primary" style={{ textDecoration: 'none' }}>
                                Start shopping
                            </Link>
                            <Link to="/about" className="shop-btn shop-btn-ghost" style={{ textDecoration: 'none' }}>
                                Learn more
                            </Link>
                        </div>
                        <div className="shop-landing-trust">
                            <span>✓ Free demo access</span>
                            <span>✓ No real payments</span>
                            <span>✓ Try VERTEX10 coupon</span>
                        </div>
                    </div>

                    <div className="shop-landing-visual">
                        <div className="shop-landing-card shop-landing-card-main">
                            <div className="shop-landing-card-glow" />
                            <p className="shop-badge">Featured drop</p>
                            <h3 className="shop-title" style={{ fontSize: '1.35rem', margin: '0.75rem 0 0.35rem' }}>
                                DevGear Pro Kit
                            </h3>
                            <p className="shop-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                                Mechanical keyboard, desk mat, and cable kit — everything to level up your workspace.
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong style={{ fontSize: '1.5rem' }}>$149</strong>
                                <Link to="/products" className="shop-btn shop-btn-primary" style={{ textDecoration: 'none', padding: '0.55rem 1rem' }}>
                                    View
                                </Link>
                            </div>
                        </div>
                        <div className="shop-landing-card shop-landing-card-float shop-landing-card-float-1">
                            <span>🛒</span>
                            <div>
                                <strong>Cart ready</strong>
                                <p className="shop-muted" style={{ fontSize: '0.8rem' }}>3 items added</p>
                            </div>
                        </div>
                        <div className="shop-landing-card shop-landing-card-float shop-landing-card-float-2">
                            <span>★</span>
                            <div>
                                <strong>4.9 rating</strong>
                                <p className="shop-muted" style={{ fontSize: '0.8rem' }}>From 200+ reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shop-container shop-landing-stats">
                {stats.map((stat) => (
                    <div key={stat.label} className="shop-stat shop-landing-stat">
                        <strong className="shop-title" style={{ fontSize: '1.75rem' }}>{stat.value}</strong>
                        <p className="shop-muted" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>{stat.label}</p>
                    </div>
                ))}
            </section>

            <section className="shop-container" style={{ padding: '3rem 0 2rem' }}>
                <div className="shop-section-header">
                    <div>
                        <p className="shop-badge">Why VertexShop</p>
                        <h2 className="shop-title shop-section-title">Built like production</h2>
                    </div>
                    <p className="shop-muted shop-section-subtitle">
                        Every feature you&apos;d expect from a modern online store — implemented with clean REST APIs
                        and a React frontend optimized for performance.
                    </p>
                </div>
                <div className="shop-grid shop-grid-3">
                    {features.map((feature) => (
                        <article key={feature.title} className="shop-card shop-feature-card">
                            <span className="shop-feature-icon" aria-hidden="true">{feature.icon}</span>
                            <h3 className="shop-title" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p className="shop-muted" style={{ lineHeight: 1.6, fontSize: '0.95rem' }}>{feature.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="shop-landing-steps">
                <div className="shop-container">
                    <div className="shop-section-header" style={{ marginBottom: '2rem' }}>
                        <div>
                            <p className="shop-badge">How it works</p>
                            <h2 className="shop-title shop-section-title">Shop in three simple steps</h2>
                        </div>
                    </div>
                    <div className="shop-grid shop-grid-3">
                        {steps.map((step) => (
                            <article key={step.number} className="shop-card shop-step-card">
                                <span className="shop-step-number">{step.number}</span>
                                <h3 className="shop-title" style={{ fontSize: '1.15rem', margin: '0.75rem 0 0.5rem' }}>{step.title}</h3>
                                <p className="shop-muted" style={{ lineHeight: 1.6 }}>{step.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="shop-container" style={{ padding: '3rem 0' }}>
                <div className="shop-section-header">
                    <div>
                        <p className="shop-badge">Trending now</p>
                        <h2 className="shop-title shop-section-title">Featured products</h2>
                    </div>
                    <Link to="/products" className="shop-btn shop-btn-ghost" style={{ textDecoration: 'none' }}>
                        View all →
                    </Link>
                </div>
                {loading ? (
                    <ProductGridSkeleton count={4} />
                ) : (
                    <div className="shop-grid shop-grid-4">
                        {featured.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            <section className="shop-container" style={{ padding: '1rem 0 3rem' }}>
                <div className="shop-section-header" style={{ marginBottom: '1.5rem' }}>
                    <div>
                        <p className="shop-badge">Community</p>
                        <h2 className="shop-title shop-section-title">Loved by builders</h2>
                    </div>
                </div>
                <div className="shop-grid shop-grid-3">
                    {testimonials.map((item) => (
                        <blockquote key={item.name} className="shop-card shop-testimonial">
                            <p style={{ lineHeight: 1.7, marginBottom: '1.25rem' }}>&ldquo;{item.quote}&rdquo;</p>
                            <footer>
                                <strong>{item.name}</strong>
                                <p className="shop-muted" style={{ fontSize: '0.85rem' }}>{item.role}</p>
                            </footer>
                        </blockquote>
                    ))}
                </div>
            </section>

            <section className="shop-landing-cta-band">
                <div className="shop-container shop-landing-cta-band-inner">
                    <div>
                        <h2 className="shop-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                            Ready to explore the store?
                        </h2>
                        <p className="shop-muted" style={{ marginTop: '0.5rem', maxWidth: '480px' }}>
                            Sign in with a demo account or create your own. Payments are simulated — perfect for testing the full flow.
                        </p>
                    </div>
                    <div className="shop-landing-cta">
                        <Link to="/shop" className="shop-btn shop-btn-primary" style={{ textDecoration: 'none' }}>
                            Enter the shop
                        </Link>
                        <Link to="/register" className="shop-btn shop-btn-ghost" style={{ textDecoration: 'none' }}>
                            Create account
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
