import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button } from "../Button";
import { CustomRule } from "./useStore";
import Form from ".";
import { IFormRef } from "./form";
import { Input } from "../Input";
import React from "react";
import { useRef } from "react";

const formMeta: ComponentMeta<typeof Form> = {
	title: "Components/Form 0.8",
	component: Form,
	subcomponents: { "Form.Item": Form.Item },
	tags: ["autodocs"],
	argTypes: {},
	parameters: {
		docs: {
			source: {
				type: "code",
			},
		},
	},
};
export default formMeta;

//
const confirmPasswordRules: CustomRule[] = [
	{ type: "string", required: true, min: 3, max: 8 },
	({ getFieldValue }) => ({
		asyncValidator: (rule, value) => {
			if (value !== getFieldValue("password")) {
				return Promise.reject("Confirm password is different from Password!");
			}

			return Promise.resolve();
		},
	}),
];

//
export const FormWithDefault: ComponentStory<typeof Form> = (args) => {
	return (
		<div className="w-[800px]">
			<Form {...args}>
				<Form.Item label="Username:" name="username">
					<Input />
				</Form.Item>
				<Form.Item label="Password:" name="password">
					<Input type="password" />
				</Form.Item>
			</Form>
		</div>
	);
};
FormWithDefault.storyName = "label & name";

//
export const FormWithLayout: ComponentStory<typeof Form> = (args) => {
	return (
		<div className="w-[800px]">
			<Form>
				<Form.Item label="Username:" name="username">
					<Input />
				</Form.Item>
				<Form.Item label="Password:" name="password">
					<Input type="password" />
				</Form.Item>
				{/* //////////////// layout without label:START //////////////// */}
				<div className="flex pl-[30%]">
					<Form.Item
						name="remember"
						valueName="checked"
						valueChangeEventName="onChange"
						getValueFromEvent={(e) => e.target.checked}
					>
						<input type="checkbox" className="mr-1" />
					</Form.Item>
					<span className="text-base">Remember me</span>
				</div>
				{/* //////////////// layout without label:END //////////////// */}
			</Form>
		</div>
	);
};
FormWithLayout.storyName = "layout without label";

//
export const FormWithRules: ComponentStory<typeof Form> = (args) => {
	return (
		<div className="w-[800px]">
			<Form>
				<Form.Item
					label="Username:"
					name="username"
					//////////////// rules:START ////////////////
					rules={[{ type: "email", required: true }]}
					//////////////// rules:END ////////////////
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password:"
					name="password"
					//////////////// rules:START ////////////////
					rules={[{ type: "string", required: true, min: 3, max: 8 }]}
					//////////////// rules:END ////////////////
				>
					<Input type="password" />
				</Form.Item>
				<Form.Item>
					<Button btnType="primary">Login</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
FormWithRules.storyName = "rules";

//
export const FormWithCustomRules: ComponentStory<typeof Form> = (args) => {
	return (
		<div className="w-[800px]">
			<Form>
				<Form.Item
					label="Username:"
					name="username"
					rules={[{ type: "email", required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password:"
					name="password"
					rules={[{ type: "string", required: true, min: 3, max: 8 }]}
				>
					<Input type="password" />
				</Form.Item>
				<Form.Item
					label="confirm Password:"
					name="confirmPassword"
					rules={[
						{ type: "string", required: true, min: 3, max: 8 },

						//////////////// Custom rules:START ////////////////
						({ getFieldValue }) => ({
							asyncValidator: (rule, value) => {
								if (value !== getFieldValue("password")) {
									return Promise.reject(
										"Confirm password is different from Password!"
									);
								}

								return Promise.resolve();
							},
						}),
						//////////////// Custom rules:END ////////////////
					]}
				>
					<Input type="password" />
				</Form.Item>
				<div className="flex pl-[30%]">
					<Form.Item
						name="agreement"
						valueName="checked"
						getValueFromEvent={(e) => e.target.checked}
						rules={[
							{
								type: "enum",
								enum: [true],
								message: "Please agree to the agreement",
							},
						]}
					>
						<input type="checkbox" className="mr-1" />
					</Form.Item>
					<span className="text-base">
						Registration means that you agree to{" "}
						<a href="#" className="text-primary">
							the agreement
						</a>
					</span>
				</div>
				<Form.Item>
					<Button btnType="primary">Login</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
FormWithCustomRules.storyName = "custom rules";

//
export const FormWithValueName: ComponentStory<typeof Form> = (args) => {
	return (
		<div className="w-[800px]">
			<Form>
				<Form.Item label="Username:" name="username">
					<Input />
				</Form.Item>
				<Form.Item label="Password:" name="password">
					<Input type="password" />
				</Form.Item>

				<div className="flex pl-[30%]">
					<Form.Item
						name="remember"
						//////////////// valueName ////////////////
						valueName="checked"
						//////////////// getValueFromEvent ////////////////
						getValueFromEvent={(e) => e.target.checked}
					>
						<input type="checkbox" className="mr-1" />
					</Form.Item>
					<span className="text-base">Remember me</span>
				</div>

				<Form.Item>
					<Button btnType="primary">Login</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
FormWithValueName.storyName = "valueName & getValueFromEvent";

//
export const FormWithInitialValues: ComponentStory<typeof Form> = (args) => {
	return (
		<div className="w-[800px]">
			<Form
				//////////////// initialValues:START ////////////////
				initialValues={{
					username: "andy@gmail.com",
					password: "123456",
				}}
				//////////////// initialValues:END ////////////////
			>
				<Form.Item
					label="Username:"
					name="username"
					rules={[{ type: "email", required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password:"
					name="password"
					rules={[{ type: "string", required: true, min: 3, max: 8 }]}
				>
					<Input type="password" />
				</Form.Item>
				<Form.Item>
					<Button btnType="primary">Login</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
FormWithInitialValues.storyName = "initialValues";

//
export const FormWithFormEvents: ComponentStory<typeof Form> = (args) => {
	return (
		<div className="w-[800px]">
			<Form {...args}>
				<Form.Item
					label="Username:"
					name="username"
					rules={[{ type: "email", required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password:"
					name="password"
					rules={[{ type: "string", required: true, min: 3, max: 8 }]}
				>
					<Input type="password" />
				</Form.Item>
				<Form.Item>
					<Button btnType="primary">Login</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
FormWithFormEvents.storyName = "onFinish & onFinishFailed";

//
export const FormWithValidateEventName: ComponentStory<typeof Form> = (
	args
) => {
	return (
		<div className="w-[800px]">
			<Form {...args}>
				<Form.Item
					label="Username:"
					name="username"
					rules={[{ type: "email", required: true }]}
					//////////////// validateEventName ////////////////
					validateEventName="onKeyUp"
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password:"
					name="password"
					rules={[{ type: "string", required: true, min: 3, max: 8 }]}
					//////////////// validateEventName ////////////////
					validateEventName="onKeyUp"
				>
					<Input type="password" />
				</Form.Item>
				<Form.Item>
					<Button btnType="primary">Login</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
FormWithValidateEventName.storyName = "validateEventName";

//
export const FormWithReset: ComponentStory<typeof Form> = (args) => {
	let formRef = useRef<IFormRef>(null);

	return (
		<div className="w-[800px]">
			<Form ref={formRef}>
				<Form.Item
					label="Username:"
					name="username"
					rules={[{ type: "email", required: true }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password:"
					name="password"
					rules={[{ type: "string", required: true, min: 3, max: 8 }]}
				>
					<Input type="password" />
				</Form.Item>

				<Form.Item
					label="confirm Password:"
					name="confirmPassword"
					rules={confirmPasswordRules}
				>
					<Input type="password" />
				</Form.Item>

				<div className="flex pl-[30%]">
					<Form.Item
						name="agreement"
						valueName="checked"
						getValueFromEvent={(e) => e.target.checked}
						rules={[
							{
								type: "enum",
								enum: [true],
								message: "Please agree to the agreement",
							},
						]}
					>
						<input type="checkbox" className="mr-1" />
					</Form.Item>
					<span className="text-base">
						Registration means that you agree to{" "}
						<a href="#" className="text-primary">
							the agreement
						</a>
					</span>
				</div>

				<Form.Item>
					<Button btnType="primary">Login</Button>
				</Form.Item>

				<Form.Item>
					<Button
						onClick={() => {
							console.log(formRef);
							console.log(
								"Username:",
								//////////////// getFieldValue ////////////////
								formRef.current?.getFieldValue("username")
							);
							//////////////// getFieldsValue ////////////////
							console.log("FieldsValue:", formRef.current?.getFieldsValue());
							//////////////// resetFields ////////////////
							formRef.current?.resetFields();
						}}
					>
						Reset
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
// TODO: unfinish
FormWithReset.storyName =
	"resetFields/getFieldValue/setFieldValue/getFieldsValue";
