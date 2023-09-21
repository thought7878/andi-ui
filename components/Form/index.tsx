import Item, { ItemProps } from "./item";

import { FC } from "react";
import InternalForm from "./form";

export type InternalFormType = typeof InternalForm;

export type CompoundedFormType = InternalFormType & {
	Item: FC<ItemProps>;
};
/**
 * AutoComplete component
 *
 * ```js
 * // import like this
 * import { AutoComplete } from 'aui'
 * ```
 *
 */
export const Form = InternalForm as CompoundedFormType;
Form.Item = Item;

export default Form;
