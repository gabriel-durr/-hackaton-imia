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
			w="min-content"
			h="70px"
			align="flex-start"
			justify="center"
			marginTop="12px"
			cursor="pointer">
			<VStack
				zIndex="1"
				pos="relative"
				p="2px"
				variant="brand"
				align="center"
				borderRadius="10px 0px 0px 0px"
				justify="flex-end"
				w="20rem"
				h="100%"
				bg={selected == "TAB1" ? "#010721de" : "#0a587994"}
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
				w="20rem"
				h="100%"
				bg={selected == "TAB2" ? "#010721de" : "#0a587994"}
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
				borderRadius="0px 10px 0px 0px"
				justify="flex-end"
				w="20rem"
				h="100%"
				bg={selected == "TAB3" ? "#010721de" : "#0a587994"}
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
