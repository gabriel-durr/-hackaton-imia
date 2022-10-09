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
} from "@chakra-ui/react";
import {BsPlusCircleFill, BsFillDashSquareFill} from "react-icons/bs";
import {useState} from "react";

export const StatusTab = () => {
	const [data, setData] = useState({
		items: ["Material", "Mercado Externo", "Faturamento", "Ano/Mes"],
		qdts: [1],
	});

	const [formula, setFormula] = useState({
		items: ["FórmulaX", "FórmulaY", "FórmulaZ"],
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

	return (
		<Flex
			bg="#f7fcfd"
			w="1000px"
			overflow="hidden"
			pos="relative"
			h="1000px"
			p="2rem"
			justify="flex-start"
			align="center"
			direction="column">
			<HStack
				w="300px"
				p="20px"
				spacing="4"
				align="flex-start"
				justify="flex-start">
				<Button w="140px" onClick={handleNewFormula}>
					<Icon w="5" h="5" as={BsPlusCircleFill} />
					<Text as="span" ml="7px" textTransform="uppercase">
						Fórmulas
					</Text>
				</Button>

				<Button w="140px" onClick={handleNewData}>
					<Icon w="5" h="5" as={BsPlusCircleFill} />
					<Text as="span" ml="7px" textTransform="uppercase">
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
								fontSize="1.2rem"
								borderBottom={qdt > 1 ? "" : "1px solid #000"}>
								Fórmulas
							</FormLabel>
							<Select color="gray.900" w="190px">
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
								fontSize="1.2rem"
								borderBottom={qdt > 1 ? "" : "1px solid #000"}>
								Dados
							</FormLabel>
							<Select color="gray.900" w="190px" label="Dados">
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
		</Flex>
	);
};
