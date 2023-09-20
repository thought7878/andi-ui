import { ComponentMeta, ComponentStory } from "@storybook/react";
import AutoComplete from "./";

const autoCompleteMeta: ComponentMeta<typeof AutoComplete> = {
	title: "AutoComplete",
	component: AutoComplete,
	// argTypes: { onSelect: { action: "selected value" } },
};
export default autoCompleteMeta;

function fetchSuggestions(keyword: string) {
	// return lakers.filter((item) => item.value.includes(keyword));
	return fetch(`https://api.github.com/search/users?q=${keyword}`)
		.then((res) => {
			return res.json();
		})
		.then(({ items }) => {
			return items.slice(0, 10).map((item: { login: any }) => {
				return { value: item.login, ...item };
			});
		});
}

//
const Template: ComponentStory<typeof AutoComplete> = (args) => {
	return (
		<div style={{ width: "300px", height: "350px" }}>
			<AutoComplete
				// fetchSuggestions={fetchSuggestions}
				{...args}
			/>
		</div>
	);
};

//
export const AutoCompleteWithDefault = Template.bind({});
AutoCompleteWithDefault.args = {
	fetchSuggestions: (keyword: string) => {
		// return lakers.filter((item) => item.value.includes(keyword));
		return fetch(`https://api.github.com/search/users?q=${keyword}`)
			.then((res) => {
				return res.json();
			})
			.then(({ items }) => {
				return items.slice(0, 10).map((item: { login: any }) => {
					return { value: item.login, ...item };
				});
			});
	},
};
AutoCompleteWithDefault.storyName = "default";

//
export const AutoCompleteWithCustomSpinnerColor: ComponentStory<
	typeof AutoComplete
> = (args) => {
	return (
		<div className="mb-[200px] h-[300px] w-[300px]">
			<AutoComplete
				{...args}
				fetchSuggestions={fetchSuggestions}
				spinnerColor="#f43f5e"
			/>
		</div>
	);
};
AutoCompleteWithCustomSpinnerColor.storyName =
	"Custom spinner color with spinnerColor";

//
export const AutoCompleteWithCustomSpinner: ComponentStory<
	typeof AutoComplete
> = (args) => {
	return (
		<div className="w-[300px]">
			<div className="mb-[200px]">
				<AutoComplete
					{...args}
					fetchSuggestions={fetchSuggestions}
					spinnerClass="text-[#f43f5e] text-[2rem]"
				/>
			</div>

			<div className="mb-[200px]">
				<AutoComplete
					{...args}
					fetchSuggestions={fetchSuggestions}
					spinnerStyle={{ color: "#f43f5e", fontSize: "2rem" }}
				/>
			</div>
		</div>
	);
};
AutoCompleteWithCustomSpinner.storyName =
	"Custom spinner color & size with spinnerClass or spinnerStyle";

//
export const AutoCompleteWithCustomInput: ComponentStory<
	typeof AutoComplete
> = (args) => {
	return (
		<div className="w-[300px]">
			<div className="mb-[200px]">
				<AutoComplete
					{...args}
					fetchSuggestions={fetchSuggestions}
					inputClass="px-6 py-3  rounded-full hover:border-green-500 focus:border-green-500 focus:shadow-green-500"
					spinnerClass="text-green-500 text-[2rem]"
				/>
			</div>

			<div className="mb-[200px]">
				<AutoComplete
					{...args}
					fetchSuggestions={fetchSuggestions}
					inputStyle={{ padding: "0.75rem 1.5rem", borderRadius: "2rem" }}
					spinnerClass="text-primary text-[2rem]"
				/>
			</div>
		</div>
	);
};
AutoCompleteWithCustomInput.storyName =
	"Custom input style with inputClass or inputStyle";

//
export const AutoCompleteWithCustomItem: ComponentStory<typeof AutoComplete> = (
	args
) => {
	return (
		<div className="w-[300px]">
			<div className="mb-[200px] ">
				<AutoComplete
					{...args}
					fetchSuggestions={fetchSuggestions}
					highlightColor="#22c55e"
					// inputClass="px-6 py-3 rounded-full hover:border-green-500 focus:border-green-500 focus:shadow-green-500"
					// spinnerClass="text-green-500"
				/>
			</div>
		</div>
	);
};
AutoCompleteWithCustomItem.storyName = "Custom Item highlight color";

//
export const AutoCompleteWithCustomItemWithClass: ComponentStory<
	typeof AutoComplete
> = (args) => {
	return (
		<div className="h-[350px] w-[300px]">
			<div className="mb-[200px] ">
				<AutoComplete
					fetchSuggestions={fetchSuggestions}
					itemClass="px-8 py-8"
				/>
			</div>
		</div>
	);
};
AutoCompleteWithCustomItemWithClass.storyName =
	"Custom Item style with itemClass";
