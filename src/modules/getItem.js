import {errorWrap, mapError} from '../handlers.js';
import responseWithLinksAndPagination from '../linksAndPagination.js'


export default function getItem(category, app) {
    return errorWrap(async function(req, res) {
      const q = req.query || {};
      try {
        const id = req.params.id;
        const results = await app.locals.model.find(category, {id:id});
        
        let response = {};
        if(results.length>0){
          response = responseWithLinksAndPagination(app, category, req, results);
          res.json(response);
        }else{
          response[category] = results;
          res.json(response);
          throw {
            isDomain: true,
            errorCode: 'NOT_FOUND',
            message: `${category} ${id} not found`,
          };
        }
      }
      catch (err) {
        const mapped = mapError(err);
        res.status(mapped.status).json(mapped);
      }
    });
  }