import { NoContent, Ok, Created, BadRequest, NotFound } from "./response-utils";

const base = "sites";

function routing(server) {
  server.get(`/${base}`, (schema) => {
    const { models } = schema.sites.all();
    const data = models.map((m) => m.attrs);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.get(`/${base}/:id`, (schema, request) => {
    const { attrs: data } = schema.sites.find(request.params.id);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.post(`/${base}/`, (schema, request) => {
    if (!request.requestBody) {
      return BadRequest;
    }

    const attrs = JSON.parse(request.requestBody);
    const site = schema.sites.new(attrs);
    site.save();

    return Created(`/api/${base}/${site.id}`);
  });

  server.put(`/${base}/:id`, (schema, request) => {
    if (!request.requestBody) {
      return BadRequest();
    }

    const site = schema.sites.find(request.params.id);
    if (site) {
      const attrs = JSON.parse(request.requestBody);
      site.update(attrs);
      return NoContent(`/api/${base}/${site.id}`);
    } else {
      return NotFound();
    }
  });

  server.delete(`/${base}/:id`, (schema, request) => {
    const site = schema.sites.find(request.params.id);
    if (site) {
      site.destroy();

      return NoContent();
    }

    return NotFound();
  });
}

export default routing;
