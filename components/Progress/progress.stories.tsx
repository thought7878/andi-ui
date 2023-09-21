import { ComponentMeta, ComponentStory } from "@storybook/react";
import Progress from "./";

const progressMeta: ComponentMeta<typeof Progress> = {
	title: "Progress",
	component: Progress,
};
export default progressMeta;

//
export const ProgressWithDefault: ComponentStory<typeof Progress> = (args) => {
	return (
		<div className="w-[500px] ">
			<Progress {...args} />
		</div>
	);
};
ProgressWithDefault.args = {
	progress: 80,
};
ProgressWithDefault.storyName = "default";

//
export const ProgressWithProgress: ComponentStory<typeof Progress> = (args) => {
	return (
		<div className="w-[500px] ">
			<Progress
				{...args}
				// outerClass="bg-yellow-500 h-[12px]"
				// innerClass="bg-Purple-500"
			/>
		</div>
	);
};
ProgressWithProgress.args = {
	progress: 20,
};
ProgressWithProgress.storyName = "progress";

//
export const ProgressWithShowNumber: ComponentStory<typeof Progress> = (
	args
) => {
	return (
		<div className="w-[500px] ">
			<Progress {...args} />
		</div>
	);
};
ProgressWithShowNumber.args = {
	progress: 80,
	showNumber: false,
};
ProgressWithShowNumber.storyName = "showNumber";

//
export const ProgressWithCustomInner: ComponentStory<typeof Progress> = (
	args
) => {
	return (
		<div className="w-[500px] ">
			<Progress
				{...args}
				// outerClass="bg-yellow-500 h-[12px]"
				innerClass="bg-purple-500"
			/>
		</div>
	);
};
ProgressWithCustomInner.args = {
	progress: 20,
};
ProgressWithCustomInner.storyName = "custom inner style";

//
export const ProgressWithCustomOuter: ComponentStory<typeof Progress> = (
	args
) => {
	return (
		<div className="w-[500px] ">
			<Progress {...args} outerClass="bg-blue-200 h-[12px]" />
		</div>
	);
};
ProgressWithCustomOuter.args = {
	progress: 20,
	showNumber: false,
};
ProgressWithCustomOuter.storyName = "custom outer style";
