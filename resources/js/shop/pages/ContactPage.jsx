import { useState } from 'react'
import PageHero from '../components/PageHero'

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()
        setSubmitted(true)
        setForm({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <>
            <PageHero
                badge="Get in touch"
                title="We'd love to hear from you"
                description="Questions about orders, partnerships, or the platform? Send us a message and we'll get back to you within one business day."
            />

            <section className="shop-container shop-content-section" style={{ paddingBottom: '3rem' }}>
                <div className="shop-contact-grid">
                    <div className="shop-card shop-content-card">
                        <h2 className="shop-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contact details</h2>
                        <div className="shop-contact-item">
                            <strong>Email</strong>
                            <p className="shop-muted">hello@vertexshop.demo</p>
                        </div>
                        <div className="shop-contact-item">
                            <strong>Support hours</strong>
                            <p className="shop-muted">Mon – Fri, 9:00 AM – 6:00 PM (PHT)</p>
                        </div>
                        <div className="shop-contact-item">
                            <strong>Location</strong>
                            <p className="shop-muted">Manila, Philippines</p>
                        </div>
                        <div className="shop-contact-item">
                            <strong>Demo accounts</strong>
                            <p className="shop-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                                Customer: customer@vertexshop.demo<br />
                                Admin: admin@vertexshop.demo<br />
                                Password: password
                            </p>
                        </div>
                    </div>

                    <form className="shop-card shop-content-card" onSubmit={handleSubmit}>
                        <h2 className="shop-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Send a message</h2>

                        {submitted ? (
                            <div className="shop-contact-success">
                                <strong>Message sent!</strong>
                                <p className="shop-muted" style={{ marginTop: '0.35rem' }}>
                                    Thanks for reaching out. This is a demo form — no email was actually sent.
                                </p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '0.85rem' }}>
                                <input
                                    className="shop-input"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                                    required
                                />
                                <input
                                    className="shop-input"
                                    type="email"
                                    placeholder="Email address"
                                    value={form.email}
                                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                                    required
                                />
                                <input
                                    className="shop-input"
                                    placeholder="Subject"
                                    value={form.subject}
                                    onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                                    required
                                />
                                <textarea
                                    className="shop-input"
                                    rows={5}
                                    placeholder="How can we help?"
                                    value={form.message}
                                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                                    required
                                />
                                <button type="submit" className="shop-btn shop-btn-primary" style={{ width: 'fit-content' }}>
                                    Send message
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </section>
        </>
    )
}
