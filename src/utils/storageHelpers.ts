/* eslint-disable no-unused-vars */
export enum StorageTypes {
  SESSION_ID_STORAGE = 'storage_s',
  USERNAME_STORAGE = 'storage_u',
  ROLE_STORAGE = 'storage_r',
  UID_STORAGE = 'storage_w_i'
}

export const defaultStorageExpirationDate = 1 / 3

export const readStorage = (name: string): string | undefined => {
  if (!name) return ''
  if (typeof localStorage !== 'undefined') {
    let val = localStorage.getItem(name)?.split('; expires=')
    if (!val || val.length != 2 || Date.parse(val[1]) <= Date.now()) return ''
    return val[0]
  } else {
    return ''
  }
}

export const createStorage = (
  name: string,
  value: string,
  days: number
): void => {
  let expires = ''
  const dayInMs = 24 * 60 * 60 * 1000
  //需要的话配到环境变量里，方便维护

  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * dayInMs)
    expires = '; expires=' + date.toUTCString()
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(name, value + expires + '; path=/')
  }
}

export const eraseStorage = (name: string): void => {
  createStorage(name, '', -1)
}
