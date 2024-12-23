'use client';

import { FC } from 'react';
import { User } from '@/lib/types/auth.types';
import { useQuery } from '@tanstack/react-query';
import { observationOrderApi } from '@/app/api/observation-order/observation-order-api';
import { ObservationOrderCard } from './observation-order-card';

interface Props {
  user: User;
}

export const UserProfilePage: FC<Props> = ({ user: { id } }) => {
  const { data } = useQuery({
    queryKey: ['observation-orders-by-user-id', id],
    queryFn: observationOrderApi.getMyOrders,
    select(data) {
      return data?.data;
    },
  });

  return (
    <div>
      <h2 className='mb-6 text-2xl font-bold'>Ваші записи на спостереження</h2>
      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {data?.map((obsservationOrder) => (
          <ObservationOrderCard
            key={obsservationOrder.id}
            observation={obsservationOrder.observation}
          />
        ))}
      </ul>
    </div>
  );
};
