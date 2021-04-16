import { NoContent, Ok, Created, BadRequest, NotFound } from "./response-utils";

const base = "assets";

function routing(server) {
  server.get(`/${base}`, (schema) => {
    const { models } = schema.assets.all();
    const data = models.map((m) => m.attrs);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.get(`/${base}/:id`, (schema, request) => {
    const { attrs: data } = schema.assets.find(request.params.id);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.post(`/${base}/`, (schema, request) => {
    if (!request.requestBody) {
      return BadRequest;
    }

    const attrs = JSON.parse(request.requestBody);
    const asset = schema.assets.new(attrs);
    asset.save();

    return Created(`/api/${base}/${asset.id}`);
  });

  server.put(`/${base}/:id`, (schema, request) => {
    if (!request.requestBody) {
      return BadRequest();
    }

    const asset = schema.assets.find(request.params.id);
    if (asset) {
      const attrs = JSON.parse(request.requestBody);
      asset.update(attrs);
      return NoContent(`/api/${base}/${asset.id}`);
    } else {
      return NotFound();
    }
  });

  server.delete(`/${base}/:id`, (schema, request) => {
    const asset = schema.assets.find(request.params.id);
    if (asset) {
      asset.destroy();

      return NoContent();
    }

    return NotFound();
  });
}

export default routing;
