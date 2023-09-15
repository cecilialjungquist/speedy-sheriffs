// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
    // Load app-level env vars to node-level env vars.
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
      // To access env vars here use process.env.TEST_VAR
      plugins: [react()],
    });
}

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
