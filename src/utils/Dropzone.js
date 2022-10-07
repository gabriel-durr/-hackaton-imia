import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Box, IconButton, Input, Text, VStack, Icon} from "@chakra-ui/react";
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
					bottom="-16"
					right="24"
					size="lg"
					color="red.400"
					onClick={() => handleClear()}
					icon={<VscClearAll />}
				/>
			)}

			<Box
				{...getRootProps({className: "dropzone"})}
				rounded="lg"
				cursor="pointer"
				border="2px dotted #898a8a"
				w="230px"
				p="12px">
				<Input className="input-zone" {...getInputProps()} />
				{isDrag ? (
					<Box textAlign="left">
						<Icon
							pos="absolute"
							top={!!keysList.length ? "6" : "4"}
							right={!!keysList.length ? "1" : "1"}
							color="cyan.400"
							h="5"
							w="5"
							as={VscGoToFile}
						/>

						<Text>
							{file.name} - size: {file.size} bytes
						</Text>
					</Box>
				) : (
					<Box textAlign="center">
						<Text color="gray.900" fontWeight="bold">
							Select a file
						</Text>
					</Box>
				)}
			</Box>
		</VStack>
	);
};
