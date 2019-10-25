import { Request, Response } from 'express';
const Router = require('express-promise-router');
import { SiteFactory } from './../models/site/site.factory';
import { Site } from '../models/site/site.model';

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
  if (!req.param('id')) {
    res.status(400).end();
    return;
  }
  const site = await SiteFactory.load(req.param('id'));
  res.status(200).send(site);
});

siteRoutes.post('/', async (req: Request, res: Response) => {
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

siteRoutes.put('/:id', async (req: Request, res: Response) => {
  if (!req.param('id')) {
    res.status(400).end();
    return;
  }

  let site = new Site(req.body);
  site.siteId = req.param('id');
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


siteRoutes.delete('/:id', async (req: Request, res: Response) => {
  if (!req.param('id')) {
    res.status(400).end();
    return;
  }
  await SiteFactory.delete(req.param('id'));
  res.status(200).end();
});
