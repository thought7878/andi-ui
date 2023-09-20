import classNames from "classnames";
import React from "react";
// import "./index.css";

type InputSize = "lg" | "sm";

export interface InputProps
	extends Omit<Partial<React.InputHTMLAttributes<HTMLElement>>, "prefix"> {
	/**Set input size */
	inputSize?: InputSize;
	/**Set disabled */
	disabled?: boolean;
	/**Set an icon,  the right side  */
	icon?: React.ReactElement;
	/**Set prefix before input */
	prefix?: React.ReactNode;
	/**Set suffix after input */
	suffix?: React.ReactNode;
}

/**
 * Input component, support all basic attributes of HTML input
 *
 * ```js
 * // import like this
 * import { Input } from 'aui'
 * ```
 *
 */
export const Input: React.FC<InputProps> = (props) => {
	const {
		disabled,
		inputSize,
		icon,
		prefix,
		suffix,
		style,
		className,
		...otherProps
	} = props;
	//style
	const classes = classNames("aui-input-wrapper", {
		// className: className,
		[`input-size-${inputSize}`]: inputSize,
		// "is-disabled": disabled,
		"input-group": prefix || suffix,
		"input-group-suffix": !!suffix,
		"input-group-prefix": !!prefix,
	});

	return (
		<div className={`relative inline-flex  w-full ${classes}`}>
			{prefix && (
				<div className="input-prefix-wrapper mb-0 inline-flex items-center whitespace-nowrap rounded-md border border-solid border-auiLight-divider bg-auiLight-divider px-3 py-1.5 text-center text-base font-normal text-auiLight-primary">
					{prefix}
				</div>
			)}
			{icon && (
				<div className="icon-wrapper  absolute right-0 top-0 flex h-full w-[35px] items-center justify-center text-auiLight-secondary">
					{icon}
				</div>
			)}
			<input
				className={`aui-input ${className}`}
				style={style}
				disabled={disabled}
				{...otherProps}
			/>
			{suffix && (
				<div className="input-suffix-wrapper mb-0 inline-flex items-center whitespace-nowrap rounded-md border border-solid border-auiLight-divider bg-auiLight-divider px-3 py-1.5 text-center text-base font-normal text-auiLight-primary">
					{suffix}
				</div>
			)}
		</div>
	);
};

Input.defaultProps = {
	disabled: false,
};

export default Input;
