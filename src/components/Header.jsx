import {Flex, Image, Button, Text} from "@chakra-ui/react";
import {MdOutlineAccountCircle} from "react-icons/md";

export const Header = () => {
	return (
		<Flex
			h="9rem"
			w="100vw"
			align="center"
			px="3rem"
			justify="space-between"
			bgGradient="linear(90deg, #0a5779 0%,  #1976a2 100%, #21889b 100%)">
			<Image alt="iMia" src="/i-mia.png" w="280px" h="120px" />
			<Button
				rounded="full"
				variant="outline"
				p="1.5rem"
				_hover={{
					bg: "#416e8296",
				}}>
				<MdOutlineAccountCircle size="1.7rem" color="#fff" />
				<Text as="span" color="#fff" ml="5px">
					Dr. Ingo Hoffman
				</Text>
			</Button>
		</Flex>
	);
};
