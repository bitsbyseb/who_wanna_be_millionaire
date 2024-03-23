import { defineConfig } from 'vite'

export default defineConfig({
  base:'/who_wanna_be_millionaire/',
  build:{
    cssMinify:'esbuild',
    minify:'esbuild',
  },
  server:{
    port:5050
  },
  preview:{
    port:8080
  }
});