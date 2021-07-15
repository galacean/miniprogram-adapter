// babel.config.js
module.exports = {
  presets: [["@babel/preset-env", { loose: true }], "@babel/preset-typescript"],
  plugins: [["@babel/plugin-proposal-class-properties", { loose: true }], "@babel/plugin-proposal-optional-chaining"]
};
