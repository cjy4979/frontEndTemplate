import {
  readStorage,
  StorageTypes,
  createStorage,
  eraseStorage
} from './storageHelpers'

type UserSession = {
  sessionId: string
  username: string
  id: string
}

export const getSessionValues = (): UserSession => {
  const userId = readStorage(StorageTypes.UID_STORAGE)
  if (!userId) {
    return {
      sessionId: '',
      username: '',
      id: ''
    }
  } else {
    return {
      sessionId: readStorage(StorageTypes.SESSION_ID_STORAGE) || '',
      username: readStorage(StorageTypes.USERNAME_STORAGE) || '',
      id: readStorage(StorageTypes.UID_STORAGE) || ''
    }
  }
}

export const createSigninSession = (
  username: string,
  sessionId: string,
  userId: string,
  days: number
): void => {
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
  eraseStorage(StorageTypes.USERNAME_STORAGE)
  eraseStorage(StorageTypes.UID_STORAGE)
  eraseStorage(StorageTypes.SESSION_ID_STORAGE)
  localStorage.clear()
}
