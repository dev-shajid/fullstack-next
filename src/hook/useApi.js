'use client'

import { useUserContext } from '@/context/ContextProvider'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function useApi() {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setError] = useState(false)
    const router = useRouter()
    const { user, dispatch } = useUserContext()

    axios.defaults.baseURL = 'https://fullstack-next-beige.vercel.app/'

    async function apiAuthUser() {
        let loadingPromise = toast.loading("Loading...")
        try {
            // setIsLoading(true)
            const res = await axios('/api/auth/authUser')
            console.log({ res })
            if (res.status == 200) {
                toast.success(res?.data?.message || "", { id: loadingPromise })
                dispatch({ type: 'ADD_USER', payload: res?.data?.user })
            }

        } catch (error) {
            toast.error(error?.response?.data?.error || "Some error arised", { id: loadingPromise })
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    async function apiLogin(credentials, e) {
        let loadingPromise = toast.loading("Loading...")
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post('https://shajid-store.vercel.app/api/auth/login', credentials)
            if (res.status == 200) {
                toast.success(res.data.message, { id: loadingPromise })
                router.push('/')
            } else {
                toast.error(res?.response?.data?.error || "Some error arised", { id: loadingPromise })
            }
        } catch (error) {
            console.log(error)
            return error?.response?.data
        }
        finally {
            setIsLoading(false)
        }
    }

    async function apiRegister(credentials, e) {
        let loadingPromise = toast.loading("Loading...")
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post('https://shajid-store.vercel.app/api/auth/register', credentials)
            if (res.status == 200) {
                toast.success(res.data.message, { id: loadingPromise })
                router.push('/')
            } else {
                toast.error(res?.response?.data?.error || "Some error arised", { id: loadingPromise })
            }

        } catch (error) {
            console.log(error?.response?.data)
            return error?.response?.data
        }
        finally {
            setIsLoading(false)
        }
    }

    async function apiLogout() {
        let loadingPromise = toast.loading("Loading...")
        try {
            setIsLoading(true)
            const res = await axios.get('https://shajid-store.vercel.app/api/auth/logout')
            if (res.status == 200) {
                toast.success(res.data.message, { id: loadingPromise })
                router.push('/')
            } else {
                toast.error(res?.response?.data?.error || "Some error arised", { id: loadingPromise })
            }

        } catch (error) {
            console.log(error?.response?.data)
            return error?.response?.data
        }
        finally {
            setIsLoading(false)
        }
    }


    return {
        apiAuthUser,
        isLoading,
        isError,
        apiLogin,
        apiRegister,
        apiLogout,
    }
}
