'use client';

import { Equipment } from '@/app/api/equipment/equipment-api.types';
import { FC } from 'react';

interface Props {
  equipment: Equipment;
}

export const EquipmentCard: FC<Props> = ({
  equipment: { description, name, properties },
}) => {
  return (
    <div>
      <li className='transform rounded-lg border bg-white object-cover p-4 shadow-md transition-shadow duration-500 hover:shadow-lg'>
        <h3 className='mb-2 text-xl font-semibold text-gray-800'>{name}</h3>
        <p className='mb-2 text-sm text-gray-600'>{description}</p>
        <p className='mt-4 font-semibold'>Характеристики: {properties}</p>
      </li>
    </div>
  );
};
