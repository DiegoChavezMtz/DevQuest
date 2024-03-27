import React from 'react'
import './../assets/style/screenStyle.css'
import { ItemQuest } from '../Items/ItemQuest'

export const Screen = () => {
  return (
    <div className='screen'>
        <div className='character'></div>
        <ItemQuest/>
    </div>
  )
}
