import React, { useState, useEffect, useContext } from 'react'

const spellContext = React.createContext();

export const useSpellContext = () => {
    const context = useContext(spellContext);
    if (!context) {
        throw new Error('useSpellContext must be used within a SpellProvider');
    }
    return context;
}

export const SpellProvider = ({ children }) => {

    const [spell, setSpell] = useState(() => {
        const saved = localStorage.getItem('devquest_spells');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('devquest_spells', JSON.stringify(spell));
    }, [spell]);

    const toolSpell = { spell, setSpell };

    return (
        <spellContext.Provider value={toolSpell}>
            {children}
        </spellContext.Provider>
    )
}
