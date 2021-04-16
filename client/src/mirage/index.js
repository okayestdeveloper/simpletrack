import { Server, Model, belongsTo, hasMany } from "miragejs";

import assetTypes from "./fixtures/asset-types.json";
import assetStatuses from "./fixtures/asset-statuses.json";
import assets from "./fixtures/assets.json";
import locations from "./fixtures/locations.json";
import sites from "./fixtures/sites.json";
import users from "./fixtures/users.json";

import assetTypeRoutes from "./routes/asset-types";
import assetStatusRoutes from "./routes/asset-statuses";
import assetRoutes from "./routes/assets";
import locationRoutes from "./routes/locations";
import siteRoutes from "./routes/sites";
import userRoutes from "./routes/users";

// import seed data (fixtures) and routes here

function makeServer({ environment = "test" } = {}) {
  return new Server({
    environment,
    urlPrefix: `http://${process.env.REACT_APP_API_HOST}`,
    namespace: "api",

    // define available models and relationships here
    models: {
      assetType: Model.extend({
        assets: hasMany(),
      }),
      assetStatus: Model.extend({
        assets: hasMany(),
      }),
      asset: Model.extend({
        assetType: belongsTo(),
        assetStatus: belongsTo(),
        site: belongsTo(),
        location: belongsTo(),
      }),
      site: Model.extend({
        location: hasMany(),
      }),
      location: Model.extend({
        site: belongsTo(),
        asset: hasMany(),
      }),
      users: Model,
    },

    // declare seeds here
    fixtures: {
      assetTypes,
      assetStatuses,
      assets,
      locations,
      sites,
      users,
    },

    seeds(server) {
      // loads seed data
      server.loadFixtures();
    },

    routes() {
      this.passthrough(); // allow any unrecognized routes to go to the real server
      // this.timing = 3000; // uncomment this line to simulate a 3sec network delay
      // wire up routes here
      assetTypeRoutes(this);
      assetStatusRoutes(this);
      assetRoutes(this);
      locationRoutes(this);
      siteRoutes(this);
      userRoutes(this);
    },
  });
}

export default makeServer;
