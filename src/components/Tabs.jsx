import {Flex, Button, Text, Icon} from "@chakra-ui/react";

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
			marginTop="12px"
			h="70px">
			<Button
				zIndex="1"
				pos="relative"
				variant="brand"
				flexDirection="column"
				width="20rem"
				height="100%"
				bg={selected == "TAB1" ? "#9c0c0c" : "#0a5779"}
				_hover={
					selected == "TAB1" && {
						filter: "brightness(1)",
						transition: ".4s ease",
					}
				}
				_after={
					selected == "TAB1" && {
						content: "''",
						pos: "absolute",
						zIndex: "-1",
						bottom: "-5",
						width: "40px",
						height: "40px",
						bg: "#9c0c0c",
						transform: "rotate(45deg)",
					}
				}
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
				zIndex="1"
				pos="relative"
				variant="brand"
				flexDirection="column"
				width="20rem"
				height="100%"
				bg={selected == "TAB2" ? "#9c0c0c" : "#0a5779"}
				_hover={
					selected == "TAB2" && {
						filter: "brightness(1)",
						transition: ".4s ease",
					}
				}
				_after={
					selected == "TAB2" && {
						content: "''",
						pos: "absolute",
						zIndex: "-1",
						bottom: "-5",
						width: "40px",
						height: "40px",
						bg: "#9c0c0c",
						transform: "rotate(45deg)",
					}
				}
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
				zIndex="1"
				pos="relative"
				variant="brand"
				flexDirection="column"
				width="20rem"
				height="100%"
				bg={selected == "TAB3" ? "#9c0c0c" : "#0a5779"}
				_hover={
					selected == "TAB3" && {
						filter: "brightness(1)",
						transition: ".4s ease",
					}
				}
				_after={
					selected == "TAB3" && {
						content: "''",
						pos: "absolute",
						zIndex: "-1",
						bottom: "-5",
						width: "40px",
						height: "40px",
						bg: "#9c0c0c",
						transform: "rotate(45deg)",
					}
				}
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
