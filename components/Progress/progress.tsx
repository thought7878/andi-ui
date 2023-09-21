import { FC } from "react";

export interface ProgressProps {
	/**progress number,0~100 */
	progress: number;
	/**should show number */
	showNumber?: boolean;
	/**Set the style of the inner container */
	innerClass?: string;
	/**Set the style of outer container */
	outerClass?: string;
}

/**
 * Progress component
 *
 * ```js
 * // import like this
 * import { Progress } from 'aui'
 * ```
 *
 */
export const Progress: FC<ProgressProps> = (props) => {
	const { outerClass, innerClass, showNumber, progress = 0 } = props;

	return (
		<div className={`progress-outer ${outerClass}`}>
			<div
				style={{ width: `${progress}%` }}
				className={`progress-inner ${innerClass}`}
			>
				{showNumber && `${progress}%`}
			</div>
		</div>
	);
};
Progress.defaultProps = {
	progress: 0,
	showNumber: true,
};

export default Progress;
