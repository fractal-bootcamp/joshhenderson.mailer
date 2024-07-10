// Importing necessary modules and hooks
import fetch from 'isomorphic-fetch' // Polyfill for fetch API
import { useState, useEffect } from 'react' // React hooks for state and lifecycle management

import { useAuth } from '@clerk/clerk-react' // Clerk authentication hook

// Default export function component for authentication
export default function Auth() {
    // State variables to manage data, loading state, and error state
    const [data, setData] = useState(null) // State to store fetched data
    const [loading, setLoading] = useState(true) // State to manage loading status
    const [error, setError] = useState(null) // State to manage errors


    const { getToken } = useAuth() // Destructuring getToken function from useAuth hook

    // useEffect hook to perform side effects (fetching data) when component mounts
    useEffect(() => {
        // Async function to fetch data from the protected endpoint
        const fetchData = async () => {
            try {
                // Get the token using getToken function
                const token = await getToken()
                // Fetch data from the protected endpoint
                const response = await fetch('http://localhost:3000/protected-endpoint', {
                    method: 'GET', // HTTP method
                    headers: {
                        'Content-Type': 'application/json', // Content type header
                        Authorization: `Bearer ${token}`, // Authorization header with Bearer token
                        mode: 'cors', // CORS mode
                    },
                })

                // Check if the response is not ok (status code not in the range 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok') // Throw an error if response is not ok
                }

                // Parse the JSON response
                const result = await response.json()
                // Update the data state with the fetched result
                setData(result)
                // Set loading state to false as data fetching is complete
                setLoading(false)
            } catch (err) {
                // Catch any errors and update the error state
                setError(err)
                // Set loading state to false as data fetching is complete
                setLoading(false)
            }
        }

        // Call the fetchData function
        fetchData()
    }, [getToken]) // Dependency array with getToken to re-run effect if getToken changes

    // Return the state variables
    return { data, loading, error }
}