import { UserSignInStatus } from './types'
import {
  cleanupOnSignout,
  createSigninSession,
  getUserInfo,
  isSignedIn
} from '@/utils/signinHelpers'
import { defaultStorageExpirationDate } from '@/utils/storageHelpers'
import { createSlice } from '@reduxjs/toolkit'
import router from 'next/router'

export type authAction = {
  payload: SignedInPayload
  type: string
}

export type SignedInPayload = {
  sessionId: string
  userId: string
  username: string
}

const initialState: UserSignInStatus = {
  isUserSignedIn: isSignedIn(),
  userInfo: {
    userName: getUserInfo(),
    userEmail: ''
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    signIn: (state, { payload }) => {
      const { id, sessionId, username, role } = payload
      createSigninSession(
        role,
        username,
        sessionId,
        id,
        defaultStorageExpirationDate
      )
      state.isUserSignedIn = true
      state.userInfo.userName = username
    },
    signOut: (state) => {
      cleanupOnSignout()
      state.isUserSignedIn = false
      router.push('/').then()
    }
  }
})

export const { signIn, signOut } = authSlice.actions

export default authSlice.reducer
