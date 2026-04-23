import React, { useEffect, useState } from 'react'
import './../assets/style/screenStyle.css'
import { ItemQuest } from '../Items/ItemQuest'
import { usePlayerContext } from '../Context/PlayerProvider'
import { useNotification } from '../Context/NotificationProvider'
import { Bag } from '../Interface/Bag'

const GRID_SIZE  = 96;
const ITEM_COUNT = 15;
const BASE_ITEMS = ['manaStone', 'fireGem', 'iceGem', 'thunderShard', 'shadowEssence', 'lightEssence'];

const generateItemPositions = () => {
    const available = Array.from({ length: GRID_SIZE - 1 }, (_, i) => i + 1);
    for (let i = available.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [available[i], available[j]] = [available[j], available[i]];
    }
    return Object.fromEntries(
        available.slice(0, ITEM_COUNT).map(pos => [
            pos,
            BASE_ITEMS[Math.floor(Math.random() * BASE_ITEMS.length)]
        ])
    );
};

// Helpers para el formato dual: los items en bolsa son { type, pos }
// pero podrían ser strings legacy (ej. venidos de git reset con craftingTable antiguo)
const getItemType = (item) => (typeof item === 'string' ? item : item?.type);
const getItemPos  = (item) => (typeof item === 'string' ? null : item?.pos ?? null);

export const Screen = () => {
    const { player, setPlayer } = usePlayerContext();
    const { notify } = useNotification();

    const [itemPositions, setItemPositions] = useState(() => {
        const saved = localStorage.getItem('devquest_itemPositions');
        return saved ? JSON.parse(saved) : generateItemPositions();
    });

    // collectedPositions: qué celdas del dungeon fueron tomadas (para no re-mostrarlas)
    // Se sincroniza con la bolsa al recoger y devolver, y con el staging (git add .)
    const [collectedPositions, setCollectedPositions] = useState(() => {
        const saved = localStorage.getItem('devquest_collectedPositions');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('devquest_itemPositions', JSON.stringify(itemPositions));
    }, [itemPositions]);

    useEffect(() => {
        localStorage.setItem('devquest_collectedPositions', JSON.stringify(collectedPositions));
    }, [collectedPositions]);

    // Recoger item: guarda { type, pos } en la bolsa
    const handleCollect = (position, itemType) => {
        const bagItems = player.items.bag.recolectedItems[0] || [];
        if (bagItems.length >= player.items.bag.bagSlots) {
            notify('La bolsa está llena, usa git add . para vaciarla', 'error');
            return;
        }
        setCollectedPositions(prev => [...prev, position]);
        setPlayer(prev => ({
            ...prev,
            items: {
                ...prev.items,
                bag: {
                    ...prev.items.bag,
                    recolectedItems: [[...bagItems, { type: itemType, pos: position }]]
                }
            }
        }));
    };

    // Devolver item al dungeon: usa bagItem.pos directamente (sin correlación de índices)
    const handleReturnToDungeon = (bagIndex) => {
        const bagItems = player.items.bag.recolectedItems[0] || [];
        const bagItem  = bagItems[bagIndex];
        const pos      = getItemPos(bagItem);

        const newItems = bagItems.filter((_, i) => i !== bagIndex);

        if (pos !== null) {
            setCollectedPositions(prev => prev.filter(p => p !== pos));
        }

        setPlayer(prev => ({
            ...prev,
            items: {
                ...prev.items,
                bag: {
                    ...prev.items.bag,
                    recolectedItems: [newItems]
                }
            }
        }));

        notify('Item devuelto al dungeon', 'warning');
    };

    // Nueva sala: nuevas posiciones aleatorias, limpia celdas recolectadas
    const handleNewRoom = () => {
        setItemPositions(generateItemPositions());
        setCollectedPositions([]);
    };

    return (
        <div className='screen--Container'>
            <h5>Working Area</h5>
            <Bag onRemoveItem={handleReturnToDungeon} />
            <div className='screen'>
                {Array.from({ length: GRID_SIZE }, (_, i) => {
                    if (i === 0) {
                        return (
                            <div key={i} className='screenGrid'>
                                <span className='character'>🧙</span>
                            </div>
                        );
                    }
                    if (itemPositions[i] && !collectedPositions.includes(i)) {
                        return (
                            <div key={i} className='screenGrid'>
                                <ItemQuest
                                    itemType={itemPositions[i]}
                                    method={() => handleCollect(i, itemPositions[i])}
                                />
                            </div>
                        );
                    }
                    return <div key={i} className='screenGrid' />;
                })}
            </div>
            <button className='screen__new-room-btn' onClick={handleNewRoom}>
                ⚔ Ir a otra sala
            </button>
        </div>
    );
};
