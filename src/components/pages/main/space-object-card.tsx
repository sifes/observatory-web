'use client';

import { SpaceObject } from '@/app/api/space-object/space-observation-object-api.types';
import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  spaceObject: SpaceObject;
}

export const SpaceObjectCard: FC<Props> = ({
  spaceObject: { description, id, location, name, photoUrl },
}) => {
  return (
    <Link href={`/space-objects/${id}`}>
      <li className='transform rounded-lg border bg-white object-cover p-4 shadow-md transition-transform duration-500 hover:scale-105 hover:shadow-lg'>
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
      </li>
    </Link>
  );
};
