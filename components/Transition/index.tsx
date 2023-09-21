import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationType =
	| "zoom-in-top"
	| "zoom-in-left"
	| "zoom-in-bottom"
	| "zoom-in-right";
type TransitionProps = CSSTransitionProps & { animation?: AnimationType };

// TODO: react_devtools_backend.js:2655 Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
const Transition: React.FC<TransitionProps> = (props) => {
	const { classNames, children, animation, ...otherProps } = props;
	return (
		<CSSTransition
			timeout={300}
			classNames={classNames ? classNames : animation}
			unmountOnExit
			// appear
			{...otherProps}
		>
			{children}
		</CSSTransition>
	);
};

Transition.defaultProps = {
	unmountOnExit: true,
};

export default Transition;
