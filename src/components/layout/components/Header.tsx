'use client';

import { TelescopeIcon } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/common/components/Loader';

const AuthStateWrapper = dynamic(
  () =>
    import('@/components/layout/components/AuthStateWrapper').then(
      (mod) => mod.AuthStateWrapper
    ),
  { ssr: false, loading: () => <Loader size='xs' /> }
);

export const Header = () => {
  return (
    <header className='bg-background-darker fixed z-10 my-2 w-full'>
      <div className='mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-4 py-1'>
        <Link
          href='/'
          className='flex w-full cursor-pointer items-center gap-4'
        >
          <TelescopeIcon size={40} />
          <h2 className='text-xl font-semibold md:text-3xl'>Observatory</h2>
        </Link>
        <AuthStateWrapper />
      </div>
    </header>
  );
};
