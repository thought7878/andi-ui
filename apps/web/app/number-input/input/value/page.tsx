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
import React from 'react';

export default function Page() {
  let [value, setValue] = React.useState(15);

  return (
    <div className='pt-10 flex flex-col pl-10 gap-8 h-screen'>
      <NumberField label='defaultValue' defaultValue={8}>
        <NumberFieldLabel>defaultValue: </NumberFieldLabel>
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

      <NumberField label='value' value={value} onChange={setValue}>
        <NumberFieldLabel>value: </NumberFieldLabel>
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
    </div>
  );
}
