# uSAINT-macOS

숭실대학교 u-SAINT (유세인트) macOS 웹앱입니다.
uSAINT가 macOS Safari 환경에서 정상적으로 작동하지 않아, Chrome과 Safari를 왔다갔다 해야 하는 불편함과 통일성이 떨어지는 문제를 해소하기 위해 제작하였습니다. Chromium 기반인 Electron을 이용하여 만들어졌습니다.

단순 웹앱이라 특별한 코드나 기능은 포함되어있지 않으나 [Issue](https://github.com/asheswook/uSAINT-macOS/issues)를 통해 개선사항을 제안해주시면 반영할 수 있도록 하겠습니다.

## Feature

-   자동 세션 유지 로그인
-   ~~간지?~~

## Installation

[Releases](https://github.com/asheswook/uSAINT-macOS/releases)에서 최신 버전을 다운받을 수 있습니다.

즉시 dmg를 받아 실행하면 "손상되었기 때문에 열 수 없습니다"라는 문구와 함께 실행이 되지 않습니다. **실제로 손상이 된 것은 아니고**,
Apple Developer Program으로부터 인증을 받지 않은 개발자가 빌드했기 때문에 나타나는 문제입니다. 

실행하려면 아래 과정을 따르면 됩니다.

1. 맥에서 `Terminal`을 실행해주세요.
2. `Terminal`에 아래 명령어를 입력하고 엔터를 눌러주세요. 이후 Password를 요구하면 맥 계정의 비밀번호를 입력 후 엔터를 눌러주세요. (Gatekeeper를 해제하는 과정입니다. 아래에 설치를 끝낸 뒤 Gatekeeper를 다시 활성화하는 과정이 나와있습니다.)
```shell
sudo spctl --master-disable
```
3. `Terminal`에 아래 명령어를 입력하고 엔터를 눌러주세요. (uSAINT 앱은 응용프로그램 폴더에 위치해있어야 합니다)
```shell
xattr -cr "/Applications/uSAINT.app"
```
4. 이제 uSAINT 앱을 실행할 수 있습니다. 앱을 실행하여 정상 작동함을 확인한 뒤, `Terminal`에 아래 명령어를 입력하고 엔터를 눌러주세요. 이후 Password를 요구하면 맥 계정의 비밀번호를 입력 후 엔터를 눌러주세요. (Gatekeeper를 다시 활성화하는 과정입니다.)
```shell
sudo spctl --master-enable
```

## 참고사항

-   세션을 유지하여 실행 시 자동으로 로그인 하는 기능이 구현되어 있으나, 오랜 시간 사용하지 않을 경우 숭실대학교 서버에서 세션을 만료시키기 때문에 자동으로 로그인되지 않습니다. 계속 세션을 유지하려고 해보았으나 그러려면 백그라운드에서 세션을 갱신하는 프로세스가 필요하고, 이는 매우 불필요한 리소스를 사용하게 됩니다. 따라서 이 기능은 구현하지 않았습니다. 추측컨대 세션 유지 기간은 12시간 정도로 추정됩니다.

- 2023/02/23 확인 결과 수강신청 정상적으로 작동합니다.
