import React, { FC } from "react";

export interface SpaceProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	/**Set the direction, horizontal or vertical */
	direction?: "vertical" | "horizontal";
	/**Set the horizontal and vertical spacing */
	size?: "large" | "middle" | "small" | number;
	/**Alignment of sub-components */
	align?: "start" | "end" | "center" | "baseline";
	/**Whether to change the line when it exceeds one screen. It is only useful in the horizontal direction */
	wrap?: boolean;
	/**The component of the segmentation line */
	split?: React.ReactNode;
}

const Space: FC<SpaceProps> = (props) => {
	const { children } = props;

	console.log(children);
	console.log("toArray", React.Children.toArray(children));

	return <div>{children}</div>;
};

Space.defaultProps = {
	direction: "horizontal",
	size: "middle",
	align: "start",
	wrap: true,
};

export default Space;
