import { Link } from 'react-router-dom'
import { LOGO_PATH, SITE_NAME } from '../utils/branding'

export default function BrandLogo({ className = '', showText = true, size = 36 }) {
    const content = (
        <>
            <img
                src={LOGO_PATH}
                alt={`${SITE_NAME} logo`}
                className="shop-brand-logo-image"
                width={size}
                height={size}
            />
            {showText && (
                <span className="shop-brand-logo-text">
                    Vertex<span>Shop</span>
                </span>
            )}
        </>
    )

    if (className.includes('shop-brand-logo-static')) {
        return <div className={`shop-brand-logo ${className}`}>{content}</div>
    }

    return (
        <Link to="/" className={`shop-brand-logo ${className}`}>
            {content}
        </Link>
    )
}
