'use client';

import { observationApi } from '@/app/api/observation/observation-api';
import { Observation } from '@/app/api/observation/observation-api.types';
import { DeleteDialog } from '@/components/common/components/DeleteDialog';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { formatDateTime } from '@/lib/utils/formatDateTime';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface Props {
  observation: Observation;
}

export const ObservationCard: FC<Props> = ({
  observation: { description, name, properties, id, scheduledTime, equipment },
}) => {
  const { push } = useRouter();
  const { toastError, toastSuccess } = useCommonToast();

  const qc = useQueryClient();

  return (
    <div>
      <li className='transform rounded-lg border bg-white object-cover p-4 shadow-md transition-shadow duration-500 hover:shadow-lg'>
        <h3 className='mb-2 text-xl font-semibold text-gray-800'>{name}</h3>
        <p className='mb-2 text-sm text-gray-600'>{description}</p>
        <p className='mb-2 text-sm text-gray-600'>
          Час спостереження: {formatDateTime(scheduledTime)}
        </p>
        {properties && (
          <p className='my-4 font-semibold'>Характеристики: {properties}</p>
        )}

        {equipment?.name && (
          <p className='mb-4 font-semibold'>Телескоп: {equipment?.name}</p>
        )}
        <DeleteDialog
          variant='button'
          onConfirm={async () => {
            try {
              await observationApi.deleteObservation(id);
              await qc.refetchQueries({ queryKey: ['observations'] });
              toastSuccess('Запис на спостереження успішно видалено');
            } catch (error) {
              toastError(error);
            }
          }}
          title='цей запис на спостереження'
        />
      </li>
    </div>
  );
};
