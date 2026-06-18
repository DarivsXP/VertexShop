import PageHero from '../components/PageHero'

export default function TermsPage() {
    return (
        <>
            <PageHero
                badge="Legal"
                title="Terms of service"
                description="Last updated: June 2026"
            />

            <section className="shop-container shop-legal-content">
                <div className="shop-card shop-content-card">
                    <h2>Agreement</h2>
                    <p>
                        By accessing VertexShop, you agree to these terms. This platform is a demonstration e-commerce
                        site and is provided &quot;as is&quot; without warranties of any kind.
                    </p>

                    <h2>Demo nature</h2>
                    <p>
                        All transactions are simulated. No real products are shipped and no actual payments are processed.
                        Prices, inventory, and order statuses are for demonstration purposes only.
                    </p>

                    <h2>Accounts</h2>
                    <p>
                        You are responsible for maintaining the confidentiality of your account credentials. Demo accounts
                        are provided for evaluation and may be shared with other users.
                    </p>

                    <h2>Acceptable use</h2>
                    <ul>
                        <li>Do not attempt to exploit or disrupt the platform</li>
                        <li>Do not submit unlawful, abusive, or misleading content in reviews</li>
                        <li>Do not use automated tools to scrape or overload the service</li>
                    </ul>

                    <h2>Intellectual property</h2>
                    <p>
                        The VertexShop brand, design, and codebase are owned by the project author. Product images and
                        descriptions are used for demo purposes.
                    </p>

                    <h2>Limitation of liability</h2>
                    <p>
                        We are not liable for any damages arising from use of this demo platform. Use at your own discretion.
                    </p>

                    <h2>Changes</h2>
                    <p>
                        These terms may be updated at any time. Continued use of the site constitutes acceptance of
                        revised terms.
                    </p>
                </div>
            </section>
        </>
    )
}
