import React, { useState } from 'react'
import './ResetButton.css'

const STORAGE_KEYS = [
    'devquest_player',
    'devquest_spells',
    'devquest_craftingTable',
    'devquest_mainItems',
    'devquest_collectedPositions',
];

export const ResetButton = () => {

    const [confirming, setConfirming] = useState(false);

    const handleReset = () => {
        if (!confirming) {
            setConfirming(true);
            return;
        }
        STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
        window.location.reload();
    };

    const handleCancel = () => setConfirming(false);

    return (
        <div className='reset-wrapper'>
            {confirming && (
                <button className='reset-btn reset-btn--cancel' onClick={handleCancel}>
                    Cancelar
                </button>
            )}
            <button
                className={`reset-btn ${confirming ? 'reset-btn--confirm' : ''}`}
                onClick={handleReset}
                title="Reiniciar dungeon"
            >
                {confirming ? '¿Reiniciar?' : '↺ Reset'}
            </button>
        </div>
    );
};
