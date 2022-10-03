import {Flex, Button, Text, Icon} from "@chakra-ui/react";
import {MdOutlineAccountCircle} from "react-icons/md";

export const Tabs = ({
	selected,
	onSelect,
	label1,
	label2,
	label3,
	icon1,
	icon2,
	icon3,
}) => {
	return (
		<Flex
			w="min-content"
			align="flex-start"
			justify="center"
			marginTop="20px"
			h="220px">
			<Button
				variant="outline"
				flexDirection="column"
				width="20rem"
				height="100%"
				bg={selected == "TAB1" ? "#9c0c0c" : "#0a5779"}
				_hover={{
					filter: "brightness(1.2)",
					transition: ".4s ease",
				}}
				onClick={() => onSelect("TAB1")}>
				<Icon boxSize="10" color="#fff" as={icon1} />
				<Text
					textTransform="uppercase"
					fontSize="1.09rem"
					as="span"
					color="#fff"
					ml="5px"
					fontWeight="thin">
					{label1}
				</Text>
			</Button>
			<Button
				variant="outline"
				flexDirection="column"
				width="20rem"
				height="100%"
				bg={selected == "TAB2" ? "#9c0c0c" : "#0a5779"}
				_hover={{
					filter: "brightness(1.2)",
					transition: ".4s ease",
				}}
				onClick={() => onSelect("TAB2")}>
				<Icon boxSize="10" color="#fff" as={icon2} />
				<Text
					textTransform="uppercase"
					fontSize="1.09rem"
					as="span"
					color="#fff"
					ml="5px"
					fontWeight="thin">
					{label2}
				</Text>
			</Button>
			<Button
				variant="outline"
				flexDirection="column"
				width="20rem"
				height="100%"
				bg={selected == "TAB3" ? "#9c0c0c" : "#0a5779"}
				_hover={{
					filter: "brightness(1.2)",
					transition: ".4s ease",
				}}
				onClick={() => onSelect("TAB3")}>
				<Icon boxSize="10" color="#fff" as={icon3} />
				<Text
					textTransform="uppercase"
					fontSize="1.09rem"
					as="span"
					color="#fff"
					ml="5px"
					fontWeight="thin">
					{label3}
				</Text>
			</Button>
		</Flex>
	);
};
