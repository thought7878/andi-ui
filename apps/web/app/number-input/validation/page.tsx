'use client';
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from '@andi-ui/number-input';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { create } from '@/app/actions/input';

export default function Page() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 获取表单元素的值
    const formData = new FormData(event.currentTarget);

    const username = formData.get('username');
    const password = formData.get('password');
    const amount = formData.get('amount');

    console.log('username:', username);
    console.log('password:', password);
    console.log('amount:', amount);
  };

  return (
    <div>
      <form
        // action={create}
        onSubmit={handleSubmit}
        className='flex gap-4 flex-col p-8'
      >
        <input
          className='border border-gray-200'
          type='text'
          name='username'
          placeholder='username'
        />
        <input
          className='border border-gray-200'
          type='password'
          name='password'
          placeholder='password'
        />

        <NumberField
          isInvalid={true}
          name='amount'
          errorMessage={<p>error Message</p>}
        >
          <NumberFieldLabel className='text-blue-500'>Count: </NumberFieldLabel>
          <NumberFieldGroup className=''>
            <NumberFieldIncrement>
              <ChevronUpIcon className='h-4 w-4' />
            </NumberFieldIncrement>
            <NumberFieldInput />
            <NumberFieldDecrement>
              <ChevronDownIcon className='h-4 w-4' />
            </NumberFieldDecrement>
          </NumberFieldGroup>
        </NumberField>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}
