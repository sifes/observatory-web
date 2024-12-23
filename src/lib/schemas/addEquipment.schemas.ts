import { z } from 'zod';

export const AddEquipmentSchema = z.object({
  name: z
    .string({ required_error: `Введіть ім'я` })
    .min(2, 'Не коротше 2 символів')
    .max(100, 'Не довше 100 символів')
    .transform((value) => value.trim()),
  description: z
    .string({ required_error: `Введіть опис` })
    .min(2, 'Не коротше 2 символів')
    .max(100, 'Не довше 100 символів')
    .transform((value) => value.trim()),
  properties: z
    .string({ required_error: `Введіть розташування` })
    .min(2, 'Не коротше 2 символів')
    .max(100, 'Не довше 100 символів')
    .transform((value) => value.trim()),
});

export type TAddEquipment = z.infer<typeof AddEquipmentSchema>;
