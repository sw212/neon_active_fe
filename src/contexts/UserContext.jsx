import { createContext, useState } from "react";

export const UserContext = createContext("");

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        if (__DEV__) {

            return {
                _id: "65dc70a0269f9c05e673b35e",
                username: "johndoe",
                firstName: "john",
                lastName: "doe",
                email: "jd@jd.com",
                points: 4109,
            };
        }
    });

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
