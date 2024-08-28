'use client';

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from '@andi-ui/number-input';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

export default function Page() {
  return (
    <div className='pt-10 flex justify-center items-center h-screen'>
      <NumberField
        onChange={(value) => console.log(value)}
        // onBlur={(event) => console.log(event)}
      >
        <NumberFieldLabel>Amount: </NumberFieldLabel>
        <NumberFieldGroup>
          <NumberFieldIncrement>
            <ChevronUpIcon />
          </NumberFieldIncrement>
          <NumberFieldInput className='border-blue-500 w-[500px] focus-visible:ring-blue-500' />
          <NumberFieldDecrement>
            <ChevronDownIcon />
          </NumberFieldDecrement>
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
