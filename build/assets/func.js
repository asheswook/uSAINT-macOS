console.log("func.js loaded");
const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    const webview = document.getElementById("content");

    webview.addEventListener("dom-ready", () => {
        console.log("dom-ready");
        webview.insertCSS(`
        html,
        body {
            background: #1a202c !important;
            color: rgba(255, 255, 255, 0.92) !important;
        }
        header {
            background: #171923 !important;
        }
        .top_box .top_link_box li a,
        .top_box .top_user {
            color: #a0aec0 !important;
            background: none !important;
        }
        .top_wrap h1 a {
            background: url(https://i.imgur.com/It5NA1S.png) no-repeat 0 0 !important;
            background-size: cover !important;
            max-height: 100% !important;
            max-width: 100% !important;
            width: 80px !important;
        }
        .gnb ul li .depth2_w li a {
            color: #a0aec0 !important;
        }
        .gnb ul li .depth2_w {
            background: #1a202c !important;
        }

        `);
    });

    const refresh_button = document.querySelector("#refresh");

    refresh_button.addEventListener("click", () => {
        console.log("refresh button clicked");
        webview.reload();
    });
});
