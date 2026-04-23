import React, { useState } from 'react';
import './combinationsGuide.css';
import combinations from '../assets/itemCombinations';
import mergeCombinations, { itemTiers, tierInfo } from '../assets/mergeCombinations';
import { itemIcons } from '../assets/dungeonConfig';

const GOAL_ITEM = 'theAbsolute'; // T7 Superior — dragonGodBlade + moonEmperor

const icon = (id) => itemIcons[id] || '❓';

const TierBadge = ({ itemId, style = {} }) => {
    const tier = itemTiers[itemId];
    const info = tierInfo[tier];
    if (!info) return null;
    return (
        <span
            style={{
                fontSize: '9px',
                padding: '1px 5px',
                borderRadius: '3px',
                fontWeight: 700,
                letterSpacing: '1px',
                background: `${info.color}22`,
                color: info.color,
                border: `1px solid ${info.color}55`,
                ...style,
            }}
        >
            T{tier} {info.label}
        </span>
    );
};

const RecipeRow = ({ ingredients, result }) => {
    const isGoal = result === GOAL_ITEM;
    return (
        <div className={`guide__recipe${isGoal ? ' guide__recipe--goal' : ''}`}>
            {ingredients.map((ing, i) => (
                <React.Fragment key={i}>
                    {i > 0 && <span className='recipe-sep'>+</span>}
                    <span title={ing}>{icon(ing)}</span>
                </React.Fragment>
            ))}
            <span className='recipe-arrow'>→</span>
            <span title={result}>{icon(result)}</span>
            <span className='recipe-name'>{result}</span>
            {isGoal && <TierBadge itemId={result} />}
        </div>
    );
};

const Section = ({ title, entries }) => (
    <>
        <div className='guide__section-title'>{title}</div>
        {entries.map(([key, result]) => (
            <RecipeRow
                key={key}
                ingredients={key.split('+')}
                result={result}
            />
        ))}
    </>
);

const craftTwo   = Object.entries(combinations).filter(([k]) => k.split('+').length === 2);
const craftThree = Object.entries(combinations).filter(([k]) => k.split('+').length === 3);
const craftFour  = Object.entries(combinations).filter(([k]) => k.split('+').length === 4);
const mergeT5    = Object.entries(mergeCombinations).filter(([, v]) => itemTiers[v] === 5);
const mergeT6    = Object.entries(mergeCombinations).filter(([, v]) => itemTiers[v] === 6);
const mergeT7    = Object.entries(mergeCombinations).filter(([, v]) => itemTiers[v] === 7);

export const CombinationsGuide = () => {
    const [open, setOpen] = useState(false);
    const goalTier = itemTiers[GOAL_ITEM];
    const goalInfo = tierInfo[goalTier];

    return (
        <>
            <div className='guide-bar'>
                <button className='guide-open-btn' onClick={() => setOpen(true)}>
                    📖 Guía
                </button>
            </div>

            {open && (
                <div className='guide__overlay' onClick={() => setOpen(false)}>
                    <div className='guide__modal' onClick={(e) => e.stopPropagation()}>
                        <div className='guide__header'>
                            <h5>📖 Guía de Combinaciones</h5>
                            <button className='guide__close-btn' onClick={() => setOpen(false)}>✕</button>
                        </div>

                        <div className='guide__goal-banner'>
                            <span className='guide__goal-emoji'>{icon(GOAL_ITEM)}</span>
                            🎯 Objetivo: {GOAL_ITEM}
                            {goalInfo && (
                                <span
                                    className='guide__goal-tier'
                                    style={{
                                        background: `${goalInfo.color}22`,
                                        color: goalInfo.color,
                                        border: `1px solid ${goalInfo.color}55`,
                                    }}
                                >
                                    T{goalTier} {goalInfo.label}
                                </span>
                            )}
                        </div>

                        <div className='guide__body'>
                            <Section title={`Crafting — 2 items (${craftTwo.length})`} entries={craftTwo} />
                            <Section title={`Crafting — 3 items (${craftThree.length})`} entries={craftThree} />
                            <Section title={`Crafting — 4 items (${craftFour.length})`} entries={craftFour} />
                            <Section title={`Merge de Ramas — T5 Legendario (${mergeT5.length})`} entries={mergeT5} />
                            <Section title={`Merge de Ramas — T6 Mítico (${mergeT6.length})`} entries={mergeT6} />
                            <Section title={`Merge de Ramas — T7 Superior (${mergeT7.length})`} entries={mergeT7} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
