import {
  readStorage,
  StorageTypes,
  createStorage,
  eraseStorage
} from './storageHelpers'

type UserSession = {
  sessionId: string
  username: string
  role?: string //'user'|'admin'|'super'
  id: string
}

export const getSessionValues = (): UserSession => {
  const userId = readStorage(StorageTypes.UID_STORAGE)
  if (!userId) {
    return {
      role: '',
      sessionId: '',
      username: '',
      id: ''
    }
  } else {
    return {
      role: readStorage(StorageTypes.ROLE_STORAGE) || '',
      sessionId: readStorage(StorageTypes.SESSION_ID_STORAGE) || '',
      username: readStorage(StorageTypes.USERNAME_STORAGE) || '',
      id: readStorage(StorageTypes.UID_STORAGE) || ''
    }
  }
}

export const createSigninSession = (
  role: string,
  username: string,
  sessionId: string,
  userId: string,
  days: number
): void => {
  createStorage(StorageTypes.ROLE_STORAGE, role, days)
  createStorage(StorageTypes.USERNAME_STORAGE, username, days)
  createStorage(StorageTypes.UID_STORAGE, userId, days)
  createStorage(StorageTypes.SESSION_ID_STORAGE, sessionId, days)
}

export const isSignedIn = (): boolean => {
  const { sessionId, username, id } = getSessionValues()
  return !!sessionId && !!username && !!id
}
export const getUserInfo = (): string => {
  const { sessionId, username, id } = getSessionValues()
  return username
}

export const cleanupOnSignout = (): void => {
  eraseStorage(StorageTypes.ROLE_STORAGE)
  eraseStorage(StorageTypes.USERNAME_STORAGE)
  eraseStorage(StorageTypes.UID_STORAGE)
  eraseStorage(StorageTypes.SESSION_ID_STORAGE)
  localStorage.clear()
}
