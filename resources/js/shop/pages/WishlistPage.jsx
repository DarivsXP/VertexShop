import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import LazyImage from '../components/LazyImage'
import { ProductGridSkeleton } from '../components/ProductCardSkeleton'

export default function WishlistPage() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/wishlist')
            .then(({ data }) => setItems(data))
            .finally(() => setLoading(false))
    }, [])

    async function removeFromWishlist(productId) {
        await api.delete(`/wishlist/${productId}`)
        setItems((current) => current.filter((item) => item.product.id !== productId))
    }

    return (
        <div className="shop-container" style={{ padding: '2rem 0 3rem' }}>
            <h1 className="shop-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Wishlist</h1>

            {loading ? (
                <ProductGridSkeleton count={4} />
            ) : !items.length ? (
                <div className="shop-empty">
                    <p className="shop-muted" style={{ marginBottom: '1rem' }}>No saved items yet.</p>
                    <Link to="/products" className="shop-btn shop-btn-primary" style={{ textDecoration: 'none' }}>
                        Browse products
                    </Link>
                </div>
            ) : (
                <div className="shop-grid shop-grid-4">
                    {items.map((item) => (
                        <article key={item.id} className="shop-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                            <Link to={`/products/${item.product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <LazyImage src={item.product.image} alt={item.product.name} className="shop-product-image" />
                                <h2 className="shop-title" style={{ fontSize: '1rem', marginTop: '0.75rem' }}>{item.product.name}</h2>
                                <p className="shop-muted">${item.product.price}</p>
                            </Link>
                            <button
                                type="button"
                                className="shop-btn shop-btn-ghost"
                                style={{ marginTop: 'auto' }}
                                onClick={() => removeFromWishlist(item.product.id)}
                            >
                                Remove
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}
