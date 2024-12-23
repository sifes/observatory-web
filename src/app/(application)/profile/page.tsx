import { getAccessToken } from '@/app/api/auth/server-auth-api';
import { ProfilePage } from '@/components/pages/profile/profile-page';
import { redirect } from 'next/navigation';
import { FC } from 'react';

const Page: FC = async () => {
  const cookie = await getAccessToken();

  if (!cookie?.value) redirect('/auth/sign-in');

  return (
    <section>
      <ProfilePage />
    </section>
  );
};

export default Page;
