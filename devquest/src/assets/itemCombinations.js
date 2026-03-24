// ============================================================
// DICCIONARIO DE COMBINACIONES
// Cada combinación de 2-4 items produce un resultado único.
// La clave se genera ordenando los IDs alfabéticamente y uniéndolos con '+'.
// Si solo hay 1 item, se mantiene el mismo.
// ============================================================

const combinations = {

    // ── 2 items (15 combinaciones) ────────────────────────────

    'fireGem+iceGem':               'steamEssence',
    'fireGem+lightEssence':         'sacredFlame',
    'fireGem+manaStone':            'flameShard',
    'fireGem+shadowEssence':        'scorchShadow',
    'fireGem+thunderShard':         'volcanicCore',
    'iceGem+lightEssence':          'pureIce',
    'iceGem+manaStone':             'frostCrystal',
    'iceGem+shadowEssence':         'shadowIce',
    'iceGem+thunderShard':          'blizzardShard',
    'lightEssence+manaStone':       'holyOrb',
    'lightEssence+shadowEssence':   'twilightEssence',
    'lightEssence+thunderShard':    'holyThunder',
    'manaStone+shadowEssence':      'darkRune',
    'manaStone+thunderShard':       'stormRune',
    'shadowEssence+thunderShard':   'darkStorm',

    // ── 3 items (20 combinaciones) ────────────────────────────

    'fireGem+iceGem+lightEssence':              'glacialLight',
    'fireGem+iceGem+manaStone':                 'infernoCore',
    'fireGem+iceGem+shadowEssence':             'shadowFlame',
    'fireGem+iceGem+thunderShard':              'chaosCore',
    'fireGem+lightEssence+manaStone':           'divineFire',
    'fireGem+lightEssence+shadowEssence':       'phoenixDust',
    'fireGem+lightEssence+thunderShard':        'radiantFlame',
    'fireGem+manaStone+shadowEssence':          'abyssalFlame',
    'fireGem+manaStone+thunderShard':           'arcaneStorm',
    'fireGem+shadowEssence+thunderShard':       'hellshard',
    'iceGem+lightEssence+manaStone':            'sacredIce',
    'iceGem+lightEssence+shadowEssence':        'moonShard',
    'iceGem+lightEssence+thunderShard':         'sacredStorm',
    'iceGem+manaStone+shadowEssence':           'voidCrystal',
    'iceGem+manaStone+thunderShard':            'polarVortex',
    'iceGem+shadowEssence+thunderShard':        'tempestShadow',
    'lightEssence+manaStone+shadowEssence':     'eclipseEssence',
    'lightEssence+manaStone+thunderShard':      'celestialRune',
    'lightEssence+shadowEssence+thunderShard':  'voidStorm',
    'manaStone+shadowEssence+thunderShard':     'apocalypseRune',

    // ── 4 items (15 combinaciones) ────────────────────────────

    'fireGem+iceGem+lightEssence+manaStone':            'celestialCore',
    'fireGem+iceGem+lightEssence+shadowEssence':        'mysticDust',
    'fireGem+iceGem+lightEssence+thunderShard':         'arcticFire',
    'fireGem+iceGem+manaStone+shadowEssence':           'abyssalCore',
    'fireGem+iceGem+manaStone+thunderShard':            'primordialCore',
    'fireGem+iceGem+shadowEssence+thunderShard':        'elementalChaos',
    'fireGem+lightEssence+manaStone+shadowEssence':     'soulFlame',
    'fireGem+lightEssence+manaStone+thunderShard':      'divineLightning',
    'fireGem+lightEssence+shadowEssence+thunderShard':  'apocalypseShard',
    'fireGem+manaStone+shadowEssence+thunderShard':     'chaosRune',
    'iceGem+lightEssence+manaStone+shadowEssence':      'moonCrystal',
    'iceGem+lightEssence+manaStone+thunderShard':       'arcticAura',
    'iceGem+lightEssence+shadowEssence+thunderShard':   'cosmicShard',
    'iceGem+manaStone+shadowEssence+thunderShard':      'darkVortex',
    'lightEssence+manaStone+shadowEssence+thunderShard':'judgmentRune',
};

/**
 * Combina un array de item IDs y devuelve el ID del item resultante.
 * - 0 items → null
 * - 1 item  → mismo item (sin cambio)
 * - 2-4 items → resultado de la combinación, o null si no existe
 */
export const combineItems = (items) => {
    if (!items || items.length === 0) return null;
    if (items.length === 1) return items[0];

    const key = [...items].sort().join('+');
    return combinations[key] || null;
};

export default combinations;
