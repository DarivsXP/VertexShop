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

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileOpen])

    const isActive = (to) => location.pathname === to
        || (to !== '/' && location.pathname.startsWith(to))

    const navLink = (to, label, accent = false) => (
        <Link
            to={to}
            onClick={() => setMobileOpen(false)}
            className={isActive(to) ? 'shop-nav-link is-active' : 'shop-nav-link'}
            style={accent ? { color: 'var(--shop-accent)' } : undefined}
        >
            {label}
        </Link>
    )

    const mobileNavLink = (to, label, accent = false) => (
        <Link
            to={to}
            onClick={() => setMobileOpen(false)}
            className={`shop-mobile-nav-link${isActive(to) ? ' is-active' : ''}${accent ? ' is-accent' : ''}`}
        >
            {label}
        </Link>
    )

    const accountLinks = (
        <>
            {auth.isAuthenticated && navLink('/orders', 'Orders')}
            {auth.isAuthenticated && navLink('/wishlist', 'Wishlist')}
            {auth.isAdmin && navLink('/admin', 'Admin', true)}
        </>
    )

    const mobileAccountLinks = (
        <>
            {auth.isAuthenticated && mobileNavLink('/orders', 'Orders')}
            {auth.isAuthenticated && mobileNavLink('/wishlist', 'Wishlist')}
            {auth.isAdmin && mobileNavLink('/admin', 'Admin', true)}
        </>
    )

    return (
        <div className="shop-app-shell">
            <div className="shop-demo-banner">
                <span className="shop-container shop-demo-banner-text">
                    Demo store — payments simulated. Try coupon <strong>VERTEX10</strong> at checkout.
                </span>
            </div>

            <header className="shop-nav">
                <div className="shop-container shop-nav-inner">
                    <BrandLogo className="shop-nav-logo" />

                    <nav className="shop-hide-mobile shop-nav-links" aria-label="Main">
                        {mainNav.map((item) => navLink(item.to, item.label))}
                        {accountLinks}
                    </nav>

                    <div className="shop-nav-actions">
                        <button
                            type="button"
                            className="shop-btn shop-btn-ghost shop-hide-mobile shop-nav-icon-btn"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {isLight ? '🌙' : '☀️'}
                        </button>

                        <Link to="/cart" className="shop-btn shop-btn-ghost shop-nav-cart shop-nav-icon-btn" aria-label={`Cart, ${count} items`}>
                            <span className="shop-nav-cart-icon" aria-hidden="true">🛒</span>
                            <span className="shop-hide-mobile">Cart ({count})</span>
                            <span className="shop-show-mobile shop-nav-cart-badge">{count}</span>
                        </Link>

                        {!auth.isAuthenticated ? (
                            <Link to="/login" className="shop-btn shop-btn-primary shop-nav-signin shop-hide-mobile">
                                Sign in
                            </Link>
                        ) : (
                            <button type="button" className="shop-btn shop-btn-ghost shop-hide-mobile" onClick={() => auth.logout()}>
                                Logout
                            </button>
                        )}

                        <button
                            type="button"
                            className={`shop-menu-toggle shop-show-mobile${mobileOpen ? ' is-open' : ''}`}
                            onClick={() => setMobileOpen((open) => !open)}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                            aria-controls="shop-mobile-menu"
                        >
                            <span className="shop-menu-toggle-bar" />
                            <span className="shop-menu-toggle-bar" />
                            <span className="shop-menu-toggle-bar" />
                        </button>
                    </div>
                </div>
            </header>

            {mobileOpen && (
                <button
                    type="button"
                    className="shop-mobile-backdrop shop-show-mobile"
                    aria-label="Close menu"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <nav
                id="shop-mobile-menu"
                className={`shop-mobile-drawer shop-show-mobile${mobileOpen ? ' is-open' : ''}`}
                aria-label="Mobile"
                aria-hidden={!mobileOpen}
            >
                <div className="shop-mobile-drawer-header">
                    <BrandLogo className="shop-nav-logo" showText={false} size={32} />
                    <button
                        type="button"
                        className="shop-btn shop-btn-ghost shop-nav-icon-btn"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

                <div className="shop-mobile-drawer-body">
                    <div className="shop-mobile-nav-group">
                        <span className="shop-mobile-nav-label">Browse</span>
                        {mainNav.map((item) => mobileNavLink(item.to, item.label))}
                    </div>

                    {(auth.isAuthenticated || auth.isAdmin) && (
                        <div className="shop-mobile-nav-group">
                            <span className="shop-mobile-nav-label">Account</span>
                            {mobileAccountLinks}
                        </div>
                    )}

                    <div className="shop-mobile-nav-group">
                        <span className="shop-mobile-nav-label">Preferences</span>
                        <button
                            type="button"
                            className="shop-mobile-nav-link shop-mobile-nav-button"
                            onClick={toggleTheme}
                        >
                            {isLight ? '🌙 Dark mode' : '☀️ Light mode'}
                        </button>
                    </div>
                </div>

                <div className="shop-mobile-drawer-footer">
                    {!auth.isAuthenticated ? (
                        <Link
                            to="/login"
                            className="shop-btn shop-btn-primary shop-mobile-auth-btn"
                            onClick={() => setMobileOpen(false)}
                        >
                            Sign in
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className="shop-btn shop-btn-ghost shop-mobile-auth-btn"
                            onClick={() => {
                                setMobileOpen(false)
                                auth.logout()
                            }}
                        >
                            Log out
                        </button>
                    )}
                </div>
            </nav>

            <main className="shop-main">
                <Outlet />
            </main>

            <SiteFooter />
        </div>
    )
}
