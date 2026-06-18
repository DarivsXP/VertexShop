import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const shopLinks = [
    { to: '/shop', label: 'Shop home' },
    { to: '/products', label: 'All products' },
    { to: '/cart', label: 'Cart' },
    { to: '/wishlist', label: 'Wishlist' },
]

const companyLinks = [
    { to: '/about', label: 'About us' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
]

const supportLinks = [
    { to: '/shipping', label: 'Shipping & returns' },
    { to: '/contact', label: 'Help center' },
    { to: '/faq', label: 'Order support' },
]

const legalLinks = [
    { to: '/privacy', label: 'Privacy policy' },
    { to: '/terms', label: 'Terms of service' },
]

function FooterColumn({ title, links }) {
    return (
        <div>
            <h3 className="shop-footer-heading">{title}</h3>
            <ul className="shop-footer-links">
                {links.map((link) => (
                    <li key={link.to + link.label}>
                        <Link to={link.to}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function SiteFooter() {
    const auth = useAuth()

    return (
        <footer className="shop-site-footer">
            <div className="shop-container">
                <div className="shop-footer-grid">
                    <div className="shop-footer-brand">
                        <Link to="/" className="shop-title shop-footer-logo">
                            Vertex<span>Shop</span>
                        </Link>
                        <p className="shop-muted">
                            Premium developer gear and a production-grade e-commerce experience — built to showcase
                            modern full-stack craftsmanship.
                        </p>
                        <div className="shop-footer-social">
                            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
                            <a href="https://cyrilegipto.space" target="_blank" rel="noreferrer" aria-label="Portfolio">↗</a>
                        </div>
                    </div>

                    <FooterColumn title="Shop" links={shopLinks} />
                    <FooterColumn title="Company" links={companyLinks} />
                    <FooterColumn title="Support" links={supportLinks} />
                    <FooterColumn title="Legal" links={legalLinks} />
                </div>

                <div className="shop-footer-bottom">
                    <span className="shop-muted">© {new Date().getFullYear()} VertexShop. All rights reserved.</span>
                    <div className="shop-footer-bottom-links">
                        {!auth.isAuthenticated ? (
                            <Link to="/login">Sign in</Link>
                        ) : (
                            <Link to="/orders">My orders</Link>
                        )}
                        <a href="https://cyrilegipto.space">Portfolio</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
