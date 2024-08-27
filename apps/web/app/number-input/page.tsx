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
    <div>
      <NumberField
        // defaultValue={18}
        placeholder='*number input*'
        isWheelDisabled
        // label="btnPosition: inside"
        // labelPosition="top"
        // btnPosition="inside"
        onChange={(v) => {
          console.log('onChange');
        }}
        // name
        // step={8} //bug：defaultValue={18},显示16
        // isDisabled
        // locale="zh-CN"
        formatOptions={{
          // https://react-spectrum.adobe.com/react-aria/useNumberField.html#currency-values
          style: 'currency',
          currency: 'CNY',
        }}
        // decrementAriaLabel="减少 label"
        // isWheelDisabled
        // maxValue={10}
        // minValue={0}
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
