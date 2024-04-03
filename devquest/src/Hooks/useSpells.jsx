import React from 'react'

export const useSpells = () => {

    const spellsList =(spellCasted)=>{

        const spell ={
            'git init' : 'Inicia el dungeon',
            'git add .' : 'Agregar todos los objetos al Crafting Table',
            'git commit -m' : 'Confirmar la union de todos los objetos'
        } 

        return spell[spellCasted]
        
    }

  return ({spellsList})
}
