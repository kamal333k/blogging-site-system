import {errorWrap, mapError} from '../handlers.js';
import responseWithLinksAndPagination from '../linksAndPagination.js'

export default function getList(category, app) {    
    return errorWrap(async function(req, res) {
      const q = req.query || {};
      console.log("query", category,q);
      
      try {
        const results = await app.locals.model.find(category, q);
        console.log("results",results);
        
        let response = {};
        if(results.length>0){
            response = responseWithLinksAndPagination(app, category, req, results);
        }else{
            response[category] = results;
        }

        res.json(response);
      }
      catch (err) {
        const mapped = mapError(err);
        res.status(mapped.status).json(mapped);
      }
    });
  }