import React , {useEffect,useState} from 'react'
import './../assets/style/screenStyle.css'
import { ItemQuest } from '../Items/ItemQuest'
import { usePlayerContext } from '../Context/PlayerProvider'
import { Bag } from '../Interface/Bag'

export const Screen = () => {

  const {player,setPlayer} = usePlayerContext();

  const [items,setItems] = useState([]);

  const reloadPlayer = {
    character : {
        level: 1,
        name: 'Mago',
        classe: 'Spellcaster'
    },
    items : {
        principal : {
            name : 'crosier',
            level : 1
        } ,
        bag : {
            bagSlots : 4 ,
            recolectedItems : []
        }
        
    },
    spells : {
        listSpells : []
    }
}
  const handleClick = (event)=>{
      console.log(event.target.getAttribute('value'))

      setItems([...items,event.target.getAttribute('value')])

      //console.log(items);

      event.target.style.display = 'none';

  }

  const itemsQuest = reloadPlayer.items.bag.recolectedItems;

  useEffect(()=>{
    itemsQuest.push(items);
    setPlayer(reloadPlayer);
    
  },[items])

  return (
    <div className='screen--Container'>
        <h5>Working Area</h5>
        <div className='screen'>
          <img className='character' src="https://www.nicepng.com/png/detail/556-5563824_boba-fett-darkest-dungeon-character-icons.png" alt="" />
          <ItemQuest method={handleClick}/>
          <ItemQuest method={handleClick}/>
          <ItemQuest method={handleClick}/>
          <ItemQuest method={handleClick}/>
        </div>
        <Bag/>
    </div>
    
  )
}
