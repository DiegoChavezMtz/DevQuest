import React from 'react'
import { itemsList } from '../assets/itemsList'

export const ItemQuest = (props) => {

    


  return (
    <div className='itemQuest' value={itemsList.manaStone} onClick={props.method}>
    </div>
  )
}
