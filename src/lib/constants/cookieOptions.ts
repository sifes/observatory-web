import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const cookieOptions: Partial<ResponseCookie> = {
  secure: true,
  sameSite: 'none',
  httpOnly: false,
  maxAge: 60 * 60 * 24 * 7,
};
