import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import api from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loaded, setLoaded] = useState(false)

    const fetchUser = useCallback(async () => {
        try {
            const { data } = await api.get('/user')
            setUser(data.user)
        } catch {
            setUser(null)
        } finally {
            setLoaded(true)
        }
    }, [])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    const login = useCallback(async (credentials) => {
        const { data } = await api.post('/login', credentials)
        setUser(data.user)
    }, [])

    const register = useCallback(async (payload) => {
        const { data } = await api.post('/register', payload)
        setUser(data.user)
    }, [])

    const logout = useCallback(async () => {
        await api.post('/logout')
        setUser(null)
    }, [])

    const value = useMemo(
        () => ({
            user,
            loaded,
            isAuthenticated: !!user,
            isAdmin: !!user?.is_admin,
            fetchUser,
            login,
            register,
            logout,
        }),
        [user, loaded, fetchUser, login, register, logout],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}
