// ============================================================
// SISTEMA DE MERGE DE RAMAS
// La clave se genera ordenando los dos item IDs y uniéndolos con '+'.
// Si la combinación no existe → 'burntCarbon'
// ============================================================

// ── Ranking de poder por item ─────────────────────────────
export const itemTiers = {
    // T0 – Fracaso
    burntCarbon: 0,
    // T1 – Común (base items)
    manaStone: 1, fireGem: 1, iceGem: 1,
    thunderShard: 1, shadowEssence: 1, lightEssence: 1,
    // T2 – Inusual (2-item craft)
    steamEssence: 2, sacredFlame: 2, flameShard: 2, scorchShadow: 2, volcanicCore: 2,
    pureIce: 2, frostCrystal: 2, shadowIce: 2, blizzardShard: 2, holyOrb: 2,
    twilightEssence: 2, holyThunder: 2, darkRune: 2, stormRune: 2, darkStorm: 2,
    // T3 – Raro (3-item craft)
    glacialLight: 3, infernoCore: 3, shadowFlame: 3, chaosCore: 3, divineFire: 3,
    phoenixDust: 3, radiantFlame: 3, abyssalFlame: 3, arcaneStorm: 3, hellshard: 3,
    sacredIce: 3, moonShard: 3, sacredStorm: 3, voidCrystal: 3, polarVortex: 3,
    tempestShadow: 3, eclipseEssence: 3, celestialRune: 3, voidStorm: 3, apocalypseRune: 3,
    // T4 – Épico (4-item craft)
    celestialCore: 4, mysticDust: 4, arcticFire: 4, abyssalCore: 4, primordialCore: 4,
    elementalChaos: 4, soulFlame: 4, divineLightning: 4, apocalypseShard: 4, chaosRune: 4,
    moonCrystal: 4, arcticAura: 4, cosmicShard: 4, darkVortex: 4, judgmentRune: 4,
    // T5 – Legendario (merge T3/T4)
    ragnarokBlade: 5, absoluteZeroOrb: 5, seraphimCore: 5, abyssalCrown: 5,
    primordialForge: 5, cosmicMantle: 5, voidTempest: 5, soulEclipse: 5,
    stormGlacier: 5, armageddonCore: 5, cosmicAura: 5, dualityForge: 5,
    lunarEclipse: 5, infernoVoid: 5, celestialStorm: 5, divineStorm: 5,
    shadowInferno: 5, phoenixAscension: 5,
    // T6 – Mítico (merge T5)
    cosmicBlade: 6, twilightGod: 6, universeCore: 6, voidEmperor: 6,
    glacialTitan: 6, eternityForge: 6, dragonGodBlade: 6, moonEmperor: 6,
    infernoEmperor: 6,
    // T7 – Superior (merge T6)
    omegaArtifact: 7, primordialGod: 7, ascendedRelic: 7, theAbsolute: 7, ascendantBeing: 7,
};

export const tierInfo = {
    0: { label: 'Fracaso',    color: '#555555' },
    1: { label: 'Común',      color: '#aaaaaa' },
    2: { label: 'Inusual',    color: '#2ecc71' },
    3: { label: 'Raro',       color: '#3498db' },
    4: { label: 'Épico',      color: '#9b59b6' },
    5: { label: 'Legendario', color: '#f39c12' },
    6: { label: 'Mítico',     color: '#e74c3c' },
    7: { label: 'Superior',   color: '#ff69b4' },
};

// ── Diccionario de merges ─────────────────────────────────
// Claves: IDs ordenados y unidos con '+' → resultado
const mergeCombinations = {

    // ── T3/T4 × T3/T4 → T5 Legendario (18 combos) ──────

    'arcaneStorm+infernoCore':          'ragnarokBlade',
    'polarVortex+sacredIce':            'absoluteZeroOrb',
    'celestialRune+divineFire':         'seraphimCore',
    'apocalypseRune+voidCrystal':       'abyssalCrown',
    'chaosCore+elementalChaos':         'primordialForge',
    'celestialCore+judgmentRune':       'cosmicMantle',
    'darkVortex+primordialCore':        'voidTempest',
    'moonCrystal+soulFlame':            'soulEclipse',
    'arcticAura+divineLightning':       'stormGlacier',
    'apocalypseShard+chaosRune':        'armageddonCore',
    'cosmicShard+mysticDust':           'cosmicAura',
    'abyssalCore+arcticFire':           'dualityForge',
    'eclipseEssence+moonShard':         'lunarEclipse',
    'hellshard+voidStorm':              'infernoVoid',
    'divineLightning+glacialLight':     'celestialStorm',
    'radiantFlame+sacredStorm':         'divineStorm',
    'abyssalFlame+tempestShadow':       'shadowInferno',
    'apocalypseShard+phoenixDust':      'phoenixAscension',

    // ── T5 × T5 → T6 Mítico (9 combos) ─────────────────

    'absoluteZeroOrb+ragnarokBlade':    'cosmicBlade',
    'abyssalCrown+seraphimCore':        'twilightGod',
    'cosmicMantle+primordialForge':     'universeCore',
    'infernoVoid+voidTempest':          'voidEmperor',
    'cosmicAura+stormGlacier':          'glacialTitan',
    'armageddonCore+soulEclipse':       'eternityForge',
    'divineStorm+dualityForge':         'dragonGodBlade',
    'celestialStorm+lunarEclipse':      'moonEmperor',
    'phoenixAscension+shadowInferno':   'infernoEmperor',

    // ── T6 × T6 → T7 Superior (5 combos) ────────────────

    'cosmicBlade+twilightGod':          'omegaArtifact',
    'universeCore+voidEmperor':         'primordialGod',
    'eternityForge+glacialTitan':       'ascendedRelic',
    'dragonGodBlade+moonEmperor':       'theAbsolute',
    'infernoEmperor+omegaArtifact':     'ascendantBeing',
};

/**
 * Combina los items de dos ramas.
 * Devuelve el ID del item resultante, o 'burntCarbon' si son incompatibles.
 */
export const mergeBranches = (itemA, itemB) => {
    if (!itemA && !itemB) return null;
    if (!itemA) return itemB;
    if (!itemB) return itemA;
    if (itemA === itemB) return 'burntCarbon'; // mismos items → incompatible

    const key = [itemA, itemB].sort().join('+');
    return mergeCombinations[key] || 'burntCarbon';
};

export default mergeCombinations;
