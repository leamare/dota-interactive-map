# Introduction

Interactive map is using data from [leamare/dota-map-coordinates](https://github.com/leamare/dota-map-coordinates) repository

## Quick Start

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
  - every layer has versions 0 to 4 for different scale factors, with file names being like `tile_0_0.jpg` with numbers being in range [0; 5*2^N-1] (e.g. 0-4 for `0` and 0-79 for `4`)
  - reference tiles for pre-7.33 map can be found in [devilesk/dota-map-tiles](https://github.com/devilesk/dota-map-tiles) (it includes tiles for a bunch of old versions of the map)
- map data: can be acquired from [leamare/dota-map-coordinates](https://github.com/leamare/dota-map-coordinates)

Instructions on generating map image and splitting it into tiles are in [Generating Map Image](05-mapimage.md) section.

After that you need to update the map data to your current map version using `npm run generatejson PATCH_TAG_` to get most of the data required for the map.

You should also update `baseLayerDefinitions.js` (using `baseLayerDefinitions.example.js` file as reference), specifying the tile sets and map versions you are using.

