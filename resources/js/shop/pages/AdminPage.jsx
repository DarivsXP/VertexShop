import { useEffect, useState } from 'react'
import api from '../api'

export default function AdminPage() {
    const [dashboard, setDashboard] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/admin/dashboard')
            .then(({ data }) => setDashboard(data))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="shop-container" style={{ padding: '2rem 0 3rem' }}>
                <div className="shop-skeleton shop-skeleton-title" style={{ width: '240px', marginBottom: '1.5rem' }} />
                <div className="shop-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                    {Array.from({ length: 4 }, (_, index) => (
                        <div key={index} className="shop-stat">
                            <div className="shop-skeleton shop-skeleton-line" />
                            <div className="shop-skeleton shop-skeleton-title" style={{ marginTop: '0.75rem' }} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (!dashboard) {
        return null
    }

    return (
        <div className="shop-container" style={{ padding: '2rem 0 3rem' }}>
            <h1 className="shop-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Admin dashboard</h1>

            <div className="shop-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="shop-stat">
                    <p className="shop-muted">Products</p>
                    <strong style={{ fontSize: '1.6rem' }}>{dashboard.stats.products}</strong>
                </div>
                <div className="shop-stat">
                    <p className="shop-muted">Orders</p>
                    <strong style={{ fontSize: '1.6rem' }}>{dashboard.stats.orders}</strong>
                </div>
                <div className="shop-stat">
                    <p className="shop-muted">Customers</p>
                    <strong style={{ fontSize: '1.6rem' }}>{dashboard.stats.customers}</strong>
                </div>
                <div className="shop-stat">
                    <p className="shop-muted">Revenue</p>
                    <strong style={{ fontSize: '1.6rem' }}>${dashboard.stats.revenue.toFixed(2)}</strong>
                </div>
            </div>

            <div className="shop-admin-layout">
                <section className="shop-card" style={{ padding: '1rem' }}>
                    <h2 className="shop-title" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Recent orders</h2>
                    <div className="shop-table-wrap">
                        <table className="shop-table">
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboard.recent_orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.order_number}</td>
                                        <td>{order.user?.name}</td>
                                        <td>${order.total}</td>
                                        <td><span className="shop-badge">{order.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="shop-card" style={{ padding: '1rem' }}>
                    <h2 className="shop-title" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Low stock</h2>
                    {dashboard.low_stock.map((product) => (
                        <div
                            key={product.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '0.55rem 0',
                                borderBottom: '1px solid var(--shop-border)',
                            }}
                        >
                            <span>{product.name}</span>
                            <span className="shop-muted">{product.stock} left</span>
                        </div>
                    ))}
                </section>
            </div>

            <p className="shop-muted" style={{ marginTop: '1.5rem' }}>Admin login: admin@vertexshop.demo / password</p>
        </div>
    )
}
