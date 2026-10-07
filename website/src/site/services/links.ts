/**
 * 全站外链与版本号集中在这里，改一处就够。
 *
 * 作者说的是 GitHub 和 GitCode 都已经上线，所以两处都是真链接：
 * GitHub 走 Releases 页（自动更新检查也是先查 GitCode，再回退 GitHub，见 README）。
 */
export const GITHUB_REPO = 'https://github.com/luolangaga/WinIsland'
export const GITHUB_RELEASES = `${GITHUB_REPO}/releases`
export const GITHUB_ISSUES = `${GITHUB_REPO}/issues`
export const GITHUB_LATEST = `${GITHUB_REPO}/releases/latest`

export const GITCODE_REPO = 'https://gitcode.com/luolangaga/WinIsland'
export const GITCODE_RELEASES = `${GITCODE_REPO}/releases`

/** GitHub Releases 的静态下载入口（latest 会自动跟随最新 tag） */
export const GITHUB_DOWNLOAD_X64 = `${GITHUB_REPO}/releases/latest/download/WinIsland-win-x64.zip`
export const GITHUB_DOWNLOAD_ARM64 = `${GITHUB_REPO}/releases/latest/download/WinIsland-win-arm64.zip`

/** 宿主版本，和 WinIsland.Core 的 SDK 版本分开看 */
export const HOST_VERSION = '2.3.1'
export const SDK_VERSION = '2.0'
export const TARGET_FRAMEWORK = 'net10.0-windows10.0.26100.0'
export const MIN_WINDOWS = 'Windows 10 1809（build 17763）'

export const LICENSE_NAME = 'MIT'
