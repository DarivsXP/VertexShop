import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function ProtectedRoute({ children, admin = false, guest = false }) {
    const auth = useAuth()
    const location = useLocation()

    if (!auth.loaded) {
        return (
            <div className="shop-container" style={{ padding: '3rem 0' }}>
                <div className="shop-skeleton shop-skeleton-line" />
            </div>
        )
    }

    if (guest && auth.isAuthenticated) {
        return <Navigate to="/" replace />
    }

    if (!guest && !auth.isAuthenticated) {
        return <Navigate to="/login" replace state={{ redirect: location.pathname }} />
    }

    if (admin && !auth.isAdmin) {
        return <Navigate to="/" replace />
    }

    return children
}
