import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      // 2. 告诉 Vite：遇到 "@" 就指向项目根目录下的 "src"
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // docker 环境中，vite 默认只监听 localhost，我们改成监听所有地址，在局域网内通过 IP 访问
    host: "0.0.0.0",
  },
})
