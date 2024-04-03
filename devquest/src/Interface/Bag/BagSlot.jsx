import React from 'react'

export const BagSlot = (props) => {

    const item = props.item ? props.item : '';
    console.log(item)
  return (
    <div className='bagSlot'>
        {item}
    </div>
  )
}
