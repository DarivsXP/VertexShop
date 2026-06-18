export default function PageHero({ badge, title, description, children }) {
    return (
        <section className="shop-page-hero">
            <div className="shop-container">
                {badge && <p className="shop-badge">{badge}</p>}
                <h1 className="shop-title shop-page-hero-title">{title}</h1>
                {description && (
                    <p className="shop-muted shop-page-hero-description">{description}</p>
                )}
                {children}
            </div>
        </section>
    )
}
