import {errorWrap, mapError, requestUrl} from '../handlers.js';
export default function doCreate(category, app) {
    return errorWrap(async function(req, res) {
      try {
        const obj = req.body;
        const results = await app.locals.model.create(category, obj);
        res.append('Location', requestUrl(req) + '/' + category +'/' + obj.id);
        res.json({});
        res.sendStatus(CREATED);
      }
      catch(err) {
        const mapped = mapError(err);
        res.status(mapped.status).json(mapped);
      }
    });
  }

const CREATED = 201;