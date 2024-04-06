import React, { useState } from 'react'
import { usePlayerContext } from '../Context/PlayerProvider'
import { useCraftingTableContext } from '../Context/CraftingTableProvider';
import { useMainItemsContext } from '../Context/MainItemsProvider';

export const useSpells = () => {

    const {player,setPlayer} = usePlayerContext();
    const {craftingTable,setCraftingTable} = useCraftingTableContext();
    const {mainItems,setMainItems} = useMainItemsContext();

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

    let newMainItem;

    const spellsList =(spellCasted)=>{

        const spell ={
            'git init' : ()=>{
                alert('Inicia en un nuevo dungeon')
            },
            'git add .' : ()=>{

                let items = player.items.bag.recolectedItems[0];
                setCraftingTable(items);
                setPlayer(reloadPlayer);
                
                alert('Añade los elementos al Crafting Table')
            },
            'git reset' :()=>{

                if(craftingTable.length != 0){

                    const itemsQuest = reloadPlayer.items.bag.recolectedItems;

                    itemsQuest.push(craftingTable);
    
                    console.log(reloadPlayer.items.bag.recolectedItems);
    
                    setPlayer(reloadPlayer);
    
                    setCraftingTable([]);
    
                    alert('Regresaron los objetos a la bolsa');
                    
                }else{
                    alert('No hay nada en el craftin area');
                }
            } ,
            'git commit -m' : ()=>{

                newMainItem = craftingTable;

                console.log(newMainItem);
                
                setMainItems(newMainItem);

                setCraftingTable([]);
                
                alert('Confirmar la union de todos los objetos')
            },
            'git branch' : ()=>{alert('Ver los diferentes objetos crafteados')},
            'git switch' :()=>{alert('Cambiar entre los diferentes objetos crafteados')} ,
            'git checkout -b' : ()=>{alert('Crear un nuevo espacio para craftear un objeto')},
            'git merge' : ()=>{alert('Combinar dos objetos crafteados')},
            'git pull' : ()=>{alert('Traer un objeto crafteado guardado en el portal y combinarlo con uno nuestro')},
            'git push' : ()=>{alert('Enviar un objeto crafteado al portal y guardarlo ahí')},
            'git remote add' : ()=>{alert('Abrir una conexión con un portal')},
            'git remote remove' :()=>{alert('Cerrar una conexión a un portal')} , //los portales solo funcionan dentro del mismo dungeon
            'git remote -v' : ()=>{alert('Ver los portales a los que estamos conectados')},
            'git clone' : ()=>{alert('Iniciar un dungeon ya existente')}
        } 

        if(spell[spellCasted]){

            return spell[spellCasted]()

        }else{

            return alert('Upss ese hechizo no es valido')

        }

        
        
    }

  return ({spellsList})
}
