import {useState} from "react";
import {Flex, VStack, FormControl, FormLabel, Select} from "@chakra-ui/react";
import {EditableItem} from "../../../utils/EditableItem";

export const ActionsTab = () => {
	const [title, setTitle] = useState("Titulo do Processo");
	const [process, setProcess] = useState({
		statusList: ["Material", "Mercado Externo", "Faturamento", "Ano/Mes"],
		process: [
			"Notificação no Gráfico",
			"Notificação Push",
			"Botão Flutuante",
		],
	});

	return (
		<Flex
			bg="#f7fcfd"
			w="100%"
			overflow="hidden"
			pos="relative"
			h="100%"
			p="2rem"
			gap="24"
			justify="flex-start"
			align="center"
			direction="column">
			<EditableItem value={title} setValue={setTitle} />

			<VStack spacing="7">
				<FormControl display="flex" flexDir="row">
					<FormLabel
						fontWeight="semibold"
						fontSize="1.3rem"
						color="gray.800">
						Status:
					</FormLabel>
					<Select color="gray.900" w="170px" h="30px">
						{process.statusList.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl display="flex" flexDir="row">
					<FormLabel
						fontWeight="semibold"
						fontSize="1.3rem"
						color="gray.800">
						Selecionar Notificação:
					</FormLabel>
					<Select color="gray.900" w="207px" h="30px">
						{process.process.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</Select>
				</FormControl>
			</VStack>
		</Flex>
	);
};
