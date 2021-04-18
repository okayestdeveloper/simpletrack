// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

(process.env as any).BL_APP_API_URL = "http://localhost/api";
(process.env as any).BL_APP_AUTH_TOKEN_STORAGE_KEY = "key";
(process.env as any).BL_APP_LOGIN_URL = "http://localhost";

// This code fixes the "document.createRange is not a function" error when you try to use element.focus()
(global as any).document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: "BODY",
    ownerDocument: document,
  },
});
