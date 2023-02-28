"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const electron_store_1 = __importDefault(require("electron-store"));
const axios_1 = __importDefault(require("axios"));
const store = new electron_store_1.default();
let window;
const save_cookies = () => {
    const cookies = electron_1.session.fromPartition("persist:webview").cookies;
    console.log(cookies);
    const result = cookies.get({ url: "https://saint.ssu.ac.kr" });
    result.then((cookies) => {
        store.set("cookies", cookies);
    });
};
const load_cookies = () => {
    const cookies = electron_1.session.fromPartition("persist:webview").cookies;
    if (store.get("cookies")) {
        const savedCookies = store.get("cookies");
        // check savedCookies is array
        if (!Array.isArray(savedCookies))
            return;
        for (const cookie of savedCookies) {
            cookie["url"] = "https://saint.ssu.ac.kr";
            cookies.set(cookie);
        }
    }
};
const delete_cookies_data = () => {
    if (store.get("cookies")) {
        store.delete("cookies");
    }
};
electron_1.app.on("ready", () => {
    window = new electron_1.BrowserWindow({
        width: 1225,
        height: 700,
        titleBarStyle: "hiddenInset",
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            contextIsolation: false,
        },
        autoHideMenuBar: true,
        icon: path_1.default.join(__dirname, "assets", "icons", "png", "1024x1024.png"),
    });
    window.loadFile("assets/index.html");
    electron_1.nativeTheme.themeSource = "light";
    load_cookies();
});
electron_1.app.whenReady().then(() => {
    electron_1.ipcMain.on("onSignOut", (evt) => {
        console.log("onSignOut");
        evt.reply("replySignOut");
        delete_cookies_data();
        electron_1.app.quit();
        electron_1.app.relaunch();
    });
    axios_1.default.get("https://versionchecker.asheswook.workers.dev/check/uSAINT").then((res) => {
        const latestVer = res.data.latestVersion.replace("v", "");
        const currentVer = electron_1.app.getVersion();
        if (latestVer !== currentVer) {
            electron_1.dialog
                .showMessageBox(window, {
                type: "info",
                title: "uSAINT",
                message: `업데이트가 있습니다. 다운로드 페이지로 이동하시겠습니까? (${latestVer})`,
                buttons: ["취소", "확인"],
                defaultId: 1,
            })
                .then((res) => {
                if (res.response == 1)
                    electron_1.shell.openExternal("https://github.com/asheswook/uSAINT-macOS/releases/latest");
            });
        }
    });
});
electron_1.app.on("before-quit", () => {
    save_cookies();
});
