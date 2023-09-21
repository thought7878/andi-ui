import axios from "axios";
import React, { ChangeEvent, FC, ReactElement, useRef, useState } from "react";
import Dragger from "./dragger";
import UploadFileList from "./uploadFileList";

//
export interface UploadProps {
	/**Set url */
	url: string;
	/**Set children */
	children: ReactElement;
	/**Set the type of file. Refer to the input attribute, such as: .jpg, .pdf, .doc */
	accept?: string;
	/**Set multi-file upload */
	multiple?: boolean;
	/**Set whether to drag and upload */
	drag?: boolean;
	/**Set default file list */
	defaultFileList?: UploadFile[];
	/**function before upload   */
	onBeforeUpload?: (file: File) => boolean | Promise<File>;
	/**function on progress */
	onProgress?: (percentage: number, file: UploadFile) => void;
	/**function on success */
	onSuccess?: (data: any, file: UploadFile) => void;
	/**function on error */
	onError?: (err: any, file: UploadFile) => void;
	/**function on file change  */
	onChange?: (file: UploadFile) => void;
	/**function on file remove */
	onRemove?: (file: UploadFile) => void;
	/**Set http header */
	httpHeader?: { [key: string]: any };
	/**Set form data */
	formData?: { [key: string]: any };
	/**Set uploading file name */
	fileName?: string;
	/**`withCredentials` indicates whether or not cross-site Access-Control requests */
	withCredentials?: boolean;
}
//upload file status type
export interface UploadFile {
	uid: string;
	name: string;
	size: number;
	status?: "ready" | "uploading" | "success" | "error";
	percent?: number;
	originalFile?: File;
	response?: any;
	error?: any;
}

/**
 * Upload component
 *
 * ```js
 * // import like this
 * import { Upload } from 'aui'
 * ```
 *
 */
export const Upload: FC<UploadProps> = (props) => {
	const {
		url,
		defaultFileList = [],
		onBeforeUpload,
		onChange,
		onProgress,
		onSuccess,
		onError,
		onRemove,
		fileName = "file",
		httpHeader,
		formData,
		withCredentials,
		accept,
		multiple,
		drag,
		children,
	} = props;
	//
	const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);
	//file input
	const inputRef = useRef<HTMLInputElement>(null);

	//更新数组中的指定文件
	function updateFileList(file: UploadFile, newValue: Partial<UploadFile>) {
		setFileList((prevFileList) => {
			return prevFileList.map((_file) => {
				if (file.uid === _file.uid) {
					return { ..._file, ...newValue };
				}
				return _file;
			});
		});
	}

	// 点击button，trigger input click
	function handleClick() {
		if (inputRef) {
			inputRef.current?.click();
		}
	}

	//处理上传
	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		const fileList = e.target.files;
		if (fileList) {
			uploadFiles(fileList);
		}
	}
	function uploadFiles(fileList: FileList) {
		const files = Array.from(fileList);
		files.forEach((file) => {
			// 如果没有onBeforeUpload，上传。有onBeforeUpload，返回值是true，执行上传；返回值是Promise
			if (onBeforeUpload) {
				let result = onBeforeUpload(file);
				if (result && typeof result === "boolean") {
					uploadFile(file);
				} else if (result instanceof Promise) {
					result.then((processedFile) => {
						uploadFile(processedFile);
					});
				}
			} else {
				uploadFile(file);
			}
		});
	}
	function uploadFile(file: File) {
		// ajax之前，把新的file加入fileList[0]
		let _file: UploadFile = {
			uid: Date.now() + "file",
			name: file.name,
			size: file.size,
			status: "ready",
			percent: 0,
			originalFile: file,
		};
		setFileList((prevFileList) => {
			return [_file, ...prevFileList];
		});

		//construct form data
		const _formData = new FormData();
		_formData.append(fileName || "file", file);
		// add custom form data
		if (formData) {
			Object.keys(formData).forEach((key) => {
				_formData.append(key, formData[key]);
			});
			/* for (const key in formData) {
				_formData.append(key, formData[key]);
			} */
		}
		// ajax
		axios
			.post(url, _formData, {
				withCredentials,
				headers: {
					"Content-Type": "multipart/form-data",
					...httpHeader,
				},
				onUploadProgress: ({ progress }) => {
					if (progress && progress <= 1) {
						// update current uploading file state
						updateFileList(_file, { status: "uploading", percent: progress });
						// call onProgress property
						if (onProgress) {
							onProgress(progress, _file);
						}
					}
				},
			})
			.then((res) => {
				// update current uploading file success state
				updateFileList(_file, {
					status: "success",
					response: res.data,
				});
				// call onSuccess property
				if (onSuccess) {
					onSuccess(res, _file);
				}
				if (onChange) {
					onChange(_file);
				}
			})
			.catch((error) => {
				// update current uploading file error state
				updateFileList(_file, {
					status: "error",
					error: error,
				});
				// call onError property
				if (onError) {
					onError(error, _file);
				}
				if (onChange) {
					onChange(_file);
				}
			});

		//
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	}

	// 删除指定的file
	function handleRemove(file: UploadFile) {
		setFileList((prevFileList) => {
			return prevFileList.filter((_file) => {
				return file.uid !== _file.uid;
			});
		});
		//call onRemove property
		if (onRemove) {
			onRemove(file);
		}
	}

	// 如果不是拖拽上传，给children添加onClick
	let _children = children;
	if (!drag) {
		_children = React.cloneElement(children, { onClick: handleClick });
	}

	return (
		<div className="rounded-lg">
			{/*  */}
			{drag ? (
				<Dragger onClick={handleClick} onFileDrop={uploadFiles}>
					{children}
				</Dragger>
			) : (
				_children
			)}
			{/*  */}
			<input
				type="file"
				// name="file"
				className="hidden"
				onChange={handleFileChange}
				ref={inputRef}
				accept={accept}
				multiple={multiple}
			/>
			{/*  */}
			{fileList && (
				<UploadFileList uploadFileList={fileList} onRemove={handleRemove} />
			)}
		</div>
	);
};

Upload.defaultProps = {
	multiple: false,
	drag: false,
	defaultFileList: [],
};

export default Upload;
