'use client';

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from '@andi-ui/number-field';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import React from 'react';

export default function Page() {
  let [value, setValue] = React.useState(0);

  return (
    <div className='pt-10 flex flex-col pl-10 gap-8 h-screen'>
      <NumberField label='Amount' onChange={setValue} minValue={0}>
        <NumberFieldLabel>Amount: </NumberFieldLabel>
        <NumberFieldGroup>
          <NumberFieldIncrement>
            <ChevronUpIcon />
          </NumberFieldIncrement>
          <NumberFieldInput />
          <NumberFieldDecrement>
            <ChevronDownIcon />
          </NumberFieldDecrement>
        </NumberFieldGroup>
      </NumberField>
      <pre>How many cookies you are ordering: {isNaN(value) ? 0 : value}</pre>
    </div>
  );
}
