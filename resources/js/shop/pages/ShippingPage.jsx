import PageHero from '../components/PageHero'

const sections = [
    {
        title: 'Free standard shipping',
        text: 'All demo orders include complimentary standard shipping. Delivery is simulated — you will see status updates in your order tracker.',
    },
    {
        title: 'Express dispatch',
        text: 'Featured items are marked for 24-hour dispatch in this demo. Real fulfillment is not performed.',
    },
    {
        title: 'Order tracking',
        text: 'Once you place an order, visit the Orders page to follow progress through pending, processing, shipped, and delivered stages.',
    },
    {
        title: 'Returns & refunds',
        text: 'As a portfolio demo, physical returns are not processed. In a production store, we would offer a 30-day return window for unused items in original packaging.',
    },
    {
        title: 'Damaged items',
        text: 'Contact us within 48 hours of simulated delivery with your order number. Replacement or refund would be arranged in a live environment.',
    },
    {
        title: 'International shipping',
        text: 'The checkout form accepts international addresses. Shipping rates and customs are not calculated in this demo.',
    },
]

export default function ShippingPage() {
    return (
        <>
            <PageHero
                badge="Support"
                title="Shipping & returns"
                description="Our policies for delivery, tracking, and returns — adapted for the VertexShop demo environment."
            />

            <section className="shop-container shop-content-section" style={{ paddingBottom: '3rem' }}>
                <div className="shop-grid shop-grid-3">
                    {sections.map((section) => (
                        <article key={section.title} className="shop-card shop-content-card">
                            <h2 className="shop-title" style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{section.title}</h2>
                            <p className="shop-muted" style={{ lineHeight: 1.65, fontSize: '0.95rem' }}>{section.text}</p>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}
