import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";

export const Dropzone = ({onHandleDrag}) => {
	const [file, setFile] = useState(null);
	const [isDrag, setIsDrag] = useState(false);

	const onDrop = useCallback(acceptedFiles => {
		//Set acceptable files
	}, []);

	const {getRootProps, getInputProps, acceptedFiles} = useDropzone({});

	useEffect(() => {
		if (acceptedFiles.length) {
			acceptedFiles.map(file => {
				setFile(file);
			});
			setIsDrag(true);
			onHandleDrag(true);
		}
	}, [acceptedFiles]);

	return (
		<div {...getRootProps({className: "dropzone"})}>
			<input className="input-zone" {...getInputProps()} />
			{isDrag ? (
				<div className="drop-area">
					<p className="text-center">
						{file.name} - size: {file.size} bytes
					</p>
				</div>
			) : (
				<div className="drop-area">
					<div className="text-center">
						<p className="dropzone-content">Select a file</p>
					</div>
				</div>
			)}
		</div>
	);
};
