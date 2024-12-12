import { build } from 'vite';
import path from 'path';
import fs from 'fs';

const scriptsDir = path.resolve('src/scripts');
const outputDir = 'build/js';

// Get all `.ts` files from the `scripts` directory
const scriptFiles = fs.readdirSync(scriptsDir).filter(file => file.endsWith('.ts'));

// Create a build for each file
(async () => {
  for (const file of scriptFiles) {
    const entry = path.resolve(scriptsDir, file);
    console.log(`Building: ${file}`);
    await build({
      configFile: false,
      root: process.cwd(),
      build: {
        outDir: outputDir,
        emptyOutDir: false,
        rollupOptions: {
          input: entry,
          output: {
            format: 'iife',
            entryFileNames: `${path.parse(file).name}.js`,
          },
        },
      },
    });
  }
})();
