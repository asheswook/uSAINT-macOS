import { app, BrowserWindow, session, nativeTheme, ipcMain, dialog, shell } from "electron";
import fs from "fs";
import path from "path";
import Store from "electron-store";
import axios from "axios";

const store = new Store();
let window: BrowserWindow;

const save_cookies = () => {
    const cookies = session.fromPartition("persist:webview").cookies;
    console.log(cookies);
    const result = cookies.get({ url: "https://saint.ssu.ac.kr" });

    result.then((cookies) => {
        store.set("cookies", cookies);
    });
};

const load_cookies = () => {
    const cookies = session.fromPartition("persist:webview").cookies;
    if (store.get("cookies")) {
        const savedCookies = store.get("cookies");
        // check savedCookies is array
        if (!Array.isArray(savedCookies)) return;
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

app.on("ready", () => {
    window = new BrowserWindow({
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
        icon: path.join(__dirname, "assets", "icons", "png", "1024x1024.png"),
    });
    window.loadFile("assets/index.html");
    nativeTheme.themeSource = "light";
    load_cookies();
});

app.whenReady().then(() => {
    ipcMain.on("onSignOut", (evt) => {
        console.log("onSignOut");
        evt.reply("replySignOut");

        delete_cookies_data();
        app.quit();
        app.relaunch();
    });

    axios.get("https://versionchecker.asheswook.workers.dev/check/uSAINT").then((res) => {
        const latestVer = res.data.latestVersion.replace("v", "");
        const currentVer = app.getVersion();

        if (latestVer !== currentVer) {
            dialog
                .showMessageBox(window, {
                    type: "info",
                    title: "uSAINT",
                    message: `업데이트가 있습니다. 다운로드 페이지로 이동하시겠습니까? (${latestVer})`,
                    buttons: ["취소", "확인"],
                    defaultId: 1,
                })
                .then((res) => {
                    if (res.response == 1) shell.openExternal("https://github.com/asheswook/uSAINT-macOS/releases/latest");
                });
        }
    });
});

app.on("before-quit", () => {
    save_cookies();
});
