import {Flex, VStack, Text, Icon} from "@chakra-ui/react";

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
			w="98%"
			h="85px"
			align="flex-start"
			justify="center"
			cursor="pointer"
			marginTop="12px">
			<VStack
				zIndex="1"
				pos="relative"
				p="2px"
				variant="brand"
				align="center"
				rounded="sm"
				justify="flex-end"
				w="33.33%"
				h="100%"
				bg={selected == "TAB1" ? "mia.500" : "mia.600"}
				_hover={{filter: "brightness(0.9)", transition: ".4s ease"}}
				_after={
					selected == "TAB1" && {
						content: "''",
						pos: "absolute",
						zIndex: "-1",
						bottom: "-2.5",
						width: 0,
						height: 0,
						borderStyle: "solid",
						borderWidth: "17px 0 0 17px",
						borderColor:
							"transparent transparent transparent #000000d0",

						transform: "rotate(-45deg)",
					}
				}
				onClick={() => onSelect("TAB1")}>
				<Icon boxSize="8" color="whiteAlpha.900" as={icon1} />
				<Text
					textTransform="uppercase"
					fontSize="1.02rem"
					as="span"
					color="whiteAlpha.800"
					ml="5px"
					fontWeight="thin">
					{label1}
				</Text>
			</VStack>
			<VStack
				zIndex="1"
				pos="relative"
				p="2px"
				variant="brand"
				align="center"
				justify="flex-end"
				w="33.33%"
				h="100%"
				bg={selected == "TAB2" ? "mia.500" : "mia.600"}
				_hover={{filter: "brightness(0.9)", transition: ".4s ease"}}
				_after={
					selected == "TAB2" && {
						content: "''",
						pos: "absolute",
						zIndex: "-1",
						bottom: "-2.5",
						width: 0,
						height: 0,
						borderStyle: "solid",
						borderWidth: "17px 0 0 17px",
						borderColor:
							"transparent transparent transparent #000000d0",

						transform: "rotate(-45deg)",
					}
				}
				onClick={() => onSelect("TAB2")}>
				<Icon boxSize="8" color="whiteAlpha.900" as={icon2} />
				<Text
					textTransform="uppercase"
					fontSize="1.05rem"
					as="span"
					color="whiteAlpha.800"
					ml="5px"
					fontWeight="thin">
					{label2}
				</Text>
			</VStack>
			<VStack
				zIndex="1"
				pos="relative"
				p="2px"
				variant="brand"
				align="center"
				rounded="sm"
				justify="flex-end"
				w="33.33%"
				h="100%"
				bg={selected == "TAB3" ? "mia.500" : "mia.600"}
				_hover={{filter: "brightness(0.9)", transition: ".4s ease"}}
				_after={
					selected == "TAB3" && {
						content: "''",
						pos: "absolute",
						zIndex: "-1",
						bottom: "-2.5",
						width: 0,
						height: 0,
						borderStyle: "solid",
						borderWidth: "17px 0 0 17px",
						borderColor:
							"transparent transparent transparent #000000d0",

						transform: "rotate(-45deg)",
					}
				}
				onClick={() => onSelect("TAB3")}>
				<Icon boxSize="8" color="whiteAlpha.900" as={icon3} />
				<Text
					textTransform="uppercase"
					fontSize="1.05rem"
					as="span"
					color="whiteAlpha.800"
					ml="5px"
					fontWeight="thin">
					{label3}
				</Text>
			</VStack>
		</Flex>
	);
};
