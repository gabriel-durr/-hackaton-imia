import {useState} from "react";
import {Flex, Button, Stack, VStack, useToast} from "@chakra-ui/react";
import {Dropzone} from "../../../utils/Dropzone";
import {DraggableList} from "../../../utils/DraggableList";
import {EditableItem} from "../../../utils/EditableItem";

export const FormsTab = ({data, resultList}) => {
	const [title, setTitle] = useState("Titulo da Coleção");
	const [keysList, setKeysList] = useState([]);
	const [endList, setEndList] = useState([]);

	const [isLoading, setIsloading] = useState(false);
	const toast = useToast();

	const handleSaveList = async () => {
		setIsloading(true);
		await new Promise(resolve => setTimeout(resolve, 2000));
		resultList(endList);
		setIsloading(false);

		toast({
			title: "Sucesso! ",
			position: "top",
			description: "Sua coleção foi salva em nosso banco de dados",
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
			overflowX="hidden"
			px="2rem"
			margin="15px"
			bg="#f7fcfd"
			w="100%"
			h="100%"
			sx={{
				"&::-webkit-scrollbar": {
					width: "0px",
				},
			}}>
			{!!endList.length && (
				<Button
					pos="absolute"
					colorScheme="cyan"
					loadingText="Salvando"
					rounded="lg"
					isLoading={isLoading}
					onClick={() => handleSaveList()}
					color="#fff"
					top="12"
					left="9%"
					w="110px"
					h="32px"
					fontWeight="bold">
					Salvar
				</Button>
			)}
			<VStack pos="absolute" right="4" top="2" zIndex="7">
				<Dropzone
					setKeysList={setKeysList}
					keysList={keysList}
					setEndList={setEndList}
					endList={endList}
				/>
			</VStack>
			<Stack align="center" spacing="2" w="100%" h="100%">
				<EditableItem value={title} setValue={setTitle} />

				<DraggableList
					list={keysList}
					setItemList={setKeysList}
					endList={endList}
					setEndList={setEndList}
				/>
			</Stack>
		</Flex>
	);
};
