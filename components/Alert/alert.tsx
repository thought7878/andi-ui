import "./index.css";

import { FC, ReactNode, useEffect, useState } from "react";

import { CSSTransition } from "react-transition-group";
import { Icon } from "../Icon";
import { IoClose } from "react-icons/io5";
import classNames from "classnames";

export interface AlertProps extends React.HTMLAttributes<HTMLElement> {
	/**4 types */
	type?: "primary" | "success" | "warning" | "danger";
	/**Setting position */
	position?: "right-top" | "right-bottom" | "left-top" | "left-bottom";
	/**Whether to display the closed button */
	closeBtn?: boolean;
	/**Whether to automatically close */
	autoClose?: boolean;
	/**The duration of automatic close, the unit is millisecond */
	duration?: number; //ms
	/**Custom style with className */
	className?: string; //comstomise style
	/**Custom style with style */
	style?: React.CSSProperties;
	children?: ReactNode;
}

/**
 * Alert component
 *
 * ```js
 * // import like this
 * import { Alert } from 'aui'
 * ```
 *
 */
export const Alert: FC<AlertProps> = (props) => {
	const {
		type,
		children,
		closeBtn,
		autoClose,
		position,
		duration,
		className,
		style,
		...rest
	} = props;
	const [remove, setRemove] = useState(false);

	//
	useEffect(() => {
		if (autoClose) {
			let timer = setTimeout(() => {
				setRemove(true);
			}, duration);

			return () => {
				clearTimeout(timer);
			};
		}
	}, []);

	// 不同情况，不同样式
	const classes = classNames("alert", type, className, {
		[position + ""]: position,
	});

	//
	function handleClose() {
		setRemove(true);
	}

	return (
		<CSSTransition
			in={!remove}
			timeout={300}
			classNames="aui-show-hide"
			unmountOnExit
		>
			<div className={classes} style={style} data-testid="alert" {...rest}>
				{children}
				{closeBtn && (
					<div
						onClick={handleClose}
						className="ml-12 inline-flex cursor-pointer"
						data-testid="close-btn"
					>
						<Icon icon={<IoClose />} />
					</div>
				)}
			</div>
		</CSSTransition>
	);
};

Alert.defaultProps = {
	type: "primary",
	closeBtn: true,
	autoClose: false,
	duration: 3000,
};

export default Alert;
