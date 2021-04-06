
import {errorWrap, mapError} from '../handlers.js';


export default function getMetaData(category, app) {
    return errorWrap(async function(req, res) {
      try {

        const response = Object.assign({},app.locals.meta);
        response.links = {
          name: "self",
          rel: "self",
          href: `http://localhost:${app.locals.port}/meta`
        }
        res.json(response);
      }
      catch (err) {
        const mapped = mapError(err);
        res.status(mapped.status).json(mapped);
      }
    });
  }