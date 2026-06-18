import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LazyImage from '../components/LazyImage'
import { useCart } from '../contexts/CartContext'

export default function CartPage() {
    const { items, subtotal, loading, fetchCart, updateItem, removeItem } = useCart()

    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    return (
        <div className="shop-container" style={{ padding: '2rem 0 3rem' }}>
            <h1 className="shop-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Your cart</h1>

            {loading && !items.length ? (
                <div className="shop-card" style={{ padding: '2rem' }}>
                    <div className="shop-skeleton shop-skeleton-line" />
                    <div className="shop-skeleton shop-skeleton-line" style={{ width: '80%', marginTop: '0.75rem' }} />
                </div>
            ) : !items.length ? (
                <div className="shop-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <p className="shop-muted" style={{ marginBottom: '1rem' }}>Your cart is empty.</p>
                    <Link to="/products" className="shop-btn shop-btn-primary" style={{ textDecoration: 'none' }}>
                        Browse products
                    </Link>
                </div>
            ) : (
                <div className="shop-cart-layout">
                    <div className="shop-card" style={{ padding: '1rem' }}>
                        {items.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '0.85rem 0',
                                    borderBottom: '1px solid var(--shop-border)',
                                }}
                            >
                                <LazyImage
                                    src={item.product.image}
                                    alt={item.product.name}
                                    style={{ width: '96px', height: '72px', borderRadius: '0.65rem', flexShrink: 0 }}
                                />
                                <div style={{ flex: 1 }}>
                                    <strong>{item.product.name}</strong>
                                    <p className="shop-muted">${item.product.price} each</p>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'center' }}>
                                        <button
                                            type="button"
                                            className="shop-btn shop-btn-ghost"
                                            style={{ padding: '0.35rem 0.7rem' }}
                                            onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            type="button"
                                            className="shop-btn shop-btn-ghost"
                                            style={{ padding: '0.35rem 0.7rem' }}
                                            onClick={() => updateItem(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <button
                                            type="button"
                                            className="shop-btn shop-btn-ghost"
                                            style={{ padding: '0.35rem 0.7rem', marginLeft: 'auto' }}
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="shop-card" style={{ padding: '1.25rem', height: 'fit-content' }}>
                        <h2 className="shop-title" style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Order summary</h2>
                        <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span className="shop-muted">Subtotal</span>
                            <strong>${subtotal.toFixed(2)}</strong>
                        </p>
                        <Link
                            to="/checkout"
                            className="shop-btn shop-btn-primary"
                            style={{ width: '100%', textDecoration: 'none', marginTop: '1rem', display: 'flex' }}
                        >
                            Proceed to checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
