import Schema, { RuleItem, ValidateError } from "async-validator";
import { each, mapValues } from "lodash-es";
import { useReducer, useState } from "react";

//////////////// types ////////////////
export type CustomRuleFunc = (obj: {
	[getFieldValue: string]: (name: string) => string;
}) => RuleItem; //{ getFieldValue }
//
export type CustomRule = RuleItem | CustomRuleFunc;

//
export interface FieldState {
	name: string; //input/radio name
	value: string;
	rules: CustomRule[];
	isValid: boolean;
	errors: ValidateError[];
}
export interface FieldsState {
	[key: string]: FieldState;
}
export interface FormState {
	isValid: boolean;
	isSubmitting: boolean;
	errors: Record<string, ValidateError[]>;
}
export interface FieldsAction {
	type: "addField" | "updateValue" | "updateValidateInfo";
	name: string; //FieldState name
	value: any; //FieldState value
}
//
export interface ValidateErrorType extends Error {
	errors: ValidateError[];
	fields: Record<string, ValidateError[]>;
}

//////////////// reducer ////////////////
function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
	switch (action.type) {
		case "addField":
			return { ...state, [action.name]: { ...action.value } };
		case "updateValue":
			return {
				...state,
				[action.name]: { ...state[action.name], value: action.value },
			};
		case "updateValidateInfo":
			const { isValid, errors } = action.value;
			return {
				...state,
				[action.name]: { ...state[action.name], isValid, errors },
			};
		default:
			return state;
	}
}

//////////////// store ////////////////
export default function useStore(
	initialValues: Record<string, any> | undefined
) {
	//
	const [formState, setFormState] = useState<FormState>({
		isValid: true,
		isSubmitting: false,
		errors: {},
	});
	const [fieldsState, dispatch] = useReducer(fieldsReducer, {});

	//暴露的API
	const getFieldValue = (name: string) => {
		return fieldsState[name]?.value;
	};
	const getFieldsValue = () => {
		return mapValues(fieldsState, (fieldState) => fieldState.value);
	};
	const setFieldValue = (name: string, value: any) => {
		if (fieldsState[name]) {
			dispatch({ type: "updateValue", name, value });
		}
	};
	const resetFields = () => {
		if (initialValues) {
			each(initialValues, (value, name) => {
				if (fieldsState[name]) {
					dispatch({ type: "updateValue", name, value });
				}
			});
		} else {
			each(fieldsState, (value, name) => {
				dispatch({ type: "updateValue", name, value: "" });
			});
		}
	};

	//调用自定义的规则函数，生成RuleItem[]
	const transformRules = (rules: CustomRule[]) => {
		return rules?.map((rule) => {
			if (typeof rule === "function") {
				return rule({ getFieldValue });
			}
			return rule;
		});
	};

	//
	const validateField = async (name: string) => {
		const { value, rules } = fieldsState[name];
		const transformedRules = transformRules(rules);
		//
		const descriptor = {
			[name]: transformedRules,
		};
		const valueMap = {
			[name]: value,
		};
		const validator = new Schema(descriptor);
		let isValid = true;
		let errors: ValidateError[] = [];
		//
		try {
			await validator.validate(valueMap);
		} catch (e) {
			const err = e as any;
			isValid = false;
			errors = err.errors;
		} finally {
			dispatch({
				type: "updateValidateInfo",
				name,
				value: { isValid, errors },
			});
		}
	};

	//
	const validateAllFields = async () => {
		let isValid = true;
		let errors: Record<string, ValidateError[]> = {};
		const valueMap = mapValues(fieldsState, (item) => item.value); //{'username':'andy','password':'123'}
		const descriptor = mapValues(fieldsState, (item) =>
			transformRules(item.rules)
		);
		const validator = new Schema(descriptor);
		setFormState({ ...formState, isSubmitting: true });
		try {
			await validator.validate(valueMap);
		} catch (e) {
			isValid = false;
			const err = e as ValidateErrorType;
			errors = err.fields; //{username:['rquired']}
			//
			each(fieldsState, (fieldState, name) => {
				// 如果errors中有field name的错误，更新store，显示错误
				if (errors[name]) {
					dispatch({
						type: "updateValidateInfo",
						name,
						value: { isValid, errors: errors[name] },
					});
				} else if (fieldState.rules.length > 0 && !errors[name]) {
					//有对应的rules，没有errors // TODO:  solve ？
					dispatch({
						type: "updateValidateInfo",
						name,
						value: { isValid: true, errors: [] },
					});
				}
			});
		} finally {
			setFormState((state) => {
				return { ...state, isSubmitting: false, isValid, errors };
			});
			return {
				isValid,
				errors,
				values: valueMap,
			};
		}
	};

	return {
		formState,
		setFormState,
		fieldsState,
		dispatch,
		validateField,
		validateAllFields,
		getFieldValue,
		setFieldValue,
		getFieldsValue,
		resetFields,
	};
}
