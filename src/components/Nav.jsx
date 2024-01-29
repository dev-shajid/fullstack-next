'use client'

import React from 'react'
import Link from 'next/link';
// import useApi from '@/hook/useApi';

export default function Nav() {
    // const { apiLogout, isLoading } = useApi()

    return (
        <header className='py-4 shadow-md dark:bg-dark dark:text-white border-b border-gray-200 dark:border-gray-800'>
            <div className="container flex flex-wrap justify-between items-center gap-2">
                <Link href={'/'} className="logo md:order-1 font-medium text-3xl">LOGO</Link>
                <div className='space-x-4 md:order-3 flex items-center'>
                    <Link href='/signin'>Signin</Link>
                    <Link href='/profile'>Profile</Link>
                    <div className='button'>Logout</div>
                </div>
            </div>
        </header>
    )
}
