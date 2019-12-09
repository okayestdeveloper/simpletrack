import { Request, Response,  } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
const Router = require('express-promise-router');
import { SiteFactory } from './../models/site/site.factory';
import { Site } from '../models/site/site.model';
const cors = require('cors');
import { corsOptions } from '../config';

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
// export our router to be mounted by the parent application
export const siteRoutes = new Router();

siteRoutes.get('/', async (req: Request, res: Response) => {
  const sites = await SiteFactory.loadList();
  res.status(200).send(sites);
});

siteRoutes.get('/:id', async (req: Request, res: Response) => {
  const params = req.params as ParamsDictionary;
  if (!params.id) {
    res.status(400).end();
    return;
  }
  const site = await SiteFactory.load(req.param('id'));
  res.status(200).send(site);
});

siteRoutes.post('/', cors(corsOptions), async (req: Request, res: Response) => {
  let site = new Site(req.body);
  const valid = site.validate();
  if (valid !== null) {
    res.status(400).send(valid);
    return;
  }

  try {
    site = await site.save();
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ message: 'There was an error creating the site.'});
    return;
  }

  res.status(200).send(site.toJSON());
});

siteRoutes.put('/:id', cors(corsOptions), async (req: Request, res: Response) => {
  const params = req.params as ParamsDictionary;
  if (!params.id) {
    res.status(400).end();
    return;
  }

  let site = await SiteFactory.load(params.id);
  site.set(req.body);
  site.siteId = params.id;
  const valid = site.validate();
  if (valid !== null) {
    res.status(400).send(valid);
    return;
  }

  try {
    site = await site.save();
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ message: 'There was an error saving the site.' });
    return;
  }

  res.status(200).send(site.toJSON());
});


siteRoutes.delete('/:id', cors(corsOptions), async (req: Request, res: Response) => {
  if (!req.param('id')) {
    res.status(400).end();
    return;
  }
  await SiteFactory.delete(req.param('id'));
  res.status(200).end();
});
