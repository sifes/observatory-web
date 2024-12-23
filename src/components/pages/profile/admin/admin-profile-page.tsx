'use client';

import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { equipmentApi } from '@/app/api/equipment/equipment-api';
import { EquipmentCard } from './equipment-card';
import { AddEquipmentFormDialog } from './add-equipment-form-dialog';
import { observationApi } from '@/app/api/observation/observation-api';
import { ObservationCard } from './observation-card';
import { AddObservationFormDialog } from './add-observation-form-dialog';

interface Props {}

export const AdminProfilePage: FC<Props> = () => {
  const { data } = useQuery({
    queryKey: ['equipment'],
    queryFn: equipmentApi.getAll,
    select(data) {
      return data?.data;
    },
  });

  const { data: observations } = useQuery({
    queryKey: ['observations'],
    queryFn: observationApi.getAll,
    select(data) {
      return data?.data;
    },
  });

  return (
    <div className='mx-auto max-w-[1280px] px-2'>
      <div className='flex items-center justify-between'>
        <h2 className='mb-6 text-2xl font-bold'>Телескопи</h2>
        <AddEquipmentFormDialog />
      </div>

      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {data?.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </ul>

      <div className='mt-20 flex items-center justify-between'>
        <h2 className='mb-6 text-2xl font-bold'>Записи на спостереження</h2>
        <AddObservationFormDialog />
      </div>

      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {observations?.map((observation) => (
          <ObservationCard key={observation.id} observation={observation} />
        ))}
      </ul>
    </div>
  );
};
