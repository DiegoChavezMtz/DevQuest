import React from 'react'
import { itemsList } from '../../assets/itemsList';

export const BagSlot = (props) => {

    const item = props.item ? props.item : '';
    const id = props.id == '' ? '0' : props.id;

    console.log(id)
   
  return (
    <div className='bagSlot' id={id}>
        {item[id] ? <img src={itemsList[item[id]]}/> : <></>}
    </div> 
  )
}
