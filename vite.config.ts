import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { extname, relative } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";

export default defineConfig({
  assetsInclude: ["./components/**/*.css"],
  build: {
    lib: {
      entry: "./components/index.ts", // Specifies the entry point for building the library.
      name: "vite-react-ts-button", // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)], // Defines external dependencies for Rollup bundling.
      input: Object.fromEntries(
        glob.sync("components/**/*.{ts,tsx}").map((file) => [
          // The name of the entry point
          // components/nested/foo.ts becomes nested/foo
          relative(
            "components",
            file.slice(0, file.length - extname(file).length),
          ),
          // The absolute path to the entry file
          // components/nested/foo.ts becomes /project/components/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
  },
  plugins: [dts(), libInjectCss()], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
});
