import { useState } from 'react'

export default function composition() {
    const [composition, setComposition] = useState("")
    return (
        <div>{composition}</div>
    )
}
