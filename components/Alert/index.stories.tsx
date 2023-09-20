import { ComponentMeta, ComponentStory } from "@storybook/react";

import Alert from "./";
import React from "react";

const alertMeta: ComponentMeta<typeof Alert> = {
	title: "Components/Alert",
	component: Alert,
	tags: ["autodocs"],
};
export default alertMeta;

//
const Template: ComponentStory<typeof Alert> = (args) => {
	return (
		<div className="m-10 w-80">
			<Alert {...args}></Alert>
		</div>
	);
};

//
export const Default = Template.bind({});
Default.args = {
	children: "default alert",
};
Default.storyName = "default";

//
export const AlertWithType: ComponentStory<typeof Alert> = (args) => {
	return (
		<div className="m-10 w-80">
			<div className="mb-5">
				<Alert type="primary" {...args}>
					primary alert
				</Alert>
			</div>
			<div className="mb-5">
				<Alert type="success" {...args}>
					success alert
				</Alert>
			</div>
			<div className="mb-5">
				<Alert type="danger" {...args}>
					danger alert
				</Alert>
			</div>
			<div className="mb-5">
				<Alert type="warning" {...args}>
					warning alert
				</Alert>
			</div>
		</div>
	);
};
AlertWithType.storyName = "type";

//
export const AlertWithPosition: ComponentStory<typeof Alert> = (args) => {
	return (
		<>
			<h2 className="text-xl text-red-500">
				The components are displayed in the viewport position
			</h2>
			<div className="m-10 w-80">
				<Alert position="left-top" {...args}>
					left-top of viewport
				</Alert>
				<Alert position="left-bottom" {...args}>
					left-bottom of viewport
				</Alert>
				<Alert position="right-top" {...args}>
					right-top of viewport
				</Alert>
				<Alert position="right-bottom" {...args}>
					right-bottom of viewport
				</Alert>
			</div>
		</>
	);
};
AlertWithPosition.storyName = "position";

//
export const AlertWithCloseBtn: ComponentStory<typeof Alert> = (args) => {
	return (
		<div className="m-10 w-80">
			<div className="mb-5">
				<Alert {...args}>default has close button</Alert>
			</div>
			<div className="mb-5">
				<Alert closeBtn={false} {...args}>
					no close button
				</Alert>
			</div>
		</div>
	);
};
AlertWithCloseBtn.storyName = "closeBtn";

//
export const AlertWithAutoClose: ComponentStory<typeof Alert> = (args) => {
	return (
		<div className="m-10 w-80">
			<div className="mb-5">
				<Alert autoClose {...args}>
					3000 ms
				</Alert>
			</div>
			<div className="mb-5">
				<Alert autoClose duration={5000} {...args}>
					5000 ms
				</Alert>
			</div>
			<div className="mb-5">
				<Alert autoClose duration={8000} {...args}>
					8000 ms
				</Alert>
			</div>
		</div>
	);
};
AlertWithAutoClose.storyName = "autoClose";

//
export const AlertWithCustomClassName: ComponentStory<typeof Alert> = (
	args
) => {
	return (
		<div className="m-10 w-[600px]">
			<Alert className="bg-purple-500 py-6 px-8" {...args}>
				custom backgroundColor & padding with className
			</Alert>
		</div>
	);
};
AlertWithCustomClassName.storyName = "custom style with className";

//
export const AlertWithCustomStyle: ComponentStory<typeof Alert> = (args) => {
	return (
		<div className="m-10 w-[600px]">
			<Alert
				style={{ backgroundColor: "#a855f7", padding: "1.5rem 2rem" }}
				{...args}
			>
				custom backgroundColor & padding with style
			</Alert>
		</div>
	);
};
AlertWithCustomStyle.storyName = "custom style with style";
