'use server';

import { cookies } from 'next/headers';

import { AuthToken } from './auth-api.types';
import { cookieOptions } from '@/lib/constants/cookieOptions';

export async function logout() {
  cookies().delete({ name: AuthToken.AccessToken, ...cookieOptions });
}

export async function setAuthToken(token: string) {
  cookies().set(AuthToken.AccessToken, token, cookieOptions);
}

export async function getAccessToken() {
  return cookies().get(AuthToken.AccessToken);
}
