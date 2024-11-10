export function utf8ToB64(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

export function b64ToUtf8(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
}
