import {useState} from "react";
import {
	Flex,
	VStack,
	FormControl,
	FormLabel,
	Select,
	HStack,
	Button,
	useToast,
} from "@chakra-ui/react";
import {EditableItem} from "../../../utils/EditableItem";

export const ActionsTab = ({process, setProcess}) => {
	const toast = useToast();

	const [isLoading, setIsloading] = useState(false);
	const [titleProcess, setTitleProcess] = useState(initialStatusTitle);

	function handleName(name) {
		setTitleProcess({...titleProcess, name: name});
	}

	function handleStatus(status) {
		setTitleProcess({...titleProcess, status: status});
	}

	const handleSaveList = async () => {
		setIsloading(true);
		await new Promise(resolve => setTimeout(resolve, 2000));
		setTitleProcess(initialStatusTitle);
		setProcess({
			statusList: ["Aguardando status..."],
			process: [
				"Notificação no Gráfico",
				"Notificação Push",
				"Botão Flutuante",
			],
		});

		setIsloading(false);

		toast({
			title: "Processo salvo em nosso banco de dados com sucesso!",
			position: "top",
			status: "success",
			duration: 9000,
			isClosable: true,
		});
	};

	return (
		<Flex
			bg="#fff"
			w="100%"
			overflow="hidden"
			pos="relative"
			h="100%"
			p="2rem"
			gap="24"
			justify="flex-start"
			align="center"
			direction="column">
			<HStack spacing="16">
				<EditableItem
					fontSize="xl"
					color="mia.400"
					value={titleProcess.name}
					setValue={handleName}
				/>
				<EditableItem
					fontSize="xl"
					color="mia.400"
					value={titleProcess.status}
					setValue={handleStatus}
				/>
			</HStack>

			<VStack spacing="7">
				<FormControl
					display="flex"
					flexDir="row"
					alignItems="flex-start">
					<HStack>
						<FormLabel
							fontWeight="semibold"
							fontSize="1.2rem"
							color="gray.700">
							Status:
						</FormLabel>
						<Select
							color="gray.900"
							w="200px"
							h="32px"
							fontSize="1rem">
							{process.statusList.map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</Select>
					</HStack>
				</FormControl>

				<FormControl>
					<HStack>
						<FormLabel
							fontWeight="semibold"
							fontSize="1.2rem"
							color="gray.700">
							Selecionar Processo:
						</FormLabel>
						<Select
							color="gray.900"
							w="200px"
							h="32px"
							fontSize="1rem">
							{process.process.map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</Select>
					</HStack>
				</FormControl>
			</VStack>
			<Button
				pos="absolute"
				bottom="2"
				right="7"
				colorScheme="cyan"
				loadingText="Salvando"
				rounded="lg"
				isLoading={isLoading}
				onClick={() => handleSaveList()}
				color="#fff"
				w="170px"
				h="37px"
				fontWeight="bold">
				Salvar
			</Button>
		</Flex>
	);
};

const initialStatusTitle = {
	name: "Atribuir nome",
	status: "Atribuir Status",
};
