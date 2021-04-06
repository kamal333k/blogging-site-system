import querystring from 'querystring';

import BlogError from '../blog-error.js';

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;
/**************************** Error Handling ***************************/

/** Ensures a server error results in nice JSON sent back to client
 *  with details logged on console.
 */ 
export function doErrors(app) {
    return async function(err, req, res, next) {
      res.status(SERVER_ERROR);
      res.json({ code: 'SERVER_ERROR', message: err.message });
      console.error(err);
    };
  }
  
  /** Set up error handling for handler by wrapping it in a 
   *  try-catch with chaining to error handler on error.
   */
  export function errorWrap(handler) {
    return async (req, res, next) => {
      try {
        await handler(req, res, next);
      }
      catch (err) {
        next(err);
      }
    };
  }
  
  const ERROR_MAP = {
    BAD_CATEGORY: NOT_FOUND,
    EXISTS: CONFLICT,
  }
  
  /** Map domain/internal errors into suitable HTTP errors.  Return'd
   *  object will have a "status" property corresponding to HTTP status
   *  code.
   */
  export function mapError(err) {
    console.error(err);
    return (err instanceof Array && err.length > 0 && err[0] instanceof BlogError)
      ? { status: (ERROR_MAP[err[0].code] || BAD_REQUEST),
      code: err[0].code,
      message: err.map(e => e.message).join('; '),
        }
      : { status: SERVER_ERROR,
      code: 'INTERNAL',
      message: err.toString()
        };
  } 
  
  /****************************** Utilities ******************************/
  
  /** Return original URL for req (excluding query params)
   *  Ensures that url does not end with a /
   */
  export function requestUrl(req) {
    const port = req.app.locals.port;
    const url = req.originalUrl.replace(/\/?(\?.*)?$/, '');
    return `${req.protocol}://${req.hostname}:${port}`;
  }
    
  //@TODO
  