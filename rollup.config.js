// import commonjs from "rollup-plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";

const extensions = [".ts"];

export default {
  input: "./src/index.ts",
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ["src/**/*"], babelHelpers: "bundled" })
  ],

  output: [
    {
      file: pkg.main,
      format: "umd",
      name: "__MiniAdapter__"
    }
  ]
};
