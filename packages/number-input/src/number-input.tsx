'use client';

import * as React from 'react';
import {
  AriaButtonOptions,
  AriaNumberFieldProps,
  type NumberFieldAria,
  useButton,
  useLocale,
  useNumberField,
} from 'react-aria';
import {
  NumberFieldState,
  NumberFieldStateOptions,
  useNumberFieldState,
} from 'react-stately';
// import {ValidationResult} from '@react-types/shared';

import { cn } from './lib/utils';

export interface ValidationResult {
  /** Whether the input value is invalid. */
  isInvalid: boolean;
  /** The current error messages for the input if it is invalid, otherwise an empty array. */
  validationErrors: string[];
  /** The native validation details for the input. */
  validationDetails: ValidityState;
}

interface NumberFieldContextValue {
  numberFieldProps: NumberFieldAria;
  inputRef?: React.RefObject<HTMLInputElement>;
  btnPosition?: 'inside' | 'outside';
  labelPosition?: 'left' | 'top';
  errorMessage?: React.ReactNode | ((v: ValidationResult) => React.ReactNode);
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

// 定义暴露给父组件的 ref 类型
type NumberFieldRef = Partial<HTMLDivElement> & {
  state: NumberFieldState;
  numberFieldProps: NumberFieldAria;
};
type NumberFieldProps = React.PropsWithChildren<
  Partial<AriaNumberFieldProps> & {
    name?: string;
    className?: string;
    btnPosition?: 'inside' | 'outside';
    labelPosition?: 'left' | 'top';
  } & Partial<Pick<NumberFieldStateOptions, 'locale'>>
>;
const NumberField = React.forwardRef<NumberFieldRef, NumberFieldProps>(
  (
    {
      children,
      className,
      btnPosition = 'inside',
      labelPosition = 'left',
      locale: customLocale,
      errorMessage,
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

    // TODO: Incompatible with react-aria
    numberFieldProps.inputProps.name = props.name;

    React.useImperativeHandle(ref, () => ({
      state,
      numberFieldProps,
    }));

    console.log('state.realtimeValidation:', state.realtimeValidation);
    // // console.log('state.displayValidation:', state.displayValidation);

    console.log('numberFieldProps.validationErrors888:', numberFieldProps);

    // console.log(
    //   'numberFieldProps.validationDetails:',
    //   numberFieldProps.validationDetails
    // );

    return (
      <NumberFieldContext.Provider
        value={{
          numberFieldProps,
          inputRef,
          btnPosition,
          labelPosition,
          errorMessage,
        }}
      >
        <div
          ref={ref as React.ForwardedRef<HTMLDivElement>}
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

type NumberFieldGroupProps = {
  className?: string;
  children: React.ReactNode;
};
const NumberFieldGroup = React.forwardRef<
  HTMLDivElement,
  NumberFieldGroupProps
>(({ className, children }, ref) => {
  const {
    numberFieldProps: { groupProps },
  } = useNumberFieldContext();
  return (
    <div
      ref={ref}
      className={cn('relative flex gap-1', className)}
      {...groupProps}
    >
      {children}
    </div>
  );
});
NumberFieldGroup.displayName = 'NumberFieldGroup';

type NumberFieldIncrementProps = {
  className?: string;
  children: React.ReactNode;
};
const NumberFieldIncrement = React.forwardRef<
  HTMLButtonElement,
  NumberFieldIncrementProps
>(({ className, children }, ref) => {
  const {
    numberFieldProps: { incrementButtonProps },
    btnPosition,
  } = useNumberFieldContext();

  return (
    <Button
      {...incrementButtonProps}
      className={cn(
        'z-10 rounded-md bg-slate-900 text-slate-50 transition-all enabled:hover:bg-slate-900/60 disabled:cursor-not-allowed disabled:opacity-50',
        btnPosition === 'outside'
          ? 'px-3 py-2'
          : 'absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-b-none p-0 focus-visible:outline-none',
        className
      )}
      ref={ref}
    >
      {children}
    </Button>
  );
});
NumberFieldIncrement.displayName = 'NumberFieldIncrement';

type NumberFieldDecrementProps = {
  children: React.ReactNode;
  className?: string;
};
const NumberFieldDecrement = React.forwardRef<
  HTMLButtonElement,
  NumberFieldDecrementProps
>(({ className, children }, ref) => {
  const {
    numberFieldProps: { decrementButtonProps },
    btnPosition,
  } = useNumberFieldContext();

  return (
    <Button
      {...decrementButtonProps}
      className={cn(
        'z-10 rounded-md bg-slate-900 text-slate-50 transition-all enabled:hover:bg-slate-900/60 disabled:cursor-not-allowed disabled:opacity-50',
        btnPosition === 'outside'
          ? 'px-3 py-2'
          : 'absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-t-none p-0 focus-visible:outline-none',
        className
      )}
      ref={ref}
    >
      {children}
    </Button>
  );
});
NumberFieldDecrement.displayName = 'NumberFieldDecrement';

type NumberFieldInputProps = { className?: string };
const NumberFieldInput = React.forwardRef<
  HTMLInputElement,
  NumberFieldInputProps
>(({ className }, ref) => {
  const {
    numberFieldProps: { inputProps, isInvalid },
    inputRef,
  } = useNumberFieldContext();

  React.useEffect(() => {
    if (ref && 'current' in ref && inputRef?.current) {
      ref.current = inputRef?.current;
    }
  }, [inputRef, ref]);

  return (
    <input
      ref={inputRef}
      type='number'
      className={cn(
        'flex h-10 w-full transition-all rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        isInvalid && 'focus-visible:ring-red-500',
        className
      )}
      {...inputProps}
    />
  );
});
NumberFieldInput.displayName = 'NumberFieldInput';

type NumberFieldLabelProps = {
  className?: string;
  children: React.ReactNode;
};
const NumberFieldLabel = React.forwardRef<
  HTMLLabelElement,
  NumberFieldLabelProps
>(({ className, children }, ref) => {
  const {
    numberFieldProps: { labelProps },
    labelPosition,
  } = useNumberFieldContext();

  return (
    <label
      ref={ref}
      {...labelProps}
      className={cn(
        labelPosition === 'left' ? 'flex items-center justify-center' : '',
        className
      )}
    >
      {children}
    </label>
  );
});
NumberFieldLabel.displayName = 'NumberFieldLabel';

type NumberFieldErrorProps = {
  className?: string;
  children?: React.ReactNode;
};
const NumberFieldError = React.forwardRef<
  HTMLDivElement,
  NumberFieldErrorProps
>(({ className, children }, ref) => {
  const {
    numberFieldProps: {
      errorMessageProps,
      isInvalid,
      validationErrors,
      validationDetails,
    },
    errorMessage,
  } = useNumberFieldContext();

  let errorMessageString: React.ReactNode = null;
  if (typeof errorMessage === 'function') {
    errorMessageString =
      isInvalid && validationErrors != null && validationDetails != null
        ? errorMessage({
            isInvalid,
            validationErrors,
            validationDetails,
          })
        : null;
  } else {
    errorMessageString = errorMessage;
  }

  return (
    <div
      ref={ref}
      {...errorMessageProps}
      className={cn('text-red-500', className)}
    >
      {isInvalid && errorMessageString}
    </div>
  );
});
NumberFieldError.displayName = 'NumberFieldError';

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
  NumberFieldError,
};

export type {
  NumberFieldRef,
  NumberFieldProps,
  NumberFieldDecrementProps,
  NumberFieldGroupProps,
  NumberFieldIncrementProps,
  NumberFieldInputProps,
  NumberFieldLabelProps,
  NumberFieldErrorProps,
};

type ButtonProps = AriaButtonOptions<React.ElementType> & {
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLButtonElement | null>;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    let { buttonProps } = useButton(
      props,
      ref as React.RefObject<HTMLButtonElement | null>
    );

    return (
      <button {...buttonProps} ref={ref} className={className}>
        {props.children}
      </button>
    );
  }
);

Button.displayName = 'Button';
