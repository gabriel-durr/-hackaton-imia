import {Flex} from "@chakra-ui/react";
import {MdOutlineAccountCircle} from "react-icons/md";

export const ContentPanel = ({selectedTemplate, tab1, tab2, tab3}) => {
	const Template = ({selected}) => {
		switch (selected) {
			case "TAB1":
				return tab1;
			case "TAB2":
				return tab2;
			case "TAB3":
				return tab3;
			default:
				return null;
		}
	};

	return (
		<Flex
			h="39.5rem"
			w="60rem"
			boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
			align="center"
			px="2rem"
			justify="flex-start"
			overflow="scroll"
			sx={{
				"&::-webkit-scrollbar": {
					width: "0px",
				},
			}}
			marginTop="20px"
			direction="column">
			<Template selected={selectedTemplate} />
		</Flex>
	);
};
