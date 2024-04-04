import React from 'react';
import './../assets/style/bagStyle.css';
import { usePlayerContext } from '../Context/PlayerProvider';
import { BagSlot } from './Bag/BagSlot';

export const Bag = () => {


  const {player,setPlayer} = usePlayerContext();

  const bagSlots = player.items.bag.bagSlots;

  const recolectedItems = player.items.bag.recolectedItems; 

    let newArrayBagSlots = []

    for (let i = 0; i < bagSlots; i++) {

      const elementBagSlot = <BagSlot item={recolectedItems[0]} id={i}/>

      newArrayBagSlots.push(elementBagSlot);
      
    }
  

  //console.log(player.items.bag.recolectedItems[0][3]);

  return (
    <div className='bagContainer'>
      <h5>Items Recolectados</h5>
      <div className='bagSlot-container'>
          
          {newArrayBagSlots.map((e)=>{
            return e
          })}
          
          
      </div>
      
    </div>
  )
}
