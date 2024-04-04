import React ,{useState,useContext} from 'react'

const playerContext = React.createContext();

export const usePlayerContext = ()=>{

    const context = useContext(playerContext);

    if(!context){
        throw new Error('useSearchContext must be usead whit a SearchProvider');
    }

    return context

}

export const PlayerProvider = ({children}) => {

    const [player,setPlayer] = useState({
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
    });

    const toolPlayer = {player,setPlayer};

  return (
        <playerContext.Provider value={toolPlayer}> 
            {children}
        </playerContext.Provider>
  )
}
