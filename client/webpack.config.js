const dotenv = require("dotenv");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { DefinePlugin, HotModuleReplacementPlugin } = require("webpack");
const ESLintPlugin = require('eslint-webpack-plugin');

const isEnvDevelopment = process.env.NODE_ENV === "development";
const isEnvProduction = process.env.NODE_ENV === "production";
const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true';
const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === 'true';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

function getEnvironment() {
  const config = dotenv.config({
    path: path.join(__dirname, `.env${isEnvDevelopment ? ".development" : ""}`),
  });
  if (config.error) {
    throw config.error;
  }

  const fileEnvVars = config.parsed;
  return Object.keys(fileEnvVars)
    .filter((key) => /^BL_APP_/i.test(key))
    .reduce(
      (vars, key) => {
        return {
          ...vars,
          [`process.env.${key}`]: JSON.stringify(fileEnvVars[key]),
        };
      },
      {
        ["process.env.NODE_ENV"]: JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
      }
    );
}

module.exports = () => {
  const mappedEnvironment = getEnvironment();

  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    // Stop compilation early in production
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? "source-map"
        : false
      : isEnvDevelopment && "cheap-module-source-map",
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
    },
    resolve: {
      modules: ['node_modules', 'src'], // todo: resolve this from tsconfig.json
      extensions: [".tsx", ".ts", ".js"],
    },
    target: isEnvDevelopment ? "web" : "browserslist",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ["file-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        inject: true,
        template: path.join(__dirname, "public", "index.html"),
      }),
      new DefinePlugin(mappedEnvironment),
      // todo: this breaks prod build. Probably pull out plugins to a function or something and optional push things
      isEnvDevelopment && new HotModuleReplacementPlugin(),
      // todo: this doesn't appear to do anything
      !disableESLintPlugin &&
        new ESLintPlugin({
          // Plugin options
          extensions: ['js', 'jsx', 'ts', 'tsx'],
          formatter: require.resolve('react-dev-utils/eslintFormatter'),
          eslintPath: require.resolve('eslint'),
          failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),
          context: 'src',
          cache: true,
          cacheLocation: path.resolve(
            'node_modules',
            '.cache/.eslintcache'
          ),
          lintDirtyModulesOnly: true,
          // ESLint class options
          cwd: path.resolve('./'),
          resolvePluginsRelativeTo: __dirname,
          baseConfig: {
            extends: [require.resolve('eslint-config-react-app/base')],
            rules: {
              ...(!hasJsxRuntime ? { 'react/react-in-jsx-scope': 'error' } : {}),
            },
          },
        }),
    ],
    devServer: {
      clientLogLevel: "none",
      contentBase: path.join(__dirname, "public"),
      contentBasePublicPath: "/",
      port: 3001,
      hot: true,
      index: "index.html",
      liveReload: false,
      open: true,
      overlay: false,
      publicPath: "/",
      transportMode: "ws",
      watchContentBase: true,
    },
  };
};
