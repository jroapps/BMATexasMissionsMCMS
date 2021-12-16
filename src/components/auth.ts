// Key imports
import { auth as firebaseAuth } from '../components/firebase';
import React, { useContext, useEffect, useState } from 'react';

// Interfaces
interface Auth {
    loggedIn: boolean;
    userId?: string;
}

interface AuthInit {
    loading: boolean;
    auth?: Auth;
}

// Create authentication context
export const AuthContext = React.createContext<Auth>({ loggedIn: false });

// Custom hook to use authentication
export function useAuth(): Auth {
    return useContext(AuthContext);
}

// Custom hook to check authentication
export function useAuthInit(): AuthInit {
    const [authInit, setAuthInit] = useState<AuthInit>({ loading: true });
    useEffect(() => {
        return firebaseAuth.onAuthStateChanged((firebaseUser) => {
            const auth = firebaseUser ?
                { loggedIn: true, userId: firebaseUser.uid } :
                { loggedIn: false };
            setAuthInit({ loading: false, auth });
        });
    }, []);
    return authInit;
}