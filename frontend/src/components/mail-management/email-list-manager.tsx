import { useEffect, useState } from "react"

export default function EmailListManager() {

    const [emailList, setEmailList] = useState()

    useEffect(() => {
        fetch("/api/email-list")
            .then(response => response.json())
            .then(data => setEmailList(data))
    }, [])

    return (
        <div>
            <h1>Email List Manager</h1>
            <div>{emailList}</div>
        </div>
    )
}
