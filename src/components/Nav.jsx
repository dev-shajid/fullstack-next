'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useUserContext } from '@/context/ContextProvider';
import useApi from '@/hook/useApi';

export default function Nav() {
    const { user, dispatch } = useUserContext()
    const { apiAuthUser, isLoading } = useApi()

    async function apiLogout(e) {
        // e.preventDefault()
        let loadingPromise = toast.loading("Loading...")
        try {
            // setIsLoading(true)
            const res = await fetch('https://fullstack-next-beige.vercel.app/api/auth/logout')
            const data = await res.json()
            // console.log({res, data})
            if (res.status == 200) {
                toast.success(data.message || "Logout Successfully!", { id: loadingPromise })
                dispatch({ type: 'REMOVE_USER' })
            } else {
                toast.error(data?.error || "Some error arised", { id: loadingPromise })
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            // setIsLoading(false)
        }
    }

    // async function apiAuthUser() {
    //     let loadingPromise = toast.loading("Loading...")
    //     try {
    //         // setIsLoading(true)
    //         const res = await fetch('https://fullstack-next-beige.vercel.app/api/auth/authUser')
    //         const data = await res.json()
    //         // console.log({res, data})
    //         if (res.status == 200) {
    //             console.log(data)
    //             dispatch({ type: 'ADD_USER', payload: data.user })
    //             toast.success("Authorized Succesfully!", { id: loadingPromise })
    //         } else {
    //             toast.error(data?.error || "Not authorized, sign in please!", { id: loadingPromise })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     finally {
    //         // setIsLoading(false)
    //     }
    // }

    useEffect(() => {
        if (!user) apiAuthUser()
    }, [])



    return (
        <header className='py-4 shadow-md dark:bg-dark dark:text-white border-b border-gray-200 dark:border-gray-800'>
            <div className="container flex flex-wrap justify-between items-center gap-2">
                <Link href={'/'} className="logo md:order-1 font-medium text-3xl">LOGO</Link>
                <div className='space-x-4 md:order-3 flex items-center'>
                    {
                        user ?
                            <>
                                <Link href='/profile'>Profile</Link>
                                <div onClick={apiLogout} className='button cursor-pointer'>Logout</div>
                            </> :
                            <Link href='/signin'>Signin</Link>
                    }
                </div>
            </div>
        </header>
    )
}
