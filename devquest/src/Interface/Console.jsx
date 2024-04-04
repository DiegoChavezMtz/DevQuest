import React , {useState,useEffect} from 'react'
import { useSpellContext } from '../Context/SpellProvider';
import { useSpells } from '../Hooks/useSpells';

export const Console = () => {

  const [castSpell,setCastSpell] = useState();

  const {spell,setSpell} = useSpellContext();
  const {spellsList} = useSpells();

  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(castSpell);
    spellsList(castSpell);
    setSpell([...spell,castSpell]);
    setCastSpell('')
  }

  return (
    <div>
      Spelltable
      <form onSubmit={handleSubmit}>
        <input  type="text-area" 
                value={castSpell}
                onChange={(e)=> setCastSpell(e.target.value)}
        />
        <button type='submit' >Enviar</button>
      </form>
        
    </div>
  )
}