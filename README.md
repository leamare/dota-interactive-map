# Dota Interactive Map

[Interactive Dota Map](http://devilesk.com/dota2/apps/interactivemap/)

Powered by [OpenLayers](https://github.com/openlayers/openlayers)

Originally developed by @devilesk

## Changes from the original version

- Updated to 7.32 map version (and/or further)
- Updated scaling, coordinates and world size to 7.33
- Added new objects for 7.32/7.33:
  - Landmarks and Landmark Auras
  - Lotus Pools
  - Watchers
  - Twin Gates
  - XP Runes
  - Tormentors
  - 2nd Roshan Spawn Point
- Slightly more details regarding the installation
- baseLayerDefinitions were removed from the actual repository for easier setup (no need to modify any tracked files to remove unused layers)
  - makes it easier to deploy even if you don't have tilesets for specific layers/want to add your own
  - it might not be a good idea, but it looks practical to me
- Removed both tiles and gitmodules for them
  - they were incorrectly configured anyway, and the repository itself doesn't have map versions past 720, so fetching tiles from Courier becomes a prefferable way to get them
- Updated SVG icons for objects on the map, as well as improved scaling for them depending on the resolution
- Added display with unit tag and names
- Added other power rune icons and random shuffle of the icons on page refresh

## Quick start

More details: [Introduction](docs/01-intro.md)

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
