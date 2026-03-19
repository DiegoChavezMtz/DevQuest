import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../Context/NotificationProvider'
import './pages.css'

export const Level2 = () => {
    const [castSpell, setCastSpell] = useState('');
    const [spellHistory, setSpellHistory] = useState([]);
    const [nameSet, setNameSet] = useState(false);
    const [emailSet, setEmailSet] = useState(false);
    const navigate = useNavigate();
    const { notify } = useNotification();

    useEffect(() => {
        if (nameSet && emailSet) {
            notify('¡Identidad configurada! Accediendo al dungeon...', 'success');
            setTimeout(() => navigate('/level/3'), 1500);
        }
    }, [nameSet, emailSet]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = castSpell.trim();
        if (!input) return;

        setSpellHistory(prev => [...prev, input]);
        setCastSpell('');

        const isName  = input === 'git config --global user.name'
                     || input.startsWith('git config --global user.name ');
        const isEmail = input === 'git config --global user.email'
                     || input.startsWith('git config --global user.email ');

        if (isName) {
            if (!nameSet) {
                setNameSet(true);
                notify('Nombre de mago registrado', 'success');
            } else {
                notify('El nombre ya está configurado', 'warning');
            }
        } else if (isEmail) {
            if (!emailSet) {
                setEmailSet(true);
                notify('Email de mago registrado', 'success');
            } else {
                notify('El email ya está configurado', 'warning');
            }
        } else {
            notify('En este nivel solo puedes usar git config --global', 'error');
        }
    };

    return (
        <div className='level2-page'>

            <div className='level2-page__left'>
                <div className='level2-page__level-badge'>Nivel 2</div>
                <h2 className='level2-page__title'>Configura tu<br />Identidad de Mago</h2>
                <p className='level2-page__lore'>
                    Antes de aventurarte en el dungeon debes registrar tu identidad.
                    Git necesita saber quién realiza los hechizos para llevar un registro de tus acciones.
                </p>

                <div className='level2-page__objectives'>
                    <h5>Objetivos</h5>
                    <div className={`level2-page__objective ${nameSet ? 'completed' : ''}`}>
                        <span className='level2-page__objective-icon'>{nameSet ? '✓' : '◇'}</span>
                        <div>
                            <strong>Registrar nombre</strong>
                            <code>git config --global user.name "Tu Nombre"</code>
                        </div>
                    </div>
                    <div className={`level2-page__objective ${emailSet ? 'completed' : ''}`}>
                        <span className='level2-page__objective-icon'>{emailSet ? '✓' : '◇'}</span>
                        <div>
                            <strong>Registrar email</strong>
                            <code>git config --global user.email "tu@email.com"</code>
                        </div>
                    </div>
                </div>
            </div>

            <div className='level2-page__right'>
                <div className='level2-page__spellbook'>
                    <h5>Grimorio</h5>
                    <div className='level2-page__spellbook-entries'>
                        {spellHistory.map((s, i) => <p key={i}>{s}</p>)}
                    </div>
                </div>

                <div className='level2-page__console'>
                    <h5>Spelltable</h5>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={castSpell}
                            placeholder='git config --global user.name "Mago"'
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
