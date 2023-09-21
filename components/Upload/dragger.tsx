import classNames from "classnames";
import { DragEvent, FC, ReactNode, useState } from "react";

interface DraggerProps {
	children?: ReactNode;
	onFileDrop: (files: FileList) => void;
	onClick: () => void;
}

const Dragger: FC<DraggerProps> = (props) => {
	const { children, onFileDrop, onClick } = props;
	const [isDragOver, setIsDragOver] = useState(false);

	const classes = classNames("", {
		"!bg-auiLight-border": isDragOver,
	});

	//
	function handleDragOver(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		setIsDragOver(true);
	}
	//
	function handleDragLeave(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		setIsDragOver(false);
	}
	//
	function handleDrop(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		onFileDrop(e.dataTransfer.files);
		setIsDragOver(false);
	}

	return (
		<div
			className={`cursor-pointer rounded-lg bg-auiLight-background px-10 py-8 transition-all ${classes} `}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Dragger;
