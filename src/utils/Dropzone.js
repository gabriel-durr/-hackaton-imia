import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Box, IconButton, Input, Text, VStack} from "@chakra-ui/react";
import {VscGoToFile, VscClearAll} from "react-icons/vsc";

export const Dropzone = ({onHandleDrag, setKeysList, keysList}) => {
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

	function handleClear() {
		setIsDrag(false);
		onHandleDrag(false);
		setKeysList([]);
	}

	return (
		<VStack pos="relative">
			{keysList.length && (
				<IconButton
					pos="absolute"
					bottom="-12"
					right="28"
					size="md"
					color="red.400"
					onClick={() => handleClear()}
					icon={<VscClearAll />}
				/>
			)}

			<Box {...getRootProps({className: "dropzone"})}>
				<Input className="input-zone" {...getInputProps()} />
				{isDrag ? (
					<Box className="drop-area" h="2.5rem" rounded="lg">
						<IconButton
							pos="absolute"
							bottom="-12"
							right={keysList.length ? "16" : "90px"}
							color="cyan.400"
							size="md"
							icon={<VscGoToFile />}
						/>

						<Text className="text-center">
							{file.name} - size: {file.size} bytes
						</Text>
					</Box>
				) : (
					<Box
						className="drop-area"
						h="2.5rem"
						rounded="lg"
						cursor="cell">
						<Box className="text-center">
							<Text
								className="dropzone-content"
								color="gray.900"
								fontWeight="bold">
								Select a file
							</Text>
						</Box>
					</Box>
				)}
			</Box>
		</VStack>
	);
};
