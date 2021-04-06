

import {errorWrap, mapError} from '../handlers.js';


export default function getHome(app) {
    return errorWrap(async function(req, res) {
      try {
        let url = `http://localhost:${app.locals.port}`;
        let response= {
            "links":[
               {
                  "rel":"self",
                  "name":"self",
                  "url":url
               },
               {
                  "url":url+"/meta",
                  "name":"meta",
                  "rel":"describedby"
               },
               {
                  "rel":"collection",
                  "url":url + "/users",
                  "name":"users"
               },
               {
                  "rel":"collection",
                  "name":"articles",
                  "url":url + "/articles"
               },
               {
                  "rel":"collection",
                  "name":"comments",
                  "url":url + "/comments"
               }
            ]
         }
        res.json(response);
      }
      catch (err) {
        const mapped = mapError(err);
        res.status(mapped.status).json(mapped);
      }
    });
  }