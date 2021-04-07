import { Response } from "miragejs";

export function Ok(data, length) {
  return new Response(200, { "content-length": length }, { data });
}

export function Created(uri) {
  return new Response(201, { "content-length": 0, etag: uri }, {});
}

export function NoContent(uri) {
  return new Response(204, { "content-length": 0, etag: uri }, {});
}

export function BadRequest() {
  return new Response(400, { "content-length": 0 });
}

export function Unauthorized() {
  return new Response(401, { "content-length": 0 });
}

export function NotFound() {
  return new Response(404, { "content-length": 0 });
}
