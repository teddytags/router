import ts from "@wessberg/rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/router.tsx",
  output: {
    file: "lib/router.js",
    format: "esm",
    sourcemap: true,
  },
  external: ["teddytags"],
  plugins: [
    ts({
      tsconfig: "tsconfig.json",
      transpiler: "typescript",
    }),
    terser(),
  ],
};
