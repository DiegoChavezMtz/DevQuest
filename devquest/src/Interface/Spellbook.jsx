import React from 'react'
import './../assets/style/spellbook.css'
import { useSpellContext } from '../Context/SpellProvider'

export const Spellbook = () => {

  const {spell,setSpell} = useSpellContext();

  return (
    <div>
        Spellbook
        <div className='spellBook'> 
            {spell.map((e)=>{
              return <p>{e}</p>
            })}
        </div>
    </div>
  )
}
