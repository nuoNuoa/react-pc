import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 配置别名，__dirname是commonjs规范的内置变量。在esm中，显然模块的导入导出使用export/import，
//自然不会再用exports /require，同理__dirname，__filename也有对应的规范写法。
import path from 'path'

import { fileURLToPath } from 'url'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filenameNew)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, 'src') },
    ]
  },
})
