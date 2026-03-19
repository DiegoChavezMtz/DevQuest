import React, { useState, useEffect, useContext } from 'react'

const craftingTableContext = React.createContext();

export const useCraftingTableContext = () => {
    const context = useContext(craftingTableContext);
    if (!context) {
        throw new Error('useCraftingTableContext must be used within a CraftingTableProvider');
    }
    return context;
}

export const CraftingTableProvider = ({ children }) => {

    const [craftingTable, setCraftingTable] = useState(() => {
        const saved = localStorage.getItem('devquest_craftingTable');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('devquest_craftingTable', JSON.stringify(craftingTable));
    }, [craftingTable]);

    const toolCraftingTable = { craftingTable, setCraftingTable };

    return (
        <craftingTableContext.Provider value={toolCraftingTable}>
            {children}
        </craftingTableContext.Provider>
    )
}
