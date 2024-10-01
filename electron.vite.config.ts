import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@main': resolve('src/main'),
        '@preload': resolve('src/preload')
      }
    },
    plugins: [
      react({
        babel: {
          plugins: [
            'babel-plugin-macros',
            'babel-plugin-styled-components'
            // [
            //   'babel-plugin-styled-components',
            //   {
            //     displayName: true, //! dev 開啟
            //     ssr: false
            //   }
            // ]
          ]
        }
      }),
      macrosPlugin()
    ]
  }
})
