export default function ProductCardSkeleton() {
    return (
        <article className="shop-card shop-product-skeleton" style={{ padding: '1rem' }}>
            <div className="shop-skeleton shop-skeleton-image" />
            <div className="shop-skeleton shop-skeleton-badge" style={{ marginTop: '0.85rem' }} />
            <div className="shop-skeleton shop-skeleton-title" />
            <div className="shop-skeleton shop-skeleton-line" />
            <div className="shop-skeleton shop-skeleton-price" />
            <div className="shop-skeleton shop-skeleton-button" style={{ marginTop: 'auto' }} />
        </article>
    )
}

export function ProductGridSkeleton({ count = 8 }) {
    return (
        <div className="shop-grid shop-grid-4">
            {Array.from({ length: count }, (_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    )
}
