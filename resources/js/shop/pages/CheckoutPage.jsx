import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { useCart } from '../contexts/CartContext'

export default function CheckoutPage() {
    const navigate = useNavigate()
    const cart = useCart()
    const [form, setForm] = useState({
        shipping_address: {
            name: '',
            line1: '',
            city: '',
            country: 'Philippines',
            postal_code: '',
        },
        coupon_code: '',
        notes: '',
    })
    const [discount, setDiscount] = useState(0)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    function updateAddress(field, value) {
        setForm((current) => ({
            ...current,
            shipping_address: {
                ...current.shipping_address,
                [field]: value,
            },
        }))
    }

    async function applyCoupon() {
        setError('')

        try {
            const { data } = await api.post('/coupons/validate', {
                code: form.coupon_code,
                subtotal: cart.subtotal,
            })
            setDiscount(data.discount)
            setMessage(`Coupon applied! You save $${data.discount.toFixed(2)}`)
        } catch (requestError) {
            setDiscount(0)
            setError(requestError.response?.data?.message || 'Invalid coupon')
        }
    }

    async function placeOrder(event) {
        event.preventDefault()
        setError('')

        try {
            const { data } = await api.post('/checkout', form)
            await cart.fetchCart()
            navigate(`/orders?placed=${data.order.order_number}`)
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Checkout failed')
        }
    }

    return (
        <div className="shop-container" style={{ padding: '2rem 0 3rem' }}>
            <h1 className="shop-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Checkout</h1>

            <div className="shop-checkout-layout">
                <form className="shop-card" style={{ padding: '1.25rem', display: 'grid', gap: '0.85rem' }} onSubmit={placeOrder}>
                    <h2 className="shop-title" style={{ fontSize: '1.1rem' }}>Shipping details</h2>
                    <input
                        className="shop-input"
                        placeholder="Full name"
                        value={form.shipping_address.name}
                        onChange={(event) => updateAddress('name', event.target.value)}
                        required
                    />
                    <input
                        className="shop-input"
                        placeholder="Address line"
                        value={form.shipping_address.line1}
                        onChange={(event) => updateAddress('line1', event.target.value)}
                        required
                    />
                    <input
                        className="shop-input"
                        placeholder="City"
                        value={form.shipping_address.city}
                        onChange={(event) => updateAddress('city', event.target.value)}
                        required
                    />
                    <input
                        className="shop-input"
                        placeholder="Country"
                        value={form.shipping_address.country}
                        onChange={(event) => updateAddress('country', event.target.value)}
                        required
                    />
                    <input
                        className="shop-input"
                        placeholder="Postal code"
                        value={form.shipping_address.postal_code}
                        onChange={(event) => updateAddress('postal_code', event.target.value)}
                        required
                    />
                    <textarea
                        className="shop-input"
                        rows={3}
                        placeholder="Order notes (optional)"
                        value={form.notes}
                        onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                    />
                    <button type="submit" className="shop-btn shop-btn-primary">Place demo order</button>
                    <p className="shop-muted" style={{ fontSize: '0.85rem' }}>
                        Payment is simulated for portfolio demo purposes.
                    </p>
                </form>

                <div className="shop-card" style={{ padding: '1.25rem', height: 'fit-content' }}>
                    <h2 className="shop-title" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Summary</h2>
                    <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="shop-muted">Subtotal</span>
                        <span>${cart.subtotal.toFixed(2)}</span>
                    </p>
                    <p style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <span className="shop-muted">Discount</span>
                        <span>- ${discount.toFixed(2)}</span>
                    </p>
                    <p style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '1.1rem' }}>
                        <strong>Total</strong>
                        <strong>${Math.max(cart.subtotal - discount, 0).toFixed(2)}</strong>
                    </p>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <input
                            className="shop-input"
                            placeholder="Coupon code"
                            value={form.coupon_code}
                            onChange={(event) => setForm((current) => ({ ...current, coupon_code: event.target.value }))}
                        />
                        <button type="button" className="shop-btn shop-btn-ghost" onClick={applyCoupon}>
                            Apply
                        </button>
                    </div>
                    {message && <p style={{ marginTop: '0.75rem', color: 'var(--shop-accent)' }}>{message}</p>}
                    {error && <p style={{ marginTop: '0.75rem', color: '#f87171' }}>{error}</p>}
                </div>
            </div>
        </div>
    )
}
