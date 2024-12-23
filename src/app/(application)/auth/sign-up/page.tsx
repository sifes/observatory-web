'use client';
import { RegisterForm } from '@/components/pages/auth/sign-up/components/register-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';

const SignUpPage: FC = () => {
  return (
    <section className='flex h-full w-full min-w-72 flex-col items-center justify-center gap-8 py-[10%]'>
      <h1 className='mb-5 text-2xl font-semibold'>Зареєструватись</h1>

      <RegisterForm />

      <p className='text-center text-sm'>
        Вже є аккаунт?
        <Link href='/auth/sign-in'>
          <Button variant='link'>Увійти</Button>
        </Link>
      </p>
    </section>
  );
};

export default SignUpPage;
