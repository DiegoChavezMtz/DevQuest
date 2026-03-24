import React from 'react'
import './../assets/style/bagStyle.css'
import { itemsList } from '../assets/itemsList'
import { useMainItemsContext } from '../Context/MainItemsProvider'
import { itemTiers, tierInfo } from '../assets/mergeCombinations'

export const MainItem = () => {
    const { mainItems } = useMainItemsContext();
    const lastItem = mainItems[mainItems.length - 1];
    const tier = lastItem ? (itemTiers[lastItem] ?? 1) : null;
    const info = tier !== null ? tierInfo[tier] : null;

    return (
        <div className='mainItem--Container'>
            <h5>Repositorio</h5>
            <div className='mainItem'>
                {lastItem ? (
                    <>
                        <img src={itemsList[lastItem]} alt={lastItem} title={lastItem} />
                        <div className='mainItem__info'>
                            <span className='mainItem__name'>{lastItem}</span>
                            {info && (
                                <span className='mainItem__tier' style={{ color: info.color }}>
                                    {info.label}
                                </span>
                            )}
                        </div>
                    </>
                ) : (
                    <span className='mainItem__empty'>Sin objeto forjado</span>
                )}
            </div>
        </div>
    );
};
