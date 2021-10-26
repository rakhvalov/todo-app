const path = require("path");
const SizePlugin = require("size-plugin");

const isProductionEnvFlag = process.env.NODE_ENV === "production";
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");

function resolveRealPath(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: "dist",
  filenameHashing: false,
  integrity: true,
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@components", resolveRealPath("src/components"))
      .set("@services", resolveRealPath("src/services"))
      .set("@views", resolveRealPath("src/views"))
      .set("@router", resolveRealPath("src/router"));

    const splitOptions = config.optimization.get("splitChunks");
    config.optimization.splitChunks(
      Object.assign({}, splitOptions, {
        maxAsyncRequests: 16,
        maxInitialRequests: 16,
        minChunks: 1,
        minSize: 30000,
        automaticNameDelimiter: "~",
        name: true,
        cacheGroups: {
          default: false,
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: "initial",
            reuseExistingChunk: true,
          },
          element: {
            name: "element",
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            chunks: "initial",
            priority: -30,
          },
        },
      })
    );

    // https://github.com/webpack-contrib/webpack-bundle-analyzer
    if (process.env.npm_config_report) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  },
  configureWebpack: {
    plugins: [
      isProductionEnvFlag ? new SizePlugin() : () => {},
      isProductionEnvFlag ? new UglifyJSPlugin() : () => {},
      isProductionEnvFlag ? new DuplicatePackageCheckerPlugin() : () => {},
      isProductionEnvFlag
        ? new PurgecssPlugin({
            paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, {
              nodir: true,
            }),
          })
        : () => {},
    ],
    optimization: {
      runtimeChunk: true,
    },
  },
  devServer: {
    port: 8088,
  },
};
