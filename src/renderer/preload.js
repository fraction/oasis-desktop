const { ipcRenderer } = require("electron");
window.openOasis = () => {
  ipcRenderer.send("open-oasis");
};
