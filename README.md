# uSAINT-macOS

숭실대학교 u-SAINT (유세인트) macOS 웹앱입니다.
uSAINT가 macOS Safari 환경에서 정상적으로 작동하지 않아, Chrome과 Safari를 왔다갔다 해야 하는 불편함과 통일성이 떨어지는 문제를 해소하기 위해 제작하였습니다. Chromium 기반인 Electron을 이용하여 만들어졌습니다.

단순 웹앱이라 특별한 코드나 기능은 포함되어있지 않으나 [Issue](https://github.com/asheswook/uSAINT-macOS/issues)를 통해 개선사항을 제안해주시면 반영할 수 있도록 하겠습니다.

## Feature

-   자동 세션 유지 로그인
-   ~~간지?~~

## Download

[Releases](https://github.com/asheswook/uSAINT-macOS/releases)에서 최신 버전을 다운받을 수 있습니다.

## 참고사항

-   세션을 유지하여 실행 시 자동으로 로그인 하는 기능이 구현되어 있으나, 오랜 시간 사용하지 않을 경우 숭실대학교 서버에서 세션을 만료시키기 때문에 자동으로 로그인되지 않습니다. 계속 세션을 유지하려고 해보았으나 그러려면 백그라운드에서 세션을 갱신하는 프로세스가 필요하고, 이는 매우 불필요한 리소스를 사용하게 됩니다. 따라서 이 기능은 구현하지 않았습니다. 추측컨대 세션 유지 기간은 12시간 정도로 추정됩니다.