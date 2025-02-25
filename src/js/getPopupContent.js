import capitalize from './util/capitalize';

const unitNames = {
    npc_dota_roshan_spawner: 'Roshan',
    npc_dota_miniboss_spawner: 'Tormentor',
    dota_item_rune_spawner_powerup: 'Rune',
    dota_item_rune_spawner_bounty: 'Bounty Rune',
    dota_item_rune_spawner_xp: 'Experience Rune',
    ent_dota_tree: 'Tree',
    npc_dota_healer: 'Shrine',
    ent_dota_fountain: 'Fountain',
    npc_dota_fort: 'Ancient',
    ent_dota_shop: 'Shop',
    npc_dota_tower: 'Tower',
    npc_dota_barracks: 'Barracks',
    npc_dota_filler: 'Building',
    npc_dota_watch_tower: 'Outpost',
    npc_dota_lantern: 'Watcher',
    npc_dota_unit_twin_gate: 'Twin Gate',
    npc_dota_mango_tree: 'Lotus Pool',
    trigger_multiple: 'Neutral Camp Spawn Box',
    npc_dota_neutral_spawner: 'Neutral Camp',
    observer: 'Observer Ward',
    sentry: 'Sentry Ward',
    landmark_aura: 'Landmark with Aura',
    landmarks: 'Landmark',
    riverflow: 'River Flow',
    wisdom_shrine: 'Shrine of Wisdom',
};

const landmarkNames = {
    well: 'Well of Wishes',
    mines: 'Mines',
    graveyard: 'Graveyard',
    statue: 'Dark Statue',
};

const getUnitName = (unitType, unitSubType) => (unitSubType
    ? `${capitalize(unitSubType.replace('tower', 'Tier ').replace('range', 'Ranged'))} `
    : '') + unitNames[unitType];

const pullTypes = ['Normal', 'Fast', 'Slow', 'Omega Slow', 'Giga Slow'];
const neutralTypes = ['Easy', 'Medium', 'Hard', 'Ancient'];

const getPopupContent = (stats, feature) => {
    const dotaProps = feature.get('dotaProps');
    const unitClass = dotaProps.subType ? `${dotaProps.id}_${dotaProps.subType}` : dotaProps.id;
    const unitStats = stats[unitClass];
    const unitName = dotaProps.triggerName || dotaProps.name || null;
    let htmlContent = `<div class="info"><span class="info-header">${getUnitName(dotaProps.id, dotaProps.subType)}</span><span class="info-body">`;
    if (unitClass) {
        htmlContent += `<br><span class="info-line">Unit: ${unitClass}</span>`;
    }
    if (unitName) {
        htmlContent += `<br><span class="info-line">Name: ${unitName}</span>`;
    }
    if (dotaProps.pullType != null) {
        htmlContent += `<br><span class="info-line">Pull Type: ${pullTypes[dotaProps.pullType]} (${dotaProps.pullType})</span>`;
    }
    if (dotaProps.neutralType != null) {
        htmlContent += `<br><span class="info-line">Difficulty: ${neutralTypes[dotaProps.neutralType]}</span>`;
    }
    if (stats && unitStats) {
        if (unitStats.hasOwnProperty('damageMin') && unitStats.hasOwnProperty('damageMax')) {
            htmlContent += `<br><span class="info-line">Damage: ${unitStats.damageMin}&ndash;${unitStats.damageMax}</span>`;
        }
        if (unitStats.hasOwnProperty('bat')) {
            htmlContent += `<br><span class="info-line">BAT: ${unitStats.bat}</span>`;
        }
        if (unitStats.hasOwnProperty('attackRange')) {
            htmlContent += `<br><span class="info-line">Attack Range: ${unitStats.attackRange}</span>`;
        }
        if (unitStats.hasOwnProperty('health')) {
            htmlContent += `<br><span class="info-line">Health: ${unitStats.health}</span>`;
        }
        if (unitStats.hasOwnProperty('armor')) {
            htmlContent += `<br><span class="info-line">Armor: ${unitStats.armor}</span>`;
        }
        if (unitStats.hasOwnProperty('dayVision') && unitStats.hasOwnProperty('nightVision')) {
            htmlContent += `<br><span class="info-line">Vision: ${unitStats.dayVision}/${unitStats.nightVision}</span>`;
        }
    }
    if (unitClass === 'landmarks') {
        htmlContent += `<br><span class="info-line">${landmarkNames[dotaProps.name]}</span>`;
    }
    htmlContent += '</span></div>';
    return htmlContent;
};

export default getPopupContent;
