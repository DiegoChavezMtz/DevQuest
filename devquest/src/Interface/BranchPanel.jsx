import React from 'react';
import { useBranchContext } from '../Context/BranchProvider';
import { itemsList } from '../assets/itemsList';
import { itemTiers, tierInfo } from '../assets/mergeCombinations';
import './branchPanel.css';

export const BranchPanel = () => {
    const { currentBranch, branches } = useBranchContext();
    const branchNames = Object.keys(branches);

    return (
        <div className='branch--Container'>
            <h5>Ramas del Dungeon</h5>
            <div className='branch__list'>
                {branchNames.map(name => {
                    const { item } = branches[name];
                    const isCurrent = name === currentBranch;
                    const tier = item ? (itemTiers[item] ?? 1) : null;
                    const info = tier !== null ? tierInfo[tier] : null;

                    return (
                        <div
                            key={name}
                            className={`branch__entry ${isCurrent ? 'branch__entry--active' : ''}`}
                        >
                            <span className='branch__indicator'>{isCurrent ? '▶' : '◇'}</span>
                            <span className='branch__name'>{name}</span>

                            {item ? (
                                <div className='branch__item'>
                                    <img src={itemsList[item]} alt={item} title={item} className='branch__item-img' />
                                    <span
                                        className='branch__tier'
                                        style={{ color: info?.color }}
                                    >
                                        {info?.label}
                                    </span>
                                </div>
                            ) : (
                                <span className='branch__empty'>sin objeto</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
