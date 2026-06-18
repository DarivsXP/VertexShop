import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import LazyImage from '../components/LazyImage'
import { ProductGridSkeleton } from '../components/ProductCardSkeleton'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

export default function ProductPage() {
    const { slug } = useParams()
    const auth = useAuth()
    const cart = useCart()
    const [product, setProduct] = useState(null)
    const [review, setReview] = useState({ rating: 5, comment: '' })
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)

    async function loadProduct() {
        const { data } = await api.get(`/products/${slug}`)
        setProduct(data)
    }

    useEffect(() => {
        let active = true

        setLoading(true)

        loadProduct()
            .catch(() => {
                if (active) {
                    setProduct(null)
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false)
                }
            })

        return () => {
            active = false
        }
    }, [slug])

    async function addToCart() {
        await cart.addToCart(product.id)
        setMessage('Added to cart!')
    }

    async function toggleWishlist() {
        if (!auth.isAuthenticated) {
            return
        }

        await api.post(`/wishlist/${product.id}`)
        setMessage('Added to wishlist!')
    }

    async function submitReview(event) {
        event.preventDefault()
        await api.post(`/products/${product.id}/reviews`, review)
        await loadProduct()
        setReview({ rating: 5, comment: '' })
        setMessage('Review submitted!')
    }

    if (loading) {
        return (
            <div className="shop-container" style={{ padding: '2rem 0 3rem' }}>
                <div className="shop-grid" style={{ gridTemplateColumns: '1.1fr 1fr', gap: '2rem' }}>
                    <div className="shop-skeleton shop-skeleton-image" style={{ minHeight: '320px', borderRadius: '1rem' }} />
                    <div>
                        <div className="shop-skeleton shop-skeleton-badge" />
                        <div className="shop-skeleton shop-skeleton-title" style={{ marginTop: '0.75rem', width: '70%' }} />
                        <div className="shop-skeleton shop-skeleton-line" style={{ marginTop: '1rem' }} />
                        <div className="shop-skeleton shop-skeleton-line" style={{ width: '90%' }} />
                        <div className="shop-skeleton shop-skeleton-line" style={{ width: '80%' }} />
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="shop-container shop-empty" style={{ padding: '3rem 0' }}>
                <p className="shop-muted">Product not found.</p>
            </div>
        )
    }

    return (
        <div className="shop-container" style={{ padding: '2rem 0 3rem' }}>
            <div className="shop-product-detail">
                <LazyImage
                    src={product.image}
                    alt={product.name}
                    className="shop-product-image"
                    style={{ borderRadius: '1rem' }}
                    eager
                />
                <div>
                    <p className="shop-badge">{product.category?.name}</p>
                    <h1 className="shop-title" style={{ fontSize: '2rem', margin: '0.75rem 0' }}>{product.name}</h1>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <strong style={{ fontSize: '1.5rem' }}>${product.price}</strong>
                        {product.compare_price && (
                            <span className="shop-muted" style={{ textDecoration: 'line-through' }}>
                                ${product.compare_price}
                            </span>
                        )}
                        <span className="shop-muted">
                            ★ {Number(product.reviews_avg_rating || 0).toFixed(1)} ({product.reviews_count})
                        </span>
                    </div>
                    <p className="shop-muted" style={{ lineHeight: 1.7, marginBottom: '1.25rem' }}>{product.description}</p>
                    <p className="shop-muted" style={{ marginBottom: '1rem' }}>{product.stock} in stock</p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button type="button" className="shop-btn shop-btn-primary" onClick={addToCart}>
                            Add to cart
                        </button>
                        {auth.isAuthenticated && (
                            <button type="button" className="shop-btn shop-btn-ghost" onClick={toggleWishlist}>
                                Save to wishlist
                            </button>
                        )}
                    </div>
                    {message && (
                        <p style={{ marginTop: '1rem', color: 'var(--shop-accent)' }}>{message}</p>
                    )}
                </div>
            </div>

            <section style={{ marginTop: '3rem' }}>
                <h2 className="shop-title" style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Reviews</h2>
                {auth.isAuthenticated && (
                    <form className="shop-card" style={{ padding: '1rem', marginBottom: '1rem' }} onSubmit={submitReview}>
                        <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '480px' }}>
                            <select
                                className="shop-input"
                                value={review.rating}
                                onChange={(event) => setReview((current) => ({
                                    ...current,
                                    rating: Number(event.target.value),
                                }))}
                            >
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <option key={value} value={value}>{value} stars</option>
                                ))}
                            </select>
                            <textarea
                                className="shop-input"
                                rows={3}
                                placeholder="Share your thoughts"
                                value={review.comment}
                                onChange={(event) => setReview((current) => ({
                                    ...current,
                                    comment: event.target.value,
                                }))}
                                required
                            />
                            <button type="submit" className="shop-btn shop-btn-primary" style={{ width: 'fit-content' }}>
                                Submit review
                            </button>
                        </div>
                    </form>
                )}
                {!product.reviews?.length ? (
                    <p className="shop-muted">No reviews yet. Be the first to review this product.</p>
                ) : (
                    <div className="shop-grid shop-grid-3">
                        {product.reviews.map((item) => (
                            <article key={item.id} className="shop-card" style={{ padding: '1rem' }}>
                                <strong>{item.user?.name}</strong>
                                <p className="shop-muted" style={{ margin: '0.35rem 0' }}>★ {item.rating}</p>
                                <p>{item.comment}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
