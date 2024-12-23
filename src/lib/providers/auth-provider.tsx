'use client';

import { createContext, PropsWithChildren } from 'react';
import { authApi } from '@/app/api/auth/auth-api';

import { Session } from '../types/auth.types';
import { useQuery } from '@tanstack/react-query';
import { getClientCookie } from '../utils/getClientCookie';
import { AuthToken } from '@/app/api/auth/auth-api.types';
import { isServer } from '../constants/isServer';

export const AuthContext = createContext<Session | null>(null);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const cookie = getClientCookie(AuthToken.AccessToken);
  const { data: user, isLoading } = useQuery({
    queryKey: ['get-me', cookie],
    queryFn: authApi.getMe,
    staleTime: Infinity,
    retry: false,
    select: (data) => data.data,
    enabled: !!cookie,
  });

  const sessionValue = isServer
    ? { user: null, loading: !!cookie }
    : { user: user || null, loading: isLoading };

  return (
    <AuthContext.Provider value={sessionValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
