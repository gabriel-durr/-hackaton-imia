import {Flex, Image, Button, Text} from "@chakra-ui/react";
import {MdOutlineAccountCircle} from "react-icons/md";

export const Frequency = ({selected, onSelect}) => {
	return (
		<Flex
			w="100vw"
			direction="row"
			align="flex-start"
			justify="flex-end"
			marginTop="20px"
			marginRight="35em">
			<Button
				variant="outline"
				flexDirection="column"
				width="5rem"
				height="4rem"
				borderStartRadius="30px"
				bg={selected == "DIA" ? "#9c0c0c" : "#0a5779"}
				_hover={{
					bg: "#5e8a9c56",
					transition: ".4s ease",
				}}
				onClick={() => onSelect("DIA")}>
				<MdOutlineAccountCircle size="1.8rem" color="#fff" />
				<Text
					fontSize="1.09rem"
					as="span"
					color="#fff"
					ml="5px"
					fontWeight="thin">
					DIA
				</Text>
			</Button>
			<Button
				variant="outline"
				flexDirection="column"
				width="5rem"
				height="4rem"
				bg={selected == "MES" ? "#9c0c0c" : "#0a5779"}
				_hover={{
					bg: "#5e8a9c56",
					transition: ".4s ease",
				}}
				onClick={() => onSelect("MES")}>
				<MdOutlineAccountCircle size="1.8rem" color="#fff" />
				<Text
					fontSize="1.09rem"
					as="span"
					color="#fff"
					ml="5px"
					fontWeight="thin">
					MÊS
				</Text>
			</Button>
			<Button
				variant="outline"
				flexDirection="column"
				width="5rem"
				height="4rem"
				borderEndRadius="30px"
				bg={selected == "ANO" ? "#9c0c0c" : "#0a5779"}
				_hover={{
					bg: "#5e8a9c56",
					transition: ".4s ease",
				}}
				onClick={() => onSelect("ANO")}>
				<MdOutlineAccountCircle size="1.8rem" color="#fff" />
				<Text
					fontSize="1.09rem"
					as="span"
					color="#fff"
					ml="5px"
					fontWeight="thin">
					ANO
				</Text>
			</Button>
		</Flex>
	);
};
