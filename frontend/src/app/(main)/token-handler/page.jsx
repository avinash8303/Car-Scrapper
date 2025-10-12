'use client';
import { Suspense, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import UseAppContext from '@/context/AppContext';


const ISSERVER = typeof window ===undefined;

const GoogleAuthCallback = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // const { setLoggedIn } = UseAppContext();

    // console.log();


    useEffect(() => {
        // Access the query parameters from the URL
        const token = searchParams.get('token')

        if (!token) {
            // Handle the error returned from the backend
            console.error("Authentication Error:", error);
            // Redirect to a login page with an error message
            router.push('/login?authError=true');
        } else {
            // Store the token and user data in local storage or a state management system
            // For this example, we will use local storage
            !ISSERVER &&  localStorage.setItem('user', token);
            // setLoggedIn(true);
            // localStorage.setItem('user', user); // Note: You might want to parse this if it's a JSON string

            console.log("Authentication successful! Token and user stored.");

            // Redirect to the main application page
            router.push('/');
        }
    }, []);

    // A simple loading screen while the redirect is in progress
    return (
        <Suspense>
             <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            fontFamily: 'sans-serif'
        }}>
            <h1>Signing you in...</h1>
            <p>Please wait while we complete your authentication.</p>
        </div>
        </Suspense>
        
    );
};

export default GoogleAuthCallback;