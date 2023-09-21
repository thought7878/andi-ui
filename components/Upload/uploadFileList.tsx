import { FC } from "react";
import {
	AiFillCheckCircle,
	AiFillCloseCircle,
	AiOutlineFileText,
} from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

import { UploadFile } from ".";
import Icon from "../Icon";
import Progress from "../Progress";
import Spinner from "../Spinner";

export interface UploadFileListProps {
	uploadFileList?: UploadFile[];
	onRemove?: (file: UploadFile) => void;
}

const UploadFileList: FC<UploadFileListProps> = (props) => {
	const { uploadFileList, onRemove } = props;

	function renderFileList() {
		return uploadFileList?.map((file) => {
			//
			let statusIcon;
			let errorFileClass;
			if (file.status === "success") {
				statusIcon = (
					<Icon
						type=""
						icon={<AiFillCheckCircle />}
						className="file-success-icon text-success"
					/>
				);
			} else if (file.status === "uploading") {
				statusIcon = <Spinner className="file-uploading-icon text-primary" />;
			} else if (file.status === "error") {
				statusIcon = (
					<Icon
						type=""
						icon={<AiFillCloseCircle />}
						className="file-error-icon text-danger"
					/>
				);
				errorFileClass = "text-danger";
			}

			//
			return (
				<li className="group" key={file.uid}>
					<div className=" flex items-center justify-between transition-all hover:bg-auiLight-background">
						<div className="flex items-center">
							<Icon
								icon={<AiOutlineFileText />}
								className={`file-icon mr-2 ${errorFileClass && errorFileClass}`}
							/>
							<span
								className={`file-name mr-4 ${errorFileClass && errorFileClass}`}
							>
								{file.name}
							</span>
						</div>
						<div className="flex items-center">
							<button
								className="hidden group-hover:inline-flex"
								onClick={(e) => {
									onRemove && onRemove(file);
									e.preventDefault();
									e.stopPropagation();
								}}
							>
								<IoMdClose className="text-base" />
							</button>
							{statusIcon}
						</div>
					</div>
					{file.status === "uploading" && (
						<Progress
							progress={(file.percent && Math.round(file.percent * 100)) || 0}
						/>
					)}
				</li>
			);
		});
	}

	return (
		<ul
			className="mt-2 "
			// TODO: 阻止点击li，trigger upload
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
		>
			{renderFileList()}
		</ul>
	);
};

export default UploadFileList;
