'use client';

import { Observation } from '@/app/api/observation/observation-api.types';
import { formatDateTime } from '@/lib/utils/formatDateTime';
import { FC } from 'react';

interface Props {
  observation: Observation;
}

export const ObservationOrderCard: FC<Props> = ({
  observation: { description, scheduledTime, name, properties },
}) => {
  return (
    <div>
      <li className='transform rounded-lg border bg-white object-cover p-4 shadow-md transition-transform duration-500 hover:scale-105 hover:shadow-lg'>
        <h3 className='mb-2 text-xl font-semibold text-gray-800'>{name}</h3>
        <p className='mb-2 text-sm text-gray-600'>{description}</p>
        {properties && (
          <p className='mt-4 font-semibold'>Xарактеристики: {properties}</p>
        )}
        <p className='mb-4 flex items-center text-xs text-gray-500'>
          Час проведення: {formatDateTime(scheduledTime)}
        </p>
      </li>
    </div>
  );
};
