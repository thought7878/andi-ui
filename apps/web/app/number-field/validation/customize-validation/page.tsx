'use client';
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
  NumberFieldError,
} from '@andi-ui/number-field';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

export default function Page() {
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // console.log('number field state:', ref.current?.state);

  //   // 获取表单元素的值
  //   const formData = new FormData(event.currentTarget);

  //   const username = formData.get('username');
  //   const password = formData.get('password');
  //   const amount = formData.get('amount');

  //   console.log('username:', username);
  //   console.log('password:', password);
  //   console.log('amount:', amount);
  // };

  return (
    <div>
      <form className='flex gap-4 flex-col p-8'>
        <NumberField
          name='count'
          validate={(value) => {
            if (value < 0) {
              return 'value must be greater than 0';
            }
          }}
        >
          <NumberFieldLabel>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Count
            </span>
          </NumberFieldLabel>
          <NumberFieldGroup>
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
        <div className='flex gap-4 justify-around'>
          <button type='submit'>submit</button>
          <button type='reset'>reset</button>
        </div>
      </form>
    </div>
  );
}
