import { Meta, StoryObj } from "@storybook/react";

import Button from "./button";
import React from "react";

const meta: Meta<typeof Button> = {
	component: Button,
	// tags: ["autodocs"],
	title: "Components/Button",
	argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	name: "primary",
	render: () => <Button btnType="primary">Primary</Button>,
};
export const Type: Story = {
	name: "type",
	render: (args) => {
		return (
			<div className="w-[500px]">
				<div className="mr-4 inline-block">
					<Button btnType="primary" {...args}>
						Press Me
					</Button>
				</div>

				<div className="mr-4 inline-block">
					<Button {...args}>Press Me</Button>
				</div>

				<div className="mr-4 inline-block">
					<Button btnType="danger" {...args}>
						Press Me
					</Button>
				</div>
			</div>
		);
	},
};
