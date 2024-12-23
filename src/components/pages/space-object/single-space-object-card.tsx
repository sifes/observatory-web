'use client';

import { SpaceObject } from '@/app/api/space-object/space-observation-object-api.types';
import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  spaceObject: SpaceObject;
}

export const SingleSpaceObjectCard: FC<Props> = ({
  spaceObject: { description, location, name, photoUrl, researches },
}) => {
  return (
    <div className='transform rounded-lg border bg-white object-cover p-4 shadow-md transition-shadow duration-500 hover:shadow-lg'>
      <h3 className='mb-2 text-xl font-semibold text-gray-800'>{name}</h3>
      <p className='mb-2 text-sm text-gray-600'>{description}</p>
      <p className='mb-4 flex items-center text-xs text-gray-500'>
        <MapPinIcon />
        {location}
      </p>
      <span className='relative block w-full overflow-hidden rounded-lg pt-[25%] shadow-sm'>
        <Image
          src={photoUrl}
          alt='Image preview will appear here'
          fill
          sizes='100vw'
          className='left-0 top-0 h-full w-full transform object-cover transition-transform duration-500 hover:scale-105'
        />
      </span>

      {!!researches?.length && (
        <>
          <h4 className='mt-4 font-semibold'>Дослідження:</h4>
          {researches?.map((research) => (
            <div key={research.id}>
              <h4>{research.text}</h4>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
