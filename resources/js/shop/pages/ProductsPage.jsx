import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/ProductCardSkeleton'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'

export default function ProductsPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [category, setCategory] = useState(searchParams.get('category') || '')
    const [sort, setSort] = useState('newest')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState('')

    const loadProducts = useCallback(async (pageNumber, append = false) => {
        if (append) {
            setLoadingMore(true)
        } else {
            setLoading(true)
        }

        setError('')

        try {
            const { data } = await api.get('/products', {
                params: {
                    page: pageNumber,
                    search: search || undefined,
                    category: category || undefined,
                    sort,
                },
            })

            const items = data.data ?? data

            setProducts((current) => (append ? [...current, ...items] : items))
            setHasMore(Boolean(data.next_page_url))
            setPage(pageNumber)
        } catch (requestError) {
            if (!append) {
                setProducts([])
            }

            setError(requestError.response?.data?.message || 'Could not load products. Please refresh the page.')
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }, [search, category, sort])

    useEffect(() => {
        api.get('/categories').then(({ data }) => {
            setCategories(Array.isArray(data) ? data : [])
        }).catch(() => {
            setCategories([])
        })
    }, [])

    useEffect(() => {
        setSearch(searchParams.get('search') || '')
        setCategory(searchParams.get('category') || '')
    }, [searchParams])

    useEffect(() => {
        loadProducts(1, false)
    }, [loadProducts])

    const loadMore = useCallback(() => {
        if (!loadingMore && hasMore) {
            loadProducts(page + 1, true)
        }
    }, [loadingMore, hasMore, page, loadProducts])

    const sentinelRef = useInfiniteScroll({
        hasMore,
        loading: loading || loadingMore,
        onLoadMore: loadMore,
    })

    function applyFilters() {
        navigate({
            pathname: '/products',
            search: new URLSearchParams({
                ...(search ? { search } : {}),
                ...(category ? { category } : {}),
            }).toString(),
        })
    }

    return (
        <div className="shop-container" style={{ padding: '2rem 0 3rem' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginBottom: '1.5rem',
                }}
            >
                <h1 className="shop-title" style={{ fontSize: '2rem' }}>All products</h1>
                <div className="shop-filter-bar">
                    <input
                        className="shop-input"
                        type="search"
                        placeholder="Search products..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={(event) => event.key === 'Enter' && applyFilters()}
                    />
                    <select
                        className="shop-input shop-select"
                        value={category}
                        onChange={(event) => {
                            setCategory(event.target.value)
                            navigate({
                                pathname: '/products',
                                search: new URLSearchParams({
                                    ...(search ? { search } : {}),
                                    ...(event.target.value ? { category: event.target.value } : {}),
                                }).toString(),
                            })
                        }}
                    >
                        <option value="">All categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.slug}>
                                {cat.name} ({cat.products_count})
                            </option>
                        ))}
                    </select>
                    <select
                        className="shop-input shop-select"
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                    >
                        <option value="newest">Newest</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="name">Name</option>
                    </select>
                    <button type="button" className="shop-btn shop-btn-primary" onClick={applyFilters}>
                        Apply
                    </button>
                </div>
            </div>

            {loading && <ProductGridSkeleton count={8} />}

            {!loading && error && (
                <div className="shop-empty">
                    <p style={{ color: '#f87171', marginBottom: '0.75rem' }}>{error}</p>
                    <button type="button" className="shop-btn shop-btn-ghost" onClick={() => loadProducts(1, false)}>
                        Try again
                    </button>
                </div>
            )}

            {!loading && !error && !products.length && (
                <div className="shop-empty">
                    <p className="shop-muted" style={{ marginBottom: '0.75rem' }}>
                        No products found{category ? ' in this category' : ''}.
                    </p>
                    {!categories.length && (
                        <p className="shop-muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                            Categories have not been loaded yet. If this is a fresh deploy, run the database seeder on the server.
                        </p>
                    )}
                    <Link to="/products" className="shop-btn shop-btn-primary" style={{ textDecoration: 'none' }}>
                        View all products
                    </Link>
                </div>
            )}

            {!loading && !error && products.length > 0 && (
                <>
                    <div className="shop-grid shop-grid-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {loadingMore && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <ProductGridSkeleton count={4} />
                        </div>
                    )}

                    <div ref={sentinelRef} className="shop-infinite-sentinel" aria-hidden="true" />

                    {!hasMore && products.length > 0 && (
                        <p className="shop-muted" style={{ textAlign: 'center', marginTop: '2rem' }}>
                            You&apos;ve seen all products.
                        </p>
                    )}
                </>
            )}
        </div>
    )
}
