import { CgSpinner } from "react-icons/cg";
import { FC } from "react";
import { FaSpinner } from "react-icons/fa";
import { Icon } from "../Icon";
import classNames from "classnames";

export interface SpinnerProps {
	/**Setting size */
	size?: "sm" | "md" | "lg" | "xl";
	/**Setting type */
	type?: "ring" | "dot";
	/**Setting color */
	color?: string;
	/**Custom size & color */
	style?: React.CSSProperties; //Can overwrite size and color,  style={ { verticalAlign: 'middle' } }
	/**Custom size & color */
	className?: string;
}

const Spinner: FC<SpinnerProps> = (props) => {
	const { size, type, className, ...otherProps } = props;

	//handle size
	let _size: string;

	if (size && size === "xl") {
		_size = `1.6rem`;
	} else if (size && size === "lg") {
		_size = `1.25rem`;
	} else if (size && size === "sm") {
		_size = `0.875rem`;
	} else if (size && size === "md") {
		_size = `1rem`;
	}
	//handle class
	const classes = classNames("animate-spin", className);

	// render icon by 'type'
	function renderIcon() {
		return (
			<Icon size={_size} className={classes} {...otherProps}>
				{type === "dot" ? <FaSpinner /> : <CgSpinner />}
			</Icon>
		);
	}

	return <>{renderIcon()}</>;
};

Spinner.defaultProps = {
	// size: "md",
	type: "ring",
};

export default Spinner;
