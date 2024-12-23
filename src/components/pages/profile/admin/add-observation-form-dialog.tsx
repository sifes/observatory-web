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
import { AddObservationForm } from './add-observation-form';

export const AddObservationFormDialog: FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Додати запис на спостереження</Button>
      </DialogTrigger>
      <DialogContent className='my-6 w-[90%] max-w-[767px] rounded-md px-6 py-6 md:px-8 md:py-8 lg:px-10'>
        <DialogHeader>
          <DialogTitle className='xs:text-2xl mb-4 text-center text-xl lg:text-3xl'>
            Додати запис на спостереження
          </DialogTitle>
          <DialogDescription hidden> modal</DialogDescription>
        </DialogHeader>
        <AddObservationForm />
      </DialogContent>
    </Dialog>
  );
};
