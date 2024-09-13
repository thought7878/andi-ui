import Link from 'next/link';
// import { add } from '@andi-ui/number-field/add';
// import { subtract } from '@andi-ui/number-field/subtract';

export default function Home() {
  return (
    <main className='flex flex-col gap-4 p-8'>
      <Link href={'/number-field/default'}>default</Link>
      <Link href={'/number-field/input'}>input</Link>
      <Link href={'/number-field/input/value'}>input value</Link>
      <Link href={'/number-field/input/min-max'}>min max</Link>
      <Link href={'/number-field/input/disabled-readonly'}>
        disabled-readonly
      </Link>
      <Link href={'/number-field/input/behavior'}>behavior / event</Link>
      <div>
        <div>Formatting:</div>
        <div className='flex gap-4'>
          <Link href={'/number-field/input/formatting/currency'}>currency</Link>
          <Link href={'/number-field/input/formatting/decimal'}>decimal</Link>
          <Link href={'/number-field/input/formatting/percentage'}>
            percentage
          </Link>
          <Link href={'/number-field/input/formatting/unit'}>unit</Link>
        </div>
      </div>
      <div>
        <div>Form:</div>
        <div className='flex gap-4'>
          <Link href={'/number-field/form'}>HTML form</Link>
        </div>
      </div>

      <Link href={'/number-field/button'}>button</Link>
    </main>
  );
}
