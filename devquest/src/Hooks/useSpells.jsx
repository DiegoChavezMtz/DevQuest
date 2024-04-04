import React from 'react'
import { usePlayerContext } from '../Context/PlayerProvider'
import { useCraftingTableContext } from '../Context/CraftingTableProvider';

export const useSpells = () => {

    const {player,setPlayer} = usePlayerContext();
    const {craftingTable,setCraftingTable} = useCraftingTableContext();

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

    const spellsList =(spellCasted)=>{

        const spell ={
            'git init' : ()=>{
                console.log('Inicia en un nuevo dungeon')
            },
            'git add .' : ()=>{

                let items = player.items.bag.recolectedItems[0];
                setCraftingTable(items);
                setPlayer(reloadPlayer);
                console.log(reloadPlayer);
                console.log(items)
                console.log('Añade los elementos al Crafting Table')
            },
            'git reset' : 'Regresaron los objetos a la bolsa',
            'git commit -m' : 'Confirmar la union de todos los objetos',
            'git branch' : 'Ver los diferentes objetos crafteados',
            'git switch' : 'Cambiar entre los diferentes objetos crafteados',
            'git checkout -b' : 'Crear un nuevo espacio para craftear un objeto',
            'git merge' : 'Combinar dos objetos crafteados',
            'git pull' : 'Traer un objeto crafteado guardado en el portal y combinarlo con uno nuestro',
            'git push' : 'Enviar un objeto crafteado al portal y guardarlo ahí',
            'git remote add' : 'Abrir una conexión con un portal',
            'git remote remove' : 'Cerrar una conexión a un portal', //los portales solo funcionan dentro del mismo dungeon
            'git remote -v' : 'Ver los portales a los que estamos conectados',
            'git clone' : 'Iniciar un dungeon ya existente'
        } 

        if(spell[spellCasted]){

            return spell[spellCasted]()

        }else{

            return alert('Upss ese hechizo no es valido')

        }

        
        
    }

  return ({spellsList})
}
