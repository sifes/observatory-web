'use client';

import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AddSpaceObjectForm } from './add-space-object-form';
import useAuth from '@/lib/hooks/useAuth';

export const AddSpaceObjectFormDialog: FC = () => {
  const { user } = useAuth();

  const isAdmin = !!user?.isAdmin;

  if (!isAdmin) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Додати космічний об&apos;єкт</Button>
      </DialogTrigger>
      <DialogContent className='my-6 w-[90%] max-w-[767px] rounded-md px-6 py-6 md:px-8 md:py-8 lg:px-10'>
        <DialogHeader>
          <DialogTitle className='xs:text-2xl mb-4 text-center text-xl lg:text-3xl'>
            Додати космічний об&apos;єкт
          </DialogTitle>
          <DialogDescription hidden> modal</DialogDescription>
        </DialogHeader>
        <AddSpaceObjectForm />
      </DialogContent>
    </Dialog>
  );
};
