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
      <NumberField btnPosition='outside' labelPosition='top'>
        <NumberFieldLabel>Amount</NumberFieldLabel>
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
