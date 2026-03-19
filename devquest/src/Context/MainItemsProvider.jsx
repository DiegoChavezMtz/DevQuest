import React, { useState, useEffect, useContext } from 'react'

const mainItemsContext = React.createContext();

export const useMainItemsContext = () => {
    const context = useContext(mainItemsContext);
    if (!context) {
        throw new Error('useMainItemsContext must be used within a MainItemsProvider');
    }
    return context;
}

export const MainItemsProvider = ({ children }) => {

    const [mainItems, setMainItems] = useState(() => {
        const saved = localStorage.getItem('devquest_mainItems');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('devquest_mainItems', JSON.stringify(mainItems));
    }, [mainItems]);

    const toolMainItem = { mainItems, setMainItems };

    return (
        <mainItemsContext.Provider value={toolMainItem}>
            {children}
        </mainItemsContext.Provider>
    );
};
