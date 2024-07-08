import { Link } from 'react-router-dom'
import RecentBlasts from '../components/dashboard/recent-blasts'

export default function Dashboard() {


    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/dashboard/email-composition-sending">Email Composition Sending</Link>
            <Link to="/dashboard/mailinglist-management">Mailinglist Management</Link>
            <RecentBlasts />
        </div>
    )
}
