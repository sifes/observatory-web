import { Loader2 } from 'lucide-react';

const sizeMapper = {
  xs: 50,
  sm: 75,
  md: 100,
  lg: 160,
};

export function Loader({ size = 'md' }: { size?: keyof typeof sizeMapper }) {
  return (
    <Loader2 className='animate-spin text-violet-700' size={sizeMapper[size]} />
  );
}
