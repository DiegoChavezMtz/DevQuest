import React from 'react'
import { itemsList } from '../../assets/itemsList';

// El item en bolsa puede ser { type, pos } (nuevo) o string legacy
const getItemType = (raw) => (typeof raw === 'string' ? raw : raw?.type);

export const BagSlot = ({ item, id, onRemove }) => {
    const raw       = item?.[id];
    const itemType  = getItemType(raw);

    const handleClick = () => {
        if (itemType && onRemove) {
            onRemove(id);
        }
    };

    return (
        <div
            className={`bagSlot ${itemType ? 'bagSlot--filled' : ''}`}
            onClick={handleClick}
            title={itemType ? `Devolver "${itemType}" al dungeon` : ''}
        >
            {itemType ? <img src={itemsList[itemType]} alt={itemType} /> : null}
        </div>
    );
};
