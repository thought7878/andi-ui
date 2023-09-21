import { ComponentMeta, ComponentStory } from "@storybook/react";
import Menu from "./";

const menuMeta: ComponentMeta<typeof Menu> = {
	title: "Menu 0.8",
	// id: "Menu",
	component: Menu,
	subcomponents: { Submenu: Menu.Submenu, Item: Menu.Item },
	args: { defaultIndex: "1" },
	argTypes: {
		defaultIndex: {
			// control: "color",
			description: "Set the default selected tab",
		},
	},
	parameters: {
		docs: { page: null },
		/* 		backgrounds: {
			values: [
				{ name: "blue", value: "#3b82f6" },
				{ name: "green", value: "#22c55e" },
			],
		}, */
	},
};
export default menuMeta;

//
const Template: ComponentStory<typeof Menu> = (args) => {
	return (
		<div className="h-[300px]">
			<Menu {...args}>
				<Menu.Item>Menu1</Menu.Item>
				<Menu.Item>Menu2</Menu.Item>
				<Menu.Item>Menu3</Menu.Item>
				<Menu.Item disabled>Menu4</Menu.Item>
				<Menu.Submenu title="Menu4">
					<Menu.Item>Submenu1</Menu.Item>
					<Menu.Item>Submenu2</Menu.Item>
					<Menu.Item>Submenu3</Menu.Item>
				</Menu.Submenu>
			</Menu>
		</div>
	);
};

//
export const Default = Template.bind({});
Default.args = {};
Default.storyName = "default";

//
export const Vertical = Template.bind({});
Vertical.args = { defaultIndex: "1", direction: "vertical" };
Vertical.storyName = "vertical menu";
