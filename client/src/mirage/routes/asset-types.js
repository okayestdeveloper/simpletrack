import { NoContent, Ok, Created, BadRequest, NotFound } from "./response-utils";

function routing(server) {
  server.get("/asset-types", (schema) => {
    const { models } = schema.assetTypes.all();
    const data = models.map((m) => m.attrs);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.get("/asset-types/:id", (schema, request) => {
    const { attrs: data } = schema.assetTypes.find(request.params.id);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.post("/asset-types/", (schema, request) => {
    if (!request.requestBody) {
      return BadRequest;
    }

    const attrs = JSON.parse(request.requestBody);
    const assetType = schema.assetTypes.new(attrs);
    assetType.save();

    return Created(`/api/asset-types/${assetType.id}`);
  });

  server.put("/asset-types/:id", (schema, request) => {
    if (!request.requestBody) {
      return BadRequest();
    }

    const assetType = schema.assetTypes.find(request.params.id);
    if (assetType) {
      const attrs = JSON.parse(request.requestBody);
      assetType.update(attrs);
      return NoContent(`/api/asset-types/${assetType.id}`);
    } else {
      return NotFound();
    }
  });

  server.delete("/asset-types/:id", (schema, request) => {
    const assetType = schema.assetTypes.find(request.params.id);
    if (assetType) {
      assetType.destroy();

      return NoContent();
    }

    return NotFound();
  });
}

export default routing;
