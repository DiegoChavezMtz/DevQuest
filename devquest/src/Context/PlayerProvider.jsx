import React, { useState, useEffect, useContext } from 'react'

const playerContext = React.createContext();

const initialPlayer = {
    character: {
        level: 1,
        name: 'Mago',
        classe: 'Spellcaster'
    },
    items: {
        principal: {
            name: 'crosier',
            level: 1
        },
        bag: {
            bagSlots: 4,
            recolectedItems: []
        }
    },
    spells: {
        listSpells: []
    }
};

export const usePlayerContext = () => {
    const context = useContext(playerContext);
    if (!context) {
        throw new Error('usePlayerContext must be used within a PlayerProvider');
    }
    return context;
}

export const PlayerProvider = ({ children }) => {

    const [player, setPlayer] = useState(() => {
        const saved = localStorage.getItem('devquest_player');
        return saved ? JSON.parse(saved) : initialPlayer;
    });

    useEffect(() => {
        localStorage.setItem('devquest_player', JSON.stringify(player));
    }, [player]);

    const toolPlayer = { player, setPlayer, initialPlayer };

    return (
        <playerContext.Provider value={toolPlayer}>
            {children}
        </playerContext.Provider>
    )
}
