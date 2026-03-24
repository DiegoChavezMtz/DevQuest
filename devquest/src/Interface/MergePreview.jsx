import React from 'react';
import { useBranchContext } from '../Context/BranchProvider';
import { useMainItemsContext } from '../Context/MainItemsProvider';
import { itemsList } from '../assets/itemsList';
import { itemTiers, tierInfo } from '../assets/mergeCombinations';
import './mergePreview.css';

const ItemCard = ({ itemId, label }) => {
    const tier = itemId ? (itemTiers[itemId] ?? 1) : null;
    const info = tier !== null ? tierInfo[tier] : null;
    const isBurnt = itemId === 'burntCarbon';

    return (
        <div className={`merge__card ${isBurnt ? 'merge__card--burnt' : ''}`}>
            <span className='merge__card-label'>{label}</span>
            {itemId ? (
                <>
                    <img src={itemsList[itemId]} alt={itemId} className='merge__card-img' />
                    <span className='merge__card-name'>{itemId}</span>
                    {info && (
                        <span className='merge__card-tier' style={{ color: info.color }}>
                            {info.label}
                        </span>
                    )}
                </>
            ) : (
                <span className='merge__card-empty'>vacío</span>
            )}
        </div>
    );
};

export const MergePreview = () => {
    const { currentBranch, branches, pendingMerge, setBranches, setPendingMerge } = useBranchContext();
    const { setMainItems } = useMainItemsContext();

    if (!pendingMerge) return null;

    const { sourceBranch, result } = pendingMerge;
    const myItem = branches[currentBranch]?.item;
    const theirItem = branches[sourceBranch]?.item;
    const isBurnt = result === 'burntCarbon';

    const handleConfirm = () => {
        setBranches(prev => ({
            ...prev,
            [currentBranch]: { ...prev[currentBranch], item: result },
        }));
        setMainItems(prev => [...prev, result]);
        setPendingMerge(null);
    };

    const handleCancel = () => setPendingMerge(null);

    return (
        <div className='merge__overlay'>
            <div className='merge__modal'>
                <h5>Vista previa del Merge</h5>

                <div className='merge__body'>
                    <ItemCard itemId={myItem}    label={currentBranch} />
                    <span className='merge__plus'>+</span>
                    <ItemCard itemId={theirItem} label={sourceBranch} />
                    <span className='merge__arrow'>→</span>
                    <ItemCard itemId={result}    label={isBurnt ? '¡Incompatibles!' : '¡Resultado!'} />
                </div>

                {isBurnt && (
                    <p className='merge__warning'>
                        Estos objetos son incompatibles. El merge producirá Carbón Quemado.
                    </p>
                )}

                <div className='merge__actions'>
                    <button className='merge__btn merge__btn--cancel' onClick={handleCancel}>
                        Cancelar
                    </button>
                    <button
                        className={`merge__btn merge__btn--confirm ${isBurnt ? 'merge__btn--danger' : ''}`}
                        onClick={handleConfirm}
                    >
                        {isBurnt ? 'Aceptar fracaso' : 'Confirmar Merge'}
                    </button>
                </div>
            </div>
        </div>
    );
};
