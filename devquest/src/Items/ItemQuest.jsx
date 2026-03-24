import React from 'react'
import { itemsList } from '../assets/itemsList'

export const ItemQuest = ({ method, itemType }) => {
    return (
        <div className='itemQuest' onClick={method} title={itemType}>
            <img src={itemsList[itemType]} alt={itemType} />
        </div>
    );
};
