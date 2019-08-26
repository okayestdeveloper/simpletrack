import { Application } from 'express';
import { siteRoutes } from './site.routes';

export function mountRoutes(app: Application) {
  app.use('/api/sites', siteRoutes);
}
