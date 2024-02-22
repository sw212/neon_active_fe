import { createContext, useState } from "react";

export const UserContext = createContext("");

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        if (__DEV__) {
            return "test_user";
        }
    });

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
