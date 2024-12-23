'use client';

import useAuth from '@/lib/hooks/useAuth';
import { UserMenu } from './UserMenu';
import { AuthButtons } from './AuthButtons';
import { Loader } from '@/components/common/components/Loader';

export const AuthStateWrapper = () => {
  const { user, loading } = useAuth();

  return loading ? <Loader size='xs' /> : user ? <UserMenu /> : <AuthButtons />;
};
