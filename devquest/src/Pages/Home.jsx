import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../Context/NotificationProvider'
import './pages.css'

export const Home = () => {
    const [castSpell, setCastSpell] = useState('');
    const [spellHistory, setSpellHistory] = useState([]);
    const navigate = useNavigate();
    const { notify } = useNotification();

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = castSpell.trim();
        if (!input) return;

        setSpellHistory(prev => [...prev, input]);
        setCastSpell('');

        if (input === 'git init') {
            localStorage.clear();
            notify('¡Dungeon inicializado! Preparando tu aventura...', 'success');
            setTimeout(() => navigate('/level/2'), 1200);
        } else {
            notify('En el menú solo puedes usar git init', 'error');
        }
    };

    return (
        <div className='home-page'>
            <div className='home-page__inner'>

                <div className='home-page__header'>
                    <div className='home-page__rule' />
                    <h1 className='home-page__title'>GitQuest</h1>
                    <div className='home-page__rule' />
                </div>

                <p className='home-page__lore'>
                    En las profundidades del dungeon, el código aguarda ser dominado.<br />
                    Solo el mago que domine los hechizos de Git podrá forjar el artefacto definitivo.
                </p>

                <p className='home-page__hint'>
                    Escribe <code>git init</code> para empezar tu primer dungeon
                </p>

                <div className='home-page__spellbook'>
                    <h5>Grimorio</h5>
                    <div className='page-spellbook__entries'>
                        {spellHistory.map((s, i) => <p key={i}>{s}</p>)}
                    </div>
                </div>

                <div className='page-console home-page__console'>
                    <h5>Spelltable</h5>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={castSpell}
                            placeholder="git init"
                            onChange={e => setCastSpell(e.target.value)}
                            autoFocus
                        />
                        <button type="submit">Cast</button>
                    </form>
                </div>

            </div>
        </div>
    );
};
