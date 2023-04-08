# Dota Interactive Map

[Interactive Dota Map](http://devilesk.com/dota2/apps/interactivemap/)

Powered by [OpenLayers](https://github.com/openlayers/openlayers)

Originally developed by @devilesk

## Changes from the original version

- Updated to 7.32 map version (and/or further)
- Slightly more details regarding the installation
- baseLayerDefinitions were removed from the actual repository for easier setup (no need to modify any tracked files to remove unused layers)
  - makes it easier to deploy even if you don't have tilesets for specific layers/want to add your own
  - it might not be a good idea, but it looks practical to me
- Removed both tiles and gitmodules for them
  - they were incorrectly configured anyway, and the repository itself doesn't have map versions past 720, so fetching tiles from Courier becomes a prefferable way to get them

## Quick start

```
# Clone repository
$ git clone https://github.com/devilesk/dota-interactive-map.git
$ cd dota-interactive-map

# Load dota-map-tiles submodule 
$ git submodule init
$ git submodule update

# Install dependencies
$ npm install

# Create .env file
$ mv .env.example .env

# Build project
$ npm run build

# Serve build
$ npx run serve
```

You will need some map data and tiles for `assets` folder, which you can acquire here:

- tiles: [Spectral Courier](https://spectral.gg/reshub), path "images/dota/maps/tiles"
  - every patch is placed in its corresponding folder (e.g. 732 for 7.32), every layer is placed in a separate folder, `default` is default
  - every layer has versions 0 to 4 for different scale factors, with file names being like `tile_0_0.jpg` with numbers being in range [0; 2^(N+2)-1] (e.g. 0-3 for `0` and 0-63 for `4`)
  - reference tiles can be found in [devilesk/dota-map-tiles](https://github.com/devilesk/dota-map-tiles) (it includes tiles for a bunch of old versions of the map)
- map data: can be acquired from [devilesk/dota-map-coordinates](https://github.com/devilesk/dota-map-coordinates)

After that you need to update the map data to your current map version using `npm run generatejson PATCHCODE` to get most of the data required for the map.

You should also update `baseLayerDefinitions.js` (using `baseLayerDefinitions.example.js` file as reference), specifying the tile sets and map versions you are using.