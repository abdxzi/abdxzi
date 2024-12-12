import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

// Directory containing the TypeScript files
const scriptsDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), 'src/scripts');

const scriptFiles = fs.readdirSync(scriptsDir)
  .filter(file => file.endsWith('.ts'))
  .reduce((entries, file) => {
    const name = path.parse(file).name;
    entries[name] = path.resolve(scriptsDir, file);
    return entries;
  }, {} as Record<string, string>);



export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'build/js',  // Output directory for compiled JS files
    emptyOutDir: false, // Prevent clearing the whole `dist` folder
    rollupOptions: {
      input: scriptFiles, // Dynamically generated input entries
      output: {
        entryFileNames: '[name].js', // Output filenames without extra folders
      },
    },
  },
});