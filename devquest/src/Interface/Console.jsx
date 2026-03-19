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
    <div className='spelltable--Container'>
      <h5>Spelltable</h5>
      <form onSubmit={handleSubmit}>
        <input  type="text"
                value={castSpell || ''}
                placeholder="git add ."
                onChange={(e)=> setCastSpell(e.target.value)}
        />
        <button type='submit'>Cast</button>
      </form>
    </div>
  )
}