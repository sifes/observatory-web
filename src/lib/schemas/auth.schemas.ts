import { z } from 'zod';
import { usernameSchema } from './common.schemas';

export const SignUpSchema = z
  .object({
    username: usernameSchema,
    password: z
      .string({ required_error: 'Введіть пароль' })
      .min(6, 'Пароль має бути не коротше 6 символів')
      .max(32, 'Пароль має бути не довше 32 символів')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        'Пароль має містити принаймні одну літеру та одну цифру'
      ),
    confirmPassword: z
      .string({ required_error: 'Підтвердіть пароль' })
      .min(6, 'Пароль має бути не коротше 6 символів')
      .max(32, 'Пароль має бути не довше 32 символів'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Паролі не збігаються',
        path: ['confirmPassword'],
      });
    }
  });

export type TSignUp = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  username: usernameSchema,
  password: z.string(),
});

export type TSignIn = z.infer<typeof SignInSchema>;
