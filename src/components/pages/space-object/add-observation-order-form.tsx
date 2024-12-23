'use client';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { FC } from 'react';

import {
  AddObservationOrderSchema,
  TAddObservationOrder,
} from '@/lib/schemas/addObservationOrder.schemas';
import { observationOrderApi } from '@/app/api/observation-order/observation-order-api';
import { useQuery } from '@tanstack/react-query';
import { observationApi } from '@/app/api/observation/observation-api';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ObservationOrderCard } from '../profile/user/observation-order-card';

interface Props {
  userId: string;
}

export const AddObservationOrderForm: FC<Props> = ({ userId }) => {
  const { toastError, toastSuccess } = useCommonToast();
  const { refresh } = useRouter();

  const form = useForm<TAddObservationOrder>({
    resolver: zodResolver(AddObservationOrderSchema),
    defaultValues: {
      observationId: '',
    },
  });

  const { data } = useQuery({
    queryKey: ['observations'],
    queryFn: observationApi.getAll,
    select(data) {
      return data?.data;
    },
  });

  async function onSubmit(values: TAddObservationOrder) {
    try {
      await observationOrderApi.createObservationOrder({
        userId: +userId,
        observationId: +values.observationId,
      });
      toastSuccess('Ви успішно створили запис');
      refresh();
      form.reset();
    } catch (error) {
      toastError(
        'Ти вже записаний на це спостереження',
        'Обери інше спостереження'
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <div className='-mt-10 mb-8 flex h-full w-full max-w-96 flex-col gap-6'>
            <FormField
              control={form.control}
              name='observationId'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel className='my-4'>
                    Обери спостереження яке тобі до вподоби
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      {data?.map((observation) => (
                        <FormItem
                          key={observation.id}
                          className='flex items-center space-x-3 space-y-0'
                        >
                          <FormControl>
                            <RadioGroupItem value={observation.id + ''} />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            <ObservationOrderCard observation={observation} />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' disabled={form.formState.isSubmitting}>
            Зберегти
          </Button>
        </div>
      </form>
    </Form>
  );
};
