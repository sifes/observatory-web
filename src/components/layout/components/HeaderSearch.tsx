'use client';
import { FC, useState } from 'react';
import { Input } from '@/components/ui/input';

export const HeaderSearch: FC = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      className='w-full max-w-[500px]'
      value={value}
      placeholder='Пошук'
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
