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
      <NumberField>
        <NumberFieldLabel>Count: </NumberFieldLabel>
        <NumberFieldGroup>
          <NumberFieldIncrement>
            {/* ChevronUpIcon from 'lucide-react' */}
            <ChevronUpIcon className='h-4 w-4' />
          </NumberFieldIncrement>
          <NumberFieldInput />
          <NumberFieldDecrement>
            {/* ChevronDownIcon from 'lucide-react' */}
            <ChevronDownIcon className='h-4 w-4' />
          </NumberFieldDecrement>
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
