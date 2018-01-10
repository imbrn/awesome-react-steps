import project from "./package.json";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import { minify } from "uglify-es";

const name = project.name;

const babelConfig = () => {
  return {
    babelrc: false,
    exclude: "node_modules/**",
    presets: [["env", { modules: false }], "react"],
    plugins: [
      "external-helpers",
      "transform-class-properties",
      "transform-object-rest-spread"
    ]
  };
};

export default [
  {
    input: "src/index.js",
    output: {
      file: `dist/${name}.es.js`,
      format: "es"
    },
    plugins: [
      commonjs({
        include: "node_modules/**"
      }),
      babel(babelConfig()),
      resolve()
    ]
  },
  {
    input: "src/index.js",
    output: {
      name: "Steps",
      file: `dist/${name}.js`,
      format: "umd"
    },
    plugins: [
      commonjs({
        include: "node_modules/**"
      }),
      babel(babelConfig()),
      resolve()
    ]
  },
  {
    input: "src/index.js",
    output: {
      name: "Steps",
      file: `dist/${name}.min.js`,
      format: "umd"
    },
    plugins: [
      commonjs({
        include: "node_modules/**"
      }),
      babel(babelConfig()),
      resolve(),
      uglify({}, minify)
    ]
  }
];
