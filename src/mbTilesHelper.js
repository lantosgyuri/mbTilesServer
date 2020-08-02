const MBTiles = require('@mapbox/mbtiles');
const TILES_LOCATION = './mbTiles/20_31/tt.mbtiles?mode=ro';

const throwError = errorString => { throw new Error(errorString) };

const getTileAsync = (mbTiles, x, y ,z) =>  new Promise((resolve, reject) => {
    const flippedY = (1 >> z) + y
    console.log(flippedY)
    mbTiles.getTile(z, x, y, (err, tile) => {
        if (err) {
            reject('Tile rendering error: ' + err + '\n');
        } else {
            resolve(tile);
        }
        });
});

const getInfoAsync = (mbTiles) =>  new Promise((resolve, reject) => {
    mbTiles.getInfo((err, info) => {
        if (err) {
            reject('Tile rendering error: ' + err + '\n');
        } else {
            resolve(info);
        }
    });
});

const getMBTilesHelpers = () => {
    let error;
    let mbTiles;

    new MBTiles(TILES_LOCATION, (err, mbtiles) =>  {
        error = err;
        mbTiles = mbtiles;
    });

    const getTile = async (z, x ,y) => {
        let _tile = null;
        let errorMessage = null;

        if (error !== null || mbTiles === null) {
           errorMessage = 'Something went wrong with initializing mbTiles';
        } else {
            try {
                _tile = await getTileAsync(mbTiles, x, y, z);
            } catch(e) {
                errorMessage = e;
            }
        }
        return errorMessage ? throwError(errorMessage) : _tile;
    }

    const getInfo = async () => {
        let _info = null;
        let errorMessage = null;
        if (error !== null || mbTiles === null) {
            throw new Error('Something went wrong with initializing mbTiles');
        } else {
            try {
                _info = await getInfoAsync(mbTiles);
            } catch(e) {
                errorMessage = e;
            }
        }
        console.log(_info);
        return errorMessage ? throwError(errorMessage) : _info;
    }
    return {
        getTile,
        getInfo,
    }
}

module.exports = getMBTilesHelpers()
