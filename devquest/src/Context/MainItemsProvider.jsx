import React , {useState,useContext} from 'react';

const mainItemsContext = React.createContext();

export const useMainItemsContext = ()=>{

    const context = useContext(mainItemsContext);

    if(!context){
        throw new Error('useSearchContext must be usead whit a SearchProvider');
    }

    return context
}

export const MainItemsProvider = ({children}) => {

    const [mainItems,setMainItems] = useState([]);

    const toolMainItem = {mainItems,setMainItems};

    return (
        <mainItemsContext.Provider value={toolMainItem}>
            {children}
        </mainItemsContext.Provider>
    );
};
