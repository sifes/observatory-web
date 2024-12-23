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
import { useRouter } from 'next/navigation';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { FC } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { observationApi } from '@/app/api/observation/observation-api';
import {
  AddObservationSchema,
  TAddObservation,
} from '@/lib/schemas/addObservation.schemas';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { equipmentApi } from '@/app/api/equipment/equipment-api';
import { spaceObjectApi } from '@/app/api/space-object/space-object-api';

interface Props {}

export const AddObservationForm: FC<Props> = ({}) => {
  const { toastError, toastSuccess } = useCommonToast();
  const { refresh } = useRouter();
  const qc = useQueryClient();
  const form = useForm<TAddObservation>({
    resolver: zodResolver(AddObservationSchema),
    defaultValues: {
      name: '',
    },
  });

  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: equipmentApi.getAll,
    select(data) {
      return data?.data;
    },
  });

  const { data: spaceObjects } = useQuery({
    queryKey: ['spaceObjects'],
    queryFn: spaceObjectApi.getAll,
    select(data) {
      return data?.data;
    },
  });

  async function onSubmit(values: TAddObservation) {
    try {
      await observationApi.createObservation({
        equipmentId: +values.equipmentId,
        name: values.name,
        scheduledTime: values.scheduledTime,
        spaceObjectId: +values.spaceObjectId,
      });
      await qc.refetchQueries({ queryKey: ['observations'] });
      toastSuccess('Ви успішно створили запис на спостереження');
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
              name='scheduledTime'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Час проведення</FormLabel>
                  <DateTimePicker form={form} name='scheduledTime' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='equipmentId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телескоп</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Оберіть телескоп' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {equipments?.map((equipment) => (
                        <SelectItem
                          key={equipment.id}
                          value={equipment.id.toString()}
                        >
                          {equipment.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='spaceObjectId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Космічний об&apos;єкт</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть космічний об'єкт" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {spaceObjects?.map((spaceObject) => (
                        <SelectItem
                          key={spaceObject.id}
                          value={spaceObject.id.toString()}
                        >
                          {spaceObject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
