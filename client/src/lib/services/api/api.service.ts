import download from "downloadjs";
import "whatwg-fetch";
import "yet-another-abortcontroller-polyfill";

import { HttpError } from "./httpError.class";
import { assertIsDefined } from "../asserts";

/**
 *  Define some common content types so we don't mistype or have to look them up
 *
 * @enum {string}
 */
export enum ContentType {
  CSV = "text/csv",
  CSS = "text/css",
  DOC = "application/msword",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  FORM_DATA = "multipart/form-data",
  HTML = "text/html",
  JSON = "application/json",
  PDF = "application/pdf",
  TEXT = "text/plain",
  XLS = "application/vnd.ms-excel",
  XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  XML = "application/xml",
  DEFAULT = "application/octet-stream",
}

/**
 * Format for the options you can pass to (@link request).
 *
 * @interface APIOptions
 */
export interface APIOptions {
  /** body: parameters to pass to the API. Make sure the values are able to be
   * JSON stringified. Note that a request with GET or HEAD method cannot have
   * a body */
  body?: Record<string, any>;

  /** method: the request method. Default is GET */
  method: "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "PATCH";

  /** queryParams: A key-value set of optional query string parameters. If this
   * is present, the request function will build the querystring for you. */
  queryParams?: Record<string, string>;

  /** headers: Optional headers to send to the API. Defaults to JSON for Accept
   * and Content-type headers, so you probably don't have to do anything. */
  headers?: Record<string, string>;

  /** signal: Optional AbortSignal to pass to fetch to be able to abort an in progress
   * API request. See the [Abort API docs](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) */
  signal?: AbortSignal;
}

/*
 * Default options for if you don't pass in an object.
 */
const defaultOptions: APIOptions = {
  method: "GET",
  headers: {
    accept: ContentType.JSON,
    "content-type": ContentType.JSON,
  },
};

/**
 * A standardized shape for all API responses.
 *
 * @interface APIResponse
 * @template T the type of the data property. E.g. APIResponse<User> or APIResponse<User[]>
 */
export interface APIResponse<T> {
  /** message: a descriptive status message from the API */
  message?: string;

  /** data: the data for the response  */
  data: T;

  /** error: optional extended error information */
  error?: string;
}

/**
 * Convert an API path to a full API URL. This allows us to use environment
 * variables to configure the API host values.
 *
 * @param path the path to the resource, starting after <host>
 * @returns the path with the host
 */
function apiUrl(path: string): string {
  const baseUrl = process.env.BL_APP_API_URL;

  return `${baseUrl}${path[0] === "/" ? "" : "/"}${path}`;
}

/**
 * Generate a query string (without leading "?") for appending to a URL.
 *
 * @param params a key-value paring of parameter to
 * @returns the resulting query string or '' if there are no parameters.
 */
function queryParamsToString(params: Record<string, string>): string {
  const keys = Object.keys(params);

  if (keys.length === 0) {
    return "";
  }

  return keys
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
}

/**
 * Intelligently append a query string to a given url by looking for the "?"
 *
 * @param url
 * @param queryString
 * @returns the resulting url
 */
function appendQueryString(url: string, queryString: string): string {
  if (!queryString.length) {
    return url;
  }

  if (url.includes("?")) {
    return `${url}&${queryString}`;
  }

  return `${url}?${queryString}`;
}

/**
 * Pull a filename out of a Response, or default to defaultName
 *
 * @param {Response} res
 * @param {string} defaultName
 * @returns {string}
 */
function filenameFromResponse(res: Response, defaultName: string): string {
  if (res.headers.has("content-disposition")) {
    const disposition = res.headers.get("content-disposition");
    const tokens = disposition?.split("; ") ?? [];

    if (tokens.length > 1 && /^filename=/.test(tokens[1])) {
      const fileParts = tokens[1].split("=");

      if (fileParts.length > 1) {
        return fileParts[1];
      }
    }
  }

  return defaultName;
}

/**
 * Downloads a file from a response from the API. Assumes the content type has already been checked.
 *
 * @param {Response} res
 */
async function downloadFile(res: Response): Promise<null> {
  const filename = filenameFromResponse(res, "download");
  const blob = await res.blob();
  download(blob, filename);

  return null;
}

/**
 * Pull the value of the content-type header from the response. There's a little bit of parsing involved.
 *
 * @param {Response} res
 * @returns {string}
 */
function getContentType(res: Response): string {
  let contentType = res.headers.get("content-type") ?? ContentType.DEFAULT;

  if (contentType.includes(";")) {
    const tokens = contentType.split(";");
    contentType = tokens[0].trim();
  }

  return contentType;
}

/**
 * Get the body from a response in a hopefully flexible and fault-tolerant way.
 * If the Content-length header is missing or 0, returns an empty string.
 * If the Content-type header is missing, returns an ArrayBuffer of the raw data.
 * The application/json content type triggers Response.json().
 * Other content types typically trigger Response.text().
 *
 * @template T
 * @param {Response} res
 * @returns {(Promise<APIResponse<T> | FormData | ArrayBuffer | string | null>)}
 * @throws if any of the Response's decoding methods throws.
 */
async function getBody<T>(res: Response): Promise<APIResponse<T> | null> {
  const contentLength = parseInt(res.headers.get("content-length") ?? "0");

  if (contentLength === 0 && res.headers.has("content-length")) {
    return null;
  }

  let data = null;
  const contentType = getContentType(res);

  switch (contentType) {
    case ContentType.JSON:
      const body = (await res.json()) as APIResponse<T>;

      return body;
    case ContentType.CSS:
    case ContentType.HTML:
    case ContentType.TEXT:
    case ContentType.XML:
      // todo: we're losing some type saftey here because I can't figure out the right typing for the return value that
      // doesn't break functions that call request<SomeType>. This should work just fine, but it's a hacky way to get
      // around the TypeScript compiler and my lack of knowledge around the advanced edges of TypeScript
      data = ((await res.text()) as any) as T;
      break;
    case ContentType.FORM_DATA:
      data = ((await res.formData()) as any) as T;
      break;
    default:
      data = ((await res.arrayBuffer()) as any) as T;
      break;
  }

  return { data, message: "" };
}

/**
 * A generic response handler from any of our own API functions. It is assumed
 * that all response bodies from our API have the form (@link APIReponse) and
 * that the type `T` defines the shape of the data returned from the API.
 *
 * @template T the type of the `data` property in the API
 * @param res the Response from the `fetch` request
 * @returns {Promise<T | null>} rejected with a message if response is not ok (300+ status) or
 * resolved with body data or null on success.
 */
async function handleAPIResponse<T>(res: Response): Promise<T | null> {
  if (res.headers.get("content-disposition")?.startsWith("attachment")) {
    return downloadFile(res);
  }

  const body = await getBody<T>(res);

  if (!res.ok) {
    const message = body?.message ?? "";
    throw new HttpError(
      res.status,
      res.statusText,
      `API request failed. ${res.status} ${res.statusText}. ${message}`
    );
  }

  if (!body) {
    return null;
  }

  if (typeof body.data !== "undefined") {
    return body.data;
  }

  return (body as any) as T;
}

/**
 * Get the authorization token.
 *
 * @returns token stored in localStorage
 * @throws if the token is not set or is empty
 */
function getAuthorizationToken(): string {
  assertIsDefined(process.env.BL_APP_AUTH_TOKEN_STORAGE_KEY);

  const token = window.localStorage.getItem(
    process.env.BL_APP_AUTH_TOKEN_STORAGE_KEY
  );

  if (!token) {
    throw new Error("Authorization token is empty or not set");
  }

  return token;
}

/**
 * Make an API request.
 *
 * @template T the type of the `data` property in the expected APIResponse.
 * @param {string} path the path, not including the host, to the resource.
 *  Make sure to start the path with '/'.
 * @param {APIOptions?} options
 * @returns {Promise<T | null>}
 * @throws if the authorization token is not set or is empty, or if decoding the body throws
 */
async function request<T>(
  path: string,
  options: APIOptions = defaultOptions
): Promise<T | null> {
  const { body, method, queryParams, headers = {}, signal } = {
    ...defaultOptions,
    ...options,
  };
  const url = apiUrl(path);
  const token = getAuthorizationToken();

  headers.authorization = `Bearer ${token}`;

  const queryString = queryParamsToString(queryParams ?? {});
  const fullUrl = appendQueryString(url, queryString);

  let requestBody: any;

  if (
    ["POST", "PUT"].includes(method) &&
    !!body &&
    headers["content-type"] === ContentType.JSON
  ) {
    requestBody = JSON.stringify(body);
  } else {
    if (headers["content-type"] === ContentType.FORM_DATA) {
      delete headers["content-type"];
    }

    requestBody = body;
  }

  const res = await fetch(fullUrl, {
    body: requestBody,
    method,
    headers,
    signal,
  });

  return await handleAPIResponse<T>(res);
}

export default request;
