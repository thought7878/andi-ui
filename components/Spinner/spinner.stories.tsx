import { ComponentMeta, ComponentStory } from "@storybook/react";

import React from "react";
import { Spinner } from ".";

const spinnerMeta: ComponentMeta<typeof Spinner> = {
	title: "Components/Spinner",
	component: Spinner,
};
export default spinnerMeta;

//
export const SpinnerWithDefault: ComponentStory<typeof Spinner> = (args) => {
	return (
		<div className="w-[500px] ">
			<Spinner {...args} />
		</div>
	);
};
SpinnerWithDefault.storyName = "default";

//
export const SpinnerWithSize: ComponentStory<typeof Spinner> = (args) => {
	return (
		<div className="text flex w-[80px] items-center justify-between">
			<Spinner {...args} size="sm" />
			<Spinner {...args} size="md" />
			<Spinner {...args} size="lg" />
			<Spinner {...args} size="xl" />
		</div>
	);
};
SpinnerWithSize.storyName = "size";

//
export const SpinnerWithType: ComponentStory<typeof Spinner> = (args) => {
	return (
		<div className="flex w-[80px] justify-between ">
			<Spinner {...args} type="ring" />
			<Spinner {...args} type="dot" />
		</div>
	);
};
SpinnerWithType.storyName = "type";

//
export const SpinnerWithColor: ComponentStory<typeof Spinner> = (args) => {
	return (
		<div className="flex w-[80px] justify-between ">
			<Spinner {...args} />
			<Spinner {...args} color="#ec4899" />
			<Spinner {...args} color="#a855f7" />
		</div>
	);
};
SpinnerWithColor.storyName = "color";

//
export const SpinnerWithCustomClass: ComponentStory<typeof Spinner> = (
	args
) => {
	return (
		<div className="flex w-[80px] items-center justify-between ">
			<Spinner {...args} className="text-[#a855f7]" />
			<Spinner {...args} className="text-[1.4rem] text-[#0ea5e9]" />
			<Spinner {...args} className="text-[30px] text-[#f97316]" />
		</div>
	);
};
SpinnerWithCustomClass.storyName = "custom color & size with className";

//
export const SpinnerWithCustom: ComponentStory<typeof Spinner> = (args) => {
	return (
		<div className="flex w-[80px] items-center justify-between ">
			<Spinner {...args} style={{ color: "#a855f7" }} />
			<Spinner {...args} style={{ color: "#0ea5e9", fontSize: "1.4rem" }} />
			<Spinner {...args} style={{ color: "#f97316", fontSize: "30px" }} />
		</div>
	);
};
SpinnerWithCustom.storyName = "custom color & size with style";
