import React, { useEffect, useRef, useState } from 'react'
import './../assets/style/spellbook.css'
import { useSpellContext } from '../Context/SpellProvider'
import { useSpells } from '../Hooks/useSpells'

export const GrimorioConsole = () => {
    const { spell, setSpell } = useSpellContext();
    const { spellsList } = useSpells();
    const [castSpell, setCastSpell] = useState('');
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const listRef = useRef(null);
    const containerRef = useRef(null);

    // Auto-scroll al último hechizo
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [spell]);

    // Compensar teclado virtual en móvil usando visualViewport API
    useEffect(() => {
        const vv = window.visualViewport;
        if (!vv) return;

        const update = () => {
            if (window.innerWidth > 768) {
                setKeyboardOffset(0);
                return;
            }
            const offset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
            setKeyboardOffset(offset);
        };

        vv.addEventListener('resize', update);
        vv.addEventListener('scroll', update);
        return () => {
            vv.removeEventListener('resize', update);
            vv.removeEventListener('scroll', update);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!castSpell?.trim()) return;
        spellsList(castSpell);
        setSpell(prev => [...prev, castSpell]);
        setCastSpell('');
    };

    return (
        <div
            className='grimorio--Container'
            ref={containerRef}
            style={keyboardOffset > 0 ? { transform: `translateY(-${keyboardOffset}px)` } : undefined}
        >
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
                    inputMode="text"
                    value={castSpell}
                    placeholder="git checkout -b mi-rama"
                    onChange={e => setCastSpell(e.target.value)}
                />
                <button type="submit">Cast</button>
            </form>
        </div>
    );
};
