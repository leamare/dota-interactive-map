import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import styles from './styleDefinitions';
import { dotaProj } from './projections';

const layerDefinitions = [
    {
        id: 'elevation',
        name: 'Elevation',
        filename: 'elevation.json',
        type: 'GeoJSON',
        group: 'overlay',
        projection: dotaProj,
        style: styles.elevation,
    },
    {
        id: 'path_corner',
        name: 'Lanes',
        filename: 'path_corner.json',
        type: 'GeoJSON',
        group: 'overlay',
        projection: dotaProj,
        style: styles.teamColor,
    },
    {
        id: 'npc_dota_spawner',
        name: 'Lane Spawns',
        filename: 'npc_dota_spawner.json',
        type: 'GeoJSON',
        group: 'overlay',
        projection: dotaProj,
        style: styles.creepSpawn,
    },
    {
        id: 'ent_fow_blocker_node',
        name: 'Vision Blocker',
        filename: 'ent_fow_blocker_node.json',
        type: 'GeoJSON',
        group: 'overlay',
        projection: dotaProj,
        style: new Style({
            fill: new Fill({ color: [0, 0, 255, 0.3] }),
            stroke: new Stroke({ color: [0, 0, 255, 0.8] }),
        }),
    },
    {
        id: 'no_wards',
        name: 'Invalid Wards',
        filename: 'no_wards.json',
        type: 'GeoJSON',
        group: 'overlay',
        projection: dotaProj,
        style: new Style({
            fill: new Fill({ color: [255, 0, 0, 0.3] }),
            stroke: new Stroke({ color: [255, 0, 0, 0.8] }),
        }),
    },
    {
        id: 'trigger_multiple',
        name: 'Spawn Boxes',
        type: 'polygon',
        group: 'overlay',
        style: new Style({
            fill: new Fill({ color: [0, 255, 125, 0.3] }),
            stroke: new Stroke({ color: [0, 255, 125, 0.8] }),
        }),
    },
    {
        id: 'map_zones',
        name: 'Map Zones',
        filename: 'map_zones.json',
        type: 'GeoJSON',
        group: 'overlay',
        projection: dotaProj,
        style: styles.mapZones,
    },
    {
        id: 'npc_dota_neutral_spawner',
        name: 'Neutral Camps',
        group: 'object',
        style: (feature, resolution) => styles.neutralCamp[parseInt(feature.get('dotaProps').neutralType)],
    },
    {
        id: 'landmark_aura',
        name: 'Landmark Auras',
        type: 'polygon',
        group: 'overlay',
        style: new Style({
            fill: new Fill({ color: [0, 125, 255, 0.3] }),
            stroke: new Stroke({ color: [0, 125, 255, 0.8] }),
        }),
    },
    {
        id: 'dota_movespeed_modifier_path',
        name: 'River Flow',
        filename: 'riverflow.json',
        type: 'GeoJSON',
        group: 'overlay',
        projection: dotaProj,
        style: styles.riverFlow,
    },
    {
        id: 'ent_dota_tree',
        name: 'Trees',
        group: 'object',
        style: (feature, resolution) => (feature.get('isCut') ? styles.tree.dead : styles.tree.alive),
        toggle: true,
    },
    {
        id: 'npc_dota_roshan_spawner',
        name: 'Roshan',
        group: 'object',
        style: styles.roshan,
    },
    {
        id: 'landmarks',
        name: 'Landmarks',
        group: 'object',
        style: styles.landmarks,
    },
    {
        id: 'npc_dota_miniboss_spawner',
        name: 'Tormentor',
        group: 'object',
        style: styles.sentinel,
    },
    {
        id: 'dota_item_rune_spawner_powerup',
        name: 'Runes',
        group: 'object',
        style: styles.rune,
    },
    {
        id: 'dota_item_rune_spawner_bounty',
        name: 'Bounty Runes',
        group: 'object',
        style: styles.bountyRune,
    },
    {
        id: 'ent_dota_fountain',
        name: 'Fountain',
        group: 'structure',
        style: styles.ent_dota_fountain,
        toggle: true,
    },
    {
        id: 'npc_dota_barracks',
        name: 'Barracks',
        group: 'structure',
        style: styles.npc_dota_barracks,
        toggle: true,
    },
    {
        id: 'npc_dota_filler',
        name: 'Buildings',
        group: 'structure',
        style: styles.npc_dota_filler,
        toggle: true,
    },
    {
        id: 'npc_dota_tower',
        name: 'Towers',
        group: 'structure',
        style: styles.npc_dota_tower,
        toggle: true,
    },
    {
        id: 'ent_dota_shop',
        name: 'Shops',
        group: 'structure',
        style: styles.ent_dota_shop,
    },
    {
        id: 'npc_dota_fort',
        name: 'Ancients',
        group: 'structure',
        style: styles.npc_dota_fort,
        toggle: true,
    },
    {
        id: 'npc_dota_healer',
        name: 'Shrines',
        group: 'structure',
        style: styles.npc_dota_healer,
        toggle: true,
    },
    {
        id: 'npc_dota_watch_tower',
        name: 'Outpost',
        group: 'structure',
        style: styles.npc_dota_watch_tower,
        toggle: true,
    },
    {
        id: 'npc_dota_lantern',
        name: 'Watcher',
        group: 'structure',
        style: styles.npc_dota_lantern,
        toggle: true,
    },
    {
        id: 'npc_dota_unit_twin_gate',
        name: 'Twin Gate',
        group: 'structure',
        style: styles.npc_dota_unit_twin_gate,
        toggle: true,
    },
    {
        id: 'npc_dota_lotus_pool',
        fallbacks: [
            'npc_dota_mango_tree',
        ],
        name: 'Lotus Pool',
        group: 'structure',
        style: styles.npc_dota_mango_tree,
        toggle: true,
    },
    {
        id: 'npc_dota_xp_fountain',
        fallbacks: [
            'dota_item_rune_spawner_xp',
        ],
        name: 'Shrine of Wisdom',
        group: 'structure',
        style: styles.npc_dota_xp_fountain,
        toggle: true,
    },
];

export default layerDefinitions;
