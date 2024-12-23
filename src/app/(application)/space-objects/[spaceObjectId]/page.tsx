import { FC } from 'react';
import { getQueryClient } from '@/app/api/get-query-client';
import { spaceObjectApi } from '@/app/api/space-object/space-object-api';
import { SingleSpaceObjectCard } from '@/components/pages/space-object/single-space-object-card';
import { AddObservationOrderFormDialog } from '@/components/pages/space-object/add-observation-order-form-dialog';

interface Props {
  params: {
    spaceObjectId: number;
  };
}

const Page: FC<Props> = async ({ params: { spaceObjectId } }) => {
  const qc = getQueryClient();
  const { data } = await qc.fetchQuery({
    queryKey: ['space-objects-by-id', spaceObjectId],
    queryFn: () => spaceObjectApi.getSpaceObjectById(spaceObjectId),
  });

  return (
    <div className='mx-auto max-w-[1280px] px-2'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='my-4 text-center text-3xl font-bold'>
          Космічний об&apos;єкт
        </h2>
        <AddObservationOrderFormDialog />
      </div>
      <SingleSpaceObjectCard spaceObject={data} />
    </div>
  );
};

export default Page;
