import { NoContent, Ok, Created, BadRequest, NotFound } from "./response-utils";

const base = "asset-statuses";

function routing(server) {
  server.get(`/${base}`, (schema) => {
    const { models } = schema.assetStatuses.all();
    const data = models.map((m) => m.attrs);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.get(`/${base}/:id`, (schema, request) => {
    const { attrs: data } = schema.assetStatuses.find(request.params.id);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.post(`/${base}/`, (schema, request) => {
    if (!request.requestBody) {
      return BadRequest;
    }

    const attrs = JSON.parse(request.requestBody);
    const assetStatus = schema.assetStatuses.new(attrs);
    assetStatus.save();

    return Created(`/api/${base}/${assetStatus.id}`);
  });

  server.put(`/${base}/:id`, (schema, request) => {
    if (!request.requestBody) {
      return BadRequest();
    }

    const assetStatus = schema.assetStatuses.find(request.params.id);
    if (assetStatus) {
      const attrs = JSON.parse(request.requestBody);
      assetStatus.update(attrs);
      return NoContent(`/api/${base}/${assetStatus.id}`);
    } else {
      return NotFound();
    }
  });

  server.delete(`/${base}/:id`, (schema, request) => {
    const assetStatus = schema.assetStatuses.find(request.params.id);
    if (assetStatus) {
      assetStatus.destroy();

      return NoContent();
    }

    return NotFound();
  });
}

export default routing;
