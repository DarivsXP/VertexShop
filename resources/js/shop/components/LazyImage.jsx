import { useEffect, useRef, useState } from 'react'
import { PLACEHOLDER, shopImageFallback } from '../utils/images'

export default function LazyImage({
    src,
    alt,
    className = '',
    style,
    eager = false,
}) {
    const imgRef = useRef(null)
    const [loaded, setLoaded] = useState(false)
    const [visible, setVisible] = useState(eager)

    useEffect(() => {
        if (eager) {
            return undefined
        }

        const node = imgRef.current

        if (!node) {
            return undefined
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '120px' },
        )

        observer.observe(node)

        return () => observer.disconnect()
    }, [eager])

    return (
        <div ref={imgRef} className={`shop-lazy-image ${loaded ? 'is-loaded' : ''}`} style={style}>
            {!loaded && <div className="shop-skeleton shop-skeleton-image" aria-hidden="true" />}
            {visible && (
                <img
                    className={className}
                    src={src || PLACEHOLDER}
                    alt={alt}
                    loading={eager ? 'eager' : 'lazy'}
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    onError={shopImageFallback}
                />
            )}
        </div>
    )
}
