'use client';

import { equipmentApi } from '@/app/api/equipment/equipment-api';
import { Equipment } from '@/app/api/equipment/equipment-api.types';
import { DeleteDialog } from '@/components/common/components/DeleteDialog';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface Props {
  equipment: Equipment;
}

export const EquipmentCard: FC<Props> = ({
  equipment: { description, name, properties, id },
}) => {
  const { push } = useRouter();
  const { toastError, toastSuccess } = useCommonToast();

  const qc = useQueryClient();

  return (
    <div>
      <li className='transform rounded-lg border bg-white object-cover p-4 shadow-md transition-shadow duration-500 hover:shadow-lg'>
        <h3 className='mb-2 text-xl font-semibold text-gray-800'>{name}</h3>
        <p className='mb-2 text-sm text-gray-600'>{description}</p>
        <p className='my-4 font-semibold'>Характеристики: {properties}</p>
        <DeleteDialog
          variant='button'
          onConfirm={async () => {
            try {
              await equipmentApi.deleteEquipment(id);
              await qc.refetchQueries({ queryKey: ['equipment'] });
              toastSuccess('Телескоп успішно видалено');
              push('/');
            } catch (error) {
              toastError(error);
            }
          }}
          title='цей телескоп'
        />
      </li>
    </div>
  );
};
