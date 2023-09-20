import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BiDownload } from "react-icons/bi";
import Input from "./";

const inputMeta: ComponentMeta<typeof Input> = {
	title: "input",
	component: Input,
};
export default inputMeta;

//
const Template: ComponentStory<typeof Input> = (args) => {
	return (
		<div className="w-[300px]">
			<Input {...args} />
		</div>
	);
};

//
export const Default = Template.bind({});
Default.args = {};
Default.storyName = "default";

//
export const InputWithSize: ComponentStory<typeof Input> = (args) => {
	return (
		<div className="w-[300px]">
			<div className="mb-4">
				<Input inputSize="sm" {...args} />
			</div>

			<div className="mb-4">
				<Input {...args} />
			</div>

			<div className="mb-4">
				<Input inputSize="lg" {...args} />
			</div>
		</div>
	);
};
InputWithSize.storyName = "inputSize";

//
export const InputWithDisabled = Template.bind({});
InputWithDisabled.args = { disabled: true };
InputWithDisabled.storyName = "disabled";

//
export const InputWithIcon: ComponentStory<typeof Input> = (args) => {
	return (
		<div className="w-[300px]">
			<div className="mb-4">
				<Input placeholder="icon download" icon={<BiDownload size="18px" />} />
			</div>
		</div>
	);
};

InputWithIcon.storyName = "icon";

//
export const InputWithPrefix = Template.bind({});
InputWithPrefix.args = {
	placeholder: "gmail.com",

	prefix: "https://",
};

InputWithPrefix.storyName = "prefix";

//
export const InputWithSuffix = Template.bind({});
InputWithSuffix.args = {
	placeholder: "xxx@gmail.com",
	type: "email",
	suffix: "@gmail.com",
};

InputWithSuffix.storyName = "suffix";
//
export const InputWithCustom = Template.bind({});
InputWithCustom.args = {
	placeholder: "custom input",
	// readOnly: true,
	// style: { borderRadius: "2rem" },
	className:
		"px-8 py-6 rounded-[5rem] hover:enabled:border-green-500 focus:enabled:border-green-500 focus:enabled:shadow-green-500",
};

InputWithCustom.storyName = "custom input with className";
