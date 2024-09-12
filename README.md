# Anatomy of number-input

`number-input` is a composite component used to create a number input field with custom buttons (for increment and decrement), labels, and an input. It is built based on the `react-aria` and `react-stately` libraries and provides a highly customizable user experience and accessibility. This component set includes the following subcomponents:

```tsx
<NumberField name="..." value="..." onChange={...} className="...">
  <NumberFieldLabel>{/* label */}</NumberFieldLabel>
  <NumberFieldGroup>
    <NumberFieldIncrement>{/* increment icon */}</NumberFieldIncrement>
    <NumberFieldInput className="..." />
    <NumberFieldDecrement>{/* decrement icon */}</NumberFieldDecrement>
  </NumberFieldGroup>
  <NumberFieldError />
</NumberField>
```

![introduction](./apps/web/public/introduction.png)

# Install

## Shadcn

```bash
npx shadcn@latest add "https://v0.dev/chat/b/oTN3LY2"
```

## Manually

- Make sure that the relevant dependencies of `react-aria` and `react-stately` have been installed.

- Copy the code in `packages/number-input/src/number-input.tsx` to your project.

- Then import the required modules in your component file.

# Usage

## Basic

```tsx
<NumberField>
  <NumberFieldLabel>Amount</NumberFieldLabel>
  <NumberFieldGroup>
    <NumberFieldIncrement>
      {/* ChevronUpIcon from 'lucide-react' */}
      <ChevronUpIcon />
    </NumberFieldIncrement>
    <NumberFieldInput />
    <NumberFieldDecrement>
      {/* ChevronDownIcon from 'lucide-react' */}
      <ChevronDownIcon />
    </NumberFieldDecrement>
  </NumberFieldGroup>
</NumberField>
```

![default](./apps/web/public/default.png)

## Integrating with HTML form

```tsx
<form
  action={create}
  // onSubmit={handleSubmit}
  className='flex gap-4 flex-col p-8'
>
  <input
    className='border border-gray-200'
    type='text'
    name='username'
    placeholder='username'
  />
  <input
    className='border border-gray-200'
    type='password'
    name='password'
    placeholder='password'
  />

  <NumberField name='amount' isRequired>
    <NumberFieldLabel>Amount</NumberFieldLabel>
    <NumberFieldGroup>
      <NumberFieldIncrement>
        <ChevronUpIcon className='h-4 w-4' />
      </NumberFieldIncrement>
      <NumberFieldInput />
      <NumberFieldDecrement>
        <ChevronDownIcon className='h-4 w-4' />
      </NumberFieldDecrement>
    </NumberFieldGroup>
    <NumberFieldError />
  </NumberField>
  <button type='submit'>submit</button>
</form>
```

## Integrating with Shadcn or react-hook-form

```tsx
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
  amount: z.number().nonnegative(),
});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      amount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    // create(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <NumberField
                  onChange={onChange}
                  value={value}
                  className='gap-0'
                >
                  <NumberFieldGroup>
                    <NumberFieldDecrement>
                      <ChevronDownIcon className='h-4 w-4' />
                    </NumberFieldDecrement>
                    <NumberFieldInput />
                    <NumberFieldIncrement>
                      <ChevronUpIcon className='h-4 w-4' />
                    </NumberFieldIncrement>
                  </NumberFieldGroup>
                </NumberField>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
```

## Input

### Value

A NumberField's `value` is empty by default, but an initial, uncontrolled, value can be provided using the `defaultValue` prop. Alternatively, a controlled value can be provided using the `value` prop.

- `value`: The current value (controlled).
- `defaultValue`: The default value (uncontrolled).
- `minValue`: The smallest value allowed for the input.
- `maxValue`: The largest value allowed for the input.

```tsx
    let [value, setValue] = React.useState(15);

    <NumberField label='defaultValue' defaultValue={8}>
      <NumberFieldLabel>defaultValue</NumberFieldLabel>
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
      <NumberFieldLabel>value</NumberFieldLabel>
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
```

#### Minimum and Maximum and Step

- Minimum and maximum values

The `minValue` and `maxValue` props can be used to limit the entered value to a specific range. The value will be clamped when the user blurs the input field. In addition, the increment and decrement buttons will be disabled when the value is within one `step` value from the bounds. Ranges can be open ended by only providing either `minValue` or `maxValue` rather than both.

If a valid range is known ahead of time, it is a good idea to provide it to `NumberField` so it can optimize the experience. For example, when the minimum value is greater than or equal to zero, it is possible to use a numeric keyboard on iOS rather than a full text keyboard (necessary to enter a minus sign).

- Step values

The `step` prop can be used to snap the value to certain increments. If there is a `minValue` defined, the steps are calculated starting from the minimum. For example, if `minValue={2}`, and `step={3}`, the valid step values would be 2, 5, 8, 11, etc. If no `minValue` is defined, the steps are calculated starting from zero and extending in both directions. In other words, such that the values are evenly divisible by the step. If no `step` is defined, any decimal value may be typed, but incrementing and decrementing snaps the value to an integer.

If the user types a value that is between two steps and blurs the input, the value will be snapped to the nearest step. When incrementing or decrementing, the value is snapped to the nearest step that is higher or lower, respectively. When incrementing or decrementing from an empty field, the value starts at the `minValue` or `maxValue`, respectively, if defined. Otherwise, the value starts from `0`.

```tsx
<NumberField label='min-max' minValue={0} maxValue={10} step={3}>
  <NumberFieldLabel>min-max</NumberFieldLabel>
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
```

### Style

The `NumberFieldInput` style can be fully customized.

```tsx
<NumberField>
  <NumberFieldLabel>Amount</NumberFieldLabel>
  <NumberFieldGroup>
    <NumberFieldIncrement>
      <ChevronUpIcon />
    </NumberFieldIncrement>
    <NumberFieldInput className='border-blue-500 w-[500px] focus-visible:ring-blue-500' />
    <NumberFieldDecrement>
      <ChevronDownIcon />
    </NumberFieldDecrement>
  </NumberFieldGroup>
</NumberField>
```

![input](./apps/web/public/input.png)

### Behavior

NumberField accepts an `onChange` prop which is triggered whenever the value is committed by the user. This happens on blur of the field or on interaction with the stepper functionality, arrow keys or stepper buttons.

```tsx
let [value, setValue] = React.useState(0);

<NumberField label='Amount' onChange={setValue} minValue={0}>
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
</NumberField>;
```

### Number formatting

The NumberField value can be formatted by using the `formatOptions` prop. `formatOptions` is compatible with the option parameter of [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) and is applied based on the current locale. Currently only standard notation is supported, though scientific, engineering, and compact notation may be supported in the future.

NumberField supports three numeral systems; Latin, Arabic-Indic, and Han positional decimal. Regardless of the locale, these three can be parsed from typed input. Initial rendering will appear in the [default numeral system](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numberingSystem) for the locale unless explicitly overridden.

#### Decimals

The following example uses the `signDisplay` option to include the plus sign for positive numbers, for example to display an offset from some value. In addition, it always displays a minimum of 1 digit after the decimal point, and allows up to 2 fraction digits. If the user enters more than 2 fraction digits, the result will be rounded.

```tsx
<NumberField
  label='Decimals'
  defaultValue={0}
  formatOptions={{
    signDisplay: 'exceptZero',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }}
>
  <NumberFieldLabel>Decimals</NumberFieldLabel>
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
```

#### Percentages

The `style: 'percent'` option can be passed to the `formatOptions` prop to treat the value as a percentage. In this mode, the value is multiplied by 100 before it is displayed, i.e. `0.45` is displayed as `45%`. The reverse is also true: when the user enters a value, the `onChange` event will be triggered with the entered value divided by 100. When the percent option is enabled, the default step automatically changes to `0.01` such that incrementing and decrementing occurs by `1%`. This can be overridden with the `step` prop.

```tsx
<NumberField
  label='Percentages'
  formatOptions={{ style: 'percent' }}
  minValue={0}
  defaultValue={0.05}
>
  <NumberFieldLabel>Percentages</NumberFieldLabel>
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
```

#### Currency values

The `style: 'currency'` option can be passed to the `formatOptions` prop to treat the value as a currency value. The `currency` option must also be passed to set the currency code (e.g. `USD`) to use. In addition, the `currencyDisplay` option can be used to choose whether to display the currency symbol, currency code, or currency name. Finally, the `currencySign` option can be set to `accounting` to use accounting notation for negative numbers, which uses parentheses rather than a minus sign in some locales.

If you need to allow the user to change the currency, you should include a separate dropdown next to the NumberField. The NumberField itself will not determine the currency from the user input.

```tsx
<NumberField
  label='Currency'
  defaultValue={45}
  formatOptions={{
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
    currencySign: 'accounting',
  }}
>
  <NumberFieldLabel>Currency</NumberFieldLabel>
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
```

#### Units

The `style: 'unit'` option can be passed to the `formatOptions` prop to format the value with a unit of measurement. The `unit` option must also be passed to set which unit to use (e.g. `inch`). In addition, the `unitDisplay` option can be used to choose whether to display the unit in long, short, or narrow format.

If you need to allow the user to change the unit, you should include a separate dropdown next to the number field. The number field itself will not determine the unit from the user input.

**Note:** The `unit` style is not currently supported in Safari. A [polyfill](https://formatjs.io/docs/polyfills/intl-numberformat/) may be necessary.

```tsx
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
  <NumberFieldLabel>Units</NumberFieldLabel>
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
```

### Disabled and read only

The `isDisabled` and `isReadOnly` props can be used prevent the user from editing the value of the number field. The difference is that `isReadOnly` still allows the input to be focused, while `isDisabled` prevents all user interaction.

```tsx
<>
  <NumberField label='Disabled' isDisabled value={25}>
    <NumberFieldLabel>Disabled</NumberFieldLabel>
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
    <NumberFieldLabel>Read only</NumberFieldLabel>
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
</>
```

## Label

For better accessibility, a label should be added to `NumberField`

### Style & Position

The `NumberFieldLabel` style can be fully customized

```tsx
<NumberField label='Amount'>
  <NumberFieldLabel className='text-blue-500 text-lg'>Amount</NumberFieldLabel>
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
```

![label](./apps/web/public/label.png)

## Buttons

### Style

You can fully customize the button style and its children.

```tsx
<NumberField>
  <NumberFieldLabel>Amount</NumberFieldLabel>
  <NumberFieldGroup>
    {/* customize the increment button's style */}
    <NumberFieldIncrement className='bg-blue-500'>
      {/* customize the increment button's icon */}
      <ChevronUpIcon />
    </NumberFieldIncrement>
    <NumberFieldInput />
    {/* customize the decrement button's style */}
    <NumberFieldDecrement className='bg-blue-500'>
      {/* customize the decrement button's icon */}
      <ChevronDownIcon />
    </NumberFieldDecrement>
  </NumberFieldGroup>
</NumberField>
```

![button](./apps/web/public/button.png)

### Position

`btnPosition` has two values, one is `inside`, which is the default value, and the other is `outside`

```tsx
<NumberField btnPosition='outside'>
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
```

![button](./apps/web/public/button_position.png)

## Validation

### isRequired

```tsx
<form className='flex gap-4 flex-col p-8'>
  <NumberField name='amount' isRequired>
    <NumberFieldLabel>
      <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
        Amount
      </span>
    </NumberFieldLabel>
    <NumberFieldGroup>
      <NumberFieldIncrement>
        <ChevronUpIcon className='h-4 w-4' />
      </NumberFieldIncrement>
      <NumberFieldInput />
      <NumberFieldDecrement>
        <ChevronDownIcon className='h-4 w-4' />
      </NumberFieldDecrement>
    </NumberFieldGroup>
    <NumberFieldError />
  </NumberField>

  <div className='flex gap-4 justify-around'>
    <button type='submit'>submit</button>
    <button type='reset'>reset</button>
  </div>
</form>
```

### Customizing error messages

By default, displays the error message provided by the browser, which is localized in the user's preferred language. You can customize these messages by providing a function to the `errorMessage` prop. This receives a list of error strings along with a [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) object describing why the field is invalid, and should return an error message to display.

```tsx
<form className='flex gap-4 flex-col p-8'>
  <NumberField
    name='amount'
    isRequired
    // errorMessage='This is required'
    errorMessage={(validationResult) => {
      if (validationResult.validationDetails.valueMissing) {
        return <p>This is required</p>;
      }
    }}
  >
    <NumberFieldLabel className=''>
      <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
        Amount
      </span>
    </NumberFieldLabel>
    <NumberFieldGroup className=''>
      <NumberFieldIncrement>
        <ChevronUpIcon className='h-4 w-4' />
      </NumberFieldIncrement>
      <NumberFieldInput />
      <NumberFieldDecrement>
        <ChevronDownIcon className='h-4 w-4' />
      </NumberFieldDecrement>
    </NumberFieldGroup>
    <NumberFieldError />
  </NumberField>

  <div className='flex gap-4 justify-around'>
    <button type='submit'>submit</button>
    <button type='reset'>reset</button>
  </div>
</form>
```

![Customizing error messages](./apps/web/public/customizing_error_message.png)

### Custom validation

Custom validation is supported by providing a function to the `validate` prop. This function receives the current field value, and can return a string or array of strings representing one or more error messages. These are displayed to the user after the value is committed (e.g. on blur) to avoid distracting them on each keystroke.

```tsx
<form className='flex gap-4 flex-col p-8'>
  <NumberField
    name='amount'
    validate={(value) => {
      if (value < 0) {
        return 'value must be greater than 0';
      }
    }}
  >
    <NumberFieldLabel>
      <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
        Amount
      </span>
    </NumberFieldLabel>
    <NumberFieldGroup>
      <NumberFieldIncrement>
        <ChevronUpIcon className='h-4 w-4' />
      </NumberFieldIncrement>
      <NumberFieldInput />
      <NumberFieldDecrement>
        <ChevronDownIcon className='h-4 w-4' />
      </NumberFieldDecrement>
    </NumberFieldGroup>
    <NumberFieldError />
  </NumberField>

  <div className='flex gap-4 justify-around'>
    <button type='submit'>submit</button>
    <button type='reset'>reset</button>
  </div>
</form>
```

![customizing validation](./apps/web/public/customizing_validation.png)

### Realtime validation

### Server validation

# Props Reference
