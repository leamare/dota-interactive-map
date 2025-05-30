import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { transform } from 'ol/proj';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import LayerGroup from 'ol/layer/Group';
import Collection from 'ol/Collection';
import { dotaProj, pixelProj } from './projections';

const loadGeoJSON = (map, layerDef, data, version, id) => {
    try {
        const source = new SourceVector({
            url: `data/${version}/${layerDef.filename}`,
            format: new GeoJSON({ dataProjection: layerDef.projection || pixelProj }),
        });
        return new LayerVector({
            title: layerDef.name,
            projection: layerDef.projection || pixelProj,
            source,
            visible: !!layerDef.visible,
            style: layerDef.style,
        });
    }
    catch (e) {

    }
};

const loadPolygon = (map, layerDef, data, layer, id) => {
    const features = data.data[id].map((obj) => {
        const points = obj.points;
        const ring = points.map(point => transform([point.x, point.y], dotaProj, pixelProj));
        ring.push(transform([points[0].x, points[0].y], dotaProj, pixelProj));
        const geom = new Polygon([ring]);
        const feature = new Feature(geom);
        obj.id = id;
        feature.set('dotaProps', obj, true);
        return feature;
    });

    const vectorSource = new SourceVector({ features });

    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new LayerVector({
            title: layerDef.name,
            source: vectorSource,
            visible: !!layerDef.visible,
            style: layerDef.style,
        });
        layer.set('layerId', layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        layer.set('showInfo', false, true);
    }

    return layer;
};

const loadJSON = (map, layerDef, data, layer, id) => {
    const features = Array.isArray(data.data[id]) ? data.data[id].map((point) => {
        const unitClass = point.subType ? `${id}_${point.subType}` : id;
        const stats = (data.stats || {})[unitClass] || null;
        
        const bounds = layerDef.id == 'ent_dota_tree' ? [64, 64] : (stats ? stats.bounds : data.data[unitClass][0].bounds);
        const geom = (bounds && bounds[0] > 0 && bounds[1] > 0)
            ? new Polygon([[
                transform([point.x - bounds[0], point.y - bounds[1]], dotaProj, pixelProj),
                transform([point.x - bounds[0], point.y + bounds[1]], dotaProj, pixelProj),
                transform([point.x + bounds[0], point.y + bounds[1]], dotaProj, pixelProj),
                transform([point.x + bounds[0], point.y - bounds[1]], dotaProj, pixelProj),
                transform([point.x - bounds[0], point.y - bounds[1]], dotaProj, pixelProj),
            ]])
            : new Point(transform([point.x, point.y], dotaProj, pixelProj));

        const feature = new Feature(geom);

        point.id = layerDef.id;
        point.unitClass = unitClass;
        feature.set('dotaProps', point, true);

        return feature;
    }) : {};

    const vectorSource = new SourceVector({ features });

    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new LayerVector({
            title: layerDef.name,
            source: vectorSource,
            visible: !!layerDef.visible,
            style: layerDef.style,
        });
        layer.set('layerId', layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        layer.set('showInfo', false, true);
    }

    return layer;
};

const loadLayerGroupFromData = (InteractiveMap, data, version, layersIndex, layerDefs) => {
    const layers = [];
    for (let i = 0; i < layerDefs.length; i++) {
        const layerDef = layerDefs[i];

        let id = layerDef.id;
        if ((!data.data[id] || !data.data[id].length) && layerDef.fallbacks) {
            for (const fallbackId of layerDef.fallbacks) {
                if (data.data[fallbackId] && data.data[fallbackId].length) {
                    id = fallbackId;
                    break;
                }
            }
        }

        if (!data.data[id] && ((layerDef.type !== 'pullRange' && layerDef.type !== 'GeoJSON') || version == '688')) continue;
        if (layerDef.id == 'dota_movespeed_modifier_path' && (+version.substring(0, 3)) < 738) continue;

        let layer;
        switch (layerDef.type) {
        case 'GeoJSON':
            layer = loadGeoJSON(InteractiveMap.map, layerDef, layersIndex[layerDef.id], version, id);
            break;
        case 'polygon':
            layer = loadPolygon(InteractiveMap.map, layerDef, data, layersIndex[layerDef.id], id);
            break;
        default:
            layer = loadJSON(InteractiveMap.map, layerDef, data, layersIndex[layerDef.id], id);
            break;
        }

        if (layer) {
            layersIndex[layerDef.id] = layer;
            layers.push(layer);
        }
    }

    return new LayerGroup({
        title: 'Layers',
        layers: new Collection(layers),
    });
};

export {
    loadGeoJSON,
    loadJSON,
    loadLayerGroupFromData,
};
