import {errorWrap, mapError} from '../handlers.js';
export default function doDelete(category, app) {
    return errorWrap(async function(req, res) {
      try {
        const id = req.params.id;
        const results = await app.locals.model.remove(category,{ id: id });
        
        res.json({});
        res.sendStatus(OK);
      }
      catch(err) {
        const mapped = mapError(err);
        res.status(mapped.status).json(mapped);
      }
    });
}
const OK = 200;