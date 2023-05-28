# Configuration

## `.env`

* `APP_NAME` - name of the application
* `MAP_DATA_PATH` - location of the map tiles
* `VISION_DATA_IMAGE_PATH` - current version's mapdata image
* `MAP_DATA_VERSION` - current version's tag
* `ENABLE_SAVE` - enable saving the map image
* `ENABLE_DOWNLOAD`
* `GOOGLE_ANALYTICS` - Google Analytics key
* `DEPLOY_PATH` - deploy path
* `ROLLBAR_CLIENT_TOKEN`
* `ROLLBAR_SERVER_TOKEN`
* `ROLLBAR_LOCAL_USERNAME`
* `ROLLBAR_USERNAME`
* `ROLLBAR_SOURCE_MAPPING_URL_PREFIX`

## `baseLayerDefinitions.js`

Exports array of objecs with following format:

```js
  {
      id: '733', // patch tag
      name: '7.33', // patch display name
      tilesets: [
          {
              id: 'default', // tileset tag
              name: 'Default' // tileset display name
          },
      ],
  },
```