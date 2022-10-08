import {useState} from "react";
import {Flex, Button, Stack, VStack, useToast} from "@chakra-ui/react";
import {Dropzone} from "../../../utils/Dropzone";
import {DraggableList} from "../../../utils/DraggableList";
import {EditableItem} from "../../../utils/EditableItem";

export const Forms = ({data}) => {
	const [title, setTitle] = useState("List Title");
	const [hasFile, setHasFile] = useState(false);
	const [keysList, setKeysList] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const toast = useToast();

	const onHandleKeys = async () => {
		if (hasFile) {
			setKeysList(data);
		}
	};

	const handleSaveList = async () => {
		// console.log(title, keysList);
		setIsloading(true);
		await new Promise(resolve => setTimeout(resolve, 2000));
		setIsloading(false);
		toast({
			title: "Saved successfully! 🎉🎉",
			position: "top",
			description: "Your list has been saved in our database",
			status: "success",
			duration: 9000,
			isClosable: true,
		});
	};

	return (
		<Flex
			pos="relative"
			align="center"
			p="1rem"
			gap="20"
			flexDir="column"
			px="2rem"
			margin="15px"
			bg="#f7fcfd"
			w="100%"
			h="100%">
			<VStack pos="absolute" right="4" top="2" zIndex="7">
				{!!keysList.length && (
					<Button
						pos="absolute"
						colorScheme="cyan"
						loadingText="Saving"
						isLoading={isLoading}
						onClick={() => handleSaveList()}
						color="#fff"
						top="80"
						w="140px"
						h="42px"
						fontWeight="bold">
						Salvar
					</Button>
				)}

				{/* {hasFile && !keysList.length && (
					<Button
						variant="outline"
						fontSize="1.09rem"
						color="pink.200"
						fontWeight="thin"
						w="10rem"
						h="3rem"
						bg="#0a5779"
						_hover={{
							transition: ".4s ease",
							filter: "opacity(.9)",
						}}
						onClick={() => onHandleKeys()}>
						Pegar Chaves
					</Button>
				)} */}
				<Dropzone
					onHandleDrag={setHasFile}
					setKeysList={setKeysList}
					keysList={keysList}
					onHandleKeys={onHandleKeys}
				/>
			</VStack>
			<Stack align="center" spacing="2" w="100%" h="100%">
				<EditableItem value={title} setValue={setTitle} />
				<DraggableList list={keysList} setItemList={setKeysList} />
			</Stack>
		</Flex>
	);
};
