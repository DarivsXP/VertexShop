import PageHero from '../components/PageHero'

export default function PrivacyPage() {
    return (
        <>
            <PageHero
                badge="Legal"
                title="Privacy policy"
                description="Last updated: June 2026"
            />

            <section className="shop-container shop-legal-content">
                <div className="shop-card shop-content-card">
                    <h2>Overview</h2>
                    <p>
                        VertexShop (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This policy describes how information
                        is handled on this demo e-commerce platform operated as a portfolio project.
                    </p>

                    <h2>Information we collect</h2>
                    <p>
                        When you register or place an order, we store account details (name, email) and order information
                        in our database. Session cookies are used for authentication via Laravel Sanctum.
                    </p>

                    <h2>How we use information</h2>
                    <ul>
                        <li>To provide account access and order history</li>
                        <li>To process demo checkout and cart functionality</li>
                        <li>To improve the platform experience</li>
                    </ul>

                    <h2>Data sharing</h2>
                    <p>
                        We do not sell or share personal data with third parties. This is a demonstration site — do not
                        enter real payment card numbers or sensitive personal information.
                    </p>

                    <h2>Cookies</h2>
                    <p>
                        Essential cookies are used for session management and CSRF protection. Theme preferences are
                        stored in localStorage.
                    </p>

                    <h2>Your rights</h2>
                    <p>
                        You may request account deletion by contacting us. As a demo, data may be reset during deployments
                        or database reseeds.
                    </p>

                    <h2>Contact</h2>
                    <p>
                        For privacy-related questions, email hello@vertexshop.demo or visit our Contact page.
                    </p>
                </div>
            </section>
        </>
    )
}
