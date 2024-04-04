import React from 'react'
import './../assets/style/craftingTable.css'
import { useCraftingTableContext } from '../Context/CraftingTableProvider'

export const CraftingTable = () => {

  const {craftingTable,setCraftingTable} = useCraftingTableContext();

  return (
    <div className='craftingTable--Container'>
        <h5>Crafting Table (Stagin Area)</h5>
        <div className='craftingTable'>
            {craftingTable != [] ? craftingTable.map((e)=>{
              return <img src={e} alt="" />
            }) : <></>}
        </div>
    </div>
  )
}
