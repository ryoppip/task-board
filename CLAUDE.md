# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code へのガイドです。

## プロジェクト概要

task-board — タスク管理ボードアプリケーション。

## 技術スタック

| 分類 | 使用技術 |
| --- | --- |
| 言語 | JavaScript(ES Modules)/ JSX ※TypeScript は未使用 |
| UI ライブラリ | React 18.3(関数コンポーネント + Hooks) |
| ビルドツール | Vite 5.4 + @vitejs/plugin-react 4 |
| スタイル | 素の CSS(`src/App.css`)。CSS フレームワーク・CSS-in-JS は未使用 |
| 状態管理 | React の `useState` / `useEffect` のみ(外部ライブラリなし) |
| データ保存 | ブラウザの localStorage(キー: `task-board.tasks`、JSON 配列) |
| ホスティング | GitHub Pages(GitHub Actions で自動デプロイ) |
| CI の Node.js | 22 |

- タスクのデータ形式: `{ id: string, title: string, done: boolean }`(`id` は `crypto.randomUUID()` で生成)

## ディレクトリ構成

- `index.html` — エントリ HTML
- `src/main.jsx` — React のマウント
- `src/App.jsx` — タスクボード本体(追加・完了切替・削除)
- `src/App.css` — スタイル

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動(http://localhost:5173)
npm run dev

# 本番ビルド(プッシュ前に通ることを確認する)
npm run build

# テストの実行
# (未導入)
```

## コンポーネントの命名規約

現在のコード(`src/App.jsx`)に合わせた規約です。新しいコードもこれに従ってください。

- **コンポーネント**: PascalCase の関数コンポーネント(例: `App`, `TaskItem`)。クラスコンポーネントは使わない。
- **ファイル**: コンポーネント名と同じ PascalCase + `.jsx`(例: `TaskItem.jsx`)。1ファイル1コンポーネントで `export default` する。
- **配置**: `App` 以外のコンポーネントを追加する場合は `src/components/` に置く。
- **CSS クラス名**: kebab-case(例: `add-form`, `task-list`)。状態は修飾クラスで表す(例: `task done`)。
- **state**: `[名詞, set名詞]` の組(例: `[tasks, setTasks]`, `[text, setText]`)。
- **イベントハンドラ**: 「動詞 + 名詞」の camelCase(例: `addTask`, `toggleTask`, `deleteTask`)。子コンポーネントへ props で渡す場合は `onAdd`, `onToggle`, `onDelete` のように `on` + 動詞にする。
- **ヘルパー関数**: 動詞で始まる camelCase(例: `loadTasks`)。
- **定数**: UPPER_SNAKE_CASE(例: `STORAGE_KEY`)。
- **UI の文言**: 日本語。

## デプロイ先

https://ryoppip.github.io/task-board/

- `main` へのプッシュで `.github/workflows/deploy.yml` が自動でビルド・デプロイする。
- `vite.config.js` の `base` はビルド時のみ `/task-board/`。リポジトリ名を変えた場合はここも変更する。

## Git 運用ルール

### 基本方針

- **コードを変更するたびに、コミットして GitHub にプッシュすること。**
  - 1つの作業(機能追加・バグ修正・リファクタリングなど)が完了したら、その都度 `git add` → `git commit` → `git push` まで行う。
  - 変更をローカルに溜め込まない。
- プッシュ前に、テストやビルドが存在する場合は実行し、通ることを確認する。失敗した場合はプッシュせず、ユーザーに報告する。

### 手順

```bash
git status                 # 変更内容を確認
git add <変更したファイル>   # 関係するファイルのみをステージ(git add -A は避ける)
git commit -m "<メッセージ>"
git push
```

### コミットメッセージ

- 日本語で、何をしたかを簡潔に書く。
- 先頭にプレフィックスを付ける:
  - `feat:` 新機能
  - `fix:` バグ修正
  - `refactor:` リファクタリング
  - `docs:` ドキュメント
  - `style:` 見た目・フォーマットのみの変更
  - `test:` テストの追加・修正
  - `chore:` 設定・依存関係などその他
- 例: `feat: タスクのドラッグ&ドロップ移動を追加`

### 注意事項

- `.env` や認証情報などの秘密情報は絶対にコミットしない(`.gitignore` に追加する)。
- `git push --force`、`git reset --hard` などの破壊的な操作は、ユーザーの明示的な許可なく実行しない。
- リモート(`origin`)が未設定の場合や、プッシュが失敗した場合は、勝手に回避せずユーザーに報告する。
