'use server'

import axios from 'axios'
import { cookies } from 'next/headers'
import { TStatus, TUserLogin, TUserProfile } from '@/core/entities'
import { TFieldsLogin } from './types'

export const LoginAction = async (fields: TFieldsLogin): Promise<TStatus<TUserProfile>> => {
  const status: TStatus<TUserProfile> = {
    status: false,
    payload: undefined,
  }

  try {
    const cookieStore = await cookies()

    const response = await axios.request<TUserLogin>({
      method: 'POST',
      baseURL: process.env.QUAZEX_PRIVATE_BACKEND_URL,
      url: 'auth/login',
      data: {
        username: fields.username,
        password: fields.password,
      },
    })

    status.status = response.status === 200
    status.payload = {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      gender: response.data.gender,
      image: response.data.image,
    }

    cookieStore.set('access_token', response.data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 15, // 15 минут
    })

    cookieStore.set('refresh_token', response.data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    })
  } catch (error) {
    console.error(error)
  }

  return status
}
