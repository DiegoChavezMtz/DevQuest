import React from 'react'
import { usePlayerContext } from '../Context/PlayerProvider'
import { useCraftingTableContext } from '../Context/CraftingTableProvider';
import { useMainItemsContext } from '../Context/MainItemsProvider';
import { useNotification } from '../Context/NotificationProvider';

export const useSpells = () => {

    const { player, setPlayer, initialPlayer } = usePlayerContext();
    const { craftingTable, setCraftingTable } = useCraftingTableContext();
    const { mainItems, setMainItems } = useMainItemsContext();
    const { notify } = useNotification();

    const spellsList = (spellCasted) => {

        const spell = {
            'git init': () => {
                notify('Inicia en un nuevo dungeon', 'info');
            },
            'git add .': () => {
                const items = player.items.bag.recolectedItems[0];
                if (!items || items.length === 0) {
                    notify('No hay items en la bolsa', 'error');
                    return;
                }
                setCraftingTable(items);
                setPlayer(initialPlayer);
                notify('Añade los elementos al Crafting Table', 'success');
            },
            'git reset': () => {
                if (craftingTable.length != 0) {
                    const newPlayer = {
                        ...initialPlayer,
                        items: {
                            ...initialPlayer.items,
                            bag: {
                                ...initialPlayer.items.bag,
                                recolectedItems: [craftingTable]
                            }
                        }
                    };
                    setPlayer(newPlayer);
                    setCraftingTable([]);
                    notify('Regresaron los objetos a la bolsa', 'warning');
                } else {
                    notify('No hay nada en el crafting area', 'error');
                }
            },
            'git commit -m': () => {
                if (!craftingTable || craftingTable.length === 0) {
                    notify('No hay nada en el Crafting Table', 'error');
                    return;
                }
                setMainItems(prev => [...prev, ...craftingTable]);
                setCraftingTable([]);
                notify('Objetos fusionados al repositorio', 'success');
            },
            'git branch': () => { notify('Ver los diferentes objetos crafteados', 'info') },
            'git switch': () => { notify('Cambiar entre los diferentes objetos crafteados', 'info') },
            'git checkout -b': () => { notify('Crear un nuevo espacio para craftear un objeto', 'info') },
            'git merge': () => { notify('Combinar dos objetos crafteados', 'info') },
            'git pull': () => { notify('Traer un objeto crafteado guardado en el portal y combinarlo con uno nuestro', 'info') },
            'git push': () => { notify('Enviar un objeto crafteado al portal y guardarlo ahí', 'success') },
            'git remote add': () => { notify('Abrir una conexión con un portal', 'info') },
            'git remote remove': () => { notify('Cerrar una conexión a un portal', 'warning') },
            'git remote -v': () => { notify('Ver los portales a los que estamos conectados', 'info') },
            'git clone': () => { notify('Iniciar un dungeon ya existente', 'info') }
        }

        const input = (spellCasted || '').trim();
        const matchedKey = Object.keys(spell).find(key =>
            input === key || input.startsWith(key + ' ')
        );

        if (matchedKey) {
            return spell[matchedKey]();
        } else {
            return notify('Upss ese hechizo no es valido', 'error');
        }
    }

    return ({ spellsList })
}
