import "./style/button.css";

import { ButtonProps } from "./button.types";
import React from "react";
import { andiuiBtn } from "./style";

const Button: React.FC<ButtonProps> = ({
	size,
	primary,
	disabled,
	text,
	onClick,
	...props
}) => {
	return (
		<button
			css={andiuiBtn}
			type="button"
			onClick={onClick}
			// primary={primary}
			disabled={disabled}
			// size={size}
			{...props}
		>
			{text}
		</button>
	);
};

export default Button;
