import React, { useEffect, useRef } from 'react'
import './../assets/style/spellbook.css'
import { useSpellContext } from '../Context/SpellProvider'
import { useSpells } from '../Hooks/useSpells'

export const GrimorioConsole = () => {
    const { spell, setSpell } = useSpellContext();
    const { spellsList } = useSpells();
    const [castSpell, setCastSpell] = React.useState('');
    const listRef = useRef(null);

    // Auto-scroll al último hechizo
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [spell]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!castSpell?.trim()) return;
        spellsList(castSpell);
        setSpell(prev => [...prev, castSpell]);
        setCastSpell('');
    };

    return (
        <div className='grimorio--Container'>
            <h5>Grimorio</h5>
            <div className='grimorio__log' ref={listRef}>
                {spell.length === 0
                    ? <p className='grimorio__empty'>Aún no se han lanzado hechizos...</p>
                    : spell.map((s, i) => <p key={i}>{s}</p>)
                }
            </div>
            <form className='grimorio__form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={castSpell}
                    placeholder="git checkout -b mi-rama"
                    onChange={e => setCastSpell(e.target.value)}
                    autoFocus
                />
                <button type="submit">Cast</button>
            </form>
        </div>
    );
};
