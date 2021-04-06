import assert from 'assert';
import setupRoutes from './src/routes.js';
import express from 'express';


export default function serve(port, meta, model) {
  const app = express();
  
  app.locals.port = port;
  app.locals.meta = meta;
  app.locals.model = model;
  
  setupRoutes(app);
  app.listen(port, function() {
    console.log(`listening on port ${port}`);
  });
}