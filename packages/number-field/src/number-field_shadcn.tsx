'use client';

import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as NumberFieldPrimitive from '@react-aria/numberfield';
import { useNumberFieldState } from '@react-stately/numberfield';
import { useLocale } from '@react-aria/i18n';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const NumberField = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitive.NumberField> & {
    className?: string;
    buttonPosition?: 'inside' | 'outside';
  }
>(({ className, buttonPosition = 'inside', ...props }, ref) => {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = NumberFieldPrimitive.useNumberField(props, state, React.useRef(null));

  return (
    <div
      ref={ref}
      className={cn('grid w-full max-w-sm items-center gap-1.5', className)}
    >
      <Label {...labelProps}>{props.label}</Label>
      <div {...groupProps} className='flex'>
        {buttonPosition === 'outside' && (
          <Button
            variant='outline'
            size='icon'
            {...decrementButtonProps}
            className='rounded-r-none'
          >
            <ChevronDown className='h-4 w-4' />
          </Button>
        )}
        <div className='relative flex-1'>
          <Input
            type='number'
            {...inputProps}
            className={cn(
              'pr-8',
              buttonPosition === 'outside' &&
                'rounded-l-none rounded-r-none border-l-0 border-r-0'
            )}
          />
          {buttonPosition === 'inside' && (
            <>
              <Button
                variant='ghost'
                size='icon'
                {...incrementButtonProps}
                className='absolute right-0 top-0 h-1/2 w-8 rounded-bl-none rounded-tl-none border-l'
              >
                <ChevronUp className='h-3 w-3' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                {...decrementButtonProps}
                className='absolute bottom-0 right-0 h-1/2 w-8 rounded-tl-none rounded-tr-none border-l border-t'
              >
                <ChevronDown className='h-3 w-3' />
              </Button>
            </>
          )}
        </div>
        {buttonPosition === 'outside' && (
          <Button
            variant='outline'
            size='icon'
            {...incrementButtonProps}
            className='rounded-l-none'
          >
            <ChevronUp className='h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  );
});
NumberField.displayName = 'NumberField';

export { NumberField };
