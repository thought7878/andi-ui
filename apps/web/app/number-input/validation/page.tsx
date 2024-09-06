'use client';
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
  NumberFieldRef,
  NumberFieldError,
} from '@andi-ui/number-input';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { create } from '@/app/actions/input';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log('number field state:', ref.current?.state);

    // 获取表单元素的值
    const formData = new FormData(event.currentTarget);

    const username = formData.get('username');
    const password = formData.get('password');
    const amount = formData.get('amount');

    console.log('username:', username);
    console.log('password:', password);
    console.log('amount:', amount);
  };

  const ref = useRef<NumberFieldRef>(null);

  const [value, setValue] = useState(0);
  const validateValue = (value: number) => {
    if (value < 0) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    // console.log('useEffect:', ref.current?.state);
    // console.log('numberValue:', ref.current?.numberValue);
    // console.log('realtimeValidation:', ref.current?.realtimeValidation);
    // console.log('displayValidation:', ref.current?.displayValidation);
  }, [value]);

  return (
    <div>
      <form
        // action={create}
        onSubmit={handleSubmit}
        className='flex gap-4 flex-col p-8'
      >
        <NumberField
          ref={ref}
          name='amount'
          // value={value}
          // onChange={setValue}
          validationBehavior='native'
          isRequired
          // validate={(value) => {
          //   if (value < 0) {
          //     return 'value must be greater than 0';
          //   }
          // }}
          // errorMessage='必填项'
          // errorMessage={(validationResult) => {
          //   if (validationResult.isInvalid) {
          //     return <p>error Message</p>;
          //   }
          // }}
        >
          <NumberFieldLabel className=''>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Count
            </span>
            {/* <span className='ml-1 align-middle'>*</span> */}
          </NumberFieldLabel>
          <NumberFieldGroup className=''>
            <NumberFieldIncrement>
              <ChevronUpIcon className='h-4 w-4' />
            </NumberFieldIncrement>
            <NumberFieldInput />
            <NumberFieldDecrement>
              <ChevronDownIcon className='h-4 w-4' />
            </NumberFieldDecrement>
          </NumberFieldGroup>
          <NumberFieldError />
        </NumberField>
        <input
          className='border border-gray-200'
          type='text'
          // required
          name='username'
          placeholder='username'
        />
        <input
          className='border border-gray-200'
          type='password'
          name='password'
          placeholder='password'
        />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}
