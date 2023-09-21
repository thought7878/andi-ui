import React, { FC, ReactNode, useContext, useEffect } from "react";
import { FormContext } from "./form";
import { CustomRule } from "./useStore";

// TODO 需要消化
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
	Omit<T, K>;

export interface ItemProps {
	/**element's name. For example: username/password */
	name?: string;
	// defaultValue?: string | boolean; //string/boolean
	/**label text */
	label?: string;
	/**The name of element's value. For example: value/checked */
	valueName?: string;
	/**The event name that changes value. For example: onChange */
	valueChangeEventName?: string;
	/**The event name when validate . For example: onBlur */
	validateEventName?: string;
	/**The function how to  get value from the Event object . */
	getValueFromEvent?: (event: any) => any;
	/**The rules how to verify the element. Please refer to [async-validator rules](https://github.com/yiminghe/async-validator)*/
	rules?: CustomRule[];
	/**children */
	children?: ReactNode;
}

export const Item: FC<ItemProps> = (props) => {
	const {
		name,
		label = "",
		children = "",
		valueName = "value",
		// defaultValue = valueName === "value" ? "" : false,
		valueChangeEventName = "onChange",
		validateEventName = "onBlur",
		rules = [],
		getValueFromEvent = (e) => {
			return e.target?.value;
		},
	} = props as SomeRequired<ItemProps, "getValueFromEvent" | "valueName">;
	//
	const { dispatch, fieldsState, initialValues, validateField } =
		useContext(FormContext);
	//
	let newChildren = children;
	let errors = null;
	let hasError = null;
	let value: any = "";
	let isRequired = false;
	// 如果是有效的表单元素，即有name，才获取store中的value/errors/required，才增加额外的valueChangeEventName等
	if (name) {
		// 获取自己的fieldState
		const fieldState = fieldsState[name];
		value = fieldState?.value || "";
		// error
		errors = fieldState?.errors;
		hasError = errors && errors.length > 0;
		//
		isRequired = rules?.some(
			(rule) => typeof rule !== "function" && rule.required
		);
		// Clone Element, Add additional attribute
		newChildren = addAdditionalProps();
	}

	//没有label的，右对齐
	let noLabelClass = "";
	if (!label) {
		noLabelClass = "flex-row-reverse";
	}

	// ======== mounted ========
	useEffect(() => {
		// ======== mounted ,update form store's FieldsState ========
		// 应该排除掉非数据的，如：Button
		if (name) {
			const defaultValue = initialValues && initialValues[name];
			dispatch({
				type: "addField",
				name,
				value: {
					label,
					name,
					value: defaultValue || "",
					rules,
					errors: [],
					isValid: true,
				},
			});
		}
		verifyChildren(children);
	}, []);

	// ======== Render ========
	return (
		<div className={`mb-5 flex  items-center ${noLabelClass}`}>
			{label && (
				<label
					htmlFor=""
					title={label}
					className="shrink-0 basis-[30%] pr-3 text-right"
				>
					{isRequired && (
						<span className="mr-1 align-middle text-danger">*</span>
					)}
					{label}
				</label>
			)}
			<div className="relative basis-[70%]">
				{newChildren}
				{hasError && (
					<div className="absolute bottom-[-1.25rem] left-0 min-w-[500px] text-sm text-danger">
						{errors && errors[0].message}
					</div>
				)}
			</div>
		</div>
	);

	// ======== Verify whether the child element is valid ========
	function verifyChildren(children: ReactNode) {
		// TODO: 应该允许多个children
		// 获取children数组的第一个元素
		const childList = React.Children.toArray(children);
		// 判断children类型，没有children/大于一个/不是有效的Element，警告
		if (childList.length === 0) {
			console.error("Item no children!");
		} else if (childList.length > 1) {
			console.error("Item's children can not be more than 1!");
		}
		if (!React.isValidElement(childList[0])) {
			console.error("Item's children is not valid Element!");
		}
	}
	// ======== Clone Element, Add additional attribute ========
	function addAdditionalProps() {
		// Add additional attribute，valueName:value/checked,valueChangeEventName:onChange,validateEventName:onBlur
		const controlledProps: Record<string, any> = {};
		controlledProps[valueName] = value;
		controlledProps[valueChangeEventName] = handleValueChange;
		controlledProps[validateEventName] = () => {
			validateField(name!);
		};
		// Clone Element，新element包含旧的所有属性和新的属性
		const childList = React.Children.toArray(children);
		const originChild = childList[0] as React.ReactElement;
		const newChildren = React.cloneElement(originChild, {
			...originChild.props,
			...controlledProps,
		});
		return newChildren;
	}
	// ======== value changed, update value in store ========
	function handleValueChange(e: any) {
		//value 改变了，更新store中自己的value
		const value = getValueFromEvent(e);
		dispatch({ type: "updateValue", name: name!, value });
	}
};

Item.defaultProps = {
	label: "",
	children: "",
	valueName: "value",
	// defaultValue = valueName === "value" ? "" : false,
	valueChangeEventName: "onChange",
	validateEventName: "onBlur",
	rules: [],
	getValueFromEvent: (e) => {
		return e.target?.value;
	},
};

export default Item;
