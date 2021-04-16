import { NoContent, Ok, Created, BadRequest, NotFound } from "./response-utils";

const base = "users";

function routing(server) {
  server.get(`/${base}`, (schema) => {
    const { models } = schema.users.all();
    const data = models.map((m) => m.attrs);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.get(`/${base}/:id`, (schema, request) => {
    const { attrs: data } = schema.users.find(request.params.id);
    const length = JSON.stringify(data).length;

    return Ok(data, length);
  });

  server.post(`/${base}/`, (schema, request) => {
    if (!request.requestBody) {
      return BadRequest;
    }

    const attrs = JSON.parse(request.requestBody);
    const user = schema.users.new(attrs);
    user.save();

    return Created(`/api/${base}/${user.id}`);
  });

  server.put(`/${base}/:id`, (schema, request) => {
    if (!request.requestBody) {
      return BadRequest();
    }

    const user = schema.users.find(request.params.id);
    if (user) {
      const attrs = JSON.parse(request.requestBody);
      user.update(attrs);
      return NoContent(`/api/${base}/${user.id}`);
    } else {
      return NotFound();
    }
  });

  server.delete(`/${base}/:id`, (schema, request) => {
    const user = schema.users.find(request.params.id);
    if (user) {
      user.destroy();

      return NoContent();
    }

    return NotFound();
  });
}

export default routing;
