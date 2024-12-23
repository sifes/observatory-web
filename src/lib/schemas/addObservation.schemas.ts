import { z } from 'zod';

export const AddObservationSchema = z.object({
  name: z
    .string({ required_error: `Введіть ім'я` })
    .min(2, 'Не коротше 2 символів')
    .max(100, 'Не довше 100 символів')
    .transform((value) => value.trim()),
  scheduledTime: z.date(),
  spaceObjectId: z.string({ required_error: `Оберіть космічний об'єкт` }),
  equipmentId: z.string({ required_error: `Оберіть телескоп` }),
});

export type TAddObservation = z.infer<typeof AddObservationSchema>;
