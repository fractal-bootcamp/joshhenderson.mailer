//src/auth.js

import fetch from 'isomorphic-fetch'
import { useState, useEffect } from 'react'

import { useAuth } from '@clerk/clerk-react'

export default function Auth() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { getToken } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken()
                const response = await fetch('http://localhost:3000/protected-endpoint', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        mode: 'cors',
                    },
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const result = await response.json()
                setData(result)
                setLoading(false)
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }

