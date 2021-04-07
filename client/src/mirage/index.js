import { Server, Model, belongsTo, hasMany } from "miragejs";

import assetTypes from "./fixtures/asset-types.json";
import assetTypeRoutes from "./routes/asset-types";

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
    },

    // declare seeds here
    fixtures: {
      assetTypes,
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
    },
  });
}

export default makeServer;
