import cors from 'cors';
import bodyParser from 'body-parser';
import {doErrors} from './handlers.js';

import getList from './modules/getList.js';
import getItem from './modules/getItem.js';
import getMetaData from './modules/getMetaData.js';
import getHome from './modules/getHome.js';
import doUpdate from './modules/doUpdate.js';
import doDelete from './modules/doDelete.js';
import doCreate from './modules/doCreate.js';

export default function setupRoutes(app) {
    const base = app.locals.meta;
    
    app.use(cors());
    app.use(bodyParser.json());
    app.get('/', getHome(app));
    category.forEach((cat)=>{
        app.get(`/${cat}`, getList(cat, app));
        app.get(`/${cat}/:id`, getItem(cat, app));
        app.patch(`/${cat}/:id`, doUpdate(cat, app));
        app.delete(`/${cat}/:id`, doDelete(cat, app));
        app.post(`/${cat}`, doCreate(cat, app));
    })
    app.get('/meta', getMetaData('meta', app));
    app.use(doErrors());
    //@TODO
  }

  const category = ['users', 'articles', 'comments']