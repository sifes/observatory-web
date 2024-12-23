import { FC } from 'react';
import { getQueryClient } from '../api/get-query-client';
import { spaceObjectApi } from '../api/space-object/space-object-api';
import { AddSpaceObjectFormDialog } from '@/components/pages/main/add-space-object-form-dialog';
import { SpaceObjectCard } from '@/components/pages/main/space-object-card';

interface Props {}

const Page: FC<Props> = async () => {
  const qc = getQueryClient();
  const { data } = await qc.fetchQuery({
    queryKey: ['space-objects'],
    queryFn: spaceObjectApi.getAll,
  });

  return (
    <div className='mx-auto max-w-[1280px] px-2'>
      <div className='flex items-center justify-between'>
        <h2 className='my-4 text-center text-3xl font-bold'>
          Космічні об&apos;єкти
        </h2>

        <AddSpaceObjectFormDialog />
      </div>

      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {data.map((spaceObject) => (
          <SpaceObjectCard spaceObject={spaceObject} key={spaceObject.id} />
        ))}
      </ul>
    </div>
  );
};

export default Page;
