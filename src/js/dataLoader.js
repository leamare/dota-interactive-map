import SourceVector from 'ol/source/vector';
import LayerVector from 'ol/layer/vector';
import GeoJSON from 'ol/format/geojson';
import proj from 'ol/proj';
import Polygon from 'ol/geom/polygon';
import Point from 'ol/geom/point';
import Feature from 'ol/feature';
import LayerGroup from 'ol/layer/group';
import Collection from 'ol/collection';
import { dotaProj, pixelProj } from './projections';

const loadGeoJSON = (map, layerDef, data, version) => {
    try {
        const source = new SourceVector({
            url: 'data/' + version + '/' + layerDef.filename,
            format: new GeoJSON({dataProjection: layerDef.projection || pixelProj})
        });
        return new LayerVector({
            title: layerDef.name,
            projection: layerDef.projection || pixelProj,
            source: source,
            visible: !!layerDef.visible,
            style: layerDef.style
        });
    }
    catch (e) {
    
    }
}

const loadPolygon = (map, layerDef, data, layer) => {
    const features = data.data[layerDef.id].map(obj => {
        const points = obj.points;
        const ring = points.map(point => proj.transform([point.x, point.y], dotaProj, pixelProj));
        ring.push(proj.transform([points[0].x, points[0].y], dotaProj, pixelProj))
        const geom = new Polygon([ring]);
        const feature = new Feature(geom);
        obj.id = layerDef.id;
        feature.set('dotaProps', obj, true);
        return feature;
    });
    
    const vectorSource = new SourceVector({
        features: features
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new LayerVector({
            title: layerDef.name,
            source: vectorSource,
            visible: !!layerDef.visible,
            style: layerDef.style
        });
        layer.set('layerId', layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        layer.set('showInfo', false, true);
    }

    return layer;
}

const loadJSON = (map, layerDef, data, layer) => {
    const features = data.data[layerDef.id].map(point => {
        const unitClass = point.subType ? layerDef.id + '_' + point.subType : layerDef.id;
        const stats = data.stats[unitClass];
        const bounds = layerDef.id == "ent_dota_tree" ? [64, 64] : stats.bounds;
        const geom = (bounds && bounds[0] > 0 && bounds[1] > 0)
            ? new Polygon([[
                proj.transform([point.x-bounds[0], point.y-bounds[1]], dotaProj, pixelProj),
                proj.transform([point.x-bounds[0], point.y+bounds[1]], dotaProj, pixelProj),
                proj.transform([point.x+bounds[0], point.y+bounds[1]], dotaProj, pixelProj),
                proj.transform([point.x+bounds[0], point.y-bounds[1]], dotaProj, pixelProj),
                proj.transform([point.x-bounds[0], point.y-bounds[1]], dotaProj, pixelProj)
            ]])
            : new Point(proj.transform([point.x, point.y], dotaProj, pixelProj))

        const feature = new Feature(geom);
        
        point.id = layerDef.id;
        point.unitClass = unitClass;
        feature.set('dotaProps', point, true);
        
        return feature;
    });
    
    const vectorSource = new SourceVector({
        features: features
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new LayerVector({
            title: layerDef.name,
            source: vectorSource,
            visible: !!layerDef.visible,
            style: layerDef.style
        });
        layer.set('layerId', layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        layer.set('showInfo', false, true);
    }

    return layer;
}

const loadNeutralPullRange = (InteractiveMap, layerDef, data, layer) => {
    const vectorSource = new SourceVector({
        features: []
    });
    
    if (layer) {
        layer.setSource(vectorSource);
    }
    else {
        layer = new LayerVector({
            title: layerDef.name,
            source: vectorSource,
            visible: !!layerDef.visible,
            style: layerDef.style
        });
        layer.set('layerId', layerDef.id, true);
        layer.set('layerDef', layerDef, true);
        layer.set('showInfo', false, true);
    }

    return layer;
}

const loadLayerGroupFromData = (InteractiveMap, data, version, layersIndex, layerDefs) => {
    const layers = [];
    for (let i = 0; i < layerDefs.length; i++) {
        const layerDef = layerDefs[i];
        if (!data.data[layerDef.id] && ((layerDef.type !== 'pullRange' && layerDef.type !== 'GeoJSON') || version == '688')) continue;
        let layer;
        switch (layerDef.type) {
            case 'GeoJSON':
                layer = loadGeoJSON(InteractiveMap.map, layerDef, layersIndex[layerDef.id], version);
            break;
            case 'polygon':
                layer = loadPolygon(InteractiveMap.map, layerDef, data, layersIndex[layerDef.id]);
            break;
            case 'pullRange':
                layer = loadNeutralPullRange(InteractiveMap, layerDef, data, layersIndex[layerDef.id]);
            break;
            default:
                layer = loadJSON(InteractiveMap.map, layerDef, data, layersIndex[layerDef.id]);
            break;
        }
        if (layer) {
            layersIndex[layerDef.id] = layer;
            layers.push(layer);
        }
    }
    return new LayerGroup({
        title: 'Layers',
        layers: new Collection(layers)
    });
}

export {
    loadGeoJSON,
    loadJSON,
    loadLayerGroupFromData,
};