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
    <>
      <NumberField>
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
    </>
  );
}
