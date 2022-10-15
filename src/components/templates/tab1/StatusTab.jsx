import {
	VStack,
	Flex,
	Text,
	Select,
	HStack,
	Button,
	FormControl,
	FormLabel,
	Icon,
	IconButton,
	useToast,
} from "@chakra-ui/react";
import {BsPlusCircleFill, BsFillDashSquareFill} from "react-icons/bs";
import {useState} from "react";
import {EditableItem} from "../../../utils/EditableItem";

export const StatusTab = ({list, resultStatus}) => {
	const toast = useToast();

	const [isLoading, setIsloading] = useState(false);
	const [titleStatus, setTitleStatus] = useState(initialStatusTitle);
	const [data, setData] = useState({
		items: !!list.length ? list : initialData.items,
		qdts: [1],
	});
	const [formula, setFormula] = useState({
		items: initialFormula.items,
		qdts: [1],
	});

	const handleNewFormula = () => {
		setFormula({
			...formula,
			qdts: [...formula.qdts, formula.qdts[formula.qdts.length - 1] + 1],
		});
	};
	const handleNewData = () => {
		setData({
			...data,
			qdts: [...data.qdts, data.qdts[data.qdts.length - 1] + 1],
		});
	};

	const handleRemoveFormula = id => {
		if (formula.qdts.length > 1) {
			const filterItem = formula.qdts.filter(item => item !== id);

			setFormula({
				...formula,
				qdts: [...filterItem],
			});
		}
	};
	const handleRemoveData = id => {
		if (data.qdts.length > 1) {
			const filterItem = data.qdts.filter(item => item !== id);

			setData({
				...data,
				qdts: [...filterItem],
			});
		}
	};

	function handleName(name) {
		setTitleStatus({...titleStatus, name: name});
	}

	function handleLimiar(limiar) {
		setTitleStatus({...titleStatus, limiar: limiar});
	}

	const handleSaveList = async () => {
		setIsloading(true);
		await new Promise(resolve => setTimeout(resolve, 2000));
		resultStatus(titleStatus);
		setTitleStatus(initialStatusTitle);
		setData(initialData);
		setFormula(initialFormula);

		setIsloading(false);

		toast({
			title: "Status salvo com Sucesso!",
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
			h="1000px"
			p="2rem"
			justify="flex-start"
			gap="12"
			align="center"
			direction="column">
			<HStack spacing="16">
				<EditableItem
					color="mia.200"
					fontSize="2xl"
					value={titleStatus.name}
					setValue={handleName}
				/>
				<EditableItem
					color="mia.200"
					fontSize="2xl"
					value={titleStatus.limiar}
					setValue={handleLimiar}
				/>
			</HStack>

			<HStack
				w="600px"
				p="2px"
				spacing="4"
				align="center"
				justify="center">
				<Button w="200px" onClick={handleNewFormula}>
					<Icon w="5" h="5" as={BsPlusCircleFill} />
					<Text
						as="span"
						fontSize="1.2rem"
						ml="10px"
						textTransform="uppercase">
						Fórmulas
					</Text>
				</Button>

				<Button w="200px" onClick={handleNewData}>
					<Icon w="5" h="5" as={BsPlusCircleFill} />
					<Text
						as="span"
						fontSize="1.2rem"
						ml="10px"
						textTransform="uppercase">
						Dados
					</Text>
				</Button>
			</HStack>

			<VStack
				align="center"
				justify="flex-start"
				spacing="5"
				p="20px"
				w="40rem"
				h="400px"
				overflow="scroll"
				sx={{
					"&::-webkit-scrollbar": {
						width: "0px",
					},
				}}>
				{formula.qdts.map((qdt, index) => (
					<HStack key={index} align="flex-end">
						<FormControl w={qdt > 1 ? "190px" : "232px"}>
							<FormLabel
								fontWeight="bold"
								fontSize="1.32rem"
								borderBottom={qdt > 1 ? "" : "1px solid #000"}>
								Fórmulas
							</FormLabel>
							<Select
								color="gray.900"
								w="200px"
								h="38px"
								fontSize="1.1rem">
								{formula.items.map((item, index) => (
									<option key={index} value={item}>
										{item}
									</option>
								))}
							</Select>
						</FormControl>
						{qdt > 1 && (
							<IconButton
								color="red.400"
								_hover={{
									color: "red",
								}}
								icon={<BsFillDashSquareFill />}
								onClick={() => handleRemoveFormula(qdt)}
							/>
						)}
					</HStack>
				))}
				{data.qdts.map((qdt, index) => (
					<HStack key={index} align="flex-end">
						<FormControl w={qdt > 1 ? "190px" : "232px"}>
							<FormLabel
								fontWeight="bold"
								fontSize="1.32rem"
								borderBottom={qdt > 1 ? "" : "1px solid #000"}>
								Dados
							</FormLabel>
							<Select
								color="gray.900"
								w="200px"
								h="38px"
								fontSize="1.1rem"
								label="Dados">
								{data.items.map((item, index) => (
									<option key={index} value={item}>
										{item}
									</option>
								))}
							</Select>
						</FormControl>
						{qdt > 1 && (
							<IconButton
								color="red.400"
								_hover={{
									color: "red",
								}}
								icon={<BsFillDashSquareFill />}
								onClick={() => handleRemoveData(qdt)}
							/>
						)}
					</HStack>
				))}
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
	name: "Atribuir Nome",
	limiar: "Atribuir Limiar",
};

const initialData = {
	items: ["Aguardando a coleção ..."],
	qdts: [1],
};
const initialFormula = {
	items: ["FórmulaX", "FórmulaY", "FórmulaZ"],
	qdts: [1],
};
