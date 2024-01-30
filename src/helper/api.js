'use server'

import axios from 'axios'

axios.defaults.baseURL = 'https://fullstack-next-beige.vercel.app'

export const submitAddItemManagerForm = async (values) => {
    alert(JSON.stringify(values, null, 2))
}

export const submitTeacherForm = async (values) => {
    alert(JSON.stringify(values, null, 2))
}

const getAllUser = async () => {
    const res = await fetch(`https://fullstack-next-beige.vercel.app/api/user`)
    return res.json()
}