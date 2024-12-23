import { z } from 'zod';

export const usernameSchema = z
  .string({ required_error: `Введіть ім'я/псевдонім` })
  .min(2, 'Не коротше 2 символів')
  .max(100, 'Не довше 100 символів')
  .transform((value) => value.trim());
