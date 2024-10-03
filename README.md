# Notiq

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

## 資料結構

/main 主進程
/preload 進程間 溝通橋樑
/renderer 渲染進程

使用者註冊按鍵 => hooks => preload(ipcRenderer 渲染進程) => main(ipcMain 主進程)

註冊事件要同時注意  
`/preload/index.ts`, `/preload/index.d.ts`, 要個別綁定事件以及定義型別

---

這樣一樣可以拿到 主要的 mainWindow

```javascript
const win = BrowserWindow.fromWebContents(event.sender)
```
