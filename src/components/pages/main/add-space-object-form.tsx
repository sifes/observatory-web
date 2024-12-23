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
  AddSpaceObjectSchema,
  TAddSpaceObject,
} from '@/lib/schemas/addSpaceObject.schemas';
import { spaceObjectApi } from '@/app/api/space-object/space-object-api';

interface Props {}

export const AddSpaceObjectForm: FC<Props> = ({}) => {
  const { toastError, toastSuccess } = useCommonToast();
  const { refresh } = useRouter();

  const form = useForm<TAddSpaceObject>({
    resolver: zodResolver(AddSpaceObjectSchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      photoUrl: '',
    },
  });

  async function onSubmit(values: TAddSpaceObject) {
    try {
      await spaceObjectApi.createSpaceObject(values);
      toastSuccess("Ви успішно створили космічний об'єкт");
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
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Локація</FormLabel>
                  <Input {...field} placeholder='Локація' />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='photoUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Посилання на фото</FormLabel>
                  <Input {...field} placeholder='Посилання на фото' />
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
