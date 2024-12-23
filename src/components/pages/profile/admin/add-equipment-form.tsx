'use client';
import { Input } from '@/components/ui/input';
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

import { useParams, useRouter } from 'next/navigation';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  AddEquipmentSchema,
  TAddEquipment,
} from '@/lib/schemas/addEquipment.schemas';
import { equipmentApi } from '@/app/api/equipment/equipment-api';

interface Props {}

export const AddEquipmentForm: FC<Props> = ({}) => {
  const { toastError, toastSuccess } = useCommonToast();
  const { refresh } = useRouter();
  const qc = useQueryClient();
  const form = useForm<TAddEquipment>({
    resolver: zodResolver(AddEquipmentSchema),
    defaultValues: {
      name: '',
      description: '',
      properties: '',
    },
  });

  async function onSubmit(values: TAddEquipment) {
    try {
      await equipmentApi.createEquipment(values);
      await qc.refetchQueries({ queryKey: ['equipment'] });
      toastSuccess('Ви успішно створили телескоп');
      refresh();
      form.reset();
    } catch (error) {
      toastError(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <div className='-mt-10 mb-8 flex h-full w-full max-w-96 flex-col gap-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Назва</FormLabel>
                  <Input {...field} placeholder='Назва' />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Опис</FormLabel>
                  <Input {...field} placeholder='Опис' />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='properties'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Характеристики</FormLabel>
                  <Input {...field} placeholder='Характеристики' />
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
