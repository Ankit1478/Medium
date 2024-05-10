// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    currentUser: { token: string } | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<{ token: string } | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<{ token: string } | null>(null);

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        if (userToken) {
            setCurrentUser({ token: userToken });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuthToken() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthToken must be used within an AuthProvider');
    }
    return context.currentUser ? context.currentUser.token : null;
}