import {useState} from "react";
import {Flex, Button, Stack, VStack, useToast} from "@chakra-ui/react";
import {Dropzone} from "./Dropzone";
import {DraggableList} from "./DraggableList";
import {EditableItem} from "../../../EditableItem";

export const DataTab = ({data, resultList}) => {
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
			title: "Coleção de dados Salva com sucesso!",
			position: "top",
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
			overflow="hidden"
			px="2rem"
			margin="15px"
			bg="#fff"
			w="100%"
			h="100%">
			<VStack pos="absolute" right="4" top="2" zIndex="7">
				<Dropzone
					setKeysList={setKeysList}
					keysList={keysList}
					setEndList={setEndList}
					endList={endList}
				/>
			</VStack>
			<Stack align="center" spacing="2" w="100%" h="90%">
				<EditableItem
					color="mia.400"
					fontSize="xl"
					value={title}
					setValue={setTitle}
				/>

				<DraggableList
					list={keysList}
					setItemList={setKeysList}
					endList={endList}
					setEndList={setEndList}
				/>
			</Stack>
			{!!endList.length && (
				<Button
					pos="absolute"
					colorScheme="cyan"
					loadingText="Salvando"
					rounded="lg"
					isLoading={isLoading}
					onClick={() => handleSaveList()}
					color="#fff"
					bottom="0"
					right="7"
					w="170px"
					h="37px"
					fontWeight="bold">
					Salvar
				</Button>
			)}
		</Flex>
	);
};
