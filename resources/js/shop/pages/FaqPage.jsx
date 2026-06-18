import { useState } from 'react'
import PageHero from '../components/PageHero'

const faqs = [
    {
        question: 'Is VertexShop a real store?',
        answer: 'VertexShop is a full-stack e-commerce demo. You can browse products, manage a cart, place orders, and use admin tools — but payments are simulated and no real charges are made.',
    },
    {
        question: 'How do I sign in to try the demo?',
        answer: 'Use customer@vertexshop.demo / password for a customer account, or admin@vertexshop.demo / password for admin access. You can also register a new account.',
    },
    {
        question: 'What coupon codes work at checkout?',
        answer: 'Try VERTEX10 for 10% off or DEVGEAR5 for $5 off. Coupons are validated server-side and may have minimum order requirements.',
    },
    {
        question: 'Can I track my orders?',
        answer: 'Yes. After signing in and placing an order, visit the Orders page to see order history and a visual status tracker from pending through delivered.',
    },
    {
        question: 'How does the wishlist work?',
        answer: 'Sign in, open any product page, and click "Save to wishlist." View and manage saved items from the Wishlist page in the navigation.',
    },
    {
        question: 'Is my data stored securely?',
        answer: 'Authentication uses Laravel Sanctum with session cookies. This is a demo environment — do not use real personal or payment information.',
    },
    {
        question: 'Does the site work on mobile?',
        answer: 'Absolutely. The entire storefront is mobile-responsive with a collapsible navigation menu, touch-friendly controls, and optimized image loading.',
    },
    {
        question: 'Can I leave product reviews?',
        answer: 'Authenticated users can submit a star rating and written review on any product detail page. Each user can review a product once.',
    },
]

export default function FaqPage() {
    const [openIndex, setOpenIndex] = useState(0)

    return (
        <>
            <PageHero
                badge="Help center"
                title="Frequently asked questions"
                description="Everything you need to know about shopping, accounts, orders, and the VertexShop demo."
            />

            <section className="shop-container shop-content-section" style={{ paddingBottom: '3rem', maxWidth: '800px' }}>
                <div className="shop-faq-list">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index

                        return (
                            <article key={faq.question} className={`shop-card shop-faq-item ${isOpen ? 'is-open' : ''}`}>
                                <button
                                    type="button"
                                    className="shop-faq-question"
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{faq.question}</span>
                                    <span className="shop-faq-icon">{isOpen ? '−' : '+'}</span>
                                </button>
                                {isOpen && (
                                    <p className="shop-muted shop-faq-answer">{faq.answer}</p>
                                )}
                            </article>
                        )
                    })}
                </div>
            </section>
        </>
    )
}
