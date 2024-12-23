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
import { AddObservationOrderForm } from './add-observation-order-form';
import useAuth from '@/lib/hooks/useAuth';

export const AddObservationOrderFormDialog: FC = () => {
  const { user } = useAuth();

  const isAdmin = !!user?.isAdmin;

  if (isAdmin || !user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Записатись на спостереження</Button>
      </DialogTrigger>
      <DialogContent className='my-6 h-[90vh] w-[90%] max-w-[767px] overflow-auto rounded-md px-6 py-6 md:px-8 md:py-8 lg:px-10'>
        <DialogHeader>
          <DialogTitle className='xs:text-2xl mb-8 text-center text-xl lg:text-3xl'>
            Записатись на спостереження
          </DialogTitle>
          <DialogDescription hidden> modal</DialogDescription>
        </DialogHeader>
        <AddObservationOrderForm userId={user?.id} />
      </DialogContent>
    </Dialog>
  );
};
