import { Meta, StoryObj } from "@storybook/react";

import { BiDownload } from "react-icons/bi";
import Button from "./button";
import React from "react";

const meta: Meta<typeof Button> = {
  component: Button,
  // tags: ["autodocs"],
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: {
    onClick: () => console.log("clicked!"),
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  name: "default",
  render: () => <Button>Default</Button>,
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

//
export const ButtonWithSize: Story = (args) => {
  return (
    <div>
      <div className="mb-8">
        <div className="mr-4 inline-block">
          <Button size="sm" btnType="primary" {...args}>
            Press Me
          </Button>
        </div>

        <div className="mr-4 inline-block">
          <Button btnType="primary" {...args}>
            Press Me
          </Button>
        </div>

        <div className="mr-4 inline-block">
          <Button size="lg" btnType="primary" {...args}>
            Press Me
          </Button>
        </div>
      </div>
      <div className="mb-8">
        <div className="mr-4 inline-block">
          <Button size="sm" {...args}>
            Press Me
          </Button>
        </div>

        <div className="mr-4 inline-block">
          <Button {...args}>Press Me</Button>
        </div>

        <div className="mr-4 inline-block">
          <Button size="lg" {...args}>
            Press Me
          </Button>
        </div>
      </div>
      <div className="mb-8">
        <div className="mr-4 inline-block">
          <Button size="sm" btnType="danger" {...args}>
            Press Me
          </Button>
        </div>

        <div className="mr-4 inline-block">
          <Button btnType="danger" {...args}>
            Press Me
          </Button>
        </div>

        <div className="mr-4 inline-block">
          <Button size="lg" btnType="danger" {...args}>
            Press Me
          </Button>
        </div>
      </div>
    </div>
  );
};
ButtonWithSize.storyName = "size";

//
export const ButtonWithDisabled: Story = (args) => {
  return (
    <div>
      <div className="mr-4 inline-block">
        <Button btnType="primary" {...args}>
          Press Me
        </Button>
      </div>
      <div className="mr-4 inline-block">
        <Button btnType="default" {...args}>
          Press Me
        </Button>
      </div>
      <div className="mr-4 inline-block">
        <Button btnType="danger" {...args}>
          Press Me
        </Button>
      </div>
    </div>
  );
};
ButtonWithDisabled.args = { disabled: true };
ButtonWithDisabled.storyName = "disabled";

//
export const ButtonWithIcon: Story = (args) => {
  return (
    <div className="w-[500px]">
      <div className="mb-4">
        <Button btnType="primary">
          <BiDownload size="18px" />
        </Button>
      </div>

      <div className="mb-4 flex justify-between">
        <Button leftIcon={<BiDownload size="18px" />} btnType="primary">
          left icon
        </Button>
        <Button leftIcon={<BiDownload size="18px" />}>left icon</Button>
        <Button leftIcon={<BiDownload size="18px" />} btnType="danger">
          left icon
        </Button>
      </div>

      <div className="mb-4 flex justify-between">
        <Button rightIcon={<BiDownload size="18px" />} btnType="primary">
          right icon
        </Button>
        <Button rightIcon={<BiDownload size="18px" />}>right icon</Button>
        <Button rightIcon={<BiDownload size="18px" />} btnType="danger">
          right icon
        </Button>
      </div>

      <div className="mb-4">
        <Button
          leftIcon={<BiDownload size="18px" />}
          rightIcon={<BiDownload size="18px" />}
          btnType="primary"
        >
          left right icon
        </Button>
      </div>
      <div className="mb-4"></div>
    </div>
  );
};

ButtonWithIcon.storyName = "icon";

//
export const ButtonWithLoading: Story = (args) => {
  return (
    <div className="w-[500px]">
      <div className="mb-4 flex justify-between">
        <Button btnType="primary" loading>
          loading...
        </Button>
        <Button loading>loading...</Button>
        <Button btnType="danger" loading>
          loading...
        </Button>
      </div>
    </div>
  );
};

ButtonWithLoading.storyName = "loading";

//
//
export const ButtonWithCustomClass: Story = (args) => {
  return (
    <div className="w-[500px]">
      <div className="mb-4 flex justify-between">
        <Button
          btnType="primary"
          className="rounded-[1.6rem] px-[28px] py-[20px]"
        >
          Press Me
        </Button>
        <Button className="rounded-[1.6rem] px-[28px] py-[20px]">
          Press Me
        </Button>
        <Button
          btnType="danger"
          className="rounded-[1.6rem] px-[28px] py-[20px]"
        >
          Press Me
        </Button>
      </div>
    </div>
  );
};

ButtonWithCustomClass.storyName = "custom with className";
//
//
export const ButtonWithCustom: Story = (args) => {
  return (
    <div className="w-[500px]">
      <div className="mb-4 flex justify-between">
        <Button
          btnType="primary"
          style={{ padding: "20px 28px", borderRadius: "1.6rem" }}
        >
          Press Me
        </Button>
        <Button style={{ padding: "20px 28px", borderRadius: "1.6rem" }}>
          Press Me
        </Button>
        <Button
          btnType="danger"
          style={{ padding: "20px 28px", borderRadius: "1.6rem" }}
        >
          Press Me
        </Button>
      </div>
    </div>
  );
};

ButtonWithCustom.storyName = "custom with style";
