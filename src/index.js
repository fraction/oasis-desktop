// HACK: Prevent Oasis from opening the web browser.
process.argv.push("--no-open");

// Starts server on localhost:3000... usually. :)
require("@fraction/oasis");
const path = require("path");

const { app, BrowserWindow, shell, ipcMain } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    height: 400,
    width: 300,
    webPreferences: { preload: path.join(__dirname, "renderer", "preload.js") }
  });

  win.loadFile(path.join(__dirname, "renderer", "index.html"));

  ipcMain.on("open-oasis", () => shell.openExternal("http://localhost:3000"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
