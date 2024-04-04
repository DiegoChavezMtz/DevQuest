import React , {useState,useContext} from 'react'

const craftingTableContext = React.createContext();

export const useCraftingTableContext = ()=>{

    const context = useContext(craftingTableContext);

    if(!context){
        throw new Error('useSearchContext must be usead whit a SearchProvider');
    }

    return context
}

export const CraftingTableProvider = ({children}) => {

    const [craftingTable,setCraftingTable] = useState([]);

    const toolCraftingTable = {craftingTable,setCraftingTable};


  return (
    <craftingTableContext.Provider value={toolCraftingTable}>
        {children}
    </craftingTableContext.Provider>
  )
}
