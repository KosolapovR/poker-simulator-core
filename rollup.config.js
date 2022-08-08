import { nodeResolve } from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

const deps = []
  .concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
  .concat(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []);

export default {
  input: "lib/index.js",
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true,
  },
  plugins: [nodeResolve()],
  external: (id) => {
    return !!deps.find((dep) => dep === id || id.startsWith(`${dep}/`));
  },
};
