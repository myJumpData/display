import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(__dirname, "src", "assets"),
        to: path.join(__dirname, ".webpack", "renderer", "assets"),
      },
    ],
  }),
];
