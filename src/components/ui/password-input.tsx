'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';
import { forwardRef, useState } from 'react';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const disabled =
      props.value === '' || props.value === undefined || props.disabled;

    return (
      <div className='relative'>
        <Input
          className={cn('hide-password-toggle pr-10', className)}
          ref={ref}
          {...props}
          type={showPassword ? 'text' : 'password'}
        />
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon className='hover:white h-4 w-4' aria-hidden='true' />
          ) : (
            <EyeOffIcon className='hover:white h-4 w-4' aria-hidden='true' />
          )}
          <span className='sr-only'>
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>

        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
