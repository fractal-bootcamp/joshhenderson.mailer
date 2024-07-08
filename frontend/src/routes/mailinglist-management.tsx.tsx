import React from 'react'
import { Link } from 'react-router-dom'

export default function MailinglistManagement() {
    return (
        <div>
            <h1>Mailinglist Management</h1>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/email-composition-sending">Email Composition Sending</Link>
            
        </div>
    )
}
