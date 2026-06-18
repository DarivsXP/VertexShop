import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { ProductGridSkeleton } from '../components/ProductCardSkeleton'

const LandingPage = lazy(() => import('../pages/LandingPage'))
const ShopHomePage = lazy(() => import('../pages/ShopHomePage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const FaqPage = lazy(() => import('../pages/FaqPage'))
const ShippingPage = lazy(() => import('../pages/ShippingPage'))
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'))
const TermsPage = lazy(() => import('../pages/TermsPage'))
const ProductsPage = lazy(() => import('../pages/ProductsPage'))
const ProductPage = lazy(() => import('../pages/ProductPage'))
const CartPage = lazy(() => import('../pages/CartPage'))
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'))
const OrdersPage = lazy(() => import('../pages/OrdersPage'))
const WishlistPage = lazy(() => import('../pages/WishlistPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const AdminPage = lazy(() => import('../pages/AdminPage'))

function PageLoader({ children }) {
    return (
        <Suspense fallback={(
            <div className="shop-container" style={{ padding: '2rem 0' }}>
                <ProductGridSkeleton count={4} />
            </div>
        )}>
            {children}
        </Suspense>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <PageLoader>
                        <LandingPage />
                    </PageLoader>
                ),
            },
            {
                path: 'shop',
                element: (
                    <PageLoader>
                        <ShopHomePage />
                    </PageLoader>
                ),
            },
            {
                path: 'about',
                element: (
                    <PageLoader>
                        <AboutPage />
                    </PageLoader>
                ),
            },
            {
                path: 'contact',
                element: (
                    <PageLoader>
                        <ContactPage />
                    </PageLoader>
                ),
            },
            {
                path: 'faq',
                element: (
                    <PageLoader>
                        <FaqPage />
                    </PageLoader>
                ),
            },
            {
                path: 'shipping',
                element: (
                    <PageLoader>
                        <ShippingPage />
                    </PageLoader>
                ),
            },
            {
                path: 'privacy',
                element: (
                    <PageLoader>
                        <PrivacyPage />
                    </PageLoader>
                ),
            },
            {
                path: 'terms',
                element: (
                    <PageLoader>
                        <TermsPage />
                    </PageLoader>
                ),
            },
            {
                path: 'products',
                element: (
                    <PageLoader>
                        <ProductsPage />
                    </PageLoader>
                ),
            },
            {
                path: 'products/:slug',
                element: (
                    <PageLoader>
                        <ProductPage />
                    </PageLoader>
                ),
            },
            {
                path: 'cart',
                element: (
                    <PageLoader>
                        <CartPage />
                    </PageLoader>
                ),
            },
            {
                path: 'checkout',
                element: (
                    <PageLoader>
                        <ProtectedRoute>
                            <CheckoutPage />
                        </ProtectedRoute>
                    </PageLoader>
                ),
            },
            {
                path: 'orders',
                element: (
                    <PageLoader>
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    </PageLoader>
                ),
            },
            {
                path: 'wishlist',
                element: (
                    <PageLoader>
                        <ProtectedRoute>
                            <WishlistPage />
                        </ProtectedRoute>
                    </PageLoader>
                ),
            },
            {
                path: 'login',
                element: (
                    <PageLoader>
                        <ProtectedRoute guest>
                            <LoginPage />
                        </ProtectedRoute>
                    </PageLoader>
                ),
            },
            {
                path: 'register',
                element: (
                    <PageLoader>
                        <ProtectedRoute guest>
                            <RegisterPage />
                        </ProtectedRoute>
                    </PageLoader>
                ),
            },
            {
                path: 'admin',
                element: (
                    <PageLoader>
                        <ProtectedRoute admin>
                            <AdminPage />
                        </ProtectedRoute>
                    </PageLoader>
                ),
            },
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
])

export default router
