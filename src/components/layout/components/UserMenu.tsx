import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/app/api/auth/server-auth-api';
import useAuth from '@/lib/hooks/useAuth';
import Link from 'next/link';
import { UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export const UserMenu: FC = () => {
  const { user } = useAuth();
  const { push } = useRouter();
  const qc = useQueryClient();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex gap-1'>
          <UserIcon />
          <h2 className='font-bold'>{user?.username}</h2>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='text-xl'>
        <DropdownMenuItem asChild className='cursor-pointer p-3 text-xl'>
          <div
            onClick={async () => {
              await logout();
              await qc.setQueryData(['get-me'], null, {
                updatedAt: Date.now(),
              });
              push('/auth/sign-in');
            }}
          >
            Вийти
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='cursor-pointer p-3 text-xl'>
          <Link href={`/profile`}>Профіль</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
