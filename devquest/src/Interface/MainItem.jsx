import React from 'react'
import './../assets/style/bagStyle.css'
import { itemsList } from '../assets/itemsList'
import { useMainItemsContext } from '../Context/MainItemsProvider'

export const MainItem = () => {

  const {mainItems,setMainItems} = useMainItemsContext();

  console.log(mainItems);

  let eqItems = {
    1 : 'manaStone',
    2 : 'greatManaStone',
    3 : 'powerStone',
    4 : 'manaJewel'
  }

  const typeCombination = eqItems[mainItems.length];
  
  

  return (
    <div className='mainItem--Container'>
        <h5>MainItem (Repositorio)</h5>
        <div className='mainItem'>
          {mainItems ? <img src={itemsList[typeCombination]} alt="" /> : <></>}
        </div>
    </div>
  )
}
