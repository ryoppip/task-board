import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages は https://ryoppip.github.io/task-board/ で配信されるため、
// ビルド時のみベースパスを /task-board/ にする(開発サーバーは / のまま)
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/task-board/' : '/',
  plugins: [react()],
}))
