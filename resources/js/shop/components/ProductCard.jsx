import { Link } from 'react-router-dom'
import LazyImage from './LazyImage'
import { useCart } from '../contexts/CartContext'

export default function ProductCard({ product, showAddToCart = true }) {
    const cart = useCart()

    return (
        <article className="shop-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
            <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <LazyImage src={product.image} alt={product.name} className="shop-product-image" />
                <p className="shop-badge" style={{ marginTop: '0.85rem' }}>{product.category?.name}</p>
                <h2 className="shop-title" style={{ fontSize: '1.05rem', margin: '0.5rem 0' }}>{product.name}</h2>
                <p className="shop-muted" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {product.description.slice(0, 90)}...
                </p>
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <strong>${product.price}</strong>
                    {product.compare_price && (
                        <span className="shop-muted" style={{ textDecoration: 'line-through' }}>
                            ${product.compare_price}
                        </span>
                    )}
                    {product.reviews_count > 0 && (
                        <span className="shop-muted" style={{ fontSize: '0.85rem' }}>
                            ★ {Number(product.reviews_avg_rating || 0).toFixed(1)} ({product.reviews_count})
                        </span>
                    )}
                </div>
            </Link>
            {showAddToCart && (
                <button
                    type="button"
                    className="shop-btn shop-btn-primary"
                    style={{ marginTop: 'auto' }}
                    onClick={() => cart.addToCart(product.id)}
                >
                    Add to cart
                </button>
            )}
        </article>
    )
}
