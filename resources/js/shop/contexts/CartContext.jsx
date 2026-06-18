import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import api from '../api'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [items, setItems] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)

    const applyCart = useCallback((data) => {
        setItems(data.items)
        setSubtotal(data.subtotal)
        setCount(data.count)
    }, [])

    const fetchCart = useCallback(async () => {
        setLoading(true)

        try {
            const { data } = await api.get('/cart')
            applyCart(data)
        } finally {
            setLoading(false)
        }
    }, [applyCart])

    const addToCart = useCallback(async (productId, quantity = 1) => {
        const { data } = await api.post('/cart', { product_id: productId, quantity })
        applyCart(data)
    }, [applyCart])

    const updateItem = useCallback(async (itemId, quantity) => {
        const { data } = await api.patch(`/cart/${itemId}`, { quantity })
        applyCart(data)
    }, [applyCart])

    const removeItem = useCallback(async (itemId) => {
        const { data } = await api.delete(`/cart/${itemId}`)
        applyCart(data)
    }, [applyCart])

    const value = useMemo(
        () => ({
            items,
            subtotal,
            count,
            loading,
            fetchCart,
            addToCart,
            updateItem,
            removeItem,
        }),
        [items, subtotal, count, loading, fetchCart, addToCart, updateItem, removeItem],
    )

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }

    return context
}
