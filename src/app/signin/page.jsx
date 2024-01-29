'use client'

import axios from 'axios';
// import useApi from '@/hook/useApi';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function SigIn() {
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({ email: "shajid@gmail.com", password: "12345", })
    const router = useRouter()

    function handleChange(e) {
        setUserInfo(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }

    async function apiLogin(e) {
        e.preventDefault()
        let loadingPromise = toast.loading("Loading...")
        try {
            setIsLoading(true)
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
            const data = await res.json()
            console.log(res, data)
            if (res.status == 200) {
                toast.success(data.message || "Login Successfully!", { id: loadingPromise })
                router.push('/')
            } else {
                toast.error(data?.error || "Some error arised", { id: loadingPromise })
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="container">
            <div className="flex flex-col items-center justify-center mx-auto mt-8">
                <div className="w-full bg-light rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="space-y-4 md:space-y-6 sm:p-8 px-4 py-8">
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Log in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={apiLogin}>
                            <div>
                                <label htmlFor="email">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="abc@company.com"
                                    required
                                    onChange={handleChange}
                                    value={userInfo.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="******"
                                    required
                                    onChange={handleChange}
                                    value={userInfo.password}
                                />
                            </div>
                            <button type='submit' className='button'>
                                Submit
                            </button>
                            <div>
                                <div className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?
                                    <Link href='/signup' className="font-medium text-indigo-500 text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
