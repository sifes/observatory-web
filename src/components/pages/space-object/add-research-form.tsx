'use client';
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

import { useParams, useRouter } from 'next/navigation';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { FC } from 'react';

import { researchApi } from '@/app/api/research/research-api';
import { Input } from '@/components/ui/input';
import {
  AddResearchSchema,
  TAddResearch,
} from '@/lib/schemas/addResearch.schemas';

interface Props {}

export const AddResearchForm: FC<Props> = ({}) => {
  const { toastError, toastSuccess } = useCommonToast();
  const { refresh } = useRouter();

  const params = useParams<{ spaceObjectId: string }>();

  const form = useForm<TAddResearch>({
    resolver: zodResolver(AddResearchSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: TAddResearch) {
    try {
      await researchApi.createResearch({
        text: values.name,
        spaceobjectId: +params.spaceObjectId,
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Назва</FormLabel>
                  <Input {...field} placeholder='Назва' />
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
