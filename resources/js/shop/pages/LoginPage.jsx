import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [form, setForm] = useState({
        email: 'customer@vertexshop.demo',
        password: 'password',
        remember: true,
    })
    const [error, setError] = useState('')

    async function submit(event) {
        event.preventDefault()
        setError('')

        try {
            await auth.login(form)
            navigate(location.state?.redirect || '/')
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div className="shop-container" style={{ padding: '3rem 0', maxWidth: '480px' }}>
            <h1 className="shop-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Sign in</h1>
            <p className="shop-muted" style={{ marginBottom: '1.5rem' }}>Demo account: customer@vertexshop.demo / password</p>
            <form className="shop-card" style={{ padding: '1.25rem', display: 'grid', gap: '0.85rem' }} onSubmit={submit}>
                <input
                    className="shop-input"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    required
                />
                <input
                    className="shop-input"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                    required
                />
                <button type="submit" className="shop-btn shop-btn-primary">Sign in</button>
                {error && <p style={{ color: '#f87171' }}>{error}</p>}
                <p className="shop-muted">
                    No account? <Link to="/register" style={{ color: 'var(--shop-accent)' }}>Register</Link>
                </p>
            </form>
        </div>
    )
}
