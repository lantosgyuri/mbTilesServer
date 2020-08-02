const mbtilesHelper = require('../../../mbTilesHelper')

const getTilePNG  = async (req, res, next) => {
    // TODO check params
    const { z, x, y } = req.params;

    try {
         const tile  = await mbtilesHelper.getTile(z, x, y);
         res.header("Content-Type", "image/png");
         res.status(200);
         res.send(tile)
    } catch (e) {
        const error = new Error(e.message);
        res.status(418);
        next(error);
    }
};

module.exports = {
    getTilePNG,
};
