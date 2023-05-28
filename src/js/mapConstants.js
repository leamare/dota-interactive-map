const scaleFactor = 0.8;

const mapConstants = {
    // old map size: 16384
    map_w: 20480,
    map_h: 20480,
    map_x_boundaries: [-10829.42,  11487.75],
    map_y_boundaries: [11351.48, -10939.96],
    // map_x_boundaries: [-8507.4, 9515], pre-7.33
    // map_y_boundaries: [8888.12001679, -8953.45782627], pre-7.33
    scaleFactor,
    resolutions: [
        20480 * scaleFactor / 1024,
        20480 * scaleFactor / 1024 / 2,
        20480 * scaleFactor / 1024 / 4,
        20480 * scaleFactor / 1024 / 8,
        20480 * scaleFactor / 1024 / 16,
    ],
    // 0.8 being scale factor
    visionRadius: {
        observer: 1600,
        sentry: 1000,
        darkness: 675,
    },
    defaultMovementSpeed: 300,
    creepBaseMovementSpeed: 325,
    pullRangeTiming: [4, 2.25, 4.75],
};
mapConstants.imgCenter = [mapConstants.map_w / 2, mapConstants.map_h / 2];
mapConstants.scale = Math.abs(mapConstants.map_x_boundaries[1] - mapConstants.map_x_boundaries[0]) / mapConstants.map_w;

export default mapConstants;
