import { ComponentMeta, ComponentStory } from "@storybook/react";
import Link from ".";

const linkMeta: ComponentMeta<typeof Link> = {
	title: "Link",
	component: Link,
};
export default linkMeta;

//
const Template: ComponentStory<typeof Link> = (args) => {
	return (
		<div className="w-[300px]">
			<Link {...args}>Press Me</Link>
		</div>
	);
};

//
export const Default = Template.bind({});
Default.args = {
	href: "https://reactjs.org/",
};
Default.storyName = "default";

//
export const LinkWithSize: ComponentStory<typeof Link> = (args) => {
	return (
		<div className="mb-8">
			<div className="mr-4 inline-block">
				<Link size="sm" {...args}>
					Press Me
				</Link>
			</div>

			<div className="mr-4 inline-block">
				<Link {...args}>Press Me</Link>
			</div>

			<div className="mr-4 inline-block">
				<Link size="lg" {...args}>
					Press Me
				</Link>
			</div>
		</div>
	);
};
LinkWithSize.storyName = "size";

//
export const LinkWithDisabled: ComponentStory<typeof Link> = (args) => {
	return (
		<div className="mb-8">
			<div className="mr-4 inline-block">
				<Link size="sm" {...args}>
					Press Me
				</Link>
			</div>

			<div className="mr-4 inline-block">
				<Link {...args}>Press Me</Link>
			</div>

			<div className="mr-4 inline-block">
				<Link size="lg" {...args}>
					Press Me
				</Link>
			</div>
		</div>
	);
};
LinkWithDisabled.args = { disabled: true };
LinkWithDisabled.storyName = "disabled";

//
export const LinkWithCustom: ComponentStory<typeof Link> = (args) => {
	return (
		<div className="mb-8">
			<Link {...args} className="text-2xl text-green-500">
				Press Me
			</Link>
		</div>
	);
};
LinkWithCustom.storyName = "custom with className";
