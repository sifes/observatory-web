'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authApi } from '@/app/api/auth/auth-api';

import { useRouter } from 'next/navigation';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { TSignIn, SignInSchema } from '@/lib/schemas/auth.schemas';
import { setAuthToken } from '@/app/api/auth/server-auth-api';
import { PasswordInput } from '@/components/ui/password-input';

export const LoginForm = () => {
  const { push } = useRouter();
  const { toastError, toastSuccess } = useCommonToast();
  const form = useForm<TSignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: TSignIn) {
    try {
      const { data } = await authApi.login(values);
      await setAuthToken(data.accessToken);
      toastSuccess('Ви успішно увійшли');
      push('/');
    } catch (error) {
      toastError(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full max-w-[440px] flex-col gap-5'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-normal'>Юзернейм</FormLabel>
              <Input {...field} placeholder='Юзернейм' />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-normal'>Пароль</FormLabel>
              <PasswordInput placeholder='Пароль' {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full'
          disabled={form.formState.isSubmitting}
        >
          Увійти
        </Button>
      </form>
    </Form>
  );
};
