import React , {useState,useContext} from 'react'

const spellContext = React.createContext();

export const useSpellContext = ()=>{

    const context = useContext(spellContext);

    if(!context){
        throw new Error('useSearchContext must be usead whit a SearchProvider');
    }

    return context
}

export const SpellProvider = ({children}) => {

    const [spell,setSpell] = useState([]);

    const toolSpell = {spell,setSpell};

  return (
    <spellContext.Provider value={toolSpell}>
        {children}
    </spellContext.Provider>
  )
}
