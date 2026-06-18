import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useTheme } from '../contexts/ThemeContext'
import SiteFooter from './SiteFooter'
import BrandLogo from './BrandLogo'

const mainNav = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
]

export default function Layout() {
    const auth = useAuth()
    const { count, fetchCart } = useCart()
    const { isLight, toggleTheme } = useTheme()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    useEffect(() => {
        setMobileOpen(false)
        window.scrollTo(0, 0)
    }, [location.pathname])

    const navLink = (to, label, accent = false) => {
        const isActive = location.pathname === to
            || (to !== '/' && location.pathname.startsWith(to))

        return (
            <Link
                to={to}
                onClick={() => setMobileOpen(false)}
                className={isActive ? 'shop-nav-link is-active' : 'shop-nav-link'}
                style={accent ? { color: 'var(--shop-accent)' } : undefined}
            >
                {label}
            </Link>
        )
    }

    return (
        <div className="shop-app-shell">
            <div className="shop-demo-banner">
                <span className="shop-container">
                    Demo store only — payments are simulated. Try coupon <strong>VERTEX10</strong> at checkout.
                </span>
            </div>

            <header className="shop-nav">
                <div className="shop-container shop-nav-inner">
                    <BrandLogo className="shop-nav-logo" />

                    <nav className="shop-hide-mobile shop-nav-links">
                        {mainNav.map((item) => navLink(item.to, item.label))}
                        {auth.isAuthenticated && navLink('/orders', 'Orders')}
                        {auth.isAuthenticated && navLink('/wishlist', 'Wishlist')}
                        {auth.isAdmin && navLink('/admin', 'Admin', true)}
                    </nav>

                    <div className="shop-nav-actions">
                        <button
                            type="button"
                            className="shop-btn shop-btn-ghost shop-show-mobile"
                            style={{ padding: '0.5rem 0.85rem' }}
                            onClick={() => setMobileOpen((open) => !open)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                        >
                            ☰
                        </button>
                        <button
                            type="button"
                            className="shop-btn shop-btn-ghost"
                            style={{ padding: '0.5rem 0.85rem' }}
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {isLight ? '🌙' : '☀️'}
                        </button>
                        <Link to="/cart" className="shop-btn shop-btn-ghost shop-nav-cart">
                            Cart ({count})
                        </Link>
                        {!auth.isAuthenticated ? (
                            <Link to="/login" className="shop-btn shop-btn-primary shop-nav-signin">
                                Sign in
                            </Link>
                        ) : (
                            <button type="button" className="shop-btn shop-btn-ghost" onClick={() => auth.logout()}>
                                Logout
                            </button>
                        )}
                    </div>
                </div>

                {mobileOpen && (
                    <nav className="shop-mobile-nav shop-container">
                        {mainNav.map((item) => navLink(item.to, item.label))}
                        {auth.isAuthenticated && navLink('/orders', 'Orders')}
                        {auth.isAuthenticated && navLink('/wishlist', 'Wishlist')}
                        {auth.isAdmin && navLink('/admin', 'Admin', true)}
                    </nav>
                )}
            </header>

            <main className="shop-main">
                <Outlet />
            </main>

            <SiteFooter />
        </div>
    )
}
