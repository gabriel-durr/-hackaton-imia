import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";

import {Box, IconButton, Input, Text, VStack, Image} from "@chakra-ui/react";
import {VscClearAll} from "react-icons/vsc";
import {MdCloudUpload} from "react-icons/md";

export const Dropzone = ({setKeysList, keysList, setEndList, endList}) => {
	const onDrop = useCallback(acceptedFiles => {
		acceptedFiles.forEach(file => {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				// Do whatever you want with the file contents
				const base64 = reader.result
					.replace("data:", "")
					.replace(/^.+,/, "");

				const decodedString = decodeURIComponent(window.atob(base64));
				const parser = JSON.parse(decodedString);
				const resultList = parser[0].keys;

				setKeysList(oldState => [...oldState, ...resultList]);
			};
		});
	}, []);

	const {getRootProps, getInputProps, acceptedFiles, isDragActive} =
		useDropzone({
			onDrop,
			multiple: false,
		});

	function handleClear() {
		setKeysList([]);
		setEndList([]);
	}

	return (
		<VStack pos="relative">
			{(!!keysList.length || !!endList.length) && (
				<IconButton
					pos="absolute"
					size="md"
					top="10"
					right="7"
					fontSize="25px"
					color="red.300"
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
				<Input className="input-zone" {...getInputProps()} bg="red" />
				{(!!endList.length ||
					endList.length > 0 ||
					keysList.length > 0) && (
					<IconButton
						pos="absolute"
						top="10"
						right="20"
						color="cyan.600"
						size="md"
						fontSize="25px"
						icon={<MdCloudUpload />}
					/>
				)}
				{!keysList.length && !endList.length && (
					<Box pos="absolute" right="340" bottom="-350" minW="170px">
						<Image
							alt="upload do arquivo"
							src="/upload.svg"
							draggable="false"
						/>

						<Text
							textAlign="center"
							rounded="lg"
							p="10px"
							color="gray.900"
							fontWeight="bold">
							Selecione, ou arraste o Arquivo
						</Text>
					</Box>
				)}
			</Box>
		</VStack>
	);
};
