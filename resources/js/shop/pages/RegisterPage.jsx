import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function RegisterPage() {
    const auth = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const [error, setError] = useState('')

    async function submit(event) {
        event.preventDefault()
        setError('')

        try {
            await auth.register(form)
            navigate('/')
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Registration failed')
        }
    }

    return (
        <div className="shop-container" style={{ padding: '3rem 0', maxWidth: '480px' }}>
            <h1 className="shop-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Create account</h1>
            <form className="shop-card" style={{ padding: '1.25rem', display: 'grid', gap: '0.85rem' }} onSubmit={submit}>
                <input
                    className="shop-input"
                    placeholder="Name"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    required
                />
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
                <input
                    className="shop-input"
                    type="password"
                    placeholder="Confirm password"
                    value={form.password_confirmation}
                    onChange={(event) => setForm((current) => ({ ...current, password_confirmation: event.target.value }))}
                    required
                />
                <button type="submit" className="shop-btn shop-btn-primary">Register</button>
                {error && <p style={{ color: '#f87171' }}>{error}</p>}
                <p className="shop-muted">
                    Already have an account? <Link to="/login" style={{ color: 'var(--shop-accent)' }}>Sign in</Link>
                </p>
            </form>
        </div>
    )
}
