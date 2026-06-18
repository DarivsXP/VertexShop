import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
    const [isLight, setIsLight] = useState(
        () => localStorage.getItem('vertexshop-theme') === 'light',
    )

    useEffect(() => {
        document.body.classList.toggle('light', isLight)
        localStorage.setItem('vertexshop-theme', isLight ? 'light' : 'dark')
    }, [isLight])

    const toggleTheme = useCallback(() => {
        setIsLight((current) => !current)
    }, [])

    const value = useMemo(
        () => ({
            isLight,
            toggleTheme,
        }),
        [isLight, toggleTheme],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }

    return context
}
