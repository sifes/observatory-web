import { LoginForm } from '@/components/pages/auth/sign-in/components/login-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SignInPage: React.FC = () => {
  return (
    <section className='flex h-full flex-col items-center justify-center gap-8 py-[10%]'>
      <h2 className='text-2xl font-medium'>Увійти</h2>

      <LoginForm />

      <p className='text-center text-sm'>
        Немає аккаунту?
        <Link href='/auth/sign-up'>
          <Button variant='link'>Зареєструватись</Button>
        </Link>
      </p>
    </section>
  );
};

export default SignInPage;
