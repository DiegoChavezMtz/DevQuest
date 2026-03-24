import React from 'react';
import './../assets/style/bagStyle.css';
import { usePlayerContext } from '../Context/PlayerProvider';
import { BagSlot } from './Bag/BagSlot';

export const Bag = ({ onRemoveItem }) => {
    const { player } = usePlayerContext();
    const bagSlots       = player.items.bag.bagSlots;
    const recolectedItems = player.items.bag.recolectedItems;

    return (
        <div className='bagContainer'>
            <h5>Items Recolectados</h5>
            <div className='bagSlot-container'>
                {Array.from({ length: bagSlots }, (_, i) => (
                    <BagSlot
                        key={i}
                        item={recolectedItems[0]}
                        id={i}
                        onRemove={onRemoveItem}
                    />
                ))}
            </div>
        </div>
    );
};
