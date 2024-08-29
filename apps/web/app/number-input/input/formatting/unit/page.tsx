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
  return (
    <div className='pt-10 flex flex-col pl-10 gap-8 h-screen'>
      <NumberField
        label='Units'
        defaultValue={4}
        minValue={0}
        formatOptions={{
          style: 'unit',
          unit: 'inch',
          unitDisplay: 'long',
        }}
      >
        <NumberFieldLabel>Units: </NumberFieldLabel>
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
