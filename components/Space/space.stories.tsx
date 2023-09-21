import { ComponentMeta, ComponentStory } from "@storybook/react";
import Space from "./";

const spaceMeta: ComponentMeta<typeof Space> = {
	title: "Space",
	component: Space,
};
export default spaceMeta;

//
/* const Template: ComponentStory<typeof Space> = (args) => {
	return (
		<div className="m-10 w-80">
			<Space {...args}></Space>
		</div>
	);
};

//
export const Default = Template.bind({});
Default.args = {
	children: "default space",
};
Default.storyName = "default"; */

//
export const SpaceWithType: ComponentStory<typeof Space> = (args) => {
	return (
		<div className="m-10 w-80">
			<div className="mb-5">
				<Space {...args}>
					<div className="h-28 w-28 bg-primary">1</div>
					<div className="h-28 w-28 bg-primary">2</div>
					{[
						<div className="h-28 w-28 bg-primary">3</div>,
						<div className="h-28 w-28 bg-primary">4</div>,
					]}
				</Space>
			</div>
		</div>
	);
};
SpaceWithType.storyName = "type";
