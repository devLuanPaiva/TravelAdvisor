'use client';
import {signIn} from 'next-auth/react';
export default function AuthenticationPage() {
    return (
        <div>
            <button onClick={() => signIn('google', { callbackUrl: '/home' })}>Sign with Google</button>
        </div>
    );
}