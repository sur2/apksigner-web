# 📑 프로젝트 명세서: ApkSigner Web Automation Tool

## 1. 프로젝트 개요
- **프로젝트명:** ApkSigner Web Interface
- **목적:** Android SDK의 CLI 도구인 `apksigner`를 웹 UI 환경에서 편리하게 사용할 수 있도록 구현한 로컬 기반 애플리케이션입니다.
- **핵심 가치:** 명령어를 직접 입력하는 번거로움을 줄이고, 드래그 앤 드롭과 설정 자동 저장으로 작업 효율을 극대화합니다.

---

## 2. 주요 기능 명세

### 2.1 APK 서명 (Signature v2)
- **기능:** 업로드된 APK 파일에 Android Signature Scheme v2를 적용하여 서명합니다.
- **옵션:** `--v2-signing-enabled true`를 강제 적용하여 최신 보안 요구사항을 충족합니다.
- **결과:** 서명 완료 후 `signed_` 접두사가 붙은 파일로 브라우저에 자동 다운로드됩니다.

### 2.2 서명 상태 확인 (Smart Check)
- **검증:** 파일 업로드 시 서버에서 `apksigner verify` 명령어를 통해 이미 서명된 파일인지 사전 검사합니다.
- **인터랙션:** 이미 서명된 경우 팝업창을 통해 "이미 서명된 apk 입니다. 계속 진행하시겠습니까?"라는 문구를 표시하여 사용자 선택을 유도합니다.

### 2.3 환경 설정 영속성 (Persistence)
- **대상:** `apksigner` 경로, `Keystore` 파일 경로, `Keystore` 비밀번호.
- **기술:** 브라우저의 `localStorage`를 사용하여 가장 최근에 입력한 값을 저장합니다. 
- **편의성:** 페이지를 새로고침하거나 다시 접속해도 이전 설정값이 자동으로 입력되어 있어 반복 작업이 용이합니다.

### 2.4 드래그 앤 드롭 UI
- **UX:** 사용자는 파일을 탐색기에서 브라우저의 전용 영역(Drop Zone)으로 직접 끌어다 놓아 업로드할 수 있습니다.
- **파일 필터:** `.apk` 확장자가 아닌 파일은 업로드 시 차단하여 오류를 방지합니다.

---

## 3. 기술 스택 및 설치 환경

### 🛠 기술 스택
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)
- **Backend:** Node.js, Express Framework
- **File Handling:** Multer (파일 업로드), fs (파일 관리)
- **Process:** Child Process (exec)를 통한 CLI 명령어 실행

### 📋 설치 및 실행 순서
1. **Node.js 설치:** [공식 홈페이지](https://nodejs.org/)에서 설치합니다.
2. **라이브러리 설치:** 프로젝트 폴더에서 `npm install express multer`를 실행합니다.
3. **서버 실행:** `node server.js` 명령어로 로컬 서버를 가동합니다.
4. **웹 접속:** 브라우저에서 `http://localhost:3000`에 접속하여 사용합니다.

---

## 4. 향후 로드맵
- 서명 로그 실시간 스트리밍 출력 기능.
- 다중 APK 파일 일괄 서명 지원.
- Keystore 내 Alias 선택 리스트 자동 생성.