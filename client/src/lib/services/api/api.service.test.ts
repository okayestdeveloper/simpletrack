import request, { APIOptions, APIResponse, ContentType } from './api.service';
import { HttpError } from './httpError.class';
import mockLocalStorage from '../../testing/localstorage.mock';
import download from 'downloadjs';
jest.mock('downloadjs');

interface MockRes {
  foo: string;
}

describe(`API Service`, () => {
  let getItem: jest.Mock;
  let lsMockReset: Function;
  const token = 'sometoken';

  beforeEach(() => {
    jest.resetModules();

    getItem = jest.fn().mockReturnValue(token);
    lsMockReset = mockLocalStorage({ getItem });
  });

  afterEach(() => {
    lsMockReset();
  });

  describe(`request`, () => {
    const mockAPIResponse: APIResponse<MockRes> = {
      message: 'message',
      data: { foo: 'bar' },
    };
    const mockResponseHeaders = new Map<string, string>([
      [ 'content-length', JSON.stringify(mockAPIResponse).length.toString() ],
      [ 'content-type', ContentType.JSON ],
    ]);
    let realFetch: typeof global.fetch;

    beforeEach(() => {
      realFetch = global.fetch;
    });

    afterEach(() => {
      global.fetch = realFetch;
    });

    // 2xx normal success
    it(`should return the data on a 200 response`, async () => {
      const mockFetchResponse = {
        json: () => Promise.resolve(mockAPIResponse),
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: mockResponseHeaders,
      };
      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

      const response = await request<MockRes>('/path');
      expect(response).toEqual(mockAPIResponse.data);

      return response;
    });

    it(`should still resolve the body if the content-length header is missing`, async () => {
      const headers = new Map(mockResponseHeaders);
      headers.delete('content-length');
      const mockFetchResponse = {
        json: () => Promise.resolve(mockAPIResponse),
        ok: true,
        status: 200,
        statusText: 'OK',
        headers,
      };
      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

      const response = await request<MockRes>('/path');
      expect(response).toEqual(mockAPIResponse.data);

      return response;
    });

    it(`should return a null body if the content-length 0`, async () => {
      const headers = new Map(mockResponseHeaders);
      headers.set('content-length', '0');
      const mockFetchResponse = {
        json: () => Promise.resolve(mockAPIResponse),
        ok: true,
        status: 200,
        statusText: 'OK',
        headers,
      };
      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

      const response = await request<MockRes>('/path');
      expect(response).toBeNull();

      return response;
    });

    it(`should handle downloading a file`, async () => {
      const filename = 'mock.csv';
      const csv = 'foo,bar\nwilt,chamberlain';
      const blob = new Blob([ csv ]);
      const mockFetchResponse = {
        blob: () => Promise.resolve(blob),
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map<string, string>([
          [ 'content-type', ContentType.CSV ],
          [ 'content-length', blob.size.toString() ],
          [ 'content-disposition', `attachment; filename=${filename}` ],
        ]),
      };
      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);
      const options: APIOptions = {
        method: 'GET',
        headers: {
          accept: ContentType.CSV,
        },
      };

      const response = await request<MockRes>('/path', options);
      expect(response).toBeNull();
      expect(download).toHaveBeenCalledWith(blob, filename);

      return response;
    });

    // !ok response
    it(`should throw an error on a not ok response`, async () => {
      const mockFetchResponse = {
        json: () => Promise.resolve(mockAPIResponse),
        ok: false,
        status: 401,
        statusText: 'Not Authorized',
        headers: mockResponseHeaders,
      };
      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

      let response;

      /* eslint-disable jest/no-conditional-expect */
      try {
        response = await request<MockRes>('/path');
        expect(false).toEqual(true); // shouldn't get here
      } catch (err) {
        expect(err.name).toEqual('HttpError');
        const httpError = err as HttpError;
        const status = httpError.status;
        const text = httpError.statusText;
        const msg = mockAPIResponse.message;
        expect(httpError.status).toEqual(mockFetchResponse.status);
        expect(httpError.statusText).toEqual(mockFetchResponse.statusText);
        expect(httpError.message).toEqual(
          `API request failed. ${status} ${text}. ${msg}`,
        );
      }
      /* eslint-enable jest/no-conditional-expect */

      return response;
    });

    // reject original fetch (network error)
    it(`should throw an error on a network error (fetch rejects)`, async () => {
      const msg = 'Network error';
      global.fetch = jest.fn().mockRejectedValue(new Error(msg));

      let response;

      /* eslint-disable jest/no-conditional-expect */
      try {
        response = await request<MockRes>('/path');
        expect(false).toEqual(true); // shouldn't get here
      } catch (err) {
        expect(err.message).toEqual(msg);
      }
      /* eslint-enable jest/no-conditional-expect */

      return response;
    });

    // request with queryParams
    it(`should append a query string when queryParams is provided`, async () => {
      const path = '/path';
      const queryParams = { search: 's' };
      const mockFetchResponse = {
        json: () => Promise.resolve(mockAPIResponse),
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: mockResponseHeaders,
      };
      const mockFetch = jest.fn().mockResolvedValue(mockFetchResponse);
      global.fetch = mockFetch;

      const res = await request<MockRes>(path, {
        method: 'GET',
        queryParams,
      });
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const args = mockFetch.mock.calls[0];
      expect(args[0]).toEqual(`${process.env.BL_APP_API_URL}/path?search=s`);

      return res;
    });

    it(`should tack on more queryParams if query string exists`, async () => {
      const path = '/path?foo=bar';
      const queryParams = { search: 's' };
      const mockFetchResponse = {
        json: () => Promise.resolve(mockAPIResponse),
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: mockResponseHeaders,
      };
      const mockFetch = jest.fn().mockResolvedValue(mockFetchResponse);
      global.fetch = mockFetch;

      const res = await request<MockRes>(path, { method: 'GET', queryParams });
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const args = mockFetch.mock.calls[0];
      expect(args[0]).toEqual(
        `${process.env.BL_APP_API_URL}/path?foo=bar&search=s`,
      );

      return res;
    });

    // request with custom headers
    it(`should allow overriding accept and content-type headers`, async () => {
      const headers = {
        accept: 'application/xml',
        'content-type': ContentType.XML,
      };
      const responseHeaders = new Map(mockResponseHeaders);
      responseHeaders.set('content-type', ContentType.XML);
      const mockFetchResponse = {
        text: () => Promise.resolve('<xml><foo>bar</foo>'),
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: responseHeaders,
      };
      const mockFetch = jest.fn().mockResolvedValue(mockFetchResponse);
      global.fetch = mockFetch;

      const res = await request<MockRes>('/path', { method: 'GET', headers });
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const args = mockFetch.mock.calls[0];
      const callHeaders = args[1]?.headers;
      expect(callHeaders?.accept).toEqual(headers.accept);
      expect(callHeaders['content-type']).toEqual(headers['content-type']);

      return res;
    });

    it(`should append an authorization header`, async () => {
      const mockFetchResponse = {
        json: () => Promise.resolve(mockAPIResponse),
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: mockResponseHeaders,
      };
      const mockFetch = jest.fn().mockResolvedValue(mockFetchResponse);
      global.fetch = mockFetch;

      const res = await request<MockRes>('/path');
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const args = mockFetch.mock.calls[0];
      const headers = args[1]?.headers;
      expect(headers?.authorization).toEqual(`Bearer ${token}`);

      return res;
    });

    it(`should add extra headers if provided`, async () => {
      const headers = { 'x-request-id': '123456789' };
      const mockFetchResponse = {
        json: () => Promise.resolve(mockAPIResponse),
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: mockResponseHeaders,
      };
      const mockFetch = jest.fn().mockResolvedValue(mockFetchResponse);
      global.fetch = mockFetch;

      const res = await request<MockRes>('/path', { method: 'GET', headers });
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const args = mockFetch.mock.calls[0];
      const callHeaders = args[1]?.headers;
      expect(callHeaders['x-request-id']).toEqual(headers['x-request-id']);

      return res;
    });

    // 201 response
    it(`should post body data to the server as a JSON string`, async () => {
      const body = { userId: '1', userName: 'bob' };
      const bodyString = JSON.stringify(body);
      const responseHeaders = new Map(mockResponseHeaders);
      responseHeaders.set('content-length', '0');
      const mockFetchResponse = {
        json: () => Promise.resolve(undefined),
        ok: true,
        status: 201,
        statusText: 'Created',
        headers: responseHeaders,
      };
      const mockFetch = jest.fn().mockResolvedValue(mockFetchResponse);
      global.fetch = mockFetch;

      const response = await request('/path', { method: 'POST', body });
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const args = mockFetch.mock.calls[0];
      const opts = args[1];
      expect(opts?.body).toEqual(bodyString);

      return response;
    });

    it(`should abort an API request when an AbortSignal is activated`, () => {
      const abortController = new AbortController();
      abortController.abort();

      const p = request('/path', {
        method: 'GET',
        signal: abortController.signal,
      })
        .then(() => {
          // we should not get here.
          expect(false).toEqual(true);
        })
        .catch((ex) => {
          expect(abortController.signal.aborted).toEqual(true);
          expect(ex.name).toEqual('AbortError');
        });

      return p;
    });
  });
});
