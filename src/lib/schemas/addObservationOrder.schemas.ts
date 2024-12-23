import { z } from 'zod';

export const AddObservationOrderSchema = z.object({
  observationId: z.string({ required_error: `Оберіть спостереження` }),
});

export type TAddObservationOrder = z.infer<typeof AddObservationOrderSchema>;
