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
  let [value, setValue] = React.useState(0);

  return (
    <div className='pt-10 flex flex-col pl-10 gap-8 h-screen'>
      <NumberField
        className='div-className'
        // autoFocus
        // placeholder='placeholder'
        // description='Description'
        // isDisabled
        // isRequired
        // isInvalid
        // value={25}
        // onFocus={() => console.log('onFocus')}
        // onBlur={() => console.log('onBlur')}
        // onFocusChange={() => console.log('onFocusChange')}
        // onKeyDown={() => console.log('onKeyDown')}
        // onKeyUp={() => console.log('onKeyUp')}
        // onCopy={() => console.log('onCopy')}
        // onCut={() => console.log('onCut')}
        // onPaste={() => console.log('onPaste')}
        // onCompositionStart={() => console.log('onCompositionStart')}
        // onCompositionEnd={() => console.log('onCompositionEnd')}
        // onCompositionUpdate={() => console.log('onCompositionUpdate')}
        // onSelect={() => console.log('onSelect')}
        // onBeforeInput={() => console.log('onBeforeInput')}
        // onInput={() => console.log('onInput')}
        // aria-label='label888'
        // label='label666'
        // aria-labelledby='labelledby888'
        // aria-describedby='describedby888'
        // aria-details='details888'
        // id='id888'
        // decrementAriaLabel='decrementAriaLabel'
        // incrementAriaLabel='incrementAriaLabel'
      >
        <NumberFieldLabel>Disabled: </NumberFieldLabel>
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

      <NumberField label='Read only' isReadOnly value={28}>
        <NumberFieldLabel>Read only: </NumberFieldLabel>
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
