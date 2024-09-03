import Link from 'next/link';
// import { add } from '@andi-ui/number-input/add';
// import { subtract } from '@andi-ui/number-input/subtract';

export default function Home() {
  return (
    <main className='flex flex-col gap-4 p-8'>
      <Link href={'/number-input/default'}>default</Link>
      <Link href={'/number-input/input'}>input</Link>
      <Link href={'/number-input/input/value'}>input value</Link>
      <Link href={'/number-input/input/min-max'}>min max</Link>
      <Link href={'/number-input/input/disabled-readonly'}>
        disabled-readonly
      </Link>
      <Link href={'/number-input/input/behavior'}>behavior / event</Link>
      <div>
        <div>Formatting:</div>
        <div className='flex gap-4'>
          <Link href={'/number-input/input/formatting/currency'}>currency</Link>
          <Link href={'/number-input/input/formatting/decimal'}>decimal</Link>
          <Link href={'/number-input/input/formatting/percentage'}>
            percentage
          </Link>
          <Link href={'/number-input/input/formatting/unit'}>unit</Link>
        </div>
      </div>
      <div>
        <div>Form:</div>
        <div className='flex gap-4'>
          <Link href={'/number-input/form'}>HTML form</Link>
        </div>
      </div>

      <Link href={'/number-input/button'}>button</Link>
    </main>
  );
}
