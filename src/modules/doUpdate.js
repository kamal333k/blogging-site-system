import {errorWrap, mapError} from '../handlers.js';
export default function doUpdate(category,app) {
    return errorWrap(async function(req, res) {
      try {
        const patch = Object.assign({}, req.body);
        patch.id = req.params.id;
        const results = app.locals.model.update(category, patch);
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