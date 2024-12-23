'use client';

import { FC } from 'react';
import useAuth from '@/lib/hooks/useAuth';
import { AdminProfilePage } from './admin/admin-profile-page';
import { UserProfilePage } from './user/user-profile-page';
import { Loader } from '@/components/common/components/Loader';

interface Props {}

export const ProfilePage: FC<Props> = () => {
  const { user } = useAuth();
  const isAdmin = !!user?.isAdmin;

  return !user ? (
    <Loader />
  ) : isAdmin ? (
    <AdminProfilePage />
  ) : (
    <UserProfilePage user={user} />
  );
};
