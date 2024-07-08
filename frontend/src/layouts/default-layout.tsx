// src/layouts/default-layout.jsx
import { Link, Outlet } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Layout = () => {
    return (
        <ClerkProvider
            signInFallbackRedirectUrl={"/dashboard"}
            signUpForceRedirectUrl={"/dashboard"}
            publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        >
            <header>
                <p>Email App</p>
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <SignedIn>
                        <li>
                            <UserButton />
                        </li>
                    </SignedIn>
                    <SignedOut>
                        <li>
                            <Link to="/sign-in">Sign In</Link>
                        </li>
                        <li>
                            <Link to="/sign-up">Sign Up</Link>
                        </li>
                    </SignedOut>
                </ul>
            </header>
            <main>
                <Outlet />
            </main>
        </ClerkProvider>
    );
};

export default Layout;