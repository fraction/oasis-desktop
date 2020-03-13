// HACK: Prevent Oasis from opening the web browser.
process.argv.push("--no-open");

// Starts server on localhost:3000... usually. :)
require("@fraction/oasis");

const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow();

  win.loadURL('http://localhost:3000/')
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
