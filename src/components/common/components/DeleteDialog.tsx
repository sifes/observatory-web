import { FC } from 'react';
import { Trash } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';

interface DeleteDialogProps {
  title: string;
  name?: string;
  onConfirm: () => void;
  variant?: 'button' | 'icon';
  buttonLabel?: string;
  buttonVariant?: 'primary' | 'outline';
}

export const DeleteDialog: FC<DeleteDialogProps> = ({
  title,
  onConfirm,
  name,
  variant = 'icon',
  buttonLabel = 'Delete',
  buttonVariant = 'primary',
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {variant === 'icon' ? (
          <div className='rounded-md border-2 border-solid border-transparent p-[6px] hover:border-destructive'>
            <Trash className='text-destructive' />
          </div>
        ) : buttonVariant === 'primary' ? (
          <Button type='button' asChild variant='destructive'>
            <span>{buttonLabel}</span>
          </Button>
        ) : (
          <Button type='button' asChild variant='destructive'>
            <span>{buttonLabel}</span>
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Ви впевнені, що хочете видалити {title}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ця дія не може бути повернута. Це назавжди видалить {title} {name}і
            ВСІ його дані.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={buttonVariants({
              variant: 'default',
              className: 'hover:text-white',
            })}
          >
            Відмінити
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Продовжити</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
