import React, { useEffect, useState } from 'react'
import './../assets/style/screenStyle.css'
import { ItemQuest } from '../Items/ItemQuest'
import { usePlayerContext } from '../Context/PlayerProvider'
import { Bag } from '../Interface/Bag'

const GRID_SIZE = 96;
const ITEM_POSITIONS = { 5: 'manaStone', 33: 'manaStone', 47: 'manaStone', 83: 'manaStone' };

export const Screen = () => {

  const { player, setPlayer } = usePlayerContext();

  const [collectedPositions, setCollectedPositions] = useState(() => {
    const saved = localStorage.getItem('devquest_collectedPositions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('devquest_collectedPositions', JSON.stringify(collectedPositions));
  }, [collectedPositions]);

  const handleClick = (position, itemValue) => {
    setCollectedPositions(prev => [...prev, position]);

    const currentItems = player.items.bag.recolectedItems[0] || [];
    const newItems = [...currentItems, itemValue];

    setPlayer({
      ...player,
      items: {
        ...player.items,
        bag: {
          ...player.items.bag,
          recolectedItems: [newItems]
        }
      }
    });
  };

  return (
    <div className='screen--Container'>
      <h5>Working Area</h5>
      <Bag />
      <div className='screen'>
        {Array.from({ length: GRID_SIZE }, (_, i) => {
          if (i === 0) {
            return (
              <div key={i} className='screenGrid'>
                <img
                  className='character'
                  src="https://www.nicepng.com/png/detail/556-5563824_boba-fett-darkest-dungeon-character-icons.png"
                  alt="character"
                />
              </div>
            );
          }
          if (ITEM_POSITIONS[i] && !collectedPositions.includes(i)) {
            return (
              <div key={i} className='screenGrid'>
                <ItemQuest method={() => handleClick(i, ITEM_POSITIONS[i])} />
              </div>
            );
          }
          return <div key={i} className='screenGrid' />;
        })}
      </div>
    </div>
  );
};
