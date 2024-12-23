import axios from 'axios';
import { AuthToken } from './auth/auth-api.types';
import { isServer } from '@/lib/constants/isServer';
import { getClientCookie } from '@/lib/utils/getClientCookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const cookiesInterceptor = async (req: any) => {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookiesString = cookies()
      .getAll()
      .map((item) => `${item.name}=${item.value}`)
      .join('; ');
    req.headers.Cookie = cookiesString;
    const cookie = cookies().get(AuthToken.AccessToken);
    if (cookie) {
      req.headers.Authorization = `Bearer ${cookie}`;
    }
  } else {
    const cookie = getClientCookie(AuthToken.AccessToken);
    if (cookie) {
      req.headers.Authorization = `Bearer ${cookie}`;
    }
  }
  return req;
};

instance.interceptors.request.use(cookiesInterceptor);

export { instance };
