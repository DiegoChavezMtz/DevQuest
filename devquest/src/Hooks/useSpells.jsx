import React from 'react'
import { usePlayerContext } from '../Context/PlayerProvider'
import { useCraftingTableContext } from '../Context/CraftingTableProvider';
import { useMainItemsContext } from '../Context/MainItemsProvider';
import { useNotification } from '../Context/NotificationProvider';
import { combineItems } from '../assets/itemCombinations';
import { useBranchContext } from '../Context/BranchProvider';
import { mergeBranches } from '../assets/mergeCombinations';

export const useSpells = () => {

    const { player, setPlayer, initialPlayer } = usePlayerContext();
    const { craftingTable, setCraftingTable } = useCraftingTableContext();
    const { mainItems, setMainItems } = useMainItemsContext();
    const { notify } = useNotification();
    const {
        currentBranch, branches,
        setCurrentBranch, setBranches, setPendingMerge,
    } = useBranchContext();

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
                // Los items en bolsa son { type, pos } — extraemos solo el tipo para staging
                const types = items.map(i => (typeof i === 'string' ? i : i.type));
                setCraftingTable(types);
                setPlayer(initialPlayer);
                notify('Añade los elementos al Crafting Table', 'success');
            },
            'git reset': () => {
                if (craftingTable.length !== 0) {
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
                const result = combineItems(craftingTable);
                if (!result) {
                    notify('Combinación desconocida, intenta con otros items', 'error');
                    return;
                }
                // Guardar en mainItems y en la rama actual
                setMainItems(prev => [...prev, result]);
                setBranches(prev => ({
                    ...prev,
                    [currentBranch]: { ...prev[currentBranch], item: result },
                }));
                setCraftingTable([]);
                notify(`¡${result} forjado en rama "${currentBranch}"!`, 'success');
            },

            // ── Comandos de ramas ─────────────────────────────────

            'git branch': (args) => {
                if (args) {
                    // git branch <nombre> → crear rama sin cambiar, hereda item de la rama actual
                    if (branches[args]) {
                        notify(`La rama "${args}" ya existe`, 'error');
                        return;
                    }
                    const inheritedItem = branches[currentBranch]?.item ?? null;
                    setBranches(prev => ({ ...prev, [args]: { item: inheritedItem } }));
                    notify(`Rama "${args}" creada${inheritedItem ? ` con "${inheritedItem}"` : ''}`, 'success');
                } else {
                    // git branch → listar ramas
                    const list = Object.keys(branches)
                        .map(n => (n === currentBranch ? `* ${n}` : `  ${n}`))
                        .join('  |  ');
                    notify(`Ramas: ${list}`, 'info');
                }
            },

            'git checkout -b': (args) => {
                if (!args) {
                    notify('Indica el nombre de la rama: git checkout -b <nombre>', 'error');
                    return;
                }
                if (branches[args]) {
                    notify(`La rama "${args}" ya existe`, 'error');
                    return;
                }
                // La nueva rama hereda el item de la rama actual (como en git real)
                const inheritedItem = branches[currentBranch]?.item ?? null;
                setBranches(prev => ({ ...prev, [args]: { item: inheritedItem } }));
                setCurrentBranch(args);
                notify(`Rama "${args}" creada${inheritedItem ? ` con "${inheritedItem}"` : ''} y activada`, 'success');
            },

            'git checkout': (args) => {
                if (!args) {
                    notify('Indica el nombre de la rama: git checkout <nombre>', 'error');
                    return;
                }
                if (!branches[args]) {
                    notify(`La rama "${args}" no existe`, 'error');
                    return;
                }
                setCurrentBranch(args);
                notify(`Cambiado a la rama "${args}"`, 'success');
            },

            'git switch': (args) => {
                if (!args) {
                    notify('Indica el nombre de la rama: git switch <nombre>', 'error');
                    return;
                }
                if (!branches[args]) {
                    notify(`La rama "${args}" no existe`, 'error');
                    return;
                }
                setCurrentBranch(args);
                notify(`Cambiado a la rama "${args}"`, 'success');
            },

            'git merge': (args) => {
                if (!args) {
                    notify('Indica el nombre de la rama: git merge <nombre>', 'error');
                    return;
                }
                if (!branches[args]) {
                    notify(`La rama "${args}" no existe`, 'error');
                    return;
                }
                if (args === currentBranch) {
                    notify('No puedes fusionar una rama consigo misma', 'error');
                    return;
                }
                const myItem    = branches[currentBranch]?.item;
                const theirItem = branches[args]?.item;

                if (!myItem && !theirItem) {
                    notify('Ninguna de las dos ramas tiene un objeto aún', 'error');
                    return;
                }
                const result = mergeBranches(myItem, theirItem);
                setPendingMerge({ sourceBranch: args, result });
            },

            'git pull': () => { notify('Traer un objeto crafteado guardado en el portal y combinarlo con uno nuestro', 'info') },
            'git push': () => { notify('Enviar un objeto crafteado al portal y guardarlo ahí', 'success') },
            'git remote add': () => { notify('Abrir una conexión con un portal', 'info') },
            'git remote remove': () => { notify('Cerrar una conexión a un portal', 'warning') },
            'git remote -v': () => { notify('Ver los portales a los que estamos conectados', 'info') },
            'git clone': () => { notify('Iniciar un dungeon ya existente', 'info') },
        };

        const input = (spellCasted || '').trim().replace(/—/g, '--');

        // 'git checkout -b' debe evaluarse ANTES que 'git checkout'
        const orderedKeys = [
            'git checkout -b',
            ...Object.keys(spell).filter(k => k !== 'git checkout -b'),
        ];

        const matchedKey = orderedKeys.find(key =>
            input === key || input.startsWith(key + ' ')
        );

        if (matchedKey) {
            const args = input.slice(matchedKey.length).trim();
            return spell[matchedKey](args);
        } else {
            return notify('Ups, ese hechizo no es válido', 'error');
        }
    };

    return ({ spellsList });
};
