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
			h="150rem"
			w="60rem"
			align="center"
			px="2rem"
			justify="flex-start"
			marginTop="20px"
			border="1px #000 solid"
			direction="column">
			<Template selected={selectedTemplate} />
		</Flex>
	);
};
