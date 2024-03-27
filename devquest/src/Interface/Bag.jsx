import React from 'react';
import './../assets/style/bagStyle.css';

export const Bag = () => {
  return (
    <div className='bagContainer'>
      <h5>Bolsa</h5>
      <div className='bagSlot-container'>
          <div className='bagSlot'></div>
          <div className='bagSlot'></div>
          <div className='bagSlot'></div>
          <div className='bagSlot'></div>
          <div className='bagSlot'></div>
          <div className='bagSlot'></div>
          <div className='bagSlot'></div>
          <div className='bagSlot'></div>
          <div className='bagSlot'></div>
      </div>
    </div>
  )
}
