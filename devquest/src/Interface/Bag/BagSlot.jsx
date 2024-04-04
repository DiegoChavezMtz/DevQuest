import React from 'react'

export const BagSlot = (props) => {

    const item = props.item ? props.item : '';
    const id = props.id == '' ? '0' : props.id;

    console.log(id)
   
  return (
    <div className='bagSlot' id={id}>
        <img src={item[id]}/>
    </div> 
  )
}
