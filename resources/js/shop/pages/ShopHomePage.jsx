import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import LazyImage from '../components/LazyImage'
import PageHero from '../components/PageHero'
import { ProductGridSkeleton } from '../components/ProductCardSkeleton'
import ProductCard from '../components/ProductCard'

export default function ShopHomePage() {
    const [categories, setCategories] = useState([])
    const [featured, setFeatured] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let active = true

        async function load() {
            try {
                const [catRes, prodRes] = await Promise.all([
                    api.get('/categories'),
                    api.get('/products', { params: { featured: true } }),
                ])

                if (!active) {
                    return
                }

                setCategories(catRes.data)
                setFeatured(prodRes.data.data ?? prodRes.data)
            } finally {
                if (active) {
                    setLoading(false)
                }
            }
        }

        load()

        return () => {
            active = false
        }
    }, [])

    return (
        <>
            <PageHero
                badge="VertexShop Store"
                title="Developer gear for builders who ship."
                description="Browse curated categories, discover featured picks, and add your favorites to cart or wishlist."
            >
                <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                    <Link to="/products" className="shop-btn shop-btn-primary" style={{ textDecoration: 'none' }}>
                        Browse all products
                    </Link>
                    <Link to="/login" className="shop-btn shop-btn-ghost" style={{ textDecoration: 'none' }}>
                        Demo login
                    </Link>
                </div>
            </PageHero>

            <section className="shop-container" style={{ padding: '2rem 0 1rem' }}>
                <div className="shop-section-header" style={{ marginBottom: '1rem' }}>
                    <h2 className="shop-title shop-section-title">Shop by category</h2>
                    <Link to="/products" className="shop-muted" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                        View all →
                    </Link>
                </div>
                {loading ? (
                    <div className="shop-grid shop-grid-4">
                        {Array.from({ length: 4 }, (_, index) => (
                            <div key={index} className="shop-card shop-product-skeleton" style={{ padding: '1rem' }}>
                                <div className="shop-skeleton shop-skeleton-image" />
                                <div className="shop-skeleton shop-skeleton-title" style={{ marginTop: '0.85rem' }} />
                                <div className="shop-skeleton shop-skeleton-line" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="shop-grid shop-grid-4">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/products?category=${category.slug}`}
                                className="shop-card shop-category-card"
                            >
                                <LazyImage
                                    src={category.image}
                                    alt={category.name}
                                    className="shop-product-image"
                                    style={{ marginBottom: '0.85rem' }}
                                />
                                <h3 className="shop-title" style={{ fontSize: '1.05rem' }}>{category.name}</h3>
                                <p className="shop-muted" style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>
                                    {category.products_count} products
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            <section className="shop-container" style={{ padding: '2rem 0 3rem' }}>
                <div className="shop-section-header" style={{ marginBottom: '1rem' }}>
                    <h2 className="shop-title shop-section-title">Featured picks</h2>
                </div>
                {loading ? (
                    <ProductGridSkeleton count={4} />
                ) : (
                    <div className="shop-grid shop-grid-4">
                        {featured.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}
