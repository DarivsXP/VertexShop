import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api'

const STATUS_STEPS = ['pending', 'processing', 'shipped', 'delivered']

function OrderTracker({ status }) {
    const currentIndex = STATUS_STEPS.indexOf(status)

    return (
        <div className="shop-order-tracker">
            {STATUS_STEPS.map((step, index) => {
                const isComplete = currentIndex >= index
                const isCurrent = currentIndex === index

                return (
                    <div key={step} className={`shop-tracker-step ${isComplete ? 'is-complete' : ''} ${isCurrent ? 'is-current' : ''}`}>
                        <span className="shop-tracker-dot" />
                        <span className="shop-tracker-label">{step}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default function OrdersPage() {
    const [searchParams] = useSearchParams()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const notice = searchParams.get('placed') || ''

    useEffect(() => {
        api.get('/orders')
            .then(({ data }) => setOrders(data.data))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="shop-container" style={{ padding: '2rem 0 3rem' }}>
            <h1 className="shop-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Order history</h1>

            {notice && (
                <p className="shop-card" style={{ padding: '1rem', marginBottom: '1rem', color: 'var(--shop-accent)' }}>
                    Order {notice} placed successfully!
                </p>
            )}

            {loading ? (
                <div className="shop-grid" style={{ gap: '1rem' }}>
                    {Array.from({ length: 3 }, (_, index) => (
                        <div key={index} className="shop-card" style={{ padding: '1.25rem' }}>
                            <div className="shop-skeleton shop-skeleton-line" />
                            <div className="shop-skeleton shop-skeleton-line" style={{ width: '60%', marginTop: '0.75rem' }} />
                        </div>
                    ))}
                </div>
            ) : !orders.length ? (
                <p className="shop-muted">No orders yet.</p>
            ) : (
                <div className="shop-grid" style={{ gap: '1rem' }}>
                    {orders.map((order) => (
                        <article key={order.id} className="shop-card" style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                                <div>
                                    <strong>{order.order_number}</strong>
                                    <p className="shop-muted">{new Date(order.created_at).toLocaleString()}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span className="shop-badge">{order.status}</span>
                                    <p style={{ marginTop: '0.5rem' }}><strong>${order.total}</strong></p>
                                </div>
                            </div>

                            <OrderTracker status={order.status} />

                            <ul style={{ marginTop: '1rem', paddingLeft: '1rem' }}>
                                {order.items.map((item) => (
                                    <li key={item.id} className="shop-muted">
                                        {item.quantity} × {item.product_name} — ${item.price}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}
