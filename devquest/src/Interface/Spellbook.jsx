import React from 'react'
import './../assets/style/spellbook.css'
import { useSpellContext } from '../Context/SpellProvider'

export const Spellbook = () => {

  const {spell,setSpell} = useSpellContext();

  return (
    <div className='spellBook--Container'>
        <h5>Grimorio</h5>
        <div className='spellBook'>
            {spell.map((e, i)=>{
              return <p key={i}>{e}</p>
            })}
        </div>
    </div>
  )
}
