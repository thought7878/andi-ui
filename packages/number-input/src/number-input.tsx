'use client';

import * as React from 'react';
// import { Input, InputProps } from '@/components/ui/input';
import {
  AriaNumberFieldProps,
  type NumberFieldAria,
  useLocale,
  useNumberField,
} from 'react-aria';
import {
  type NumberFieldState,
  NumberFieldStateOptions,
  useNumberFieldState,
} from 'react-stately';
// import { Button, ButtonProps } from "@/components/ui/button";
// import Button, { ButtonProps } from '@/components/ui/button-aria';

// TODO: bug, "moduleResolution": "Bundler",
import { cn } from './lib/utils';
/* 
const numberFieldVariants = cva("", {
  variants: {
    variant: {
      inside: "",
      outside: "",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "inside",
    size: "default",
  },
});
 */

interface NumberFieldContextValue {
  numberFieldProps: NumberFieldAria;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  btnPosition?: 'inside' | 'outside';
  labelPosition?: 'left' | 'top';
}

const NumberFieldContext = React.createContext<NumberFieldContextValue>(
  {} as NumberFieldContextValue
);

const useNumberFieldContext = () => {
  const numberFieldContext = React.useContext(NumberFieldContext);
  if (!numberFieldContext) {
    throw new Error(
      'useNumberFieldContext should be used within <NumberField>'
    );
  }
  return numberFieldContext;
};

type NumberFieldProps = React.PropsWithChildren<
  Partial<AriaNumberFieldProps> & {
    name?: string;
    className?: string;
    btnPosition?: 'inside' | 'outside';
    labelPosition?: 'left' | 'top';
  } & Partial<Pick<NumberFieldStateOptions, 'locale'>>
>;
const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  (
    {
      children,
      className,
      btnPosition = 'inside',
      labelPosition = 'left',
      locale: customLocale,
      ...props
    },
    ref
  ) => {
    const hookLocale = useLocale().locale;
    const locale = customLocale || hookLocale;
    // TODO: If label is empty, numberFieldProps.labelProps is empty. Because of using NumberFieldLabel, so props.label need default value
    props.label = props.label || props.name || 'label';

    const state = useNumberFieldState({ ...props, locale });

    // TODO: Incompatible with react-aria
    const inputRef = React.useRef<HTMLInputElement>(null);
    const numberFieldProps = useNumberField(props, state, inputRef);

    numberFieldProps.inputProps.name = props.name;

    return (
      <NumberFieldContext.Provider
        value={{ numberFieldProps, inputRef, btnPosition, labelPosition }}
      >
        <div
          ref={ref}
          {...numberFieldProps.groupProps}
          className={cn(
            labelPosition === 'left' ? 'flex items-center gap-1' : '',
            className
          )}
        >
          {children}
        </div>
      </NumberFieldContext.Provider>
    );
  }
);
NumberField.displayName = 'NumberField';
