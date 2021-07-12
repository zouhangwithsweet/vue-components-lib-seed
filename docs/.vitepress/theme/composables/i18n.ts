export function isZh(path: string) {
  const ZH = '/zh-CN/'

  return path.includes(ZH)
}

export function isEn(path: string) {
  const EN = '/en-US/'

  return path.includes(EN)
}
