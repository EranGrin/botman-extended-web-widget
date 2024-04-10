import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({

  base: './',
  server: {
    open: '/src/demo.html'
    
  },
  plugins: [
    preact(),
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehaviour: 'global',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      preserveEntrySignatures: "allow-extension",
      input: {
        widget: 'src/widget/index.tsx',
        chat: 'src/chat/index.tsx',
      },
      output: {
        entryFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },

})
