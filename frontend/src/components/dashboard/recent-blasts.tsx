import { useEffect, useState } from "react"


export default function RecentBlasts() {
    const [blasts, setBlasts] = useState([])

    useEffect(() => {
        fetch('/api/blasts')
            .then(response => response.json())
            .then(data => setBlasts(data))
    }, [])

    return (
        <div>
            <h1>Recent Blasts</h1>
            {blasts.map(blast => (
                <div key={blast.id}>
                    <h2>{blast.name}</h2>
                    <p>{blast.subject}</p>
                    <p>{blast.message}</p>
                </div>
            ))}
        </div>
    )
}

