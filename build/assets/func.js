console.log("func.js loaded");
const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    const webview = document.querySelector("webview");
    const refresh_button = document.querySelector("#refresh");
    const signout_button = document.querySelector("#signout");

    refresh_button.addEventListener("click", () => {
        console.log("refresh button clicked");
        webview.reload();
    });

    signout_button.addEventListener("click", () => {
        console.log("signout button clicked");
        const result = confirm("정말로 로그아웃 하겠습니까?");
        if (result) {
            ipcRenderer.send("onSignOut");
        } else {
            console.log("cancel");
        }
    });
});
