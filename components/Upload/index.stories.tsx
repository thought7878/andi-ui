import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Button from "../Button";
import Icon from "../Icon";
import Upload from "./";

const uploadMeta: ComponentMeta<typeof Upload> = {
	title: "Upload 0.8",
	component: Upload,
	args: {
		// onBeforeUpload: () => {
		// 	return true;
		// },
	},
	argTypes: {
		// onBeforeUpload: { action: "onBeforeUpload" },
	},
};
export default uploadMeta;

//
const Template: ComponentStory<typeof Upload> = (args) => (
	<div className="w-[300px]">
		<Upload
			{...args}
			onBeforeUpload={(file) => {
				return true;
			}}
		>
			<Button btnType="primary">Upload Files</Button>
		</Upload>
	</div>
);

//
export const UploadWithDefault = Template.bind({});
UploadWithDefault.args = {
	url: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
};
UploadWithDefault.storyName = "default";

//
export const UploadWithAccept = Template.bind({});
UploadWithAccept.args = {
	url: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	accept: ".jpg",
};
UploadWithAccept.storyName = "accept";

//
export const UploadWithMultiple = Template.bind({});
UploadWithMultiple.args = {
	url: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	multiple: true,
};
UploadWithMultiple.storyName = "multiple";

//
export const UploadWithDrag: ComponentStory<typeof Upload> = (args) => {
	return (
		<div className="w-[300px]">
			<Upload
				{...args}
				url="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				drag
			>
				<>
					<div className="mb-5 flex justify-center">
						<Icon icon={<AiOutlineCloudUpload />} className="text-5xl" />
					</div>
					<p>Drag and Drop to Upload Files</p>
				</>
			</Upload>
		</div>
	);
};
UploadWithDrag.storyName = "drag";

//
/* export const UploadWithBeforeFun: ComponentStory<typeof Upload> = (args) => {
	return (
		<div>
			<div className="mb-8 w-[300px]">
				<Upload
					url="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					onBeforeUpload={() => {
						alert("onBeforeUpload返回false，不会执行上传文件");
						return false;
					}}
				>
					<Button btnType="primary">onBeforeUpload:false</Button>
				</Upload>
			</div>
			<div className="mb-8 w-[300px]">
				<Upload
					url="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					onBeforeUpload={() => {
						alert("onBeforeUpload返回true，执行上传文件");
						return true;
					}}
				>
					<Button btnType="primary">onBeforeUpload:true</Button>
				</Upload>
			</div>
		</div>
	);
};
UploadWithBeforeFun.storyName = "onBeforeUpload 函数"; */

//
export const UploadWithSize: ComponentStory<typeof Upload> = (args) => {
	return (
		<div className="w-[300px]">
			<Upload
				url="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				// onBeforeUpload={handleBeforeUpload}

				accept=".jpg"
				multiple
				drag
				// fileName="av"
				// httpHeader={{ cangjing: "kong" }}
				// formData={{ goHome: "001.av" }}
				onProgress={(percentage, file) => {
					// console.log("onProgress:", percentage);
				}}
				onSuccess={(res, file) => {
					console.log("onSuccess:");
				}}
				onError={(error, file) => {
					console.log("onError:", error);
				}}
			>
				<>
					<div className="mb-5 flex justify-center">
						<Icon icon={<AiOutlineCloudUpload />} className="text-5xl" />
					</div>
					<p>Drag and Drop to Upload Files</p>
				</>
			</Upload>
		</div>
	);
};
UploadWithSize.storyName = "设置size";
