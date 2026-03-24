import React from 'react'
import './../assets/style/craftingTable.css'
import { itemsList } from '../assets/itemsList'
import { useCraftingTableContext } from '../Context/CraftingTableProvider'

export const CraftingTable = () => {

  const {craftingTable,setCraftingTable} = useCraftingTableContext();

  return (
    <div className='craftingTable--Container'>
        <h5>Crafting Table (Staging Area)</h5>
        <div className='craftingTable'>
            {craftingTable.length > 0 ? craftingTable.map((e, i)=>{
              return <img key={i} src={itemsList[e]} alt={e} />
            }) : <></>}
        </div>
    </div>
  )
}
