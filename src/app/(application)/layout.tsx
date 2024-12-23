'use client';

import { FC } from 'react';
import AuthProvider from '@/lib/providers/auth-provider';
import { Toaster } from '@/components/ui/toast/toaster';
import { Header } from '@/components/layout/components/Header';
import { QueryClientProvider } from '@/lib/providers/query-client-provider';

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout: FC<ApplicationLayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <div className='min-h-screen w-full'>
          <Header />

          <main className='h-full w-full p-2 pt-20'>
            {children}
            <Toaster />
          </main>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default ApplicationLayout;
