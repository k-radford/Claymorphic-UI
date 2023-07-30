import React, { useState, createContext } from 'react'

// default
const defaultSubscription = false;
const defaultColor = '#ffffff';

export const UserContext = createContext();

export const UserProvider = (props) => {

    const [subscription, setSubscription] = useState(defaultSubscription);
    const [color, setColor] = useState(defaultColor);

    return (
        <UserContext.Provider
            value={{
                subscription,
                color,
                setSubscription,
                setColor,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
