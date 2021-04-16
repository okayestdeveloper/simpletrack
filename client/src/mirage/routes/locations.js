import { NoContent, Ok, Created, BadRequest, NotFound } from "./response-utils";

const base = "locations";

function routing(server) {
  server.get(`/${base}`, (schema) => {
    const { models } = schema.locations.all();
    const data = models.map((m) => m.attrs);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.get(`/${base}/:id`, (schema, request) => {
    const { attrs: data } = schema.locations.find(request.params.id);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.post(`/${base}/`, (schema, request) => {
    if (!request.requestBody) {
      return BadRequest;
    }

    const attrs = JSON.parse(request.requestBody);
    const location = schema.locations.new(attrs);
    location.save();

    return Created(`/api/${base}/${location.id}`);
  });

  server.put(`/${base}/:id`, (schema, request) => {
    if (!request.requestBody) {
      return BadRequest();
    }

    const location = schema.locations.find(request.params.id);
    if (location) {
      const attrs = JSON.parse(request.requestBody);
      location.update(attrs);
      return NoContent(`/api/${base}/${location.id}`);
    } else {
      return NotFound();
    }
  });

  server.delete(`/${base}/:id`, (schema, request) => {
    const location = schema.locations.find(request.params.id);
    if (location) {
      location.destroy();

      return NoContent();
    }

    return NotFound();
  });
}

export default routing;
