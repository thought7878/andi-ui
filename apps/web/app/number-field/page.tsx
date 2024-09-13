import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from '@andi-ui/number-field';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

export default function Page() {
  return (
    <div>
      <NumberField
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
      >
        <NumberFieldLabel className='text-blue-500'>Count: </NumberFieldLabel>
        <NumberFieldGroup className=''>
          <NumberFieldIncrement>
            <ChevronUpIcon className='h-4 w-4' />
          </NumberFieldIncrement>
          {/* <NumberFieldIncrement className="absolute right-0 top-0 rounded-b-none p-[2.5px] hover:opacity-60" /> */}
          <NumberFieldInput />
          <NumberFieldDecrement>
            <ChevronDownIcon className='h-4 w-4' />
          </NumberFieldDecrement>
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
