import React from 'react'
import { Link } from 'react-router-dom'

export default function EmailCompositionSending() {
    return (
        <div>
            <h1>Email Composition Sending</h1>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/mailinglist-management">Mailinglist Management</Link>
        </div>
    )
}
