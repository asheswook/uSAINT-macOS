console.log("func.js loaded");
const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    const webview = document.querySelector("webview");
    const refresh_button = document.querySelector("#refresh");

    refresh_button.addEventListener("click", () => {
        console.log("refresh button clicked");
        webview.reload();
    });
});
