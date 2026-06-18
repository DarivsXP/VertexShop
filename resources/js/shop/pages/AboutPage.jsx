import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const values = [
    {
        title: 'Quality first',
        text: 'Every product in our catalog is selected for durability, performance, and everyday developer use.',
    },
    {
        title: 'Transparent experience',
        text: 'Clear pricing, honest reviews, and straightforward policies — no hidden surprises at checkout.',
    },
    {
        title: 'Built to scale',
        text: 'VertexShop is engineered with production patterns: REST APIs, auth, admin tools, and responsive UI.',
    },
]

const team = [
    { name: 'V Cyril Darivs Egipto', role: 'Founder & Lead Developer', bio: 'Full-stack engineer passionate about Laravel, React, and polished user experiences.' },
    { name: 'Vertex Labs', role: 'Product & Design', bio: 'A small team focused on developer tools, workspace gear, and e-commerce UX.' },
]

export default function AboutPage() {
    return (
        <>
            <PageHero
                badge="Our story"
                title="Crafted for developers, by developers"
                description="VertexShop started as a portfolio project to demonstrate what a modern e-commerce platform can look like — and grew into a fully interactive demo store."
            />

            <section className="shop-container shop-content-section">
                <div className="shop-content-grid">
                    <div className="shop-card shop-content-card">
                        <h2 className="shop-title" style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>The mission</h2>
                        <p className="shop-muted" style={{ lineHeight: 1.75 }}>
                            We believe great developer tools deserve a great shopping experience. VertexShop combines
                            a curated product catalog with enterprise-grade features — authentication, cart management,
                            order tracking, wishlists, reviews, and an admin dashboard — all wired through a clean
                            Laravel REST API and a React frontend.
                        </p>
                        <p className="shop-muted" style={{ lineHeight: 1.75, marginTop: '1rem' }}>
                            Whether you&apos;re evaluating the platform as a portfolio piece or exploring the codebase,
                            every page is designed to feel like a real, standalone storefront.
                        </p>
                    </div>
                    <div className="shop-card shop-content-card shop-content-highlight">
                        <h2 className="shop-title" style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Tech stack</h2>
                        <ul className="shop-check-list">
                            <li>Laravel + Sanctum authentication</li>
                            <li>React 19 with React Router</li>
                            <li>MySQL / SQLite database</li>
                            <li>Tailwind CSS design system</li>
                            <li>Lazy images & skeleton loading</li>
                            <li>Infinite scroll product catalog</li>
                        </ul>
                        <Link to="/shop" className="shop-btn shop-btn-primary" style={{ textDecoration: 'none', marginTop: '1.25rem' }}>
                            Explore the shop
                        </Link>
                    </div>
                </div>
            </section>

            <section className="shop-container shop-content-section">
                <h2 className="shop-title shop-section-title" style={{ marginBottom: '1.25rem' }}>What we stand for</h2>
                <div className="shop-grid shop-grid-3">
                    {values.map((value) => (
                        <article key={value.title} className="shop-card shop-content-card">
                            <h3 className="shop-title" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{value.title}</h3>
                            <p className="shop-muted" style={{ lineHeight: 1.65 }}>{value.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="shop-container shop-content-section" style={{ paddingBottom: '3rem' }}>
                <h2 className="shop-title shop-section-title" style={{ marginBottom: '1.25rem' }}>Meet the team</h2>
                <div className="shop-grid shop-grid-3">
                    {team.map((member) => (
                        <article key={member.name} className="shop-card shop-content-card">
                            <div className="shop-avatar">{member.name.charAt(0)}</div>
                            <h3 className="shop-title" style={{ fontSize: '1.05rem', marginTop: '0.85rem' }}>{member.name}</h3>
                            <p className="shop-badge" style={{ marginTop: '0.35rem' }}>{member.role}</p>
                            <p className="shop-muted" style={{ lineHeight: 1.6, marginTop: '0.75rem', fontSize: '0.95rem' }}>{member.bio}</p>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}
