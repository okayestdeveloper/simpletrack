/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly BL_APP_API_URL: string | undefined;
    readonly BL_APP_AUTH_TOKEN_STORAGE_KEY: string | undefined;
  }
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string; };
  export default classes;
}
