import {useCallback, useEffect, useState} from "react";
import {useDropzone, Dropzone as drop} from "react-dropzone";
import {
	Box,
	IconButton,
	Input,
	Text,
	VStack,
	Icon,
	Image,
} from "@chakra-ui/react";
import {VscGoToFile, VscClearAll} from "react-icons/vsc";

export const Dropzone = ({
	onHandleDrag,
	setKeysList,
	keysList,
	onHandleKeys,
}) => {
	const [file, setFile] = useState(null);
	const [isDrag, setIsDrag] = useState(false);

	const onDrop = useCallback(acceptedFiles => {
		//Set acceptable files
	}, []);

	const {getRootProps, getInputProps, acceptedFiles, isDragActive} =
		useDropzone({});

	useEffect(() => {
		if (acceptedFiles.length) {
			acceptedFiles.map(file => {
				setFile(file);
			});
			setIsDrag(true);
			onHandleKeys();
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
				w="230px"
				p="12px">
				<Input className="input-zone" {...getInputProps()} />
				{
					<Box pos="absolute" transform="translate(-170%, 70%)">
						<Image alt="upload do arquivo" src="/upload.svg" />

						<Text
							textAlign="center"
							rounded="lg"
							p="10px"
							color="gray.900"
							fontWeight="bold"
							border="2px dotted #f7f7f7">
							Selecione o Arquivo
						</Text>
					</Box>
				}
			</Box>
		</VStack>
	);
};
