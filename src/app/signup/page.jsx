'use client'

// import useApi from '@/hook/useApi';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SigIn() {
    // const { isLoading, apiLogin } = useApi()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({ name: "Mohammed Sajidul Islam", email: "shajid@gmail.com", password: "12345", })

    function handleChange(e) {
        setUserInfo(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }



    async function apiRegister(e) {
        e.preventDefault()
        let loadingPromise = toast.loading("Loading...")
        try {
            setIsLoading(true)
            const res = await fetch('https://fullstack-next-beige.vercel.app/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
            const data = await res.json()
            console.log(res, data)
            if (res.status == 200) {
                toast.success(data.message || "Registered Successfully!", { id: loadingPromise })
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
                            Create a new account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={apiRegister}>
                            <div>
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Jon Doe"
                                    required
                                    onChange={handleChange}
                                    value={userInfo.name}
                                />
                            </div>
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
                                    Already registerd?
                                    <Link href='/signin' className="font-medium text-indigo-500 text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
